'use client';

import React from 'react';
import {
  Film,
  Music,
  Layers,
  Video,
  UserCheck,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { MediaType } from '@/types/instagram';

interface FeaturesSectionProps {
  onSelectType?: (type: MediaType) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectType }) => {
  const tools = [
    {
      id: 'reel' as MediaType,
      title: '4K Reels Video Downloader',
      subtitle: 'Ultra HD MP4 Video Streams',
      badge: '4K Ultra HD',
      icon: <Film size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #f09433 0%, #dc2743 100%)',
      glowColor: 'rgba(220, 39, 67, 0.35)',
      badgeBg: 'rgba(220, 39, 67, 0.12)',
      badgeColor: '#dc2743',
      points: [
        'Zero compression, preserves authentic 1080p / 4K fidelity',
        'Completely watermark-free with original 60fps bitrate',
        'Includes embedded sound and synchronized audio',
      ],
      buttonLabel: 'Launch Reels Downloader',
    },
    {
      id: 'audio' as MediaType,
      title: 'Lossless MP3 Audio Extractor',
      subtitle: 'Rip Background Music & Sounds',
      badge: '320kbps MP3',
      icon: <Music size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #fcaf45 0%, #f77737 100%)',
      glowColor: 'rgba(252, 175, 69, 0.35)',
      badgeBg: 'rgba(247, 119, 55, 0.12)',
      badgeColor: '#ea580c',
      points: [
        'Extract viral background audio & songs from any Reel or Post',
        'Built-in audio player with waveform preview before download',
        'High-bitrate stereo MP3 file conversion',
      ],
      buttonLabel: 'Launch Audio Extractor',
    },
    {
      id: 'post' as MediaType,
      title: 'Multi-Slide Carousel & Photo Downloader',
      subtitle: 'Batch Album & ZIP Archiver',
      badge: 'Multi-Slide ZIP',
      icon: <Layers size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #833ab4 0%, #c13584 100%)',
      glowColor: 'rgba(131, 58, 180, 0.35)',
      badgeBg: 'rgba(131, 58, 180, 0.12)',
      badgeColor: '#833ab4',
      points: [
        'Download all photos & videos in multi-slide carousels at once',
        '1-click ZIP package download for entire album collections',
        'Preserves full HDR resolution and original color gamut',
      ],
      buttonLabel: 'Launch Carousel Downloader',
    },
    {
      id: 'profile' as MediaType,
      title: 'Full HD Profile DP & Bio Inspector',
      subtitle: 'Full-Resolution Avatar Zoom',
      badge: 'Full HD Avatar',
      icon: <UserCheck size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #0095f6 0%, #10b981 100%)',
      glowColor: 'rgba(0, 149, 246, 0.35)',
      badgeBg: 'rgba(0, 149, 246, 0.12)',
      badgeColor: '#0284c7',
      points: [
        'Inspect, zoom in, and download full-size original profile avatars',
        'Extract verified badges, bio text, and follower count statistics',
        'Works for both creators and brand public profiles',
      ],
      buttonLabel: 'Launch Profile DP Tool',
    },
    {
      id: 'video' as MediaType,
      title: 'Feed & IGTV Video Downloader',
      subtitle: 'High-Bitrate Long-Form Video',
      badge: '1080p HD',
      icon: <Video size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
      glowColor: 'rgba(2, 132, 199, 0.35)',
      badgeBg: 'rgba(2, 132, 199, 0.12)',
      badgeColor: '#0369a1',
      points: [
        'Download full-length feed videos, long clips, and broadcasts',
        'Direct connection to high-speed CDN delivery servers',
        'Universal MP4 compatibility on all mobile & desktop devices',
      ],
      buttonLabel: 'Launch Video Downloader',
    },
    {
      id: 'caption' as MediaType,
      title: 'Caption, Hashtags & Bio Formatter',
      subtitle: 'Metadata & Text Extraction',
      badge: 'Text & Tags',
      icon: <FileText size={26} color="#ffffff" />,
      iconBg: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      glowColor: 'rgba(255, 65, 108, 0.35)',
      badgeBg: 'rgba(255, 65, 108, 0.12)',
      badgeColor: '#e11d48',
      points: [
        'Preserves emojis, precise line breaks, and caption formatting',
        'Interactive hashtag cloud analysis for creator research',
        '1-click export to clipboard or formatted .TXT file',
      ],
      buttonLabel: 'Launch Caption Tool',
    },
  ];

  const handleToolClick = (type: MediaType) => {
    if (onSelectType) {
      onSelectType(type);
    }
    const inputArea = document.querySelector('#downloader-box') || document.querySelector('input');
    if (inputArea) {
      inputArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (inputArea instanceof HTMLInputElement) {
        inputArea.focus();
      }
    }
  };

  return (
    <section id="features" style={{ margin: '90px 0 50px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <div
            className="badge-pill"
            style={{ marginBottom: '14px', cursor: 'default' }}
          >
            <Sparkles size={14} /> DownGram Power Suite
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Engineered For Every <span className="text-gradient">Instagram Format</span>
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '1.08rem',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Choose from specialized extraction tools built for uncompressed 4K video, high-bitrate MP3 audio, full multi-image carousels, and HD avatars.
          </p>
        </div>

        {/* 6-Card Interactive Tool Suite Grid */}
        <div className="grid-responsive" style={{ gap: '24px' }}>
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="tool-card"
            >
              {/* Card Top: Icon & Badge */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                  }}
                >
                  <div
                    className="tool-card-icon-wrap"
                    style={{
                      background: tool.iconBg,
                      boxShadow: `0 8px 24px ${tool.glowColor}`,
                    }}
                  >
                    {tool.icon}
                  </div>

                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.03em',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: tool.badgeBg,
                      color: tool.badgeColor,
                      textTransform: 'uppercase',
                      border: '1px solid currentColor',
                      opacity: 0.95,
                    }}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                    color: 'var(--text-main)',
                  }}
                >
                  {tool.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--text-dim)',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {tool.subtitle}
                </p>

                {/* Feature Bullet Points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                  {tool.points.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '9px',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.45,
                      }}
                    >
                      <CheckCircle2
                        size={17}
                        color="#10b981"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Button */}
              <button
                type="button"
                onClick={() => handleToolClick(tool.id)}
                className="tool-action-btn"
              >
                <span>{tool.buttonLabel}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
