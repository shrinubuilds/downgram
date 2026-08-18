'use client';

import React from 'react';
import Link from 'next/link';
import {
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  DownloadCloud,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { MediaType } from '@/types/instagram';

export const FeaturesSection: React.FC = () => {
  const tools = [
    {
      id: 'reel' as MediaType,
      href: '/reels',
      title: 'Reels & Video',
      subtitle: 'Original MP4 Video Streams',
      desc: 'Save Instagram Reels, clips, and feed videos directly in original MP4 quality with synchronized sound and zero watermarks.',
      icon: <Film size={22} />,
      color: '#e1306c',
      gradient: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
      badge: 'MP4 Video',
    },
    {
      id: 'audio' as MediaType,
      href: '/audio',
      title: 'Audio Extractor',
      subtitle: 'Background Music & Songs',
      desc: 'Rip clean background audio, trending reels music, and voice tracks into playable and downloadable MP3 audio files.',
      icon: <Music size={22} />,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
      badge: 'MP3 Audio',
    },
    {
      id: 'post' as MediaType,
      href: '/photos',
      title: 'Photos & Carousels',
      subtitle: 'Single Photos & ZIP Export',
      desc: 'Download single photos in full resolution or batch export entire multi-slide carousel albums into a single ZIP archive.',
      icon: <Layers size={22} />,
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      badge: 'Photos & ZIP',
    },
    {
      id: 'profile' as MediaType,
      href: '/profile',
      title: 'Profile Picture (DP)',
      subtitle: 'Avatar Zoom & Bio Text',
      desc: 'View and download uncompressed full-size profile pictures (DP) from any public account, and copy profile bio text.',
      icon: <UserCheck size={22} />,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      badge: 'Profile DP',
    },
    {
      id: 'caption' as MediaType,
      href: '/captions',
      title: 'Captions & Hashtags',
      subtitle: 'Formatted Text & Tags',
      desc: 'Extract full post captions with emojis, clean line breaks, and all tagged creator hashtags ready for copying.',
      icon: <FileText size={22} />,
      color: '#0095f6',
      gradient: 'linear-gradient(135deg, #0095f6, #2563eb)',
      badge: 'Captions',
    },
  ];

  const highlights = [
    {
      icon: <Zap size={20} color="#f59e0b" />,
      title: 'Sub-Second Resolution',
      desc: 'High-speed cloud extractor engine fetches direct media streams with minimal latency.',
    },
    {
      icon: <Shield size={20} color="#10b981" />,
      title: '100% Anonymous & Safe',
      desc: 'Zero account logins, zero personal data logs, and strictly ephemeral stream processing.',
    },
    {
      icon: <DownloadCloud size={20} color="#0095f6" />,
      title: 'No Watermarks',
      desc: 'Original media files with untouched resolution and crisp audio tracks.',
    },
    {
      icon: <CheckCircle2 size={20} color="#a855f7" />,
      title: 'Universal Compatibility',
      desc: 'Optimized for iPhone, Android, iPad, Mac, Windows, and Linux browsers.',
    },
  ];

  return (
    <section id="tools-matrix" style={{ margin: 'clamp(40px, 6vw, 70px) 0' }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
          <div className="badge-pill" style={{ marginBottom: '10px', cursor: 'default' }}>
            <Sparkles size={13} /> Dedicated Downloader Suite
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
            Explore DownGram <span className="text-gradient">Power Tools</span>
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
            Select a specialized tool designed specifically for your media download needs.
          </p>
        </div>

        {/* 5-Card Neumorphic Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="neu-tool-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--neu-raised)',
                border: '1px solid var(--border-subtle)',
                textDecoration: 'none',
                color: 'var(--text-main)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div>
                {/* Top Row: Inset Icon Dock & Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '14px',
                      background: 'var(--bg-surface-inset)',
                      boxShadow: 'var(--neu-inset-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tool.color,
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {tool.icon}
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'var(--bg-surface-inset)',
                      boxShadow: 'var(--neu-inset-sm)',
                      color: tool.color,
                      border: `1px solid ${tool.color}33`,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    marginBottom: '4px',
                    color: 'var(--text-main)',
                  }}
                >
                  {tool.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '10px',
                  }}
                >
                  {tool.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '18px',
                  }}
                >
                  {tool.desc}
                </p>
              </div>

              {/* Action Link Button */}
              <div
                className="tool-card-cta"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface)',
                  boxShadow: 'var(--neu-btn)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: tool.color,
                  transition: 'all 0.2s ease',
                }}
              >
                <span>Launch Tool</span>
                <ArrowRight size={15} />
              </div>
            </Link>
          ))}
        </div>

        {/* 4-Pillar Neumorphic Key Benefits Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {highlights.map((h, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                borderRadius: '16px',
                background: 'var(--bg-surface-inset)',
                boxShadow: 'var(--neu-inset-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--bg-surface)',
                  boxShadow: 'var(--neu-btn)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {h.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                  {h.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {h.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .neu-tool-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--neu-raised-glow) !important;
        }
        .neu-tool-card:hover .tool-card-cta {
          background: var(--bg-surface-raised) !important;
          box-shadow: var(--neu-raised-sm) !important;
        }
      `}</style>
    </section>
  );
};
