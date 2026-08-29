export const navigation = [
  { label: "Why Megure", href: "#why" },
  { label: "Hataya", href: "#hataya" },
  { label: "Kaname", href: "#kaname" },
  { label: "Open source", href: "#open-source" },
] as const;

export const originSteps = [
  {
    number: "01",
    label: "Learn",
    title: "Put the science in the gradient path.",
    body: "Training protein encoders for alignment required differentiable dynamic programming that PyTorch did not provide in the form we needed. We built the missing CPU, CUDA, and HIP extensions.",
  },
  {
    number: "02",
    label: "Run",
    title: "Compete with native scientific software.",
    body: "Serving had to avoid framework dependency hell and meet the latency expectations of bioinformatics workflows. We vendored model forwards in C++ and made the full path native.",
  },
  {
    number: "03",
    label: "Prove",
    title: "Preserve the exact model through deployment.",
    body: "Supporting more architectures and larger GPU models exposed the reusable layer: operator semantics, weights, planning, providers, packaging, and independent parity evidence.",
  },
] as const;

export const evidenceItems = [
  {
    label: "Source",
    value: "The code revision the program came from",
  },
  {
    label: "Graph",
    value: "The exact computation that was compiled",
  },
  {
    label: "Weights",
    value: "Digest-verified bytes embedded in the artifact",
  },
  {
    label: "References",
    value: "Independent expected values used to prove parity",
  },
  {
    label: "Target",
    value: "The provider, hardware plan, and runtime settings",
  },
] as const;

export const kanamePillars = [
  {
    number: "01",
    title: "Turn objectives into bounded work",
    body: "Plans become durable tasks and one-use attempts, each with an identity that survives retries, recovery, and movement across the fleet.",
  },
  {
    number: "02",
    title: "Make authority explicit",
    body: "Tools, credentials, mutations, and execution rights are scoped. Human approval stays on the path whenever the work crosses an authority boundary.",
  },
  {
    number: "03",
    title: "Operate the whole system",
    body: "Terminal, desktop, and mobile surfaces expose run state, agent status, decisions, alerts, and intervention without collapsing control into a chat window.",
  },
] as const;

export const openSourceProjects = [
  {
    name: "Orihime",
    status: "Open source",
    eyebrow: "Differentiable primitives",
    description:
      "Custom PyTorch extensions for differentiable dynamic programming across CPU, CUDA, and HIP. Orihime made alignment trainable end to end.",
    href: "https://github.com/megure-labs/orihime",
    linkLabel: "View Orihime on GitHub",
  },
  {
    name: "Hikoboshi",
    status: "Open source",
    eyebrow: "Native protein alignment",
    description:
      "A native protein alignment system that vendors model forwards for production speed. Hikoboshi proved that nontrivial ML inference could run at bioinformatics scale.",
    href: "https://github.com/megure-labs/hikoboshi",
    linkLabel: "View Hikoboshi on GitHub",
  },
] as const;

export const approvalArtifacts = [
  ["Native program", "What runs"],
  ["Provenance index", "What model and weights it contains"],
  ["Parity report", "Why it passed"],
  ["Target manifest", "Where and how it ran"],
  ["Benchmark record", "How it performs"],
] as const;
