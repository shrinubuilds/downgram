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
  }[] = [
    {
      id: 'reel',
      label: 'Reels',
      icon: <Film size={18} />,
      badge: '4K UHD',
      hint: 'Download uncompressed 4K Reels & MP4 video streams without watermarks.',
      color: '#e1306c',
    },
    {
      id: 'audio',
      label: 'Audio / MP3',
      icon: <Music size={18} />,
      badge: '320kbps',
      hint: 'Extract high-bitrate MP3 background music and voice tracks from any Reel.',
      color: '#f59e0b',
    },
    {
      id: 'post',
      label: 'Photos & Carousel',
      icon: <Layers size={18} />,
      badge: 'HD / ZIP',
      hint: 'Download full-resolution photos and multi-image carousel albums individually or as a ZIP.',
      color: '#a855f7',
    },
    {
      id: 'profile',
      label: 'Profile (DP & Bio)',
      icon: <UserCheck size={18} />,
      badge: 'DP & Bio Links',
      hint: 'Inspect & download full HD profile pictures, copy biography text, and inspect bio links.',
      color: '#10b981',
    },
    {
      id: 'caption',
      label: 'Captions',
      icon: <FileText size={18} />,
      badge: 'Text & Tags',
      hint: 'Extract complete post captions with emojis, line spacing, and hashtags.',
      color: '#f97316',
    },
  ];

  const activeTabInfo = tabs.find((t) => t.id === activeType) || tabs[0];

  return (
    <div style={{ margin: '0 auto 28px auto', maxWidth: '960px' }}>
      {/* Outer Segmented Container */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '10px',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-tabs)',
          boxShadow: 'var(--accent-glow-subtle)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`tool-tab-btn ${isActive ? 'active' : ''}`}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isActive ? '#ffffff' : tab.color,
                  transition: 'transform 0.2s ease',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(225, 48, 108, 0.1)',
                  color: isActive ? '#ffffff' : '#e1306c',
                  letterSpacing: '0.02em',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Tool Context Ribbon */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontWeight: 500,
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: activeTabInfo.color,
            fontWeight: 800,
          }}
        >
          <Zap size={15} /> Active Mode:
        </span>
        <span>{activeTabInfo.hint}</span>
      </div>
    </div>
  );
};
