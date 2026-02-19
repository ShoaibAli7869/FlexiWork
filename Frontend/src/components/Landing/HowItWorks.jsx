// src/components/landing/HowItWorks.jsx
import { useEffect, useRef, memo, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserPlus,
  Search,
  Rocket,
  Wallet,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   STATIC DATA
   ════════════════════════════════════════════ */

const STEPS = Object.freeze([
  Object.freeze({
    id: "create-profile",
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description:
      "Sign up in 60 seconds. Our AI analyzes your skills, experience, and portfolio to build a compelling profile that gets you noticed.",
    tag: "AI-optimized profiles",
    tagIcon: Sparkles,
    color: "primary",
    metric: Object.freeze({ value: "60s", label: "Average setup time" }),
    details: Object.freeze([
      "AI-generated skill tags",
      "Portfolio auto-import",
      "Verification in minutes",
    ]),
  }),
  Object.freeze({
    id: "smart-match",
    icon: Search,
    step: "02",
    title: "Get Smart Matched",
    description:
      "Our AI matches you with ideal projects or talent instantly based on skills, budget, timeline, and work style — no more endless scrolling.",
    tag: "95%+ match accuracy",
    tagIcon: Zap,
    color: "secondary",
    metric: Object.freeze({ value: "95%", label: "Match accuracy" }),
    details: Object.freeze([
      "Behavioral analysis",
      "Budget & timeline fit",
      "Style compatibility",
    ]),
  }),
  Object.freeze({
    id: "collaborate",
    icon: Rocket,
    step: "03",
    title: "Collaborate & Deliver",
    description:
      "Work together in our built-in workspace with video calls, code editors, and milestone tracking. Everything in one place.",
    tag: "All-in-one workspace",
    tagIcon: Rocket,
    color: "accent",
    metric: Object.freeze({ value: "3.2x", label: "Faster delivery" }),
    details: Object.freeze([
      "Built-in video & chat",
      "Milestone tracking",
      "Scope protection AI",
    ]),
  }),
  Object.freeze({
    id: "get-paid",
    icon: Wallet,
    step: "04",
    title: "Get Paid Instantly",
    description:
      "Receive payments the moment milestones are approved. Escrow-protected, multi-currency, with only a 5% platform fee.",
    tag: "Only 5% platform fee",
    tagIcon: Shield,
    color: "primary",
    metric: Object.freeze({ value: "0s", label: "Payout delay" }),
    details: Object.freeze([
      "Instant withdrawals",
      "50+ currencies",
      "Escrow protection",
    ]),
  }),
]);

const COLOR_CONFIG = Object.freeze({
  primary: Object.freeze({
    iconBg: "var(--theme-feature-icon-primary-bg)",
    text: "var(--brand-primary-500)",
    text400: "var(--brand-primary-400)",
    badgeBg: "var(--theme-badge-primary-bg)",
    badgeBorder: "var(--theme-badge-primary-border)",
    badgeText: "var(--theme-badge-primary-text)",
    gradient: "var(--brand-primary-500), var(--brand-primary-400)",
    glowShadow: "rgba(108, 59, 247, 0.25)",
  }),
  secondary: Object.freeze({
    iconBg: "var(--theme-feature-icon-secondary-bg)",
    text: "var(--brand-secondary-500)",
    text400: "var(--brand-secondary-400)",
    badgeBg: "var(--theme-badge-secondary-bg)",
    badgeBorder: "var(--theme-badge-secondary-border)",
    badgeText: "var(--theme-badge-secondary-text)",
    gradient: "var(--brand-secondary-500), var(--brand-secondary-400)",
    glowShadow: "rgba(13, 199, 125, 0.25)",
  }),
  accent: Object.freeze({
    iconBg: "var(--theme-feature-icon-accent-bg)",
    text: "var(--brand-accent-500)",
    text400: "var(--brand-accent-400)",
    badgeBg: "var(--theme-badge-accent-bg)",
    badgeBorder: "var(--theme-badge-accent-border)",
    badgeText: "var(--theme-badge-accent-text)",
    gradient: "var(--brand-accent-500), var(--brand-accent-400)",
    glowShadow: "rgba(245, 158, 11, 0.25)",
  }),
});

/* ════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════ */

/* ── Step Number Badge ── */
const StepNumber = memo(({ step, colors, isActive }) => (
  <div
    className="relative flex items-center justify-center transition-transform duration-500"
    style={{ transform: isActive ? "scale(1.1)" : "scale(1)" }}
  >
    {/* Glow ring */}
    <div
      className="absolute inset-0 rounded-2xl blur-xl opacity-30 transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, ${colors.gradient})`,
        opacity: isActive ? 0.4 : 0,
      }}
      aria-hidden="true"
    />

    {/* Icon container */}
    <div
      className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl flex items-center justify-center
                 transition-all duration-300 cursor-default"
      style={{
        background: `linear-gradient(135deg, ${colors.gradient})`,
        boxShadow: `0 8px 25px ${colors.glowShadow}`,
      }}
    >
      <step.icon className="w-7 h-7 text-white" aria-hidden="true" />
    </div>

    {/* Step number */}
    <div
      className="absolute -top-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center
                 text-[10px] font-bold"
      style={{
        background: "var(--theme-surface-card)",
        border: `2px solid ${colors.text}`,
        color: colors.text,
        boxShadow: "var(--theme-shadow-sm)",
      }}
    >
      {step.step}
    </div>
  </div>
));
StepNumber.displayName = "StepNumber";

/* ── Detail Checklist ── */
const DetailList = memo(({ details, colors }) => (
  <div className="space-y-2 mt-4">
    {details.map((detail) => (
      <div key={detail} className="flex items-center gap-2.5">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
          style={{ background: colors.iconBg }}
        >
          <CheckCircle2 className="w-3 h-3" style={{ color: colors.text }} />
        </div>
        <span className="text-text-tertiary text-sm">{detail}</span>
      </div>
    ))}
  </div>
));
DetailList.displayName = "DetailList";

/* ── Metric Badge ── */
const MetricBadge = memo(({ metric, colors }) => (
  <div
    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300"
    style={{
      background: colors.iconBg,
      border: `1px solid ${colors.badgeBorder}`,
    }}
  >
    <span className="text-xl font-black" style={{ color: colors.text }}>
      {metric.value}
    </span>
    <span className="text-text-muted text-xs">{metric.label}</span>
  </div>
));
MetricBadge.displayName = "MetricBadge";

/* ── Tag Pill ── */
const TagPill = memo(({ text, icon: TagIcon, colors }) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
    style={{
      background: colors.badgeBg,
      color: colors.badgeText,
      border: `1px solid ${colors.badgeBorder}`,
    }}
  >
    <TagIcon className="w-3 h-3" aria-hidden="true" />
    {text}
  </span>
));
TagPill.displayName = "TagPill";

/* ── Connector Line Segment (between steps) ── */
const ConnectorLine = memo(({ colors, nextColors }) => (
  <div className="hidden lg:flex justify-center py-2" aria-hidden="true">
    <div
      className="w-px h-16"
      style={{
        background: `linear-gradient(to bottom, ${colors.text}, ${nextColors.text})`,
        opacity: 0.2,
      }}
    />
  </div>
));
ConnectorLine.displayName = "ConnectorLine";

/* ── Mobile Step Connector ── */
const MobileConnector = memo(({ colors }) => (
  <div className="flex lg:hidden justify-center py-1" aria-hidden="true">
    <div className="flex flex-col items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{ background: colors.text, opacity: 0.3 - i * 0.08 }}
        />
      ))}
    </div>
  </div>
));
MobileConnector.displayName = "MobileConnector";

/* ── Single Step Card ── */
const StepCard = memo(({ step, index, colors, isLast }) => {
  const isEven = index % 2 === 0;

  return (
    <div data-step className="group">
      {/* Desktop: alternating layout */}
      <div
        className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12
                    ${!isEven ? "lg:flex-row-reverse" : ""}`}
      >
        {/* Content Side */}
        <div className={`flex-1 ${!isEven ? "lg:text-right" : ""}`}>
          <div
            className="rounded-2xl p-6 sm:p-7 transition-all duration-400"
            style={{
              background: "var(--theme-surface-card)",
              border: "1px solid var(--theme-border-default)",
              boxShadow: "var(--theme-shadow-card)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.badgeBorder;
              e.currentTarget.style.boxShadow =
                "var(--theme-shadow-card-hover)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-border-default)";
              e.currentTarget.style.boxShadow = "var(--theme-shadow-card)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Top row: tag + metric */}
            <div
              className={`flex items-start justify-between gap-3 mb-4 flex-wrap
                          ${!isEven ? "lg:flex-row-reverse" : ""}`}
            >
              <TagPill text={step.tag} icon={step.tagIcon} colors={colors} />
              <MetricBadge metric={step.metric} colors={colors} />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2.5 leading-tight">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-1">
              {step.description}
            </p>

            {/* Detail checklist */}
            <div className={!isEven ? "lg:flex lg:flex-col lg:items-end" : ""}>
              <DetailList details={step.details} colors={colors} />
            </div>
          </div>
        </div>

        {/* Center Icon */}
        <div className="relative z-10 shrink-0 order-first lg:order-none">
          <StepNumber step={step} colors={colors} isActive={false} />
        </div>

        {/* Spacer (desktop only) */}
        <div className="flex-1 hidden lg:block" aria-hidden="true" />
      </div>

      {/* Connector to next step */}
      {!isLast && (
        <>
          <ConnectorLine
            colors={colors}
            nextColors={COLOR_CONFIG[STEPS[index + 1].color]}
          />
          <MobileConnector colors={colors} />
        </>
      )}
    </div>
  );
});
StepCard.displayName = "StepCard";

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const ctaRef = useRef(null);

  /* ── Animations ── */
  const initAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      // Heading
      const headingItems =
        headingRef.current?.querySelectorAll("[data-animate]");
      if (headingItems?.length) {
        gsap.fromTo(
          headingItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      // Progress line (desktop vertical line)
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: progressLineRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // Step cards — alternating entrance
      const stepElements = timelineRef.current?.querySelectorAll("[data-step]");
      if (stepElements?.length) {
        stepElements.forEach((step, i) => {
          const direction = i % 2 === 0 ? -40 : 40;
          gsap.fromTo(
            step,
            { opacity: 0, x: direction, scale: 0.97 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
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

  /* ── Precompute step colors ── */
  const stepColors = useMemo(
    () => STEPS.map((step) => COLOR_CONFIG[step.color]),
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--theme-section-alt-bg)" }}
      aria-labelledby="how-it-works-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full orb-primary blur-[160px] opacity-25" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full orb-secondary blur-[140px] opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <div
          ref={headingRef}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div
            data-animate
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "var(--theme-badge-accent-bg)",
              border: "1px solid var(--theme-badge-accent-border)",
            }}
          >
            <Clock
              className="w-3.5 h-3.5 "
              style={{ color: "var(--theme-badge-accent-text)" }}
            />
            How It Works
          </div>
          <h2
            id="how-it-works-heading"
            data-animate
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-[1.1]"
          >
            Four Steps to <span className="text-gradient">Freedom</span>
          </h2>
          <p
            data-animate
            className="mt-5 text-text-secondary text-lg leading-relaxed"
          >
            Getting started is ridiculously simple.{" "}
            <span className="text-text-primary font-semibold">
              No hoops, no hurdles.
            </span>
          </p>

          {/* Quick time estimate */}
          <div
            data-animate
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "var(--theme-badge-primary-bg)",
              border: "1px solid var(--theme-badge-primary-border)",
            }}
          >
            <Clock
              className="w-3.5 h-3.5"
              style={{ color: "var(--theme-badge-primary-text)" }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--theme-badge-primary-text)" }}
            >
              <span className="font-bold">Under 5 minutes</span> from signup to
              first match
            </span>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Vertical progress line (desktop) */}
          <div
            ref={progressLineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, var(--brand-primary-500), var(--brand-secondary-400), var(--brand-accent-400), var(--brand-primary-400))",
              opacity: 0.15,
            }}
            aria-hidden="true"
          />

          {/* Steps */}
          <div className="space-y-6 lg:space-y-0">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                colors={stepColors[i]}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div ref={ctaRef} className="mt-16 sm:mt-20 text-center">
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-8 rounded-3xl"
            style={{
              background: "var(--theme-comparison-highlight-bg)",
              border: "1px solid var(--theme-comparison-highlight-border)",
              boxShadow: "var(--theme-shadow-glow)",
            }}
          >
            <div className="text-center sm:text-left">
              <p className="text-text-primary font-bold text-base sm:text-lg">
                Ready to get started?
              </p>
              <p className="text-text-tertiary text-sm mt-0.5">
                Join{" "}
                <span className="text-text-secondary font-semibold">
                  50,000+
                </span>{" "}
                professionals already on FlexiWork
              </p>
            </div>

            <button
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm
                         cursor-pointer transition-all duration-300
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
              <span className="relative z-10">Create Free Account</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HowItWorks);
