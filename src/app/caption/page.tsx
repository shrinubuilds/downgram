import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Caption Extractor - Copy Full Captions & Tags Online',
  description:
    'Extract and copy complete formatted captions, emojis, and hashtags from any public Instagram Post or Reel with DownGram.',
};

export default function CaptionPage() {
  return (
    <DedicatedToolDownloader
      toolType="caption"
      tagline="INSTAGRAM CAPTION EXTRACTOR"
      pageTitle="Extract Instagram Captions & Tags"
      pageSubtitle="Extract full captions, clean line breaks, and tagged hashtags from any Instagram Reel or Post."
      icon={<FileText size={17} />}
      accentColor="#0095f6"
    />
  );
}
