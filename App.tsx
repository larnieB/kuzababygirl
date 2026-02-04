
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Dashboard from './views/Dashboard';
import AboutPage from './views/AboutPage';
import ChallengesPage from './views/ChallengesPage';
import EducationPage from './views/EducationPage';
import Mastery18Page from './views/Mastery18Page';
import InspirationDetailPage from './views/InspirationDetailPage';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Simple mock login
  const login = (userData: Partial<User>) => {
    setUser({
      id: '1',
      name: userData.name || 'Empowered Woman',
      email: userData.email || 'user@example.com',
      phone: '0712345678',
      balance: 100,
      isLoggedIn: true,
    });
  };

  const logout = () => setUser(null);

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <LandingPage onLogin={login} />} 
        />
        <Route 
          path="/about" 
          element={<AboutPage user={user} onLogout={logout} onLogin={login} />} 
        />
        <Route 
          path="/challenges" 
          element={<ChallengesPage user={user} onLogout={logout} onLogin={login} />} 
        />
        <Route 
          path="/education" 
          element={<EducationPage user={user} onLogout={logout} onLogin={login} />} 
        />
        <Route 
          path="/inspiration/:id" 
          element={<InspirationDetailPage user={user} onLogout={logout} onLogin={login} />} 
        />
        <Route 
          path="/mastery-18" 
          element={user ? (
            <Mastery18Page user={user} onLogout={logout} />
          ) : (
            <Navigate to="/" />
          )} 
        />
        <Route 
          path="/dashboard/*" 
          element={user ? (
            <Dashboard user={user} logout={logout} updateBalance={updateBalance} />
          ) : (
            <Navigate to="/" />
          )} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
