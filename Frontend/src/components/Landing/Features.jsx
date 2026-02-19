// src/components/landing/Features.jsx
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Shield,
  Banknote,
  Video,
  Sparkles,
  Users,
  Zap,
  Check,
  ArrowRight,
  Star,
  Clock,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   STATIC DATA — hoisted, frozen, never re-created
   ════════════════════════════════════════════ */

const COLOR_MAP = Object.freeze({
  primary: Object.freeze({
    iconBg: "var(--theme-feature-icon-primary-bg)",
    text: "var(--brand-primary-500)",
    text400: "var(--brand-primary-400)",
    badgeBg: "var(--theme-badge-primary-bg)",
    badgeBorder: "var(--theme-badge-primary-border)",
    badgeText: "var(--theme-badge-primary-text)",
    gradient: "var(--brand-primary-500), var(--brand-primary-400)",
    highlightBg: "var(--theme-comparison-highlight-bg)",
    highlightBorder: "var(--theme-comparison-highlight-border)",
  }),
  secondary: Object.freeze({
    iconBg: "var(--theme-feature-icon-secondary-bg)",
    text: "var(--brand-secondary-500)",
    text400: "var(--brand-secondary-400)",
    badgeBg: "var(--theme-badge-secondary-bg)",
    badgeBorder: "var(--theme-badge-secondary-border)",
    badgeText: "var(--theme-badge-secondary-text)",
    gradient: "var(--brand-secondary-500), var(--brand-secondary-400)",
    highlightBg: "var(--theme-badge-secondary-bg)",
    highlightBorder: "var(--theme-badge-secondary-border)",
  }),
  accent: Object.freeze({
    iconBg: "var(--theme-feature-icon-accent-bg)",
    text: "var(--brand-accent-500)",
    text400: "var(--brand-accent-400)",
    badgeBg: "var(--theme-badge-accent-bg)",
    badgeBorder: "var(--theme-badge-accent-border)",
    badgeText: "var(--theme-badge-accent-text)",
    gradient: "var(--brand-accent-500), var(--brand-accent-400)",
    highlightBg: "var(--theme-badge-accent-bg)",
    highlightBorder: "var(--theme-badge-accent-border)",
  }),
});

const FEATURES = Object.freeze([
  Object.freeze({
    id: "ai-matching",
    icon: Cpu,
    title: "AI Smart Matching",
    tagline: "Find the perfect freelancer in minutes, not days.",
    description:
      "Our AI analyzes requirements, budget, timeline, and skills to find the perfect match with 95%+ accuracy. Natural language parsing meets behavioral analysis.",
    highlights: Object.freeze([
      "Natural language parsing",
      "Behavioral analysis",
      "Success prediction engine",
    ]),
    color: "primary",
    visualType: "matching",
  }),
  Object.freeze({
    id: "blockchain-rep",
    icon: Shield,
    title: "Blockchain Reputation",
    tagline: "Your reputation, owned by you — forever.",
    description:
      "Verified on-chain reviews that travel with you across platforms. No more starting from zero when you switch.",
    highlights: Object.freeze([
      "Immutable on-chain reviews",
      "Cross-platform portable",
      "Sybil-resistant verification",
    ]),
    color: "secondary",
    visualType: "reputation",
  }),
  Object.freeze({
    id: "streaming-pay",
    icon: Banknote,
    title: "Streaming Payments",
    tagline: "Get paid as you work, not weeks later.",
    description:
      "Milestone-based escrow with real-time payment streaming. Instant withdrawals in 50+ currencies worldwide.",
    highlights: Object.freeze([
      "Instant withdrawals",
      "Milestone-based escrow",
      "50+ currencies supported",
    ]),
    color: "accent",
    visualType: "payment",
  }),
  Object.freeze({
    id: "live-collab",
    icon: Video,
    title: "Live Collaboration",
    tagline: "Everything you need, in one place.",
    description:
      "Built-in HD video calls, screen sharing, collaborative code editors, and design tools. Zero app switching.",
    highlights: Object.freeze([
      "HD video conferencing",
      "Live code editor",
      "Real-time whiteboard",
    ]),
    color: "primary",
    visualType: "collab",
  }),
  Object.freeze({
    id: "scope-shield",
    icon: Sparkles,
    title: "Scope Creep Shield",
    tagline: "AI catches scope creep before it catches you.",
    description:
      "AI monitors conversations and milestones to detect scope changes. Automated alerts and fair adjustment suggestions.",
    highlights: Object.freeze([
      "Automatic detection",
      "Smart alert system",
      "Fair price adjustments",
    ]),
    color: "secondary",
    visualType: "shield",
  }),
  Object.freeze({
    id: "team-ai",
    icon: Users,
    title: "Team Formation AI",
    tagline: "One click to assemble your dream team.",
    description:
      "Our AI builds the perfect squad based on skills, timezone, availability, and past collaboration synergy scoring.",
    highlights: Object.freeze([
      "Auto team assembly",
      "Role-skill matching",
      "Synergy scoring",
    ]),
    color: "accent",
    visualType: "team",
  }),
]);

const MATCH_DATA = Object.freeze([
  Object.freeze({
    name: "Sarah C.",
    initials: "SC",
    role: "Full-Stack",
    match: 98,
    projects: 142,
  }),
  Object.freeze({
    name: "Alex R.",
    initials: "AR",
    role: "UI/UX",
    match: 94,
    projects: 89,
  }),
  Object.freeze({
    name: "James O.",
    initials: "JO",
    role: "DevOps",
    match: 87,
    projects: 67,
  }),
]);

const MILESTONES = Object.freeze([
  Object.freeze({
    label: "Milestone 1",
    status: "Paid",
    statusColor: "var(--brand-success-500)",
  }),
  Object.freeze({ label: "Milestone 2", status: "Streaming", active: true }),
  Object.freeze({
    label: "Milestone 3",
    status: "Pending",
    statusColor: "var(--theme-text-muted)",
  }),
]);

const TEAM_MEMBERS = Object.freeze([
  Object.freeze({ role: "Frontend", initials: "SC", synergy: 97 }),
  Object.freeze({ role: "Backend", initials: "AR", synergy: 95 }),
  Object.freeze({ role: "Designer", initials: "LP", synergy: 93 }),
  Object.freeze({ role: "DevOps", initials: "JO", synergy: 91 }),
]);

/* ════════════════════════════════════════════
   SUB-COMPONENTS — all memoized
   ════════════════════════════════════════════ */

/* ── Highlight Check Item ── */
const HighlightItem = memo(({ text, colors, index }) => (
  <div
    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
    style={{
      background: index === 0 ? colors.iconBg : "var(--theme-surface-muted)",
      border: `1px solid ${index === 0 ? colors.badgeBorder : "var(--theme-border-subtle)"}`,
    }}
  >
    <div
      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: colors.iconBg }}
    >
      <Check className="w-3.5 h-3.5" style={{ color: colors.text }} />
    </div>
    <span className="text-text-secondary text-sm font-medium">{text}</span>
  </div>
));
HighlightItem.displayName = "HighlightItem";

/* ── Animated Progress Bar ── */
const ProgressBar = memo(({ percentage, colors, animated = true }) => (
  <div
    className="h-2 rounded-full overflow-hidden flex-1"
    style={{ background: "var(--theme-bg-tertiary)" }}
  >
    <div
      className="h-full rounded-full relative overflow-hidden"
      style={{
        width: `${percentage}%`,
        background: `linear-gradient(90deg, ${colors.text}, ${colors.text400})`,
        transition: animated ? "width 1s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
      }}
    >
      <div
        className="absolute inset-0 animate-shine"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
        aria-hidden="true"
      />
    </div>
  </div>
));
ProgressBar.displayName = "ProgressBar";

/* ── Match Person Row ── */
const MatchRow = memo(({ person, colors, isTop }) => (
  <div
    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
    style={{
      background: isTop ? colors.highlightBg : "var(--theme-surface-muted)",
      border: `1px solid ${isTop ? colors.highlightBorder : "var(--theme-border-subtle)"}`,
    }}
  >
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
      style={{ background: `linear-gradient(135deg, ${colors.gradient})` }}
    >
      {person.initials}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="text-text-primary text-xs font-semibold truncate">
          {person.name}
        </span>
        {isTop && (
          <CheckCircle2
            className="w-3 h-3 shrink-0"
            style={{ color: colors.text }}
          />
        )}
      </div>
      <div className="text-text-muted text-[10px]">
        {person.role} · {person.projects} projects
      </div>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <div className="w-14 hidden sm:block">
        <ProgressBar percentage={person.match} colors={colors} />
      </div>
      <span
        className="text-xs font-bold min-w-[2rem] text-right"
        style={{ color: colors.text }}
      >
        {person.match}%
      </span>
    </div>
  </div>
));
MatchRow.displayName = "MatchRow";

/* ── Visual: AI Matching ── */
const MatchingVisual = memo(({ colors }) => (
  <div className="space-y-2.5">
    <div className="flex items-center justify-between mb-1">
      <span className="text-text-muted text-[10px] font-medium uppercase tracking-wider">
        AI Match Results
      </span>
      <span className="relative flex h-1.5 w-1.5">
        <span
          className="animate-ping absolute h-full w-full rounded-full opacity-75"
          style={{ background: colors.text }}
        />
        <span
          className="relative rounded-full h-1.5 w-1.5"
          style={{ background: colors.text }}
        />
      </span>
    </div>
    {MATCH_DATA.map((person, i) => (
      <MatchRow
        key={person.initials}
        person={person}
        colors={colors}
        isTop={i === 0}
      />
    ))}
  </div>
));
MatchingVisual.displayName = "MatchingVisual";

/* ── Visual: Streaming Payments ── */
const PaymentVisual = memo(({ colors }) => (
  <div className="space-y-4">
    <div className="flex items-baseline justify-between">
      <span className="text-text-muted text-xs">Real-time balance</span>
      <span className="text-text-primary font-black text-xl">
        $2,847
        <span className="text-text-tertiary text-sm font-medium">.32</span>
      </span>
    </div>
    <ProgressBar percentage={68} colors={colors} />
    <div className="grid grid-cols-3 gap-2">
      {MILESTONES.map((m) => (
        <div
          key={m.label}
          className="text-center p-2.5 rounded-xl transition-colors duration-200"
          style={{
            background: m.active ? colors.iconBg : "var(--theme-surface-muted)",
            border: `1px solid ${m.active ? colors.badgeBorder : "var(--theme-border-subtle)"}`,
          }}
        >
          <div className="text-[10px] text-text-muted">{m.label}</div>
          <div
            className="text-[10px] font-bold mt-0.5"
            style={{
              color: m.active
                ? colors.text
                : m.statusColor || "var(--theme-text-muted)",
            }}
          >
            {m.status}
          </div>
        </div>
      ))}
    </div>
  </div>
));
PaymentVisual.displayName = "PaymentVisual";

/* ── Visual: Reputation Chain ── */
const ReputationVisual = memo(({ colors }) => (
  <div className="space-y-3">
    {[
      { platform: "FlexiWork", rating: "4.9", reviews: 142, verified: true },
      {
        platform: "Previous Platform",
        rating: "4.8",
        reviews: 89,
        verified: true,
      },
      {
        platform: "Portable Score",
        rating: "4.9",
        reviews: 231,
        verified: true,
      },
    ].map((item, i) => (
      <div
        key={item.platform}
        className="flex items-center gap-3 p-3 rounded-xl"
        style={{
          background: i === 2 ? colors.iconBg : "var(--theme-surface-muted)",
          border: `1px solid ${i === 2 ? colors.badgeBorder : "var(--theme-border-subtle)"}`,
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: i === 2 ? colors.iconBg : "var(--theme-surface-card)",
          }}
        >
          {i === 2 ? (
            <Shield className="w-4 h-4" style={{ color: colors.text }} />
          ) : (
            <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-text-primary text-xs font-semibold">
            {item.platform}
          </div>
          <div className="text-text-muted text-[10px]">
            {item.reviews} reviews
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
          <span className="text-text-primary text-xs font-bold">
            {item.rating}
          </span>
          {item.verified && (
            <CheckCircle2 className="w-3 h-3" style={{ color: colors.text }} />
          )}
        </div>
      </div>
    ))}
  </div>
));
ReputationVisual.displayName = "ReputationVisual";

/* ── Visual: Live Collaboration ── */
const CollabVisual = memo(({ colors }) => (
  <div className="space-y-4">
    {/* Active call indicator */}
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{
        background: colors.iconBg,
        border: `1px solid ${colors.badgeBorder}`,
      }}
    >
      <Video className="w-4 h-4" style={{ color: colors.text }} />
      <span className="text-text-primary text-xs font-semibold flex-1">
        Team Standup
      </span>
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
        style={{ background: colors.badgeBg, color: colors.badgeText }}
      >
        Live · 12:34
      </span>
    </div>

    {/* Participants */}
    <div className="flex items-center gap-2">
      {["SC", "AR", "JO"].map((initials, i) => (
        <div key={initials} className="relative">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{
              background: `linear-gradient(135deg, ${colors.gradient})`,
              opacity: 1 - i * 0.15,
            }}
          >
            {initials}
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{
              background: "var(--brand-success-500)",
              borderColor: "var(--theme-surface-card)",
            }}
          />
        </div>
      ))}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{
          background: "var(--theme-surface-muted)",
          border: "1px dashed var(--theme-border-default)",
          color: "var(--theme-text-muted)",
        }}
      >
        +2
      </div>
      <span className="text-text-muted text-xs ml-1">in call</span>
    </div>

    {/* Tools */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: MessageSquare, label: "Chat" },
        { icon: Cpu, label: "Code" },
        { icon: Sparkles, label: "Board" },
      ].map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center justify-center gap-1.5 p-2 rounded-lg"
          style={{
            background: "var(--theme-surface-muted)",
            border: "1px solid var(--theme-border-subtle)",
          }}
        >
          <Icon className="w-3 h-3 text-text-muted" />
          <span className="text-text-tertiary text-[10px] font-medium">
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
));
CollabVisual.displayName = "CollabVisual";

/* ── Visual: Scope Shield ── */
const ShieldVisual = memo(({ colors }) => (
  <div className="space-y-3">
    {/* Alert */}
    <div
      className="flex items-start gap-3 p-3 rounded-xl"
      style={{
        background: "var(--theme-badge-accent-bg)",
        border: "1px solid var(--theme-badge-accent-border)",
      }}
    >
      <AlertTriangle
        className="w-4 h-4 shrink-0 mt-0.5"
        style={{ color: "var(--theme-badge-accent-text)" }}
      />
      <div>
        <div
          className="text-xs font-bold"
          style={{ color: "var(--theme-badge-accent-text)" }}
        >
          Scope change detected
        </div>
        <div className="text-text-muted text-[10px] mt-0.5">
          3 new requirements added outside original brief
        </div>
      </div>
    </div>

    {/* Milestones with scope */}
    {[
      { name: "Original Scope", items: 5, status: "On track" },
      { name: "Added Items", items: 3, status: "Flagged", flagged: true },
    ].map((scope) => (
      <div
        key={scope.name}
        className="flex items-center gap-3 p-3 rounded-xl"
        style={{
          background: scope.flagged
            ? colors.iconBg
            : "var(--theme-surface-muted)",
          border: `1px solid ${scope.flagged ? colors.badgeBorder : "var(--theme-border-subtle)"}`,
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: scope.flagged
              ? colors.iconBg
              : "var(--theme-surface-card)",
          }}
        >
          <span
            className="text-xs font-bold"
            style={{
              color: scope.flagged ? colors.text : "var(--theme-text-muted)",
            }}
          >
            {scope.items}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-text-primary text-xs font-semibold">
            {scope.name}
          </div>
        </div>
        <span
          className="text-[10px] font-bold"
          style={{
            color: scope.flagged ? colors.text : "var(--brand-success-500)",
          }}
        >
          {scope.status}
        </span>
      </div>
    ))}

    {/* Suggestion */}
    <div
      className="p-3 rounded-xl"
      style={{
        background: colors.iconBg,
        border: `1px solid ${colors.badgeBorder}`,
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className="w-3 h-3" style={{ color: colors.text }} />
        <span className="text-xs font-bold" style={{ color: colors.text }}>
          AI Suggestion
        </span>
      </div>
      <p className="text-text-secondary text-[10px] leading-relaxed">
        Adjust budget by +$450 to fairly cover additional requirements
      </p>
    </div>
  </div>
));
ShieldVisual.displayName = "ShieldVisual";

/* ── Visual: Team Formation ── */
const TeamVisual = memo(({ colors }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between mb-1">
      <span className="text-text-muted text-[10px] font-medium uppercase tracking-wider">
        Team Assembly
      </span>
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
        style={{ background: colors.badgeBg, color: colors.badgeText }}
      >
        4 matched
      </span>
    </div>
    {TEAM_MEMBERS.map((member, i) => (
      <div
        key={member.role}
        className="flex items-center gap-3 p-3 rounded-xl"
        style={{
          background: i === 0 ? colors.iconBg : "var(--theme-surface-muted)",
          border: `1px solid ${i === 0 ? colors.badgeBorder : "var(--theme-border-subtle)"}`,
        }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0"
          style={{
            background: `linear-gradient(135deg, ${colors.gradient})`,
            opacity: 1 - i * 0.08,
          }}
        >
          {member.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-text-primary text-xs font-semibold">
            {member.role}
          </div>
          <div className="text-text-muted text-[10px]">
            Synergy: {member.synergy}%
          </div>
        </div>
        <div className="w-12">
          <ProgressBar
            percentage={member.synergy}
            colors={colors}
            animated={false}
          />
        </div>
      </div>
    ))}
  </div>
));
TeamVisual.displayName = "TeamVisual";

/* ── Visual Router ── */
const VISUAL_MAP = {
  matching: MatchingVisual,
  reputation: ReputationVisual,
  payment: PaymentVisual,
  collab: CollabVisual,
  shield: ShieldVisual,
  team: TeamVisual,
};

const SpotlightVisual = memo(({ visualType, colors }) => {
  const VisualComponent = VISUAL_MAP[visualType];
  if (!VisualComponent) return null;
  return <VisualComponent colors={colors} />;
});
SpotlightVisual.displayName = "SpotlightVisual";

/* ── Feature Selector Button ── */
const FeatureTab = memo(({ feature, index, isActive, colors, onClick }) => {
  const handleClick = useCallback(() => onClick(index), [onClick, index]);

  return (
    <button
      onClick={handleClick}
      className="relative flex flex-col items-center gap-2.5 p-4 rounded-2xl
                 text-center cursor-pointer transition-all duration-300
                 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: isActive ? colors.iconBg : "transparent",
        border: `1px solid ${isActive ? colors.badgeBorder : "var(--theme-border-subtle)"}`,
        outlineColor: colors.text,
      }}
      aria-pressed={isActive}
      aria-label={`${feature.title}: ${feature.tagline}`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300"
        style={{
          background: isActive ? colors.iconBg : "var(--theme-surface-muted)",
          transform: isActive ? "scale(1.1)" : "scale(1)",
        }}
      >
        <feature.icon
          className="w-5 h-5"
          style={{
            color: isActive ? colors.text : "var(--theme-text-tertiary)",
          }}
          aria-hidden="true"
        />
      </div>
      <span
        className="text-xs font-semibold leading-tight transition-colors duration-200"
        style={{
          color: isActive
            ? "var(--theme-text-primary)"
            : "var(--theme-text-tertiary)",
        }}
      >
        {feature.title}
      </span>

      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
          style={{ background: colors.text }}
          aria-hidden="true"
        />
      )}
    </button>
  );
});
FeatureTab.displayName = "FeatureTab";

/* ── Bottom Quick Nav Card ── */
const QuickNavCard = memo(({ feature, index, colors, onClick }) => {
  const handleClick = useCallback(() => onClick(index), [onClick, index]);

  return (
    <button
      data-feature
      onClick={handleClick}
      className="group p-4 rounded-xl text-center cursor-pointer
                 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        background: "var(--theme-surface-card)",
        border: "1px solid var(--theme-border-subtle)",
        outlineColor: colors.text,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.badgeBorder;
        e.currentTarget.style.background = colors.iconBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--theme-border-subtle)";
        e.currentTarget.style.background = "var(--theme-surface-card)";
      }}
      aria-label={`Jump to ${feature.title}`}
    >
      <feature.icon
        className="w-5 h-5 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110"
        style={{ color: colors.text }}
        aria-hidden="true"
      />
      <span className="text-text-tertiary text-xs font-semibold group-hover:text-text-primary transition-colors duration-200">
        {feature.title}
      </span>
    </button>
  );
});
QuickNavCard.displayName = "QuickNavCard";

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

const Features = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const spotlightRef = useRef(null);
  const spotlightContentRef = useRef(null);
  const gridRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = FEATURES[activeIndex];
  const activeColors = COLOR_MAP[activeFeature.color];

  /* ── Scroll-triggered entrance animations ── */
  useEffect(() => {
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

      // Spotlight card
      if (spotlightRef.current) {
        gsap.fromTo(
          spotlightRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: spotlightRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Bottom grid
      const gridItems = gridRef.current?.querySelectorAll("[data-feature]");
      if (gridItems?.length) {
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Spotlight content transition ── */
  useEffect(() => {
    const el = spotlightContentRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      el,
      { opacity: 0, x: 15, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.35 },
    );

    return () => tl.kill();
  }, [activeIndex]);

  /* ── Handlers ── */
  const handleTabClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleQuickNavClick = useCallback((index) => {
    setActiveIndex(index);
    spotlightRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  /* ── Memoized feature counter text ── */
  const featureCountText = useMemo(
    () => `${activeIndex + 1} of ${FEATURES.length}`,
    [activeIndex],
  );

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--theme-bg)" }}
      aria-labelledby="features-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full orb-primary blur-[160px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full orb-secondary blur-[140px] opacity-30" />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <div
          ref={headingRef}
          className="text-center max-w-4xl rounded-full mx-auto mb-14"
        >
          <div
            data-animate
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "var(--theme-badge-secondary-bg)",
              border: "1px solid var(--theme-badge-secondary-border)",
            }}
          >
            <Zap
              className="w-3.5 h-3.5"
              style={{ color: "var(--theme-badge-secondary-text)" }}
            />
            Features
          </div>
          <h2
            id="features-heading"
            data-animate
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-[1.1]"
          >
            Built Different.{" "}
            <span className="text-gradient">Built Better.</span>
          </h2>
          <p
            data-animate
            className="mt-5 text-text-secondary text-lg leading-relaxed"
          >
            Every feature solves a real problem freelancers and clients face
            daily.
          </p>
        </div>

        {/* ── Spotlight Card ── */}
        <div
          ref={spotlightRef}
          className="mb-8 rounded-3xl overflow-hidden"
          style={{
            background: "var(--theme-surface-card)",
            border: "1px solid var(--theme-border-default)",
            boxShadow: "var(--theme-shadow-lg)",
          }}
          role="tabpanel"
          aria-label={`Feature details: ${activeFeature.title}`}
        >
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            {/* Left — Tabs */}
            <div
              className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "var(--theme-border-subtle)" }}
              role="tablist"
              aria-label="Feature selector"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FEATURES.map((feature, i) => (
                  <FeatureTab
                    key={feature.id}
                    feature={feature}
                    index={i}
                    isActive={i === activeIndex}
                    colors={COLOR_MAP[feature.color]}
                    onClick={handleTabClick}
                  />
                ))}
              </div>
            </div>

            {/* Right — Detail */}
            <div className="p-5 sm:p-7" ref={spotlightContentRef}>
              {/* Feature header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: activeColors.iconBg }}
                  >
                    <activeFeature.icon
                      className="w-5 h-5"
                      style={{ color: activeColors.text }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-text-primary font-bold text-lg leading-tight">
                      {activeFeature.title}
                    </h3>
                    <p className="text-text-muted text-xs mt-0.5">
                      {activeFeature.tagline}
                    </p>
                  </div>
                </div>
                <span className="text-text-muted text-[10px] font-mono mt-1 shrink-0">
                  {featureCountText}
                </span>
              </div>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {activeFeature.description}
              </p>

              {/* Visual */}
              <SpotlightVisual
                visualType={activeFeature.visualType}
                colors={activeColors}
              />

              {/* Footer */}
              <div
                className="mt-5 pt-5 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
              >
                <button
                  className="flex items-center gap-2 text-sm font-semibold
                             transition-colors duration-200 group cursor-pointer"
                  style={{ color: activeColors.text }}
                  aria-label={`Learn more about ${activeFeature.title}`}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                {/* Keyboard nav hint */}
                <div className="hidden lg:flex items-center gap-1.5 text-text-muted">
                  <span className="text-[10px]">Navigate:</span>
                  <button
                    onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
                    disabled={activeIndex === 0}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs
                               transition-colors duration-200 cursor-pointer
                               disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--theme-surface-muted)",
                      border: "1px solid var(--theme-border-subtle)",
                    }}
                    aria-label="Previous feature"
                  >
                    ←
                  </button>
                  <button
                    onClick={() =>
                      setActiveIndex((p) =>
                        Math.min(FEATURES.length - 1, p + 1),
                      )
                    }
                    disabled={activeIndex === FEATURES.length - 1}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs
                               transition-colors duration-200 cursor-pointer
                               disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: "var(--theme-surface-muted)",
                      border: "1px solid var(--theme-border-subtle)",
                    }}
                    aria-label="Next feature"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Nav Grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          aria-label="Jump to feature"
        >
          {FEATURES.map((feature, i) => (
            <QuickNavCard
              key={`nav-${feature.id}`}
              feature={feature}
              index={i}
              colors={COLOR_MAP[feature.color]}
              onClick={handleQuickNavClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Features);
