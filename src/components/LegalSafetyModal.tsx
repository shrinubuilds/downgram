'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Scale,
  Lock,
  AlertTriangle,
  Shield,
  X,
} from 'lucide-react';

export type LegalTabType = 'terms' | 'privacy' | 'dmca' | 'fair-use';

interface LegalSafetyModalProps {
  isOpen: boolean;
  initialTab?: LegalTabType;
  onClose: () => void;
}

export const LegalSafetyModal: React.FC<LegalSafetyModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose,
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  // Complete background scroll lock for desktop & mobile
  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      setDragOffset(0);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Touch Drag Gestures for Mobile (Swipe Down to Dismiss)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > 75) {
      onClose();
    } else {
      setDragOffset(0);
    }
  };

  // Dedicated single-document content
  const getDocDetails = () => {
    switch (initialTab) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          tag: 'ZERO-LOGS & PRIVACY',
          icon: <Lock size={18} color="#0095f6" />,
          badgeColor: '#0095f6',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.12rem', fontWeight: 800, margin: 0 }}>
                Your Privacy is Guaranteed
              </h4>
              <p>
                DownGram operates on a strict <strong>Zero-Logs & No-Tracking</strong> architecture. We prioritize user anonymity and do not store any personal data or download history on our servers.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Our Privacy Principles:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>We do <strong>not</strong> require user accounts, registration, or Instagram logins.</li>
                  <li>We do <strong>not</strong> store, cache, or log downloaded media files on our web servers.</li>
                  <li>We do <strong>not</strong> track user IP addresses, extraction history, or personal identifiers.</li>
                  <li>We do <strong>not</strong> sell, share, or monetize any user information with advertisers.</li>
                </ul>
              </div>
              <p>
                All extraction requests are processed transiently in memory and transferred securely via HTTPS with SSL 256-bit encryption.
              </p>
            </div>
          ),
        };
      case 'dmca':
        return {
          title: 'DMCA Disclaimer',
          tag: 'COPYRIGHT & DMCA',
          icon: <AlertTriangle size={18} color="#f59e0b" />,
          badgeColor: '#f59e0b',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.12rem', fontWeight: 800, margin: 0 }}>
                Digital Millennium Copyright Act (DMCA)
              </h4>
              <p>
                DownGram respects the intellectual property rights of creators and copyright owners. DownGram does not host, clone, or store any copyrighted videos, audio tracks, or photos on its servers.
              </p>
              <p>
                All media links and files fetched through DownGram are sourced directly from Instagram&apos;s publicly accessible content delivery network (CDN) endpoints. DownGram acts solely as a client-side delivery tool.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Content Takedowns:</strong>
                <p style={{ marginTop: '8px' }}>
                  If you are a copyright owner and wish to restrict extraction of your content, you can manage privacy settings directly on Instagram or contact us with the public URL and proof of copyright ownership.
                </p>
              </div>
            </div>
          ),
        };
      case 'fair-use':
        return {
          title: 'Fair Use Notice',
          tag: 'LEGAL DISCLAIMER',
          icon: <Shield size={18} color="#10b981" />,
          badgeColor: '#10b981',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.12rem', fontWeight: 800, margin: 0 }}>
                Fair Use Educational Notice
              </h4>
              <p>
                Under Section 107 of the U.S. Copyright Act and equivalent international legal frameworks, allowance is made for <strong>&quot;Fair Use&quot;</strong> for purposes such as criticism, news commentary, scholarship, education, research, and personal offline archiving.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Archival Protection Guidelines:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>DownGram provides tools to create personal offline backups of publicly available content.</li>
                  <li>Users are solely responsible for ensuring their usage conforms to fair use guidelines.</li>
                  <li>Commercial redistribution or monetization of downloaded media without license is strictly prohibited.</li>
                </ul>
              </div>
            </div>
          ),
        };
      case 'terms':
      default:
        return {
          title: 'Terms of Service',
          tag: 'OFFICIAL POLICY',
          icon: <Scale size={18} color="#e1306c" />,
          badgeColor: '#e1306c',
          content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.12rem', fontWeight: 800, margin: 0 }}>
                Acceptable Use & Terms Agreement
              </h4>
              <p>
                By using DownGram (&quot;the Service&quot;), you acknowledge and agree to comply with all applicable local and international copyright laws. DownGram is designed as an educational and personal archiving tool for public Instagram media.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Terms of Use:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>You may only download content for private, personal, non-commercial archival backup purposes.</li>
                  <li>You must not sell, redistribute, or commercialize any downloaded content without authorization from original creators.</li>
                  <li>You represent that you hold legitimate personal rights or fair use authorization for any content processed.</li>
                  <li>Automated bot scraping, DDoS attacks, or overloading our infrastructure is strictly prohibited.</li>
                </ul>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                DownGram is not affiliated with or endorsed by Instagram or Meta Platforms, Inc.
              </p>
            </div>
          ),
        };
    }
  };

  const doc = getDocDetails();

  return (
    <div
      className="legal-modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.68)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overscrollBehavior: 'contain',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {/* Modal / Bottom Sheet Container */}
      <div
        className="legal-modal-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '75vh',
          maxHeight: '85vh',
          backgroundColor: 'var(--bg-surface)',
          borderTopLeftRadius: '26px',
          borderTopRightRadius: '26px',
          borderTop: '1.5px solid var(--border-subtle)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overscrollBehavior: 'contain',
          transform: `translateY(${Math.max(0, dragOffset)}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Clean Top Drag Pill for Mobile */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="mobile-pull-handle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px',
            paddingBottom: '8px',
            cursor: 'grab',
            userSelect: 'none',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '4.5px',
              borderRadius: '9999px',
              backgroundColor: isDragging ? 'var(--text-main)' : 'var(--border-subtle)',
              transition: 'background-color 0.2s ease',
            }}
          />
        </div>

        {/* Modal Document Header */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            padding: '12px 20px 14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'var(--bg-surface-inset)',
                boxShadow: 'var(--neu-inset-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {doc.icon}
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  color: doc.badgeColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {doc.tag}
              </div>
              <h3
                style={{
                  fontSize: 'clamp(1.08rem, 2.5vw, 1.25rem)',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                {doc.title}
              </h3>
            </div>
          </div>

          {/* Close Icon Button */}
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: 'var(--neu-btn)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            lineHeight: 1.65,
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            flex: 1,
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
          }}
        >
          {doc.content}
        </div>

        {/* Modal Bottom Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-inset)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '8px 24px',
              fontSize: '0.84rem',
              fontWeight: 800,
              borderRadius: '12px',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '180px',
              textAlign: 'center',
            }}
          >
            I Understand
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (min-width: 768px) {
          .mobile-pull-handle {
            display: none !important;
          }
          .legal-modal-backdrop {
            align-items: center !important;
            padding: 24px !important;
          }
          .legal-modal-sheet {
            height: auto !important;
            max-height: 82vh !important;
            border-radius: 24px !important;
            border: 1px solid var(--border-subtle) !important;
          }
        }
      `}</style>
    </div>
  );
};
