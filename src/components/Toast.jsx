import React from 'react';
import { X } from 'lucide-react';

export default function Toast({ notice, onClose }) {
  return (
    <div className="toast" role="status">
      {notice}
      <button onClick={onClose} aria-label="Đóng thông báo">
        <X size={18} />
      </button>
    </div>
  );
}
