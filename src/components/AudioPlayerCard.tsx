'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Music,
  Volume2,
  VolumeX,
  Disc3,
} from 'lucide-react';
import { AudioInfo } from '@/types/instagram';

interface AudioPlayerCardProps {
  audio: AudioInfo;
  authorUsername?: string;
}

export const AudioPlayerCard: React.FC<AudioPlayerCardProps> = ({
  audio,
  authorUsername,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(audio.duration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioStreamUrl = `/api/proxy-download?url=${encodeURIComponent(audio.audioUrl)}&inline=true&audio=true`;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const handleTimeUpdate = () => setCurrentTime(el.currentTime);
    const handleLoadedMetadata = () => {
      if (el.duration && !isNaN(el.duration)) {
        setDuration(el.duration);
      }
    };
    const handleEnded = () => setIsPlaying(false);

    el.addEventListener('timeupdate', handleTimeUpdate);
    el.addEventListener('loadedmetadata', handleLoadedMetadata);
    el.addEventListener('ended', handleEnded);

    return () => {
      el.removeEventListener('timeupdate', handleTimeUpdate);
      el.removeEventListener('loadedmetadata', handleLoadedMetadata);
      el.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback failed:', err);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        border: '1px solid rgba(245, 158, 11, 0.3)',
      }}
    >
      <audio ref={audioRef} src={audioStreamUrl} preload="metadata" />

      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Vinyl / Cover Art */}
        <div
          style={{
            position: 'relative',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'var(--ig-primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
            flexShrink: 0,
          }}
        >
          {audio.coverUrl ? (
            <img
              src={`/api/proxy-download?url=${encodeURIComponent(audio.coverUrl)}&inline=true`}
              alt={audio.title || 'Cover'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Disc3
              size={34}
              color="#ffffff"
              className={isPlaying ? 'animate-spin' : ''}
            />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}
          >
            <Music size={13} />
            {audio.isOriginalAudio ? 'Original Reel Soundtrack' : 'Instagram Audio'}
          </div>
          <h4
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.2,
              marginBottom: '4px',
            }}
          >
            {audio.title || 'Extracted Audio Track'}
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {audio.artist || (authorUsername ? `@${authorUsername}` : 'Instagram Audio')}
          </p>
        </div>
      </div>

      {/* Waveform Visualization & Player Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          backgroundColor: 'var(--bg-secondary)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #f59e0b, #e1306c)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 2px 12px rgba(245, 158, 11, 0.4)',
          }}
          title={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Wave Bars */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            height: '36px',
            overflow: 'hidden',
          }}
        >
          {(audio.waveform || [25, 45, 75, 90, 60, 40, 70, 85, 100, 80, 55, 30, 45, 65, 85, 70, 50, 35, 60, 80, 65, 45, 30, 20]).map(
            (barHeight, idx) => {
              const progress = duration > 0 ? currentTime / duration : 0;
              const isPast = idx / 24 <= progress;
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: `${barHeight}%`,
                    backgroundColor: isPast ? '#f59e0b' : 'rgba(255, 255, 255, 0.18)',
                    borderRadius: '2px',
                    transition: 'all 0.15s ease',
                  }}
                />
              );
            }
          )}
        </div>

        {/* Time Progress */}
        <span
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontVariantNumeric: 'tabular-nums',
            minWidth: '70px',
            textAlign: 'right',
          }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
};
