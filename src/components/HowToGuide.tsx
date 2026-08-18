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
  ArrowRight,
  Check,
} from 'lucide-react';

export const HowToGuide: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Copy Instagram Link',
      subtitle: 'From App or Browser',
      desc: 'Open Instagram on your phone or computer, tap the Share or 3-dots icon on any Reel, Post, or Video, and tap "Copy Link".',
      icon: <Share2 size={22} color="#ffffff" />,
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
            <span style={{ fontSize: '0.9rem' }}>📸</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Instagram Media</span>
          </div>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'rgba(240, 148, 51, 0.15)',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.72rem',
              display: 'inline-flex',
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
      subtitle: 'One-Click Instant Fetch',
      desc: 'Return to DownGram and click the "Paste" button. Our extractor immediately identifies the media and resolves clean streams.',
      icon: <LinkIcon size={22} color="#ffffff" />,
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
            borderRadius: '14px',
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
            <span style={{ color: 'var(--text-main)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>instagram.com/...</span>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Check size={11} /> Auto Ready
          </span>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Preview & Instant Download',
      subtitle: 'Original Quality Storage',
      desc: 'Watch the preview, play extracted audio, and click Download to save the original file directly to your camera roll or downloads folder.',
      icon: <DownloadCloud size={22} color="#ffffff" />,
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
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(225, 48, 108, 0.12)',
              color: '#e1306c',
              fontWeight: 700,
              fontSize: '0.72rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Film size={11} /> MP4 Video
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#ea580c',
              fontWeight: 700,
              fontSize: '0.72rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Music size={11} /> MP3 Audio
          </span>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              fontWeight: 700,
              fontSize: '0.72rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle2 size={11} /> Direct Save
          </span>
        </div>
      ),
    },
  ];

  return (
    <section id="how-to" style={{ margin: 'clamp(44px, 6vw, 76px) 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <div
            className="badge-pill"
            style={{ marginBottom: '10px', cursor: 'default' }}
          >
            <Sparkles size={13} /> 3-Step Simple Guide
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
            Save any public Instagram video, audio track, album, or avatar in three simple steps.
          </p>
        </div>

        {/* 3-Step Neumorphic Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '18px',
            position: 'relative',
          }}
        >
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="how-to-card"
              style={{
                padding: 'clamp(18px, 3.5vw, 26px)',
                borderRadius: '22px',
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--neu-raised)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                      borderRadius: '15px',
                      background: s.iconBg,
                      boxShadow: `0 6px 18px ${s.glowColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Glowing Step Number Pill */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      background: 'var(--bg-surface-inset)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--neu-inset-sm)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
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
                    fontSize: '1.18rem',
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
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '10px',
                  }}
                >
                  {s.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.55',
                    marginBottom: '18px',
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

      <style jsx>{`
        .how-to-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--neu-raised-glow) !important;
        }
      `}</style>
    </section>
  );
};
