
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import QueuePage from './pages/Queue';
import SubmitPage from './pages/Submit';
import SentPage from './pages/Sent';
import { Music } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="animate-pulse text-neon-blue">Loading session...</div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

const App: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-black overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="p-4 flex items-center justify-between border-b border-gray-800 bg-black/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Music className="text-pink-500 w-6 h-6 animate-bounce" />
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
            Karaoke<span className="text-pink-500">B</span>&<span className="text-cyan-400">S</span>
          </h1>
        </div>
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest hidden sm:block">
          The ultimate stage experience
        </div>
      </header>

      <main className="flex-grow pb-20 sm:pb-8">
        <Routes>
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/sent" element={<SentPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {/* Footer Branding */}
      <footer className="py-6 px-4 text-center border-t border-gray-900 bg-black">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} KaraokeB&S Production
        </p>
      </footer>
    </div>
  );
};

export default App;
