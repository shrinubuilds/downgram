'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Lock,
  ArrowUp,
  Scale,
  AlertTriangle,
  Shield,
} from 'lucide-react';
import { DownGramLogo } from './DownGramLogo';
import { LegalSafetyModal, LegalTabType } from './LegalSafetyModal';

export const Footer: React.FC = () => {
  const [showFab, setShowFab] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType>('terms');

  React.useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegalModal = (tab: LegalTabType) => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const legalItems: { id: LegalTabType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'terms', label: 'Terms of Service', icon: <Scale size={13} />, color: '#e1306c' },
    { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={13} />, color: '#0095f6' },
    { id: 'dmca', label: 'DMCA Disclaimer', icon: <AlertTriangle size={13} />, color: '#f59e0b' },
    { id: 'fair-use', label: 'Fair Use Notice', icon: <Shield size={13} />, color: '#10b981' },
  ];

  return (
    <>
      <footer
        style={{
          marginTop: 'auto',
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          boxShadow: 'var(--neu-raised)',
          padding: 'clamp(24px, 4vw, 36px) 0 20px 0',
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
              gap: '20px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            {/* Brand Logo & Tagline */}
            <div>
              <Link
                href="/"
                onClick={scrollToTop}
                style={{ marginBottom: '8px', display: 'inline-block', textDecoration: 'none', color: 'inherit' }}
              >
                <DownGramLogo size="sm" />
              </Link>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.5',
                  margin: 0,
                  maxWidth: '380px',
                }}
              >
                Fast, secure Instagram media downloader for Reels, MP3 audio, photo albums, and profile pictures.
              </p>
            </div>

            {/* Legal & Safety Popup Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--text-dim)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Legal & Safety
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                {legalItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openLegalModal(item.id)}
                    className="legal-pill-btn"
                  >
                    <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom Copyright Bar */}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Made with</span>
              <Heart size={12} fill="#e1306c" color="#e1306c" />
              <span>for Creators</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .legal-pill-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 12px;
            background: var(--bg-surface-inset);
            box-shadow: var(--neu-inset-sm);
            border: 1px solid var(--border-subtle);
            color: var(--text-muted);
            font-size: 0.8rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .legal-pill-btn:hover {
            color: var(--text-main);
            background: var(--bg-surface-raised);
            box-shadow: var(--neu-raised-sm);
            transform: translateY(-2px);
          }
          .legal-pill-btn:active {
            transform: translateY(1px);
            box-shadow: var(--neu-btn-pressed);
          }
        `}</style>
      </footer>

      {/* Floating Back-To-Top FAB */}
      <button
        onClick={scrollToTop}
        className="floating-top-fab"
        style={{
          position: 'fixed',
          bottom: '22px',
          right: '22px',
          zIndex: 80,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-surface-raised)',
          boxShadow: 'var(--neu-raised-glow)',
          border: '1.5px solid var(--border-subtle)',
          color: '#e1306c',
          cursor: 'pointer',
          opacity: showFab ? 1 : 0,
          transform: showFab ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
          pointerEvents: showFab ? 'auto' : 'none',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <ArrowUp size={18} />
      </button>

      {/* Bottom Sheet Overlay Modal */}
      <LegalSafetyModal
        isOpen={isLegalModalOpen}
        initialTab={legalModalTab}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </>
  );
};
