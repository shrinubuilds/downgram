import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Caption & Hashtag Extractor - Copy Captions from Reels & Posts',
  description:
    'Extract and copy complete formatted captions, emojis, and hashtags from any public Instagram Post or Reel with DownGram.',
};

export default function CaptionsDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="caption"
      tagline="INSTAGRAM CAPTION EXTRACTOR"
      pageTitle="Extract Instagram Captions & Hashtags"
      pageSubtitle="Paste any Instagram post or reel link below to copy the full caption text with emojis and extracted hashtag list."
      icon={<FileText size={17} />}
      accentColor="#0095f6"
    />
  );
}
