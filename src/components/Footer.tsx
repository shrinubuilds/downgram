'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  ShieldCheck,
  Lock,
  ArrowUp,
  Scale,
  AlertTriangle,
  Shield,
  Activity,
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
} from 'lucide-react';
import { DownGramLogo } from './DownGramLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toolLinks = [
    { href: '/reels', label: 'Reels Downloader', icon: <Film size={13} />, color: '#e1306c' },
    { href: '/audio', label: 'Audio Extractor', icon: <Music size={13} />, color: '#f59e0b' },
    { href: '/photos', label: 'Photo & Carousel', icon: <Layers size={13} />, color: '#a855f7' },
    { href: '/profile', label: 'Profile Picture', icon: <UserCheck size={13} />, color: '#10b981' },
    { href: '/captions', label: 'Caption Extractor', icon: <FileText size={13} />, color: '#0095f6' },
  ];

  const legalLinks = [
    { href: '/terms', label: 'Terms of Service', icon: <Scale size={13} />, color: '#e1306c' },
    { href: '/privacy', label: 'Privacy Policy', icon: <Lock size={13} />, color: '#0095f6' },
    { href: '/dmca', label: 'DMCA Disclaimer', icon: <AlertTriangle size={13} />, color: '#f59e0b' },
    { href: '/fair-use', label: 'Fair Use Notice', icon: <Shield size={13} />, color: '#10b981' },
  ];

  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        boxShadow: 'var(--neu-raised)',
        padding: 'clamp(28px, 4vw, 44px) 0 20px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main Footer Multi-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(20px, 3.5vw, 36px)',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Brand Info & Trust Badges */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              onClick={scrollToTop}
              style={{ marginBottom: '10px', display: 'inline-block', textDecoration: 'none', color: 'inherit' }}
            >
              <DownGramLogo size="sm" />
            </Link>

            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: '1.55',
                marginBottom: '14px',
                maxWidth: '360px',
              }}
            >
              High-speed Instagram media downloader for Reels, MP3 audio tracks, photo carousels, and profile pictures.
            </p>

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: 'var(--bg-surface-inset)',
                  boxShadow: 'var(--neu-inset-sm)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Activity size={11} /> OPERATIONAL
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: 'var(--bg-surface-inset)',
                  boxShadow: 'var(--neu-inset-sm)',
                  color: '#0095f6',
                  border: '1px solid rgba(0, 149, 246, 0.25)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <ShieldCheck size={11} /> ZERO_LOGS
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: 'var(--bg-surface-inset)',
                  boxShadow: 'var(--neu-inset-sm)',
                  color: '#e1306c',
                  border: '1px solid rgba(225, 48, 108, 0.25)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Lock size={11} /> SSL_256BIT
              </span>
            </div>
          </div>

          {/* Quick Instagram Tools Links */}
          <div>
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                marginBottom: '12px',
              }}
            >
              Instagram Tools
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {toolLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-nav-link"
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Policies Links */}
          <div>
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                marginBottom: '12px',
              }}
            >
              Legal & Safety
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-nav-link"
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.76rem',
            color: 'var(--text-dim)',
          }}
        >
          <div style={{ maxWidth: '560px', lineHeight: 1.4 }}>
            © {new Date().getFullYear()} DownGram. Not affiliated with or endorsed by Instagram or Meta Platforms, Inc.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Made with</span>
              <Heart size={12} fill="#e1306c" color="#e1306c" />
              <span>for Creators</span>
            </div>

            {/* Smooth Back-to-Top Button */}
            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                padding: '5px 12px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: 'var(--neu-btn)',
              }}
              title="Back to Top"
            >
              <ArrowUp size={11} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--text-muted);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          padding: 4px 0;
          transition: all 0.2s ease;
          width: fit-content;
        }
        .footer-nav-link:hover {
          color: var(--text-main);
          transform: translateX(3px);
        }
      `}</style>
    </footer>
  );
};
