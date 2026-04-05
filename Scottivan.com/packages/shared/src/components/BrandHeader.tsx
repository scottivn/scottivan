"use client";

export default function BrandHeader({ siteUrl = "https://scottivan.com" }: { siteUrl?: string }) {
  return (
    <div className="w-full bg-[#0a0e1a] border-b border-[#1f2937] px-4 py-2 flex items-center justify-between">
      <a
        href={siteUrl}
        className="font-mono text-xs text-[#94a3b8] hover:text-[#00ff88] transition-colors"
      >
        <span className="text-[#00ff88]">scott</span>
        <span className="text-[#94a3b8]">@</span>
        <span className="text-[#00d4ff]">ivan</span>
        <span className="text-[#94a3b8]">.com</span>
      </a>
      <a
        href={siteUrl}
        className="font-mono text-xs text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
      >
        ← back to portfolio
      </a>
    </div>
  );
}
