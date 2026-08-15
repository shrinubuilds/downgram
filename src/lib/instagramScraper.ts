import { InstagramScrapeResult, MediaItem, MediaType, AudioInfo, ProfileInfo } from '@/types/instagram';
import { extractHashtagsAndMentions, parseInstagramUrl } from './utils';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export async function scrapeInstagram(targetUrl: string, requestedType?: MediaType): Promise<InstagramScrapeResult> {
  const parsed = parseInstagramUrl(targetUrl);
  if (!parsed.isValid) {
    return {
      success: false,
      mediaType: requestedType || 'reel',
      url: targetUrl,
      items: [],
      error: 'Invalid Instagram link. Please paste a valid public Instagram link or username.',
    };
  }

  const mediaType = requestedType || parsed.mediaType;

  // Handle Profile / DP / Bio extraction
  if (mediaType === 'profile' || mediaType === 'bio' || (!parsed.shortcode && parsed.username)) {
    if (parsed.shortcode) {
      const postResult = await scrapePostOrReel(parsed.shortcode, parsed.cleanUrl, mediaType);
      if (postResult.success) {
        return postResult;
      }
    }
    return scrapeProfile(parsed.username || '', targetUrl, mediaType);
  }

  // Handle Post / Reel / Audio / Caption extraction
  return scrapePostOrReel(parsed.shortcode || '', parsed.cleanUrl, mediaType);
}

async function scrapePostOrReel(
  shortcode: string,
  cleanUrl: string,
  mediaType: MediaType
): Promise<InstagramScrapeResult> {
  const isVideo = mediaType === 'reel' || mediaType === 'audio';

  // Strategy 1: High-Speed Native yt-dlp Extraction
  try {
    const { stdout } = await execFileAsync(
      'python',
      ['-m', 'yt_dlp', '--dump-single-json', '--no-warnings', '--no-check-certificates', cleanUrl],
      { maxBuffer: 15 * 1024 * 1024, timeout: 20000 }
    );

    if (stdout && stdout.trim().startsWith('{')) {
      const data = JSON.parse(stdout);
      const rawUrl = data.url;
      const thumbnail = data.thumbnail || data.thumbnails?.[data.thumbnails.length - 1]?.url || '';
      const authorUsername = data.channel || data.uploader_id || data.uploader || 'instagram_creator';
      const authorFullName = data.uploader || authorUsername;
      const caption = data.description || data.title || `Instagram Post (${shortcode})`;
      const { hashtags, mentions } = extractHashtagsAndMentions(caption);

      const items: MediaItem[] = [];

      if (Array.isArray(data.entries) && data.entries.length > 0) {
        data.entries.forEach((entry: any, idx: number) => {
          const entryUrl = entry.url || entry.thumbnail;
          const entryThumb = entry.thumbnail || entry.thumbnails?.[0]?.url || entryUrl;
          const entryIsVid = entry.ext === 'mp4' || entry._type === 'video' || !!entry.vcodec;
          items.push({
            id: `ytdlp_${shortcode}_${idx + 1}`,
            type: entryIsVid ? 'video' : 'image',
            url: entryUrl,
            thumbnailUrl: entryThumb,
            width: entry.width || 1080,
            height: entry.height || (entryIsVid ? 1920 : 1080),
            filename: `DownGram_${authorUsername}_${shortcode}_slide_${idx + 1}.${entryIsVid ? 'mp4' : 'jpg'}`,
          });
        });
      } else if (rawUrl) {
        const isEntryVideo = data.ext === 'mp4' || isVideo || data._type === 'video';
        items.push({
          id: `ytdlp_${shortcode}`,
          type: isEntryVideo ? 'video' : 'image',
          url: rawUrl,
          thumbnailUrl: thumbnail || rawUrl,
          width: data.width || 1080,
          height: data.height || (isEntryVideo ? 1920 : 1080),
          filename: `DownGram_${authorUsername}_${shortcode}.${isEntryVideo ? 'mp4' : 'jpg'}`,
        });
      }

      if (items.length > 0) {
        const audioUrl = items[0].url;

        return {
          success: true,
          mediaType: mediaType,
          url: cleanUrl,
          shortcode,
          title: data.title || caption.slice(0, 80),
          caption: caption,
          captionFormatted: caption,
          hashtags,
          mentions,
          author: {
            username: authorUsername,
            fullName: authorFullName,
            avatarUrl: thumbnail || '',
            isVerified: true,
          },
          profile: {
            username: authorUsername,
            fullName: authorFullName,
            biography: caption,
            profilePicUrl: thumbnail,
            profilePicUrlHd: thumbnail,
            isVerified: true,
            isPrivate: false,
          },
          stats: {
            likes: data.like_count || undefined,
            comments: data.comment_count || undefined,
            views: data.view_count || undefined,
          },
          items,
          audio: {
            title: `Sound from @${authorUsername}`,
            artist: `@${authorUsername}`,
            audioUrl: audioUrl,
            coverUrl: thumbnail || items[0].thumbnailUrl,
            duration: data.duration || 15,
            isOriginalAudio: true,
          },
          sourceType: 'live',
        };
      }
    }
  } catch (err: any) {
    console.warn('Strategy 1 (yt-dlp) failed, attempting fallback engines for photo/reel:', err.message);
  }

  // Strategy 2: Instagram Embed Scraper (Supports Single Photo and Embeds)
  try {
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
    const embedRes = await fetch(embedUrl, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 0 },
    });

    if (embedRes.ok) {
      const html = await embedRes.text();

      const userMatch =
        html.match(/class="UsernameText"[^>]*>([^<]+)<\/span>/i) ||
        html.match(/href="https:\/\/www\.instagram\.com\/([a-zA-Z0-9_.]+)\/"/i);
      const extractedUsername = userMatch ? userMatch[1].trim() : 'instagram_creator';

      const captionMatch = html.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/i);
      const rawCaption = captionMatch ? captionMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      const imgMatch =
        html.match(/<img[^>]*class="EmbeddedMediaImage"[^>]*src="([^"]+)"/i) ||
        html.match(/<img[^>]*src="([^"]+)"/i);
      const thumbUrl = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : null;

      if (thumbUrl) {
        const { hashtags, mentions } = extractHashtagsAndMentions(rawCaption);
        const itemType = isVideo ? 'video' : 'image';

        const items: MediaItem[] = [
          {
            id: `embed_${shortcode}_1`,
            type: itemType,
            url: thumbUrl,
            thumbnailUrl: thumbUrl,
            width: 1080,
            height: isVideo ? 1920 : 1080,
            filename: `DownGram_${extractedUsername}_${shortcode}.${isVideo ? 'mp4' : 'jpg'}`,
          },
        ];

        return {
          success: true,
          mediaType: mediaType,
          url: cleanUrl,
          shortcode,
          title: rawCaption ? rawCaption.slice(0, 75) : `Instagram Post • ${shortcode}`,
          caption: rawCaption,
          captionFormatted: rawCaption,
          hashtags,
          mentions,
          author: {
            username: extractedUsername,
            fullName: extractedUsername,
            avatarUrl: thumbUrl,
            isVerified: true,
          },
          profile: {
            username: extractedUsername,
            fullName: extractedUsername,
            biography: rawCaption,
            profilePicUrl: thumbUrl,
            profilePicUrlHd: thumbUrl,
            isVerified: true,
            isPrivate: false,
          },
          items,
          audio: isVideo
            ? {
                title: `Sound from @${extractedUsername}`,
                artist: `@${extractedUsername}`,
                audioUrl: thumbUrl,
                coverUrl: thumbUrl,
                isOriginalAudio: true,
              }
            : undefined,
          sourceType: 'live',
        };
      }
    }
  } catch (err) {
    console.warn('Strategy 2 (Embed) failed:', err);
  }

  // Strategy 3: FastDL / SaveFrom Media Engine (Supports Carousel Photos)
  try {
    const form = new URLSearchParams();
    form.append('sf_url', cleanUrl);

    const fastdlRes = await fetch('https://fastdl.app/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': getRandomUserAgent(),
        'Origin': 'https://fastdl.app',
        'Referer': 'https://fastdl.app/en',
        'Accept': 'application/json, text/plain, */*',
      },
      body: form.toString(),
      next: { revalidate: 0 },
    });

    if (fastdlRes.ok) {
      const json = await fastdlRes.json();
      const code = json.code || '';
      if (code && !code.includes('showEmptyResult') && !code.includes('Invalid request')) {
        const hrefMatches = [...code.matchAll(/href=\\"([^"]+)\\"/g)].map((m) => m[1].replace(/\\/g, ''));
        const thumbMatches = [...code.matchAll(/src=\\"([^"]+)\\"/g)].map((m) => m[1].replace(/\\/g, ''));

        const validVids = hrefMatches.filter((l) => l.includes('.mp4') || l.includes('cdninstagram') || l.includes('fbcdn'));
        const validPics = (hrefMatches.length > 0 ? hrefMatches : thumbMatches).filter(
          (l) => !l.includes('.mp4') && !l.includes('logo') && !l.includes('icon')
        );

        const items: MediaItem[] = [];

        if (isVideo && validVids.length > 0) {
          validVids.forEach((vidUrl, idx) => {
            const thumb = validPics[idx] || validPics[0] || vidUrl;
            items.push({
              id: `fastdl_${shortcode}_${idx + 1}`,
              type: 'video',
              url: vidUrl,
              thumbnailUrl: thumb,
              width: 1080,
              height: 1920,
              filename: `DownGram_Reel_${shortcode}_${idx + 1}.mp4`,
            });
          });
        } else if (validPics.length > 0) {
          validPics.forEach((picUrl, idx) => {
            items.push({
              id: `fastdl_${shortcode}_${idx + 1}`,
              type: 'image',
              url: picUrl,
              thumbnailUrl: picUrl,
              width: 1080,
              height: 1080,
              filename: `DownGram_Photo_${shortcode}_slide_${idx + 1}.jpg`,
            });
          });
        }

        if (items.length > 0) {
          const caption = `Instagram Post (${shortcode})`;
          return {
            success: true,
            mediaType: mediaType,
            url: cleanUrl,
            shortcode,
            title: `Instagram Post • ${shortcode}`,
            caption,
            captionFormatted: caption,
            hashtags: ['#instagram'],
            mentions: [],
            author: {
              username: 'instagram_creator',
              fullName: 'Instagram Creator',
              avatarUrl: items[0].thumbnailUrl,
              isVerified: true,
            },
            profile: {
              username: 'instagram_creator',
              fullName: 'Instagram Creator',
              profilePicUrl: items[0].thumbnailUrl,
              profilePicUrlHd: items[0].thumbnailUrl,
              isVerified: true,
              isPrivate: false,
            },
            items,
            audio:
              items[0].type === 'video'
                ? {
                    title: `Original Audio (${shortcode})`,
                    artist: 'Original Audio',
                    audioUrl: items[0].url,
                    coverUrl: items[0].thumbnailUrl,
                    isOriginalAudio: true,
                  }
                : undefined,
            sourceType: 'live',
          };
        }
      }
    }
  } catch (err) {
    console.warn('Strategy 3 (FastDL) failed:', err);
  }

  // Fallback Error
  return {
    success: false,
    mediaType,
    url: cleanUrl,
    shortcode,
    items: [],
    error: 'Unable to extract media from this Instagram link. Please ensure the link is from a public Instagram account.',
  };
}

async function scrapeProfile(
  username: string,
  targetUrl: string,
  mediaType: MediaType
): Promise<InstagramScrapeResult> {
  const cleanUsername = username.replace(/^@/, '').replace(/\/$/, '').trim();
  const cleanUrl = `https://www.instagram.com/${cleanUsername}/`;

  if (!cleanUsername) {
    return {
      success: false,
      mediaType: 'profile',
      url: targetUrl,
      items: [],
      error: 'Please enter a valid Instagram username (e.g. @zuck or cristiano).',
    };
  }

  // Strategy 1: Profile JSON API with guest session tokens
  try {
    const initRes = await fetch('https://www.instagram.com/', {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 0 },
    });

    const cookies = initRes.headers.get('set-cookie') || '';
    let csrf = '';
    const csrfMatch = cookies.match(/csrftoken=([^;]+)/);
    if (csrfMatch) csrf = csrfMatch[1];

    const jsonUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`;
    const res = await fetch(jsonUrl, {
      headers: {
        'User-Agent': getRandomUserAgent(),
        'X-IG-App-ID': '936619743392459',
        'X-ASBD-ID': '198387',
        'X-IG-WWW-Claim': '0',
        'X-CSRFToken': csrf,
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': `https://www.instagram.com/${cleanUsername}/`,
        'Cookie': cookies,
        'Accept': '*/*',
      },
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const data = await res.json();
      const user = data?.data?.user;
      if (user) {
        const bio = user.biography || '';
        const { hashtags, mentions } = extractHashtagsAndMentions(bio);
        const hdPic = user.profile_pic_url_hd || user.profile_pic_url;

        return {
          success: true,
          mediaType: 'profile',
          url: cleanUrl,
          title: `${user.full_name || cleanUsername} (@${cleanUsername}) - Instagram Profile`,
          caption: bio,
          captionFormatted: bio,
          hashtags,
          mentions,
          author: {
            username: cleanUsername,
            fullName: user.full_name || cleanUsername,
            avatarUrl: hdPic,
            isVerified: user.is_verified,
          },
          profile: {
            username: cleanUsername,
            fullName: user.full_name || cleanUsername,
            biography: bio,
            profilePicUrl: user.profile_pic_url,
            profilePicUrlHd: hdPic,
            isVerified: user.is_verified,
            isPrivate: user.is_private,
            postsCount: user.edge_owner_to_timeline_media?.count,
            followersCount: user.edge_followed_by?.count,
            followingCount: user.edge_follow?.count,
            externalUrl: user.external_url,
          },
          items: [
            {
              id: `dp_${cleanUsername}`,
              type: 'image',
              url: hdPic,
              thumbnailUrl: user.profile_pic_url || hdPic,
              width: 1080,
              height: 1080,
              filename: `DownGram_${cleanUsername}_HD_DP.jpg`,
            },
          ],
          sourceType: 'live',
        };
      }
    }
  } catch (err) {
    console.warn('Profile JSON strategy failed:', err);
  }

  return {
    success: false,
    mediaType: 'profile',
    url: cleanUrl,
    items: [],
    error: `Could not retrieve profile information for @${cleanUsername}. Please check that the username is spelled correctly and the account is public.`,
  };
}
