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

  // Initialize theme from localStorage or system preference
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
        top: '12px',
        zIndex: 50,
        width: '100%',
        padding: '0 16px',
        maxWidth: '1240px',
        margin: '0 auto',
        pointerEvents: 'auto',
      }}
    >
      <div
        className="floating-header-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '66px',
          padding: '0 clamp(12px, 2.5vw, 24px)',
          borderRadius: '20px',
          backgroundColor:
            theme === 'dark'
              ? isScrolled
                ? 'rgba(14, 16, 22, 0.92)'
                : 'rgba(18, 20, 28, 0.82)'
              : isScrolled
              ? 'rgba(255, 255, 255, 0.94)'
              : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border:
            theme === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.12)'
              : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow:
            theme === 'dark'
              ? '0 10px 35px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              : '0 10px 30px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Gradient Accent Border Top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(90deg, #f09433, #dc2743, #bc1888, #833ab4, #0095f6, #f09433)',
            backgroundSize: '200% 100%',
            animation: 'headerGradientMove 5s linear infinite',
            opacity: 0.9,
          }}
        />

        {/* Left: Brand Logo */}
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

        {/* Center: Navigation Links */}
        <nav
          className="desktop-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background:
              theme === 'dark'
                ? 'rgba(255, 255, 255, 0.04)'
                : 'rgba(0, 0, 0, 0.03)',
            padding: '4px 6px',
            borderRadius: '14px',
            border:
              theme === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.06)'
                : '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* How to Guide */}
          <button
            onClick={() => handleNavClick('#how-to')}
            className="nav-link-btn"
            title="How to Download"
          >
            <BookOpen size={15} color="#22c55e" />
            <span>How It Works</span>
          </button>

          {/* Features */}
          <button
            onClick={() => handleNavClick('#downloader-box')}
            className="nav-link-btn"
            title="Explore Tools"
          >
            <Zap size={15} color="#f59e0b" />
            <span>Downloader</span>
          </button>

          {/* FAQ */}
          <button
            onClick={() => handleNavClick('#faq')}
            className="nav-link-btn"
            title="Frequently Asked Questions"
          >
            <HelpCircle size={15} color="#0095f6" />
            <span>FAQ</span>
          </button>
        </nav>

        {/* Right: Header Action Items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* 4K Badge */}
          <div
            className="header-badge-tag"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '12px',
              background: 'rgba(225, 48, 108, 0.12)',
              border: '1px solid rgba(225, 48, 108, 0.25)',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: '#e1306c',
              letterSpacing: '0.03em',
            }}
          >
            <Sparkles size={13} color="#fcaf45" />
            <span>4K ULTRA HD</span>
          </div>

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="btn-secondary"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 720px) {
          .desktop-nav-links {
            display: none !important;
          }
          .header-badge-tag {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

