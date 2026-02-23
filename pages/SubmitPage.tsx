import React, { useState, useEffect, useMemo } from 'react';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  where,
  getDocs,
  writeBatch,
  limit,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { KaraokeEvent, SongRequest, RequestStatus } from '../types';
import {
  Plus,
  Calendar,
  Trash2,
  Play,
  ArrowRight,
  Users,
  LogOut,
  X,
  Settings,
  Music,
  Lock,
  Unlock,
} from 'lucide-react';
import { signOut } from 'firebase/auth';

type NewAdminRequest = {
  nickname: string;
  songTitle: string;
  keyShift: number;
};

const AdminPage: React.FC = () => {
  const [events, setEvents] = useState<KaraokeEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [requests, setRequests] = useState<SongRequest[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', songMinutes: 4.5 });
  const [selectedRequests, setSelectedRequests] = useState<Set<string>>(new Set());

  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [adminReq, setAdminReq] = useState<NewAdminRequest>({
    nickname: 'REGIA',
    songTitle: '',
    keyShift: 0,
  });

  // Fetch Events
  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const evs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as KaraokeEvent));
      setEvents(evs);
      if (evs.length > 0 && !selectedEventId) setSelectedEventId(evs[0].id);
    });
    return unsubscribe;
  }, [selectedEventId]);

  // Fetch Requests for selected event
  useEffect(() => {
    if (!selectedEventId) return;
    const q = query(collection(db, `events/${selectedEventId}/requests`), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SongRequest)));
    });
    return unsubscribe;
  }, [selectedEventId]);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      const docRef = await addDoc(collection(db, 'events'), {
        ...newEvent,
        eventCode,
        isActive: true,
        acceptingRequests: true, // ✅ nuovo flag
        createdAt: serverTimestamp(),
      });

      setShowCreateModal(false);
      setNewEvent({ name: '', songMinutes: 4.5 });
      setSelectedEventId(docRef.id);
    } catch (err: any) {
      console.error('ERROR creating event:', err);
      alert(`Errore creazione serata: ${err?.message || err}`);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: RequestStatus) => {
    if (!selectedEventId) return;

    const batch = writeBatch(db);

    if (newStatus === RequestStatus.SUL_PALCO) {
      const current = requests.find((r) => r.status === RequestStatus.SUL_PALCO);
      if (current && current.id !== requestId) {
        batch.update(doc(db, `events/${selectedEventId}/requests`, current.id), {
          status: RequestStatus.IN_ATTESA,
        });
      }
    }

    if (newStatus === RequestStatus.PROSSIMO) {
      const current = requests.find((r) => r.status === RequestStatus.PROSSIMO);
      if (current && current.id !== requestId) {
        batch.update(doc(db, `events/${selectedEventId}/requests`, current.id), {
          status: RequestStatus.IN_ATTESA,
        });
      }
    }

    batch.update(doc(db, `events/${selectedEventId}/requests`, requestId), { status: newStatus });
    await batch.commit();
  };

  const deleteRequest = async (requestId: string) => {
    if (!selectedEventId) return;
    if (confirm('Sei sicuro di voler eliminare questa richiesta?')) {
      await deleteDoc(doc(db, `events/${selectedEventId}/requests`, requestId));
    }
  };

  const bulkDelete = async () => {
    if (!selectedEventId || selectedRequests.size === 0) return;
    if (confirm(`Vuoi eliminare ${selectedRequests.size} richieste selezionate?`)) {
      const batch = writeBatch(db);
      selectedRequests.forEach((id) => batch.delete(doc(db, `events/${selectedEventId}/requests`, id)));
      await batch.commit();
      setSelectedRequests(new Set());
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedRequests);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRequests(next);
  };

  const handleLogout = () => signOut(auth);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  // ✅ Prenotazioni attive: nel tuo modello non c’è uno status “chiusa”, quindi le consideriamo tutte
  const activeRequestsCount = useMemo(() => requests.length, [requests]);

  // ✅ Flag accettazione prenotazioni (default true se campo mancante)
  const isAcceptingRequests = useMemo(() => {
    const raw = (selectedEvent as any)?.acceptingRequests;
    return raw === false ? false : true;
  }, [selectedEvent]);

  const toggleAccepting = async () => {
    if (!selectedEventId) return;
    try {
      await updateDoc(doc(db, 'events', selectedEventId), { acceptingRequests: !isAcceptingRequests });
    } catch (e: any) {
      console.error(e);
      alert(`Errore aggiornamento flag prenotazioni: ${e?.message || e}`);
    }
  };

  // ✅ Cancella serata + tutte le richieste (subcollection)
  const deleteEventCompletely = async (eventId: string, eventName: string) => {
    const ok = confirm(
      `⚠️ Cancellazione definitiva\n\nVuoi eliminare la serata "${eventName}" e TUTTE le prenotazioni associate?\n\nQuesta azione non è reversibile.`
    );
    if (!ok) return;

    try {
      // Cancella richieste a batch (in chunk da 400)
      while (true) {
        const q = query(collection(db, `events/${eventId}/requests`), orderBy('createdAt', 'asc'), limit(400));
        const snap = await getDocs(q);
        if (snap.empty) break;

        const batch = writeBatch(db);
        snap.docs.forEach((d) => batch.delete(d.ref));
        await batch.commit();
      }

      // Cancella evento
      await deleteDoc(doc(db, 'events', eventId));

      // UI: se stavi guardando quell’evento, sposta selezione
      if (selectedEventId === eventId) {
        setSelectedEventId(null);
        setRequests([]);
        setSelectedRequests(new Set());
      }
    } catch (e: any) {
      console.error(e);
      alert(`Errore eliminazione serata: ${e?.message || e}`);
    }
  };

  // ✅ Inserisci nuova canzone (request) come admin
  const addAdminSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) return;

    const songTitle = adminReq.songTitle.trim();
    const nickname = adminReq.nickname.trim() || 'REGIA';
    const keyShift = Number(adminReq.keyShift) || 0;

    if (!songTitle) {
      alert('Inserisci il titolo della canzone.');
      return;
    }

    try {
      await addDoc(collection(db, `events/${selectedEventId}/requests`), {
        nickname,
        songTitle,
        keyShift,
        status: RequestStatus.IN_ATTESA,
        createdAt: serverTimestamp(),
        createdBy: 'admin',
      });

      setShowAddSongModal(false);
      setAdminReq({ nickname: 'REGIA', songTitle: '', keyShift: 0 });
    } catch (e: any) {
      console.error(e);
      alert(`Errore inserimento canzone: ${e?.message || e}`);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-black italic text-neon-pink uppercase">Pannello Regia</h2>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Gestione Serata & Cantanti</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-1 sm:flex-none bg-pink-600 hover:bg-pink-500 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-pink-900/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Nuova Serata
          </button>
          <button
            onClick={handleLogout}
            className="p-3 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Event History */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-xs mb-2">
            <Calendar className="w-3 h-3" /> Storico Serate
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2">
            {events.map((ev) => (
              <div key={ev.id} className="relative">
                <button
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`w-full text-left p-4 pr-12 rounded-2xl border transition-all ${
                    selectedEventId === ev.id
                      ? 'bg-neon-gradient border-pink-500/50 neon-border-pink shadow-xl'
                      : 'bg-zinc-900/50 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="font-bold truncate">{ev.name}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                      {ev.createdAt?.toDate?.().toLocaleDateString?.() ?? ''}
                    </span>

                    <span className="px-2 py-0.5 bg-gray-800 rounded text-[10px] text-pink-400 font-mono">
                      #{(ev as any).eventCode}
                    </span>
                  </div>
                </button>

                {/* ✅ Cestino per cancellare serata */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEventCompletely(ev.id, ev.name);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl text-red-400 hover:text-white hover:bg-red-600/20 border border-transparent hover:border-red-500/30 transition-colors"
                  title="Elimina serata"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main - Request Management */}
        <div className="lg:col-span-3">
          {selectedEvent ? (
            <div className="bg-zinc-900/30 border border-gray-800 rounded-3xl overflow-hidden backdrop-blur-sm">
              <div className="p-6 border-b border-gray-800 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-pink-500/10 rounded-2xl">
                      <Users className="text-pink-500 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-mono">
                        CODE: <span className="text-pink-400 font-bold">{(selectedEvent as any).eventCode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 justify-end">
                    {/* ✅ Tot prenotazioni */}
                    <div className="px-4 py-2 rounded-xl border border-gray-800 bg-black/30 text-xs font-black uppercase tracking-widest text-gray-300">
                      Prenotazioni: <span className="text-pink-400">{activeRequestsCount}</span>
                    </div>

                    {/* ✅ Toggle accetta prenotazioni */}
                    <button
                      onClick={toggleAccepting}
                      className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
                        isAcceptingRequests
                          ? 'border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20'
                          : 'border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20'
                      }`}
                      title="Accetta / blocca nuove prenotazioni"
                    >
                      {isAcceptingRequests ? (
                        <>
                          <Unlock className="w-4 h-4" /> Prenotazioni ON
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" /> Prenotazioni OFF
                        </>
                      )}
                    </button>

                    {/* ✅ Inserisci canzone */}
                    <button
                      onClick={() => setShowAddSongModal(true)}
                      className="px-4 py-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                      title="Inserisci una nuova canzone come regia"
                    >
                      <Music className="w-4 h-4" /> Inserisci canzone
                    </button>

                    {selectedRequests.size > 0 && (
                      <button
                        onClick={bulkDelete}
                        className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-xl transition-all border border-red-500/30 text-xs font-black uppercase tracking-widest"
                      >
                        <Trash2 className="w-4 h-4" /> Elimina ({selectedRequests.size})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-800">
                      <th className="p-4 w-12 text-center">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) setSelectedRequests(new Set(requests.map((r) => r.id)));
                            else setSelectedRequests(new Set());
                          }}
                          className="w-4 h-4 rounded border-gray-700 bg-black accent-pink-500"
                        />
                      </th>
                      <th className="p-4">Cantante</th>
                      <th className="p-4">Canzone</th>
                      <th className="p-4">Stato</th>
                      <th className="p-4 text-right">Azioni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {requests.map((req, idx) => (
                      <tr key={req.id} className={idx % 2 === 0 ? 'row-odd' : 'row-even'}>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedRequests.has(req.id)}
                            onChange={() => toggleSelect(req.id)}
                            className="w-4 h-4 rounded border-gray-700 bg-black accent-pink-500"
                          />
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-100">{req.nickname}</div>
                          <div className="text-[10px] text-pink-400 font-mono">
                            Tonalità: {req.keyShift > 0 ? `+${req.keyShift}` : req.keyShift}
                          </div>
                        </td>
                        <td className="p-4 text-gray-300 font-medium">{req.songTitle}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                              req.status === RequestStatus.SUL_PALCO
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                : req.status === RequestStatus.PROSSIMO
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                                : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {req.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {req.status === RequestStatus.IN_ATTESA && (
                              <button
                                onClick={() => updateRequestStatus(req.id, RequestStatus.PROSSIMO)}
                                className="p-2 hover:bg-cyan-500/10 text-cyan-400 rounded-lg transition-colors"
                                title="Metti come PROSSIMO"
                              >
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                            {req.status === RequestStatus.PROSSIMO && (
                              <button
                                onClick={() => updateRequestStatus(req.id, RequestStatus.SUL_PALCO)}
                                className="p-2 hover:bg-green-500/10 text-green-400 rounded-lg transition-colors"
                                title="Porta sul PALCO"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            )}
                            {req.status === RequestStatus.SUL_PALCO && (
                              <button
                                onClick={() => updateRequestStatus(req.id, RequestStatus.IN_ATTESA)}
                                className="p-2 hover:bg-yellow-500/10 text-yellow-400 rounded-lg transition-colors"
                                title="Torna in ATTESA"
                              >
                                <Settings className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteRequest(req.id)}
                              className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors ml-2"
                              title="Elimina"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {requests.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-12 text-center text-gray-600 font-bold uppercase tracking-[0.2em] italic"
                        >
                          Nessuna richiesta ancora
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-800 rounded-3xl">
              <Calendar className="w-12 h-12 text-gray-700 mb-4" />
              <p className="text-gray-600 uppercase font-black italic tracking-wider">Seleziona o crea una serata</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8 border border-pink-500/50 shadow-2xl shadow-pink-500/10 animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black italic uppercase text-pink-500 mb-6 tracking-tight">Crea Nuova Serata</h3>
            <form onSubmit={handleCreateEvent} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Nome Serata
                </label>
                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="Es: Karaoke Night al Bar"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-pink-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Minuti per canzone
                </label>
                <input
                  required
                  type="number"
                  step="0.1"
                  value={newEvent.songMinutes}
                  onChange={(e) => setNewEvent({ ...newEvent, songMinutes: parseFloat(e.target.value) })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-pink-500 outline-none transition-colors"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 text-gray-400 font-bold uppercase text-sm"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl uppercase tracking-widest"
                >
                  Conferma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Song Modal */}
      {showAddSongModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8 border border-cyan-500/50 shadow-2xl shadow-cyan-500/10 animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black italic uppercase text-cyan-300 mb-6 tracking-tight">
              Inserisci nuova canzone
            </h3>

            <form onSubmit={addAdminSong} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Nickname (facoltativo)
                </label>
                <input
                  type="text"
                  value={adminReq.nickname}
                  onChange={(e) => setAdminReq({ ...adminReq, nickname: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Titolo canzone
                </label>
                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="Es: Ti Sento"
                  value={adminReq.songTitle}
                  onChange={(e) => setAdminReq({ ...adminReq, songTitle: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">
                  Tonalità (keyShift)
                </label>
                <input
                  required
                  type="number"
                  step="1"
                  value={adminReq.keyShift}
                  onChange={(e) => setAdminReq({ ...adminReq, keyShift: parseInt(e.target.value || '0', 10) })}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-cyan-400 outline-none transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSongModal(false)}
                  className="flex-1 px-4 py-3 text-gray-400 font-bold uppercase text-sm"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl uppercase tracking-widest"
                >
                  Inserisci
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
