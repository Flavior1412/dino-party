import React from 'react';

export default function Dino({ color = '#77a76c', className = '' }) {
  return (
    <svg
      className={`scroll-dino ${className}`}
      viewBox="0 0 400 350"
      fill="none"
      role="img"
      aria-label="Khủng long xanh dễ thương đội mũ sinh nhật"
    >
      <path d="M111 255C56 265 40 233 25 212C27 262 59 290 119 284" fill={color} />
      <path d="m147 162-27-14 7 36-29-4 13 32-28 6 23 28" fill="#dfaa58" />
      <path
        d="M110 242C99 195 127 158 174 167L202 113C185 62 213 38 257 41C303 43 322 66 311 94C306 109 286 118 257 116L246 187C277 208 278 251 250 277L249 314C249 329 219 332 214 316L209 289L165 288L157 318C152 331 123 328 125 312L130 278C116 270 111 257 110 242Z"
        fill={color}
      />
      <path
        d="M177 197C208 182 243 203 243 242C243 269 211 285 181 279C153 270 150 214 177 197Z"
        fill="#c9dcb0"
      />
      <path
        d="M234 155C250 160 258 171 259 182"
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
      />
      <circle cx="273" cy="73" r="5" fill="#294e38" />
      <circle cx="298" cy="89" r="8" fill="#e9a38a" />
      <path d="M283 101Q292 108 301 99" stroke="#294e38" strokeWidth="3" strokeLinecap="round" />
      <path d="m221 44 17-44 29 42" fill="#ef9c76" />
      <path d="m231 20 24 10M225 34l36 7" stroke="#fff4cf" strokeWidth="6" />
      <circle cx="238" cy="4" r="7" fill="#e5be65" />
      <ellipse cx="138" cy="219" rx="7" ry="9" fill="#5e915a" />
      <ellipse cx="152" cy="190" rx="5" ry="6" fill="#5e915a" />
      <path d="M133 318h15m73 0h17" stroke="#416e45" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
