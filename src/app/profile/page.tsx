import { Metadata } from 'next';
import { DedicatedToolDownloader } from '@/components/DedicatedToolDownloader';
import { UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instagram Profile Picture (DP) Downloader & Bio Viewer',
  description:
    'View and download full-size original Instagram profile pictures (DP) and copy profile bio text with DownGram.',
};

export default function ProfileDownloaderPage() {
  return (
    <DedicatedToolDownloader
      toolType="profile"
      tagline="INSTAGRAM PROFILE PICTURE DOWNLOADER"
      pageTitle="Download Instagram Profile Pictures (DP)"
      pageSubtitle="Enter any public Instagram username or profile link below to view and download original full-size avatars and copy profile details."
      icon={<UserCheck size={17} />}
      accentColor="#10b981"
    />
  );
}
