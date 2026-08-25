import type { ScheduledWorkout, Workout } from './types';

export const workouts: Workout[] = [
  {
    id: 'full-body-flow',
    title: 'Full Body Flow',
    description: 'A balanced 30-minute full-body workout with warm-up and cool-down.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    exercises: [
      { id: 'warm-up', name: 'Warm Up', timestampSeconds: 0, durationSeconds: 180 },
      { id: 'squats', name: 'Bodyweight Squats', timestampSeconds: 180, durationSeconds: 120 },
      { id: 'lunges', name: 'Alternating Lunges', timestampSeconds: 300, durationSeconds: 120 },
      { id: 'push-ups', name: 'Push Ups', timestampSeconds: 420, durationSeconds: 120 },
      { id: 'plank', name: 'Plank Hold', timestampSeconds: 540, durationSeconds: 60 },
      { id: 'cool-down', name: 'Cool Down', timestampSeconds: 600, durationSeconds: 120 },
    ],
  },
  {
    id: 'core-blast',
    title: 'Core Blast',
    description: 'Focused core strengthening session.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    exercises: [
      { id: 'core-warm-up', name: 'Core Warm Up', timestampSeconds: 0, durationSeconds: 120 },
      { id: 'crunches', name: 'Crunches', timestampSeconds: 120, durationSeconds: 90 },
      { id: 'bicycle', name: 'Bicycle Crunches', timestampSeconds: 210, durationSeconds: 90 },
      { id: 'leg-raises', name: 'Leg Raises', timestampSeconds: 300, durationSeconds: 90 },
      { id: 'core-cool-down', name: 'Stretch', timestampSeconds: 390, durationSeconds: 60 },
    ],
  },
  {
    id: 'upper-body-strength',
    title: 'Upper Body Strength',
    description: 'Build upper body endurance with bodyweight movements.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    exercises: [
      { id: 'shoulder-warm-up', name: 'Shoulder Warm Up', timestampSeconds: 0, durationSeconds: 120 },
      { id: 'arm-circles', name: 'Arm Circles', timestampSeconds: 120, durationSeconds: 60 },
      { id: 'tricep-dips', name: 'Tricep Dips', timestampSeconds: 180, durationSeconds: 120 },
      { id: 'shoulder-taps', name: 'Shoulder Taps', timestampSeconds: 300, durationSeconds: 120 },
      { id: 'upper-cool-down', name: 'Upper Body Stretch', timestampSeconds: 420, durationSeconds: 90 },
    ],
  },
];

const schedule: ScheduledWorkout[] = [
  { date: '2026-08-25', workoutId: 'full-body-flow' },
  { date: '2026-08-26', workoutId: 'core-blast' },
  { date: '2026-08-27', workoutId: 'upper-body-strength' },
  { date: '2026-08-28', workoutId: 'full-body-flow' },
  { date: '2026-08-29', workoutId: 'core-blast' },
  { date: '2026-08-30', workoutId: 'upper-body-strength' },
  { date: '2026-08-31', workoutId: 'full-body-flow' },
];

export function getWorkoutById(id: string): Workout | undefined {
  return workouts.find((workout) => workout.id === id);
}

export function getScheduledWorkoutForDate(date: Date = new Date()): Workout | undefined {
  const dateKey = date.toISOString().slice(0, 10);
  const entry = schedule.find((item) => item.date === dateKey);
  if (!entry) {
    return workouts[0];
  }
  return getWorkoutById(entry.workoutId);
}

export function formatTimestamp(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
