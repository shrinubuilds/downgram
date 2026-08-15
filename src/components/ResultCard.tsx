'use client';

import React, { useState } from 'react';
import {
  Download,
  Heart,
  MessageCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  FileArchive,
  Layers,
  Film,
  Music,
  UserCheck,
  FileText,
  Copy,
  Check,
} from 'lucide-react';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { InstagramScrapeResult, MediaItem, MediaType } from '@/types/instagram';
import { formatNumber, triggerDownload, copyToClipboard } from '@/lib/utils';
import { AudioPlayerCard } from './AudioPlayerCard';
import { CaptionBioCard } from './CaptionBioCard';

interface ResultCardProps {
  data: InstagramScrapeResult;
  selectedType?: MediaType;
  onSaveToHistory?: (item: any) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  data,
  selectedType = 'reel',
  onSaveToHistory,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isZipping, setIsZipping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const items = data.items || [];
  const currentItem: MediaItem | undefined = items[currentSlideIndex] || items[0];
  const isCarousel = items.length > 1;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'],
      });
    } catch {}
  };

  const handleDownloadSingle = (item?: MediaItem) => {
    const target = item || currentItem;
    if (!target?.url) return;

    const ext = target.type === 'video' ? 'mp4' : 'jpg';
    const filename =
      target.filename ||
      `DownGram_${data.author?.username || 'media'}_${target.id || 'download'}.${ext}`;

    triggerDownload(target.url, filename);
    triggerConfetti();

    if (onSaveToHistory) {
      onSaveToHistory({
        id: target.id || String(Date.now()),
        timestamp: Date.now(),
        url: data.url,
        mediaType: selectedType,
        title: data.title || `${data.author?.username || 'Instagram'} ${selectedType}`,
        thumbnailUrl: target.thumbnailUrl || target.url,
        downloadUrl: target.url,
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
      const folder = zip.folder(`DownGram_${data.author?.username || 'instagram'}_post`);

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

  const handleCopyCaption = async () => {
    const textToCopy = data.caption || data.profile?.biography || '';
    if (!textToCopy) return;

    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
      triggerConfetti();
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '860px',
        margin: '36px auto 0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* 1. REEL / FEED VIDEO ONLY MODE */}
      {(selectedType === 'reel' || selectedType === 'video') && (
        <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
          {/* Author Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {data.author?.avatarUrl ? (
                <img
                  src={data.author.avatarUrl}
                  alt={data.author.username}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    objectFit: 'cover',
                    border: '2px solid #e1306c',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--ig-primary-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                  }}
                >
                  {(data.author?.username || 'IG').slice(0, 2).toUpperCase()}
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <a
                    href={`https://instagram.com/${data.author?.username}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    @{data.author?.username || 'instagram_creator'}
                    <ExternalLink size={13} color="var(--text-dim)" />
                  </a>
                  {data.author?.isVerified && (
                    <CheckCircle2 size={16} color="#0095f6" fill="#0095f6" stroke="#fff" />
                  )}
                </div>
                {data.author?.fullName && (
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    {data.author.fullName}
                  </p>
                )}
              </div>
            </div>

            {/* Social Stats */}
            {data.stats && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.86rem' }}>
                {data.stats.likes !== undefined && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ff5f9e' }}>
                    <Heart size={16} fill="#ff5f9e" />
                    <span>{formatNumber(data.stats.likes)}</span>
                  </div>
                )}
                {data.stats.views !== undefined && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fcaf45' }}>
                    <Eye size={16} />
                    <span>{formatNumber(data.stats.views)} views</span>
                  </div>
                )}
                {data.stats.comments !== undefined && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
                    <MessageCircle size={16} />
                    <span>{formatNumber(data.stats.comments)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Clean Media Video Preview */}
          {currentItem && (
            <div
              style={{
                position: 'relative',
                backgroundColor: '#000',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px',
                maxHeight: '620px',
              }}
            >
              {currentItem.type === 'video' ? (
                <video
                  src={`/api/proxy-download?url=${encodeURIComponent(currentItem.url)}&inline=true`}
                  poster={currentItem.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '620px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
              ) : (
                <img
                  src={`/api/proxy-download?url=${encodeURIComponent(currentItem.url)}&inline=true`}
                  alt={`Instagram media`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '620px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
              )}
            </div>
          )}

          {/* Caption preview snippet */}
          {data.caption && (
            <p
              style={{
                marginTop: '16px',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                maxHeight: '65px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              {data.caption}
            </p>
          )}

          {/* Download Action Toolbar Below Preview */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => handleDownloadSingle(currentItem)}
              className="btn-gradient"
              style={{ width: '100%', height: '52px', fontSize: '1.05rem', fontWeight: 700 }}
            >
              <Download size={20} />
              <span>
                Download HD {selectedType === 'reel' ? 'Reel' : 'Video'} (MP4)
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 2. AUDIO ONLY MODE */}
      {selectedType === 'audio' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Music size={20} color="#f59e0b" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Extracted Audio Track
            </h3>
          </div>

          <AudioPlayerCard
            audio={
              data.audio || {
                title: `Original Audio (${data.shortcode || 'track'})`,
                artist: `@${data.author?.username || 'instagram_user'}`,
                audioUrl: currentItem?.url || '',
                coverUrl: data.author?.avatarUrl || currentItem?.thumbnailUrl,
                isOriginalAudio: true,
              }
            }
            authorUsername={data.author?.username}
          />

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleDownloadAudio}
              className="btn-gradient"
              style={{ width: '100%', height: '52px', fontSize: '1.05rem', fontWeight: 700 }}
            >
              <Download size={20} />
              <span>Download Audio Track (MP3)</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. PROFILE DP ONLY MODE */}
      {selectedType === 'profile' && (
        <div className="glass-panel" style={{ padding: '28px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <UserCheck size={22} color="#10b981" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Profile HD Avatar
            </h3>
          </div>

          <div
            style={{
              position: 'relative',
              width: '180px',
              height: '180px',
              borderRadius: 'var(--radius-full)',
              padding: '4px',
              background: 'var(--ig-primary-gradient)',
              boxShadow: '0 12px 30px rgba(225, 48, 108, 0.35)',
              margin: '0 auto 20px auto',
            }}
          >
            <img
              src={
                data.profile?.profilePicUrlHd ||
                data.profile?.profilePicUrl ||
                data.author?.avatarUrl ||
                currentItem?.url
              }
              alt={data.author?.username || 'Avatar'}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-full)',
                objectFit: 'cover',
                border: '3px solid var(--bg-card)',
              }}
            />
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
            @{data.author?.username}
          </h3>
          {data.author?.fullName && (
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {data.author.fullName}
            </p>
          )}

          {data.profile?.biography && (
            <p
              style={{
                maxWidth: '520px',
                margin: '0 auto 20px auto',
                fontSize: '0.92rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}
            >
              {data.profile.biography}
            </p>
          )}

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleDownloadProfilePic}
              className="btn-gradient"
              style={{ width: '100%', maxWidth: '380px', height: '52px', fontSize: '1.05rem', fontWeight: 700 }}
            >
              <Download size={20} />
              <span>Download Full HD DP (JPG)</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. PHOTO & CAROUSEL ONLY MODE */}
      {selectedType === 'post' && currentItem && (
        <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
          <div
            style={{
              position: 'relative',
              backgroundColor: '#000',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '380px',
              maxHeight: '620px',
            }}
          >
            <img
              src={`/api/proxy-download?url=${encodeURIComponent(currentItem.url)}&inline=true`}
              alt={`Slide ${currentSlideIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '620px',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
              }}
            />

            {/* Carousel navigation arrows */}
            {isCarousel && (
              <>
                <button
                  onClick={() => setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
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
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
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
                  <ChevronRight size={22} />
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
                  <Layers size={13} />
                  <span>
                    {currentSlideIndex + 1} / {items.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Strip */}
          {isCarousel && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
              {items.map((it, idx) => (
                <div
                  key={it.id || idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  style={{
                    position: 'relative',
                    width: '68px',
                    height: '68px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border:
                      currentSlideIndex === idx
                        ? '2px solid #e1306c'
                        : '1px solid var(--border-subtle)',
                    opacity: currentSlideIndex === idx ? 1 : 0.65,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={it.thumbnailUrl || it.url}
                    alt={`Thumb ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Download buttons below */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleDownloadSingle(currentItem)}
              className="btn-gradient"
              style={{ flex: 1, minWidth: '200px', height: '52px', fontSize: '1.05rem', fontWeight: 700 }}
            >
              <Download size={20} />
              <span>
                Download {isCarousel ? `Slide ${currentSlideIndex + 1} (JPG)` : 'HD Photo (JPG)'}
              </span>
            </button>

            {isCarousel && (
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="btn-secondary"
                style={{
                  height: '52px',
                  borderColor: 'rgba(225, 48, 108, 0.4)',
                  background: 'rgba(225, 48, 108, 0.1)',
                  color: '#ff5f9e',
                  fontWeight: 700,
                }}
              >
                <FileArchive size={18} />
                <span>{isZipping ? 'Creating ZIP...' : `Download All ${items.length} Slides (.ZIP)`}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. CAPTION & BIO ONLY MODE */}
      {(selectedType === 'caption' || selectedType === 'bio') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <FileText size={20} color="#f97316" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Post Caption & Hashtag Analysis
            </h3>
          </div>

          <CaptionBioCard
            text={data.caption || data.profile?.biography || 'No text content found.'}
            hashtags={data.hashtags}
            mentions={data.mentions}
            title={`@${data.author?.username || 'post'} Caption & Tags`}
            username={data.author?.username}
          />

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleCopyCaption}
              className="btn-gradient"
              style={{ width: '100%', height: '52px', fontSize: '1.05rem', fontWeight: 700 }}
            >
              {isCopied ? <Check size={20} /> : <Copy size={20} />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Full Caption & Hashtags'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
