import { Link } from 'react-router-dom';
import { formatTimestamp, getScheduledWorkoutForDate } from '../lib/workoutData';

export function Schedule() {
  const today = new Date();
  const workout = getScheduledWorkoutForDate(today);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
          Wellness with Bre
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-900">Today&apos;s Workout</h1>
        <p className="mt-2 text-stone-600">
          {today.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </header>

      {workout ? (
        <article
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          data-testid="daily-workout-card"
        >
          <h2 className="text-2xl font-semibold text-stone-900">{workout.title}</h2>
          <p className="mt-2 text-stone-600">{workout.description}</p>
          <ul className="mt-4 space-y-1 text-sm text-stone-700">
            {workout.exercises.slice(0, 3).map((exercise) => (
              <li key={exercise.id}>
                {exercise.name} · {formatTimestamp(exercise.timestampSeconds)}
              </li>
            ))}
            {workout.exercises.length > 3 && (
              <li className="text-stone-500">+ {workout.exercises.length - 3} more exercises</li>
            )}
          </ul>
          <Link
            to={`/workout/${workout.id}`}
            data-testid="start-workout-link"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-600 sm:w-auto"
          >
            Start workout companion
          </Link>
        </article>
      ) : (
        <p className="text-center text-stone-600" data-testid="no-workout-message">
          No workout scheduled for today. Rest and recover!
        </p>
      )}
    </div>
  );
}
