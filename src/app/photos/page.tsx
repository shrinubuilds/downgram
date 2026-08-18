import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Photo & Carousel Downloader - Download IG Albums & ZIP',
  description:
    'Download single Instagram photos and multi-image carousel posts in full resolution or batch export entire albums into a single ZIP archive.',
};

export default function PhotosDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="post"
      tagline="INSTAGRAM PHOTO & CAROUSEL DOWNLOADER"
      pageTitle="Download Instagram Photos & Multi-Slide Albums"
      pageSubtitle="Save high-resolution Instagram photos and multi-image carousel posts with 1-click ZIP archive batch export."
      icon={<Layers size={17} />}
      accentColor="#a855f7"
    />
  );
}
