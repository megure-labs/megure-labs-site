export default function ArtifactPanel() {
  return (
    <div className="artifact-stage" data-no-clip>
      <div className="artifact-halo" aria-hidden="true" />
      <div className="artifact-card">
        <div className="artifact-card-head">
          <span>Hataya</span>
          <span className="artifact-status">
            <i aria-hidden="true" /> identity bound
          </span>
        </div>

        <div className="artifact-visual">
          <span className="artifact-note artifact-note-source">source + graph</span>
          <span className="artifact-note artifact-note-weights">exact weights</span>
          <span className="artifact-note artifact-note-parity">parity evidence</span>
          <img
            src="/assets/hataya-artifact-seal.svg"
            alt="A sealed Hataya model artifact with an orbital verification ring"
          />
        </div>

        <div className="artifact-card-foot">
          <span>canonical model image</span>
          <span>CPU · GPU</span>
        </div>
      </div>
    </div>
  );
}
