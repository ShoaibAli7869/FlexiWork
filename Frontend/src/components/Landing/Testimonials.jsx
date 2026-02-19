// src/components/landing/Testimonials.jsx
import { useEffect, useRef, memo, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  ShieldCheck,
  Quote,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   STATIC DATA
   ════════════════════════════════════════════ */

const TESTIMONIALS = Object.freeze([
  Object.freeze({
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    company: "Freelance",
    initials: "SC",
    gradient: "var(--brand-primary-500), var(--brand-primary-400)",
    rating: 5,
    text: "FlexiWork's AI matching is insane. I went from spending hours searching for projects to getting matched with perfect-fit clients automatically. My income doubled in 3 months.",
    earned: "$45,000+",
    projects: 28,
    featured: true,
    featureUsed: "AI Smart Matching",
    resultStats: Object.freeze([
      Object.freeze({
        label: "Total Earned",
        value: "$45,000+",
        color: "var(--brand-secondary-500)",
        percentage: 90,
      }),
      Object.freeze({
        label: "Projects Completed",
        value: "28",
        color: "var(--brand-primary-500)",
        percentage: 70,
      }),
      Object.freeze({
        label: "Income Growth",
        value: "+200%",
        color: "var(--brand-accent-500)",
        percentage: 95,
      }),
      Object.freeze({
        label: "Avg. Match Time",
        value: "< 3 min",
        color: "var(--brand-primary-500)",
        percentage: 85,
      }),
    ]),
  }),
  Object.freeze({
    id: "marcus-johnson",
    name: "Marcus Johnson",
    role: "UI/UX Designer",
    company: "Studio MJ",
    initials: "MJ",
    gradient: "var(--brand-secondary-500), var(--brand-secondary-400)",
    rating: 5,
    text: "The instant payments changed my life. No more waiting 2 weeks for my money. I get paid the second the milestone is approved.",
    earned: "$32,000+",
    projects: 42,
    featureUsed: "Instant Payments",
  }),
  Object.freeze({
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Content Strategist",
    company: "Freelance",
    initials: "ER",
    gradient: "var(--brand-accent-500), var(--brand-accent-400)",
    rating: 5,
    text: "The scope creep detection saved me twice. It flagged when a client kept adding requirements and suggested fair price adjustments automatically.",
    earned: "$28,000+",
    projects: 35,
    featureUsed: "Scope Creep Shield",
  }),
  Object.freeze({
    id: "james-park",
    name: "James Park",
    role: "Startup Founder",
    company: "LaunchPad Inc.",
    initials: "JP",
    gradient: "var(--brand-primary-400), var(--brand-secondary-500)",
    rating: 5,
    text: "As a client, I love the team formation feature. I described my project and FlexiWork assembled a perfect team of 4 freelancers. Shipped my MVP in 3 weeks.",
    earned: "Client",
    projects: 12,
    isClient: true,
    featureUsed: "Team Formation AI",
  }),
  Object.freeze({
    id: "aisha-patel",
    name: "Aisha Patel",
    role: "Data Scientist",
    company: "AI Labs",
    initials: "AP",
    gradient: "var(--brand-secondary-400), var(--brand-accent-500)",
    rating: 5,
    text: "Finally a platform that values quality over quantity. Blockchain reputation means my reviews actually matter and follow me everywhere. Only 5% fees too!",
    earned: "$67,000+",
    projects: 19,
    featureUsed: "Blockchain Reputation",
  }),
]);

const TRUST_STATS = Object.freeze([
  Object.freeze({
    value: "4.9/5",
    label: "Average Rating",
    icon: Star,
    color: "var(--brand-accent-500)",
  }),
  Object.freeze({
    value: "10K+",
    label: "Verified Reviews",
    icon: MessageSquare,
    color: "var(--brand-primary-500)",
  }),
  Object.freeze({
    value: "98%",
    label: "Satisfaction",
    icon: Award,
    color: "var(--brand-secondary-500)",
  }),
  Object.freeze({
    value: "+127%",
    label: "Income Growth",
    icon: TrendingUp,
    color: "var(--brand-accent-500)",
  }),
]);

/* ════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════ */

/* ── Star Rating ── */
const StarRating = memo(({ count = 5, size = "sm" }) => {
  const sizeMap = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }, (_, i) => (
        <Star
          key={i}
          className={`${sizeMap[size]} text-accent-400 fill-accent-400`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
});
StarRating.displayName = "StarRating";

/* ── Avatar ── */
const Avatar = memo(({ initials, gradient, size = "md", verified = true }) => {
  const sizeMap = {
    sm: "w-9 h-9 rounded-xl text-xs",
    md: "w-12 h-12 rounded-2xl text-sm",
    lg: "w-14 h-14 rounded-2xl text-lg",
  };
  return (
    <div className="relative shrink-0">
      <div
        className={`${sizeMap[size]} flex items-center justify-center text-white font-bold`}
        style={{ background: `linear-gradient(135deg, ${gradient})` }}
        aria-hidden="true"
      >
        {initials}
      </div>
      {verified && (
        <CheckCircle2
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-secondary-500"
          style={{
            background: "var(--theme-surface-card)",
            borderRadius: "50%",
          }}
          aria-label="Verified user"
        />
      )}
    </div>
  );
});
Avatar.displayName = "Avatar";

/* ── Feature Tag ── */
const FeatureTag = memo(({ text }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
    style={{
      background: "var(--theme-badge-primary-bg)",
      color: "var(--theme-badge-primary-text)",
      border: "1px solid var(--theme-badge-primary-border)",
    }}
  >
    <ShieldCheck className="w-2.5 h-2.5" aria-hidden="true" />
    {text}
  </span>
));
FeatureTag.displayName = "FeatureTag";

/* ── Stat Bar (for featured card) ── */
const StatBar = memo(({ stat, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: barRef.current,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          barRef.current,
          { width: "0%" },
          {
            width: `${stat.percentage}%`,
            duration: 1,
            delay: index * 0.12,
            ease: "power2.out",
          },
        );
      },
    });
    return () => trigger.kill();
  }, [stat.percentage, index]);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-text-muted text-xs font-medium">
          {stat.label}
        </span>
        <span className="text-xl font-black" style={{ color: stat.color }}>
          {stat.value}
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--theme-border-subtle)" }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${stat.color}, transparent)`,
            opacity: 0.5,
          }}
        >
          <div
            className="absolute inset-0 animate-shine"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
});
StatBar.displayName = "StatBar";

/* ── Featured Testimonial Card ── */
const FeaturedCard = memo(({ testimonial }) => (
  <div
    data-featured
    className="mb-8 rounded-3xl overflow-hidden"
    style={{
      background: "var(--theme-comparison-highlight-bg)",
      border: "1px solid var(--theme-comparison-highlight-border)",
      boxShadow: "var(--theme-shadow-xl), var(--theme-shadow-glow)",
    }}
  >
    <div className="grid md:grid-cols-[1.3fr_1fr]">
      {/* Left — Quote */}
      <div className="p-7 sm:p-10">
        {/* Quote icon + feature tag */}
        <div className="flex items-start justify-between mb-6">
          <Quote
            className="w-10 h-10"
            style={{ color: "var(--theme-testimonial-quote-color)" }}
            aria-hidden="true"
          />
          <FeatureTag text={testimonial.featureUsed} />
        </div>

        <StarRating count={testimonial.rating} size="lg" />

        <blockquote className="mt-5 text-text-primary text-lg sm:text-xl font-medium leading-relaxed mb-8">
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <Avatar
            initials={testimonial.initials}
            gradient={testimonial.gradient}
            size="lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-bold text-base">
                {testimonial.name}
              </span>
            </div>
            <span className="text-text-tertiary text-sm">
              {testimonial.role}
              {testimonial.company && (
                <span className="text-text-muted">
                  {" "}
                  · {testimonial.company}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Right — Stats */}
      <div
        className="p-7 sm:p-10 flex flex-col justify-center"
        style={{ borderLeft: "1px solid var(--theme-border-subtle)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">
            {testimonial.name.split(" ")[0]}&rsquo;s Results
          </p>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: "var(--theme-badge-secondary-bg)",
              border: "1px solid var(--theme-badge-secondary-border)",
            }}
          >
            <TrendingUp
              className="w-3 h-3"
              style={{ color: "var(--theme-badge-secondary-text)" }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] font-bold"
              style={{ color: "var(--theme-badge-secondary-text)" }}
            >
              Verified
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {testimonial.resultStats.map((stat, i) => (
            <StatBar key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Earned total callout */}
        <div
          className="mt-6 p-4 rounded-xl flex items-center gap-3"
          style={{
            background: "var(--theme-badge-secondary-bg)",
            border: "1px solid var(--theme-badge-secondary-border)",
          }}
        >
          <Briefcase
            className="w-5 h-5 shrink-0"
            style={{ color: "var(--theme-badge-secondary-text)" }}
            aria-hidden="true"
          />
          <div>
            <div
              className="text-lg font-black"
              style={{ color: "var(--theme-badge-secondary-text)" }}
            >
              {testimonial.earned}
            </div>
            <div className="text-text-muted text-[10px]">
              earned in {testimonial.projects} projects
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
FeaturedCard.displayName = "FeaturedCard";

/* ── Grid Testimonial Card ── */
const TestimonialCard = memo(({ testimonial }) => (
  <div
    data-card
    className="group rounded-2xl p-6 cursor-default flex flex-col
               transition-all duration-300"
    style={{
      background: "var(--theme-surface-card)",
      border: "1px solid var(--theme-border-default)",
      boxShadow: "var(--theme-shadow-card)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-strong)";
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "var(--theme-shadow-card-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-default)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "var(--theme-shadow-card)";
    }}
  >
    {/* Top row: stars + feature tag */}
    <div className="flex items-center justify-between mb-3">
      <StarRating count={testimonial.rating} />
      {testimonial.featureUsed && (
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider hidden sm:inline-block"
          style={{
            background: "var(--theme-badge-primary-bg)",
            color: "var(--theme-badge-primary-text)",
          }}
        >
          {testimonial.featureUsed}
        </span>
      )}
    </div>

    {/* Quote */}
    <blockquote className="text-text-secondary text-sm leading-relaxed flex-1 mb-5">
      &ldquo;{testimonial.text}&rdquo;
    </blockquote>

    {/* Author footer */}
    <div
      className="flex items-center gap-3 pt-4"
      style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
    >
      <Avatar
        initials={testimonial.initials}
        gradient={testimonial.gradient}
        size="sm"
        verified
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-text-primary font-semibold text-xs truncate">
            {testimonial.name}
          </span>
        </div>
        <span className="text-text-muted text-[10px]">
          {testimonial.role}
          {testimonial.isClient && (
            <span
              className="ml-1.5 font-bold"
              style={{ color: "var(--brand-accent-500)" }}
            >
              · Client
            </span>
          )}
        </span>
      </div>
      <div className="text-right shrink-0">
        <div
          className="text-xs font-bold"
          style={{ color: "var(--brand-secondary-500)" }}
        >
          {testimonial.earned}
        </div>
        <div className="text-text-muted text-[9px]">
          {testimonial.projects} projects
        </div>
      </div>
    </div>
  </div>
));
TestimonialCard.displayName = "TestimonialCard";

/* ── Trust Stat Card ── */
const TrustStat = memo(({ stat }) => (
  <div
    data-stat
    className="group text-center p-5 rounded-2xl cursor-default
               transition-all duration-300"
    style={{
      background: "var(--theme-surface-card)",
      border: "1px solid var(--theme-border-subtle)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-default)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "var(--theme-shadow-sm)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-subtle)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2.5
                 group-hover:scale-110 transition-transform duration-300"
      style={{ background: "var(--theme-stat-icon-bg)" }}
    >
      <stat.icon
        className="w-4.5 h-4.5"
        style={{ color: stat.color }}
        aria-hidden="true"
      />
    </div>
    <div className="text-text-primary font-black text-xl leading-none">
      {stat.value}
    </div>
    <div className="text-text-muted text-xs mt-1.5">{stat.label}</div>
  </div>
));
TrustStat.displayName = "TrustStat";

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

const Testimonials = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  /* ── Partition testimonials ── */
  const { featured, rest } = useMemo(() => {
    const feat = TESTIMONIALS.find((t) => t.featured);
    const others = TESTIMONIALS.filter((t) => !t.featured);
    return { featured: feat, rest: others };
  }, []);

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

      // Featured card
      const featuredEl = featuredRef.current?.querySelector("[data-featured]");
      if (featuredEl) {
        gsap.fromTo(
          featuredEl,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuredEl,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Grid cards
      const cards = gridRef.current?.querySelectorAll("[data-card]");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Trust stats
      const statItems = statsRef.current?.querySelectorAll("[data-stat]");
      if (statItems?.length) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // Bottom CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
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
      aria-labelledby="testimonials-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full orb-primary blur-[160px] opacity-25" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full orb-secondary blur-[140px] opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-14">
          <div data-animate className="flex justify-center mb-5">
            <span className="badge-accent">
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              Testimonials
            </span>
          </div>
          <h2
            id="testimonials-heading"
            data-animate
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-[1.1]"
          >
            Real People. <span className="text-gradient">Real Results.</span>
          </h2>
          <p
            data-animate
            className="mt-5 text-text-secondary text-lg leading-relaxed"
          >
            Don&rsquo;t take our word for it — hear from freelancers and clients
            who&rsquo;ve{" "}
            <span className="text-text-primary font-semibold">
              transformed their work
            </span>
            .
          </p>
        </div>

        {/* ── Featured Testimonial ── */}
        <div ref={featuredRef}>
          {featured && <FeaturedCard testimonial={featured} />}
        </div>

        {/* ── Grid ── */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {/* ── Trust Stats ── */}
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {TRUST_STATS.map((stat) => (
            <TrustStat key={stat.label} stat={stat} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div ref={ctaRef} className="mt-14 text-center">
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-8 rounded-3xl"
            style={{
              background: "var(--theme-comparison-highlight-bg)",
              border: "1px solid var(--theme-comparison-highlight-border)",
              boxShadow: "var(--theme-shadow-glow)",
            }}
          >
            {/* Avatar stack */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {TESTIMONIALS.slice(0, 4).map((t) => (
                  <div
                    key={t.id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2"
                    style={{
                      background: `linear-gradient(135deg, ${t.gradient})`,
                      borderColor: "var(--theme-surface-card)",
                    }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                ))}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold border-2"
                  style={{
                    background: "var(--theme-surface-muted)",
                    borderColor: "var(--theme-surface-card)",
                    color: "var(--theme-text-muted)",
                  }}
                  aria-hidden="true"
                >
                  +4K
                </div>
              </div>
              <div className="flex items-center gap-1">
                <StarRating count={5} size="sm" />
                <span className="text-text-muted text-xs font-medium ml-1">
                  4.9
                </span>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-text-primary font-bold text-sm sm:text-base">
                Join{" "}
                <span style={{ color: "var(--brand-primary-500)" }}>
                  4,200+ professionals
                </span>{" "}
                who&rsquo;ve made the switch
              </p>
              <p className="text-text-muted text-xs mt-0.5">
                Average 127% income growth in the first 6 months
              </p>
            </div>

            <button
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm
                         cursor-pointer transition-all duration-300
                         hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                color: "var(--theme-text-on-primary)",
                boxShadow: "0 4px 15px rgba(108, 59, 247, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(108, 59, 247, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(108, 59, 247, 0.25)";
              }}
            >
              Start Your Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
