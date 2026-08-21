'use client';

import React from 'react';
import {
  X,
  Trash2,
  Download,
  ExternalLink,
  History,
  Film,
  Image as ImageIcon,
  Music,
  User,
} from 'lucide-react';
import { HistoryItem } from '@/types/instagram';
import { triggerDownload } from '@/lib/utils';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectItem?: (item: HistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reel':
      case 'video':
        return <Film size={14} color="#e1306c" />;
      case 'audio':
        return <Music size={14} color="#fcaf45" />;
      case 'profile':
        return <User size={14} color="#0095f6" />;
      default:
        return <ImageIcon size={14} color="#a855f7" />;
    }
  };

  const handleRedownload = (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation();
    const filename = `DownGram_${item.mediaType}_${item.id}.${item.mediaType === 'audio' ? 'mp3' : item.mediaType === 'reel' || item.mediaType === 'video' ? 'mp4' : 'jpg'}`;
    triggerDownload(item.downloadUrl, filename);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-subtle)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.6)',
          overflowY: 'auto',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--ig-primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <History size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Download History</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                {history.length} {history.length === 1 ? 'item' : 'items'} saved locally
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ff4d4f',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                }}
                title="Clear History"
              >
                <Trash2 size={16} />
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'var(--text-dim)',
              gap: '12px',
            }}
          >
            <History size={48} strokeWidth={1.5} opacity={0.4} />
            <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>No downloads yet</p>
            <p style={{ fontSize: '0.82rem', maxWidth: '240px' }}>
              Your downloaded Instagram reels, photos, audio tracks, and DPs will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {history.map((item) => (
              <div
                key={item.id + item.timestamp}
                className="glass-panel"
                onClick={() => onSelectItem && onSelectItem(item)}
                style={{
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: onSelectItem ? 'pointer' : 'default',
                  transition: 'transform 0.15s ease',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={
                      item.thumbnailUrl.startsWith('data:') || item.thumbnailUrl.startsWith('/api/')
                        ? item.thumbnailUrl
                        : `/api/proxy-download?url=${encodeURIComponent(item.thumbnailUrl)}&inline=true`
                    }
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    {getTypeIcon(item.mediaType)}
                    <span>{item.mediaType}</span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {new Date(item.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Re-download button */}
                <button
                  onClick={(e) => handleRedownload(e, item)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(225, 48, 108, 0.15)',
                    border: '1px solid rgba(225, 48, 108, 0.3)',
                    color: '#ff5f9e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  title="Download Again"
                >
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
