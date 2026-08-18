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
  onLoadSample?: (typeKey: string) => void;
}

export const DownloaderInput: React.FC<DownloaderInputProps> = ({
  url,
  onChangeUrl,
  onSubmit,
  isLoading,
  loadingStep,
  error,
  activeType,
}) => {
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getToolDetails = () => {
    switch (activeType) {
      case 'reel':
        return {
          placeholder: 'Paste Instagram link here (Reel, Video, Photo, DP)...',
          icon: <Film size={18} color="#e1306c" />,
          label: 'REEL',
          color: '#e1306c',
        };
      case 'audio':
        return {
          placeholder: 'Paste Reel link to extract audio track (MP3)...',
          icon: <Music size={18} color="#f59e0b" />,
          label: 'AUDIO',
          color: '#f59e0b',
        };
      case 'post':
        return {
          placeholder: 'Paste Instagram Photo or Carousel link (e.g. instagram.com/p/...)',
          icon: <Layers size={18} color="#a855f7" />,
          label: 'PHOTOS',
          color: '#a855f7',
        };
      case 'profile':
        return {
          placeholder: 'Enter Instagram username (e.g. @username) or profile URL...',
          icon: <UserCheck size={18} color="#10b981" />,
          label: 'PROFILE',
          color: '#10b981',
        };
      case 'caption':
        return {
          placeholder: 'Paste Post or Reel link to extract caption text...',
          icon: <FileText size={18} color="#06b6d4" />,
          label: 'CAPTION',
          color: '#06b6d4',
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
    <div style={{ width: '100%', maxWidth: '940px', margin: '0 auto' }}>
      {/* Neumorphic Extruded Input Base Station */}
      <div
        className="neu-search-station"
        style={{
          position: 'relative',
          padding: '10px',
          borderRadius: '24px',
          backgroundColor: 'var(--bg-surface)',
          boxShadow: isFocused
            ? 'var(--neu-raised-glow)'
            : 'var(--neu-raised)',
          border: '1px solid var(--border-subtle)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
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
              padding: '6px 14px',
              border: error ? '1.5px solid #ef4444' : '1px solid var(--border-subtle)',
              transition: 'border-color 0.2s ease',
            }}
          >
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
                fontSize: 'clamp(0.92rem, 2vw, 1.02rem)',
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
                padding: '12px 18px',
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                fontWeight: 800,
                borderRadius: '16px',
                boxShadow: 'var(--neu-btn)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title="Paste from clipboard"
            >
              {pasteSuccess ? (
                <>
                  <Check size={16} color="#10b981" />
                  <span style={{ color: '#10b981' }}>Pasted!</span>
                </>
              ) : (
                <>
                  <Clipboard size={16} color="#f59e0b" />
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
                padding: '13px 26px',
                fontSize: '0.96rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                borderRadius: '16px',
                minWidth: '140px',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <span>Download</span>
                  <ArrowRight size={18} />
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
            marginTop: '16px',
            padding: '12px 18px',
            borderRadius: '16px',
            background: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset)',
            border: '1px solid rgba(225, 48, 108, 0.4)',
            color: '#e1306c',
            fontSize: '0.9rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Zap size={17} className="animate-bounce" />
          <span>{loadingStep}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px 18px',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-surface-inset)',
            boxShadow: 'var(--neu-inset)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#ef4444',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <style jsx>{`
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



