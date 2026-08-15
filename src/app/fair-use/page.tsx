import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, ArrowLeft, Scale, Lock, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fair Use Disclaimer - DownGram',
  description: 'Fair use policy, personal media archiving guidelines, and non-affiliation disclaimers for DownGram.',
};

export default function FairUsePage() {
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
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                <Shield size={14} /> Fair Use Principles
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
                Fair Use <span className="text-gradient">Disclaimer</span>
              </h1>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                17 U.S. Code § 107 • Personal Archival & Public Media Guidelines
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
              <Link href="/privacy" className="tool-tab-btn" style={{ textDecoration: 'none' }}>
                <Lock size={15} /> <span>Privacy</span>
              </Link>
              <Link href="/dmca" className="tool-tab-btn" style={{ textDecoration: 'none' }}>
                <AlertTriangle size={15} /> <span>DMCA</span>
              </Link>
              <Link href="/fair-use" className="tool-tab-btn active" style={{ textDecoration: 'none' }}>
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
                  1. Statutory Fair Use Doctrine (17 U.S.C. § 107)
                </h2>
                <p>
                  DownGram operates strictly within the boundaries of the Fair Use doctrine as set forth under Section 107 of the United States Copyright Act. The platform facilitates the personal, private backup, non-commercial research, criticism, comment, and offline archival of publicly accessible media.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  2. Personal Non-Commercial Archival
                </h2>
                <p>
                  Media downloaded via DownGram is intended solely for personal, private offline enjoyment and educational research. Any commercial exploitation, rebroadcasting, synchronization, or resale of downloaded works without express copyright owner authorization is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  3. Non-Affiliation with Meta Platforms & Instagram
                </h2>
                <p>
                  DownGram is an independent web application and is not endorsed by, sponsored by, affiliated with, or associated with Instagram, Meta Platforms, Inc., or any of their partner corporations. &quot;Instagram&quot; and related marks are registered trademarks of Meta Platforms, Inc.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  4. Ethical Content Sourcing
                </h2>
                <p>
                  We encourage creators and users to always credit original content producers and uphold the spirit of copyright and creative contribution across the web.
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
