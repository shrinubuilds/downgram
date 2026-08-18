import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Post Downloader - Save Photos & Videos from IG Posts',
  description:
    'Download media from Instagram posts and carousel albums in original quality. 100% free and fast with DownGram.',
};

export default function PostDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="post"
      tagline="INSTAGRAM POST DOWNLOADER"
      pageTitle="Download Instagram Posts & Carousels"
      pageSubtitle="Download photos and videos from any public Instagram post or album in full quality."
      icon={<Layers size={17} />}
      accentColor="#a855f7"
    />
  );
}
