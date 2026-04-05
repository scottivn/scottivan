"use client";

export default function ContactCTA({ siteUrl = "https://scottivan.com" }: { siteUrl?: string }) {
  return (
    <section className="w-full bg-[#111827] border-t border-[#1f2937] px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Like what you see?</h2>
        <p className="text-[#94a3b8] mb-6 font-mono text-sm">
          This is a customizable starter model. I&apos;ll build something tailored to your
          business — same stack, your brand, your content.
        </p>
        <a
          href={`mailto:hello@scottivan.com`}
          className="inline-block font-mono text-sm px-6 py-3 bg-[#00ff88] text-[#0a0e1a] rounded font-bold hover:bg-[#00ff88]/90 transition-all"
        >
          ./get-started
        </a>
        <p className="font-mono text-xs text-[#4b5563] mt-4">
          or{" "}
          <a href={`${siteUrl}/models`} className="text-[#00d4ff] hover:underline">
            browse all models
          </a>
        </p>
      </div>
    </section>
  );
}
