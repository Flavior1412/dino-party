import React from 'react';
import { ArrowUpRight, PartyPopper } from 'lucide-react';
import HeroArt from './HeroArt';

export default function Hero({ party, rsvp, onRsvp }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span /> MỘT NGÀY ĐẶC BIỆT SẮP ĐẾN
        </div>
        <h1>
          Gừ gừ…
          <br />
          Bé <span>lên 5!</span>
          <svg className="title-star" width="38" height="43" viewBox="0 0 38 43">
            <path d="m19 2 4 13 13 5-13 5-4 15-5-15L2 20l12-5Z" fill="#e8b858" />
          </svg>
        </h1>
        <p className="invite">Mời bạn đến sinh nhật của</p>
        <h2 className="baby-name">{party.name}</h2>
        <p className="hero-desc">
          Cùng bước vào thế giới khủng long, thổi nến,
          <br className="desktop" /> ăn bánh và gom thật nhiều niềm vui nhé!
        </p>
        <div className="hero-foot">
          <span>✦</span> Có bạn, ngày vui của bé trọn vẹn hơn.
        </div>
      </div>
      <HeroArt />
    </section>
  );
}
