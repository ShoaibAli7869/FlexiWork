// src/components/landing/Pricing.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Star, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      fee: "8%",
      features: [
        "AI Smart Matching (5/month)",
        "Basic profile",
        "Standard support",
        "Escrow payments",
        "Community access",
      ],
      cta: "Start Free",
      popular: false,
      gradient: "from-dark-600 to-dark-500",
    },
    {
      name: "Professional",
      description: "For serious freelancers & businesses",
      monthlyPrice: 29,
      yearlyPrice: 24,
      fee: "5%",
      features: [
        "Unlimited AI Matching",
        "Blockchain reputation",
        "Priority support",
        "Streaming payments",
        "Scope creep detection",
        "Collaboration workspace",
        "Analytics dashboard",
        "Custom proposals",
      ],
      cta: "Go Professional",
      popular: true,
      gradient: "from-primary-500 to-secondary-400",
    },
    {
      name: "Enterprise",
      description: "For teams and agencies",
      monthlyPrice: 99,
      yearlyPrice: 79,
      fee: "3%",
      features: [
        "Everything in Pro",
        "Team formation AI",
        "Dedicated manager",
        "Custom integrations",
        "SLA guarantees",
        "Bulk hiring tools",
        "White-label options",
        "API access",
        "Priority matching",
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-accent-500 to-orange-400",
    },
  ];

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

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-surface" />

      <div className="container-custom relative z-10">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-12">
          <span className="anim-child badge badge-secondary">
            <Zap className="w-3 h-3" />
            Pricing
          </span>
          <h2 className="anim-child text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary mt-5 leading-[1.15]">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="anim-child mt-5 text-text-secondary text-lg">
            No hidden fees. No surprises. Pay only for what you need.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span
            className={`text-sm font-medium transition-colors ${!isYearly ? "text-text-primary" : "text-text-tertiary"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              isYearly ? "bg-primary-500" : "bg-dark-400"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                isYearly ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${isYearly ? "text-text-primary" : "text-text-tertiary"}`}
          >
            Yearly
          </span>
          {isYearly && (
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-400/10 text-secondary-400 text-xs font-bold border border-secondary-400/20">
              Save 20%
            </span>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary-500/8 to-surface-card border-2 border-primary-500/25 shadow-xl shadow-primary-500/5 md:scale-105 z-10"
                  : "bg-surface-card border border-border-default hover:border-border-strong"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-400 text-white text-[11px] font-bold shadow-lg shadow-primary-500/25">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-bold text-text-primary">
                  {plan.name}
                </h3>
                <p className="text-text-tertiary text-sm mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-text-primary">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-text-muted text-sm mb-1.5">/mo</span>
                </div>
                <span
                  className={`text-xs font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent mt-1 inline-block`}
                >
                  {plan.fee} service fee
                </span>
              </div>

              <div className="space-y-3 mb-7 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div
                      className={`w-4.5 h-4.5 rounded-md bg-gradient-to-r ${plan.gradient} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-text-secondary text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  plan.popular
                    ? "btn-primary"
                    : "bg-surface border border-border-default text-text-primary hover:border-border-strong hover:bg-surface-hover"
                }`}
              >
                <span className="relative z-10">{plan.cta}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
