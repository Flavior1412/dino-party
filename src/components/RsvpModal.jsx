import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function RsvpModal({ rsvp, onClose, onSubmit, submitting }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="close" aria-label="Đóng" onClick={() => onClose()}>
          <X />
        </button>
        <span className="modal-emoji">🦕</span>
        <h2 id="modal-title">Hẹn với khủng long nhỏ!</h2>
        {rsvp && (
          <p className="confirmed">
            <Check size={18} /> Đã lưu hẹn của {rsvp.name} · {rsvp.count} người
          </p>
        )}
        <form onSubmit={onSubmit} aria-busy={submitting}>
          <label htmlFor="guest">Tên ba mẹ / người tham dự</label>
          <input
            disabled={submitting}
            autoFocus
            id="guest"
            name="guest"
            required
            maxLength="60"
            defaultValue={rsvp?.name}
            placeholder="Nhập tên của bạn"
          />
          <label htmlFor="count">Số người tham dự (bao gồm bé)</label>
          <select disabled={submitting} id="count" name="count" defaultValue={rsvp?.count || '2'}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} người
              </option>
            ))}
          </select>
          <label htmlFor="rsvp-message">Lời nhắn cho gia đình (không bắt buộc)</label>
          <textarea
            id="rsvp-message"
            name="message"
            disabled={submitting}
            maxLength={300}
            rows={3}
            defaultValue={rsvp?.message || ''}
            placeholder="Gửi gia đình một lời nhắn nhé…"
          />
          <p className="local-note">
            Tên, số người tham dự và lời nhắn sẽ được gửi đến danh sách đăng ký của gia đình bé.
          </p>
          <button className="primary" type="submit" disabled={submitting}>
            <Check size={18} />
            {submitting ? 'Đang gửi…' : rsvp ? 'Cập nhật xác nhận' : 'Xác nhận tham dự'}
          </button>
        </form>
      </section>
    </div>
  );
}
