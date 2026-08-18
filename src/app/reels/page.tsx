import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { Film } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader - Download Reels & Videos Online',
  description:
    'Download Instagram Reels and Videos in original MP4 quality without watermarks. Fast, free, and works directly in your browser with DownGram.',
};

export default function ReelsDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="reel"
      tagline="INSTAGRAM REELS DOWNLOADER"
      pageTitle="Download Instagram Reels & Videos"
      pageSubtitle="Save any Instagram Reel or Video in clean MP4 quality without watermarks directly to your phone, tablet, or computer."
      icon={<Film size={17} />}
      accentColor="#e1306c"
    />
  );
}
