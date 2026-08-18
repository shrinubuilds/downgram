'use client';

import React from 'react';
import {
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
  Sparkles,
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
    hint: string;
    color: string;
    gradient: string;
  }[] = [
    {
      id: 'reel',
      label: 'Reels',
      icon: <Film size={19} />,
      hint: 'Download Instagram Reels and Videos in original MP4 quality without watermarks.',
      color: '#e1306c',
      gradient: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: <Music size={19} />,
      hint: 'Extract and download background audio or voice tracks as clean MP3 files.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
    },
    {
      id: 'post',
      label: 'Photos',
      icon: <Layers size={19} />,
      hint: 'Save high-resolution single photos or full multi-slide carousel posts (with ZIP export).',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
    {
      id: 'profile',
      label: 'Profile DP',
      icon: <UserCheck size={19} />,
      hint: 'View and download full-size original profile avatars and copy profile details.',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      id: 'caption',
      label: 'Captions',
      icon: <FileText size={19} />,
      hint: 'Copy full post captions with emojis, line formatting, and extracted hashtags.',
      color: '#0095f6',
      gradient: 'linear-gradient(135deg, #0095f6, #2563eb)',
    },
  ];

  const activeTabInfo = tabs.find((t) => t.id === activeType) || tabs[0];

  return (
    <div style={{ margin: '0 auto 24px auto', maxWidth: '980px', width: '100%' }}>
      {/* Neumorphic Tool Station Plate */}
      <div
        className="tools-neu-plate"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          padding: '8px',
          borderRadius: '22px',
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
                padding: '12px 10px',
                borderRadius: '16px',
                border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                background: isActive ? tab.gradient : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? 800 : 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? 'var(--neu-pill-active)' : 'none',
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
            </button>
          );
        })}
      </div>

      {/* Tool Context Description Readout */}
      <div
        className="tool-readout-banner"
        style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.86rem',
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
            gap: '5px',
            color: activeTabInfo.color,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          <Sparkles size={14} /> {activeTabInfo.label} Tool:
        </span>
        <span style={{ lineHeight: 1.4, fontWeight: 500 }}>{activeTabInfo.hint}</span>
      </div>

      <style jsx>{`
        .neu-tab-btn:hover:not(.active) {
          background: var(--bg-surface-raised);
          color: var(--text-main);
          box-shadow: var(--neu-raised-sm);
        }
        @media (max-width: 680px) {
          .tools-neu-plate {
            display: flex !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding: 6px !important;
            gap: 6px !important;
            border-radius: 18px !important;
            scrollbar-width: none !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .tools-neu-plate::-webkit-scrollbar {
            display: none !important;
          }
          .neu-tab-btn {
            flex: 1 0 auto !important;
            min-width: 96px !important;
            padding: 10px 14px !important;
            font-size: 0.86rem !important;
            border-radius: 13px !important;
          }
          .tool-readout-banner {
            font-size: 0.78rem !important;
            padding: 8px 12px !important;
            flex-direction: column !important;
            gap: 3px !important;
          }
        }
      `}</style>
    </div>
  );
};



