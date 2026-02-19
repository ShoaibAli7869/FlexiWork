// src/components/landing/CTA.jsx
import { useEffect, useRef, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Star,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Static Data ── */
const TRUST_POINTS = Object.freeze([
  Object.freeze({ text: "No credit card required", icon: Shield }),
  Object.freeze({ text: "14-day Pro trial", icon: Star }),
  Object.freeze({ text: "Cancel anytime", icon: Clock }),
]);

const AVATAR_GRADIENTS = Object.freeze([
  "var(--brand-primary-500), var(--brand-primary-400)",
  "var(--brand-secondary-500), var(--brand-secondary-400)",
  "var(--brand-accent-500), var(--brand-accent-400)",
  "var(--brand-primary-400), var(--brand-secondary-500)",
]);

const AVATAR_INITIALS = Object.freeze(["S", "M", "E", "J"]);

/* ── Sub-Components ── */
const TrustPoint = memo(({ point }) => (
  <span className="flex items-center gap-2">
    <point.icon className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />
    <span className="text-white/50 text-sm">{point.text}</span>
  </span>
));
TrustPoint.displayName = "TrustPoint";

const AvatarStack = memo(() => (
  <div className="flex items-center gap-3">
    <div className="flex -space-x-2">
      {AVATAR_INITIALS.map((initial, i) => (
        <div
          key={initial}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white/20"
          style={{
            background: `linear-gradient(135deg, ${AVATAR_GRADIENTS[i]})`,
          }}
          aria-hidden="true"
        >
          {initial}
        </div>
      ))}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white/20"
        style={{
          background: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.6)",
        }}
        aria-hidden="true"
      >
        +50K
      </div>
    </div>
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className="w-3 h-3 text-accent-400 fill-accent-400"
          aria-hidden="true"
        />
      ))}
      <span className="text-white/50 text-xs ml-1">4.9</span>
    </div>
  </div>
));
AvatarStack.displayName = "AvatarStack";

/* ── Main Component ── */
const CTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const orbsRef = useRef([]);

  const initAnimations = useCallback(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Floating orbs
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: i % 2 === 0 ? -20 : 20,
          x: i % 2 === 0 ? 15 : -15,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
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
      className="section-padding relative"
      style={{ background: "var(--theme-bg)" }}
      aria-labelledby="cta-heading"
    >
      <div className="container-custom max-w-5xl relative z-10">
        <div
          ref={contentRef}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden"
        >
          {/* ── Background Layers ── */}
          <div className="absolute inset-0" aria-hidden="true">
            {/* Base gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary-600), var(--brand-primary-700), var(--brand-primary-800))",
              }}
            />
            {/* Pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            {/* Orbs */}
            <div
              ref={(el) => (orbsRef.current[0] = el)}
              className="absolute -top-10 -right-10 w-72 h-72 rounded-full blur-[100px]"
              style={{ background: "rgba(20, 241, 149, 0.12)" }}
            />
            <div
              ref={(el) => (orbsRef.current[1] = el)}
              className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full blur-[100px]"
              style={{ background: "rgba(251, 191, 36, 0.1)" }}
            />
            {/* Subtle top highlight */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Zap
                    className="w-4 h-4 text-secondary-300"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.15em]">
                  Join the Revolution
                </span>
              </div>

              {/* Heading */}
              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.1]"
              >
                Ready to Work on{" "}
                <span className="text-secondary-300">Your Terms?</span>
              </h2>

              {/* Subtitle */}
              <p className="mt-5 text-white/55 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                Join{" "}
                <span className="text-white/80 font-semibold">50,000+</span>{" "}
                freelancers who&rsquo;ve already made the switch. Start free —
                no credit card needed.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  className="group w-full sm:w-auto px-8 py-4 bg-white rounded-xl font-bold text-base
                             cursor-pointer transition-all duration-300 flex items-center justify-center gap-2.5
                             hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    color: "var(--brand-primary-700)",
                    boxShadow: "0 4px 20px rgba(255,255,255,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 35px rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(255,255,255,0.15)";
                  }}
                >
                  Get Started Free
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base text-white
                             cursor-pointer transition-all duration-300
                             hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.15)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  Talk to Sales
                </button>
              </div>

              {/* Avatar stack + rating */}
              <div className="mt-8 flex justify-center">
                <AvatarStack />
              </div>

              {/* Trust points */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {TRUST_POINTS.map((point) => (
                  <TrustPoint key={point.text} point={point} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(CTA);
