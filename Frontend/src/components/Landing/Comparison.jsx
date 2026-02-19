// src/components/landing/Comparison.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Minus, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Comparison = () => {
  const headingRef = useRef(null);
  const tableRef = useRef(null);
  const sectionRef = useRef(null);

  const platforms = ["FlexiWork", "Fiverr", "Upwork", "Freelancer"];
  const features = [
    { name: "AI Smart Matching", values: ["check", "x", "partial", "x"] },
    { name: "Portable Reputation", values: ["check", "x", "x", "x"] },
    {
      name: "Real-time Collaboration",
      values: ["check", "partial", "partial", "x"],
    },
    { name: "Instant Payments", values: ["check", "x", "x", "x"] },
    { name: "Scope Creep Protection", values: ["check", "x", "x", "x"] },
    { name: "AI Skill Verification", values: ["check", "x", "partial", "x"] },
    { name: "Streaming Payments", values: ["check", "x", "x", "x"] },
    { name: "On-Chain Reviews", values: ["check", "x", "x", "x"] },
    { name: "Low Fees (< 10%)", values: ["check", "x", "partial", "partial"] },
    { name: "Team Formation AI", values: ["check", "x", "check", "partial"] },
  ];

  const renderIcon = (value) => {
    const styles = {
      check: {
        bg: "bg-secondary-400/10",
        icon: Check,
        color: "text-secondary-400",
      },
      x: { bg: "bg-danger-400/10", icon: X, color: "text-danger-400" },
      partial: {
        bg: "bg-accent-400/10",
        icon: Minus,
        color: "text-accent-400",
      },
    };
    const s = styles[value];
    return (
      <div
        className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center`}
      >
        <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
      </div>
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".anim-child"),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        },
      );
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: tableRef.current, start: "top 82%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface to-dark" />

      <div className="container-custom relative z-10 max-w-5xl">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="anim-child badge badge-primary">Comparison</span>
          <h2 className="anim-child text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary mt-5 leading-[1.15]">
            See the <span className="text-gradient">Difference</span>
          </h2>
          <p className="anim-child mt-5 text-text-secondary text-lg">
            We don't just compete — we redefine the standard.
          </p>
        </div>

        <div ref={tableRef} className="overflow-x-auto -mx-4 px-4">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              <div className="p-3">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                  Feature
                </span>
              </div>
              {platforms.map((p, i) => (
                <div
                  key={p}
                  className={`p-3 rounded-xl text-center ${
                    i === 0
                      ? "bg-gradient-to-br from-primary-500/15 to-secondary-400/8 border border-primary-500/25"
                      : "bg-surface-card border border-border-subtle"
                  }`}
                >
                  {i === 0 ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap className="w-3 h-3 text-secondary-400" />
                      <span className="font-bold text-xs text-text-primary">
                        {p}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium text-xs text-text-tertiary">
                      {p}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Rows */}
            {features.map((f, fi) => (
              <div
                key={f.name}
                className={`grid grid-cols-5 gap-2 ${fi % 2 === 0 ? "bg-surface-card/20" : ""} rounded-lg`}
              >
                <div className="p-3 flex items-center">
                  <span className="text-text-secondary text-sm font-medium">
                    {f.name}
                  </span>
                </div>
                {f.values.map((v, vi) => (
                  <div
                    key={`${fi}-${vi}`}
                    className={`p-3 flex items-center justify-center ${vi === 0 ? "bg-primary-500/3 rounded-lg" : ""}`}
                  >
                    {renderIcon(v)}
                  </div>
                ))}
              </div>
            ))}

            {/* Score */}
            <div className="grid grid-cols-5 gap-2 mt-3">
              <div className="p-3">
                <span className="text-text-primary font-bold text-xs uppercase tracking-wider">
                  Score
                </span>
              </div>
              {[
                {
                  score: "10/10",
                  color: "text-secondary-400",
                  highlighted: true,
                },
                { score: "3/10", color: "text-danger-400" },
                { score: "4/10", color: "text-accent-400" },
                { score: "2/10", color: "text-danger-400" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-3 text-center rounded-xl ${
                    item.highlighted
                      ? "bg-gradient-to-br from-primary-500/15 to-secondary-400/8 border border-primary-500/25"
                      : "bg-surface-card border border-border-subtle"
                  }`}
                >
                  <span className={`text-lg font-black ${item.color}`}>
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
