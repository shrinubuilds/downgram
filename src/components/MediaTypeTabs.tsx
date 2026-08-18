'use client';

import React from 'react';
import {
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
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
    ledColor: string;
  }[] = [
    {
      id: 'reel',
      label: 'Reels & Video',
      icon: <Film size={17} />,
      badge: '4K_UHD',
      hint: 'Extract uncompressed 4K 60FPS video streams with direct CDN bypass.',
      color: '#e1306c',
      gradient: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
      ledColor: '#e1306c',
    },
    {
      id: 'audio',
      label: 'Audio / MP3',
      icon: <Music size={17} />,
      badge: '320_KBPS',
      hint: 'Rip studio-grade MP3 audio tracks and voice stems from any Reel.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
      ledColor: '#f59e0b',
    },
    {
      id: 'post',
      label: 'Photos & ZIP',
      icon: <Layers size={17} />,
      badge: 'RAW_HD',
      hint: 'Download full-res photo carousels & batch-export all slides as ZIP archive.',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      ledColor: '#a855f7',
    },
    {
      id: 'profile',
      label: 'Profile DP',
      icon: <UserCheck size={17} />,
      badge: 'AVATAR_HD',
      hint: 'Download full-size original profile avatars & inspect metadata.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      ledColor: '#10b981',
    },
    {
      id: 'caption',
      label: 'Captions',
      icon: <FileText size={17} />,
      badge: 'TXT_TAGS',
      hint: 'Extract complete formatted captions, emojis, and viral hashtag matrix.',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #2563eb)',
      ledColor: '#06b6d4',
    },
  ];

  const activeTabInfo = tabs.find((t) => t.id === activeType) || tabs[0];

  return (
    <div style={{ margin: '0 auto 24px auto', maxWidth: '1020px', width: '100%' }}>
      {/* Neumorphic Extruded Tool Station Plate */}
      <div
        className="tools-neu-plate"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '10px',
          padding: '10px',
          borderRadius: '24px',
          backgroundColor: 'var(--bg-tabs)',
          boxShadow: 'var(--neu-raised)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`neu-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)',
                background: isActive ? tab.gradient : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? 800 : 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? 'var(--neu-pill-active)' : 'var(--neu-btn)',
              }}
            >
              {/* LED Active Dot */}
              {isActive && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 0 8px #ffffff',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
              )}

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

              {/* Digital Monospace Tech Badge */}
              <span
                className="tech-mono-tag"
                style={{
                  fontSize: '0.64rem',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(0, 0, 0, 0.35)' : 'var(--bg-surface-inset)',
                  color: isActive ? '#ffffff' : tab.color,
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? 'none' : 'var(--neu-inset-sm)',
                  flexShrink: 0,
                }}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Digital HUD Tool Context Banner */}
      <div
        className="tool-hud-banner"
        style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.84rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          padding: '8px 16px',
          borderRadius: '14px',
          background: 'var(--bg-surface-inset)',
          boxShadow: 'var(--neu-inset-sm)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: activeTabInfo.color,
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            flexShrink: 0,
          }}
        >
          <Zap size={14} /> [ {activeTabInfo.label.toUpperCase()} ] :
        </span>
        <span style={{ lineHeight: 1.4, fontWeight: 500 }}>{activeTabInfo.hint}</span>
      </div>

      <style jsx>{`
        .neu-tab-btn:hover:not(.active) {
          background: var(--bg-surface-raised);
          color: var(--text-main);
          transform: translateY(-2px);
          box-shadow: var(--neu-raised-sm);
        }
        .neu-tab-btn:active {
          transform: translateY(1px);
          box-shadow: var(--neu-btn-pressed);
        }
        @media (max-width: 680px) {
          .tools-neu-plate {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tool-hud-banner {
            font-size: 0.78rem !important;
            flex-direction: column !important;
            gap: 4px !important;
          }
        }
      `}</style>
    </div>
  );
};


