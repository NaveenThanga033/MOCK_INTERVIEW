import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from './components/ui/sonner';

// Import pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import StartInterview from './pages/StartInterview';
import Feedback from './pages/Feedback';
import Questions from './pages/Questions';
import Upgrade from './pages/Upgrade';
import HowItWorks from './pages/HowItWorks';
import DashboardLayout from './components/DashboardLayout';

function ProtectedLayout() {
  return (
    <SignedIn>
      <DashboardLayout>
        <Outlet /> {/* All child routes render here, below the menu */}
      </DashboardLayout>
    </SignedIn>
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />

        {/* Protected layout for all signed-in pages */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/interview/:interviewId" element={<Interview />} />
          <Route path="/dashboard/interview/:interviewId/start" element={<StartInterview />} />
          <Route path="/dashboard/interview/:interviewId/feedback" element={<Feedback />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>

        {/* Redirect unauthenticated users */}
        <Route
          path="*"
          element={
            <SignedOut>
              <Navigate to="/sign-in" replace />
            </SignedOut>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
