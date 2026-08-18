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
  Sparkles,
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
  onLoadSample,
}) => {
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getToolDetails = () => {
    switch (activeType) {
      case 'reel':
        return {
          placeholder: 'Paste Instagram Reel or Video link (e.g. instagram.com/reel/...)',
          icon: <Film size={18} color="#e1306c" />,
          label: 'Reel / Video',
          color: '#e1306c',
        };
      case 'audio':
        return {
          placeholder: 'Paste Reel link to extract 320kbps MP3 audio track...',
          icon: <Music size={18} color="#f59e0b" />,
          label: 'Audio Extract',
          color: '#f59e0b',
        };
      case 'post':
        return {
          placeholder: 'Paste Instagram Photo / Carousel link (e.g. instagram.com/p/...)',
          icon: <Layers size={18} color="#a855f7" />,
          label: 'Photos & ZIP',
          color: '#a855f7',
        };
      case 'profile':
        return {
          placeholder: 'Enter Instagram username (e.g. @zuck) or profile URL...',
          icon: <UserCheck size={18} color="#10b981" />,
          label: 'Profile & DP',
          color: '#10b981',
        };
      case 'caption':
        return {
          placeholder: 'Paste Post or Reel link to extract captions and viral tags...',
          icon: <FileText size={18} color="#0095f6" />,
          label: 'Captions',
          color: '#0095f6',
        };
      default:
        return {
          placeholder: 'Paste any Instagram URL here...',
          icon: <LinkIcon size={18} color="#e1306c" />,
          label: 'Instagram',
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
    <div style={{ width: '100%', maxWidth: '920px', margin: '0 auto' }}>
      {/* Outer Glow Halo Wrapper */}
      <div
        className="input-glow-wrapper"
        style={{
          position: 'relative',
          padding: '2px',
          borderRadius: '22px',
          background: isFocused
            ? 'linear-gradient(135deg, #f09433, #dc2743, #bc1888, #833ab4, #0095f6)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
          boxShadow: isFocused
            ? '0 0 35px rgba(225, 48, 108, 0.45), 0 10px 40px rgba(0, 0, 0, 0.5)'
            : '0 10px 30px rgba(0, 0, 0, 0.35)',
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
            position: 'relative',
            padding: '8px 10px 8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '20px',
            backgroundColor: 'var(--bg-input)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: error ? '1.5px solid #ef4444' : 'none',
          }}
        >
          {/* Leading Tool Icon Indicator */}
          <div
            className="input-leading-icon"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              flexShrink: 0,
              transition: 'transform 0.2s ease',
            }}
            title={toolDetails.label}
          >
            {toolDetails.icon}
          </div>

          {/* Search Input Field */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, position: 'relative', minWidth: 0 }}>
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
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                padding: '12px 10px',
                fontFamily: 'inherit',
                fontWeight: 500,
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
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '9999px',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  flexShrink: 0,
                  marginRight: '6px',
                  transition: 'all 0.2s ease',
                }}
                title="Clear input"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Action Buttons Group */}
          <div className="downloader-actions-cluster" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Smart Paste Button */}
            <button
              type="button"
              onClick={handlePaste}
              className="btn-secondary downloader-paste-btn"
              style={{
                padding: '11px 16px',
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                borderRadius: '14px',
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

            {/* Download CTA Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="btn-gradient downloader-submit-btn"
              style={{
                padding: '12px 24px',
                fontSize: '0.96rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                borderRadius: '14px',
                minWidth: '130px',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Processing...</span>
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

      {/* Quick Test Demo Chips */}
      {onLoadSample && (
        <div
          style={{
            marginTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '0.82rem',
          }}
        >
          <span style={{ color: 'var(--text-dim)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={13} color="#fcaf45" /> Quick Demos:
          </span>
          {[
            { id: 'reel', label: '🎬 4K Reel' },
            { id: 'post', label: '📸 Photo Post' },
            { id: 'audio', label: '🎵 Reel Audio (MP3)' },
            { id: 'profile', label: '👤 Profile DP' },
          ].map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onLoadSample(sample.id)}
              disabled={isLoading}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              className="sample-pill-btn"
            >
              {sample.label}
            </button>
          ))}
        </div>
      )}

      {/* Progressive Step Loading Feedback */}
      {isLoading && loadingStep && (
        <div
          style={{
            marginTop: '14px',
            padding: '12px 18px',
            borderRadius: '14px',
            background: 'rgba(225, 48, 108, 0.12)',
            border: '1px solid rgba(225, 48, 108, 0.35)',
            color: '#e1306c',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            animation: 'pulse 1.5s infinite',
            boxShadow: '0 4px 20px rgba(225, 48, 108, 0.2)',
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
            marginTop: '14px',
            padding: '12px 18px',
            borderRadius: '14px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#ef4444',
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
        .sample-pill-btn:hover {
          background: rgba(225, 48, 108, 0.12) !important;
          border-color: rgba(225, 48, 108, 0.4) !important;
          color: #e1306c !important;
          transform: translateY(-1px);
        }
        @media (max-width: 600px) {
          .downloader-form-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 10px !important;
            gap: 10px !important;
          }
          .input-leading-icon {
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

