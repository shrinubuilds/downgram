'use client';

import React from 'react';

interface DownGramLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const DownGramLogo: React.FC<DownGramLogoProps> = ({
  size = 'md',
  showBadge = true,
}) => {
  const iconDimensions = {
    sm: 36,
    md: 44,
    lg: 52,
  }[size];

  const fontSize = {
    sm: '1.25rem',
    md: '1.45rem',
    lg: '1.75rem',
  }[size];

  return (
    <div
      className="logo-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Custom Vector SVG Logo Icon */}
      <div
        style={{
          position: 'relative',
          width: `${iconDimensions}px`,
          height: `${iconDimensions}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ambient Glow behind the logo */}
        <div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '16px',
            background: 'radial-gradient(circle, rgba(225, 48, 108, 0.5) 0%, rgba(240, 148, 51, 0.25) 60%, transparent 80%)',
            filter: 'blur(8px)',
            opacity: 0.85,
            zIndex: 0,
          }}
        />

        <svg
          width={iconDimensions}
          height={iconDimensions}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'relative', zIndex: 1, overflow: 'visible' }}
        >
          <defs>
            {/* Primary Instagram-inspired vibrant gradient */}
            <linearGradient id="dg-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>

            {/* Inner glow gradient */}
            <linearGradient id="dg-lens-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#833ab4" />
              <stop offset="50%" stopColor="#fd1d1d" />
              <stop offset="100%" stopColor="#fcaf45" />
            </linearGradient>

            {/* Shimmer overlay gradient */}
            <linearGradient id="dg-shimmer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>

            {/* Drop shadow filter */}
            <filter id="dg-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#bc1888" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Squircle / Instagram Outer Frame */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            fill="url(#dg-primary-grad)"
            filter="url(#dg-shadow)"
          />

          {/* Glass Highlight Overlay on Squircle */}
          <rect
            x="7"
            y="7"
            width="86"
            height="43"
            rx="23"
            fill="url(#dg-shimmer-grad)"
            opacity="0.4"
          />

          {/* Inner Camera Outline */}
          <rect
            x="16"
            y="16"
            width="68"
            height="68"
            rx="18"
            stroke="#ffffff"
            strokeWidth="5"
            strokeOpacity="0.95"
            fill="none"
          />

          {/* Center Lens Ring */}
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="#ffffff"
            strokeWidth="5"
            strokeOpacity="0.95"
            fill="rgba(10, 11, 14, 0.25)"
          />

          {/* Sparkle / Flash Dot on Top Right */}
          <g className="logo-sparkle" style={{ transformOrigin: '72px 28px' }}>
            <circle cx="72" cy="28" r="4.5" fill="#ffffff" />
            <path
              d="M72 20 L73 26 L79 28 L73 30 L72 36 L71 30 L65 28 L71 26 Z"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>

          {/* Download Arrow inside the Lens */}
          <g className="logo-arrow">
            {/* Arrow Stem */}
            <path
              d="M50 37 L50 56"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Arrow Head */}
            <path
              d="M42 50 L50 58 L58 50"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Base Tray Line */}
            <path
              d="M40 64 L60 64"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography & Badge */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              background: 'var(--ig-primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(225, 48, 108, 0.15)',
              display: 'inline-block',
            }}
          >
            DownGram
          </span>

          {showBadge && (
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                padding: '2px 7px',
                borderRadius: '6px',
                background: 'rgba(225, 48, 108, 0.14)',
                color: '#ff5f9e',
                border: '1px solid rgba(225, 48, 108, 0.3)',
                animation: 'badgePulse 3s infinite',
                lineHeight: 1.2,
                textTransform: 'uppercase',
              }}
            >
              HD+
            </span>
          )}
        </div>

        <span
          style={{
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            marginTop: '-2px',
          }}
        >
          Fast Media Extractor
        </span>
      </div>
    </div>
  );
};
