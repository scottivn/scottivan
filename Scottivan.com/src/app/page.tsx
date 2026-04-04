import Typewriter from "@/components/Typewriter";
import KubectlEaster from "@/components/KubectlEaster";
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

const skills = [
  { label: "Kubernetes / EKS", level: 95, color: "#00ff88" },
  { label: "OpenShift", level: 90, color: "#00ff88" },
  { label: "Argo CD / GitOps", level: 88, color: "#00d4ff" },
  { label: "DevSecOps", level: 85, color: "#00d4ff" },
  { label: "Python / Machine Learning", level: 78, color: "#ffd700" },
  { label: "Go (Golang)", level: 72, color: "#ffd700" },
];

const certs = [
  { name: "CKA", full: "Certified Kubernetes Administrator", org: "CNCF", color: "#00ff88" },
  { name: "ML", full: "Machine Learning Certificate", org: "Cornell University", color: "#00d4ff" },
];

const interests = [
  {
    icon: "⚔️",
    label: "Brazilian Jiu-Jitsu",
    desc: "Purple belt · Rodrigo Pinheiro BJJ · Boerne, TX",
  },
  {
    icon: "♟️",
    label: "Chess",
    desc: "1526 Blitz · 2394 Correspondence · lichess: scottivn",
  },
  {
    icon: "📈",
    label: "Investing",
    desc: "Systematic, data-driven approach",
  },
  {
    icon: "🖥️",
    label: "Programming",
    desc: "Always learning, always shipping",
  },
];

export default function Home() {
  return (
    <div className="hero-bg min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Terminal */}
            <div className="terminal-box rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-[#1f2937]">
                <div className="w-3 h-3 rounded-full bg-[#ff4757]" />
                <div className="w-3 h-3 rounded-full bg-[#ffd700]" />
                <div className="w-3 h-3 rounded-full bg-[#00ff88]" />
                <span className="ml-3 font-mono text-xs text-[#4b5563]">
                  scott@scottivan.com:~
                </span>
              </div>
              <div className="p-6">
                <Typewriter
                  lines={terminalLines}
                  speed={30}
                  className="text-sm leading-relaxed text-[#e2e8f0]"
                />
              </div>
            </div>

            {/* Right: Intro */}
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[#00ff88] text-sm mb-2">// hello world</p>
                <h1 className="text-5xl font-bold text-white leading-tight">
                  Scott<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
                    Ivan
                  </span>
                </h1>
                <p className="mt-4 text-[#94a3b8] text-lg font-light leading-relaxed">
                  Platform Engineer building the future of cloud-native infrastructure.
                  Currently architecting a three-tier EKS management platform with Argo CD at USAA.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: "CKA", sub: "Certified" },
                  { val: "USAA", sub: "Enterprise" },
                  { val: "EKS", sub: "Building" },
                ].map(({ val, sub }) => (
                  <div key={val} className="terminal-box rounded p-3 text-center">
                    <div className="font-mono text-lg font-bold text-[#00ff88] glow-green">{val}</div>
                    <div className="font-mono text-xs text-[#94a3b8] mt-1">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/resume"
                  className="font-mono text-sm px-6 py-3 bg-[#00ff88] text-[#0a0e1a] rounded font-bold hover:bg-[#00ff88]/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]"
                >
                  cat resume.md
                </Link>
                <a
                  href="mailto:hello@scottivan.com"
                  className="font-mono text-sm px-6 py-3 border border-[#00ff88]/30 text-[#00ff88] rounded hover:border-[#00ff88] hover:bg-[#00ff88]/5 transition-all"
                >
                  ./contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#4b5563] text-sm mb-2">$ cat skills.json</p>
          <h2 className="text-2xl font-bold text-white mb-10">Technical Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map(({ label, level, color }) => (
              <div key={label}>
                <div className="flex justify-between font-mono text-sm mb-2">
                  <span className="text-[#e2e8f0]">{label}</span>
                  <span style={{ color }}>{level}%</span>
                </div>
                <div className="h-1.5 bg-[#1f2937] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${level}%`,
                      background: `linear-gradient(90deg, ${color}, ${color}88)`,
                      boxShadow: `0 0 10px ${color}66`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured project callout */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#4b5563] text-sm mb-2">$ cat ./projects/patientsynapse.md</p>
          <div
            className="terminal-box rounded-lg p-5"
            style={{ borderColor: "rgba(0,255,136,0.3)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#e2e8f0] font-semibold">PatientSynapse</span>
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.35)", color: "#00ff88" }}>
                    side project
                  </span>
                </div>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-3">
                  AI automation platform for a sleep medicine practice — fax intake OCR'd, extracted via LLM, matched to FHIR R4 records, and pushed to the EMR. Manages DME/CPAP lifecycle, prior auth tracking, and revenue cycle. FastAPI + React + AWS, HIPAA-compliant.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["FastAPI", "React", "FHIR R4", "LLMs", "OCR", "AWS", "RBAC"].map((t) => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="https://patientsynapse.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm px-4 py-2 rounded font-bold whitespace-nowrap self-start transition-all hover:shadow-[0_0_15px_rgba(0,255,136,0.4)]"
                style={{ background: "#00ff88", color: "#0a0e1a" }}
              >
                try demo →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certs */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#4b5563] text-sm mb-2">$ ls ./certifications/</p>
          <div className="flex flex-wrap gap-4 mt-4">
            {certs.map(({ name, full, org, color }) => (
              <div
                key={name}
                className="terminal-box rounded-lg p-4 flex items-center gap-4"
                style={{ borderColor: `${color}33` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                  style={{ background: `${color}15`, border: `1px solid ${color}44`, color }}
                >
                  {name}
                </div>
                <div>
                  <div className="text-[#e2e8f0] font-medium text-sm">{full}</div>
                  <div className="font-mono text-xs text-[#94a3b8] mt-0.5">{org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chess stats */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#4b5563] text-sm mb-2">
            $ curl lichess.org/api/user/scottivn | jq .perfs
          </p>
          <div className="terminal-box rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">♟️</span>
                <div>
                  <span className="text-[#e2e8f0] font-semibold">scottivn</span>
                  <span className="font-mono text-xs text-[#4b5563] ml-2">on lichess.org</span>
                </div>
              </div>
              <a
                href="https://lichess.org/@/scottivn"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#00d4ff] hover:text-[#00ff88] transition-colors"
              >
                view profile ↗
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { mode: "Blitz", rating: "1526", games: "2,736", color: "#ff4757" },
                { mode: "Rapid", rating: "1526", games: "1,003", color: "#00d4ff" },
                { mode: "Correspondence", rating: "2394", games: "16", color: "#ffd700" },
                { mode: "Puzzles", rating: "1744", games: "18,709", color: "#00ff88" },
              ].map(({ mode, rating, games, color }) => (
                <div
                  key={mode}
                  className="rounded p-3 text-center"
                  style={{ background: `${color}08`, border: `1px solid ${color}25` }}
                >
                  <div className="font-mono font-bold text-lg" style={{ color }}>{rating}</div>
                  <div className="font-mono text-xs text-[#e2e8f0] mt-0.5">{mode}</div>
                  <div className="font-mono text-xs text-[#4b5563] mt-0.5">{games} games</div>
                </div>
              ))}
            </div>
            <div className="mt-3 font-mono text-xs text-[#4b5563]">
              Member since Feb 2021 · 17 days, 6 hours played · 3,775 total games
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[#4b5563] text-sm mb-2">$ echo $INTERESTS | tr " " "\n"</p>
          <h2 className="text-2xl font-bold text-white mb-8">Beyond the Terminal</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {interests.map(({ icon, label, desc }) => (
              <div
                key={label}
                className="terminal-box rounded-lg p-5 hover:scale-[1.02] transition-transform cursor-default"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-[#e2e8f0] font-semibold text-sm">{label}</div>
                <div className="text-[#94a3b8] text-xs mt-1 font-mono">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* kubectl Easter egg */}
      <KubectlEaster />

      {/* Footer */}
      <footer className="border-t border-[#1f2937] py-8 px-6 text-center">
        <p className="font-mono text-[#4b5563] text-xs">
          <span className="text-[#00ff88]">scott@scottivan.com</span>:~$ exit
        </p>
        <p className="font-mono text-[#4b5563] text-xs mt-1">
          built with next.js · deployed on vercel · © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
