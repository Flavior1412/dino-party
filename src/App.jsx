import React, { useCallback, useEffect, useRef, useState } from 'react';
import { party } from './config/party';
import { submitRsvp } from './services/rsvp';
import { getWishes } from './services/wishes';
import useScrollMotion from './hooks/useScrollMotion';
import Header from './components/Header';
import Hero from './components/Hero';
import PartyTicker from './components/PartyTicker';
import PartyDetails from './components/PartyDetails';
import Countdown from './components/Countdown';
import ParentsNotes from './components/ParentsNotes';
import Wishes from './components/Wishes';
import ClosingInvite from './components/ClosingInvite';
import Footer from './components/Footer';
import Toast from './components/Toast';
import RsvpModal from './components/RsvpModal';

export default function App() {
  const mainRef = useRef(null);
  useScrollMotion(mainRef);
  const [modal, setModal] = useState(false);
  const [rsvp, setRsvp] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [loadingWishes, setLoadingWishes] = useState(true);
  const [wishError, setWishError] = useState('');
  const wishLoadVersion = useRef(0);
  const loadWishes = useCallback(async (signal) => {
    const version = ++wishLoadVersion.current;
    setLoadingWishes(true);
    setWishError('');
    try {
      const items = await getWishes({ signal });
      if (!signal?.aborted && version === wishLoadVersion.current) setWishes(items);
    } catch (error) {
      if (!signal?.aborted && version === wishLoadVersion.current) setWishError(error.message);
    } finally {
      if (!signal?.aborted && version === wishLoadVersion.current) setLoadingWishes(false);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    loadWishes(controller.signal);
    return () => controller.abort();
  }, [loadWishes]);
  const [notice, setNotice] = useState('');
  const [sendingWish, setSendingWish] = useState(false);
  const sendingWishRef = useRef(false);
  const wishId = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const registrationId = useRef(null);
  const openRsvp = useCallback(() => setModal(true), []);
  const closeRsvp = useCallback(() => setModal(false), []);
  async function saveWish(e) {
    e.preventDefault();
    if (sendingWishRef.current) return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const message = String(fields.get('wish') || '').trim();
    if (!name || !message) return;
    sendingWishRef.current = true;
    setSendingWish(true);
    try {
      wishId.current ||= `wish-${
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
      }`;
      await submitRsvp({ type: 'wish', id: wishId.current, name, message });
      // Không để phản hồi tải cũ ghi đè lời chúc vừa gửi.
      wishLoadVersion.current += 1;
      setLoadingWishes(false);
      setWishError('');
      setWishes((previous) => [{ name, text: message }, ...previous]);
      form.reset();
      wishId.current = null;
      setNotice('Đã gửi lời chúc đến gia đình bé. Cảm ơn bạn!');
    } catch (error) {
      setNotice(error.message);
    } finally {
      sendingWishRef.current = false;
      setSendingWish(false);
    }
  }
  async function confirm(e) {
    e.preventDefault();
    if (submittingRef.current) return;
    const f = new FormData(e.currentTarget);
    const name = f.get('guest').trim();
    const count = Number(f.get('count'));
    const message = String(f.get('message') || '').trim();
    if (!name || !Number.isInteger(count) || count < 1 || count > 6) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      // randomUUID có thể không tồn tại trên Safari cũ hoặc URL HTTP trong mạng nội bộ.
      registrationId.current ||=
        globalThis.crypto?.randomUUID?.() ||
        `rsvp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
      const data = { type: 'rsvp', id: registrationId.current, name, count, message };
      await submitRsvp(data);
      setRsvp(data);
      setModal(false);
      setNotice('Đã gửi xác nhận tham dự đến gia đình bé. Hẹn gặp bạn nhé!');
    } catch (error) {
      setNotice(error.message);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }
  return (
    <>
      <Header />
      <main ref={mainRef}>
        <Hero party={party} rsvp={rsvp} onRsvp={openRsvp} />
        <PartyTicker />
        <PartyDetails party={party} onNotice={setNotice} />
        <Countdown dateISO={party.dateISO} />
        <ParentsNotes />
        <Wishes
          wishes={wishes}
          onSubmit={saveWish}
          submitting={sendingWish}
          loading={loadingWishes}
          error={wishError}
          onReload={() => loadWishes()}
        />
        <ClosingInvite rsvp={rsvp} onRsvp={openRsvp} />
      </main>
      <Footer />
      {notice && <Toast notice={notice} onClose={() => setNotice('')} />}
      {modal && (
        <RsvpModal rsvp={rsvp} onClose={closeRsvp} onSubmit={confirm} submitting={submitting} />
      )}
    </>
  );
}
