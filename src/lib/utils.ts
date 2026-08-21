import { MediaType } from '@/types/instagram';

export function parseInstagramUrl(inputUrl: string): {
  mediaType: MediaType;
  shortcode?: string;
  username?: string;
  cleanUrl: string;
  isValid: boolean;
} {
  const trimmed = inputUrl.trim();
  if (!trimmed) {
    return { mediaType: 'reel', cleanUrl: '', isValid: false };
  }

  // Handle plain username (e.g. @instagram or instagram or zuck)
  if (/^@?[a-zA-Z0-9._]{1,30}$/.test(trimmed) && !trimmed.includes('http') && !trimmed.includes('.com')) {
    const username = trimmed.replace(/^@/, '');
    return {
      mediaType: 'profile',
      username,
      cleanUrl: `https://www.instagram.com/${username}/`,
      isValid: true,
    };
  }

  try {
    let urlString = trimmed;
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = 'https://' + urlString;
    }
    const parsed = new URL(urlString);

    if (!parsed.hostname.includes('instagram.com') && !parsed.hostname.includes('instagr.am')) {
      return { mediaType: 'reel', cleanUrl: trimmed, isValid: false };
    }

    const pathname = parsed.pathname;
    
    // Reel match: /reel/CODE/ or /reels/CODE/
    const reelMatch = pathname.match(/\/(?:reel|reels)\/([A-Za-z0-9_-]+)/);
    if (reelMatch) {
      return {
        mediaType: 'reel',
        shortcode: reelMatch[1],
        cleanUrl: `https://www.instagram.com/reel/${reelMatch[1]}/`,
        isValid: true,
      };
    }

    // Post / Carousel match: /p/CODE/
    const postMatch = pathname.match(/\/p\/([A-Za-z0-9_-]+)/);
    if (postMatch) {
      return {
        mediaType: 'post',
        shortcode: postMatch[1],
        cleanUrl: `https://www.instagram.com/p/${postMatch[1]}/`,
        isValid: true,
      };
    }

    // IGTV / Video match: /tv/CODE/
    const tvMatch = pathname.match(/\/tv\/([A-Za-z0-9_-]+)/);
    if (tvMatch) {
      return {
        mediaType: 'video',
        shortcode: tvMatch[1],
        cleanUrl: `https://www.instagram.com/tv/${tvMatch[1]}/`,
        isValid: true,
      };
    }

    // Audio match: /audio/ID/ or /music/ID/
    const audioMatch = pathname.match(/\/(?:audio|music)\/([0-9_-]+)/);
    if (audioMatch) {
      return {
        mediaType: 'audio',
        shortcode: audioMatch[1],
        cleanUrl: `https://www.instagram.com/audio/${audioMatch[1]}/`,
        isValid: true,
      };
    }

    // Stories match: /stories/USERNAME/ID/
    const storyMatch = pathname.match(/\/stories\/([A-Za-z0-9._]+)(?:\/([0-9]+))?/);
    if (storyMatch) {
      return {
        mediaType: 'story',
        username: storyMatch[1],
        shortcode: storyMatch[2],
        cleanUrl: `https://www.instagram.com/stories/${storyMatch[1]}/${storyMatch[2] || ''}`,
        isValid: true,
      };
    }

    // Profile match: /USERNAME/
    const profileMatch = pathname.match(/^\/([A-Za-z0-9._]+)\/?$/);
    if (profileMatch && !['explore', 'direct', 'accounts', 'reels', 'about', 'legal', 'developer'].includes(profileMatch[1])) {
      return {
        mediaType: 'profile',
        username: profileMatch[1],
        cleanUrl: `https://www.instagram.com/${profileMatch[1]}/`,
        isValid: true,
      };
    }

    return { mediaType: 'reel', cleanUrl: urlString, isValid: true };
  } catch {
    return { mediaType: 'reel', cleanUrl: trimmed, isValid: false };
  }
}

export function formatNumber(num?: number): string {
  if (num === undefined || num === null) return '0';
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export function formatTime(seconds?: number): string {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function extractHashtagsAndMentions(text: string): { hashtags: string[]; mentions: string[] } {
  if (!text) return { hashtags: [], mentions: [] };
  const hashtagMatches = text.match(/#[a-zA-Z0-9_\u0080-\uFFFF]+/g) || [];
  const mentionMatches = text.match(/@[a-zA-Z0-9_.]+/g) || [];
  return {
    hashtags: Array.from(new Set(hashtagMatches.map(h => h.trim()))),
    mentions: Array.from(new Set(mentionMatches.map(m => m.trim()))),
  };
}

export async function triggerDownload(url: string, filename: string) {
  const isAudio = filename.endsWith('.mp3');
  const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}${isAudio ? '&audio=true' : ''}`;

  try {
    // 1. Direct Blob Download (100% reliable across Android Chrome, iOS Safari & Desktop)
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 2000);
      return;
    }
  } catch (err) {
    console.warn('Blob download fetch error, falling back to direct anchor:', err);
  }

  // 2. Direct anchor click fallback
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = proxyUrl;
  link.setAttribute('download', filename);
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 1000);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}
