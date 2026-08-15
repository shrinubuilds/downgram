'use client';

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  ShieldCheck,
  Zap,
  Lock,
  ArrowUp,
  Scale,
  AlertTriangle,
  Shield,
  Activity,
} from 'lucide-react';
import { DownGramLogo } from './DownGramLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'clamp(32px, 5vw, 48px) 0 24px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Main Footer Block */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            paddingBottom: '28px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Brand, Tagline & Trust Badges */}
          <div style={{ maxWidth: '520px' }}>
            <Link
              href="/"
              onClick={scrollToTop}
              style={{ marginBottom: '12px', display: 'inline-block', textDecoration: 'none', color: 'inherit' }}
            >
              <DownGramLogo size="md" />
            </Link>

            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.92rem)',
                color: 'var(--text-muted)',
                lineHeight: '1.65',
                marginBottom: '16px',
              }}
            >
              DownGram is a high-speed Instagram media extraction suite. Download uncompressed 4K Reels, 320kbps MP3 audio, multi-image albums, and original HD avatars in real time.
            </p>

            {/* Trust Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                <Activity size={12} /> Live & Operational
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(0, 149, 246, 0.1)',
                  color: '#0095f6',
                  border: '1px solid rgba(0, 149, 246, 0.25)',
                }}
              >
                <ShieldCheck size={12} /> Zero Logs
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(225, 48, 108, 0.1)',
                  color: '#e1306c',
                  border: '1px solid rgba(225, 48, 108, 0.25)',
                }}
              >
                <Lock size={12} /> 256-Bit SSL
              </span>
            </div>
          </div>

          {/* Legal Options Beside One Another (Horizontal Row) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Legal & Privacy
            </span>

            <div
              className="legal-options-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {/* Terms */}
              <Link href="/terms" className="legal-pill-link">
                <Scale size={14} color="#e1306c" />
                <span>Terms</span>
              </Link>

              {/* Privacy */}
              <Link href="/privacy" className="legal-pill-link">
                <Lock size={14} color="#0095f6" />
                <span>Privacy</span>
              </Link>

              {/* DMCA */}
              <Link href="/dmca" className="legal-pill-link">
                <AlertTriangle size={14} color="#f59e0b" />
                <span>DMCA</span>
              </Link>

              {/* Fair Use */}
              <Link href="/fair-use" className="legal-pill-link">
                <Shield size={14} color="#10b981" />
                <span>Fair Use</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            © {new Date().getFullYear()} DownGram. Not affiliated with, endorsed, or sponsored by Instagram or Meta Platforms, Inc.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Made with</span>
              <Heart size={13} fill="#e1306c" color="#e1306c" />
              <span>for Archivists</span>
            </div>

            {/* Smooth Back-to-Top Button */}
            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.76rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Back to Top"
            >
              <ArrowUp size={12} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .legal-pill-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 0.84rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .legal-pill-link:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(225, 48, 108, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(225, 48, 108, 0.15);
        }
        :global([data-theme="light"]) .legal-pill-link {
          background: #ffffff;
          border-color: rgba(0, 0, 0, 0.08);
          color: #475569;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        :global([data-theme="light"]) .legal-pill-link:hover {
          color: #e1306c;
          background: rgba(225, 48, 108, 0.06);
          border-color: rgba(225, 48, 108, 0.35);
          box-shadow: 0 4px 12px rgba(225, 48, 108, 0.12);
        }
      `}</style>
    </footer>
  );
};
