import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DownGram - Ultimate Instagram Downloader (Reels, Videos, Posts, DP, Audio & Bio)',
  description:
    'Download Instagram Reels in 4K/HD, Carousel Photos, Full HD Profile Pictures (DP), Audio tracks from Reels, and extract Bios and Captions with DownGram. Fast, secure, and 100% free.',
  keywords: [
    'instagram downloader',
    'download instagram reels',
    'instagram video downloader',
    'instagram audio extractor',
    'instagram profile picture downloader',
    'instagram caption extractor',
    'instagram bio copy',
    'downgram',
  ],
  authors: [{ name: 'DownGram Team' }],
  openGraph: {
    title: 'DownGram - All-in-One Instagram Downloader',
    description:
      'Fast, high-quality downloader for Instagram Reels, Videos, Carousels, Audio, DP, and Bio metadata.',
    type: 'website',
    url: 'https://downgram.app',
    siteName: 'DownGram',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DownGram - Instagram Reels, Audio & Media Downloader',
    description:
      'Download Instagram Reels, Audio tracks, Videos, Full HD DP, Captions & Bios instantly.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
