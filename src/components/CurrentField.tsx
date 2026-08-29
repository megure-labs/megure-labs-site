export default function CurrentField() {
  return (
    <svg
      className="current-field"
      viewBox="0 0 820 760"
      fill="none"
      aria-hidden="true"
      data-visual-ignore
    >
      <defs>
        <linearGradient id="current-main" x1="84" y1="112" x2="741" y2="662" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4DD8FF" />
          <stop offset="0.48" stopColor="#1E58AE" />
          <stop offset="1" stopColor="#9B5FC2" />
        </linearGradient>
        <linearGradient id="current-faint" x1="120" y1="500" x2="720" y2="182" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E58AE" stopOpacity="0" />
          <stop offset="0.5" stopColor="#4DD8FF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9B5FC2" stopOpacity="0" />
        </linearGradient>
        <filter id="current-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <ellipse cx="460" cy="390" rx="278" ry="248" fill="#DCEEFF" opacity="0.33" filter="url(#current-glow)" />
      <path
        className="current-line current-line-a"
        d="M42 535C171 705 351 672 462 511C584 334 650 143 793 123"
        stroke="url(#current-main)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        className="current-line current-line-b"
        d="M26 616C196 493 292 528 402 588C544 665 678 565 802 403"
        stroke="url(#current-faint)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="current-line current-line-c"
        d="M88 209C216 106 365 120 475 226C591 338 680 351 785 276"
        stroke="url(#current-faint)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <g className="current-particle current-particle-a">
        <rect x="148" y="600" width="38" height="8" rx="4" fill="#2F74D0" transform="rotate(-24 148 600)" />
        <circle cx="197" cy="578" r="5" fill="#4DD8FF" />
      </g>
      <g className="current-particle current-particle-b">
        <rect x="674" y="174" width="42" height="9" rx="4.5" fill="#9B5FC2" transform="rotate(-21 674 174)" />
        <circle cx="654" cy="185" r="6" fill="#1E58AE" />
      </g>
      <g className="current-particle current-particle-c">
        <rect x="668" y="533" width="28" height="7" rx="3.5" fill="#4DD8FF" transform="rotate(-35 668 533)" />
      </g>
    </svg>
  );
}
