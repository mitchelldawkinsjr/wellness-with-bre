export interface Exercise {
  id: string;
  name: string;
  timestampSeconds: number;
  durationSeconds?: number;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  exercises: Exercise[];
}

export interface ScheduledWorkout {
  date: string;
  workoutId: string;
}

export interface WorkoutLogEntry {
  exerciseId: string;
  exerciseName: string;
  completedAt: string;
  workoutId: string;
}

export interface WorkoutSessionLog {
  workoutId: string;
  startedAt: string;
  completedExercises: WorkoutLogEntry[];
}

export type YouTubePlayerState = 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued';

export interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
          };
        },
      ) => YouTubePlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
    __WORKOUT_TEST__?: {
      getCurrentExerciseIndex: () => number;
      getPlayerState: () => YouTubePlayerState;
      getCompletedExercises: () => string[];
    };
  }
}

export {};
