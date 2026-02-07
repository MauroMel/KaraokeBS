
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError('Credenziali non valide. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 mt-12">
      <div className="w-full max-w-md bg-neon-gradient p-8 rounded-3xl border border-gray-800 neon-border-blue">
        <h2 className="text-3xl font-black text-center mb-8 uppercase italic tracking-tight neon-text-blue">
          Admin Portal
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="admin@karaokebes.it"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm font-bold text-center">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? 'Entrata...' : (
              <>
                Accedi <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
