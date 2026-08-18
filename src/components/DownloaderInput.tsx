'use client';

import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Clipboard,
  X,
  Loader2,
  AlertCircle,
  Zap,
  Film,
  Music,
  Layers,
  UserCheck,
  FileText,
  Link as LinkIcon,
  Check,
  Sparkles,
} from 'lucide-react';
import { MediaType } from '@/types/instagram';

interface DownloaderInputProps {
  url: string;
  onChangeUrl: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  loadingStep?: string;
  error?: string | null;
  activeType: MediaType;
  onSelectType?: (type: MediaType) => void;
}

export const DownloaderInput: React.FC<DownloaderInputProps> = ({
  url,
  onChangeUrl,
  onSubmit,
  isLoading,
  loadingStep,
  error,
  activeType,
  onSelectType,
}) => {
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatTabs: {
    id: MediaType;
    label: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
  }[] = [
    {
      id: 'reel',
      label: 'Reels & Video',
      icon: <Film size={15} />,
      color: '#e1306c',
      gradient: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
    },
    {
      id: 'audio',
      label: 'Audio / MP3',
      icon: <Music size={15} />,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
    },
    {
      id: 'post',
      label: 'Photos & ZIP',
      icon: <Layers size={15} />,
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
    {
      id: 'profile',
      label: 'Profile DP',
      icon: <UserCheck size={15} />,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      id: 'caption',
      label: 'Captions',
      icon: <FileText size={15} />,
      color: '#0095f6',
      gradient: 'linear-gradient(135deg, #0095f6, #2563eb)',
    },
  ];

  const getToolDetails = () => {
    switch (activeType) {
      case 'reel':
        return {
          placeholder: 'Paste Instagram Reel or Video link...',
          icon: <Film size={18} color="#e1306c" />,
          label: 'REEL',
          color: '#e1306c',
        };
      case 'audio':
        return {
          placeholder: 'Paste Reel link to extract MP3 audio...',
          icon: <Music size={18} color="#f59e0b" />,
          label: 'AUDIO',
          color: '#f59e0b',
        };
      case 'post':
        return {
          placeholder: 'Paste Instagram Photo or Carousel link...',
          icon: <Layers size={18} color="#a855f7" />,
          label: 'PHOTOS',
          color: '#a855f7',
        };
      case 'profile':
        return {
          placeholder: 'Enter Instagram username or profile link...',
          icon: <UserCheck size={18} color="#10b981" />,
          label: 'PROFILE',
          color: '#10b981',
        };
      case 'caption':
        return {
          placeholder: 'Paste Post or Reel link to extract captions...',
          icon: <FileText size={18} color="#0095f6" />,
          label: 'CAPTION',
          color: '#0095f6',
        };
      default:
        return {
          placeholder: 'Paste Instagram link here...',
          icon: <LinkIcon size={18} color="#e1306c" />,
          label: 'LINK',
          color: '#e1306c',
        };
    }
  };

  const toolDetails = getToolDetails();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChangeUrl(text.trim());
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 2000);
      }
    } catch {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto' }}>
      {/* Neumorphic Master Control Console */}
      <div
        className="neu-master-station"
        style={{
          position: 'relative',
          padding: 'clamp(14px, 2.5vw, 22px)',
          borderRadius: '26px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: isFocused
            ? 'var(--neu-raised-glow)'
            : 'var(--neu-raised)',
          border: '1px solid var(--border-subtle)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Top Format Switcher Segmented Track */}
        <div
          className="format-switcher-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '14px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {formatTabs.map((tab) => {
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (onSelectType) onSelectType(tab.id);
                }}
                className={`format-pill-btn ${isActive ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                  background: isActive ? tab.gradient : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.78rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--neu-pill-active)' : 'none',
                  flex: '1 0 auto',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: isActive ? '#ffffff' : tab.color, display: 'flex', alignItems: 'center' }}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Form Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="downloader-form-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Neumorphic Inset Input Channel */}
          <div
            className="neu-input-channel"
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              position: 'relative',
              minWidth: 0,
              backgroundColor: 'var(--bg-surface-inset)',
              boxShadow: 'var(--neu-inset)',
              borderRadius: '16px',
              padding: '6px 12px 6px 14px',
              border: error ? '1.5px solid #ef4444' : isFocused ? '1.5px solid rgba(225, 48, 108, 0.5)' : '1px solid var(--border-subtle)',
              transition: 'border-color 0.2s ease',
            }}
          >
            {/* Mode Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 8px',
                borderRadius: '8px',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--neu-btn)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: toolDetails.color,
                flexShrink: 0,
                marginRight: '6px',
              }}
              title={toolDetails.label}
            >
              {toolDetails.icon}
              <span className="channel-mode-text">{toolDetails.label}</span>
            </div>

            {/* Main Text Input */}
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={(e) => onChangeUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={toolDetails.placeholder}
              disabled={isLoading}
              className="downloader-input-field"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontSize: 'clamp(0.88rem, 2vw, 0.98rem)',
                padding: '10px 6px',
                fontFamily: 'inherit',
                fontWeight: 600,
              }}
            />

            {/* Clear Button */}
            {url && !isLoading && (
              <button
                type="button"
                onClick={() => {
                  onChangeUrl('');
                  if (inputRef.current) inputRef.current.focus();
                }}
                style={{
                  background: 'var(--bg-surface)',
                  boxShadow: 'var(--neu-btn)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '9999px',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
                title="Clear input"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Neumorphic Push Actions */}
          <div className="downloader-actions-cluster" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Tactile Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="btn-secondary downloader-paste-btn"
              style={{
                padding: '12px 16px',
                fontSize: '0.86rem',
                whiteSpace: 'nowrap',
                fontWeight: 800,
                borderRadius: '14px',
                boxShadow: 'var(--neu-btn)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Paste from clipboard"
            >
              {pasteSuccess ? (
                <>
                  <Check size={15} color="#10b981" />
                  <span style={{ color: '#10b981' }}>Pasted!</span>
                </>
              ) : (
                <>
                  <Clipboard size={15} color="#f59e0b" />
                  <span>Paste</span>
                </>
              )}
            </button>

            {/* CTA Download Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="btn-gradient downloader-submit-btn"
              style={{
                padding: '12px 24px',
                fontSize: '0.92rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                borderRadius: '14px',
                minWidth: '130px',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <span>Download</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Progressive Step Loading Feedback */}
      {isLoading && loadingStep && (
        <div
          style={{
            marginTop: '14px',
            padding: '10px 16px',
            borderRadius: '14px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid rgba(225, 48, 108, 0.4)',
            color: '#e1306c',
            fontSize: '0.86rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Zap size={15} className="animate-bounce" />
          <span>{loadingStep}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: '14px',
            padding: '10px 16px',
            borderRadius: '14px',
            backgroundColor: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset-sm)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#ef4444',
            fontSize: '0.86rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <style jsx>{`
        .format-switcher-track::-webkit-scrollbar {
          display: none;
        }
        .format-pill-btn:hover:not(.active) {
          background: var(--bg-surface-raised) !important;
          color: var(--text-main) !important;
        }
        @media (max-width: 680px) {
          .downloader-form-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .channel-mode-text {
            display: none !important;
          }
          .downloader-actions-cluster {
            width: 100% !important;
            display: grid !important;
            grid-template-columns: 1fr 1.6fr !important;
          }
          .downloader-paste-btn,
          .downloader-submit-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};
