import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ClosingInvite({ rsvp, onRsvp }) {
  return (
    <section className="last-invite">
      <span>🦕</span>
      <h2>Hẹn gặp bạn ở bữa tiệc nhé!</h2>
      <p>Một ngày đầy bánh ngọt, tiếng cười và những cái ôm đang chờ.</p>
      <button className="primary" onClick={onRsvp}>
        {rsvp ? 'Xem xác nhận của bạn' : 'Có mình, có niềm vui!'}
        <ArrowUpRight size={18} />
      </button>
    </section>
  );
}
