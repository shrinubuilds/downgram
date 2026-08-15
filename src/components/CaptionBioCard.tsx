'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  FileText,
  Hash,
  AtSign,
  AlignLeft,
} from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface CaptionBioCardProps {
  text: string;
  hashtags?: string[];
  mentions?: string[];
  title?: string;
  username?: string;
}

export const CaptionBioCard: React.FC<CaptionBioCardProps> = ({
  text,
  hashtags = [],
  mentions = [],
  title = 'Instagram Caption',
  username = 'creator',
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyTag = async (tag: string) => {
    const success = await copyToClipboard(tag);
    if (success) {
      setCopiedTag(tag);
      setTimeout(() => setCopiedTag(null), 1500);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DownGram_${username}_caption.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!text) return null;

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header with Stats & Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(225, 48, 108, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e1306c',
            }}
          >
            <FileText size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {title}
            </h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              <span>{charCount} characters</span>
              <span>•</span>
              <span>{wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleCopy}
            className={copied ? 'btn-gradient' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.84rem' }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy All'}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.84rem' }}
            title="Download as text file"
          >
            <Download size={15} />
            <span>Save .TXT</span>
          </button>
        </div>
      </div>

      {/* Formatted Text Box */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: '0.92rem',
          lineHeight: '1.6',
          color: 'var(--text-main)',
          maxHeight: '320px',
          overflowY: 'auto',
          fontFamily: 'inherit',
        }}
      >
        {text}
      </div>

      {/* Hashtag Tag-Cloud */}
      {hashtags.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Hash size={14} color="#fcaf45" />
            Extracted Hashtags ({hashtags.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {hashtags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleCopyTag(tag)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '0.8rem',
                  color: copiedTag === tag ? '#22c55e' : '#ff5f9e',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Click to copy hashtag"
              >
                {copiedTag === tag ? 'Copied!' : tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mentions */}
      {mentions.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AtSign size={14} color="#0095f6" />
            Tagged Accounts ({mentions.length})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {mentions.map((mention, idx) => (
              <a
                key={idx}
                href={`https://instagram.com/${mention.replace(/^@/, '')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(0, 149, 246, 0.1)',
                  border: '1px solid rgba(0, 149, 246, 0.25)',
                  borderRadius: 'var(--radius-full)',
                  padding: '3px 10px',
                  fontSize: '0.78rem',
                  color: '#60a5fa',
                  textDecoration: 'none',
                }}
              >
                {mention}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
