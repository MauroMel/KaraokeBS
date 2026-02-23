import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import QueuePage from './pages/Queue';
import SubmitPage from './pages/Submit';
import SentPage from './pages/Sent';
import { Music } from 'lucide-react';
import { Mic } from "lucide-react";


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
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="animate-pulse text-cyan-300">Loading session...</div>
    </div>
  );

  if (!user) return <Navigate to="/queue" replace />;

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden text-white">
      {/* Background template (viola/rosa) */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(900px_600px_at_18%_10%,rgba(255,43,214,0.22),transparent_55%),radial-gradient(900px_600px_at_82%_26%,rgba(124,58,237,0.22),transparent_55%),radial-gradient(1100px_700px_at_50%_92%,rgba(255,43,214,0.10),transparent_55%),linear-gradient(180deg,#120017,#0a0010)]" />

      {/* Header glass */}
      <header className="p-4 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="relative">
				<Mic className="w-10 h-10 text-pink-500 micPulse" />
			</div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
            Karaoke<span className="text-pink-400">B&S</span>
          </h1>
		  
        </div>
        <div className="text-xs font-mono text-white/50 uppercase tracking-widest hidden sm:block">
          Entra con il QRCode e canta!
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
          <Route path="*" element={<Navigate to="/queue" replace />} />
        </Routes>
      </main>

      {/* Footer trasparente */}
      <footer className="py-6 px-4 text-center border-t border-white/10 bg-transparent">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Produzione dei BodyAndSoul
        </p>
      </footer>
    </div>
  );
};

export default App;
