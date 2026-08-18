'use client';

import React from 'react';
import {
  Copy,
  Link as LinkIcon,
  DownloadCloud,
  Share2,
  Sparkles,
  Film,
  Music,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const HowToGuide: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Copy Instagram Link',
      subtitle: 'From App or Web Browser',
      desc: 'Open Instagram, tap the Share icon on any Reel, Post, Audio, or Profile, and tap "Copy Link".',
      icon: <Share2 size={22} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #f09433 0%, #e6683c 100%)',
      glowColor: 'rgba(240, 148, 51, 0.35)',
      badgeColor: '#f09433',
      mockup: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '14px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.9rem' }}>📱</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Instagram Post</span>
          </div>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'rgba(240, 148, 51, 0.15)',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Copy size={12} /> Copy Link
          </span>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Paste URL in DownGram',
      subtitle: 'Instant Auto-Detection',
      desc: 'Paste the copied URL in the input bar above. DownGram automatically extracts the highest quality uncompressed streams.',
      icon: <LinkIcon size={22} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #dc2743 0%, #bc1888 100%)',
      glowColor: 'rgba(220, 39, 67, 0.35)',
      badgeColor: '#e1306c',
      mockup: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '14px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>
            <span style={{ color: '#e1306c', fontWeight: 800 }}>⚡</span>
            <span style={{ color: 'var(--text-main)', fontSize: '0.74rem', fontWeight: 600 }}>instagram.com/reel/...</span>
          </div>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
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
      title: 'Download & Enjoy',
      subtitle: 'Original MP4, MP3 & ZIP',
      desc: 'Preview the media and click Download to save the video, audio stem, or photo album directly to your device storage.',
      icon: <DownloadCloud size={22} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #0095f6 0%, #10b981 100%)',
      glowColor: 'rgba(0, 149, 246, 0.35)',
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
              padding: '5px 10px',
              borderRadius: '8px',
              background: 'rgba(225, 48, 108, 0.12)',
              color: '#e1306c',
              fontWeight: 800,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Film size={12} /> MP4 Video
          </span>
          <span
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Music size={12} /> MP3 Audio
          </span>
          <span
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              fontWeight: 800,
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle2 size={12} /> Ready
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="how-to" style={{ margin: 'clamp(48px, 7vw, 84px) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4.5vw, 44px)' }}>
          <div
            className="badge-pill"
            style={{ marginBottom: '10px', cursor: 'default' }}
          >
            <Sparkles size={13} /> Fast 3-Step Guide
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
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
              fontSize: 'clamp(0.82rem, 1.8vw, 0.98rem)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.5,
              textWrap: 'balance',
            }}
          >
            Save any public Instagram video, audio track, album, or avatar in three simple steps.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div
          className="how-to-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(14px, 2.5vw, 24px)',
            position: 'relative',
          }}
        >
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="how-to-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(18px, 3vw, 26px)',
                borderRadius: '22px',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--neu-raised)',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Card Top Header */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    className="how-to-icon-wrap"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: s.iconBg,
                      boxShadow: `0 6px 18px ${s.glowColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Step Number Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      background: 'var(--bg-surface-inset)',
                      boxShadow: 'var(--neu-inset-sm)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '9999px',
                        background: s.badgeColor,
                        display: 'inline-block',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      STEP {s.step}
                    </span>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(1.08rem, 2.2vw, 1.25rem)',
                    fontWeight: 800,
                    marginBottom: '4px',
                    letterSpacing: '-0.015em',
                    color: 'var(--text-main)',
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: s.badgeColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '10px',
                  }}
                >
                  {s.subtitle}
                </p>

                <p
                  style={{
                    fontSize: 'clamp(0.82rem, 1.6vw, 0.88rem)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55,
                    marginBottom: '18px',
                  }}
                >
                  {s.desc}
                </p>
              </div>

              {/* Card Bottom Mockup Snippet */}
              <div style={{ marginTop: 'auto' }}>{s.mockup}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-to-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--neu-raised-glow) !important;
        }
      `}</style>
    </section>
  );
};
