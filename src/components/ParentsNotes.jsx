import React from 'react';
import { Check, Heart } from 'lucide-react';
import Dino from './Dino';

export default function ParentsNotes() {
  return (
    <section className="parents">
      <div className="parents-art">
        <span className="tiny-label">GÓC NHẮN NHỦ</span>
        <Dino color="#d6a06a" />
        <span className="little-heart">♡</span>
      </div>
      <div className="parents-copy">
        <span className="eyebrow">GỬI BA MẸ MỘT CHÚT</span>
        <h2>
          Mang theo nụ cười,
          <br />
          còn lại để chúng mình lo!
        </h2>
        <p>
          Một vài điều nhỏ để các nhà thám hiểm nhí
          <br className="desktop" /> có buổi vui chơi thật thoải mái.
        </p>
        <ul>
          <li>
            <Check />
            Bé mặc đồ thoải mái, dễ vận động nhé.
          </li>
          <li>
            <Check />
            Ba mẹ vui lòng ở lại cùng bé trong bữa tiệc.
          </li>
          <li>
            <Check />
            Nếu bé dị ứng thực phẩm, hãy báo gia đình trước nhé.
          </li>
        </ul>
        <div className="parent-note">
          <Heart size={17} /> Sự có mặt của bạn là món quà đáng yêu nhất!
        </div>
      </div>
    </section>
  );
}
