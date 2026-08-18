'use client';

import React, { useState } from 'react';
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
  Play,
  Heart,
  MessageCircle,
  Bookmark,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

export const HowToGuide: React.FC = () => {
  const [copiedDemo, setCopiedDemo] = useState(false);

  const handleTryDemoReel = () => {
    const input = document.querySelector('input.downloader-input-field') as HTMLInputElement;
    const downloaderBox = document.getElementById('downloader-box');
    
    if (input) {
      input.value = 'https://www.instagram.com/reel/C3b7xQ4L8_M/';
      // Trigger input event for React state
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
      input.focus();
    }
    
    if (downloaderBox) {
      downloaderBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 3000);
  };

  const steps = [
    {
      step: '01',
      title: 'Copy Reel Link',
      subtitle: 'From Instagram App or Web',
      desc: 'Open Instagram, find any Reel or Video, tap the Share icon (or three dots), and select "Copy Link".',
      icon: <Share2 size={24} color="#ffffff" />,
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
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f09433, #e1306c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 800,
              }}
            >
              IG
            </div>
            <span style={{ color: 'var(--text-main)', fontSize: '0.8rem', fontWeight: 700 }}>Instagram Reel</span>
          </div>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(240, 148, 51, 0.15)',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Copy size={12} /> Link Copied
          </span>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Paste into DownGram',
      subtitle: 'Instant Stream Extraction',
      desc: 'Paste the link into the search bar. DownGram connects to Instagram and prepares the high-res file.',
      icon: <LinkIcon size={24} color="#ffffff" />,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#e1306c', fontWeight: 800 }}>⚡</span>
            <span style={{ color: 'var(--text-main)', fontSize: '0.76rem', fontWeight: 600 }}>instagram.com/reel/C3b7...</span>
          </div>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(225, 48, 108, 0.15)',
              color: '#e1306c',
              fontWeight: 800,
              fontSize: '0.72rem',
              whiteSpace: 'nowrap',
            }}
          >
            Auto Parsed
          </span>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Save MP4 or MP3',
      subtitle: 'Original Quality Export',
      desc: 'Click Download to save the clean MP4 video with full sound, or extract the audio track as an MP3 file.',
      icon: <DownloadCloud size={24} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #0095f6 0%, #10b981 100%)',
      glowColor: 'rgba(0, 149, 246, 0.35)',
      badgeColor: '#0095f6',
      mockup: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              padding: '5px 10px',
              borderRadius: '10px',
              background: 'rgba(225, 48, 108, 0.12)',
              color: '#e1306c',
              fontWeight: 800,
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Film size={12} /> Save MP4
          </span>
          <span
            style={{
              padding: '5px 10px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.12)',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Music size={12} /> Extract MP3
          </span>
          <span
            style={{
              padding: '5px 8px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              fontWeight: 800,
              fontSize: '0.74rem',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <CheckCircle2 size={12} /> Ready
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
            Follow these three simple steps to download any Instagram Reel, Video, Audio, or Photo.
          </p>
        </div>

        {/* Interactive Example Reel Showcase Card */}
        <div
          className="example-reel-showcase"
          style={{
            maxWidth: '780px',
            margin: '0 auto clamp(24px, 4vw, 36px) auto',
            padding: 'clamp(16px, 3vw, 24px)',
            borderRadius: '24px',
            background: 'var(--bg-surface)',
            boxShadow: 'var(--neu-raised)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* Reel Visual Preview Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 300px' }}>
            {/* Phone/Reel Thumbnail Mockup */}
            <div
              style={{
                width: '84px',
                height: '112px',
                borderRadius: '16px',
                background: 'linear-gradient(145deg, #2b0938, #0e111a)',
                boxShadow: 'var(--neu-inset-sm), 0 8px 20px rgba(0, 0, 0, 0.3)',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '8px',
                flexShrink: 0,
              }}
            >
              {/* Animated Glowing Center Play Button */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Play size={14} fill="#ffffff" style={{ marginLeft: '2px' }} />
                </div>
              </div>

              {/* Reel Mini Tag */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', position: 'relative', zIndex: 2 }}>
                <span
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 900,
                    padding: '2px 5px',
                    borderRadius: '5px',
                    background: 'rgba(225, 48, 108, 0.85)',
                    color: '#fff',
                    letterSpacing: '0.04em',
                  }}
                >
                  REEL
                </span>
              </div>

              {/* Reel Meta icons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.9)', fontWeight: 800 }}>@nature</span>
                <Heart size={10} color="#ff3040" fill="#ff3040" />
              </div>
            </div>

            {/* Example Reel Info */}
            <div>
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#e1306c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '4px',
                }}
              >
                Interactive Example
              </div>
              <h4
                style={{
                  fontSize: 'clamp(0.96rem, 2vw, 1.12rem)',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  marginBottom: '4px',
                }}
              >
                National Park Sunset Reel
              </h4>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.45,
                  maxWidth: '320px',
                }}
              >
                Sample Instagram Reel ready for testing download and audio extraction.
              </p>
            </div>
          </div>

          {/* Action Button: Fill Demo URL */}
          <button
            onClick={handleTryDemoReel}
            className="btn-gradient"
            style={{
              padding: '12px 20px',
              borderRadius: '16px',
              fontSize: '0.88rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: 'var(--neu-pill-active)',
              flex: '0 0 auto',
            }}
          >
            <Zap size={16} fill="#ffffff" />
            <span>{copiedDemo ? 'Loaded into Search Bar! 🚀' : 'Try Example Reel Demo'}</span>
          </button>
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
                    marginBottom: '16px',
                  }}
                >
                  <div
                    className="how-to-icon-wrap"
                    style={{
                      background: s.iconBg,
                      boxShadow: `0 6px 20px ${s.glowColor}`,
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Glowing Step Number Pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-surface-inset)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--neu-inset-sm)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: 'var(--radius-full)',
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
                    letterSpacing: '-0.01em',
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
                    lineHeight: '1.5',
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
    </section>
  );
};
