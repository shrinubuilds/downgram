'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MediaTypeTabs } from '@/components/MediaTypeTabs';
import { DownloaderInput } from '@/components/DownloaderInput';
import { ResultPreviewModal } from '@/components/ResultPreviewModal';
import { HowToGuide } from '@/components/HowToGuide';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { HistoryItem, InstagramScrapeResult, MediaType } from '@/types/instagram';
import { parseInstagramUrl } from '@/lib/utils';
import { Shield, Zap, Music2, CheckCircle2, Activity } from 'lucide-react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [activeType, setActiveType] = useState<MediaType>('reel');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [scrapeResult, setScrapeResult] = useState<InstagramScrapeResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('downgram_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.warn('Could not read history from localStorage:', err);
    }
  }, []);

  // Sync history to localStorage
  const saveHistory = (items: HistoryItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem('downgram_history', JSON.stringify(items));
    } catch (err) {
      console.warn('Could not save history to localStorage:', err);
    }
  };

  const handleSaveToHistory = (item: HistoryItem) => {
    const updated = [item, ...history.filter((h) => h.id !== item.id)].slice(0, 30);
    saveHistory(updated);
  };

  // URL Change handler with auto-detection
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    setError(null);

    // Auto-detect type if valid URL entered
    if (newUrl.trim().length > 10) {
      const parsed = parseInstagramUrl(newUrl);
      if (parsed.isValid && parsed.mediaType && parsed.mediaType !== activeType) {
        setActiveType(parsed.mediaType);
      }
    }
  };

  // Submit Handler with progressive feedback steps
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
    setLoadingStep('Connecting to Instagram & extracting stream...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Bypassing restrictions & resolving 4K stream...');
    }, 700);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Processing uncompressed media & audio...');
    }, 1400);

    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: trimmed,
          mediaType: activeType,
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

  // Sample Loader
  const handleLoadSample = async (typeKey: string) => {
    setIsLoading(true);
    setError(null);
    setScrapeResult(null);
    setActiveType(typeKey as MediaType);
    setLoadingStep(`Loading live 4K ${typeKey} preview...`);

    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: `demo:${typeKey}`,
          useSample: true,
        }),
      });
      const data: InstagramScrapeResult = await res.json();
      if (data.success) {
        setScrapeResult(data);
        setUrl(data.url);
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Sample fetch error:', err);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <>
      <Navbar
        onSelectType={(type) => {
          setActiveType(type);
          setScrapeResult(null);
          setIsModalOpen(false);
        }}
        activeType={activeType}
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container">
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              className="badge-pill pulse-glow"
              style={{ marginBottom: '16px', cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Activity size={14} color="#22c55e" />
              <span>Real-Time Ultra HD Instagram Downloader & Media Extractor</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              Download Instagram <span className="text-gradient">Reels, Audio,</span>
              <br />
              <span className="text-gradient-purple">HD DPs, Posts & Captions</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'var(--text-muted)',
                maxWidth: '680px',
                margin: '0 auto 32px auto',
                lineHeight: 1.5,
              }}
            >
              Rip uncompressed 4K reels, extract crystal clear MP3 audio tracks, inspect captions and hashtags, or download full-size profile avatars instantly in real time.
            </p>
          </div>

          {/* Media Type Filter Tabs */}
          <MediaTypeTabs
            activeType={activeType}
            onSelect={(type) => {
              setActiveType(type);
              setError(null);
            }}
          />

          {/* Search Input Bar */}
          <div id="downloader-box">
            <DownloaderInput
              url={url}
              onChangeUrl={handleUrlChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              activeType={activeType}
              onLoadSample={handleLoadSample}
              error={error}
              loadingStep={loadingStep}
            />
          </div>



          {/* Value Highlights */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              marginTop: '48px',
              color: 'var(--text-dim)',
              fontSize: '0.88rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#22c55e" />
              <span>No Watermarks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} color="#fcaf45" />
              <span>Instant High Speed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Music2 size={16} color="#e1306c" />
              <span>MP3 Audio Extraction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} color="#0095f6" />
              <span>100% Anonymous & Secure</span>
            </div>
          </div>
        </div>

        {/* How To Step-by-Step Guide */}
        <HowToGuide />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      <Footer />

      {/* Pop-Up Preview Modal */}
      <ResultPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={scrapeResult}
        selectedType={activeType}
        onSaveToHistory={handleSaveToHistory}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={() => saveHistory([])}
        onSelectItem={(item) => {
          setUrl(item.url);
          setActiveType(item.mediaType);
          setIsHistoryOpen(false);
          handleSubmit();
        }}
      />
    </>
  );
}
