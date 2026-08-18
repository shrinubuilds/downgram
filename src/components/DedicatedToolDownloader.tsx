'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { DownloaderInput } from '@/components/DownloaderInput';
import { ResultPreviewModal } from '@/components/ResultPreviewModal';
import { ResultCard } from '@/components/ResultCard';
import { HowToGuide } from '@/components/HowToGuide';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { InstagramScrapeResult, MediaType } from '@/types/instagram';
import { parseInstagramUrl } from '@/lib/utils';
import {
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
  CheckCircle2,
  Zap,
  Shield,
  ArrowLeft,
} from 'lucide-react';

interface DedicatedToolDownloaderProps {
  toolType: MediaType;
  pageTitle: string;
  pageSubtitle: string;
  tagline: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const DedicatedToolDownloader: React.FC<DedicatedToolDownloaderProps> = ({
  toolType,
  pageTitle,
  pageSubtitle,
  tagline,
  icon,
  accentColor,
}) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [scrapeResult, setScrapeResult] = useState<InstagramScrapeResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please paste an Instagram link or username first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setScrapeResult(null);
    setLoadingStep('Connecting to Instagram...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Extracting media stream...');
    }, 700);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Preparing download files...');
    }, 1400);

    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: trimmed,
          mediaType: toolType,
        }),
      });

      const data: InstagramScrapeResult = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to fetch media from Instagram. Please verify the link.');
      } else {
        setScrapeResult(data);
        setIsModalOpen(true);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Network connection error. Please try again.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <>
      <Navbar activeType={toolType} />

      <main style={{ flex: 1, padding: '24px 0 60px 0' }}>
        <div className="container">
          {/* Breadcrumb / Back to All Tools */}
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '12px',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--neu-btn)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="back-btn"
            >
              <ArrowLeft size={14} />
              <span>All Tools</span>
            </Link>
          </div>

          {/* Dedicated Tool Hero Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vw, 32px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '14px',
                background: 'var(--bg-surface-inset)',
                boxShadow: 'var(--neu-inset-sm)',
                border: '1px solid var(--border-subtle)',
                color: accentColor,
                fontWeight: 800,
                fontSize: '0.82rem',
                marginBottom: '14px',
              }}
            >
              {icon}
              <span>{tagline}</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.35rem, 4vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.22,
                marginBottom: '8px',
              }}
            >
              {pageTitle}
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.82rem, 1.8vw, 0.98rem)',
                color: 'var(--text-muted)',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.48,
                fontWeight: 500,
              }}
            >
              {pageSubtitle}
            </p>
          </div>

          {/* Dedicated Downloader Input Bar */}
          <div id="downloader-box">
            <DownloaderInput
              url={url}
              onChangeUrl={handleUrlChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              activeType={toolType}
              error={error}
              loadingStep={loadingStep}
            />
          </div>

          {/* Inline Result Card (if fetched) */}
          {scrapeResult && (
            <div style={{ marginTop: '30px' }}>
              <ResultCard data={scrapeResult} selectedType={toolType} />
            </div>
          )}

          {/* Other Tools Quick Navigation Bar */}
          <div
            style={{
              marginTop: '48px',
              padding: '20px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-surface)',
              boxShadow: 'var(--neu-raised)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px',
              }}
            >
              Switch to Other Instagram Tools
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {[
                { href: '/reels', label: 'Reels Downloader', icon: <Film size={16} />, color: '#e1306c', active: toolType === 'reel' },
                { href: '/audio', label: 'Audio Extractor', icon: <Music size={16} />, color: '#f59e0b', active: toolType === 'audio' },
                { href: '/photos', label: 'Photo & Carousel', icon: <Layers size={16} />, color: '#a855f7', active: toolType === 'post' },
                { href: '/profile', label: 'Profile Picture', icon: <UserCheck size={16} />, color: '#10b981', active: toolType === 'profile' },
                { href: '/captions', label: 'Caption Extractor', icon: <FileText size={16} />, color: '#0095f6', active: toolType === 'caption' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: item.active ? 'var(--bg-surface-raised)' : 'var(--bg-surface)',
                    boxShadow: item.active ? 'var(--neu-inset-sm)' : 'var(--neu-btn)',
                    border: item.active ? `1.5px solid ${item.color}` : '1px solid var(--border-subtle)',
                    color: item.active ? item.color : 'var(--text-muted)',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* How-To & FAQ Sections */}
        <HowToGuide />
        <FaqSection />
      </main>

      <Footer />

      {/* Pop-Up Modal (if user opens it) */}
      <ResultPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={scrapeResult}
        selectedType={toolType}
      />
    </>
  );
};
