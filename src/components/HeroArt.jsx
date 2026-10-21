import React from 'react';
import Dino from './Dino';

export default function HeroArt() {
  return (
    <div className="art">
      <svg viewBox="0 0 600 480" className="scenery" aria-hidden="true">
        <circle cx="313" cy="229" r="181" fill="#e6ebcd" />
        <path d="M83 385Q200 336 333 373Q440 340 539 393" fill="#dce5c7" />
        <ellipse cx="304" cy="399" rx="220" ry="20" fill="#dce5c7" />
        <g stroke="#77916a" strokeWidth="3">
          <path d="M91 362q-13-61-45-91m42 76q29-50 49-53" />
          <path d="M508 373q12-70 40-114m-40 91q-36-34-50-33" />
        </g>
        <g fill="#7f9c71">
          <ellipse cx="55" cy="292" rx="12" ry="28" transform="rotate(-40 55 292)" />
          <ellipse cx="115" cy="317" rx="12" ry="28" transform="rotate(42 115 317)" />
          <ellipse cx="537" cy="289" rx="12" ry="28" transform="rotate(27 537 289)" />
          <ellipse cx="480" cy="331" rx="12" ry="26" transform="rotate(-55 480 331)" />
        </g>
        <g className="float">
          <path d="M466 160q-18 80-3 120" stroke="#9c9d7e" strokeWidth="2" />
          <ellipse cx="471" cy="123" rx="32" ry="43" fill="#edac85" />
          <path d="m465 163 8 0-5-9" fill="#edac85" />
          <path d="M458 102q-7 8-7 17" stroke="#f9d9bd" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g fill="#e3b958">
          <path d="m135 123 4-12 5 12 12 4-12 5-5 12-4-12-12-5Z" />
          <path d="m425 57 4-10 4 10 10 4-10 4-4 10-4-10-10-4Z" />
        </g>
        <g stroke="#d79777" strokeWidth="4" strokeLinecap="round">
          <path d="m172 70 5 10m247 234 7-6m-308-94-10 4" />
        </g>
        <g transform="translate(357 335)">
          <path d="M0 26q-5-28 22-29q28 0 26 29Z" fill="#d9a3af" />
          <path d="m5 5-5-17m18 10 3-20m12 22 9-12" stroke="#fff3dd" strokeWidth="3" />
          <path d="M0 26h49l-6 34H7Z" fill="#e3bb67" />
          <path d="m13 31 3 23m11-23v23m11-23-3 23" stroke="#f9df9d" strokeWidth="3" />
          <path d="M23-21v-9" stroke="#7c9472" strokeWidth="4" />
          <path d="M23-31q-9-12 0-17q8 9 0 17" fill="#e9a16f" />
        </g>
      </svg>
      <Dino className="hero-dino" />
      <div className="art-note">
        Một bữa tiệc thật <span>“khủng”!</span>
        <svg width="51" height="34" viewBox="0 0 51 34">
          <path
            d="M3 3q37 0 34 25m-8-6 8 8 10-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <span className="age-stamp">
        BÉ LÊN
        <br />
        <b>5</b>
        <br />
        TUỔI RỒI!
      </span>
    </div>
  );
}
