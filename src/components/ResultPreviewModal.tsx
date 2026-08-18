'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  FileArchive,
  ExternalLink,
  CheckCircle2,
  Film,
  Music,
  UserCheck,
  Layers,
  FileText,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Link as LinkIcon,
} from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { InstagramScrapeResult, MediaItem, MediaType } from '@/types/instagram';
import { formatNumber, triggerDownload, copyToClipboard } from '@/lib/utils';
import { AudioPlayerCard } from './AudioPlayerCard';

interface ResultPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InstagramScrapeResult | null;
  selectedType: MediaType;
  onSaveToHistory?: (item: any) => void;
}

export const ResultPreviewModal: React.FC<ResultPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  selectedType,
  onSaveToHistory,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isZipping, setIsZipping] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const items = data.items || [];
  const currentItem: MediaItem | undefined = items[currentSlideIndex] || items[0];
  const isCarousel = items.length > 1;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'],
      });
    } catch {}
  };

  const handleDownloadMedia = (item?: MediaItem) => {
    const targetItem = item || currentItem;
    if (!targetItem?.url) return;

    const ext = targetItem.type === 'video' ? 'mp4' : 'jpg';
    const filename =
      targetItem.filename ||
      `DownGram_${data.author?.username || 'media'}_${targetItem.id || 'download'}.${ext}`;

    triggerDownload(targetItem.url, filename);
    triggerConfetti();

    if (onSaveToHistory) {
      onSaveToHistory({
        id: targetItem.id || String(Date.now()),
        timestamp: Date.now(),
        url: data.url,
        mediaType: selectedType,
        title: data.title || `${data.author?.username || 'Instagram'} ${selectedType}`,
        thumbnailUrl: targetItem.thumbnailUrl || targetItem.url,
        downloadUrl: targetItem.url,
      });
    }
  };

  const handleDownloadAudio = () => {
    const audioUrl = data.audio?.audioUrl || (currentItem?.type === 'video' ? currentItem.url : null);
    if (!audioUrl) return;

    const filename = `DownGram_Audio_${data.author?.username || 'track'}_${data.shortcode || 'audio'}.mp3`;
    triggerDownload(audioUrl, filename);
    triggerConfetti();

    if (onSaveToHistory) {
      onSaveToHistory({
        id: `audio_${data.shortcode || Date.now()}`,
        timestamp: Date.now(),
        url: data.url,
        mediaType: 'audio',
        title: data.audio?.title || `Audio by @${data.author?.username}`,
        thumbnailUrl: data.audio?.coverUrl || data.author?.avatarUrl || '',
        downloadUrl: audioUrl,
      });
    }
  };

  const handleDownloadProfilePic = () => {
    const picUrl =
      data.profile?.profilePicUrlHd ||
      data.profile?.profilePicUrl ||
      data.author?.avatarUrl ||
      currentItem?.thumbnailUrl ||
      currentItem?.url;
    if (!picUrl) return;

    const filename = `DownGram_${data.author?.username || 'profile'}_HD_DP.jpg`;
    triggerDownload(picUrl, filename);
    triggerConfetti();
  };

  const handleDownloadAllZip = async () => {
    if (items.length === 0 || isZipping) return;
    setIsZipping(true);

    try {
      const zip = new JSZip();
      const folder = zip.folder(`DownGram_${data.author?.username || 'instagram'}_carousel`);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const res = await fetch(
          `/api/proxy-download?url=${encodeURIComponent(item.url)}&filename=slide_${i + 1}`
        );
        if (res.ok) {
          const blob = await res.blob();
          const ext = item.type === 'video' ? 'mp4' : 'jpg';
          folder?.file(`slide_${i + 1}.${ext}`, blob);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `DownGram_${data.author?.username || 'carousel'}_all_slides.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(zipUrl);

      triggerConfetti();
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopyText = async (text: string, key: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
      triggerConfetti();
    }
  };

  const getHeaderBadge = () => {
    switch (selectedType) {
      case 'audio':
        return { label: 'Audio Track', icon: <Music size={16} />, color: '#f59e0b' };
      case 'profile':
        return { label: 'Profile (DP & Bio)', icon: <UserCheck size={16} />, color: '#10b981' };
      case 'post':
        return { label: isCarousel ? `Album (${items.length} Photos)` : 'Photo Preview', icon: <Layers size={16} />, color: '#a855f7' };
      case 'caption':
      case 'bio':
        return { label: 'Caption', icon: <FileText size={16} />, color: '#f97316' };
      case 'reel':
      default:
        return { label: 'Reel Preview', icon: <Film size={16} />, color: '#e1306c' };
    }
  };

  const headerBadge = getHeaderBadge();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="neu-panel"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--neu-raised-glow)',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          {/* Left: Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-surface-inset)',
              boxShadow: 'var(--neu-inset-sm)',
              border: '1px solid var(--border-subtle)',
              color: headerBadge.color,
              fontSize: '0.84rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}
          >
            {headerBadge.icon}
            <span>{headerBadge.label}</span>
          </div>

          {/* Right: Neumorphic Circular Close Button */}
          <button
            onClick={onClose}
            style={{
              width: '34px',
              height: '34px',
              minWidth: '34px',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--neu-btn)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
            title="Close Preview (Esc)"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body - Strictly Tailored By User's Selected Tool */}
        <div
          style={{
            padding: '16px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* 1. REEL ONLY PREVIEW (Clean 9:16 Video Player Only) */}
          {selectedType === 'reel' && (
            <div
              style={{
                position: 'relative',
                backgroundColor: '#050608',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '320px',
                maxHeight: '54vh',
                aspectRatio: '9 / 16',
                margin: '0 auto',
                boxShadow: 'var(--neu-inset), 0 12px 30px rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {currentItem?.type === 'video' ? (
                <video
                  src={`/api/proxy-download?url=${encodeURIComponent(currentItem.url)}&inline=true`}
                  poster={currentItem.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <img
                  src={`/api/proxy-download?url=${encodeURIComponent(currentItem?.url || '')}&inline=true`}
                  alt="Reel preview"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
            </div>
          )}

          {/* 2. AUDIO ONLY PREVIEW */}
          {selectedType === 'audio' && (
            <div style={{ margin: '4px 0' }}>
              <AudioPlayerCard
                audio={
                  data.audio || {
                    title: `Sound from @${data.author?.username || 'track'}`,
                    artist: `@${data.author?.username || 'instagram_user'}`,
                    audioUrl: currentItem?.url || '',
                    coverUrl: data.author?.avatarUrl || currentItem?.thumbnailUrl,
                    isOriginalAudio: true,
                  }
                }
                authorUsername={data.author?.username}
              />
            </div>
          )}

          {/* 3. PROFILE ONLY PREVIEW (DP + Bio + Bio Links in one unified place) */}
          {selectedType === 'profile' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Profile Card & Avatar */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px 16px',
                  backgroundColor: 'var(--bg-surface)',
                  boxShadow: 'var(--neu-raised-sm)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px',
                    background: 'var(--ig-primary-gradient)',
                    boxShadow: 'var(--neu-raised-glow)',
                    marginBottom: '16px',
                  }}
                >
                  {(() => {
                    const dpPicUrl =
                      data.profile?.profilePicUrlHd ||
                      data.profile?.profilePicUrl ||
                      data.author?.avatarUrl ||
                      currentItem?.thumbnailUrl ||
                      currentItem?.url ||
                      '';
                    return (
                      <img
                        src={`/api/proxy-download?url=${encodeURIComponent(dpPicUrl)}&inline=true`}
                        alt={data.author?.username || 'Avatar'}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 'var(--radius-full)',
                          objectFit: 'cover',
                          border: '3px solid var(--bg-card)',
                        }}
                      />
                    );
                  })()}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    @{data.author?.username}
                  </h3>
                  {data.author?.isVerified && (
                    <CheckCircle2 size={16} color="#0095f6" fill="#0095f6" stroke="#fff" />
                  )}
                </div>

                {data.author?.fullName && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    {data.author.fullName}
                  </p>
                )}

                {/* Follower Stats */}
                {data.profile && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {data.profile.followersCount !== undefined && (
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '1.05rem' }}>
                          {formatNumber(data.profile.followersCount)}
                        </strong>
                        Followers
                      </div>
                    )}
                    {data.profile.followingCount !== undefined && (
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '1.05rem' }}>
                          {formatNumber(data.profile.followingCount)}
                        </strong>
                        Following
                      </div>
                    )}
                    {data.profile.postsCount !== undefined && (
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '1.05rem' }}>
                          {formatNumber(data.profile.postsCount)}
                        </strong>
                        Posts
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Biography Section */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface-inset)',
                  boxShadow: 'var(--neu-inset-sm)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
                    BIOGRAPHY
                  </span>
                  <button
                    onClick={() => handleCopyText(data.profile?.biography || data.caption || '', 'bio')}
                    style={{
                      background: 'var(--bg-surface)',
                      boxShadow: 'var(--neu-btn)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      color: copiedKey === 'bio' ? '#22c55e' : '#e1306c',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {copiedKey === 'bio' ? <Check size={13} /> : <Copy size={13} />}
                    {copiedKey === 'bio' ? 'Copied Bio' : 'Copy Bio'}
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {data.profile?.biography || data.caption || 'No biography text provided.'}
                </p>
              </div>

              {/* Bio Links Section */}
              {data.profile?.externalUrl && (
                <div
                  style={{
                    backgroundColor: 'var(--bg-surface-inset)',
                    boxShadow: 'var(--neu-inset-sm)',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <LinkIcon size={16} color="#0095f6" />
                    <a
                      href={data.profile.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#0095f6',
                        textDecoration: 'underline',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {data.profile.externalUrl}
                    </a>
                  </div>

                  <button
                    onClick={() => handleCopyText(data.profile?.externalUrl || '', 'link')}
                    style={{
                      background: 'rgba(0, 149, 246, 0.1)',
                      border: '1px solid rgba(0, 149, 246, 0.3)',
                      color: '#0095f6',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0,
                    }}
                  >
                    {copiedKey === 'link' ? <Check size={12} /> : <Copy size={12} />}
                    {copiedKey === 'link' ? 'Copied' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. PHOTO & CAROUSEL ONLY PREVIEW */}
          {selectedType === 'post' && currentItem && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#000000',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '340px',
                  maxHeight: '480px',
                }}
              >
                <img
                  src={`/api/proxy-download?url=${encodeURIComponent(currentItem.url)}&inline=true`}
                  alt={`Slide ${currentSlideIndex + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '480px', objectFit: 'contain' }}
                />

                {isCarousel && (
                  <>
                    <button
                      onClick={() => setCurrentSlideIndex((p) => (p > 0 ? p - 1 : items.length - 1))}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 0, 0, 0.65)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentSlideIndex((p) => (p < items.length - 1 ? p + 1 : 0))}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 0, 0, 0.65)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        color: '#fff',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {currentSlideIndex + 1} / {items.length}
                    </div>
                  </>
                )}
              </div>

              {isCarousel && (
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {items.map((it, idx) => (
                    <div
                      key={it.id || idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      style={{
                        position: 'relative',
                        width: '64px',
                        height: '64px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border:
                          currentSlideIndex === idx
                            ? '2px solid #a855f7'
                            : '1px solid var(--border-subtle)',
                        opacity: currentSlideIndex === idx ? 1 : 0.6,
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={`/api/proxy-download?url=${encodeURIComponent(it.thumbnailUrl || it.url)}&inline=true`}
                        alt={`Thumb ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. CAPTION ONLY PREVIEW (Full text caption and hashtags only) */}
          {(selectedType === 'caption' || selectedType === 'bio') && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Full Post Caption
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {(data.caption || data.profile?.biography || '').length} characters
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    maxHeight: '260px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.94rem',
                    color: 'var(--text-main)',
                    lineHeight: 1.6,
                  }}
                >
                  {data.caption || data.profile?.biography || 'No text caption available.'}
                </div>

                {/* Hashtag breakdown */}
                {data.hashtags && data.hashtags.length > 0 && (
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                      Hashtags ({data.hashtags.length})
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {data.hashtags.map((h, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(249, 115, 22, 0.12)',
                            color: '#f97316',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer - Symmetrical, Balanced Action Bar */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}
        >
          {/* Reel Actions */}
          {selectedType === 'reel' && (
            <button
              onClick={() => handleDownloadMedia()}
              className="btn-gradient"
              style={{
                width: '100%',
                height: '48px',
                fontSize: '0.98rem',
                fontWeight: 800,
                borderRadius: '14px',
              }}
            >
              <Download size={19} />
              <span>Download Reel (MP4)</span>
            </button>
          )}

          {/* Audio Actions */}
          {selectedType === 'audio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <button
                onClick={handleDownloadAudio}
                className="btn-gradient"
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  borderRadius: '14px',
                }}
              >
                <Download size={19} />
                <span>Download Audio Track (MP3)</span>
              </button>
              <button
                onClick={() => handleCopyText(data.url, 'audio_url')}
                className="btn-secondary"
                style={{
                  width: '100%',
                  height: '42px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                }}
              >
                {copiedKey === 'audio_url' ? <Check size={15} /> : <Copy size={15} />}
                <span>{copiedKey === 'audio_url' ? 'Copied Audio URL' : 'Copy Audio URL'}</span>
              </button>
            </div>
          )}

          {/* Profile Actions */}
          {selectedType === 'profile' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
              <button
                onClick={handleDownloadProfilePic}
                className="btn-gradient"
                style={{
                  height: '46px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  borderRadius: '14px',
                }}
              >
                <Download size={17} />
                <span>Download DP</span>
              </button>
              <button
                onClick={() => handleCopyText(data.profile?.biography || data.caption || '', 'bio_text')}
                className="btn-secondary"
                style={{
                  height: '46px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  borderRadius: '14px',
                }}
              >
                {copiedKey === 'bio_text' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedKey === 'bio_text' ? 'Copied Bio' : 'Copy Bio'}</span>
              </button>
            </div>
          )}

          {/* Photo & Carousel Actions */}
          {selectedType === 'post' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <button
                onClick={() => handleDownloadMedia()}
                className="btn-gradient"
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  borderRadius: '14px',
                }}
              >
                <Download size={19} />
                <span>
                  Download {isCarousel ? `Slide ${currentSlideIndex + 1} (JPG)` : 'Photo (JPG)'}
                </span>
              </button>

              {isCarousel && (
                <button
                  onClick={handleDownloadAllZip}
                  disabled={isZipping}
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    height: '42px',
                    borderColor: 'rgba(168, 85, 247, 0.4)',
                    background: 'rgba(168, 85, 247, 0.1)',
                    color: '#c084fc',
                    fontWeight: 700,
                    borderRadius: '12px',
                  }}
                >
                  <FileArchive size={16} />
                  <span>{isZipping ? 'Creating ZIP...' : `Download All ${items.length} Slides (.ZIP)`}</span>
                </button>
              )}
            </div>
          )}

          {/* Caption Copy Action */}
          {(selectedType === 'caption' || selectedType === 'bio') && (
            <button
              onClick={() => handleCopyText(data.caption || data.profile?.biography || '', 'full_caption')}
              className="btn-gradient"
              style={{
                width: '100%',
                height: '48px',
                fontSize: '0.98rem',
                fontWeight: 800,
                borderRadius: '14px',
              }}
            >
              {copiedKey === 'full_caption' ? <Check size={19} /> : <Copy size={19} />}
              <span>{copiedKey === 'full_caption' ? 'Copied Entire Caption!' : 'Copy Entire Caption'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
