import React, { useEffect, useState } from 'react';

export default function Countdown({ dateISO }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const target = Date.parse(dateISO),
    seconds = Number.isFinite(target) ? Math.max(0, Math.floor((target - now) / 1000)) : null;
  const nums =
    seconds === null
      ? ['--', '--', '--', '--']
      : [
          Math.floor(seconds / 86400),
          Math.floor(seconds / 3600) % 24,
          Math.floor(seconds / 60) % 60,
          seconds % 60,
        ];
  return (
    <section className="countdown">
      <svg
        className="count-decor"
        viewBox="0 0 100 100"
        width="100"
        height="100"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M50 10v80M10 50h80M22 22l56 56M22 78l56-56"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <span className="eyebrow">ĐẾM NGƯỢC NIỀM VUI</span>
        <h2>{seconds === 0 ? 'Bữa tiệc đã đến rồi!' : 'Chỉ còn một chút xíu nữa…'}</h2>
        <p>
          {seconds === null
            ? 'Đồng hồ sẽ bắt đầu khi ba mẹ điền ngày sinh nhật.'
            : 'Khủng long nhỏ đang háo hức chờ bạn đó!'}
        </p>
      </div>
      <div className="clock">
        {nums.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="colon">:</span>}
            <div>
              <b>{String(n).padStart(2, '0')}</b>
              <small>{['NGÀY', 'GIỜ', 'PHÚT', 'GIÂY'][i]}</small>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
