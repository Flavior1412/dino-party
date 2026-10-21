import React from 'react';
import { Heart, Send } from 'lucide-react';

export default function Wishes({ wishes, onSubmit, submitting, loading, error, onReload }) {
  return (
    <section className="wishes" id="loi-chuc">
      <div className="section-intro">
        <span className="eyebrow">NHỮNG ĐIỀU NHỎ XÍU, YÊU THƯƠNG THẬT NHIỀU</span>
        <h2>
          Một lời chúc cho bé <span>✦</span>
        </h2>
        <p>Để lại một chút yêu thương trong khu vườn sinh nhật nhé.</p>
      </div>
      <div className="wish-layout">
        <form className="wish-form" onSubmit={onSubmit} aria-busy={submitting}>
          <label htmlFor="name">Tên của bạn</label>
          <input
            disabled={submitting}
            id="name"
            name="name"
            required
            maxLength="60"
            placeholder="Bé muốn biết ai gửi lời chúc nè…"
          />
          <label htmlFor="wish">Lời chúc nhỏ xinh</label>
          <textarea
            disabled={submitting}
            id="wish"
            name="wish"
            required
            maxLength="300"
            rows="3"
            placeholder="Chúc nhà thám hiểm nhí tuổi mới…"
          />
          <button className="primary" type="submit" disabled={submitting}>
            {submitting ? 'Đang gửi…' : 'Gửi yêu thương'} <Send size={17} />
          </button>
        </form>
        <div
          className="wish-board"
          aria-busy={loading}
          role="region"
          aria-label="Danh sách lời chúc"
          tabIndex={0}
        >
          {loading && <p role="status">Đang tải lời chúc…</p>}
          {error && (
            <div role="status">
              <p>{error}</p>
              <button type="button" className="map-button" onClick={onReload}>
                Thử tải lại
              </button>
            </div>
          )}
          {wishes.length ? (
            wishes.map((w, i) => (
              <article className="wish-note" key={i}>
                <p className="wish-content">
                  <Heart size={18} aria-hidden="true" /> <span>{w.text}</span>{' '}
                  <span className="wish-author">— {w.name}</span>
                </p>
              </article>
            ))
          ) : !loading && !error ? (
            <article className="wish-note empty-note">
              <span className="note-spark">✷</span>
              <h3>Một chiếc ôm bằng lời</h3>
              <p>
                Những lời chúc đầu tiên đang chờ
                <br />
                được viết nên từ bạn!
              </p>
              <span>Vì mỗi lời chúc là một món quà ♡</span>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
