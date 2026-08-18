'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Scale,
  Lock,
  AlertTriangle,
  Shield,
  CheckCircle2,
  FileText,
  Mail,
} from 'lucide-react';

export type LegalTabType = 'terms' | 'privacy' | 'dmca' | 'fair-use';

interface LegalSheetModalProps {
  isOpen: boolean;
  initialTab?: LegalTabType;
  onClose: () => void;
}

export const LegalSheetModal: React.FC<LegalSheetModalProps> = ({
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

  if (!isOpen) return null;

  const tabs = [
    { id: 'terms' as LegalTabType, label: 'Terms of Service', icon: <Scale size={15} />, color: '#e1306c' },
    { id: 'privacy' as LegalTabType, label: 'Privacy Policy', icon: <Lock size={15} />, color: '#0095f6' },
    { id: 'dmca' as LegalTabType, label: 'DMCA Disclaimer', icon: <AlertTriangle size={15} />, color: '#f59e0b' },
    { id: 'fair-use' as LegalTabType, label: 'Fair Use Notice', icon: <Shield size={15} />, color: '#10b981' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="neu-panel legal-sheet-container"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          background: 'var(--bg-surface)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUpSheet 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle Header */}
        <div
          style={{
            padding: '12px 20px 8px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-subtle)',
            position: 'relative',
          }}
        >
          {/* Mobile Sheet Pill Handle */}
          <div
            style={{
              width: '42px',
              height: '4px',
              borderRadius: '9999px',
              background: 'var(--border-subtle)',
              marginBottom: '10px',
            }}
          />

          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'rgba(225, 48, 108, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e1306c',
                }}
              >
                <FileText size={15} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-main)' }}>
                Legal & Compliance Documents
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--bg-surface-inset)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--neu-inset-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab Navigation Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            padding: '10px 18px',
            background: 'var(--bg-surface-inset)',
            borderBottom: '1px solid var(--border-subtle)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
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
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 800 : 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: isActive ? `1px solid ${tab.color}` : '1px solid transparent',
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  color: isActive ? tab.color : 'var(--text-muted)',
                  boxShadow: isActive ? 'var(--neu-btn)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div
          style={{
            padding: '20px 22px',
            overflowY: 'auto',
            flex: 1,
            color: 'var(--text-muted)',
            fontSize: '0.88rem',
            lineHeight: 1.65,
          }}
        >
          {/* TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Terms of Service
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Effective Date: January 1, {new Date().getFullYear()} • Last Reviewed Today
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface-inset)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  1. Acceptance & Usage
                </strong>
                By using DownGram, you agree to these Terms. DownGram is an educational utility engineered to assist users in personal archival, backup, and viewing of publicly accessible media from Instagram CDN endpoints.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  2. Permitted Personal Use
                </strong>
                You may only download content for personal, private, non-commercial educational purposes. You must not sell, broadcast, or commercialize any downloaded media without explicit written permission from the original copyright holder.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  3. Intellectual Property Disclaimer
                </strong>
                &quot;Instagram&quot;, &quot;Reels&quot;, &quot;IGTV&quot;, and related trademarks are the exclusive property of Meta Platforms, Inc. DownGram is an independent third-party tool and is not affiliated with, authorized, or sponsored by Meta Platforms, Inc.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  4. Limitation of Liability
                </strong>
                The service is provided &quot;AS IS&quot; without warranties of any kind. DownGram shall not be liable for any direct or consequential damages resulting from the use of this utility.
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Privacy Policy
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Strict Zero-Logs Architecture • Encrypted Communications
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface-inset)', border: '1px solid rgba(0, 149, 246, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0095f6', fontWeight: 800, marginBottom: '4px' }}>
                  <CheckCircle2 size={15} /> Strict Zero-Knowledge Architecture
                </div>
                DownGram does NOT store, log, or track the Instagram URLs you submit, nor do we retain downloaded videos, audio files, or photos on our server disks.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  1. No User Accounts Required
                </strong>
                DownGram does not ask for or store passwords, email addresses, phone numbers, or Instagram login credentials.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  2. Ephemeral In-Memory Processing
                </strong>
                When you request a download, our server fetches the stream in real-time in RAM and streams it directly to your browser. No files are saved to persistent databases.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  3. Browser Local Storage
                </strong>
                Download history is saved strictly inside your own device’s browser localStorage and can be erased instantly at any time.
              </div>
            </div>
          )}

          {/* DMCA DISCLAIMER */}
          {activeTab === 'dmca' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  DMCA & Copyright Policy
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Digital Millennium Copyright Act Compliance Notice
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface-inset)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                <strong style={{ color: '#ea580c', display: 'block', marginBottom: '4px' }}>
                  Copyright Respect & Notice
                </strong>
                DownGram respects the intellectual property rights of content creators. DownGram does not host or store any media files on its servers; all files are fetched directly from Instagram public CDN servers.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  How to Submit a Takedown Notice
                </strong>
                If you are a copyright owner and believe your copyrighted material is being processed inappropriately, you may request blocking by contacting our designated agent:
                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-raised)',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Mail size={14} color="#e1306c" />
                  <span>legal@downgram.app</span>
                </div>
              </div>
            </div>
          )}

          {/* FAIR USE NOTICE */}
          {activeTab === 'fair-use' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Fair Use Notice
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  17 U.S.C. Section 107 Guidelines
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-surface-inset)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <strong style={{ color: '#10b981', display: 'block', marginBottom: '4px' }}>
                  Educational & Archival Fair Use
                </strong>
                DownGram operates in accordance with the Fair Use doctrine under 17 U.S.C. § 107 for personal backup, critique, research, commentary, and archival purposes.
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  User Obligations
                </strong>
                Users are solely responsible for ensuring that their intended use of downloaded content satisfies Fair Use criteria in their respective legal jurisdiction.
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div
          style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            className="btn-primary"
            style={{
              padding: '8px 20px',
              borderRadius: '12px',
              fontSize: '0.84rem',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Understood & Close
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUpSheet {
          from {
            transform: translateY(100%);
            opacity: 0.5;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
