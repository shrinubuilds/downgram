'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Film,
  Music,
  Layers,
  ShieldCheck,
  Zap,
  MessageSquare,
} from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions', icon: <Sparkles size={14} /> },
    { id: 'reels', label: 'Reels & Video', icon: <Film size={14} /> },
    { id: 'audio', label: 'Audio & Music', icon: <Music size={14} /> },
    { id: 'carousel', label: 'Carousels & Photos', icon: <Layers size={14} /> },
    { id: 'privacy', label: 'Security & Limits', icon: <ShieldCheck size={14} /> },
  ];

  const faqs = [
    {
      category: 'reels',
      q: 'Is DownGram completely free to use?',
      badge: 'Free & Unlimited',
      badgeColor: '#10b981',
      a: 'Yes! DownGram is 100% free with unlimited downloads for Instagram Reels, Videos, Carousels, Photos, HD DPs, and Audio tracks. There are no subscriptions, paywalls, or hidden fees.',
    },
    {
      category: 'reels',
      q: 'Does DownGram download Reels in original quality without watermarks?',
      badge: 'No Watermark',
      badgeColor: '#e1306c',
      a: 'DownGram connects directly to Instagram media endpoints, retrieving clean video files without watermarks. You receive the exact original MP4 file uploaded by the creator with synchronized audio.',
    },
    {
      category: 'audio',
      q: 'How do I extract and download MP3 audio from an Instagram Reel?',
      badge: 'MP3 Audio',
      badgeColor: '#f59e0b',
      a: 'Simply paste the Instagram Reel or Video URL into DownGram and select the "Audio" tab (or click Download). DownGram extracts the audio track into a downloadable MP3 file with a built-in player preview.',
    },
    {
      category: 'carousel',
      q: 'Can I download all photos from a multi-image Carousel in a single ZIP file?',
      badge: 'Batch ZIP Export',
      badgeColor: '#a855f7',
      a: 'Yes! When you input a Carousel post URL, DownGram displays every slide thumbnail with individual download buttons plus a "Download All Slides (.ZIP)" button that bundles the entire album into a single archive in one click.',
    },
    {
      category: 'carousel',
      q: 'How can I view and download someone’s Instagram Profile Picture in Full HD?',
      badge: 'HD Avatar Zoom',
      badgeColor: '#0284c7',
      a: 'Switch to the "Profile DP" mode and enter any public Instagram username (e.g. @zuck or cristiano) or profile URL. DownGram pulls the maximum uncompressed resolution avatar uploaded to Instagram servers.',
    },
    {
      category: 'privacy',
      q: 'Where are downloaded Instagram files saved on my device?',
      badge: 'Universal Storage',
      badgeColor: '#0095f6',
      a: 'Files are saved directly to your default browser downloads folder. On iPhones/iPads, you can find them in the "Files" app (Downloads folder) or save directly to your Camera Roll. On Android and PC/Mac, files appear directly in your "Downloads" directory.',
    },
    {
      category: 'privacy',
      q: 'Do you log my downloads or require an Instagram account login?',
      badge: '100% Anonymous',
      badgeColor: '#10b981',
      a: 'DownGram requires zero login credentials, API tokens, or personal information. We maintain a strict zero-logging policy. All video extractions and proxy streams are ephemeral and processed in real time.',
    },
    {
      category: 'privacy',
      q: 'Can DownGram download from Private Instagram accounts?',
      badge: 'Public Accounts Only',
      badgeColor: '#f97316',
      a: 'To comply with privacy laws and Instagram terms of service, DownGram only supports public Instagram reels, videos, posts, and profiles.',
    },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" style={{ margin: 'clamp(40px, 6vw, 80px) 0 clamp(60px, 8vw, 100px) 0' }}>
      <div className="container-narrow">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3.5vw, 32px)' }}>
          <div
            className="badge-pill"
            style={{ marginBottom: '10px', cursor: 'default' }}
          >
            <HelpCircle size={13} /> Common Questions
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 3.8vw, 2.3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '8px',
              color: 'var(--text-main)',
              textWrap: 'balance',
            }}
          >
            Got Questions? We’ve Got <span className="text-gradient">Answers</span>
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.82rem, 1.8vw, 0.96rem)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.5,
              textWrap: 'balance',
            }}
          >
            Find instant clarity on downloads, audio extraction, album ZIP exports, and safety.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '24px',
          }}
        >
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`btn-secondary ${isCatActive ? 'active' : ''}`}
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  border: isCatActive ? '1px solid rgba(225, 48, 108, 0.4)' : '1px solid var(--border-subtle)',
                  background: isCatActive ? 'var(--bg-surface-raised)' : 'var(--bg-surface)',
                  boxShadow: isCatActive ? 'var(--neu-pill-active)' : 'var(--neu-btn)',
                  color: isCatActive ? '#e1306c' : 'var(--text-muted)',
                }}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="neu-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: isOpen ? '1px solid rgba(225, 48, 108, 0.4)' : '1px solid var(--border-subtle)',
                  boxShadow: isOpen ? 'var(--neu-raised-glow)' : 'var(--neu-raised)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-main)',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span>{faq.q}</span>
                    <span
                      className="tech-mono-tag"
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '5px',
                        background: 'var(--bg-surface-inset)',
                        boxShadow: 'var(--neu-inset-sm)',
                        border: `1px solid ${faq.badgeColor}`,
                        color: faq.badgeColor,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {faq.badge}
                    </span>
                  </div>

                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: isOpen ? '#e1306c' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 18px 16px 18px',
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                      lineHeight: '1.6',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '12px',
                      animation: 'fadeIn 0.2s ease-in-out',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
