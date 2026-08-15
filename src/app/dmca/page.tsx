import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AlertTriangle, ArrowLeft, Scale, Lock, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA Notice & Copyright Policy - DownGram',
  description: 'DMCA copyright compliance, takedown instructions, and intellectual property terms for DownGram.',
};

export default function DmcaPage() {
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
                  background: 'rgba(245, 158, 11, 0.12)',
                  color: '#f59e0b',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                <AlertTriangle size={14} /> Copyright Compliance
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
                DMCA <span className="text-gradient">Notice</span>
              </h1>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                Digital Millennium Copyright Act Compliance (17 U.S.C. § 512)
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
              <Link href="/dmca" className="tool-tab-btn active" style={{ textDecoration: 'none' }}>
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
                  1. Respect for Intellectual Property
                </h2>
                <p>
                  DownGram respects the intellectual property rights of content creators and expects users of the platform to do the same. In compliance with the Digital Millennium Copyright Act (17 U.S.C. § 512), we respond expeditiously to valid notices of claimed infringement.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  2. Non-Hosting Notice
                </h2>
                <p>
                  DownGram does not host, duplicate, or maintain copyrighted files on our servers. The Service functions as a direct client browser client interface with public content delivered from Meta/Instagram CDN servers.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  3. Submitting a DMCA Takedown Notice
                </h2>
                <p>
                  If you are a copyright owner or authorized representative and wish to request the blocking of a specific URL from being parsed by DownGram, please provide a written notice containing:
                </p>
                <ul style={{ marginLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Identification of the copyrighted work claimed to have been infringed.</li>
                  <li>The exact URL (e.g. <code>https://www.instagram.com/reel/...</code>) to be blocked.</li>
                  <li>Your full contact information (name, address, telephone number, and email).</li>
                  <li>A statement of good-faith belief that use of the material is not authorized by the copyright owner.</li>
                  <li>A statement, under penalty of perjury, that the information in the notification is accurate.</li>
                  <li>Your physical or electronic signature.</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  4. Prompt Resolution
                </h2>
                <p>
                  Upon receipt of a valid DMCA request, we will promptly blacklist the requested URL, preventing any media streams from being extracted via DownGram.
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
