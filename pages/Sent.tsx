
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';

import { db } from '../firebase';
import { CheckCircle2, Timer, List, Music, ArrowRight } from 'lucide-react';

const SentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const eventCode = searchParams.get('eventCode');
  const nickname = searchParams.get('nickname');
  const songTitle = searchParams.get('songTitle');
  const requestId = searchParams.get('requestId');
  
  const [position, setPosition] = useState<number | null>(null);
  const [avgWait, setAvgWait] = useState<number>(4.5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fix: Removed erroneous 'calculatePosition' function which had a typo 'evq' instead of 'eq' on line 26.
    // Refined simpler fetching for GH Pages constraints
    const fetchData = async () => {
  if (!eventCode) { setLoading(false); return; }

  try {
    // Trova la serata giusta per eventCode
const evQuery = query(
  collection(db, 'events'),
  where('eventCode', '==', eventCode),
  where('isActive', '==', true)
);
    const evs = await getDocs(evQuery);
	
    const eventDoc = evs.docs[0];

    if (!eventDoc) {
      setPosition(null);
      return;
    }

const minutesRaw = Number(eventDoc.data().songMinutes);
setAvgWait(!minutesRaw || isNaN(minutesRaw) || minutesRaw <= 0 ? 4.5 : minutesRaw);

    // Calcola posizione nella coda
    if (!requestId) {
      setPosition(null);
      return;
    }

    const reqQuery = query(
      collection(db, `events/${eventDoc.id}/requests`),
      orderBy('createdAt', 'asc')
    );
    const reqs = await getDocs(reqQuery);
	
let index = requestId ? reqs.docs.findIndex(d => d.id === requestId) : -1;

// Fallback: se requestId non c'è o non è stato trovato
if (index === -1 && nickname && songTitle) {
  const matches: number[] = [];
  reqs.docs.forEach((d, i) => {
    const data = d.data() as any;
    if (data.nickname === nickname && data.songTitle === songTitle) matches.push(i);
  });
  if (matches.length) index = matches[matches.length - 1]; // ultima richiesta uguale
}

setPosition(index !== -1 ? index + 1 : null);

  } catch (err) {
    console.error("Error calculating position:", err);
    setPosition(null);
  } finally {
    setLoading(false);
  }
};


    fetchData();
  }, [eventCode, requestId]);

 const estimatedTime =
  position && position > 1 ? Math.ceil((position - 1) * avgWait) : 0;

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 text-center pt-12">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-4 border-green-500/20 shadow-2xl shadow-green-500/30">
          <CheckCircle2 className="w-12 h-12 text-green-400 animate-bounce" />
        </div>
      </div>

      <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-4">Prenotata!</h2>
      <p className="text-gray-400 uppercase font-bold text-xs tracking-[0.2em] mb-10">La tua richiesta è in scaletta.</p>

      <div className="bg-neon-gradient border border-gray-800 rounded-[2.5rem] p-8 mb-8 text-left space-y-6">
        <div>
          <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest block mb-1">Cantante</label>
          <div className="text-xl font-bold text-white italic">{nickname}</div>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest block mb-1">Canzone</label>
          <div className="text-lg font-bold text-pink-400 italic">{songTitle}</div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-2xl">
              <List className="text-cyan-400 w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase text-gray-600 tracking-widest">Posizione</div>
              <div className="text-2xl font-black italic text-cyan-400">
                {loading ? '...' : position ? `#${position}` : '?'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-[10px] font-black uppercase text-gray-600 tracking-widest">Attesa Stimata</div>
              <div className="text-2xl font-black italic text-pink-500">
                {loading ? '...' : `~${Math.round(estimatedTime)} min`}
              </div>
            </div>
            <div className="p-3 bg-pink-500/10 rounded-2xl">
              <Timer className="text-pink-500 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Link 
          to={`/queue?eventCode=${eventCode}`}
          className="w-full bg-zinc-900 border border-gray-800 text-white font-black uppercase italic tracking-widest py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
        >
          Vedi Coda <List className="w-4 h-4" />
        </Link>
        <Link 
          to={`/submit?eventCode=${eventCode}`}
          className="w-full bg-pink-600 text-white font-black uppercase italic tracking-widest py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-pink-500 transition-all active:scale-95 shadow-xl shadow-pink-900/30"
        >
          Un'altra canzone <Music className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default SentPage;
