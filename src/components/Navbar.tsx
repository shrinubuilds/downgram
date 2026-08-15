'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  HelpCircle,
  BookOpen,
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
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: theme === 'dark' ? 'rgba(10, 11, 14, 0.85)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: theme === 'dark' ? '0 4px 30px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px',
          gap: '16px',
        }}
      >
        {/* Brand Custom Animated Logo */}
        <Link
          href="/"
          onClick={() => {
            if (onSelectType) onSelectType('reel');
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <DownGramLogo size="md" />
        </Link>

        {/* Center Navigation Links (Guides & Info) */}
        <nav
          className="desktop-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {/* How to Guide */}
          <button
            onClick={() => handleNavClick('#how-to')}
            className="nav-link-btn"
            title="How to Download"
          >
            <BookOpen size={16} color="#22c55e" />
            <span>How It Works</span>
          </button>

          {/* FAQ */}
          <button
            onClick={() => handleNavClick('#faq')}
            className="nav-link-btn"
            title="Frequently Asked Questions"
          >
            <HelpCircle size={16} color="#0095f6" />
            <span>FAQ</span>
          </button>
        </nav>

        {/* Right Header Action Items: Theme Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Deluxe Animated Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="btn-secondary"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                <Sun size={20} color="#fcaf45" />
              ) : (
                <Moon size={20} color="#833ab4" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic Animated Gradient Flow Line at Header Bottom */}
      <div className="header-animated-border" />

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .desktop-nav-links {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
