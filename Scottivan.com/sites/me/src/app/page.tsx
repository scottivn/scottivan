import Typewriter from "@/components/Typewriter";
import KubectlEaster from "@/components/KubectlEaster";
import ContactButton from "@/components/ContactButton";
import Link from "next/link";

const terminalLines = [
  "$ whoami",
  "  scott ivan",
  "",
  "$ cat profile.txt",
  "  Platform Engineer | DevSecOps | Cloud Native",
  "  CKA Certified | Cornell ML | OpenShift → EKS",
  "",
  "$ kubectl get pods -n expertise",
  "  NAME                    READY   STATUS    RESTARTS",
  "  kubernetes-infra        1/1     Running   0",
  "  devsecops               1/1     Running   0",
  "  argo-cd-management      1/1     Running   0",
  "  machine-learning        1/1     Running   0",
  "",
  "$ echo $INTERESTS",
  "  jiujitsu chess investing golang",
];

const expertise: Record<string, string[]> = {
  "Orchestration": ["Kubernetes", "EKS", "OpenShift", "Helm", "Kustomize"],
  "GitOps & CD": ["Argo CD", "Argo Workflows", "GitHub Actions"],
  "DevSecOps": ["OPA", "Kyverno", "Policy-as-Code", "SAST/DAST"],
  "Infrastructure": ["Terraform", "Ansible", "CloudFormation"],
  "Languages": ["Python", "Go", "TypeScript", "Bash"],
  "Observability": ["Prometheus", "Grafana", "OpenTelemetry", "Loki"],
};

const certs = [
  { abbr: "CKA", name: "Certified Kubernetes Administrator", org: "CNCF · 2023" },
  { abbr: "ML", name: "Machine Learning Certificate", org: "Cornell University · 2023" },
];

const interests = [
  { icon: "🥋", label: "Jiu-Jitsu", detail: "Purple belt · Pinheiro BJJ" },
  { icon: "♟️", label: "Chess", detail: "1526 blitz · lichess: scottivn" },
  { icon: "📊", label: "Investing", detail: "Systematic & data-driven" },
  { icon: "🔧", label: "Building", detail: "Always shipping" },
];

export default function Home() {
  return (
    <div className="hero-bg dot-grid min-h-screen relative">

      {/* ──── Hero ──── */}
      <section className="min-h-[92vh] flex items-center px-6 pt-20 pb-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">

            {/* Left column */}
            <div className="lg:col-span-3 space-y-8 relative z-10">
              <p className="section-label">Platform Engineer · DevSecOps · Cloud Native</p>

              <h1 className="font-display text-[clamp(3.5rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight">
                <span className="text-white">Scott</span>
                <br />
                <span className="text-amber-500">Ivan</span>
              </h1>

              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl">
                Building enterprise Kubernetes infrastructure at{" "}
                <span className="text-zinc-200 font-medium">USAA</span>.
                Architecting a three-tier EKS management platform with Argo CD.
                CKA certified. Cornell ML.
              </p>

              {/* Stat blocks */}
              <div className="flex flex-wrap gap-8 pt-1">
                {[
                  { value: "6+", label: "Years USAA" },
                  { value: "CKA", label: "Certified" },
                  { value: "EKS", label: "Architect" },
                  { value: "ML", label: "Cornell" },
                ].map(({ value, label }) => (
                  <div key={value} className="stat-block">
                    <div className="font-display text-2xl font-bold text-amber-500">{value}</div>
                    <div className="text-zinc-500 text-sm mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-zinc-950 rounded-lg font-semibold text-sm hover:bg-amber-400 transition-all hover:shadow-[0_0_25px_rgba(232,168,48,0.3)]"
                >
                  View Resume
                </Link>
                <ContactButton
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg font-medium text-sm hover:border-amber-500/50 hover:text-amber-500 transition-all"
                >
                  Get in Touch
                </ContactButton>
              </div>
            </div>

            {/* Right column — mini terminal (desktop) */}
            <div className="lg:col-span-2 hidden lg:block relative z-10">
              <div className="terminal-box overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#222228]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[10px] text-zinc-600">
                    scott@scottivan.com
                  </span>
                </div>
                <div className="p-5 font-mono text-xs leading-relaxed space-y-3">
                  <div>
                    <span className="text-zinc-600">$</span>{" "}
                    <span className="text-zinc-400">whoami</span>
                  </div>
                  <div className="text-emerald-400">scott ivan — platform engineer</div>

                  <div className="pt-1">
                    <span className="text-zinc-600">$</span>{" "}
                    <span className="text-zinc-400">kubectl get pods -n career</span>
                  </div>
                  <div className="text-zinc-600 text-[10px]">
                    {"NAME".padEnd(22)}READY{"  "}STATUS
                  </div>
                  {[
                    { name: "usaa-eks-platform", status: "Running" },
                    { name: "patientsynapse", status: "Running" },
                    { name: "scottivan-com", status: "Running" },
                    { name: "bjj-purple-belt", status: "Running" },
                  ].map(({ name, status }) => (
                    <div key={name} className="text-[10px]">
                      <span className="text-emerald-400">{name.padEnd(22)}</span>
                      <span className="text-zinc-500">1/1{"  "}</span>
                      <span className="text-emerald-400">{status}</span>
                    </div>
                  ))}

                  <div className="pt-1">
                    <span className="text-zinc-600">$</span>{" "}
                    <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-blink align-middle" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──── Featured Project ──── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-8">Featured Project</p>

          <div className="featured-border p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-display text-2xl font-bold text-white">PatientSynapse</h3>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    live
                  </span>
                </div>
                <p className="text-zinc-400 leading-relaxed max-w-2xl">
                  AI automation platform for a sleep medicine practice. Faxes are OCR&apos;d,
                  extracted via LLM, matched to FHIR R4 records, and pushed to the EMR.
                  Manages DME/CPAP lifecycle, prior auth tracking, and revenue cycle.
                  HIPAA-compliant, deployed on AWS.
                </p>
              </div>
              <a
                href="https://patientsynapse.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-zinc-950 rounded-lg font-semibold text-sm hover:bg-amber-400 transition-all whitespace-nowrap self-start"
              >
                Try Demo →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                "OCR → LLM → FHIR R4 pipeline with hot-swappable model providers",
                "HIPAA-compliant audit logging, JWT + SMART on FHIR OAuth2, RBAC",
                "DME prior authorization lifecycle & revenue cycle dashboard",
                "AWS EC2, nginx, Let's Encrypt TLS, Secrets Manager",
              ].map((h, i) => (
                <div key={i} className="flex gap-3 text-zinc-500 text-sm">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">›</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["FastAPI", "React", "PostgreSQL", "FHIR R4", "LLMs", "OCR", "AWS", "RBAC"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──── Technical Expertise ──── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <p className="section-label mb-8">Technical Expertise</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(expertise).map(([category, skills]) => (
              <div key={category} className="card rounded-2xl p-6">
                <h3 className="font-mono text-xs text-amber-500 mb-4 tracking-wide">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Interactive Terminal ──── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="section-label mb-6">Interactive Terminal</p>
          <div className="terminal-box overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#222228]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[10px] text-zinc-600">
                scott@scottivan.com:~
              </span>
            </div>
            <div className="p-6">
              <Typewriter
                lines={terminalLines}
                speed={30}
                className="text-sm leading-relaxed text-zinc-300"
              />
            </div>
          </div>
          <p className="font-mono text-[10px] text-zinc-600 mt-3 text-center">
            hint: press Ctrl+K to open the kubectl terminal
          </p>
        </div>
      </section>

      {/* ──── Credentials & Interests ──── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Credentials */}
            <div>
              <p className="section-label mb-6">Credentials</p>
              <div className="space-y-4">
                {certs.map(({ abbr, name, org }) => (
                  <div key={abbr} className="card rounded-xl p-5 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-mono font-bold text-sm text-amber-500">
                      {abbr}
                    </div>
                    <div>
                      <div className="text-zinc-200 font-medium text-sm">{name}</div>
                      <div className="font-mono text-xs text-zinc-500 mt-0.5">{org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interests */}
            <div>
              <p className="section-label mb-6">Beyond the Terminal</p>
              <div className="grid grid-cols-2 gap-4">
                {interests.map(({ icon, label, detail }) => (
                  <div key={label} className="card rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-default">
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="text-zinc-200 font-medium text-sm">{label}</div>
                    <div className="text-zinc-500 text-xs mt-1 font-mono">{detail}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Chess stats — compact */}
          <div className="mt-10 card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">♟️</span>
                <span className="text-zinc-300 font-medium text-sm">scottivn</span>
                <span className="font-mono text-[10px] text-zinc-600">lichess.org</span>
              </div>
              <a
                href="https://lichess.org/@/scottivn"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-500 hover:text-amber-500 transition-colors"
              >
                profile ↗
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { mode: "Blitz", rating: "1526", games: "2,736" },
                { mode: "Rapid", rating: "1526", games: "1,003" },
                { mode: "Correspondence", rating: "2394", games: "16" },
                { mode: "Puzzles", rating: "1744", games: "18,709" },
              ].map(({ mode, rating, games }) => (
                <div key={mode} className="rounded-lg p-3 text-center bg-zinc-900/50 border border-zinc-800">
                  <div className="font-mono font-bold text-lg text-amber-500">{rating}</div>
                  <div className="text-zinc-400 text-xs mt-0.5">{mode}</div>
                  <div className="font-mono text-[10px] text-zinc-600 mt-0.5">{games} games</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* kubectl Easter egg */}
      <KubectlEaster />

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-10 px-6 text-center relative z-10">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {[
            { label: "GitHub", href: "https://github.com/scottivn" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/scott-ivan-4a2905134" },
            { label: "lichess", href: "https://lichess.org/@/scottivn" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-600 hover:text-amber-500 transition-colors"
            >
              {label} ↗
            </a>
          ))}
        </div>
        <p className="font-mono text-[10px] text-zinc-700">
          Built with Next.js · Deployed on AWS · © {new Date().getFullYear()} Scott Ivan
        </p>
      </footer>
    </div>
  );
}
