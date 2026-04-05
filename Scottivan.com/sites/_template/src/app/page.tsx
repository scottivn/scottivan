import { ContactCTA } from "@scottivan/shared";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Your Business Name
        </h1>
        <p className="text-[#94a3b8] text-lg max-w-xl mb-8">
          A brief tagline that describes what you do and why visitors should care.
          This is a customizable starter model.
        </p>
        <a
          href="#contact"
          className="font-mono text-sm px-6 py-3 bg-[#00ff88] text-[#0a0e1a] rounded font-bold hover:bg-[#00ff88]/90 transition-all"
        >
          Get Started
        </a>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#111827]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">What We Offer</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Service One", desc: "Brief description of the first service or feature." },
              { title: "Service Two", desc: "Brief description of the second service or feature." },
              { title: "Service Three", desc: "Brief description of the third service or feature." },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] font-mono font-bold">
                  ?
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-[#94a3b8] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div id="contact">
        <ContactCTA />
      </div>
    </div>
  );
}
