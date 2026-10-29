import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Schedule } from './components/Schedule';
import { WorkoutCompanion } from './components/WorkoutCompanion';

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/workout/:workoutId" element={<WorkoutRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function WorkoutRoute() {
  const { workoutId = '' } = useParams();
  return <WorkoutCompanion workoutId={workoutId} />;
}
