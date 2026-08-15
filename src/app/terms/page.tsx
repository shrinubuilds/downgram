import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Scale, ArrowLeft, Shield, Lock, AlertTriangle, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - DownGram',
  description: 'Terms of Service, acceptable use guidelines, and legal terms for DownGram Instagram media downloader.',
};

export default function TermsPage() {
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
                  background: 'rgba(225, 48, 108, 0.12)',
                  color: '#e1306c',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                <Scale size={14} /> Official Policy
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
                Terms of <span className="text-gradient">Service</span>
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
              <Link href="/terms" className="tool-tab-btn active" style={{ textDecoration: 'none' }}>
                <Scale size={15} /> <span>Terms</span>
              </Link>
              <Link href="/privacy" className="tool-tab-btn" style={{ textDecoration: 'none' }}>
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
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing, browsing, or using DownGram (&quot;we&quot;, &quot;our&quot;, or &quot;the Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service in full. If you do not accept these terms, you must discontinue using DownGram immediately.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  2. Purpose & Nature of the Service
                </h2>
                <p>
                  DownGram is an educational and utility web tool created to facilitate the personal archiving, backup, and viewing of publicly accessible media hosted on Instagram CDN servers. DownGram acts solely as a client-driven gateway to public web endpoints.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  3. Permitted Personal Use & User Responsibilities
                </h2>
                <p>
                  You agree to use DownGram strictly in compliance with all applicable local, national, and international laws, intellectual property statutes, and regulations:
                </p>
                <ul style={{ marginLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>You may only download content for personal, private, non-commercial educational and archival backup purposes.</li>
                  <li>You must not sell, redistribute, broadcast, or commercialize any downloaded media without explicit licensing or authorization from original creators.</li>
                  <li>You represent and warrant that you hold legitimate personal rights or fair use authorization for any content processed through DownGram.</li>
                  <li>You must not employ automated crawlers, DDoS stress tools, or botnets to abuse or overload our infrastructure.</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  4. Intellectual Property & Trademark Disclaimer
                </h2>
                <p>
                  &quot;Instagram&quot;, &quot;Reels&quot;, &quot;IGTV&quot;, and related trademarks and logos are the property of Meta Platforms, Inc. DownGram is an independent third-party web tool not endorsed, sponsored, or affiliated with Meta Platforms, Inc., Instagram, or their subsidiaries.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  5. Disclaimer of Warranties & Limitation of Liability
                </h2>
                <p>
                  The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind. Under no circumstances shall DownGram or its operators be liable for direct, indirect, special, punitive, or consequential damages resulting from the use or inability to use the platform.
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
