import Link from "next/link";

const experience = [
  {
    role: "Platform Engineer — DevSecOps",
    company: "USAA",
    period: "2025 – Present",
    team: "EKS / DevSecRegOps Team",
    color: "#00ff88",
    highlights: [
      "Architecting a three-tier EKS cluster management platform using Argo CD for cluster syncs and lifecycle management",
      "Building GitOps-driven infrastructure pipelines for multi-cluster governance across enterprise environments",
      "Designing DevSecOps-native workflows integrating security scanning, policy enforcement, and automated compliance",
      "Leading shift-left security practices with OPA/Kyverno policy-as-code for cluster governance",
    ],
    stack: ["EKS", "Argo CD", "Kubernetes", "Terraform", "GitOps", "OPA", "Kyverno"],
  },
  {
    role: "Platform Engineer — Containers as a Service",
    company: "USAA",
    period: "2019 – 2025",
    team: "OpenShift / On-Prem Cloud Team",
    color: "#00d4ff",
    highlights: [
      "Built and managed enterprise-scale OpenShift clusters across on-premises data centers",
      "Automated cluster provisioning, day-2 operations, and lifecycle management at scale",
      "Developed internal tooling for cluster monitoring, alerting, and self-service developer workflows",
      "Collaborated cross-functionally with application teams to migrate workloads to containerized infrastructure",
    ],
    stack: ["OpenShift", "Kubernetes", "Ansible", "Python", "Helm", "Prometheus", "Grafana"],
  },
  {
    role: "Teaching Assistant — Computer Science",
    company: "University",
    period: "2017 – 2019",
    team: "Data Structures & Algorithms",
    color: "#ffd700",
    highlights: [
      "TA for introductory and intermediate CS courses covering data structures, algorithms, and OOP",
      "Led weekly lab sessions, office hours, and code reviews for 30+ students per semester",
    ],
    stack: ["Java", "Data Structures", "Algorithms", "OOP"],
  },
];

const projects = [
  {
    name: "PatientSynapse",
    url: "https://patientsynapse.com",
    demoUrl: "https://patientsynapse.com/login",
    color: "#00ff88",
    featured: true,
    desc: "Full-stack AI automation platform for a sleep medicine practice. Automates the fax-to-EMR pipeline: inbound faxes are OCR'd, run through an LLM extraction layer, matched to FHIR R4 patient records, and pushed directly into the EMR — eliminating manual data entry. Also manages the full DME/CPAP supply lifecycle, HMO referral authorization tracking, and insurance allowable rate lookups.",
    highlights: [
      "OCR → LLM → FHIR R4 pipeline: PyMuPDF + Tesseract → Grok/OpenAI/Anthropic/Bedrock (hot-swappable) → eClinicalWorks / athenahealth",
      "HIPAA-compliant audit logging middleware, JWT + SMART on FHIR OAuth2, RBAC with role-scoped UI and backend guards",
      "DME prior authorization lifecycle, patient-facing confirmation flows, revenue cycle dashboard",
      "Deployed on AWS EC2 behind nginx with Let's Encrypt TLS and AWS Secrets Manager for credential injection",
    ],
    stack: ["FastAPI", "React", "PostgreSQL", "FHIR R4", "LLMs", "OCR", "AWS", "JWT/RBAC"],
  },
  {
    name: "scottivan.com",
    url: "https://scottivan.com",
    demoUrl: null,
    color: "#00d4ff",
    featured: false,
    desc: "This site — personal portfolio, model catalog, and playground. Terminal-themed, built with Next.js, deployed on AWS (S3 + CloudFront).",
    highlights: [],
    stack: ["Next.js", "TypeScript", "Tailwind", "AWS", "CloudFront"],
  },
];

const certifications = [
  {
    name: "Certified Kubernetes Administrator",
    abbr: "CKA",
    org: "Cloud Native Computing Foundation (CNCF)",
    color: "#00ff88",
    year: "2023",
  },
  {
    name: "Machine Learning Certificate",
    abbr: "ML",
    org: "Cornell University",
    color: "#00d4ff",
    year: "2023",
  },
];

const skills = {
  "Cloud & Orchestration": ["Kubernetes", "EKS", "OpenShift", "Helm", "Kustomize"],
  "GitOps & CD": ["Argo CD", "Argo Workflows", "FluxCD", "GitHub Actions"],
  "DevSecOps": ["OPA", "Kyverno", "SAST/DAST pipelines", "Policy-as-Code"],
  "IaC & Automation": ["Terraform", "Ansible", "Python", "Go"],
  "Observability": ["Prometheus", "Grafana", "OpenTelemetry", "Loki"],
  "Languages": ["Python", "Go", "Bash", "TypeScript"],
};

export default function ResumePage() {
  return (
    <div className="hero-bg min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[#4b5563] text-sm mb-2">$ cat resume.md</p>
          <div className="terminal-box rounded-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Scott Ivan</h1>
                <p className="text-[#00ff88] font-mono text-sm mt-1">
                  Platform Engineer · DevSecOps · Cloud Native
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { label: "hello@scottivan.com", href: "mailto:hello@scottivan.com" },
                    { label: "github.com/scottivan", href: "https://github.com" },
                    { label: "linkedin.com/in/scottivan", href: "https://www.linkedin.com/in/scott-ivan-4a2905134" },
                    { label: "lichess.org/@/scottivn", href: "https://lichess.org/@/scottivn" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="/resume.pdf"
                className="font-mono text-xs px-4 py-2 border border-[#00ff88]/30 text-[#00ff88] rounded hover:border-[#00ff88] hover:bg-[#00ff88]/5 transition-all whitespace-nowrap self-start"
              >
                ↓ download PDF
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-10">
          <p className="font-mono text-[#4b5563] text-sm mb-3">// summary</p>
          <p className="text-[#94a3b8] leading-relaxed">
            Platform engineer with hands-on experience building and operating enterprise Kubernetes
            infrastructure at USAA. Transitioned from on-premises OpenShift to leading EKS platform
            engineering, designing a three-tier cluster management architecture using Argo CD.
            CKA certified with a Machine Learning certificate from Cornell. Outside of work, I've built
            PatientSynapse — an AI-powered workflow automation platform for a medical practice, hosted on AWS.
            Passionate about GitOps, policy-as-code, and developer platforms that get out of the way.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-12">
          <p className="font-mono text-[#4b5563] text-sm mb-6">$ git log --all --format="%s"</p>
          <div className="space-y-8">
            {experience.map((job, i) => (
              <div key={i} className="relative">
                {i < experience.length - 1 && (
                  <div
                    className="absolute left-[11px] top-6 bottom-[-32px] w-px"
                    style={{ background: `${job.color}22` }}
                  />
                )}
                <div className="flex gap-5">
                  <div
                    className="w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5"
                    style={{ borderColor: job.color, background: `${job.color}15` }}
                  />
                  <div className="flex-1 terminal-box rounded-lg p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{job.role}</h3>
                        <p className="font-mono text-xs mt-1" style={{ color: job.color }}>
                          {job.company} · {job.team}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[#4b5563] whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {job.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2 text-[#94a3b8] text-sm">
                          <span style={{ color: job.color }} className="flex-shrink-0 mt-0.5">›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {job.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-xs px-2 py-0.5 rounded"
                          style={{
                            background: `${job.color}10`,
                            border: `1px solid ${job.color}30`,
                            color: job.color,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <p className="font-mono text-[#4b5563] text-sm mb-6">$ ls ./projects/</p>
          <div className="flex flex-col gap-4">
            {projects.map(({ name, url, demoUrl, color, featured, desc, highlights, stack }) => (
              <div
                key={name}
                className="terminal-box rounded-lg p-5 flex flex-col gap-3"
                style={featured ? { borderColor: `${color}44` } : {}}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#e2e8f0]">{name}</span>
                    {featured && (
                      <span
                        className="font-mono text-xs px-1.5 py-0.5 rounded"
                        style={{ background: `${color}15`, border: `1px solid ${color}40`, color }}
                      >
                        featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs px-3 py-1 rounded font-bold transition-all"
                        style={{
                          background: color,
                          color: "#0a0e1a",
                        }}
                      >
                        try demo →
                      </a>
                    )}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs transition-colors"
                      style={{ color }}
                    >
                      visit ↗
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#94a3b8] text-sm leading-relaxed">{desc}</p>

                {/* Highlights (featured projects only) */}
                {highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-[#94a3b8] text-xs leading-relaxed">
                        <span style={{ color }} className="flex-shrink-0 mt-0.5">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: `${color}10`,
                        border: `1px solid ${color}30`,
                        color,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <p className="font-mono text-[#4b5563] text-sm mb-6">$ ls -la ./certifications/</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map(({ name, abbr, org, color, year }) => (
              <div key={abbr} className="terminal-box rounded-lg p-5 flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center font-mono font-bold flex-shrink-0"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}44`,
                    color,
                    fontSize: "0.8rem",
                  }}
                >
                  {abbr}
                </div>
                <div>
                  <div className="text-[#e2e8f0] font-medium text-sm">{name}</div>
                  <div className="font-mono text-xs text-[#94a3b8] mt-1">{org}</div>
                  <div className="font-mono text-xs mt-1" style={{ color }}>{year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <p className="font-mono text-[#4b5563] text-sm mb-6">$ cat skills.json | jq</p>
          <div className="terminal-box rounded-lg p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-mono text-[#00ff88] text-xs mb-3 uppercase tracking-wider">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-2 py-1 rounded bg-[#1f2937] text-[#94a3b8] border border-[#1f2937] hover:border-[#00ff88]/30 hover:text-[#e2e8f0] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-12">
          <p className="font-mono text-[#4b5563] text-sm mb-4">// education</p>
          <div className="terminal-box rounded-lg p-5">
            <h3 className="text-white font-semibold">B.A., Computer and Programming Sciences</h3>
            <p className="font-mono text-xs text-[#00d4ff] mt-1">Minor in Mathematics</p>
            <p className="font-mono text-xs text-[#4b5563] mt-1">
              Teaching Assistant — Data Structures & Algorithms
            </p>
          </div>
        </div>

        {/* Footer nav */}
        <div className="flex justify-between items-center pt-6 border-t border-[#1f2937]">
          <Link
            href="/"
            className="font-mono text-sm text-[#94a3b8] hover:text-[#00ff88] transition-colors"
          >
            ← cd ~/
          </Link>
          <a
            href="mailto:hello@scottivan.com"
            className="font-mono text-sm px-5 py-2 bg-[#00ff88] text-[#0a0e1a] rounded font-bold hover:bg-[#00ff88]/90 transition-all"
          >
            ./contact
          </a>
        </div>
      </div>
    </div>
  );
}
