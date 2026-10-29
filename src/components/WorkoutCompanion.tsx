import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp, getWorkoutById } from '../lib/workoutData';
import type { YouTubePlayerState } from '../lib/types';
import {
  getCompletedExerciseIds,
  isExerciseCompleted,
  logCompletedExercise,
} from '../lib/workoutLogger';
import { YouTubeClient } from '../lib/youtubeClient';

interface WorkoutCompanionProps {
  workoutId: string;
}

export function WorkoutCompanion({ workoutId }: WorkoutCompanionProps) {
  const workout = getWorkoutById(workoutId);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [playerState, setPlayerState] = useState<YouTubePlayerState>('paused');
  const [completedIds, setCompletedIds] = useState<string[]>(() => getCompletedExerciseIds(workoutId));
  const [client] = useState(() => new YouTubeClient('youtube-player'));

  const currentExercise = workout?.exercises[currentExerciseIndex];
  const nextExercise = workout?.exercises[currentExerciseIndex + 1];

  const refreshCompleted = useCallback(() => {
    setCompletedIds(getCompletedExerciseIds(workoutId));
  }, [workoutId]);

  useEffect(() => {
    if (!workout) return;

    let mounted = true;

    void client.createPlayer(
      workout.youtubeVideoId,
      () => {
        if (!mounted) return;
        setPlayerState(client.getPlayerState());
      },
      (state) => {
        if (!mounted) return;
        setPlayerState(state);
      },
    );

    return () => {
      mounted = false;
      client.destroy();
    };
  }, [client, workout]);

  useEffect(() => {
    if (!workout) return;

    window.__WORKOUT_TEST__ = {
      getCurrentExerciseIndex: () => currentExerciseIndex,
      getPlayerState: () => playerState,
      getCompletedExercises: () => completedIds,
    };

    return () => {
      delete window.__WORKOUT_TEST__;
    };
  }, [completedIds, currentExerciseIndex, playerState, workout]);

  const handleSkipNext = useCallback(() => {
    if (!workout || !nextExercise) return;
    const nextIndex = currentExerciseIndex + 1;
    client.seekTo(nextExercise.timestampSeconds);
    setCurrentExerciseIndex(nextIndex);
    setPlayerState('cued');
  }, [client, currentExerciseIndex, nextExercise, workout]);

  const handleJumpToExercise = useCallback(
    (index: number) => {
      if (!workout) return;
      const exercise = workout.exercises[index];
      client.seekTo(exercise.timestampSeconds);
      setCurrentExerciseIndex(index);
      setPlayerState('cued');
    },
    [client, workout],
  );

  const handleTogglePlayPause = useCallback(() => {
    const nextState = client.togglePlayPause();
    setPlayerState(nextState);
  }, [client]);

  const handleMarkComplete = useCallback(() => {
    if (!workout || !currentExercise) return;
    logCompletedExercise(workout.id, currentExercise.id, currentExercise.name);
    refreshCompleted();
  }, [currentExercise, refreshCompleted, workout]);

  const progressLabel = useMemo(() => {
    if (!workout) return '';
    const completedCount = workout.exercises.filter((exercise) =>
      isExerciseCompleted(workoutId, exercise.id),
    ).length;
    return `${completedCount} of ${workout.exercises.length} exercises logged`;
  }, [completedIds, workout, workoutId]);

  if (!workout) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-stone-600">Workout not found.</p>
        <Link to="/" className="mt-4 inline-block text-teal-700 underline">
          Back to schedule
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/" className="text-sm text-teal-700 hover:underline">
            ← Today&apos;s schedule
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">{workout.title}</h1>
          <p className="mt-1 text-stone-600">{workout.description}</p>
        </div>
        <p className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
          {progressLabel}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-2xl bg-black shadow-lg">
          <div id="youtube-player" className="aspect-video w-full" data-testid="youtube-player" />
          <div className="flex flex-wrap items-center gap-3 bg-stone-900 px-4 py-3">
            <button
              type="button"
              onClick={handleTogglePlayPause}
              data-testid="play-pause-button"
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500"
            >
              {playerState === 'playing' ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              onClick={handleSkipNext}
              disabled={!nextExercise}
              data-testid="skip-next-button"
              className="rounded-lg bg-stone-700 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Skip to next
            </button>
            <span className="text-sm text-stone-300" data-testid="player-state">
              {playerState === 'playing' ? 'Playing' : 'Paused'}
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <div
            className="rounded-2xl border border-teal-200 bg-teal-50 p-5 shadow-sm"
            data-testid="current-exercise"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Current exercise
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              {currentExercise?.name ?? '—'}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Starts at {formatTimestamp(currentExercise?.timestampSeconds ?? 0)}
            </p>
            <button
              type="button"
              onClick={handleMarkComplete}
              disabled={!currentExercise || completedIds.includes(currentExercise.id)}
              data-testid="log-exercise-button"
              className="mt-4 w-full rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              {currentExercise && completedIds.includes(currentExercise.id)
                ? 'Logged ✓'
                : 'Log exercise complete'}
            </button>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">Exercise list</h3>
            <ul className="mt-3 space-y-2" data-testid="exercise-list">
              {workout.exercises.map((exercise, index) => {
                const isActive = index === currentExerciseIndex;
                const isDone = completedIds.includes(exercise.id);
                return (
                  <li key={exercise.id}>
                    <button
                      type="button"
                      onClick={() => handleJumpToExercise(index)}
                      data-testid={`exercise-item-${exercise.id}`}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                        isActive
                          ? 'bg-teal-100 font-semibold text-teal-900'
                          : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span>
                        {isDone ? '✓ ' : ''}
                        {exercise.name}
                      </span>
                      <span className="text-xs text-stone-500">
                        {formatTimestamp(exercise.timestampSeconds)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
