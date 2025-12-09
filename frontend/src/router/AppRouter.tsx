// src/router/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import AdminCreateCourse from '../pages/AdminCreateCourse';
import ProtectedRoute from './ProtectedRoute';
import { isAuthenticated } from '../utils/auth';
import LessonView from '../pages/LessonView'; // if you created this

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute>
              <LessonView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute requireAdmin>
              <AdminCreateCourse />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
