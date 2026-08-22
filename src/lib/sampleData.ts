import { InstagramScrapeResult } from '@/types/instagram';

export const sampleInstagramData: Record<string, InstagramScrapeResult> = {
  reel: {
    success: true,
    mediaType: 'reel',
    url: 'https://www.instagram.com/reel/C3zZ9XYZ123/',
    shortcode: 'C3zZ9XYZ123',
    title: 'Neon Nights in Tokyo 🗼✨ Cinematic Reel',
    caption: `Tokyo midnight aesthetic! 🗼✨ Shooting through Shinjuku neon alleys. Which frame is your favorite? 

Drop your thoughts in comments 👇
.
.
#tokyo #japan #cyberpunk #neonvibes #streetphotography #cinematic #reelsviral #filmmaking #traveljapan #nightlights`,
    captionFormatted: `Tokyo midnight aesthetic! 🗼✨ Shooting through Shinjuku neon alleys. Which frame is your favorite? \n\nDrop your thoughts in comments 👇\n.\n.\n#tokyo #japan #cyberpunk #neonvibes #streetphotography #cinematic #reelsviral #filmmaking #traveljapan #nightlights`,
    hashtags: ['#tokyo', '#japan', '#cyberpunk', '#neonvibes', '#streetphotography', '#cinematic', '#reelsviral', '#filmmaking', '#traveljapan', '#nightlights'],
    mentions: ['@tokyocameraclub', '@shinjukucity'],
    author: {
      username: 'neon_visionary',
      fullName: 'Alex Rivero | Visual Filmmaker',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    stats: {
      likes: 384500,
      comments: 2940,
      views: 2450000,
      plays: 3120000,
    },
    publishedAt: '2024-11-20T14:30:00Z',
    items: [
      {
        id: 'item_reel_1',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
        width: 1080,
        height: 1920,
        filename: 'DownGram_neon_visionary_reel_C3zZ9XYZ123.mp4',
      },
    ],
    audio: {
      title: 'Neon Drift (Original Mix)',
      artist: 'Kavinsky & Cyberwave',
      audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: 32,
      isOriginalAudio: false,
      coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&auto=format&fit=crop&q=80',
      waveform: [20, 35, 60, 80, 95, 70, 45, 60, 85, 90, 100, 75, 50, 65, 80, 60, 40, 25, 45, 70, 90, 85, 60, 40, 30],
    },
    sourceType: 'sample',
  },

  post: {
    success: true,
    mediaType: 'post',
    url: 'https://www.instagram.com/p/C9abc123XYZ/',
    shortcode: 'C9abc123XYZ',
    title: 'Alpine Escapes - Carousel Series 🏔️🌲',
    caption: `Swipe left for alpine magic! 🌲🏔️ 4 dreamy days hiking around Dolomites & Lake Braies. The water reflection in slide 2 was unbelievable.

Gear: Sony A7IV + 24-70mm GM II
Color graded with Alpine Moody LUTs (link in bio)

🏷️ @earthpix @dolomites.unesco #dolomites #italy #mountains #landscapephotography #naturelovers #earthfocus #wanderlust #wanderer #visualsofearth`,
    captionFormatted: `Swipe left for alpine magic! 🌲🏔️ 4 dreamy days hiking around Dolomites & Lake Braies. The water reflection in slide 2 was unbelievable.\n\nGear: Sony A7IV + 24-70mm GM II\nColor graded with Alpine Moody LUTs (link in bio)\n\n🏷️ @earthpix @dolomites.unesco #dolomites #italy #mountains #landscapephotography #naturelovers #earthfocus #wanderlust #wanderer #visualsofearth`,
    hashtags: ['#dolomites', '#italy', '#mountains', '#landscapephotography', '#naturelovers', '#earthfocus', '#wanderlust', '#wanderer', '#visualsofearth'],
    mentions: ['@earthpix', '@dolomites.unesco'],
    author: {
      username: 'elena_wanderlust',
      fullName: 'Elena Rostova 🌲 Explorer',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    stats: {
      likes: 128900,
      comments: 870,
    },
    publishedAt: '2024-10-15T09:15:00Z',
    items: [
      {
        id: 'item_post_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=95',
        thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80',
        width: 1440,
        height: 1800,
        filename: 'DownGram_elena_wanderlust_slide_1.jpg',
      },
      {
        id: 'item_post_2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=95',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        width: 1440,
        height: 1800,
        filename: 'DownGram_elena_wanderlust_slide_2.jpg',
      },
      {
        id: 'item_post_3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&auto=format&fit=crop&q=95',
        thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
        width: 1440,
        height: 1800,
        filename: 'DownGram_elena_wanderlust_slide_3.jpg',
      },
      {
        id: 'item_post_4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop&q=95',
        thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=80',
        width: 1440,
        height: 1800,
        filename: 'DownGram_elena_wanderlust_slide_4.jpg',
      },
    ],
    sourceType: 'sample',
  },

  profile: {
    success: true,
    mediaType: 'profile',
    url: 'https://www.instagram.com/designgenius/',
    title: 'Design Genius (@designgenius) - Instagram Profile & Picture',
    author: {
      username: 'designgenius',
      fullName: 'Design Genius Studio ✨',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=95',
      isVerified: true,
    },
    profile: {
      username: 'designgenius',
      fullName: 'Design Genius Studio ✨',
      biography: `🚀 Designing the future of digital interfaces & motion UI
🎨 Daily design inspiration, Figma templates & 3D art
🏆 Winner of Awwwards Site of the Year 2024
👇 Download free UI Kit below!`,
      profilePicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&auto=format&fit=crop&q=80',
      profilePicUrlHd: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=95',
      isVerified: true,
      isPrivate: false,
      postsCount: 1420,
      followersCount: 892000,
      followingCount: 310,
      externalUrl: 'https://designgenius.io/free-kit',
    },
    items: [
      {
        id: 'item_dp_1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=95',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        width: 1200,
        height: 1200,
        filename: 'DownGram_designgenius_HD_Profile_Picture.jpg',
      },
    ],
    sourceType: 'sample',
  },

  audio: {
    success: true,
    mediaType: 'audio',
    url: 'https://www.instagram.com/audio/9876543210/',
    shortcode: '9876543210',
    title: 'Midnight Serenade (Slowed + Reverb) - Lo-Fi Dreamers',
    caption: 'Viral Instagram audio used across 1.4M Reels worldwide.',
    author: {
      username: 'lofidreamers_official',
      fullName: 'Lo-Fi Dreamers Records',
      avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    items: [],
    audio: {
      title: 'Midnight Serenade (Slowed + Reverb)',
      artist: 'Lo-Fi Dreamers feat. Aria',
      audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      duration: 48,
      isOriginalAudio: true,
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80',
      waveform: [15, 30, 45, 60, 75, 90, 100, 85, 70, 55, 65, 80, 95, 90, 75, 60, 45, 55, 70, 85, 90, 65, 45, 30, 20],
    },
    sourceType: 'sample',
  },

  caption: {
    success: true,
    mediaType: 'caption',
    url: 'https://www.instagram.com/reel/C3zZ9XYZ123/',
    shortcode: 'C3zZ9XYZ123',
    title: 'Caption Extractor Sample',
    caption: `Tokyo midnight aesthetic! 🗼✨ Shooting through Shinjuku neon alleys. Which frame is your favorite?\n\nDrop your thoughts in comments 👇\n.\n.\n#tokyo #japan #cyberpunk #neonvibes #streetphotography #cinematic #reelsviral #filmmaking #traveljapan #nightlights`,
    captionFormatted: `Tokyo midnight aesthetic! 🗼✨ Shooting through Shinjuku neon alleys. Which frame is your favorite?\n\nDrop your thoughts in comments 👇\n.\n.\n#tokyo #japan #cyberpunk #neonvibes #streetphotography #cinematic #reelsviral #filmmaking #traveljapan #nightlights`,
    hashtags: ['#tokyo', '#japan', '#cyberpunk', '#neonvibes', '#streetphotography', '#cinematic', '#reelsviral', '#filmmaking', '#traveljapan', '#nightlights'],
    mentions: ['@tokyocameraclub', '@shinjukucity'],
    author: {
      username: 'neon_visionary',
      fullName: 'Alex Rivero | Visual Filmmaker',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    stats: { likes: 384500, comments: 2940 },
    publishedAt: '2024-11-20T14:30:00Z',
    items: [],
    sourceType: 'sample',
  },

  bio: {
    success: true,
    mediaType: 'bio',
    url: 'https://www.instagram.com/designgenius/',
    title: 'Bio Extractor Sample',
    caption: `🚀 Designing the future of digital interfaces & motion UI\n🎨 Daily design inspiration, Figma templates & 3D art\n🏆 Winner of Awwwards Site of the Year 2024\n👇 Download free UI Kit below!`,
    captionFormatted: `🚀 Designing the future of digital interfaces & motion UI\n🎨 Daily design inspiration, Figma templates & 3D art\n🏆 Winner of Awwwards Site of the Year 2024\n👇 Download free UI Kit below!`,
    hashtags: ['#designgenius', '#uiux', '#figma', '#motiondesign'],
    mentions: ['@figma'],
    author: {
      username: 'designgenius',
      fullName: 'Design Genius Studio ✨',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
    },
    profile: {
      username: 'designgenius',
      fullName: 'Design Genius Studio ✨',
      biography: `🚀 Designing the future of digital interfaces & motion UI\n🎨 Daily design inspiration, Figma templates & 3D art\n🏆 Winner of Awwwards Site of the Year 2024\n👇 Download free UI Kit below!`,
      profilePicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&auto=format&fit=crop&q=80',
      profilePicUrlHd: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=95',
      isVerified: true,
      isPrivate: false,
      postsCount: 1420,
      followersCount: 892000,
      followingCount: 310,
    },
    items: [],
    sourceType: 'sample',
  },
};
