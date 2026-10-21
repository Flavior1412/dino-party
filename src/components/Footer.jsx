import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <a className="brand" href="#">
        Kavie family party.
      </a>
      <p>
        Một lời mời nhỏ. Một ngày vui thật to. <Heart size={13} />
      </p>
      <a href="#">Lên đầu trang ↑</a>
    </footer>
  );
}
