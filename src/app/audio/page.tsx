import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Audio Downloader - Extract MP3 from Reels & Videos',
  description:
    'Extract and download background music, songs, and voice tracks from any Instagram Reel or Video as clean MP3 audio files with DownGram.',
};

export default function AudioDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="audio"
      tagline="INSTAGRAM AUDIO EXTRACTOR"
      pageTitle="Download Instagram Audio & MP3 Tracks"
      pageSubtitle="Paste any Instagram Reel or Video link below to extract high-quality background audio tracks and voice stems into MP3 format."
      icon={<Music size={17} />}
      accentColor="#f59e0b"
    />
  );
}
