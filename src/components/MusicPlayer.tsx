import { useState, useEffect, useRef } from 'react';

const YOUTUBE_ID = 'G6l3a6i5XtI';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if ((window as any).YT) { initPlayer(); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = initPlayer;
    return () => { (window as any).onYouTubeIframeAPIReady = null; };
  }, []);

  function initPlayer() {
    playerRef.current = new (window as any).YT.Player('yt-music-frame', {
      videoId: YOUTUBE_ID,
      playerVars: { autoplay: 0, controls: 0, loop: 0, rel: 0, showinfo: 0, modestbranding: 1 },
      events: {
        onReady: (e: any) => { e.target.setVolume(0.5); setReady(true); },
        onStateChange: (e: any) => {
          // YT.PlayerState.ENDED = 0
          if (e.data === 0) { setPlaying(false); setHasPlayed(true); }
          if (e.data === 1) setPlaying(true);
          if (e.data === 2) setPlaying(false);
        },
      },
    });
  }

  // Try autoplay on scroll back to top after first interaction
  useEffect(() => {
    if (!ready || hasPlayed) return;
    const onScroll = () => {
      if (window.scrollY < 100 && !playing && !hasPlayed) {
        handleToggle();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ready, playing, hasPlayed]);

  function handleToggle() {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      if (hasPlayed) return; // played once, don't replay
      playerRef.current.playVideo();
    }
  }

  return (
    <>
      {/* Hidden YT player */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, width: 1, height: 1, overflow: 'hidden' }}>
        <div id="yt-music-frame" />
      </div>

      {/* Floating button */}
      <button
        onClick={handleToggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        disabled={hasPlayed && !playing}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid rgba(139,115,85,0.4)',
          color: '#8b7355',
          cursor: hasPlayed && !playing ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
          opacity: hasPlayed && !playing ? 0.35 : 1,
        }}
      >
        {playing ? (
          // Pause icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        ) : (
          // Speaker/play icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            {!playing && !hasPlayed && (
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            )}
          </svg>
        )}
      </button>
    </>
  );
}
