import React from 'react';
import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header>
      <a className="brand" href="#">
        <span className="brand-icon">✿</span> dino party<span className="brand-dot">.</span>
      </a>
      <a className="header-link" href="#loi-chuc">
        Gửi chút yêu thương <Heart size={15} />
      </a>
    </header>
  );
}
