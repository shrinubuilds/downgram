import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { Film } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader - Download IG Videos Online',
  description:
    'Download Instagram Videos and Reels in high quality MP4 format with audio without watermarks. Free online downloader by DownGram.',
};

export default function VideoDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="reel"
      tagline="INSTAGRAM VIDEO DOWNLOADER"
      pageTitle="Download Instagram Videos & Reels"
      pageSubtitle="Save public Instagram feed videos, clips, and Reels directly to your device in MP4 format."
      icon={<Film size={17} />}
      accentColor="#e1306c"
    />
  );
}
