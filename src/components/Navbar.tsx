'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  HelpCircle,
  BookOpen,
  Zap,
  Menu,
  X,
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
  ChevronRight,
  Shield,
  Scale,
} from 'lucide-react';
import { MediaType } from '@/types/instagram';
import { DownGramLogo } from './DownGramLogo';

interface NavbarProps {
  onSelectType?: (type: MediaType) => void;
  activeType?: MediaType;
  historyCount?: number;
  onOpenHistory?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectType, activeType }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isRotatingTheme, setIsRotatingTheme] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${hash}`;
    }
  };

  const navTools = [
    {
      href: '/reels',
      label: 'Reels & Video',
      desc: 'Download original MP4 videos',
      icon: <Film size={18} />,
      color: '#e1306c',
      type: 'reel' as MediaType,
    },
    {
      href: '/audio',
      label: 'Audio / MP3 Extractor',
      desc: 'Extract MP3 background music',
      icon: <Music size={18} />,
      color: '#f59e0b',
      type: 'audio' as MediaType,
    },
    {
      href: '/photos',
      label: 'Photos & Carousels',
      desc: 'Single photos & multi-slide ZIP',
      icon: <Layers size={18} />,
      color: '#a855f7',
      type: 'post' as MediaType,
    },
    {
      href: '/profile',
      label: 'Profile DP Downloader',
      desc: 'Full-size avatar & bio info',
      icon: <UserCheck size={18} />,
      color: '#10b981',
      type: 'profile' as MediaType,
    },
    {
      href: '/captions',
      label: 'Captions & Hashtags',
      desc: 'Copy formatted text & tags',
      icon: <FileText size={18} />,
      color: '#0095f6',
      type: 'caption' as MediaType,
    },
  ];

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
          padding: '0 clamp(14px, 2.5vw, 24px)',
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

        {/* Left: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            href="/"
            onClick={() => {
              if (onSelectType) onSelectType('reel');
              setIsMenuOpen(false);
            }}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
          >
            <DownGramLogo size="md" />
          </Link>
        </div>

        {/* Center: Desktop Quick Navigation Pill Dock */}
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
          <Link
            href="/reels"
            className="nav-link-btn"
            style={{ color: activeType === 'reel' ? '#e1306c' : undefined }}
          >
            <Film size={14} color="#e1306c" />
            <span>Reels</span>
          </Link>

          <Link
            href="/audio"
            className="nav-link-btn"
            style={{ color: activeType === 'audio' ? '#f59e0b' : undefined }}
          >
            <Music size={14} color="#f59e0b" />
            <span>Audio</span>
          </Link>

          <Link
            href="/photos"
            className="nav-link-btn"
            style={{ color: activeType === 'post' ? '#a855f7' : undefined }}
          >
            <Layers size={14} color="#a855f7" />
            <span>Photos</span>
          </Link>

          <Link
            href="/profile"
            className="nav-link-btn"
            style={{ color: activeType === 'profile' ? '#10b981' : undefined }}
          >
            <UserCheck size={14} color="#10b981" />
            <span>Profile DP</span>
          </Link>

          <Link
            href="/captions"
            className="nav-link-btn"
            style={{ color: activeType === 'caption' ? '#0095f6' : undefined }}
          >
            <FileText size={14} color="#0095f6" />
            <span>Captions</span>
          </Link>
        </nav>

        {/* Right: Theme Toggler & Hamburger Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn-secondary hamburger-btn"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isMenuOpen ? 'var(--neu-btn-pressed)' : 'var(--neu-btn)',
              background: isMenuOpen ? 'var(--bg-surface-raised)' : 'var(--bg-surface)',
              border: isMenuOpen ? '1.5px solid #e1306c' : '1px solid var(--border-subtle)',
              color: isMenuOpen ? '#e1306c' : 'var(--text-main)',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            title="Tools Menu"
            aria-label="Tools Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Neumorphic Dropdown / Mobile Menu Drawer */}
      {isMenuOpen && (
        <div
          className="neu-panel menu-drawer"
          style={{
            position: 'absolute',
            top: '80px',
            left: '16px',
            right: '16px',
            padding: '20px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '24px',
            boxShadow: 'var(--neu-raised-glow)',
            border: '1px solid var(--border-subtle)',
            animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Instagram Download Tools
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* List of Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => {
                  if (onSelectType) onSelectType(tool.type);
                  setIsMenuOpen(false);
                }}
                className="tool-drawer-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: 'var(--bg-surface)',
                  boxShadow: 'var(--neu-btn)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      background: 'var(--bg-surface-inset)',
                      boxShadow: 'var(--neu-inset-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: tool.color,
                      flexShrink: 0,
                    }}
                  >
                    {tool.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-main)' }}>
                      {tool.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {tool.desc}
                    </div>
                  </div>
                </div>

                <ChevronRight size={18} color="var(--text-dim)" />
              </Link>
            ))}
          </div>

          {/* Quick Links in Menu */}
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <button
              onClick={() => handleNavClick('#how-to')}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '10px' }}
            >
              <BookOpen size={13} color="#10b981" />
              <span>How It Works</span>
            </button>

            <button
              onClick={() => handleNavClick('#faq')}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '10px' }}
            >
              <HelpCircle size={13} color="#06b6d4" />
              <span>FAQ</span>
            </button>

            <Link
              href="/privacy"
              onClick={() => setIsMenuOpen(false)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '10px', textDecoration: 'none' }}
            >
              <Shield size={13} color="#a855f7" />
              <span>Privacy</span>
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .tool-drawer-item:hover {
          background: var(--bg-surface-raised) !important;
          box-shadow: var(--neu-raised-sm) !important;
          transform: translateX(4px);
        }
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};


