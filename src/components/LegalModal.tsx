'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  FileText,
  Lock,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
} from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export type LegalDocType = 'terms' | 'privacy' | 'dmca' | 'fairuse';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'terms',
}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: LegalDocType; label: string; icon: React.ReactNode }[] = [
    { id: 'terms', label: 'Terms of Service', icon: <Scale size={16} /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={16} /> },
    { id: 'dmca', label: 'DMCA Notice', icon: <AlertTriangle size={16} /> },
    { id: 'fairuse', label: 'Fair Use Disclaimer', icon: <Shield size={16} /> },
  ];

  const renderContent = () => {
    switch (activeDoc) {
      case 'terms':
        return (
          <div className="legal-text-content">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using DownGram (the &quot;Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the Service immediately.
            </p>

            <h3>2. Description of Service</h3>
            <p>
              DownGram is a web-based educational and media extraction utility designed to assist users in backing up, previewing, and downloading publicly available media from Instagram servers for personal, non-commercial archival purposes.
            </p>

            <h3>3. User Responsibilities & Permitted Use</h3>
            <ul>
              <li>You agree to use DownGram exclusively for personal, private, and non-commercial archival purposes.</li>
              <li>You agree not to redistribute, resell, or exploit downloaded media in violation of original creators&apos; intellectual property rights.</li>
              <li>You are solely responsible for verifying that you have the right to download and store any content you process through the Service.</li>
              <li>You agree not to bypass security protections or overload our proxy delivery servers through automated scraping scripts or botnets.</li>
            </ul>

            <h3>4. Disclaimer of Warranties</h3>
            <p>
              DownGram is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied. We do not guarantee uninterrupted, secure, or error-free operation. DownGram operates independently and is in no way affiliated with Meta Platforms, Inc. or Instagram.
            </p>

            <h3>5. Limitation of Liability</h3>
            <p>
              In no event shall DownGram, its operators, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service, or from any content downloaded through the platform.
            </p>
          </div>
        );

      case 'privacy':
        return (
          <div className="legal-text-content">
            <h3>1. Zero-Logging Guarantee</h3>
            <p>
              Your privacy is paramount. DownGram maintains a strict <strong>Zero-Logging Policy</strong>. We do not track, log, or store your IP address, download queries, or Instagram URLs on our persistent storage disks.
            </p>

            <h3>2. Ephemeral Media Proxying</h3>
            <p>
              When media is downloaded or converted (such as MP3 audio extraction or batch ZIP packaging), the data streams are processed ephemerally in volatile memory (RAM) and directly piped to your client browser. We do not host or archive Instagram media on our servers.
            </p>

            <h3>3. No Login Credentials Required</h3>
            <p>
              DownGram will never ask for your Instagram password, two-factor codes, access tokens, or account credentials. We only access publicly accessible API CDN endpoints provided by Instagram.
            </p>

            <h3>4. Local Browser Storage</h3>
            <p>
              Download history and theme preferences (Light/Dark mode) are stored strictly within your browser&apos;s <code>localStorage</code>. This data never leaves your device and can be cleared at any time with one click in the History drawer.
            </p>

            <h3>5. Cookies & Third-Party Analytics</h3>
            <p>
              DownGram does not use tracking cookies to build user profiles or display third-party tracking advertisements.
            </p>
          </div>
        );

      case 'dmca':
        return (
          <div className="legal-text-content">
            <h3>1. Digital Millennium Copyright Act (DMCA) Compliance</h3>
            <p>
              DownGram respects the intellectual property rights of creators and copyright holders and complies fully with the provisions of Title 17, United States Code, Section 512 (DMCA).
            </p>

            <h3>2. Platform Nature</h3>
            <p>
              DownGram does not host, store, or republish copyrighted media on its servers. DownGram functions solely as a client-side tool that interfaces directly with publicly available media URLs hosted on Instagram/Meta CDN servers.
            </p>

            <h3>3. Takedown Notification Requirements</h3>
            <p>
              If you are a copyright owner or an authorized agent thereof and believe that content accessible via DownGram infringes upon your copyright, you may submit a formal notification containing:
            </p>
            <ul>
              <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>The exact Instagram URL or username in question.</li>
              <li>Your contact information including email address and telephone number.</li>
              <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner.</li>
            </ul>

            <h3>4. Prompt Enforcement</h3>
            <p>
              Upon receipt of a valid notice complying with DMCA requirements, DownGram will promptly block the specified URL or media endpoint from being processed through our system.
            </p>
          </div>
        );

      case 'fairuse':
        return (
          <div className="legal-text-content">
            <h3>1. Fair Use Doctrine (17 U.S.C. § 107)</h3>
            <p>
              DownGram operates under the principles of Fair Use as codified under Title 17, Section 107 of the United States Copyright Act. The tool is designed to empower users with personal backup copies, educational research, transformative commentary, and offline archiving of public content.
            </p>

            <h3>2. Public Domain & Creative Commons</h3>
            <p>
              A substantial portion of media posted on public social feeds consists of promotional material, creative commons assets, or content explicitly shared for wide public dissemination.
            </p>

            <h3>3. Non-Commercial Personal Archiving</h3>
            <p>
              Users are encouraged to exercise fair use responsibilities: do not republish or monetize media created by others without express consent or legitimate transformative licensing.
            </p>

            <h3>4. Non-Affiliation Disclaimer</h3>
            <p>
              &quot;Instagram&quot;, &quot;Reels&quot;, and related logos and brand marks are registered trademarks of Meta Platforms, Inc. DownGram is an independent third-party tool and is not affiliated with, sponsored by, or endorsed by Instagram or Meta Platforms, Inc.
            </p>
          </div>
        );
    }
  };

  const handleCopyDoc = async () => {
    const el = document.querySelector('.legal-text-content');
    if (el) {
      const text = (el as HTMLElement).innerText;
      const ok = await copyToClipboard(text);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'var(--bg-card)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'var(--ig-primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Legal & Privacy Center
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                DownGram Official Policies & Compliance
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCopyDoc}
              className="btn-secondary"
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-full)',
              }}
              title="Copy policy text"
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Tab Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '12px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-primary)',
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeDoc === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDoc(tab.id)}
                className={`tool-tab-btn ${isActive ? 'active' : ''}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.86rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div
          style={{
            padding: '28px',
            overflowY: 'auto',
            flex: 1,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            fontSize: '0.92rem',
          }}
        >
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 28px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="#10b981" />
            <span>Updated & Effective for {new Date().getFullYear()}</span>
          </div>

          <button
            onClick={onClose}
            className="btn-gradient"
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            I Understand & Close
          </button>
        </div>
      </div>

      <style jsx global>{`
        .legal-text-content h3 {
          color: var(--text-main);
          font-size: 1.08rem;
          font-weight: 800;
          margin-top: 20px;
          margin-bottom: 8px;
        }
        .legal-text-content h3:first-child {
          margin-top: 0;
        }
        .legal-text-content p {
          margin-bottom: 14px;
        }
        .legal-text-content ul {
          margin-left: 20px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .legal-text-content code {
          background: rgba(225, 48, 108, 0.12);
          color: #e1306c;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.85em;
        }
      `}</style>
    </div>
  );
};
