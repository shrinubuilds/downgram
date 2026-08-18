'use client';

import React from 'react';
import {
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
  Sparkles,
  Zap,
} from 'lucide-react';
import { MediaType } from '@/types/instagram';

interface MediaTypeTabsProps {
  activeType: MediaType;
  onSelect: (type: MediaType) => void;
}

export const MediaTypeTabs: React.FC<MediaTypeTabsProps> = ({
  activeType,
  onSelect,
}) => {
  const tabs: {
    id: MediaType;
    label: string;
    icon: React.ReactNode;
    badge: string;
    hint: string;
    color: string;
    gradient: string;
  }[] = [
    {
      id: 'reel',
      label: 'Reels & Video',
      icon: <Film size={18} />,
      badge: '4K UHD',
      hint: 'Download uncompressed 4K Reels & MP4 video streams with zero compression.',
      color: '#e1306c',
      gradient: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
    },
    {
      id: 'audio',
      label: 'Audio / MP3',
      icon: <Music size={18} />,
      badge: '320kbps',
      hint: 'Extract high-bitrate studio audio & voice tracks from any Instagram Reel or Post.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
    },
    {
      id: 'post',
      label: 'Photos & Albums',
      icon: <Layers size={18} />,
      badge: 'HD / ZIP',
      hint: 'Download full-res photo carousels & multi-image sets individually or as a ZIP archive.',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
    {
      id: 'profile',
      label: 'Profile DP & Bio',
      icon: <UserCheck size={18} />,
      badge: 'Full Size HD',
      hint: 'Inspect & download full HD profile avatars and copy bio links & metadata.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      id: 'caption',
      label: 'Captions & Tags',
      icon: <FileText size={18} />,
      badge: 'Text & Tags',
      hint: 'Extract complete post captions with emojis, line formatting, and viral hashtags.',
      color: '#0095f6',
      gradient: 'linear-gradient(135deg, #0095f6, #2563eb)',
    },
  ];

  const activeTabInfo = tabs.find((t) => t.id === activeType) || tabs[0];

  return (
    <div style={{ margin: '0 auto 24px auto', maxWidth: '1000px', width: '100%' }}>
      {/* Outer Segmented Rounded Rectangular Container */}
      <div
        className="tools-segmented-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
          padding: '8px',
          borderRadius: '20px',
          backgroundColor: 'var(--bg-tabs)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--accent-glow-subtle), 0 8px 30px rgba(0, 0, 0, 0.25)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`tool-segmented-tab ${isActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '14px',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                background: isActive ? tab.gradient : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? '0 6px 20px rgba(0, 0, 0, 0.35)' : 'none',
                overflow: 'hidden',
              }}
            >
              {/* Icon */}
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isActive ? '#ffffff' : tab.color,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                  flexShrink: 0,
                }}
              >
                {tab.icon}
              </span>

              {/* Label */}
              <span style={{ whiteSpace: 'nowrap', textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.3)' : 'none' }}>
                {tab.label}
              </span>

              {/* Badge */}
              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(0, 0, 0, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#ffffff' : tab.color,
                  letterSpacing: '0.02em',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                  flexShrink: 0,
                }}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Tool Context Banner */}
      <div
        className="tool-hint-banner"
        style={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.86rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          padding: '6px 14px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: activeTabInfo.color,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          <Zap size={14} /> {activeTabInfo.label} Tool:
        </span>
        <span style={{ lineHeight: 1.4 }}>{activeTabInfo.hint}</span>
      </div>

      <style jsx>{`
        .tool-segmented-tab:hover:not(.active) {
          background: rgba(255, 255, 255, 0.07);
          color: var(--text-main);
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .tools-segmented-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tool-hint-banner {
            font-size: 0.78rem !important;
            flex-direction: column !important;
            gap: 2px !important;
          }
        }
      `}</style>
    </div>
  );
};

