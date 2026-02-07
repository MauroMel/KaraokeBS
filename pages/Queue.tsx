
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { SongRequest, RequestStatus, KaraokeEvent } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Mic2, Timer, Music2, ExternalLink, ChevronRight } from 'lucide-react';

const QueuePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const eventCode = searchParams.get('eventCode');
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [eventData, setEventData] = useState<KaraokeEvent | null>(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  if (!eventCode) {
    setLoading(false);
    return;
  }

  let unsubscribeRequests: (() => void) | null = null;

  const fetchEvent = async () => {
    try {
      const q = query(
        collection(db, 'events'),
        where('eventCode', '==', eventCode),
        where('isActive', '==', true)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const ev = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as KaraokeEvent;
        setEventData(ev);

        const requestsQuery = query(
          collection(db, `events/${ev.id}/requests`),
          orderBy('createdAt', 'asc')
        );

        unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
          setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SongRequest)));
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  fetchEvent();

  return () => {
    if (unsubscribeRequests) unsubscribeRequests();
  };
}, [eventCode]);



    fetchEvent();
  }, [eventCode]);

const submitUrl = `https://mauromel.github.io/KaraokeBS/#/submit?eventCode=${eventCode}`;


  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] text-neon-blue font-black italic animate-pulse uppercase tracking-[0.3em]">
      Sintonizzazione Canale...
    </div>
  );

  if (!eventCode || !eventData) return (
    <div className="p-8 text-center mt-20">
      <h2 className="text-3xl font-black italic text-pink-500 uppercase mb-4">Serata non trovata</h2>
      <p className="text-gray-400 mb-8 uppercase text-xs tracking-widest">Assicurati che il codice evento sia corretto.</p>
      <Link to="/" className="text-cyan-400 font-bold border-b border-cyan-400 pb-1 uppercase text-sm tracking-widest">Torna alla home</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 pb-32">
      {/* Header Evento */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black italic uppercase tracking-tight text-white mb-2 leading-none">
          {eventData.name}
        </h2>
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm tracking-tighter">
          <span className="text-gray-600 font-sans uppercase font-bold text-[10px] tracking-widest">Codice:</span>
          <span className="bg-cyan-500/10 px-2 py-0.5 rounded neon-border-blue border border-cyan-500/20">{eventCode}</span>
        </div>
      </div>

      {/* QR Section */}
      <div className="bg-neon-gradient border border-gray-800 rounded-[2.5rem] p-6 mb-12 flex flex-col md:flex-row items-center gap-8 neon-border-pink">
        <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-pink-500/20 border-4 border-white">
          <QRCodeSVG value={submitUrl} size={160} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-black italic uppercase text-pink-500 mb-2 leading-tight">Prenota la tua canzone!</h3>
          <p className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">Scansiona il QR code o clicca il bottone per scegliere il tuo brano.</p>
          <Link 
            to={`/submit?eventCode=${eventCode}`}
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-black px-8 py-4 rounded-2xl uppercase tracking-[0.1em] transition-all transform active:scale-95 shadow-xl shadow-pink-900/40 group"
          >
            Vai al form <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-zinc-900/50 rounded-3xl overflow-hidden border border-gray-800 backdrop-blur-md">
        <div className="p-5 border-b border-gray-800 flex items-center gap-3">
          <Timer className="text-cyan-400 w-5 h-5" />
          <h4 className="font-black uppercase tracking-widest italic text-gray-300">Scaletta in corso</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em] bg-black/40">
                <th className="p-4">Stato</th>
                <th className="p-4">Cantante</th>
                <th className="p-4">Brano</th>
                <th className="p-4 text-center">Tonalità</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {requests.map((req, idx) => (
                <tr key={req.id} className={`${idx % 2 === 0 ? 'row-odd' : 'row-even'} transition-colors hover:bg-white/5`}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        req.status === RequestStatus.SUL_PALCO ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)]' :
                        req.status === RequestStatus.PROSSIMO ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]' :
                        'bg-gray-600'
                      }`} />
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${
                        req.status === RequestStatus.SUL_PALCO ? 'text-green-400' :
                        req.status === RequestStatus.PROSSIMO ? 'text-cyan-400' :
                        'text-gray-500'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white uppercase italic tracking-tight">{req.nickname}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-400 font-medium">{req.songTitle}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xs font-mono text-pink-400 bg-pink-500/5 px-2 py-1 rounded border border-pink-500/20">
                      {req.keyShift > 0 ? `+${req.keyShift}` : req.keyShift}
                    </span>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Mic2 className="w-10 h-10 text-gray-800" />
                      <p className="text-gray-700 font-black italic uppercase tracking-widest text-lg">La scena è vuota...</p>
                      <p className="text-gray-800 text-xs font-bold uppercase tracking-tight">Sii il primo a rompere il ghiaccio!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QueuePage;
