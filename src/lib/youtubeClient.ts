import type { YouTubePlayer, YouTubePlayerState } from './types';

const YT_STATE_MAP: Record<number, YouTubePlayerState> = {
  [-1]: 'unstarted',
  0: 'ended',
  1: 'playing',
  2: 'paused',
  3: 'buffering',
  5: 'cued',
};

let apiLoadPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (apiLoadPromise) {
    return apiLoadPromise;
  }

  apiLoadPromise = new Promise((resolve) => {
    const existingScript = document.querySelector('script[data-youtube-api]');
    if (existingScript) {
      window.onYouTubeIframeAPIReady = () => resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.dataset.youtubeApi = 'true';
    window.onYouTubeIframeAPIReady = () => resolve();
    document.head.appendChild(script);
  });

  return apiLoadPromise;
}

export class MockYouTubePlayer implements YouTubePlayer {
  private currentTime = 0;
  private state: YouTubePlayerState = 'paused';

  playVideo(): void {
    this.state = 'playing';
  }

  pauseVideo(): void {
    this.state = 'paused';
  }

  seekTo(seconds: number): void {
    this.currentTime = seconds;
    this.state = 'cued';
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  getPlayerState(): number {
    const entries = Object.entries(YT_STATE_MAP);
    const match = entries.find(([, value]) => value === this.state);
    return match ? Number(match[0]) : 2;
  }

  destroy(): void {
    this.state = 'unstarted';
  }
}

export class YouTubeClient {
  private player: YouTubePlayer | null = null;
  private containerId: string;
  private useMock: boolean;

  constructor(containerId: string) {
    this.containerId = containerId;
    this.useMock = !window.location.search.includes('real-youtube=1');
  }

  async createPlayer(
    videoId: string,
    onReady?: (player: YouTubePlayer) => void,
    onStateChange?: (state: YouTubePlayerState) => void,
  ): Promise<YouTubePlayer> {
    if (this.useMock) {
      this.player = new MockYouTubePlayer();
      onReady?.(this.player);
      return this.player;
    }

    await loadYouTubeApi();

    return new Promise((resolve, reject) => {
      if (!window.YT?.Player) {
        reject(new Error('YouTube API failed to load'));
        return;
      }

      this.player = new window.YT.Player(this.containerId, {
        videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            this.player = event.target;
            onReady?.(event.target);
            resolve(event.target);
          },
          onStateChange: (event) => {
            const state = YT_STATE_MAP[event.data] ?? 'unstarted';
            onStateChange?.(state);
          },
        },
      });
    });
  }

  play(): void {
    this.player?.playVideo();
  }

  pause(): void {
    this.player?.pauseVideo();
  }

  seekTo(seconds: number): void {
    this.player?.seekTo(seconds, true);
  }

  getCurrentTime(): number {
    return this.player?.getCurrentTime() ?? 0;
  }

  getPlayerState(): YouTubePlayerState {
    if (!this.player) return 'unstarted';
    const code = this.player.getPlayerState();
    return YT_STATE_MAP[code] ?? 'unstarted';
  }

  togglePlayPause(): YouTubePlayerState {
    const state = this.getPlayerState();
    if (state === 'playing') {
      this.pause();
      return 'paused';
    }
    this.play();
    return 'playing';
  }

  destroy(): void {
    this.player?.destroy();
    this.player = null;
  }
}

export function mapPlayerState(code: number): YouTubePlayerState {
  return YT_STATE_MAP[code] ?? 'unstarted';
}
