"use client";

export default function BrandFooter({ siteUrl = "https://scottivan.com" }: { siteUrl?: string }) {
  return (
    <footer className="w-full bg-[#0a0e1a] border-t border-[#1f2937] px-6 py-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#4b5563]">
          Built by{" "}
          <a href={siteUrl} className="text-[#00ff88] hover:underline">
            Scott Ivan
          </a>
        </p>
        <a
          href={`${siteUrl}/models`}
          className="font-mono text-xs text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
        >
          browse all models →
        </a>
      </div>
    </footer>
  );
}
