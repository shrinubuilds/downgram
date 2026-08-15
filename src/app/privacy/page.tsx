import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Lock, ArrowLeft, Scale, Shield, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - DownGram',
  description: 'Privacy policy and zero-logging guarantees for DownGram Instagram media extractor.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 80px 0' }}>
        <div className="container-narrow">
          {/* Breadcrumb / Back Link */}
          <div style={{ marginBottom: '24px' }}>
            <Link
              href="/"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.86rem',
                textDecoration: 'none',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Downloader</span>
            </Link>
          </div>

          {/* Legal Document Container */}
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(24px, 5vw, 48px)',
              borderRadius: 'var(--radius-xl)',
            }}
          >
            {/* Header */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px', marginBottom: '32px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(0, 149, 246, 0.12)',
                  color: '#0095f6',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                <Lock size={14} /> Zero Logs Guaranteed
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                  color: 'var(--text-main)',
                }}
              >
                Privacy <span className="text-gradient">Policy</span>
              </h1>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                Effective Date: January 1, {new Date().getFullYear()} • Last Reviewed: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Document Navigation Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '36px',
                padding: '6px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Link href="/terms" className="tool-tab-btn" style={{ textDecoration: 'none' }}>
                <Scale size={15} /> <span>Terms</span>
              </Link>
              <Link href="/privacy" className="tool-tab-btn active" style={{ textDecoration: 'none' }}>
                <Lock size={15} /> <span>Privacy</span>
              </Link>
              <Link href="/dmca" className="tool-tab-btn" style={{ textDecoration: 'none' }}>
                <AlertTriangle size={15} /> <span>DMCA</span>
              </Link>
              <Link href="/fair-use" className="tool-tab-btn" style={{ textDecoration: 'none' }}>
                <Shield size={15} /> <span>Fair Use</span>
              </Link>
            </div>

            {/* Document Body */}
            <div
              style={{
                lineHeight: '1.8',
                fontSize: '0.96rem',
                color: 'var(--text-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  1. Zero-Logging Architecture
                </h2>
                <p>
                  DownGram is built on a privacy-first foundation. We enforce an uncompromising <strong>Zero-Logging Policy</strong>. We do not maintain server access logs, download history records, or user tracking profiles. Your IP address and submitted URLs are processed in-memory and are never stored on persistent storage disks.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  2. Ephemeral Media Proxy Streaming
                </h2>
                <p>
                  When downloading or converting media files (such as MP3 audio extraction or batch ZIP compression), streams are piped directly from public Instagram CDN servers to your client device in real-time. No copies of videos, photos, or audio tracks are permanently hosted on DownGram servers.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  3. No User Credentials Required
                </h2>
                <p>
                  DownGram will never prompt you to enter your Instagram username, password, 2FA codes, or access tokens. The service operates anonymously and exclusively parses publicly available media records.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  4. Local Browser Data (LocalStorage)
                </h2>
                <p>
                  Any features requiring persistence (such as your download history drawer or light/dark theme preference) utilize your local browser&apos;s <code>localStorage</code>. This data remains on your physical device and can be deleted instantly at any time.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  5. Contact & Privacy Inquiries
                </h2>
                <p>
                  For any privacy inquiries or technical questions regarding data handling, please consult our official compliance documentation.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
