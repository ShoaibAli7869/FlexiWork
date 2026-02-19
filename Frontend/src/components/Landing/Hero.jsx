// src/components/landing/Hero.jsx
import { useEffect, useRef, useMemo, useCallback } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Play,
  Shield,
  Clock,
  Sparkles,
  Star,
  Users,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";

/* ─── Static Data (hoisted outside component) ─── */
const AVATARS = [
  { initial: "S", gradient: "from-primary-400 to-primary-600" },
  { initial: "A", gradient: "from-secondary-400 to-secondary-600" },
  { initial: "M", gradient: "from-accent-400 to-accent-600" },
  { initial: "J", gradient: "from-primary-300 to-secondary-500" },
  { initial: "K", gradient: "from-secondary-300 to-accent-500" },
];

const STATS = [
  { value: "50K+", label: "Freelancers", icon: Users },
  { value: "$18M+", label: "Paid Out", icon: TrendingUp },
  { value: "120+", label: "Countries", icon: Globe },
];

const DASHBOARD_STATS = [
  {
    icon: Users,
    label: "Active Projects",
    value: "12",
    change: "+3 this week",
    color: "primary",
  },
  {
    icon: Clock,
    label: "Avg. Match Time",
    value: "2.4 hrs",
    change: "38% faster",
    color: "secondary",
  },
  {
    icon: Shield,
    label: "Total Earned",
    value: "$24,580",
    change: "+$3,200 this month",
    color: "accent",
  },
];

const MATCHES = [
  {
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    match: 98,
    rate: "$85/hr",
    gradient: "from-primary-400 to-primary-600",
    projects: 142,
  },
  {
    name: "Alex Rivera",
    role: "UI/UX Designer",
    match: 94,
    rate: "$72/hr",
    gradient: "from-secondary-400 to-secondary-600",
    projects: 89,
  },
  {
    name: "James Okafor",
    role: "DevOps Engineer",
    match: 91,
    rate: "$95/hr",
    gradient: "from-accent-400 to-accent-600",
    projects: 67,
  },
];

const TRUSTED_BY = ["Vercel", "Stripe", "Linear", "Notion", "Figma"];

/* ─── Sub-Components ─── */

const AvatarStack = () => (
  <div className="flex -space-x-2">
    {AVATARS.map(({ initial, gradient }, i) => (
      <div
        key={i}
        className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient}
                   flex items-center justify-center text-white text-xs font-bold
                   ring-2 ring-bg transition-transform duration-300 hover:scale-110 hover:z-10`}
      >
        {initial}
      </div>
    ))}
  </div>
);

const StarRating = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }, (_, i) => (
      <Star key={i} className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
    ))}
  </div>
);

const MatchBar = ({ percentage }) => (
  <div
    className="h-1.5 rounded-full overflow-hidden flex-1"
    style={{ background: "var(--theme-bg-tertiary)" }}
  >
    <div
      className="h-full rounded-full relative overflow-hidden"
      style={{
        width: `${percentage}%`,
        background:
          "linear-gradient(90deg, var(--brand-primary-500), var(--brand-secondary-400))",
        transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="absolute inset-0 animate-shine"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  </div>
);

const LiveIndicator = () => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
    style={{
      background: "var(--theme-badge-secondary-bg)",
      border: "1px solid var(--theme-badge-secondary-border)",
      color: "var(--theme-badge-secondary-text)",
    }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary-500" />
    </span>
    Live
  </span>
);

/* ─── Main Component ─── */

const Hero = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const socialProofRef = useRef(null);
  const visualRef = useRef(null);
  const badgeRef = useRef(null);
  const trustedRef = useRef(null);

  const initAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      // Set initial states to prevent flash
      gsap.set(
        [
          badgeRef.current,
          subRef.current,
          socialProofRef.current,
          visualRef.current,
          trustedRef.current,
        ].filter(Boolean),
        { opacity: 0 },
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", force3D: true },
        delay: 0.2,
      });

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
      );

      // Heading words — staggered word reveal
      const words = headingRef.current?.querySelectorAll(".hero-word");
      if (words?.length) {
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 60,
            rotateX: 15,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.07,
          },
          "-=0.3",
        );
      }

      // Subtitle
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5",
      );

      // CTAs
      const ctaChildren = ctaRef.current?.children;
      if (ctaChildren?.length) {
        tl.fromTo(
          ctaChildren,
          { opacity: 0, y: 20, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );
      }

      // Social proof
      tl.fromTo(
        socialProofRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      );

      // Trusted by
      tl.fromTo(
        trustedRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2",
      );

      // Dashboard visual
      tl.fromTo(
        visualRef.current,
        { opacity: 0, y: 50, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power2.out" },
        "-=0.7",
      );

      // Continuous floating for orbs
      gsap.to(".hero-orb-1", {
        y: -25,
        x: 15,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-orb-2", {
        y: 20,
        x: -10,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
      gsap.to(".hero-orb-3", {
        y: -15,
        x: -20,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cleanup = initAnimations();
    return cleanup;
  }, [initAnimations]);

  // Memoize static UI pieces
  const headingContent = useMemo(
    () => (
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.02em] leading-[1.05]"
        style={{ perspective: "600px" }}
      >
        <span className="hero-word inline-block text-text-primary">
          Where&nbsp;
        </span>
        <span className="hero-word inline-block text-gradient">
          Top Talent&nbsp;
        </span>
        <br className="hidden sm:block" />
        <span className="hero-word inline-block text-text-primary">
          Meets&nbsp;
        </span>
        <span className="hero-word inline-block text-text-primary">
          Great&nbsp;
        </span>
        <span className="hero-word inline-block text-text-primary">Work</span>
      </h1>
    ),
    [],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden hero-bg"
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Animated orbs */}
        <div className="hero-orb-1 absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full orb-primary blur-[160px]" />
        <div className="hero-orb-2 absolute bottom-[-15%] right-[10%] w-[500px] h-[500px] rounded-full orb-secondary blur-[140px]" />
        <div className="hero-orb-3 absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full orb-accent blur-[160px]" />

        {/* Subtle radial spotlight */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, var(--theme-orb-primary), transparent 70%)",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* ════ Centered Content ════ */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <div ref={badgeRef} className="mb-8 flex justify-center">
            <a
              href="#features"
              className="group inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full
                         cursor-pointer transition-all duration-300
                         hover:scale-[1.02]"
              style={{
                background: "var(--theme-badge-primary-bg)",
                border: "1px solid var(--theme-badge-primary-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--theme-border-accent-strong)";
                e.currentTarget.style.boxShadow = "var(--theme-shadow-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--theme-badge-primary-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                }}
              >
                <Sparkles className="w-3 h-3" />
                New
              </span>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                AI-Powered Smart Matching
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all duration-200" />
            </a>
          </div>

          {/* Heading */}
          <div ref={headingRef}>{headingContent}</div>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="mt-7 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto"
          >
            Connect with{" "}
            <span className="text-text-primary font-semibold">
              verified freelancers
            </span>
            , pay securely with{" "}
            <span className="text-text-primary font-semibold">
              instant payouts
            </span>
            , and let{" "}
            <span className="text-text-primary font-semibold">
              AI match you
            </span>{" "}
            with the perfect talent — all with just a{" "}
            <span
              className="font-bold"
              style={{ color: "var(--brand-secondary-500)" }}
            >
              5% fee
            </span>
            .
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              className="group relative px-8 py-4 rounded-2xl font-bold text-base
                         cursor-pointer overflow-hidden transition-all duration-300
                         hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                color: "var(--theme-text-on-primary)",
                boxShadow: "0 4px 20px rgba(108, 59, 247, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 35px rgba(108, 59, 247, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(108, 59, 247, 0.25)";
              }}
            >
              {/* Hover shine */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary-400), var(--brand-secondary-500))",
                }}
              />
              <span className="relative z-10 flex items-center gap-2.5">
                Get Started Free
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            <button
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-base
                         cursor-pointer transition-all duration-300
                         text-text-primary
                         hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "transparent",
                border: "1px solid var(--theme-border-default)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--theme-border-strong)";
                e.currentTarget.style.background = "var(--theme-surface-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--theme-border-default)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center
                           transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "var(--theme-stat-icon-bg)",
                  border: "1px solid var(--theme-badge-primary-border)",
                }}
              >
                <Play className="w-4 h-4 text-primary-500 ml-0.5" />
              </span>
              See How It Works
            </button>
          </div>

          {/* ════ Social Proof ════ */}
          <div
            ref={socialProofRef}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8"
          >
            {/* Avatars + Rating */}
            <div className="flex items-center gap-3">
              <AvatarStack />
              <div className="text-left">
                <StarRating />
                <p className="text-text-tertiary text-sm mt-0.5">
                  <span className="text-text-primary font-bold">4,200+</span>{" "}
                  reviews
                </p>
              </div>
            </div>

            <div
              className="hidden sm:block w-px h-10"
              style={{ background: "var(--theme-border-default)" }}
            />

            {/* Key Stats */}
            <div className="flex items-center gap-5 sm:gap-7">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group flex items-center gap-2.5 cursor-default"
                >
                  {i > 0 && (
                    <div
                      className="hidden sm:block w-px h-8 mr-2"
                      style={{ background: "var(--theme-border-subtle)" }}
                    />
                  )}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center
                               group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "var(--theme-stat-icon-bg)" }}
                  >
                    <stat.icon className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <div className="text-text-primary font-bold text-base leading-none">
                      {stat.value}
                    </div>
                    <div className="text-text-muted text-[11px] mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted By */}
          <div
            ref={trustedRef}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <p className="text-text-muted text-[11px] font-medium uppercase tracking-[0.15em]">
              Trusted by teams at
            </p>
            <div className="flex items-center gap-8 sm:gap-10 flex-wrap justify-center">
              {TRUSTED_BY.map((company) => (
                <span
                  key={company}
                  className="text-text-muted font-bold text-sm tracking-wide
                             opacity-40 hover:opacity-70 transition-opacity duration-300
                             cursor-default select-none"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ════ Dashboard Visual ════ */}
        <div
          ref={visualRef}
          className="mt-16 sm:mt-20 max-w-5xl mx-auto relative"
        >
          {/* Main card */}
          <div
            className="rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              background: "var(--theme-surface-card)",
              border: "1px solid var(--theme-border-default)",
              boxShadow: "var(--theme-shadow-xl)",
            }}
          >
            {/* Browser Chrome */}
            <div
              className="flex items-center gap-3 px-4 sm:px-5 py-3"
              style={{ borderBottom: "1px solid var(--theme-border-subtle)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger-400/50 hover:bg-danger-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-accent-400/50 hover:bg-accent-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-secondary-400/50 hover:bg-secondary-400 transition-colors" />
              </div>
              <div
                className="flex-1 mx-2 sm:mx-4 h-7 rounded-lg flex items-center justify-center gap-2"
                style={{ background: "var(--theme-bg-tertiary)" }}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "var(--theme-border-default)" }}
                />
                <span className="text-text-muted text-xs font-medium hidden sm:inline">
                  app.flexiwork.io/dashboard
                </span>
                <span className="text-text-muted text-xs font-medium sm:hidden">
                  flexiwork.io
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: "var(--theme-surface-hover)" }}
                >
                  <Zap className="w-3 h-3 text-text-muted" />
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {DASHBOARD_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="group rounded-xl sm:rounded-2xl p-4 flex items-start gap-3
                               transition-all duration-300 cursor-default"
                    style={{
                      background: "var(--theme-surface-muted)",
                      border: "1px solid var(--theme-border-subtle)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--theme-border-default)";
                      e.currentTarget.style.boxShadow =
                        "var(--theme-shadow-sm)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "var(--theme-border-subtle)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `var(--theme-feature-icon-${stat.color}-bg)`,
                      }}
                    >
                      <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-text-muted text-xs">{stat.label}</p>
                      <p className="text-text-primary font-bold text-xl mt-0.5 leading-tight">
                        {stat.value}
                      </p>
                      <p
                        className="text-xs font-semibold mt-1"
                        style={{ color: "var(--brand-secondary-500)" }}
                      >
                        {stat.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Matches Panel */}
              <div
                className="rounded-xl sm:rounded-2xl overflow-hidden"
                style={{
                  background: "var(--theme-surface-muted)",
                  border: "1px solid var(--theme-border-subtle)",
                }}
              >
                {/* Panel Header */}
                <div
                  className="flex items-center justify-between px-4 sm:px-5 py-3.5"
                  style={{
                    borderBottom: "1px solid var(--theme-border-subtle)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: "var(--theme-feature-icon-primary-bg)",
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                    </div>
                    <span className="text-text-primary font-semibold text-sm">
                      Top AI Matches
                    </span>
                  </div>
                  <LiveIndicator />
                </div>

                {/* Match List */}
                <div className="p-3 sm:p-4 space-y-2">
                  {MATCHES.map((person, idx) => (
                    <div
                      key={person.name}
                      className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl
                                 transition-all duration-300 cursor-default"
                      style={{
                        background:
                          idx === 0
                            ? "var(--theme-comparison-highlight-bg)"
                            : "var(--theme-surface-card)",
                        border: `1px solid ${idx === 0 ? "var(--theme-comparison-highlight-border)" : "var(--theme-border-subtle)"}`,
                      }}
                      onMouseEnter={(e) => {
                        if (idx !== 0) {
                          e.currentTarget.style.borderColor =
                            "var(--theme-border-default)";
                          e.currentTarget.style.background =
                            "var(--theme-surface-card-hover)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (idx !== 0) {
                          e.currentTarget.style.borderColor =
                            "var(--theme-border-subtle)";
                          e.currentTarget.style.background =
                            "var(--theme-surface-card)";
                        }
                      }}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${person.gradient}
                                      flex items-center justify-center text-white text-xs font-bold
                                      group-hover:scale-105 transition-transform duration-300`}
                        >
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <CheckCircle2
                          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-secondary-500"
                          style={{
                            background: "var(--theme-surface-card)",
                            borderRadius: "50%",
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-text-primary text-sm font-semibold truncate">
                            {person.name}
                          </span>
                          {idx === 0 && (
                            <span
                              className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                              style={{
                                background: "var(--theme-badge-primary-bg)",
                                color: "var(--theme-badge-primary-text)",
                                border:
                                  "1px solid var(--theme-badge-primary-border)",
                              }}
                            >
                              Best Match
                            </span>
                          )}
                        </div>
                        <span className="text-text-muted text-xs">
                          {person.role} · {person.projects} projects
                        </span>
                      </div>

                      {/* Match Score + Rate */}
                      <div className="flex items-center gap-3 shrink-0">
                        {/* Match bar — hidden on small screens */}
                        <div className="hidden lg:flex items-center gap-2 w-28">
                          <MatchBar percentage={person.match} />
                        </div>

                        <div className="text-right">
                          <div className="text-text-primary text-sm font-bold">
                            {person.rate}
                          </div>
                          <div
                            className="text-xs font-bold"
                            style={{
                              color: "var(--brand-primary-500)",
                            }}
                          >
                            {person.match}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Panel Footer */}
                <div
                  className="px-4 sm:px-5 py-3 flex items-center justify-between"
                  style={{
                    borderTop: "1px solid var(--theme-border-subtle)",
                  }}
                >
                  <span className="text-text-muted text-xs">
                    Showing top 3 of{" "}
                    <span className="text-text-secondary font-semibold">
                      24 matches
                    </span>
                  </span>
                  <button
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer"
                    style={{ color: "var(--brand-primary-500)" }}
                  >
                    View all
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Glow behind dashboard */}
          <div
            className="absolute -inset-6 -z-10 rounded-[2rem] blur-3xl opacity-50"
            style={{ background: "var(--theme-orb-primary)" }}
            aria-hidden="true"
          />

          {/* Decorative corner accents */}
          <div
            className="absolute -top-3 -right-3 w-6 h-6 rounded-full blur-xl opacity-60"
            style={{ background: "var(--brand-primary-500)" }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full blur-xl opacity-40"
            style={{ background: "var(--brand-secondary-400)" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--theme-bg), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
