import React from 'react';
import { ArrowUpRight, CalendarDays, Clock3, MapPin, Navigation } from 'lucide-react';

export default function PartyDetails({ party, onNotice }) {
  return (
    <section className="details" id="thong-tin">
      <div className="section-intro">
        <span className="eyebrow">LỊCH HẸN CỦA CHÚNG MÌNH</span>
        <h2>
          Một chiếc hẹn thật vui <span>♡</span>
        </h2>
        <p>Ba mẹ ghi lại để không bỏ lỡ bữa tiệc nhé!</p>
      </div>
      <div className="info-grid">
        <article>
          <span className="info-icon peach">
            <CalendarDays />
          </span>
          <div>
            <small>NGÀY ĐẶC BIỆT</small>
            <h3>{party.date}</h3>
            <p>Ngày bé tròn 5 tuổi</p>
          </div>
        </article>
        <article>
          <span className="info-icon yellow">
            <Clock3 />
          </span>
          <div>
            <small>GIỜ KHAI TIỆC</small>
            <h3>{party.time}</h3>
            <p>Đến sớm một chút để cùng chơi nha!</p>
          </div>
        </article>
        <article>
          <span className="info-icon green">
            <MapPin />
          </span>
          <div>
            <small>ĐỊA ĐIỂM</small>
            <h3>{party.place}</h3>
            <p>{party.address}</p>
          </div>
        </article>
      </div>
      <button
        className="map-button"
        onClick={() => {
          if (party.mapQuery)
            window.open(
              'https://www.google.com/maps/search/?api=1&query=' +
                encodeURIComponent(party.mapQuery),
              '_blank',
              'noopener,noreferrer',
            );
          else onNotice('Ba mẹ sẽ cập nhật địa chỉ bữa tiệc sớm nhé!');
        }}
      >
        <Navigation size={16} /> Mở bản đồ đến bữa tiệc <ArrowUpRight size={16} />
      </button>
    </section>
  );
}
