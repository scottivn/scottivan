/* ─────────────────────────────────────────────────────────
   Ivan Digital — Conversion-Focused Local Business Studio
   Visual direction: Structured Authority
   Palette: Warm cream + burnt orange accent + ink black
   Typography: Serif headlines, sans body, editorial rhythm
   ───────────────────────────────────────────────────────── */

const services = [
  {
    num: "01",
    title: "Custom Website Design",
    desc: "A site built around your business goals — not a template with your logo dropped in. Every layout decision is made to turn visitors into customers.",
  },
  {
    num: "02",
    title: "Search Engine Optimization",
    desc: "Show up when locals search for what you offer. Technical SEO, fast load times, and content structured so Google puts you on page one.",
  },
  {
    num: "03",
    title: "Conversion Optimization",
    desc: "Strategic placement of calls-to-action, trust signals, and booking flows. Every section of your site has a job to do.",
  },
  {
    num: "04",
    title: "Ongoing Support & Updates",
    desc: "Your business evolves. Your website should too. Content updates, performance monitoring, and priority support — handled for you.",
  },
];

const results = [
  { metric: "3.2x", label: "Average increase in monthly leads" },
  { metric: "47%", label: "More phone calls in the first 90 days" },
  { metric: "2.4s", label: "Average page load time (industry avg: 8.6s)" },
  { metric: "94", label: "Average Google PageSpeed score" },
];

const process = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We talk about your business, your customers, and what a successful website looks like for you. 30 minutes. No pressure.",
  },
  {
    step: "02",
    title: "Strategy & Wireframes",
    desc: "I map out every page with conversion in mind — what goes where, what each section does, and how visitors become customers.",
  },
  {
    step: "03",
    title: "Design & Build",
    desc: "Your site gets designed and built on a modern, fast, secure stack. You review at every stage. Nothing launches without your sign-off.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    desc: "We go live, connect analytics, and start tracking results. I keep optimizing based on real visitor data.",
  },
];

const testimonials = [
  {
    quote: "Within three weeks of launching, we had more consultation requests than the previous two months combined. The site pays for itself every single month.",
    name: "Sarah Mitchell",
    business: "Mitchell Family Law",
    result: "3x more consultations",
  },
  {
    quote: "I was skeptical another website would make a difference. Then I saw the call volume. Scott built something that actually works for our kind of business.",
    name: "James Kowalski",
    business: "Kowalski Plumbing & HVAC",
    result: "47% more phone calls",
  },
  {
    quote: "Our old site looked fine but did nothing. The new one ranks on the first page for four of our target keywords. Patients are finding us.",
    name: "Dr. Lisa Chen",
    business: "Lakeside Family Dental",
    result: "Page 1 for 4 keywords",
  },
];

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Most projects fall between $2,500 and $7,500 depending on the number of pages, custom features, and whether you need ongoing support. I'll give you an exact quote after our discovery call.",
  },
  {
    q: "How long does it take to build?",
    a: "Typically 3–5 weeks from kickoff to launch. Complex sites with custom functionality may take 6–8 weeks. I'll give you a timeline before we start.",
  },
  {
    q: "Do I need to provide content?",
    a: "You know your business best, so I'll need your input — but I handle the structure, layout, and can help refine your copy for conversion. You won't be staring at a blank page.",
  },
  {
    q: "What if I already have a website?",
    a: "Most of my clients do. I'll audit your current site, identify what's working and what's not, and build something better. We can keep your domain and redirect everything seamlessly.",
  },
  {
    q: "Do you offer hosting and maintenance?",
    a: "Yes. I offer monthly plans that include hosting on fast, secure infrastructure, SSL certificates, performance monitoring, content updates, and priority support.",
  },
  {
    q: "What makes you different from other web designers?",
    a: "I don't just make things look good — I build sites that perform. Every design decision is backed by conversion principles. I also deploy on enterprise-grade AWS infrastructure, not shared hosting.",
  },
];

const whyReasons = [
  {
    title: "Conversion-first design",
    desc: "Every layout, headline, and button placement is intentional. Your site isn't a brochure — it's a sales tool.",
  },
  {
    title: "Enterprise-grade infrastructure",
    desc: "Your site runs on AWS with a global CDN, free SSL, and 99.99% uptime. The same infrastructure Fortune 500 companies use.",
  },
  {
    title: "One person, full accountability",
    desc: "You work directly with me. No account managers, no handoffs, no \"I'll check with the team.\" Fast communication, fast decisions.",
  },
  {
    title: "Built for speed",
    desc: "Slow sites lose customers. Every site I build loads in under 3 seconds and scores 90+ on Google PageSpeed.",
  },
  {
    title: "Local business expertise",
    desc: "I've built sites for law firms, clinics, contractors, and service businesses. I understand what makes your customers pick up the phone.",
  },
  {
    title: "No lock-in, no surprises",
    desc: "You own your site and your domain. Transparent pricing, clear timelines, and no hidden fees.",
  },
];

export default function Home() {
  return (
    <div className="bg-cream min-h-screen">
      {/* ── Navigation ── */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-ink font-serif text-xl font-bold tracking-tightest">Ivan</span>
          <span className="text-body font-sans text-sm">Digital</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-body text-sm hover:text-ink transition-colors">Services</a>
          <a href="#work" className="text-body text-sm hover:text-ink transition-colors">Work</a>
          <a href="#process" className="text-body text-sm hover:text-ink transition-colors">Process</a>
          <a href="#faq" className="text-body text-sm hover:text-ink transition-colors">FAQ</a>
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2.5 bg-ink text-cream hover:bg-accent transition-colors"
          >
            Book a Free Call
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-4xl">
          <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-6">
            Websites for local businesses
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ink leading-[1.05] tracking-tightest mb-8">
            Your website should be your best
            <span className="italic"> salesperson</span>
          </h1>
          <p className="text-body text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            Most local business websites look decent but do nothing.
            I build websites that actually generate calls, leads, and bookings —
            so your online presence works as hard as you do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-block text-center font-semibold px-8 py-4 bg-accent text-white text-sm hover:bg-accent-hover transition-colors"
            >
              Book a Free Strategy Call
            </a>
            <a
              href="#work"
              className="inline-block text-center font-semibold px-8 py-4 border-2 border-ink text-ink text-sm hover:bg-ink hover:text-cream transition-colors"
            >
              See the Results
            </a>
          </div>
        </div>
      </section>

      <hr className="section-rule max-w-6xl mx-auto" />

      {/* ── Trust Strip ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {results.map(({ metric, label }) => (
            <div key={label}>
              <div className="font-serif text-4xl md:text-5xl text-ink tracking-tightest font-bold">
                {metric}
              </div>
              <p className="text-body text-sm mt-2 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-rule max-w-6xl mx-auto" />

      {/* ── Problem / Agitate ── */}
      <section className="bg-dark-surface text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-6">
              The problem
            </p>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tightest mb-8">
              Your competitors are getting the customers that should be yours
            </h2>
            <div className="space-y-6 text-dark-body text-lg leading-relaxed">
              <p>
                Right now, someone in your area is searching for exactly what you offer.
                They&apos;ll click the first few results, glance at each site for about
                three seconds, and choose the business that looks the most trustworthy.
              </p>
              <p>
                If your website is slow, outdated, or doesn&apos;t clearly tell visitors
                what to do next — they leave. They don&apos;t call. They don&apos;t book.
                They go to your competitor.
              </p>
              <p className="text-white font-semibold">
                It doesn&apos;t have to be that way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-16">
          <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-4">
            Services
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink tracking-tightest max-w-2xl">
            Everything you need to turn your website into a growth engine
          </h2>
        </div>
        <div className="space-y-0">
          {services.map(({ num, title, desc }, i) => (
            <div key={num}>
              {i > 0 && <hr className="section-rule" />}
              <div className="grid md:grid-cols-12 gap-6 py-10">
                <div className="md:col-span-1">
                  <span className="font-sans text-sm text-rule font-semibold">{num}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl text-ink tracking-tightest">{title}</h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-body text-base leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-rule max-w-6xl mx-auto" />

      {/* ── Featured Work / Transformations ── */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-16">
          <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-4">
            Results
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink tracking-tightest max-w-3xl">
            Real businesses. Real results. Real revenue.
          </h2>
        </div>

        <div className="space-y-16">
          {testimonials.map(({ quote, name, business, result }) => (
            <div key={name} className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3">
                <div className="bg-warm border border-rule aspect-[4/3] flex items-center justify-center">
                  <span className="text-rule text-sm font-sans">Client photo</span>
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="inline-block px-3 py-1 bg-accent-soft text-accent text-xs font-semibold mb-4">
                  {result}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl text-ink leading-relaxed tracking-tightest mb-6">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-ink font-semibold text-sm">{name}</p>
                  <p className="text-body text-sm">{business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-warm py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-4">
              Why us
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-ink tracking-tightest max-w-3xl">
              Why local businesses choose to work with me
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {whyReasons.map(({ title, desc }) => (
              <div key={title}>
                <h3 className="text-ink font-semibold text-base mb-2">{title}</h3>
                <p className="text-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="mb-16">
          <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-4">
            Process
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink tracking-tightest max-w-2xl">
            From first call to first customer — in weeks, not months
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {process.map(({ step, title, desc }) => (
            <div key={step} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 border-2 border-ink flex items-center justify-center">
                  <span className="font-sans text-sm font-bold text-ink">{step}</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl text-ink tracking-tightest mb-2">{title}</h3>
                <p className="text-body text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-rule max-w-6xl mx-auto" />

      {/* ── FAQ ── */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-4">
              FAQ
            </p>
            <h2 className="font-serif text-3xl text-ink tracking-tightest">
              Common questions
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="divide-y divide-rule">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group">
                  <summary className="flex items-center justify-between py-6 cursor-pointer">
                    <span className="text-ink font-semibold text-base pr-8">{q}</span>
                    <span className="faq-icon text-body text-2xl leading-none flex-shrink-0">+</span>
                  </summary>
                  <div className="pb-6 text-body text-sm leading-relaxed max-w-2xl">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="contact" className="bg-dark-surface text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-sans text-sm font-semibold tracking-section uppercase mb-6">
              Let&apos;s talk
            </p>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.1] mb-6">
              Ready for a website that actually works?
            </h2>
            <p className="text-dark-body text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Book a free 30-minute strategy call. I&apos;ll audit your current site,
              show you where you&apos;re losing customers, and outline exactly how to fix it.
              No obligation.
            </p>
            <a
              href="mailto:hello@scottivan.com"
              className="inline-block font-semibold px-10 py-4 bg-accent text-white text-sm hover:bg-accent-hover transition-colors"
            >
              Book Your Free Strategy Call
            </a>
            <p className="text-dark-body text-xs mt-6">
              Or email directly: hello@scottivan.com
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-6xl mx-auto px-6 py-12">
        <hr className="section-rule mb-12" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-serif text-xl text-ink font-bold tracking-tightest">Ivan</span>
            <span className="text-body text-sm ml-2">Digital</span>
            <p className="text-body text-xs mt-2">
              Conversion-focused websites for local businesses.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-body text-sm">
            <a href="#services" className="hover:text-ink transition-colors">Services</a>
            <a href="#work" className="hover:text-ink transition-colors">Work</a>
            <a href="#process" className="hover:text-ink transition-colors">Process</a>
            <a href="#faq" className="hover:text-ink transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
          </div>
        </div>
        <p className="text-body text-xs mt-8">
          &copy; {new Date().getFullYear()} Ivan Digital. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
