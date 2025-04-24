import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BlogsProvider } from './contexts/BlogsContext';
import AppShell from './components/layout/AppShell';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import CreateBlog from './pages/CreateBlog';
import BlogDetail from './pages/BlogDetail';
import EditBlog from './pages/EditBlog';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={<AppShell />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/blogs" element={
                <ProtectedRoute>
                  <BlogList />
                </ProtectedRoute>
              } />
              
              <Route path="/blogs/:id" element={
                <ProtectedRoute>
                  <BlogDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/blogs/:id/edit" element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              } />
              
              <Route path="/create" element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute requiresAdmin={true}>
                  <Analytics />
                </ProtectedRoute>
              } />
            </Route>
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BlogsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;