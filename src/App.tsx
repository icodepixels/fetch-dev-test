import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LoginPage } from './pages/LoginPage';
import { SearchPage } from './pages/SearchPage';
import { MatchPage } from './pages/MatchPage';
import { useStore } from './store/useStore';

const theme = createTheme({
    palette: {
        primary: {
            main: '#800080',
        },
    },
});

// ProtectedRoute is a wrapper component that handles authentication-based routing
// It prevents unauthorized access to protected pages by redirecting to the home page
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Get the current user from the global store using Zustand
  const user = useStore(state => state.user);

  // If no user is authenticated, redirect to the home page
  if (!user) {
      return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
};

export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/search"
                        element={
                            <ProtectedRoute>
                                <SearchPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/match"
                        element={
                            <ProtectedRoute>
                                <MatchPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;