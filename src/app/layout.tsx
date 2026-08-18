import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DownGram - Instagram Downloader for Reels, Photos, Audio & Profile DP',
  description:
    'Download Instagram Reels, Videos, Carousel Photos, Full HD Profile Pictures, and MP3 Audio tracks with DownGram. Fast, secure, and 100% free.',
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
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
      <body className={jakarta.className}>
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
