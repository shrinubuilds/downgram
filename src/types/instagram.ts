export type MediaType = 'reel' | 'video' | 'post' | 'profile' | 'bio' | 'caption' | 'audio' | 'story';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  downloadUrl?: string;
  filename?: string;
}

export interface AudioInfo {
  title?: string;
  artist?: string;
  audioUrl: string;
  duration?: number;
  waveform?: number[];
  coverUrl?: string;
  isOriginalAudio?: boolean;
}

export interface ProfileInfo {
  username: string;
  fullName?: string;
  biography?: string;
  profilePicUrl: string;
  profilePicUrlHd?: string;
  isVerified?: boolean;
  isPrivate?: boolean;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  externalUrl?: string;
}

export interface InstagramScrapeResult {
  success: boolean;
  mediaType: MediaType;
  url: string;
  shortcode?: string;
  title?: string;
  caption?: string;
  captionFormatted?: string;
  hashtags?: string[];
  mentions?: string[];
  author?: {
    username: string;
    fullName?: string;
    avatarUrl?: string;
    isVerified?: boolean;
  };
  stats?: {
    likes?: number;
    comments?: number;
    views?: number;
    plays?: number;
  };
  publishedAt?: string;
  items: MediaItem[];
  audio?: AudioInfo;
  profile?: ProfileInfo;
  error?: string;
  sourceType?: 'live' | 'fallback' | 'sample';
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  url: string;
  mediaType: MediaType;
  title: string;
  thumbnailUrl: string;
  downloadUrl: string;
  itemCount?: number;
}
