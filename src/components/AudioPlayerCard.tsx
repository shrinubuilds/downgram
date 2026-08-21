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
      style={{
        backgroundColor: 'var(--bg-surface)',
        boxShadow: 'var(--neu-raised-sm)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
      }}
    >
      <audio ref={audioRef} src={audioStreamUrl} preload="metadata" />

      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          overflow: 'hidden',
        }}
      >
        {/* Vinyl / Cover Art */}
        <div
          style={{
            position: 'relative',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            overflow: 'hidden',
            background: 'var(--ig-primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--neu-inset-sm)',
            flexShrink: 0,
          }}
        >
          {audio.coverUrl ? (
            <img
              src={`/api/proxy-download?url=${encodeURIComponent(audio.coverUrl)}&inline=true`}
              alt={audio.title || 'Cover'}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Disc3
              size={30}
              color="#ffffff"
              className={isPlaying ? 'animate-spin' : ''}
            />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#f59e0b',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '3px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Music size={12} />
            <span>{audio.isOriginalAudio ? 'Original Audio' : 'Instagram Track'}</span>
          </div>
          <h4
            style={{
              fontSize: '1.02rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              lineHeight: 1.25,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '2px',
            }}
          >
            {audio.title || 'Extracted Audio Track'}
          </h4>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
            }}
          >
            {audio.artist || (authorUsername ? `@${authorUsername}` : 'Instagram Audio')}
          </p>
        </div>
      </div>

      {/* Waveform Visualization & Player Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'var(--bg-surface-inset)',
          boxShadow: 'var(--neu-inset-sm)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          width: '100%',
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #f59e0b, #e1306c)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.4)',
          }}
          title={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
        </button>

        {/* Wave Bars */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            height: '30px',
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
                    backgroundColor: isPast ? '#f59e0b' : 'rgba(148, 163, 184, 0.3)',
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
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontVariantNumeric: 'tabular-nums',
            fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {formatTime(currentTime)}
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
            padding: '4px',
            flexShrink: 0,
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};
