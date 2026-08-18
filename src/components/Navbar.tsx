'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  HelpCircle,
  BookOpen,
  Sparkles,
  Zap,
  Activity,
} from 'lucide-react';
import { MediaType } from '@/types/instagram';
import { DownGramLogo } from './DownGramLogo';

interface NavbarProps {
  onSelectType?: (type: MediaType) => void;
  activeType?: MediaType;
  historyCount?: number;
  onOpenHistory?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectType }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isRotatingTheme, setIsRotatingTheme] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('downgram_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = prefersDark ? 'dark' : 'light';
        setTheme(initial);
        document.documentElement.setAttribute('data-theme', initial);
      }
    } catch {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsRotatingTheme(true);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('downgram_theme', nextTheme);
    } catch {}
    setTimeout(() => setIsRotatingTheme(false), 500);
  };

  const handleNavClick = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${hash}`;
    }
  };

  return (
    <header
      className="floating-header-wrapper"
      style={{
        position: 'sticky',
        top: '14px',
        zIndex: 50,
        width: '100%',
        padding: '0 16px',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      <div
        className="floating-header-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          padding: '0 clamp(14px, 2.5vw, 26px)',
          borderRadius: '22px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: isScrolled
            ? 'var(--neu-raised-glow)'
            : 'var(--neu-raised)',
          border: '1px solid var(--border-subtle)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
        }}
      >
        {/* Animated Cyber Accent Top Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 20,
            right: 20,
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #f09433, #e1306c, #06b6d4, transparent)',
            opacity: 0.8,
            borderRadius: '2px',
          }}
        />

        {/* Left: Brand Logo + Digital Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            href="/"
            onClick={() => {
              if (onSelectType) onSelectType('reel');
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
          >
            <DownGramLogo size="md" />
          </Link>

          {/* Digital Core Status Dot */}
          <div
            className="digital-status-chip"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'var(--bg-surface-inset)',
              boxShadow: 'var(--neu-inset-sm)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
            }}
          >
            <span className="led-dot" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Center: Neumorphic Inset Navigation Pill Dock */}
        <nav
          className="desktop-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset)',
            padding: '4px 6px',
            borderRadius: '16px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            onClick={() => handleNavClick('#how-to')}
            className="nav-link-btn"
            title="How to Download"
          >
            <BookOpen size={14} color="#10b981" />
            <span>How It Works</span>
          </button>

          <button
            onClick={() => handleNavClick('#downloader-box')}
            className="nav-link-btn"
            title="Explore Tools"
          >
            <Zap size={14} color="#f59e0b" />
            <span>Downloader</span>
          </button>

          <button
            onClick={() => handleNavClick('#faq')}
            className="nav-link-btn"
            title="Frequently Asked Questions"
          >
            <HelpCircle size={14} color="#06b6d4" />
            <span>FAQ</span>
          </button>
        </nav>

        {/* Right: Theme Toggler */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Neumorphic Push Button Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-secondary"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--neu-btn)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            <div
              style={{
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isRotatingTheme ? 'rotate(360deg) scale(1.15)' : 'rotate(0deg) scale(1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {theme === 'dark' ? (
                <Sun size={19} color="#fcaf45" />
              ) : (
                <Moon size={19} color="#833ab4" />
              )}
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};


