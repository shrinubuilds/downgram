'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Scale,
  Lock,
  AlertTriangle,
  Shield,
  CheckCircle2,
  ChevronUp,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsExpanded(false);
      setDragOffset(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
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

  // Touch Drag Gestures for Swipe Down to Close & Swipe Up to Expand
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // If dragging down, apply positive offset (towards bottom)
    if (deltaY > 0) {
      setDragOffset(deltaY);
    } else if (deltaY < -20 && !isExpanded) {
      // Dragging up on half-height expands to full height
      setDragOffset(deltaY * 0.4);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Swipe down threshold to close
    if (dragOffset > 90) {
      onClose();
    } else if (dragOffset < -40 && !isExpanded) {
      // Swiped up -> Expand to full screen
      setIsExpanded(true);
      setDragOffset(0);
    } else if (dragOffset > 40 && isExpanded) {
      // Swiped down on full screen -> Collapse to default
      setIsExpanded(false);
      setDragOffset(0);
    } else {
      // Snap back
      setDragOffset(0);
    }
  };

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
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
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
                All extraction and stream parsing requests are processed transiently in memory and transferred securely via HTTPS with SSL 256-bit encryption.
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
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
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
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
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
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
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
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {/* Bottom Sheet Modal Container */}
      <div
        ref={sheetRef}
        className="legal-modal-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '720px',
          height: isExpanded ? '94vh' : '65vh',
          maxHeight: '94vh',
          backgroundColor: 'var(--bg-surface)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          borderTop: '1.5px solid var(--border-subtle)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: `translateY(${Math.max(0, dragOffset)}px)`,
          transition: isDragging ? 'none' : 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          touchAction: 'none',
        }}
      >
        {/* Interactive Top Pull Handle Bar */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '12px',
            paddingBottom: '10px',
            cursor: 'grab',
            userSelect: 'none',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-inset)',
          }}
        >
          {/* Pull Bar Pill */}
          <div
            style={{
              width: '46px',
              height: '5px',
              borderRadius: '9999px',
              backgroundColor: isDragging ? 'var(--text-main)' : 'var(--border-subtle)',
              transition: 'background-color 0.2s ease',
            }}
          />

          {/* Swipe Hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.68rem',
              fontWeight: 800,
              color: 'var(--text-dim)',
              marginTop: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {isExpanded ? (
              <span>Pull down to close or collapse</span>
            ) : (
              <>
                <ChevronUp size={12} />
                <span>Pull up for full view • Pull down to close</span>
              </>
            )}
          </div>
        </div>

        {/* Modal Header */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            padding: '16px 22px 14px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
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
                  fontSize: '0.68rem',
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
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                {doc.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-secondary"
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              fontSize: '0.74rem',
              fontWeight: 800,
              boxShadow: 'var(--neu-btn)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            {isExpanded ? 'Collapse' : 'Full Screen'}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            padding: '22px',
            overflowY: 'auto',
            lineHeight: 1.65,
            fontSize: '0.92rem',
            color: 'var(--text-muted)',
            flex: 1,
            touchAction: 'pan-y',
          }}
        >
          {doc.content}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 22px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-inset)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle2 size={14} />
            <span>DownGram Verified Legal Document</span>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '8px 22px',
              fontSize: '0.86rem',
              fontWeight: 800,
              borderRadius: '12px',
              cursor: 'pointer',
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
          .legal-modal-backdrop {
            align-items: center !important;
            padding: 20px !important;
          }
          .legal-modal-sheet {
            height: auto !important;
            max-height: 84vh !important;
            border-radius: 24px !important;
            border: 1px solid var(--border-subtle) !important;
          }
        }
      `}</style>
    </div>
  );
};
