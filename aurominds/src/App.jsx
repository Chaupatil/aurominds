import { useState, useEffect, useRef } from "react";

// ── Utility: simple intersection observer hook ──────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Leaf SVG decoration ─────────────────────────────────────────────────────
const LeafDeco = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 78 C30 78 5 55 5 30 C5 10 18 2 30 2 C42 2 55 10 55 30 C55 55 30 78 30 78Z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path
      d="M30 78 L30 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M30 40 L18 28"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M30 52 L42 40"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

// ── Animated grain texture overlay ─────────────────────────────────────────
const GrainOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[999] opacity-[0.025]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    }}
  />
);

// ── Nav ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Services", "Features", "Contact"];
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0d2818]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4ade80] to-[#16a34a] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-black text-sm">AI</span>
          </div>
          <span className="font-black text-xl tracking-tight text-white">
            AI <span className="text-[#4ade80]">AUROMINDS</span>
          </span>
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-white/70 hover:text-[#4ade80] text-sm font-medium tracking-wide transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#4ade80] after:transition-all hover:after:w-full"
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gradient-to-r from-[#4ade80] to-[#16a34a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300 hover:scale-105"
          >
            Get Started
          </a>
        </div>
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
        >
          <div
            className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-[#0d2818]/98 px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-[#4ade80] font-medium py-1 transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#071a0e]"
    >
      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#16a34a]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4ade80]/10 blur-[100px]" />
      </div>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#4ade80 1px,transparent 1px),linear-gradient(90deg,#4ade80 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Floating leaves */}
      <LeafDeco className="absolute top-20 right-[10%] w-24 text-[#4ade80] animate-[float_8s_ease-in-out_infinite]" />
      <LeafDeco className="absolute bottom-32 left-[8%] w-16 text-[#16a34a] animate-[float_6s_ease-in-out_infinite_2s]" />
      <LeafDeco className="absolute top-1/2 right-[20%] w-12 text-[#4ade80]/50 animate-[float_10s_ease-in-out_infinite_1s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-[#4ade80] text-xs font-semibold tracking-widest uppercase">
              AI-Powered Agrotech
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
            Transforming
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#86efac]">
              Agriculture
            </span>
            <br />
            with Intelligent
            <br />
            Technology
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
            One digital ecosystem connecting soil, food, and life — from farm
            intelligence to consumer transparency through AI-driven insights.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="bg-gradient-to-r from-[#16a34a] to-[#4ade80] text-white font-bold px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300 hover:scale-105"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:border-[#4ade80]/50 transition-all duration-300"
            >
              Contact Us →
            </a>
          </div>
          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-8 border-t border-white/10">
            {[
              ["3", "Platforms"],
              ["100%", "Traceable"],
              ["AI", "Powered"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl font-black text-[#4ade80]">{n}</div>
                <div className="text-white/50 text-sm font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Visual: ecosystem circle */}
        <div className="flex items-center justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-[#4ade80]/20 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-[#4ade80]/15 animate-[spin_20s_linear_infinite_reverse]" />
            {/* Glow center */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#16a34a]/30 to-[#0d2818] border border-[#4ade80]/30 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(74,222,128,0.2)]">
              <span className="text-5xl mb-2">🌱</span>
              <span className="text-[#4ade80] font-black text-lg">AI</span>
              <span className="text-white/60 text-xs tracking-widest">
                AUROMINDS
              </span>
            </div>
            {/* Orbiting nodes */}
            {[
              { icon: "🌾", label: "Soil", angle: 0 },
              { icon: "📦", label: "Trade", angle: 120 },
              { icon: "🧬", label: "Life", angle: 240 },
            ].map(({ icon, label, angle }) => {
              const rad = (angle - 90) * (Math.PI / 180);
              const r = 46;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              return (
                <div
                  key={label}
                  className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 bg-[#0d2818] border border-[#4ade80]/40 rounded-full flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-[9px] text-[#4ade80] font-semibold">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#071a0e] to-transparent" />
    </section>
  );
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" className="bg-[#071a0e] py-28 overflow-hidden">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center"
      >
        {/* Left visual */}
        <div
          className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}
        >
          <div className="relative">
            {/* Main card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0f3320] to-[#071a0e] border border-[#4ade80]/20 p-8 shadow-2xl">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-white font-black text-2xl mb-3">
                One Ecosystem
              </h3>
              <p className="text-white/50 leading-relaxed">
                Every crop journey, trade transaction, and life milestone —
                connected through AI for unprecedented transparency and growth.
              </p>
              {/* Mini metrics */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  ["🌾 PlotFarm", "Soil to Crops"],
                  ["📦 Trace2Trade", "Farm to Market"],
                  ["🧬 TraceMyLife", "Life Tracker"],
                  ["🤖 AI Engine", "Real-time Insights"],
                ].map(([t, s]) => (
                  <div
                    key={t}
                    className="bg-[#4ade80]/5 border border-[#4ade80]/10 rounded-xl p-3"
                  >
                    <div className="text-white text-sm font-bold">{t}</div>
                    <div className="text-white/40 text-xs">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#4ade80] to-[#16a34a] text-white px-4 py-2 rounded-2xl shadow-xl font-bold text-sm">
              EST. 2026
            </div>
          </div>
        </div>
        {/* Right text */}
        <div
          className={`transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
        >
          <div className="inline-flex items-center gap-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#4ade80] text-xs font-semibold tracking-widest uppercase">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            Building a Digital
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#86efac]">
              Agrotech Ecosystem
            </span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            AI Aurominds is pioneering the convergence of artificial
            intelligence and agriculture. We build digital platforms that unite
            farming, trade, and human well-being into a single transparent
            ecosystem.
          </p>
          <p className="text-white/60 leading-relaxed mb-10">
            Our technology empowers farmers with precision insights, gives
            traders end-to-end visibility, and connects consumers directly to
            the origin of what they eat — creating trust, sustainability, and
            growth at every node.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                text: "Democratize agricultural intelligence for every farmer, trader, and consumer worldwide.",
              },
              {
                icon: "🔭",
                title: "Our Vision",
                text: "A world where food systems are transparent, sustainable, and driven by data.",
              },
            ].map(({ icon, title, text }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#4ade80]/30 transition-colors duration-300"
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-white font-bold mb-1">{title}</div>
                <div className="text-white/50 text-sm leading-relaxed">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🌾",
    gradient: "from-[#16a34a] to-[#4ade80]",
    glow: "rgba(74,222,128,0.3)",
    title: "PlotFarm",
    subtitle: "Soil to Crops",
    description:
      "AI-driven smart farming insights — from geo-tagged soil testing and crop planning to yield optimization and harvest tracking.",
    features: [
      "Geo-tagged soil analysis",
      "AI crop recommendations",
      "Yield prediction",
      "Farm activity logs",
    ],
  },
  {
    icon: "📦",
    gradient: "from-[#ca8a04] to-[#fbbf24]",
    glow: "rgba(251,191,36,0.3)",
    title: "Trace2Trade",
    subtitle: "Commodity Traceability",
    description:
      "End-to-end supply chain transparency from farm gate to processing facility, powered by QR identity and blockchain-ready transaction tracking.",
    features: [
      "Farm-to-market tracking",
      "QR product identity",
      "Supply chain visibility",
      "Trade flow analytics",
    ],
  },
  {
    icon: "🧬",
    gradient: "from-[#0891b2] to-[#22d3ee]",
    glow: "rgba(34,211,238,0.3)",
    title: "TraceMyLife",
    subtitle: "Human Growth & Lifestyle",
    description:
      "Personalized consumer traceability — trace your food to its origin while tracking your health milestones and environmental footprint.",
    features: [
      "Farm-to-table visibility",
      "Milestone & health tracking",
      "Environmental insights",
      "Personalized guidance",
    ],
  },
];

function Services() {
  const [ref, inView] = useInView();
  return (
    <section
      id="services"
      className="bg-gradient-to-b from-[#071a0e] to-[#0a2212] py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#4ade80] text-xs font-semibold tracking-widest uppercase">
              Our Platforms
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Three Platforms,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#86efac]">
              One Ecosystem
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Each platform is purpose-built yet deeply interconnected —
            intelligence flows seamlessly from soil to consumer.
          </p>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`group relative bg-[#0d2818] border border-white/10 rounded-3xl p-8 hover:border-transparent transition-all duration-500 cursor-default
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
              style={{
                transitionDelay: inView ? `${i * 150}ms` : "0ms",
                transitionProperty:
                  "opacity, transform, border-color, box-shadow",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 1px ${s.glow.replace("0.3", "0.6")}, 0 24px 60px ${s.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {s.icon}
              </div>
              {/* Titles */}
              <div
                className={`text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r ${s.gradient} mb-1`}
              >
                {s.subtitle}
              </div>
              <h3 className="text-white font-black text-2xl mb-4">{s.title}</h3>
              <p className="text-white/50 leading-relaxed mb-6 text-sm">
                {s.description}
              </p>
              {/* Features */}
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.gradient} flex-shrink-0`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              {/* Hover arrow */}
              <div className="mt-8 flex items-center gap-2 text-white/30 group-hover:text-white/70 transition-colors duration-300 text-sm font-semibold">
                Learn more{" "}
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "🤖",
    title: "AI-Driven Insights",
    text: "Machine learning models analyse soil, weather, and market data in real time to give precision recommendations at every stage.",
  },
  {
    icon: "♻️",
    title: "Sustainability Focus",
    text: "Every platform decision is guided by reducing waste, conserving resources, and promoting regenerative agricultural practices.",
  },
  {
    icon: "🔍",
    title: "Data Transparency",
    text: "Immutable audit trails and QR-based provenance give every stakeholder — farmer, trader, consumer — verifiable truth.",
  },
  {
    icon: "📈",
    title: "Scalable Solutions",
    text: "From a single smallholder plot to multi-national supply chains, our infrastructure scales without compromising speed or accuracy.",
  },
  {
    icon: "🔗",
    title: "Connected Ecosystem",
    text: "Data flows seamlessly between PlotFarm, Trace2Trade, and TraceMyLife — no silos, no gaps, total picture.",
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    text: "Bank-grade encryption, role-based access, and compliance-ready architecture protect every data point end-to-end.",
  },
];

function Features() {
  const [ref, inView] = useInView();
  return (
    <section id="features" className="bg-[#0a2212] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#4ade80] text-xs font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Built for the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#86efac]">
              Future of Farming
            </span>
          </h2>
        </div>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-[#4ade80]/5 hover:border-[#4ade80]/30 transition-all duration-500 group
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
        {/* Supply chain visual */}
        <div className="mt-20 bg-gradient-to-br from-[#0f3320] to-[#071a0e] border border-[#4ade80]/20 rounded-3xl p-10 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4ade80]/5 rounded-full blur-3xl" />
          <h3 className="text-white font-black text-2xl md:text-3xl mb-3">
            Farm to Processing: A Transparent Journey
          </h3>
          <p className="text-white/50 mb-10">
            Every step tracked, verified, and visible to all stakeholders.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "🌱 Soil Analysis",
              "🗺️ Crop Mapping",
              "✅ Harvest Check",
              "🚛 Supply Chain",
              "🛒 Consumer Access",
              "♻️ Sustainable Resource",
            ].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-4">
                <div className="bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-xl px-4 py-3 text-white text-sm font-semibold whitespace-nowrap hover:bg-[#4ade80]/20 transition-colors duration-300">
                  {step}
                </div>
                {i < arr.length - 1 && (
                  <span className="text-[#4ade80]/40 font-bold">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#0a2212] to-[#071a0e] py-28"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#4ade80] text-xs font-semibold tracking-widest uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's Grow
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#86efac]">
              Together
            </span>
          </h2>
          <p className="text-white/50 text-lg">
            Ready to transform your agricultural operations? We'd love to hear
            from you.
          </p>
        </div>
        <div
          ref={ref}
          className={`grid lg:grid-cols-5 gap-10 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: "📧", label: "Email", value: "hello@aiaurominds.com" },
              { icon: "📍", label: "Location", value: "Bengaluru, India" },
              { icon: "🕐", label: "Response", value: "Within 24 hours" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-[#4ade80]/30 transition-colors duration-300"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-0.5">
                    {label}
                  </div>
                  <div className="text-white font-medium">{value}</div>
                </div>
              </div>
            ))}
            {/* Social */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <div className="text-white/40 text-xs uppercase tracking-widest mb-3">
                Follow Us
              </div>
              <div className="flex gap-3">
                {[
                  ["🐦", "Twitter"],
                  ["💼", "LinkedIn"],
                  ["📷", "Instagram"],
                ].map(([ico, name]) => (
                  <button
                    key={name}
                    title={name}
                    className="w-10 h-10 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-center justify-center hover:bg-[#4ade80]/20 hover:scale-110 transition-all duration-300 text-lg"
                  >
                    {ico}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="lg:col-span-3 bg-[#0d2818] border border-white/10 rounded-3xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-10">
                <div className="text-6xl">🌱</div>
                <h3 className="text-white font-black text-2xl">
                  Message Sent!
                </h3>
                <p className="text-white/50">
                  We'll be in touch within 24 hours. Let's grow something
                  amazing together.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-[#4ade80] text-sm font-semibold hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  {
                    name: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Your full name",
                  },
                  {
                    name: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "you@example.com",
                  },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block text-white/60 text-sm font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      required
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4ade80]/50 focus:bg-[#4ade80]/5 transition-all duration-300"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your needs..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#4ade80]/50 focus:bg-[#4ade80]/5 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#16a34a] to-[#4ade80] text-white font-bold py-4 rounded-xl hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] hover:scale-[1.02] transition-all duration-300"
                >
                  Send Message 🌱
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#040f08] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4ade80] to-[#16a34a] flex items-center justify-center">
                <span className="text-white font-black text-sm">AI</span>
              </div>
              <span className="font-black text-xl text-white">
                AI <span className="text-[#4ade80]">AUROMINDS</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Transforming agriculture with intelligent technology. One
              ecosystem connecting soil, food, and life.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <div className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Quick Links
            </div>
            <ul className="space-y-3">
              {["About", "Services", "Features", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-white/40 hover:text-[#4ade80] text-sm transition-colors duration-300"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Platforms */}
          <div>
            <div className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              Platforms
            </div>
            <ul className="space-y-3">
              {["PlotFarm", "Trace2Trade", "TraceMyLife"].map((p) => (
                <li key={p}>
                  <a
                    href="#services"
                    className="text-white/40 hover:text-[#4ade80] text-sm transition-colors duration-300"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2026 AI Aurominds. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Built with 🌱 for a sustainable future
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="font-sans antialiased"
      style={{ fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(3deg)} }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #071a0e; }
        ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 3px; }
      `}</style>
      <GrainOverlay />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}
