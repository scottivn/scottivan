import { ContactCTA } from "@scottivan/shared";

const services = [
  {
    icon: "🎨",
    title: "Custom Design",
    desc: "Beautiful, responsive websites tailored to your brand. No templates — every pixel designed for you.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Built with modern frameworks and deployed on a global CDN. Your site loads in under a second.",
  },
  {
    icon: "🔒",
    title: "Secure & Reliable",
    desc: "Free SSL, DDoS protection, and enterprise-grade hosting on AWS. Your site is always up.",
  },
  {
    icon: "📱",
    title: "Mobile First",
    desc: "Every page looks perfect on phones, tablets, and desktops. Tested across all major browsers.",
  },
  {
    icon: "📈",
    title: "SEO Optimized",
    desc: "Structured data, fast load times, and clean markup. Get found by the customers searching for you.",
  },
  {
    icon: "🛠️",
    title: "Easy Updates",
    desc: "Need changes? Simple content management or direct developer support. Your site evolves with your business.",
  },
];

const testimonials = [
  {
    quote: "Our new website completely transformed how clients perceive our firm. We saw a 40% increase in consultation requests within the first month.",
    name: "Sarah M.",
    role: "Managing Partner, Law Firm",
  },
  {
    quote: "Fast, professional, and exactly what we needed. The site paid for itself in new customers within weeks.",
    name: "James R.",
    role: "Owner, Local Plumbing Co.",
  },
  {
    quote: "Working with Scott was seamless. He understood our vision and delivered a site that actually converts visitors into patients.",
    name: "Dr. Lisa K.",
    role: "Clinic Director",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 via-transparent to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <p className="font-mono text-[#00ff88] text-sm mb-4 tracking-wider uppercase">
            Your Business Name
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional services{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">
              you can trust
            </span>
          </h1>
          <p className="text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We help local businesses grow with expert service and personal attention.
            Get a free consultation and see how we can help you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="font-mono text-sm px-8 py-4 bg-[#00ff88] text-[#0a0e1a] rounded-lg font-bold hover:bg-[#00ff88]/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]"
            >
              Book a Free Consultation
            </a>
            <a
              href="#services"
              className="font-mono text-sm px-8 py-4 border border-[#00ff88]/30 text-[#00ff88] rounded-lg hover:border-[#00ff88] hover:bg-[#00ff88]/5 transition-all"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 px-6 border-y border-[#1f2937] bg-[#111827]/50">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { val: "150+", label: "Clients Served" },
            { val: "4.9★", label: "Average Rating" },
            { val: "10+", label: "Years Experience" },
            { val: "24/7", label: "Support" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-[#00ff88]">{val}</div>
              <div className="font-mono text-xs text-[#94a3b8] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#00d4ff] text-sm mb-3 uppercase tracking-wider">
              What We Offer
            </p>
            <h2 className="text-3xl font-bold text-white">
              Everything your business needs online
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl p-6 bg-[#111827] border border-[#1f2937] hover:border-[#00ff88]/30 transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#111827]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-[#00d4ff] text-sm mb-3 uppercase tracking-wider">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-white">
              What our clients say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role }) => (
              <div
                key={name}
                className="rounded-xl p-6 bg-[#0a0e1a] border border-[#1f2937]"
              >
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div>
                  <div className="text-white font-semibold text-sm">{name}</div>
                  <div className="text-[#4b5563] font-mono text-xs mt-0.5">{role}</div>
                </div>
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
