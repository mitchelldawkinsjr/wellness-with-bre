import type { WorkoutLogEntry, WorkoutSessionLog } from './types';

const STORAGE_KEY = 'wellness-with-bre-workout-log';

function readLogs(): WorkoutSessionLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as WorkoutSessionLog[];
  } catch {
    return [];
  }
}

function writeLogs(logs: WorkoutSessionLog[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getSessionLog(workoutId: string): WorkoutSessionLog {
  const existing = readLogs().find((log) => log.workoutId === workoutId);
  if (existing) return existing;

  return {
    workoutId,
    startedAt: new Date().toISOString(),
    completedExercises: [],
  };
}

export function logCompletedExercise(
  workoutId: string,
  exerciseId: string,
  exerciseName: string,
): WorkoutSessionLog {
  const logs = readLogs();
  let session = logs.find((log) => log.workoutId === workoutId);

  if (!session) {
    session = {
      workoutId,
      startedAt: new Date().toISOString(),
      completedExercises: [],
    };
    logs.push(session);
  }

  const alreadyLogged = session.completedExercises.some((entry) => entry.exerciseId === exerciseId);
  if (!alreadyLogged) {
    const entry: WorkoutLogEntry = {
      exerciseId,
      exerciseName,
      completedAt: new Date().toISOString(),
      workoutId,
    };
    session.completedExercises.push(entry);
  }

  writeLogs(logs);
  return session;
}

export function isExerciseCompleted(workoutId: string, exerciseId: string): boolean {
  const session = readLogs().find((log) => log.workoutId === workoutId);
  if (!session) return false;
  return session.completedExercises.some((entry) => entry.exerciseId === exerciseId);
}

export function clearWorkoutLog(workoutId: string): void {
  const logs = readLogs().filter((log) => log.workoutId !== workoutId);
  writeLogs(logs);
}

export function getCompletedExerciseIds(workoutId: string): string[] {
  const session = readLogs().find((log) => log.workoutId === workoutId);
  return session?.completedExercises.map((entry) => entry.exerciseId) ?? [];
}
