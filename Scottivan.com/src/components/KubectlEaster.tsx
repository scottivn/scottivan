"use client";

import { useState, useRef, useEffect } from "react";

const PROMPT = "scott@scottivan.com:~$ ";

const commands: Record<string, string[]> = {
  "kubectl get pods": [
    "NAME                          READY   STATUS    RESTARTS   AGE",
    "platform-engineer-usaa        1/1     Running   0          3y",
    "openshift-veteran             1/1     Running   0          3y",
    "argo-cd-architect             1/1     Running   0          1y",
    "cka-certified                 1/1     Running   0          2y",
    "cornell-ml                    1/1     Running   0          2y",
    "patientsynapse-founder        1/1     Running   0          1y",
    "bjj-purple-belt               1/1     Running   0          4y",
    "chess-player-1526blitz        1/1     Running   0          5y",
  ],
  "kubectl get pods -n expertise": [
    "NAME                          READY   STATUS    RESTARTS   AGE",
    "kubernetes-eks                1/1     Running   0          3y",
    "argo-cd-gitops                1/1     Running   0          1y",
    "devsecops                     1/1     Running   0          1y",
    "python-ml                     1/1     Running   0          2y",
    "golang                        1/1     Running   0          6m",
    "openshift                     1/1     Running   0          3y",
    "terraform-ansible             1/1     Running   0          3y",
  ],
  "kubectl get nodes": [
    "NAME            STATUS   ROLES           AGE   VERSION",
    "brain           Ready    control-plane   28y   v1.28.0",
    "hands           Ready    worker          28y   v1.28.0",
    "coffee          Ready    worker          10y   v1.28.0",
  ],
  "kubectl describe pod platform-engineer-usaa": [
    "Name:         platform-engineer-usaa",
    "Namespace:    work",
    "Status:       Running",
    "Company:      USAA",
    "Team:         DevSecRegOps / EKS",
    "",
    "Containers:",
    "  eks-architect:",
    "    Image: argo-cd:three-tier-management",
    "    State: Running",
    "  devsecops:",
    "    Image: policy-as-code:kyverno-opa",
    "    State: Running",
    "",
    "Conditions:",
    "  Type              Status",
    "  Initialized       True",
    "  Ready             True",
    "  CKA Certified     True",
  ],
  "kubectl get namespaces": [
    "NAME          STATUS   AGE",
    "work          Active   4y",
    "side-projects Active   1y",
    "chess         Active   5y",
    "jiujitsu      Active   4y",
    "investing     Active   3y",
    "learning      Active   28y",
  ],
  "kubectl logs patientsynapse-founder": [
    "[INFO]  Built web-based AI automation for a medical practice",
    "[INFO]  Stack: AWS, Python, LLMs",
    "[INFO]  Deployed at patientsynapse.com",
    "[INFO]  Streamlines patient intake, scheduling, and process workflows",
    "[INFO]  Status: RUNNING",
  ],
  "kubectl get svc": [
    "NAME              TYPE           CLUSTER-IP    PORT(S)",
    "scottivan.com     LoadBalancer   10.0.0.1      443/TCP",
    "patientsynapse    LoadBalancer   10.0.0.2      443/TCP",
    "lichess-scottivn  ExternalName   lichess.org   -",
    "bjj-mats          ClusterIP      10.0.0.3      -",
  ],
  "kubectl get deployments": [
    "NAME                    READY   UP-TO-DATE   AVAILABLE",
    "scottivan-com           1/1     1            1",
    "patientsynapse-com      1/1     1            1",
    "argo-eks-management     1/1     1            1",
  ],
  "kubectl top pods": [
    "NAME                          CPU(cores)   MEMORY(bytes)",
    "platform-engineer-usaa        420m         8Gi",
    "bjj-purple-belt               800m         2Gi",
    "chess-player-1526blitz        350m         1Gi",
    "coffee                        9999m        unlimited",
  ],
  help: [
    "Available commands:",
    "",
    "  kubectl get pods                          — list experience pods",
    "  kubectl get pods -n expertise             — list skill pods",
    "  kubectl get nodes                         — list hardware",
    "  kubectl get namespaces                    — list life namespaces",
    "  kubectl get svc                           — list services",
    "  kubectl get deployments                   — list projects",
    "  kubectl top pods                          — resource usage",
    "  kubectl describe pod platform-engineer-usaa",
    "  kubectl logs patientsynapse-founder",
    "  whoami                                    — identity",
    "  clear                                     — clear terminal",
    "",
    "  Hint: try tab completion (press Tab)",
  ],
  whoami: [
    "scott ivan",
    "platform engineer @ usaa",
    "cka · cornell ml · purple belt · 1526 blitz",
  ],
  ls: [
    "resume/   projects/   certifications/   interests/   contact/",
  ],
  "ls -la": [
    "drwxr-xr-x  scott  staff  resume/",
    "drwxr-xr-x  scott  staff  projects/",
    "drwxr-xr-x  scott  staff  certifications/",
    "drwxr-xr-x  scott  staff  interests/",
    "-rw-r--r--  scott  staff  README.md",
  ],
  pwd: ["/home/scott"],
  date: [new Date().toUTCString()],
  uname: ["scottOS 28.0.0 x86_64 GNU/Linux"],
  exit: ["Nice try. You can't escape."],
};

const COMPLETIONS = Object.keys(commands);

export default function KubectlEaster() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string[] }[]>([
    { cmd: "", output: ['Type "help" for available commands. Press Ctrl+K to toggle.'] },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([{ cmd: "", output: ['Terminal cleared. Type "help" for commands.'] }]);
      setCmdHistory((h) => [raw, ...h]);
      setInput("");
      setHistoryIdx(-1);
      return;
    }

    const output = commands[cmd] ?? [
      `bash: ${cmd}: command not found`,
      `Try "help" to see available commands.`,
    ];

    setHistory((h) => [...h, { cmd: raw, output }]);
    setCmdHistory((h) => [raw, ...h]);
    setInput("");
    setHistoryIdx(-1);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMPLETIONS.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  return (
    <>
      {/* Hint bar */}
      <div className="py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setOpen(true)}
            className="font-mono text-xs text-[#4b5563] hover:text-[#00ff88] transition-colors group flex items-center gap-2"
          >
            <span className="px-1.5 py-0.5 border border-[#1f2937] rounded text-[#4b5563] group-hover:border-[#00ff88]/30">
              Ctrl+K
            </span>
            <span>open kubectl terminal</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">_</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-6 pb-10"
          style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(4px)" }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-3xl terminal-box rounded-lg overflow-hidden shadow-2xl"
               style={{ boxShadow: "0 0 60px rgba(0,255,136,0.15)" }}>
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#111827] border-b border-[#1f2937]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff4757]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffd700]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]" />
                <span className="font-mono text-xs text-[#4b5563] ml-2">
                  scott@scottivan.com — kubectl
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-[#4b5563] hover:text-[#e2e8f0] transition-colors"
              >
                esc
              </button>
            </div>

            {/* Output */}
            <div className="p-4 h-72 overflow-y-auto font-mono text-xs leading-relaxed">
              {history.map((entry, i) => (
                <div key={i} className="mb-1">
                  {entry.cmd && (
                    <div className="text-[#00ff88]">{PROMPT}{entry.cmd}</div>
                  )}
                  {entry.output.map((line, j) => (
                    <div key={j} className={line === "" ? "h-3" : "text-[#94a3b8]"}>
                      {line}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-[#1f2937] bg-[#111827]">
              <span className="font-mono text-xs text-[#00ff88] whitespace-nowrap">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent font-mono text-xs text-[#e2e8f0] outline-none caret-[#00ff88]"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
