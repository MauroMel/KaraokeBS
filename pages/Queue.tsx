import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { SongRequest, RequestStatus, KaraokeEvent } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { Timer } from 'lucide-react';

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

  // QR: usa l’host corrente (IP/porta) + HashRouter
const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // es: "/KaraokeBS"
const submitUrl = `${window.location.origin}${base}/submit?eventCode=${eventCode}`;

  // minuti medi per brano (se non presenti, fallback)
  const avgWait = (() => {
    const raw = Number((eventData as any)?.songMinutes);
    return !raw || Number.isNaN(raw) || raw <= 0 ? 4.5 : raw;
  })();

  // stima attesa per ogni riga (in minuti)
  const waitForIndex = (idx: number) => {
    const req = requests[idx];
    if (!req) return 0;

    // se è già sul palco, attesa 0
    if (req.status === RequestStatus.SUL_PALCO) return 0;

    // quante persone "valide" ci sono davanti (escludo chi è già sul palco)
    const aheadCount = requests
      .slice(0, idx)
      .filter(r => r.status !== RequestStatus.SUL_PALCO).length;

    // se è il "prossimo", di solito ~avgWait
    if (req.status === RequestStatus.PROSSIMO) return Math.max(1, Math.ceil(avgWait));

    // in attesa: ahead * avgWait
    return Math.max(0, Math.ceil(aheadCount * avgWait));
  };

  if (loading) return (
    <div className="k-bg">
      <div className="k-wrap">
        <div className="k-card k-empty" style={{ marginTop: 90 }}>
          <div className="k-title" style={{ fontSize: 18 }}>Sintonizzazione Canale...</div>
          <div className="k-sub" style={{ marginTop: 10 }}>Sto caricando la scaletta</div>
        </div>
      </div>
    </div>
  );

  if (!eventCode || !eventData) return (
    <div className="k-bg">
      <div className="k-wrap">
        <div className="k-card k-empty" style={{ marginTop: 90 }}>
          <div className="k-title">Serata non trovata</div>
          <div className="k-sub" style={{ marginTop: 10 }}>
            Assicurati che il codice evento sia corretto.
          </div>
          <div style={{ marginTop: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,43,214,.95)', fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              Torna alla home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="k-bg">
      {/* QR fisso in alto a destra */}
      <div className="k-qr-float">
        <div className="k-qrbox">
          <QRCodeSVG value={submitUrl} size={110} />
        </div>
        <div className="k-qrlabel">Prenota qui</div>
      </div>

      <div className="k-wrap">
        {/* Header evento */}
        <div className="k-card k-topbar">
          <div>
            <div className="k-title karaoke-title">{eventData.name}</div>
            <div className="k-sub" style={{ marginTop: 6 }}>
              Codice serata: <span style={{ color: 'rgba(255,255,255,.92)', fontWeight: 900 }}>{eventCode}</span>
            </div>

          </div>
          <div className="k-pill">LIVE UPDATING</div>
        </div>

        {/* Coda */}
        <div className="k-card">
          <div className="k-sectionTitle">
            <div className="k-h2">
              <Timer size={18} />
              <span>Elenco partecipanti</span>
            </div>
            <div className="k-live">Live</div>
          </div>

          <div className="k-tableWrap">
            <table className="k-table">
              <thead>
                <tr>
                  <th className="k-th" style={{ width: 120 }}>Stato</th>
                  <th className="k-th">Nickname</th>
                  <th className="k-th">Canzone</th>
                  <th className="k-th" style={{ width: 110, textAlign: 'center' }}>Attesa</th>
                  <th className="k-th" style={{ width: 110, textAlign: 'center' }}>Tonalità</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => {
                  const dotClass =
                    req.status === RequestStatus.SUL_PALCO ? 'k-dot-now' :
                    req.status === RequestStatus.PROSSIMO ? 'k-dot-next' :
                    'k-dot-wait';

                  const label =
                    req.status === RequestStatus.SUL_PALCO ? 'Sul palco' :
                    req.status === RequestStatus.PROSSIMO ? 'Prossimo' :
                    'In attesa';

                  const waitMin = waitForIndex(idx);

                  return (
                    <tr key={req.id} className="k-row">
                      <td className="k-td">
                        <span className="k-status">
                          <span className={`k-dot ${dotClass}`} />
                          {label}
                        </span>
                      </td>
                      <td className="k-td" style={{ fontWeight: 900 }}>{req.nickname}</td>
                      <td className="p-4">
					<div className="text-xl font-bold text-pink-500 tracking-tight drop-shadow-[0_0_6px_rgba(255,0,150,0.6)]">
						{req.songTitle}
						</div>
						</td>

                      <td className="k-td" style={{ textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '6px 10px',
                          borderRadius: 12,
                          border: '1px solid rgba(255,255,255,.10)',
                          background: 'rgba(255,255,255,.05)',
                          color: 'rgba(255,255,255,.75)',
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                          fontWeight: 900,
                          fontSize: 14
                        }}>
                          ~{waitMin}m
                        </span>
                      </td>

                      <td className="k-td" style={{ textAlign: 'center', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontWeight: 900, color: 'rgba(255,43,214,.95)' }}>
                        {req.keyShift > 0 ? `+${req.keyShift}` : req.keyShift}
                      </td>
                    </tr>
                  );
                })}

                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="k-empty">
                      La scena è vuota… sii il primo a rompere il ghiaccio!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QueuePage;