// src/components/landing/Stats.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const headingRef = useRef(null);
  const sectionRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { value: 50000, suffix: "+", label: "Verified Freelancers", emoji: "👩‍💻" },
    { value: 12, suffix: "M+", prefix: "$", label: "Paid Out", emoji: "💰" },
    { value: 98, suffix: "%", label: "Satisfaction Rate", emoji: "⭐" },
    { value: 5, suffix: "%", label: "Platform Fee", emoji: "🎯" },
    { value: 150, suffix: "+", label: "Countries", emoji: "🌍" },
    { value: 24, suffix: "/7", label: "Live Support", emoji: "🛡️" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll(".anim-child"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/3 via-transparent to-secondary-400/3" />
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="divider-gradient absolute bottom-0 left-0 right-0" />

      <div className="container-custom relative z-10">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-14">
          <span className="anim-child text-text-muted text-xs font-semibold uppercase tracking-[0.2em]">
            By The Numbers
          </span>
          <h2 className="anim-child text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary mt-4 leading-[1.15]">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
        </div>

        <div
          ref={inViewRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="card text-center p-5 cursor-default"
            >
              <div className="text-2xl mb-2.5">{stat.emoji}</div>
              <div className="text-2xl sm:text-3xl font-black text-text-primary mb-1">
                {stat.prefix}
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    delay={i * 0.1}
                    separator=","
                  />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>
              <div className="text-text-muted text-xs font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
