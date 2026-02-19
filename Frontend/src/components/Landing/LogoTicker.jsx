// src/components/landing/LogoTicker.jsx
import { useEffect, useRef, memo, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiFigma,
  SiAdobephotoshop,
  SiWordpress,
  SiShopify,
  SiFlutter,
  SiTensorflow,
  SiAmazon,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────
   Static Data — hoisted outside component
   ──────────────────────────────────────────── */

const SKILLS_ROW_1 = Object.freeze([
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: SiAdobephotoshop, name: "Photoshop", color: "#31A8FF" },
  { icon: SiWordpress, name: "WordPress", color: "#21759B" },
  { icon: SiShopify, name: "Shopify", color: "#96BF48" },
  { icon: SiFlutter, name: "Flutter", color: "#02569B" },
  { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
  { icon: SiAmazon, name: "AWS", color: "#FF9900" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiKubernetes, name: "K8s", color: "#326CE5" },
]);

// Reversed copy for row 2 — created once, never mutated
const SKILLS_ROW_2 = Object.freeze([...SKILLS_ROW_1].reverse());

// Tripled for seamless infinite scroll (no visible gaps on wide screens)
const TRACK_1_ITEMS = Object.freeze([
  ...SKILLS_ROW_1,
  ...SKILLS_ROW_1,
  ...SKILLS_ROW_1,
]);
const TRACK_2_ITEMS = Object.freeze([
  ...SKILLS_ROW_2,
  ...SKILLS_ROW_2,
  ...SKILLS_ROW_2,
]);

const STAT_ITEMS = Object.freeze([
  { value: "500+", label: "Skills" },
  { value: "12K+", label: "Experts" },
  { value: "50+", label: "Categories" },
]);

/* ────────────────────────────────────────────
   Sub-Components
   ──────────────────────────────────────────── */

const SkillPill = memo(({ icon: Icon, name, color }) => (
  <div
    className="group flex items-center gap-2.5 px-5 py-2.5 mx-1.5 shrink-0
               rounded-xl cursor-default select-none
               transition-all duration-300"
    style={{
      background: "var(--theme-glass-bg)",
      border: "1px solid var(--theme-glass-border)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-border-strong)";
      e.currentTarget.style.boxShadow = "var(--theme-shadow-sm)";
      e.currentTarget.style.background = "var(--theme-glass-strong-bg)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--theme-glass-border)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.background = "var(--theme-glass-bg)";
    }}
  >
    <Icon
      className="text-lg group-hover:scale-110 transition-transform duration-300"
      style={{ color }}
      aria-hidden="true"
    />
    <span className="text-text-tertiary group-hover:text-text-primary text-sm font-medium whitespace-nowrap transition-colors duration-300">
      {name}
    </span>
  </div>
));

SkillPill.displayName = "SkillPill";

const TickerTrack = memo(({ items, trackRef, direction = "left" }) => (
  <div className="relative overflow-hidden">
    <div
      ref={trackRef}
      className="flex will-change-transform"
      style={{
        width: "max-content",
        transform:
          direction === "right" ? "translateX(-33.333%)" : "translateX(0)",
      }}
      aria-hidden="true"
    >
      {items.map((skill, i) => (
        <SkillPill
          key={`${direction}-${skill.name}-${i}`}
          icon={skill.icon}
          name={skill.name}
          color={skill.color}
        />
      ))}
    </div>
  </div>
));

TickerTrack.displayName = "TickerTrack";

const FadeEdge = memo(({ side }) => (
  <div
    className={`absolute ${side}-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 z-10 pointer-events-none`}
    style={{
      background: `linear-gradient(to ${side === "left" ? "right" : "left"}, var(--theme-bg), transparent)`,
    }}
    aria-hidden="true"
  />
));

FadeEdge.displayName = "FadeEdge";

/* ────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────── */

const LogoTicker = () => {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const tweensRef = useRef([]);

  const initAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      // Section fade-in
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            once: true,
          },
        },
      );

      // Heading + stats stagger
      const headingElements =
        headingRef.current?.querySelectorAll("[data-animate]");
      if (headingElements?.length) {
        gsap.fromTo(
          headingElements,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll("[data-stat]");
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 92%",
              once: true,
            },
          },
        );
      }

      // Infinite scroll — Row 1 (left)
      if (track1Ref.current) {
        const tween1 = gsap.to(track1Ref.current, {
          xPercent: -33.333, // Move by 1/3 (since we tripled the items)
          duration: 30,
          repeat: -1,
          ease: "none",
        });
        tweensRef.current.push(tween1);
      }

      // Infinite scroll — Row 2 (right)
      if (track2Ref.current) {
        const tween2 = gsap.fromTo(
          track2Ref.current,
          { xPercent: -33.333 },
          {
            xPercent: 0,
            duration: 35,
            repeat: -1,
            ease: "none",
          },
        );
        tweensRef.current.push(tween2);
      }
    }, sectionRef);

    return () => {
      tweensRef.current = [];
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const cleanup = initAnimations();
    return cleanup;
  }, [initAnimations]);

  // Pause/resume on visibility for performance
  useEffect(() => {
    const handleVisibility = () => {
      tweensRef.current.forEach((tween) => {
        if (document.hidden) {
          tween.pause();
        } else {
          tween.resume();
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Pause on reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotion = (e) => {
      tweensRef.current.forEach((tween) => {
        if (e.matches) {
          tween.pause();
        } else {
          tween.resume();
        }
      });
    };

    handleMotion(mq);
    mq.addEventListener("change", handleMotion);
    return () => mq.removeEventListener("change", handleMotion);
  }, []);

  // Pause tickers on hover for readability
  const handleMouseEnter = useCallback(() => {
    tweensRef.current.forEach((tween) => {
      gsap.to(tween, { timeScale: 0.3, duration: 0.5, ease: "power2.out" });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    tweensRef.current.forEach((tween) => {
      gsap.to(tween, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    });
  }, []);

  const dividerStyle = useMemo(
    () => ({
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, var(--theme-border-strong), transparent)",
    }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ opacity: 0 }} // Initial state before GSAP
      aria-label="Skills and technologies available on the platform"
    >
      {/* Top divider */}
      <div style={dividerStyle} aria-hidden="true" />

      <div className="py-10 sm:py-14">
        {/* Header */}
        <div
          ref={headingRef}
          className="container-custom mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div data-animate className="text-center sm:text-left">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-[0.2em]">
              Talent across every domain
            </p>
            <p className="text-text-tertiary text-xs mt-1 hidden sm:block">
              Find experts in{" "}
              <span className="text-text-secondary font-medium">
                500+ skills
              </span>{" "}
              and technologies
            </p>
          </div>

          {/* Inline stats */}
          <div ref={statsRef} className="flex items-center gap-4 sm:gap-6">
            {STAT_ITEMS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-2"
                data-stat
              >
                {i > 0 && (
                  <div
                    className="w-px h-5 mr-1 hidden sm:block"
                    style={{ background: "var(--theme-border-subtle)" }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--theme-text-primary)" }}
                >
                  {stat.value}
                </span>
                <span className="text-text-muted text-xs hidden sm:inline">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ticker Area */}
        <div
          className="relative space-y-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="marquee"
          aria-label="Scrolling list of available skills and technologies"
        >
          {/* Row 1 — scrolls left */}
          <TickerTrack
            items={TRACK_1_ITEMS}
            trackRef={track1Ref}
            direction="left"
          />

          {/* Row 2 — scrolls right */}
          <TickerTrack
            items={TRACK_2_ITEMS}
            trackRef={track2Ref}
            direction="right"
          />

          {/* Fade edges */}
          <FadeEdge side="left" />
          <FadeEdge side="right" />
        </div>
      </div>

      {/* Bottom divider */}
      <div style={dividerStyle} aria-hidden="true" />
    </section>
  );
};

export default memo(LogoTicker);
