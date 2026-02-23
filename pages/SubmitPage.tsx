import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { KaraokeEvent, RequestStatus } from '../types';
import { Music, User, CheckCircle, ChevronLeft, Lock } from 'lucide-react';

const SubmitPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventCode = searchParams.get('eventCode');

  const [eventData, setEventData] = useState<KaraokeEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const [nickname, setNickname] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [keyShift, setKeyShift] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!eventCode) {
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const q = query(
          collection(db, 'events'),
          where('eventCode', '==', eventCode),
          where('isActive', '==', true)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setEventData({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as KaraokeEvent);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventCode]);

  // ✅ default: se il campo non esiste, consideriamo prenotazioni APERTE
  const acceptingRequests = useMemo(() => {
    const raw = (eventData as any)?.acceptingRequests;
    return raw === false ? false : true;
  }, [eventData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData || submitting) return;

    // ✅ blocco hard anche lato submit
    if (!acceptingRequests) {
      alert('Prenotazioni chiuse: chiedi alla regia di riaprirle.');
      return;
    }

    const nick = nickname.trim();
    const title = songTitle.trim();
    if (!nick || !title) return;

    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, `events/${eventData.id}/requests`), {
        nickname: nick,
        songTitle: title,
        keyShift,
        status: RequestStatus.IN_ATTESA,
        createdAt: serverTimestamp(),
      });

      navigate(
        `/sent?eventCode=${eventCode}&nickname=${encodeURIComponent(nick)}&songTitle=${encodeURIComponent(
          title
        )}&requestId=${docRef.id}`
      );
    } catch (err) {
      console.error(err);
      alert("Errore nell'invio della prenotazione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neon-pink font-black italic animate-pulse">
        CARICAMENTO PALCO...
      </div>
    );

  if (!eventCode || !eventData)
    return (
      <div className="p-8 text-center mt-20">
        <h2 className="text-3xl font-black text-pink-500 uppercase italic">Codice Invalido</h2>
        <p className="text-gray-400 mt-2 uppercase tracking-widest text-xs">
          Richiedi all'admin il codice corretto della serata.
        </p>
      </div>
    );

  const formDisabled = submitting || !acceptingRequests;

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 pb-20">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Indietro
        </button>
        <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter leading-none mb-2">
          Prenota la tua canzone
        </h2>
        <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Serata: {eventData.name}</p>

        {/* ✅ banner prenotazioni chiuse */}
        {!acceptingRequests && (
          <div className="mt-5 p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-200">
            <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
              <Lock className="w-4 h-4" />
              Prenotazioni chiuse
            </div>
            <div className="text-[11px] text-red-200/80 mt-2">
              La regia ha momentaneamente bloccato le nuove richieste. Riprova tra poco.
            </div>
          </div>
        )}
      </div>

      <div className="bg-neon-gradient border border-gray-800 rounded-[2.5rem] p-8 shadow-2xl neon-border-blue">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-3 tracking-[0.2em] ml-1">
              Il tuo Nome d'arte
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-cyan-400 transition-colors" />
              <input
                required
                type="text"
                disabled={formDisabled}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Es: Star Lord"
                className="w-full bg-black border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-gray-800 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-3 tracking-[0.2em] ml-1">
              Titolo Canzone
            </label>
            <div className="relative group">
              <Music className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-pink-400 transition-colors" />
              <input
                required
                type="text"
                disabled={formDisabled}
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Es: Bohemian Rhapsody"
                className="w-full bg-black border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-gray-800 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3 ml-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Tonalità (Key Shift)</label>
              <span className="text-pink-400 font-mono font-bold px-2 py-0.5 bg-pink-500/10 rounded border border-pink-500/20">
                {keyShift > 0 ? `+${keyShift}` : keyShift}
              </span>
            </div>
            <div className="px-2">
              <input
                type="range"
                min="-3"
                max="3"
                disabled={formDisabled}
                value={keyShift}
                onChange={(e) => setKeyShift(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-500 disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono uppercase font-black">
                <span>-3 semitoni</span>
                <span>Originale</span>
                <span>+3 semitoni</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={formDisabled}
            className={`w-full bg-pink-600 hover:bg-pink-500 text-white font-black uppercase italic tracking-[0.15em] py-5 rounded-3xl transition-all shadow-xl shadow-pink-900/40 transform active:scale-95 flex items-center justify-center gap-2 ${
              formDisabled ? 'opacity-50 cursor-not-allowed hover:bg-pink-600' : ''
            }`}
          >
            {submitting ? (
              'Invio in corso...'
            ) : !acceptingRequests ? (
              'Prenotazioni chiuse'
            ) : (
              <>
                Invia la canzone <CheckCircle className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
          Assicurati che il titolo sia corretto per permettere alla regia di trovare la base velocemente!
        </p>
      </div>
    </div>
  );
};

export default SubmitPage;
