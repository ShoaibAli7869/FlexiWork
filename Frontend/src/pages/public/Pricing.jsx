// src/pages/Pricing.jsx
import { useState, memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Star,
  Zap,
  Shield,
  Users,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Crown,
  Building2,
  HelpCircle,
  MessageSquare,
  Clock,
  CreditCard,
  RefreshCw,
  Award,
  BadgeCheck,
  Flame,
} from "lucide-react";
import { clsx } from "clsx";

// ============================================
// DATA
// ============================================
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for getting started with freelancing",
    monthlyPrice: 0,
    yearlyPrice: 0,
    fee: "8%",
    icon: Zap,
    color: "text-text-tertiary",
    gradient: "from-gray-400 to-gray-500",
    cta: "Get Started Free",
    ctaStyle: "secondary",
    popular: false,
    features: [
      { text: "5 AI matches per month", included: true },
      { text: "Basic profile", included: true },
      { text: "Escrow payments", included: true },
      { text: "Community access", included: true },
      { text: "Standard support", included: true },
      { text: "Blockchain reputation", included: false },
      { text: "Streaming payments", included: false },
      { text: "Scope creep detection", included: false },
      { text: "Collaboration workspace", included: false },
      { text: "Analytics dashboard", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "For serious freelancers and growing businesses",
    monthlyPrice: 29,
    yearlyPrice: 24,
    fee: "5%",
    icon: Crown,
    color: "text-primary-500",
    gradient: "from-primary-500 to-secondary-400",
    cta: "Start Pro Trial",
    ctaStyle: "primary",
    popular: true,
    features: [
      { text: "Unlimited AI matches", included: true },
      { text: "Enhanced profile + portfolio", included: true },
      { text: "Escrow + streaming payments", included: true },
      { text: "Priority community access", included: true },
      { text: "Priority support (< 4hr)", included: true },
      { text: "Blockchain reputation", included: true },
      { text: "Streaming payments", included: true },
      { text: "Scope creep detection", included: true },
      { text: "Collaboration workspace", included: true },
      { text: "Analytics dashboard", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams, agencies, and high-volume hiring",
    monthlyPrice: 99,
    yearlyPrice: 79,
    fee: "3%",
    icon: Building2,
    color: "text-accent-500",
    gradient: "from-accent-500 to-orange-400",
    cta: "Contact Sales",
    ctaStyle: "secondary",
    popular: false,
    features: [
      { text: "Everything in Professional", included: true },
      { text: "Team formation AI", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations & API", included: true },
      { text: "SLA guarantees (99.9%)", included: true },
      { text: "Bulk hiring tools", included: true },
      { text: "White-label options", included: true },
      { text: "Custom contracts", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority matching queue", included: true },
    ],
  },
];

const COMPARISON_FEATURES = [
  {
    category: "Core",
    items: [
      {
        name: "AI Smart Matching",
        starter: "5/mo",
        pro: "Unlimited",
        enterprise: "Unlimited + Priority",
      },
      {
        name: "Profile & Portfolio",
        starter: "Basic",
        pro: "Enhanced",
        enterprise: "Custom branding",
      },
      { name: "Service Fee", starter: "8%", pro: "5%", enterprise: "3%" },
    ],
  },
  {
    category: "Payments",
    items: [
      { name: "Escrow Protection", starter: true, pro: true, enterprise: true },
      {
        name: "Streaming Payments",
        starter: false,
        pro: true,
        enterprise: true,
      },
      { name: "Multi-currency", starter: false, pro: true, enterprise: true },
      {
        name: "Instant Withdrawals",
        starter: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Tools",
    items: [
      {
        name: "Collaboration Workspace",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Scope Creep Detection",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Analytics Dashboard",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Team Formation AI",
        starter: false,
        pro: false,
        enterprise: true,
      },
      { name: "API Access", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    items: [
      { name: "Community Access", starter: true, pro: true, enterprise: true },
      {
        name: "Email Support",
        starter: "48hr",
        pro: "< 4hr",
        enterprise: "< 1hr",
      },
      {
        name: "Dedicated Manager",
        starter: false,
        pro: false,
        enterprise: true,
      },
      {
        name: "SLA Guarantee",
        starter: false,
        pro: false,
        enterprise: "99.9%",
      },
    ],
  },
];

const FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remaining billing period. When downgrading, changes take effect at the next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans. All payments are processed securely through Stripe.",
  },
  {
    q: "Is there a free trial for Professional?",
    a: "Yes! Every new account gets a 14-day free trial of the Professional plan with full access to all features. No credit card required to start.",
  },
  {
    q: "What's the difference between service fee and subscription?",
    a: "The subscription is a monthly/yearly fee for platform access and features. The service fee is a percentage taken from each transaction. Higher plans have lower service fees, saving you money on every project.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us within 30 days of purchase for a full refund, no questions asked.",
  },
];

const TRUST_STATS = [
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "$12M+", label: "Paid Out", icon: CreditCard },
  { value: "99.9%", label: "Uptime SLA", icon: Shield },
  { value: "4.9/5", label: "User Rating", icon: Star },
];

// ============================================
// COMPONENTS
// ============================================
const PlanCard = memo(({ plan, yearly }) => {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  const Icon = plan.icon;

  return (
    <div
      className={clsx(
        "relative rounded-2xl flex flex-col transition-all duration-300",
        plan.popular
          ? "shadow-theme-lg md:scale-[1.03] z-10"
          : "hover:-translate-y-1",
      )}
      style={{
        background: "var(--theme-surface-card)",
        border: plan.popular
          ? "2px solid var(--brand-primary-500)"
          : "1px solid var(--theme-border-default)",
        ...(plan.popular
          ? { boxShadow: "0 20px 60px rgba(108, 59, 247, 0.1)" }
          : {}),
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="flex items-center gap-1 px-3.5 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-400 text-white text-[11px] font-bold shadow-md">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </span>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className={clsx(
              "w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br",
              plan.gradient,
            )}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-text-primary font-bold text-lg">{plan.name}</h3>
          </div>
        </div>

        <p className="text-text-tertiary text-[13px] mb-5">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className="text-text-primary font-extrabold text-4xl tabular-nums">
              ${price}
            </span>
            {price > 0 && <span className="text-text-muted text-sm">/mo</span>}
          </div>
          {yearly && price > 0 && (
            <p className="text-secondary-500 text-[12px] font-semibold mt-1">
              ${plan.yearlyPrice * 12}/year · Save $
              {(plan.monthlyPrice - plan.yearlyPrice) * 12}
            </p>
          )}
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={clsx(
                "text-[12px] font-bold bg-gradient-to-r bg-clip-text text-transparent",
                plan.gradient,
              )}
            >
              {plan.fee} service fee
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          className={clsx(
            "w-full py-3 rounded-xl font-semibold text-[14px] transition-all duration-300 mb-6",
            plan.ctaStyle === "primary" ? "btn-primary" : "btn-secondary",
          )}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        {/* Features */}
        <div className="space-y-2.5 flex-1">
          {plan.features.map((f) => (
            <div key={f.text} className="flex items-start gap-2.5">
              {f.included ? (
                <CheckCircle className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-text-muted/40 shrink-0 mt-0.5" />
              )}
              <span
                className={clsx(
                  "text-[13px]",
                  f.included
                    ? "text-text-secondary"
                    : "text-text-muted/50 line-through",
                )}
              >
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const CheckCircle = memo(({ className }) => (
  <div className={className}>
    <Check className="w-full h-full" />
  </div>
));

const XCircle = memo(({ className }) => (
  <div className={className}>
    <X className="w-full h-full" />
  </div>
));

const ComparisonValue = memo(({ value }) => {
  if (value === true)
    return (
      <div className="w-5 h-5 rounded-full bg-secondary-400/10 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 text-secondary-500" />
      </div>
    );
  if (value === false)
    return (
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center mx-auto"
        style={{ background: "var(--theme-bg-inset)" }}
      >
        <X className="w-3 h-3 text-text-muted/40" />
      </div>
    );
  return (
    <span className="text-text-primary text-[13px] font-semibold">{value}</span>
  );
});

const FAQItem = memo(({ faq, open, onToggle }) => (
  <div className="card overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 group"
    >
      <span className="text-text-primary font-semibold text-[14px] group-hover:text-primary-500 transition-colors">
        {faq.q}
      </span>
      <ChevronDown
        className={clsx(
          "w-4 h-4 text-text-muted shrink-0 transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 -mt-1">
            <p className="text-text-secondary text-[13px] leading-relaxed">
              {faq.a}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

// ============================================
// MAIN
// ============================================
const Pricing = () => {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const toggleFaq = useCallback(
    (i) => setOpenFaq((p) => (p === i ? null : i)),
    [],
  );

  return (
    <div className="min-h-screen bg-page">
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden pt-24 lg:pt-32 pb-10 hero-bg bg-noise">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] orb-primary opacity-30 pointer-events-none" />

        <div className="container-custom relative z-10 text-center">
          <span className="badge badge-secondary mb-4 inline-flex">
            <Sparkles className="w-3 h-3" />
            Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-tight max-w-2xl mx-auto">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h1>
          <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-lg mx-auto">
            No hidden fees. No surprises. Start free, upgrade when you're ready.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span
              className={clsx(
                "text-[13px] font-semibold transition-colors",
                !yearly ? "text-text-primary" : "text-text-muted",
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={clsx(
                "relative w-12 h-6 rounded-full transition-all duration-300",
                yearly ? "bg-primary-500" : "",
              )}
              style={
                !yearly
                  ? { background: "var(--theme-border-default)" }
                  : undefined
              }
            >
              <div
                className={clsx(
                  "absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform duration-300",
                  yearly ? "translate-x-[27px]" : "translate-x-[3px]",
                )}
              />
            </button>
            <span
              className={clsx(
                "text-[13px] font-semibold transition-colors",
                yearly ? "text-text-primary" : "text-text-muted",
              )}
            >
              Yearly
            </span>
            {yearly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge badge-secondary !text-[10px] !py-[2px] !px-2"
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </div>
      </section>

      {/* ====== PLAN CARDS ====== */}
      <section className="container-custom -mt-2 relative z-10 pb-16">
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-start">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} yearly={yearly} />
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-8 flex flex-wrap items-center justify-center gap-4 text-[12px] text-text-muted">
          {[
            { icon: Shield, text: "30-day money-back guarantee" },
            { icon: CreditCard, text: "No credit card for free plan" },
            { icon: RefreshCw, text: "Cancel anytime" },
          ].map(({ icon: I, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <I className="w-3.5 h-3.5 text-secondary-500" />
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* ====== COMPARISON TABLE ====== */}
      <section className="container-custom pb-16">
        <div className="text-center mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-primary-500 text-[14px] font-semibold hover:text-primary-600 transition-colors"
          >
            {showComparison ? "Hide" : "View"} Full Comparison
            <ChevronDown
              className={clsx(
                "w-4 h-4 transition-transform",
                showComparison && "rotate-180",
              )}
            />
          </button>
        </div>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card overflow-hidden max-w-5xl mx-auto">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    {/* Header */}
                    <thead>
                      <tr>
                        <th className="text-left p-4 text-text-muted text-[12px] font-semibold uppercase tracking-wider w-[40%]">
                          Feature
                        </th>
                        {["Starter", "Professional", "Enterprise"].map(
                          (name, i) => (
                            <th
                              key={name}
                              className={clsx(
                                "p-4 text-center text-[13px] font-bold",
                                i === 1
                                  ? "text-primary-500"
                                  : "text-text-primary",
                              )}
                              style={
                                i === 1
                                  ? {
                                      background:
                                        "var(--theme-comparison-highlight-bg)",
                                    }
                                  : undefined
                              }
                            >
                              {name}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_FEATURES.map((group) => (
                        <>
                          <tr key={group.category}>
                            <td colSpan={4} className="px-4 pt-5 pb-2">
                              <span className="text-text-primary font-bold text-[12px] uppercase tracking-wider">
                                {group.category}
                              </span>
                            </td>
                          </tr>
                          {group.items.map((item) => (
                            <tr
                              key={item.name}
                              className="border-t"
                              style={{
                                borderColor: "var(--theme-border-subtle)",
                              }}
                            >
                              <td className="px-4 py-3 text-text-secondary text-[13px]">
                                {item.name}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <ComparisonValue value={item.starter} />
                              </td>
                              <td
                                className="px-4 py-3 text-center"
                                style={{
                                  background:
                                    "var(--theme-comparison-highlight-bg)",
                                }}
                              >
                                <ComparisonValue value={item.pro} />
                              </td>
                              <td className="px-4 py-3 text-center">
                                <ComparisonValue value={item.enterprise} />
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ====== TRUST STATS ====== */}
      <section className="container-custom pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {TRUST_STATS.map(({ value, label, icon: I }) => (
            <div key={label} className="card p-5 text-center">
              <I className="w-5 h-5 mx-auto mb-2 text-primary-500" />
              <div className="text-text-primary font-extrabold text-2xl tabular-nums">
                {value}
              </div>
              <div className="text-text-muted text-[11px] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section className="container-custom pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="badge badge-accent mb-3 inline-flex">
              <HelpCircle className="w-3 h-3" />
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                open={openFaq === i}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="container-custom pb-20">
        <div className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
          <div className="absolute inset-0 bg-dots opacity-10" />
          <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-14 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-secondary-300" />
              <span className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.15em]">
                Start Today
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight max-w-lg mx-auto">
              Ready to Work on{" "}
              <span className="text-secondary-300">Your Terms?</span>
            </h2>
            <p className="mt-3 text-white/50 text-sm max-w-md mx-auto">
              Join 50,000+ freelancers. Start free — no credit card required.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="group px-6 py-3 bg-white text-primary-700 font-bold rounded-xl hover:shadow-xl hover:shadow-white/15 transition-all text-sm flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all text-sm"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
