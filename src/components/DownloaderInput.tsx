'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  Clipboard,
  X,
  Loader2,
  AlertCircle,
  Zap,
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

  const getPlaceholder = () => {
    switch (activeType) {
      case 'reel':
        return 'Paste Instagram Reel or Video URL (e.g. instagram.com/reel/...)';
      case 'post':
        return 'Paste Instagram Post or Carousel link (e.g. instagram.com/p/...)';
      case 'profile':
        return 'Enter Instagram Username (e.g. @zuck) or profile URL';
      case 'audio':
        return 'Paste Reel link to extract crystal clear MP3 audio';
      case 'caption':
        return 'Paste Post or Reel link to extract captions & hashtags';
      default:
        return 'Paste any Instagram URL here...';
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChangeUrl(text.trim());
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 2000);
      }
    } catch {
      // Fallback if clipboard API is blocked
      const input = document.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '860px', margin: '0 auto' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="glass-panel downloader-form"
        style={{
          position: 'relative',
          padding: '8px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: error ? '1.5px solid #ef4444' : '1px solid var(--border-subtle)',
          boxShadow: error
            ? '0 0 20px rgba(239, 68, 68, 0.25)'
            : 'var(--accent-glow-subtle)',
          backgroundColor: 'var(--bg-input)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, position: 'relative', minWidth: 0 }}>
          <input
            type="text"
            value={url}
            onChange={(e) => onChangeUrl(e.target.value)}
            placeholder={getPlaceholder()}
            disabled={isLoading}
            className="downloader-input-field"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: 'clamp(0.88rem, 2vw, 1rem)',
              padding: '12px 14px',
              fontFamily: 'inherit',
              fontWeight: 500,
            }}
          />

          {/* Clear Button */}
          {url && !isLoading && (
            <button
              type="button"
              onClick={() => onChangeUrl('')}
              style={{
                background: 'rgba(128, 128, 128, 0.15)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                flexShrink: 0,
                marginRight: '6px',
              }}
              title="Clear"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Buttons Action Group */}
        <div className="downloader-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Paste Button */}
          <button
            type="button"
            onClick={handlePaste}
            className="btn-secondary downloader-paste-btn"
            style={{
              padding: '10px 16px',
              fontSize: '0.88rem',
              whiteSpace: 'nowrap',
              fontWeight: 700,
            }}
            title="Paste from clipboard"
          >
            <Clipboard size={16} color={pasteSuccess ? '#10b981' : '#f59e0b'} />
            <span>{pasteSuccess ? 'Pasted!' : 'Paste'}</span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="btn-gradient downloader-submit-btn"
            style={{
              padding: '12px 24px',
              fontSize: '0.94rem',
              whiteSpace: 'nowrap',
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Fetching...</span>
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

      {/* Real-time Fetch Progress Feedback */}
      {isLoading && loadingStep && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(225, 48, 108, 0.12)',
            border: '1px solid rgba(225, 48, 108, 0.3)',
            color: '#e1306c',
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'pulse 1.5s infinite',
          }}
        >
          <Zap size={16} className="animate-bounce" />
          <span>{loadingStep}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#dc2626',
            fontSize: '0.9rem',
            fontWeight: 600,
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
        @media (max-width: 580px) {
          .downloader-form {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 8px !important;
            gap: 8px !important;
          }
          .downloader-input-field {
            padding: 10px 8px !important;
          }
          .downloader-actions {
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
