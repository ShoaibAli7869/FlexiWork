// src/components/landing/Problems.jsx
import { useEffect, useRef, memo, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DollarSign,
  Clock,
  ShieldAlert,
  TrendingDown,
  Frown,
  Lock,
  AlertTriangle,
  ArrowDown,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   STATIC DATA
   ════════════════════════════════════════════ */

const COLOR_CONFIG = Object.freeze({
  danger: Object.freeze({
    iconBg: "var(--theme-badge-danger-bg)",
    iconBorder: "var(--theme-badge-danger-border)",
    iconText: "var(--theme-badge-danger-text)",
    barFrom: "var(--brand-danger-500)",
    barTo: "var(--brand-danger-400)",
  }),
  accent: Object.freeze({
    iconBg: "var(--theme-badge-accent-bg)",
    iconBorder: "var(--theme-badge-accent-border)",
    iconText: "var(--theme-badge-accent-text)",
    barFrom: "var(--brand-accent-500)",
    barTo: "var(--brand-accent-400)",
  }),
});

const PROBLEMS = Object.freeze([
  Object.freeze({
    id: "fees",
    icon: DollarSign,
    title: "Outrageous Fees",
    description:
      "Platforms take 15–20% of your hard-earned money — nearly $1 out of every $5 you make goes straight to the platform.",
    stat: "20%",
    statLabel: "avg platform fee",
    color: "danger",
    impact: "You lose $20 on every $100 earned",
  }),
  Object.freeze({
    id: "payouts",
    icon: Clock,
    title: "Glacial Payouts",
    description:
      "Wait 14+ days for your money while the platform earns interest on it. Bills don't wait — why should your paycheck?",
    stat: "14+",
    statLabel: "days to get paid",
    color: "accent",
    impact: "2 weeks waiting on every project",
  }),
  Object.freeze({
    id: "reviews",
    icon: ShieldAlert,
    title: "Fake Reviews",
    description:
      "Fake reviews, inflated portfolios, and bot accounts erode trust across the entire ecosystem. You can't tell who's real.",
    stat: "30%",
    statLabel: "reviews are fake",
    color: "danger",
    impact: "1 in 3 reviews can't be trusted",
  }),
  Object.freeze({
    id: "underbidding",
    icon: TrendingDown,
    title: "Race to Bottom",
    description:
      "Bidding wars devalue quality work and systematically exploit talented freelancers who deserve fair compensation.",
    stat: "60%",
    statLabel: "feel underpaid",
    color: "accent",
    impact: "Majority of talent is undercompensated",
  }),
  Object.freeze({
    id: "disputes",
    icon: Frown,
    title: "Broken Disputes",
    description:
      "Automated systems and glacial support leave everyone frustrated when things go wrong. Resolution takes weeks.",
    stat: "45%",
    statLabel: "disputes unresolved",
    color: "danger",
    impact: "Nearly half of all conflicts go unsolved",
  }),
  Object.freeze({
    id: "lockin",
    icon: Lock,
    title: "Platform Lock-in",
    description:
      "Your reputation, reviews, and relationships are permanently trapped on one platform. Start over if you leave.",
    stat: "100%",
    statLabel: "non-portable",
    color: "accent",
    impact: "Zero data portability across platforms",
  }),
]);

const LOSS_DATA = Object.freeze([
  Object.freeze({
    label: "Platform Fees",
    amount: "$2.8B",
    percentage: 85,
    description: "Taken from freelancer earnings",
  }),
  Object.freeze({
    label: "Delayed Payments",
    amount: "$890M",
    percentage: 55,
    description: "Lost to interest & opportunity cost",
  }),
  Object.freeze({
    label: "Underbidding",
    amount: "$1.4B",
    percentage: 70,
    description: "Below fair market rates",
  }),
]);

const TOTAL_LOSS = "$5.1B";

/* ════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════ */

/* ── Animated Loss Bar ── */
const LossBar = memo(({ item, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: barRef.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          barRef.current,
          { width: "0%" },
          {
            width: `${item.percentage}%`,
            duration: 1.2,
            delay: index * 0.15,
            ease: "power2.out",
          },
        );
      },
    });

    return () => trigger.kill();
  }, [item.percentage, index]);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <div>
          <span className="text-text-tertiary text-xs font-medium">
            {item.label}
          </span>
          <span className="text-text-muted text-[10px] ml-1.5 hidden sm:inline">
            — {item.description}
          </span>
        </div>
        <span
          className="text-sm font-black"
          style={{ color: "var(--brand-danger-500)" }}
        >
          {item.amount}
        </span>
      </div>
      <div
        className="h-2.5 rounded-full overflow-hidden"
        style={{ background: "var(--theme-bg-tertiary)" }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: "0%",
            background:
              "linear-gradient(90deg, var(--brand-danger-500), var(--brand-accent-500))",
          }}
        >
          <div
            className="absolute inset-0 animate-shine"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
});
LossBar.displayName = "LossBar";

/* ── Stat Chip ── */
const StatChip = memo(({ stat, statLabel, colors }) => (
  <div
    className="shrink-0 px-3.5 py-2 rounded-xl text-center"
    style={{
      background: colors.iconBg,
      border: `1px solid ${colors.iconBorder}`,
    }}
  >
    <div
      className="text-xl font-black leading-none"
      style={{ color: colors.iconText }}
    >
      {stat}
    </div>
    <div className="text-text-muted text-[9px] font-medium mt-1 leading-tight">
      {statLabel}
    </div>
  </div>
));
StatChip.displayName = "StatChip";

/* ── Problem Icon ── */
const ProblemIcon = memo(({ icon: Icon, colors }) => (
  <div
    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
               group-hover:scale-110 transition-transform duration-300"
    style={{
      background: colors.iconBg,
      border: `1px solid ${colors.iconBorder}`,
    }}
  >
    <Icon className="w-[18px] h-[18px]" style={{ color: colors.iconText }} />
  </div>
));
ProblemIcon.displayName = "ProblemIcon";

/* ── Impact Line ── */
const ImpactLine = memo(({ text, colors }) => (
  <div
    className="mt-3 pt-3 flex items-center gap-2"
    style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
  >
    <AlertTriangle
      className="w-3 h-3 shrink-0"
      style={{ color: colors.iconText }}
    />
    <span className="text-text-muted text-xs">{text}</span>
  </div>
));
ImpactLine.displayName = "ImpactLine";

/* ── Single Problem Card ── */
const ProblemCard = memo(({ problem, index, colors }) => (
  <div
    data-card
    className="group flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl cursor-default
               transition-all duration-300"
    style={{
      background: "var(--theme-surface-card)",
      border: "1px solid var(--theme-border-default)",
      boxShadow: "var(--theme-shadow-sm)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = colors.iconBorder;
      e.currentTarget.style.boxShadow = "var(--theme-shadow-lg)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-default)";
      e.currentTarget.style.boxShadow = "var(--theme-shadow-sm)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    {/* Number column */}
    <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
      <span
        className="text-[10px] font-mono font-bold leading-none"
        style={{ color: colors.iconText }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className="w-px flex-1 transition-colors duration-300"
        style={{
          background:
            index < PROBLEMS.length - 1
              ? "var(--theme-border-subtle)"
              : "transparent",
        }}
        aria-hidden="true"
      />
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      {/* Header: icon + title + stat */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <ProblemIcon icon={problem.icon} colors={colors} />
          <h3 className="text-text-primary font-bold text-base sm:text-lg leading-tight">
            {problem.title}
          </h3>
        </div>
        <div className="hidden sm:block">
          <StatChip
            stat={problem.stat}
            statLabel={problem.statLabel}
            colors={colors}
          />
        </div>
      </div>

      {/* Mobile stat (visible only on small screens) */}
      <div className="sm:hidden mb-3">
        <span
          className="text-lg font-black mr-1.5"
          style={{ color: colors.iconText }}
        >
          {problem.stat}
        </span>
        <span className="text-text-muted text-xs">{problem.statLabel}</span>
      </div>

      {/* Description */}
      <p className="text-text-tertiary text-sm leading-relaxed">
        {problem.description}
      </p>

      {/* Impact line */}
      <ImpactLine text={problem.impact} colors={colors} />
    </div>
  </div>
));
ProblemCard.displayName = "ProblemCard";

/* ── Sticky Sidebar ── */
const SidebarContent = memo(() => (
  <>
    {/* Badge */}
    <div data-animate>
      <span className="badge-danger">
        <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
        The Problem
      </span>
    </div>

    {/* Heading */}
    <h2
      id="problems-heading"
      data-animate
      className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-[1.08]"
    >
      The Status Quo
      <br />
      <span className="text-danger-500">Isn't Working.</span>
    </h2>

    {/* Description */}
    <p
      data-animate
      className="mt-5 text-text-secondary text-lg leading-relaxed max-w-md"
    >
      Every major freelancing platform shares the same fundamental flaws — and{" "}
      <span className="text-text-primary font-semibold">
        freelancers pay the price
      </span>
      .
    </p>

    {/* Loss counter card */}
    <div
      data-animate
      className="mt-8 rounded-2xl overflow-hidden"
      style={{
        background: "var(--theme-surface-card)",
        border: "1px solid var(--theme-border-default)",
        boxShadow: "var(--theme-shadow-card)",
      }}
    >
      {/* Card header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--theme-border-subtle)" }}
      >
        <div className="flex items-center gap-2">
          <TrendingDown
            className="w-4 h-4"
            style={{ color: "var(--brand-danger-500)" }}
            aria-hidden="true"
          />
          <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
            Annual Freelancer Losses
          </span>
        </div>
        <span
          className="text-xs font-black"
          style={{ color: "var(--brand-danger-500)" }}
        >
          {TOTAL_LOSS}/yr
        </span>
      </div>

      {/* Bars */}
      <div className="px-5 py-4 space-y-3.5">
        {LOSS_DATA.map((item, i) => (
          <LossBar key={item.label} item={item} index={i} />
        ))}
      </div>

      {/* Card footer */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{
          borderTop: "1px solid var(--theme-border-subtle)",
          background: "var(--theme-badge-danger-bg)",
        }}
      >
        <AlertTriangle
          className="w-3.5 h-3.5 shrink-0"
          style={{ color: "var(--theme-badge-danger-text)" }}
          aria-hidden="true"
        />
        <span
          className="text-xs"
          style={{ color: "var(--theme-badge-danger-text)" }}
        >
          Total: <span className="font-bold">{TOTAL_LOSS} lost annually</span>{" "}
          to platform inefficiencies
        </span>
      </div>
    </div>
  </>
));
SidebarContent.displayName = "SidebarContent";

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

const Problems = () => {
  const sectionRef = useRef(null);
  const sidebarRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const transitionRef = useRef(null);

  /* ── Precompute color configs ── */
  const problemColors = useMemo(
    () => PROBLEMS.map((p) => COLOR_CONFIG[p.color]),
    [],
  );

  /* ── Animations ── */
  const initAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      // Sidebar elements
      const sidebarItems =
        sidebarRef.current?.querySelectorAll("[data-animate]");
      if (sidebarItems?.length) {
        gsap.fromTo(
          sidebarItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // Problem cards
      const cards = cardsContainerRef.current?.querySelectorAll("[data-card]");
      if (cards?.length) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 40, rotateY: -2 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.6,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      }

      // Bottom transition arrow
      if (transitionRef.current) {
        gsap.fromTo(
          transitionRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 92%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cleanup = initAnimations();
    return cleanup;
  }, [initAnimations]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--theme-bg)" }}
      aria-labelledby="problems-heading"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div
          className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-30"
          style={{ background: "var(--theme-orb-accent)" }}
        />
        <div
          className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-20"
          style={{ background: "var(--theme-orb-primary)" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 xl:gap-20">
          {/* ═══ Left — Sticky Sidebar ═══ */}
          <div ref={sidebarRef} className="lg:sticky lg:top-28 lg:self-start">
            <SidebarContent />
          </div>

          {/* ═══ Right — Problem Cards ═══ */}
          <div ref={cardsContainerRef} className="space-y-3 sm:space-y-4">
            {/* Section label (mobile hidden, provides context on desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-2 px-1">
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                6 critical issues
              </span>
              <span className="text-text-muted text-xs">
                Affecting{" "}
                <span className="text-text-secondary font-semibold">
                  50M+ freelancers
                </span>
              </span>
            </div>

            {PROBLEMS.map((problem, i) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={i}
                colors={problemColors[i]}
              />
            ))}

            {/* ── Transition to Solution ── */}
            <div
              ref={transitionRef}
              className="pt-6 flex flex-col items-center"
            >
              <div
                className="w-px h-10"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--theme-border-default), var(--brand-primary-500))",
                }}
                aria-hidden="true"
              />
              <a
                href="#features"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full
                           cursor-pointer transition-all duration-300
                           hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: "var(--theme-badge-primary-bg)",
                  border: "1px solid var(--theme-badge-primary-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "var(--theme-shadow-glow)";
                  e.currentTarget.style.borderColor =
                    "var(--theme-border-accent-strong)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor =
                    "var(--theme-badge-primary-border)";
                }}
              >
                <ArrowDown
                  className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200"
                  style={{ color: "var(--theme-badge-primary-text)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--theme-badge-primary-text)" }}
                >
                  See how we fix this
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Problems);
