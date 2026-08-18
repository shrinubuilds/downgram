'use client';

import React from 'react';
import {
  Copy,
  Link as LinkIcon,
  DownloadCloud,
  Share2,
  Sparkles,
  Zap,
  Film,
  Music,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const HowToGuide: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Copy Instagram Link',
      subtitle: 'From App or Web Browser',
      desc: 'Open Instagram, tap the Share or 3-dots icon on any Reel, Post, Video, DP, or Profile, and tap "Copy Link".',
      icon: <Share2 size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #f09433 0%, #e6683c 100%)',
      glowColor: 'rgba(240, 148, 51, 0.4)',
      badgeColor: '#f09433',
      mockup: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.85rem' }}>📷</span>
            <span>Instagram Post</span>
          </div>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(240, 148, 51, 0.15)',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Copy size={11} /> Copy Link
          </span>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Paste URL in DownGram',
      subtitle: 'Auto Format Detection',
      desc: 'Return to DownGram and click "Paste". Our extractor engine immediately detects the media type and resolves uncompressed streams.',
      icon: <LinkIcon size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #dc2743 0%, #bc1888 100%)',
      glowColor: 'rgba(220, 39, 67, 0.4)',
      badgeColor: '#e1306c',
      mockup: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '12px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#e1306c', fontWeight: 800 }}>⚡</span>
            <span style={{ color: 'var(--text-main)', fontSize: '0.74rem' }}>instagram.com/reel/...</span>
          </div>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(225, 48, 108, 0.15)',
              color: '#e1306c',
              fontWeight: 800,
              fontSize: '0.72rem',
              whiteSpace: 'nowrap',
            }}
          >
            Auto Detect
          </span>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Preview & Instant Save',
      subtitle: 'MP4 Video, MP3 & ZIP',
      desc: 'Watch the media preview, play extracted audio, and download files directly to your device storage.',
      icon: <DownloadCloud size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #0095f6 0%, #10b981 100%)',
      glowColor: 'rgba(0, 149, 246, 0.4)',
      badgeColor: '#0095f6',
      mockup: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              background: 'rgba(225, 48, 108, 0.12)',
              color: '#e1306c',
              fontWeight: 700,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Film size={11} /> MP4 Video
          </span>
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#ea580c',
              fontWeight: 700,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Music size={11} /> MP3 Audio
          </span>
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              fontWeight: 700,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle2 size={11} /> Ready
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="how-to" style={{ margin: 'clamp(40px, 6vw, 70px) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <div
            className="badge-pill"
            style={{ marginBottom: '10px', cursor: 'default' }}
          >
            <Sparkles size={13} /> Fast 3-Step Guide
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
            How to Download from <span className="text-gradient">Instagram</span>
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
            Save any public Instagram video, audio track, album, or avatar in three easy steps.
          </p>
        </div>

        {/* 3 Step Animated Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            position: 'relative',
          }}
        >
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="how-to-card"
              style={{
                padding: 'clamp(16px, 3vw, 24px)',
              }}
            >
              {/* Card Top Header */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    className="how-to-icon-wrap"
                    style={{
                      background: s.iconBg,
                      boxShadow: `0 8px 24px ${s.glowColor}`,
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Glowing Step Number Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: 'var(--radius-full)',
                        background: s.badgeColor,
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        color: 'var(--text-main)',
                      }}
                    >
                      STEP {s.step}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                    color: 'var(--text-main)',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '14px',
                  }}
                >
                  {s.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {s.desc}
                </p>
              </div>

              {/* Card Bottom Mockup Snippet */}
              <div>{s.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
