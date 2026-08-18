'use client';

import React, { useEffect, useState } from 'react';
import {
  Scale,
  Lock,
  AlertTriangle,
  Shield,
  X,
  CheckCircle2,
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
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC
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

  const tabs: { id: LegalTabType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'terms', label: 'Terms of Service', icon: <Scale size={15} />, color: '#e1306c' },
    { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={15} />, color: '#0095f6' },
    { id: 'dmca', label: 'DMCA Disclaimer', icon: <AlertTriangle size={15} />, color: '#f59e0b' },
    { id: 'fair-use', label: 'Fair Use Notice', icon: <Shield size={15} />, color: '#10b981' },
  ];

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
        animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Bottom Sheet Modal Container */}
      <div
        className="legal-modal-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          backgroundColor: 'var(--bg-surface)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          borderTop: '1.5px solid var(--border-subtle)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Pull Handle for Mobile */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '4px' }}>
          <div
            style={{
              width: '40px',
              height: '4px',
              borderRadius: '9999px',
              backgroundColor: 'var(--border-subtle)',
            }}
          />
        </div>

        {/* Modal Header */}
        <div
          style={{
            padding: '12px 20px 14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e1306c, #f59e0b)',
                display: 'inline-block',
              }}
            />
            <h3
              style={{
                fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                margin: 0,
              }}
            >
              Legal & Compliance Center
            </h3>
          </div>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{
              width: '34px',
              height: '34px',
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
            <X size={17} />
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            backgroundColor: 'var(--bg-surface-inset)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            borderBottom: '1px solid var(--border-subtle)',
            flexShrink: 0,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 800 : 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isActive ? `1px solid ${tab.color}` : '1px solid transparent',
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  color: isActive ? tab.color : 'var(--text-muted)',
                  boxShadow: isActive ? 'var(--neu-pill-active)' : 'none',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            padding: '20px 22px',
            overflowY: 'auto',
            lineHeight: 1.65,
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
          }}
        >
          {/* TAB 1: TERMS */}
          {activeTab === 'terms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e1306c', fontWeight: 800, fontSize: '0.8rem' }}>
                <Scale size={14} /> TERMS OF SERVICE AGREEMENT
              </div>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Acceptable Use & User Agreement
              </h4>
              <p>
                By using DownGram (&quot;the Service&quot;), you acknowledge and agree to comply with all applicable copyright and intellectual property laws. DownGram is designed as an educational tool for personal archiving, backup, and viewing of public media.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Key Guidelines:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Only download public media for private, non-commercial archiving and personal backup.</li>
                  <li>You must not redistribute, sell, or commercialize downloaded content without permission from original authors.</li>
                  <li>You represent that you hold legitimate personal rights or fair use authorization for any content processed.</li>
                  <li>Automated bot scraping, DDoS attacks, or overloading our infrastructure is strictly prohibited.</li>
                </ul>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                DownGram is not affiliated with or endorsed by Instagram or Meta Platforms, Inc.
              </p>
            </div>
          )}

          {/* TAB 2: PRIVACY */}
          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0095f6', fontWeight: 800, fontSize: '0.8rem' }}>
                <Lock size={14} /> ZERO-LOGS PRIVACY POLICY
              </div>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Your Privacy is Guaranteed
              </h4>
              <p>
                DownGram operates on a strict <strong>Zero-Logs & No-Tracking</strong> architecture. We prioritize user anonymity and do not store any personal data or download history on our servers.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>What We Do NOT Do:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>We do <strong>not</strong> require user registration, logins, or Instagram credentials.</li>
                  <li>We do <strong>not</strong> store or log downloaded media files on our web servers.</li>
                  <li>We do <strong>not</strong> track IP addresses, search history, or personal identifiers.</li>
                  <li>We do <strong>not</strong> sell or share any information with third-party advertisers.</li>
                </ul>
              </div>
              <p>
                All extraction requests are processed in real-time in memory and transferred securely via HTTPS (SSL 256-bit encryption).
              </p>
            </div>
          )}

          {/* TAB 3: DMCA */}
          {activeTab === 'dmca' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 800, fontSize: '0.8rem' }}>
                <AlertTriangle size={14} /> COPYRIGHT & DMCA NOTICE
              </div>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Digital Millennium Copyright Act Notice
              </h4>
              <p>
                DownGram respects the intellectual property rights of content creators worldwide. We do not host, store, or index any copyrighted videos, audio, or images on our servers.
              </p>
              <p>
                All media fetched through DownGram is retrieved directly from Instagram&apos;s publicly accessible content delivery networks (CDNs). DownGram acts solely as a client-side delivery gateway.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Takedown Requests:</strong>
                <p style={{ marginTop: '6px' }}>
                  If you are a copyright owner and wish to restrict public extraction of your media, please report the media directly on Instagram or contact us with the specific URL and proof of ownership.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: FAIR USE */}
          {activeTab === 'fair-use' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, fontSize: '0.8rem' }}>
                <Shield size={14} /> FAIR USE & ARCHIVAL NOTICE
              </div>
              <h4 style={{ color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                Fair Use Educational Disclaimer
              </h4>
              <p>
                Under Section 107 of the U.S. Copyright Act and equivalent international laws, allowance is made for <strong>&quot;Fair Use&quot;</strong> for purposes such as criticism, comment, news reporting, teaching, scholarship, education, and personal archival research.
              </p>
              <div>
                <strong style={{ color: 'var(--text-main)' }}>Archival Protection:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>DownGram provides tools to create personal offline backups of public content.</li>
                  <li>Users are responsible for ensuring their usage conforms to fair use and intellectual property laws.</li>
                  <li>Commercial redistribution without license is strictly outside the scope of fair use.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-inset)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle2 size={13} />
            <span>Compliant & SSL Secured</span>
          </div>

          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.84rem',
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
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @media (min-width: 768px) {
          .legal-modal-backdrop {
            align-items: center !important;
            padding: 20px !important;
          }
          .legal-modal-sheet {
            border-radius: 24px !important;
            border: 1px solid var(--border-subtle) !important;
            animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        }
      `}</style>
    </div>
  );
};
