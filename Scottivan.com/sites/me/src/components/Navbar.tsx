"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~/" },
  { href: "/resume", label: "resume" },
  { href: "/lab", label: "lab" },
  // { href: "/blog", label: "blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e1a]/95 backdrop-blur border-b border-[#00ff88]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-mono text-sm group">
          <span className="text-[#00ff88] glow-green">scott</span>
          <span className="text-[#94a3b8]">@</span>
          <span className="text-[#00d4ff]">ivan</span>
          <span className="text-[#94a3b8]">:~$</span>
          <span className="ml-1 inline-block w-2 h-4 bg-[#00ff88] animate-blink align-middle" />
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-sm transition-all duration-200 ${
                pathname === href
                  ? "text-[#00ff88] glow-green"
                  : "text-[#94a3b8] hover:text-[#e2e8f0]"
              }`}
            >
              ./{label}
            </Link>
          ))}
          <a
            href="https://scottivan.com"
            className="font-mono text-sm text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
          >
            home ↗
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
          >
            github ↗
          </a>
          <a
            href="https://www.linkedin.com/in/scott-ivan-4a2905134"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
          >
            linkedin ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
