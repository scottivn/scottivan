"use client";

export default function ModelBanner({
  modelName,
  siteUrl = "https://scottivan.com",
}: {
  modelName: string;
  siteUrl?: string;
}) {
  return (
    <div className="w-full bg-[#00ff88]/10 border-b border-[#00ff88]/20 px-4 py-2 text-center">
      <p className="font-mono text-xs text-[#00ff88]">
        You&apos;re viewing <strong>{modelName}</strong> — a customizable starter model.{" "}
        <a
          href={`${siteUrl}/models`}
          className="underline hover:text-white transition-colors"
        >
          Let me build something tailored for you →
        </a>
      </p>
    </div>
  );
}
