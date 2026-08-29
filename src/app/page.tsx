import ArtifactPanel from "@/components/ArtifactPanel";
import CurrentField from "@/components/CurrentField";
import KanamePanel from "@/components/KanamePanel";
import LogoLockup from "@/components/LogoLockup";
import PaperTexture from "@/components/PaperTexture";
import {
  approvalArtifacts,
  evidenceItems,
  kanamePillars,
  navigation,
  openSourceProjects,
  originSteps,
} from "@/lib/content";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d={diagonal ? "M4 14L14 4M6 4H14V12" : "M3 9H15M11 5L15 9L11 13"} />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span>{children}</span>
      <i aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="site-shell" id="top">
      <PaperTexture />

      <header className="site-header">
        <div className="header-inner">
          <LogoLockup />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="mailto:casey@megure.ai?subject=Hataya%20evaluation">
            Talk to us
            <Arrow />
          </a>
        </div>
      </header>

      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
          <CurrentField />
          <div className="hero-grid content-width">
            <div className="hero-copy" data-no-clip>
              <p className="eyebrow">
                <span>Megure Labs</span>
                <i aria-hidden="true" />
                <span>Hataya + Kaname</span>
              </p>
              <h1 id="hero-title">
                Make science <em>learnable.</em>
                <br />
                Make it <em>production fast.</em>
              </h1>
              <p className="hero-intro">
                We build the execution and orchestration infrastructure that takes AI4Science from research code
                to reproducible native programs, then keeps the agents and machines around them under control.
              </p>
              <p className="hero-promise">
                Train through the science. Run without the framework. Orchestrate every machine. Prove the result.
              </p>
              <div className="button-row">
                <a className="button button-primary" href="mailto:casey@megure.ai?subject=Hataya%20evaluation">
                  Evaluate Hataya
                  <Arrow />
                </a>
                <a className="button button-secondary" href="#kaname">
                  Explore Kaname
                  <Arrow />
                </a>
              </div>
            </div>

            <ArtifactPanel />
          </div>
        </section>

        <section className="proof-strip" aria-label="Selected proof points">
          <div className="proof-grid content-width">
            <div className="proof-item">
              <strong>4×</strong>
              <span>faster on Boltz-2</span>
              <small>vs PyTorch Boltz-2</small>
            </div>
            <div className="proof-item">
              <strong>72%</strong>
              <span>less H100 time</span>
              <small>1.10 s vs 3.92 s</small>
            </div>
            <div className="proof-item proof-item-words">
              <strong>CPU · CUDA · HIP</strong>
              <span>scientific primitives</span>
              <small>built for the gradient path</small>
            </div>
            <div className="proof-item proof-item-words">
              <strong>MODEL + EVIDENCE</strong>
              <span>one sealed artifact</span>
              <small>identity travels with execution</small>
            </div>
          </div>
        </section>

        <section className="origin-section section-pad" id="why" aria-labelledby="origin-title">
          <div className="content-width">
            <div className="section-intro split-intro">
              <div>
                <SectionLabel>01 · Why Megure</SectionLabel>
                <h2 id="origin-title">The runtime came later. The scientific problem came first.</h2>
              </div>
              <p>
                Hataya was extracted from working protein systems because the same problems kept recurring:
                differentiable science, native performance, and proof that deployment had not changed the model.
              </p>
            </div>

            <div className="origin-rail">
              {originSteps.map((step, index) => (
                <article className="origin-card" key={step.number}>
                  <div className="origin-card-head">
                    <span>{step.number}</span>
                    <i aria-hidden="true" />
                    <small>{step.label}</small>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  {index < originSteps.length - 1 && (
                    <span className="rail-arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hataya-section section-pad" id="hataya" aria-labelledby="hataya-title">
          <div className="content-width">
            <div className="hataya-grid">
              <div className="hataya-copy">
                <div className="product-heading-row">
                  <SectionLabel>02 · Hataya</SectionLabel>
                  <span className="availability-chip">Private evaluation</span>
                </div>
                <h2 id="hataya-title">Research models become trusted native programs.</h2>
                <p className="large-body">
                  Hataya is the native execution and verification layer for AI4Science. It owns the reusable work
                  between a research model and a production program.
                </p>
                <ul className="benefit-list">
                  <li>
                    <span>01</span>
                    <div>
                      <strong>Native performance</strong>
                      <p>Model forwards, operators, memory planning, and CPU or GPU execution without a Python runtime.</p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <strong>Exact model identity</strong>
                      <p>Source, graph, weight bytes, reference observations, and target plan are bound together.</p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <strong>Independent correctness</strong>
                      <p>Expected values come from separate producers. Every declared behavior must be tested.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="benchmark-card" data-no-clip>
                <div className="benchmark-head">
                  <span>Boltz-2 · NVIDIA H100</span>
                  <span>Mean of 3 runs</span>
                </div>
                <div className="benchmark-hero">
                  <strong>4×</strong>
                  <div>
                    <span>faster than</span>
                    <span>PyTorch Boltz-2</span>
                  </div>
                </div>
                <div className="bar-chart" role="img" aria-label="Hataya latency 1.10 seconds. PyTorch Boltz-2 latency 3.92 seconds.">
                  <div className="bar-row">
                    <div className="bar-label">
                      <span>Hataya</span>
                      <strong>1.10 s</strong>
                    </div>
                    <div className="bar-track">
                      <i className="bar bar-hataya" />
                    </div>
                  </div>
                  <div className="bar-row">
                    <div className="bar-label">
                      <span>PyTorch Boltz-2</span>
                      <strong>3.92 s</strong>
                    </div>
                    <div className="bar-track">
                      <i className="bar bar-pytorch" />
                    </div>
                  </div>
                </div>
                <div className="benchmark-foot">
                  <strong>72% less H100 time</strong>
                  <a href="https://github.com/megure-labs/hikoboshi" target="_blank" rel="noreferrer">
                    Inspect the lineage
                    <Arrow diagonal />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="evidence-section section-pad" id="provenance" aria-labelledby="evidence-title">
          <div className="content-width">
            <div className="section-intro evidence-intro">
              <SectionLabel>03 · Model identity</SectionLabel>
              <h2 id="evidence-title">The executable carries the identity of the model it came from.</h2>
              <p>
                Speed is only useful when the native program is still the same model. Hataya binds the inputs to
                compilation, the observations used to prove parity, and the plan used to run the result.
              </p>
            </div>

            <div className="identity-flow" aria-label="Model identity flow">
              <div className="identity-inputs">
                {evidenceItems.map((item) => (
                  <div className="identity-input" key={item.label}>
                    <span>{item.label}</span>
                    <small>{item.value}</small>
                  </div>
                ))}
              </div>
              <div className="flow-arrow" aria-hidden="true">
                <span />
                <Arrow />
              </div>
              <div className="sealed-program">
                <img src="/assets/hataya-artifact-seal.svg" alt="" />
                <div>
                  <small>canonical image</small>
                  <strong>.hya</strong>
                  <span>identity bound</span>
                </div>
              </div>
              <div className="flow-arrow" aria-hidden="true">
                <span />
                <Arrow />
              </div>
              <div className="target-programs">
                <div>
                  <span>CPU</span>
                  <small>native program</small>
                </div>
                <div>
                  <span>GPU</span>
                  <small>native program</small>
                </div>
              </div>
            </div>

            <div className="approval-grid">
              <div className="approval-heading">
                <span>Every model ships with the proof needed to approve it.</span>
              </div>
              <div className="approval-items">
                {approvalArtifacts.map(([name, meaning]) => (
                  <div key={name}>
                    <strong>{name}</strong>
                    <span>{meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="kaname-section section-pad" id="kaname" aria-labelledby="kaname-title">
          <div className="content-width kaname-grid">
            <div className="kaname-copy">
              <div className="kaname-product-head">
                <img src="/assets/kaname-icon.svg" alt="Kaname" />
                <div>
                  <SectionLabel>04 · Kaname</SectionLabel>
                  <span className="kaname-status-chip">Private preview</span>
                </div>
              </div>
              <h2 id="kaname-title">Objectives become controlled work across machines.</h2>
              <p className="large-body">
                Kaname is the agent orchestrator and operator control plane. It coordinates agents, attempts,
                compute, credentials, and human decisions as one durable system.
              </p>
              <ul className="kaname-benefit-list">
                {kanamePillars.map((pillar) => (
                  <li key={pillar.number}>
                    <span>{pillar.number}</span>
                    <div>
                      <strong>{pillar.title}</strong>
                      <p>{pillar.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a className="kaname-link" href="mailto:casey@megure.ai?subject=Kaname%20private%20preview">
                Talk about Kaname
                <Arrow />
              </a>
            </div>

            <KanamePanel />
          </div>
        </section>

        <section className="projects-section section-pad" id="open-source" aria-labelledby="projects-title">
          <div className="content-width">
            <div className="section-intro split-intro project-intro">
              <div>
                <SectionLabel>05 · Open source foundations</SectionLabel>
                <h2 id="projects-title">The systems that forced Hataya into existence are open.</h2>
              </div>
              <p>
                Orihime made alignment differentiable. Hikoboshi made learned protein alignment native and fast. Their
                repositories expose the engineering lineage behind Hataya.
              </p>
            </div>

            <div className="project-grid">
              {openSourceProjects.map((project, index) => (
                <article className={`project-card project-card-${index + 1}`} key={project.name}>
                  <div className="project-topline">
                    <span>{project.eyebrow}</span>
                    <small>{project.status}</small>
                  </div>
                  <div className="project-number">0{index + 1}</div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {project.linkLabel}
                    <Arrow diagonal={project.href.startsWith("http")} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="evaluation-section section-pad" id="contact" aria-labelledby="evaluation-title">
          <div className="evaluation-current" aria-hidden="true" data-visual-ignore>
            <span />
            <span />
          </div>
          <div className="content-width evaluation-grid">
            <div>
              <SectionLabel>06 · Work with Megure</SectionLabel>
              <h2 id="evaluation-title">Bring us the difficult production path.</h2>
            </div>
            <div className="evaluation-copy">
              <p>
                For Hataya, start with one representative model and measure identity, parity, deployment, and cost.
                For Kaname, start with one objective and map its work, authority, execution, and human intervention.
              </p>
              <p className="evaluation-outcome">The result is a real system running on a real production path.</p>
              <div className="button-row">
                <a className="button button-light" href="mailto:casey@megure.ai?subject=Hataya%20evaluation">
                  Evaluate Hataya
                  <Arrow />
                </a>
                <a className="button button-outline-light" href="mailto:casey@megure.ai?subject=Kaname%20private%20preview">
                  Explore Kaname
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-width footer-grid">
          <div className="footer-brand">
            <LogoLockup />
            <p>Execution and orchestration systems for AI4Science.</p>
          </div>
          <div className="footer-links">
            <a href="https://orikata.ai" target="_blank" rel="noreferrer">
              Orikata Bio by Megure Labs
              <Arrow diagonal />
            </a>
            <a href="https://github.com/megure-labs" target="_blank" rel="noreferrer">
              GitHub
              <Arrow diagonal />
            </a>
            <a href="mailto:casey@megure.ai">Contact</a>
          </div>
          <p className="footer-legal">© 2026 Megure Labs</p>
        </div>
      </footer>
    </div>
  );
}
