const attempts = [
  { x: 112, label: "ATTEMPT 01", state: "RUNNING" },
  { x: 280, label: "ATTEMPT 02", state: "APPROVED" },
  { x: 448, label: "ATTEMPT 03", state: "QUEUED" },
] as const;

export default function KanamePanel() {
  return (
    <div className="kaname-panel" data-no-clip>
      <div className="kaname-panel-head">
        <span>Kaname / orchestration map</span>
        <span className="kaname-panel-status">
          <i aria-hidden="true" /> authority bounded
        </span>
      </div>

      <div
        className="kaname-topology"
        role="img"
        aria-label="One objective passes through an authority decision and becomes three independently identified attempts running across a compute fleet."
      >
        <svg viewBox="0 0 560 390" aria-hidden="true">
          <defs>
            <linearGradient id="kanameRail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#85d2cf" />
              <stop offset="1" stopColor="#5fb3b3" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id="kanamePivotGlow">
              <stop offset="0" stopColor="#f3b348" stopOpacity="0.34" />
              <stop offset="1" stopColor="#f3b348" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle className="kaname-pivot-glow" cx="280" cy="132" r="67" fill="url(#kanamePivotGlow)" />
          <path className="kaname-rail kaname-rail-trunk" d="M280 70V115" />
          <path className="kaname-rail kaname-rail-left" d="M280 149C280 196 112 185 112 232" />
          <path className="kaname-rail kaname-rail-center" d="M280 149V232" />
          <path className="kaname-rail kaname-rail-right" d="M280 149C280 196 448 185 448 232" />
          <path className="kaname-rail kaname-node-rail" d="M112 283V329M280 283V329M448 283V329" />

          <rect className="kaname-objective" x="195" y="24" width="170" height="48" rx="24" />
          <text className="kaname-objective-text" x="280" y="53" textAnchor="middle">
            OBJECTIVE
          </text>

          <circle className="kaname-pivot-ring" cx="280" cy="132" r="27" />
          <circle className="kaname-pivot" cx="280" cy="132" r="10" />
          <text className="kaname-authority-label" x="280" y="181" textAnchor="middle">
            AUTHORITY PIVOT
          </text>

          {attempts.map((attempt) => (
            <g key={attempt.label}>
              <rect className="kaname-attempt" x={attempt.x - 68} y="232" width="136" height="52" rx="12" />
              <circle className="kaname-attempt-dot" cx={attempt.x - 48} cy="250" r="4" />
              <text className="kaname-attempt-label" x={attempt.x - 37} y="253">
                {attempt.label}
              </text>
              <text className="kaname-attempt-state" x={attempt.x} y="273" textAnchor="middle">
                {attempt.state}
              </text>
              <rect className="kaname-node" x={attempt.x - 51} y="329" width="102" height="36" rx="18" />
              <text className="kaname-node-label" x={attempt.x} y="352" textAnchor="middle">
                COMPUTE
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="kaname-panel-foot">
        <span>durable identity</span>
        <span>scoped authority</span>
        <span>human control</span>
      </div>
    </div>
  );
}
