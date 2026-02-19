// src/pages/FreelancerProfile.jsx
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Calendar,
  Briefcase,
  DollarSign,
  MessageSquare,
  Heart,
  Shield,
  Zap,
  Globe,
  ExternalLink,
  Share2,
  CheckCircle2,
  Award,
  Timer,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Languages,
  X,
  Send,
  Check,
  Copy,
  BadgeCheck,
  Flame,
  ChevronRight,
  Eye,
  AlertCircle,
  Play,
  Image as ImageIcon,
  Quote,
} from "lucide-react";
import { clsx } from "clsx";

// ============================================
// FREELANCER DATA
// ============================================
const FREELANCERS = {
  "fl-1": {
    id: "fl-1",
    name: "Sarah Chen",
    title: "Senior Full-Stack Developer",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    cover:
      "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=1200&h=400&fit=crop",
    location: "San Francisco, US",
    timezone: "PST (UTC-8)",
    memberSince: "Jan 2021",
    bio: `I'm a passionate full-stack developer with 7+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture, with a strong focus on clean code and exceptional user experiences.

I've worked with startups and enterprise companies, helping them ship products that serve millions of users. My approach combines technical excellence with strong communication — I believe the best code is written when engineers truly understand the problem they're solving.

When I'm not coding, I contribute to open-source projects and write about web development best practices.`,
    rating: 4.9,
    reviews: 127,
    hourlyRate: 95,
    completedJobs: 89,
    successRate: 98,
    totalEarnings: "$185K+",
    responseTime: "< 1 hour",
    verified: true,
    topRated: true,
    online: true,
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "GraphQL",
      "Next.js",
      "PostgreSQL",
      "Docker",
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Mandarin", level: "Fluent" },
    ],
    education: [
      { school: "UC Berkeley", degree: "B.S. Computer Science", year: "2016" },
    ],
    certifications: [
      "AWS Solutions Architect – Associate",
      "Google Cloud Professional Developer",
      "Meta Front-End Developer Certificate",
    ],
    portfolio: [
      {
        id: "p1",
        title: "FinTech Analytics Dashboard",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        category: "Web App",
        description:
          "Real-time analytics dashboard for a fintech startup processing $2M+ daily transactions.",
      },
      {
        id: "p2",
        title: "E-Commerce Platform",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        category: "Full-Stack",
        description:
          "Complete e-commerce platform with 50K+ SKUs, real-time inventory, and Stripe integration.",
      },
      {
        id: "p3",
        title: "Healthcare SaaS",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        category: "Web App",
        description:
          "Patient management system used by 200+ healthcare providers across 3 countries.",
      },
      {
        id: "p4",
        title: "AI Content Platform",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        category: "Full-Stack",
        description:
          "AI-powered content generation platform with real-time collaboration features.",
      },
    ],
    reviews: [
      {
        id: "r1",
        client: "James Park",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        company: "TechVault Inc.",
        rating: 5,
        date: "2 weeks ago",
        comment:
          "Sarah is an exceptional developer. She understood our complex requirements perfectly and delivered a production-ready dashboard ahead of schedule. Her code quality is outstanding.",
        project: "Analytics Dashboard",
        budget: "$12,000",
      },
      {
        id: "r2",
        client: "Emily Rodriguez",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        company: "StartupXYZ",
        rating: 5,
        date: "1 month ago",
        comment:
          "Working with Sarah was a fantastic experience. She's proactive, communicates clearly, and writes incredibly clean code. Our investors were impressed with the product quality.",
        project: "MVP Development",
        budget: "$8,500",
      },
      {
        id: "r3",
        client: "David Kim",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        company: "HealthFirst",
        rating: 5,
        date: "2 months ago",
        comment:
          "Great attention to detail and excellent problem-solving skills. Sarah tackled complex healthcare compliance requirements with ease. Highly recommended.",
        project: "Healthcare Platform",
        budget: "$15,000",
      },
      {
        id: "r4",
        client: "Lisa Wang",
        photo:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
        company: "ContentAI",
        rating: 4,
        date: "3 months ago",
        comment:
          "Solid developer with strong technical skills. Delivered a complex AI integration project on time. Would work with again for future projects.",
        project: "AI Integration",
        budget: "$6,200",
      },
    ],
  },
};

const getFreelancer = (id) => FREELANCERS[id] || null;

// ============================================
// UTILITIES
// ============================================
const avgRating = (reviews) => {
  if (!reviews.length) return 0;
  return (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(
    1,
  );
};

// ============================================
// SMALL COMPONENTS
// ============================================
const SkillTag = memo(({ skill, large }) => (
  <span
    className={clsx(
      "rounded-lg font-medium",
      large ? "px-3 py-1.5 text-[13px]" : "px-2.5 py-1 text-[12px]",
    )}
    style={{
      background: "var(--theme-badge-primary-bg)",
      color: "var(--theme-badge-primary-text)",
      border: "1px solid var(--theme-badge-primary-border)",
    }}
  >
    {skill}
  </span>
));

const InfoRow = memo(({ icon: Icon, label, value, color }) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="flex items-center gap-2.5">
      <Icon className={clsx("w-4 h-4", color || "text-text-tertiary")} />
      <span className="text-text-secondary text-[13px]">{label}</span>
    </div>
    <span className="text-text-primary text-[13px] font-semibold text-right">
      {value}
    </span>
  </div>
));

const Section = memo(({ title, icon: Icon, children, className }) => (
  <div className={clsx("card p-5 sm:p-6", className)}>
    {title && (
      <h2 className="text-text-primary font-bold text-base mb-4 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary-500" />}
        {title}
      </h2>
    )}
    {children}
  </div>
));

const StarRating = memo(({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        style={{ width: size, height: size }}
        className={clsx(
          i <= Math.round(rating)
            ? "text-accent-400 fill-accent-400"
            : "text-text-muted",
        )}
      />
    ))}
  </div>
));

// ============================================
// CONTACT MODAL
// ============================================
const ContactModal = memo(({ name, onClose }) => {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-2xl shadow-theme-xl overflow-hidden"
        style={{
          background: "var(--theme-surface-card)",
          border: "1px solid var(--theme-border-default)",
        }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary font-bold text-lg">
              Message {name}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface-hover text-text-tertiary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {sent ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="text-text-primary font-semibold">Message Sent!</p>
              <p className="text-text-tertiary text-sm mt-1">
                You'll be notified when they reply.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSend}>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={4}
                placeholder={`Hi ${name.split(" ")[0]}, I'd like to discuss a project with you…`}
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none text-text-primary placeholder:text-text-muted resize-none focus:border-primary-500 transition-all"
                style={{
                  background: "var(--theme-bg-inset)",
                  borderColor: "var(--theme-border-default)",
                }}
                required
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary flex-1 py-2.5 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

// ============================================
// PORTFOLIO CARD
// ============================================
const PortfolioCard = memo(({ item }) => (
  <div className="card overflow-hidden group cursor-pointer">
    <div className="relative aspect-[3/2] overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white/80 text-[12px] leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
      <span className="absolute top-3 left-3 badge badge-primary !text-[10px] !py-[2px] !px-2 backdrop-blur-sm">
        {item.category}
      </span>
    </div>
    <div className="p-3.5">
      <h3 className="text-text-primary font-semibold text-[14px] group-hover:text-primary-500 transition-colors">
        {item.title}
      </h3>
    </div>
  </div>
));

// ============================================
// REVIEW CARD
// ============================================
const ReviewCard = memo(({ review }) => (
  <div className="card p-5">
    <div className="flex items-start justify-between gap-4 mb-3">
      <div className="flex items-center gap-3">
        <img
          src={review.photo}
          alt={review.client}
          width={36}
          height={36}
          className="rounded-xl object-cover"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="text-text-primary font-semibold text-[13px]">
            {review.client}
          </p>
          <p className="text-text-muted text-[11px]">{review.company}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <StarRating rating={review.rating} size={13} />
        <p className="text-text-muted text-[10px] mt-0.5">{review.date}</p>
      </div>
    </div>
    <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
      {review.comment}
    </p>
    <div
      className="flex items-center gap-3 text-[11px] text-text-muted pt-3"
      style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
    >
      <span className="flex items-center gap-1">
        <Briefcase className="w-3 h-3" />
        {review.project}
      </span>
      <span>·</span>
      <span className="flex items-center gap-1">
        <DollarSign className="w-3 h-3" />
        {review.budget}
      </span>
    </div>
  </div>
));

// ============================================
// TAB BUTTON
// ============================================
const TabButton = memo(({ label, active, count, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      "relative py-3 px-1 text-[13px] font-semibold transition-colors whitespace-nowrap",
      active
        ? "text-primary-500"
        : "text-text-tertiary hover:text-text-primary",
    )}
  >
    {label}
    {count !== undefined && (
      <span
        className={clsx(
          "ml-1.5 text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full",
          active
            ? "bg-primary-500/10 text-primary-500"
            : "bg-surface-hover text-text-muted",
        )}
      >
        {count}
      </span>
    )}
    {active && (
      <motion.div
        layoutId="profile-tab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
      />
    )}
  </button>
));

// ============================================
// MAIN
// ============================================
const FreelancerProfile = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("portfolio");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const f = getFreelancer(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // 404
  if (!f) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="card p-10 text-center max-w-md mx-4">
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "var(--theme-badge-danger-bg)" }}
          >
            <AlertCircle className="w-6 h-6 text-danger-500" />
          </div>
          <h1 className="text-text-primary font-bold text-xl mb-2">
            Profile Not Found
          </h1>
          <p className="text-text-tertiary text-sm mb-6">
            This freelancer profile doesn't exist or has been removed.
          </p>
          <Link
            to="/freelancers"
            className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Freelancers
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      {/* ====== COVER + PROFILE HEADER ====== */}
      <div className="relative">
        {/* Cover */}
        <div
          className="h-32 sm:h-44 lg:h-52 overflow-hidden"
          style={{ background: "var(--theme-bg-tertiary)" }}
        >
          <img
            src={f.cover}
            alt=""
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-page via-transparent to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="container-custom relative -mt-12 sm:-mt-14">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={f.photo}
                alt={f.name}
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-theme-lg"
                style={{ border: "4px solid var(--theme-bg)" }}
                loading="eager"
              />
              {f.verified && (
                <div
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center"
                  style={{ boxShadow: "0 0 0 3px var(--theme-bg)" }}
                >
                  <BadgeCheck className="w-4 h-4 text-white" />
                </div>
              )}
              {f.online && (
                <div
                  className="absolute top-0 right-0 w-4 h-4 bg-secondary-400 rounded-full"
                  style={{ boxShadow: "0 0 0 3px var(--theme-bg)" }}
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-text-primary font-black text-xl sm:text-2xl">
                  {f.name}
                </h1>
                {f.topRated && (
                  <span className="badge badge-accent !text-[10px] !py-[2px] !px-2 !gap-0.5">
                    <Flame className="w-3 h-3" />
                    Top Rated
                  </span>
                )}
              </div>
              <p className="text-text-secondary text-[14px] sm:text-base">
                {f.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-[12px] text-text-muted">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {f.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {f.timezone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {f.memberSince}
                </span>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                  <span className="text-text-primary font-bold text-[14px]">
                    {f.rating}
                  </span>
                  <span className="text-text-muted text-[12px]">
                    ({f.reviews.length} reviews)
                  </span>
                </div>
                <span className="text-text-muted text-[12px]">
                  <span className="text-text-primary font-semibold">
                    {f.completedJobs}
                  </span>{" "}
                  jobs
                </span>
                <span className="text-secondary-500 text-[12px] font-semibold">
                  {f.successRate}% success
                </span>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto shrink-0 pt-1">
              <div className="sm:text-right">
                <div className="text-text-primary font-extrabold text-2xl sm:text-3xl tabular-nums">
                  ${f.hourlyRate}
                </div>
                <span className="text-text-muted text-[12px]">/hour</span>
              </div>
              <div className="flex gap-2 ml-auto sm:ml-0">
                <button
                  onClick={() => setContactOpen(true)}
                  className="btn-primary px-4 py-2.5 text-[13px] flex items-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Hire Me
                  </span>
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={clsx(
                    "p-2.5 rounded-xl border transition-all",
                    saved
                      ? "text-danger-500 border-danger-500/15"
                      : "text-text-muted border-border-default hover:text-danger-400",
                  )}
                  style={
                    saved
                      ? { background: "var(--theme-badge-danger-bg)" }
                      : undefined
                  }
                >
                  <Heart className={clsx("w-4 h-4", saved && "fill-current")} />
                </button>
                <button
                  onClick={copyLink}
                  className={clsx(
                    "p-2.5 rounded-xl border transition-all text-text-muted border-border-default hover:text-text-primary",
                    copied && "text-secondary-500 border-secondary-500/15",
                  )}
                  style={
                    copied
                      ? { background: "var(--theme-badge-secondary-bg)" }
                      : undefined
                  }
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== TABS ====== */}
      <div
        className="sticky top-16 md:top-[72px] z-20 mt-5"
        style={{
          background: "var(--theme-nav-bg-scrolled)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--theme-border-subtle)",
        }}
      >
        <div className="container-custom flex gap-5 overflow-x-auto scrollbar-none">
          <TabButton
            label="Portfolio"
            count={f.portfolio.length}
            active={tab === "portfolio"}
            onClick={() => setTab("portfolio")}
          />
          <TabButton
            label="Reviews"
            count={f.reviews.length}
            active={tab === "reviews"}
            onClick={() => setTab("reviews")}
          />
          <TabButton
            label="About"
            active={tab === "about"}
            onClick={() => setTab("about")}
          />
        </div>
      </div>

      {/* ====== CONTENT ====== */}
      <div className="container-custom py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 lg:gap-8">
          {/* Main */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {/* Portfolio */}
              {tab === "portfolio" && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {f.portfolio.map((item) => (
                      <PortfolioCard key={item.id} item={item} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Reviews */}
              {tab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Summary */}
                  <div className="card p-5 mb-5">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="text-center">
                        <div className="text-text-primary font-black text-3xl tabular-nums">
                          {avgRating(f.reviews)}
                        </div>
                        <StarRating
                          rating={parseFloat(avgRating(f.reviews))}
                          size={14}
                        />
                        <p className="text-text-muted text-[11px] mt-1">
                          {f.reviews.length} reviews
                        </p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = f.reviews.filter(
                            (r) => Math.round(r.rating) === stars,
                          ).length;
                          const pct = f.reviews.length
                            ? (count / f.reviews.length) * 100
                            : 0;
                          return (
                            <div
                              key={stars}
                              className="flex items-center gap-2"
                            >
                              <span className="text-text-muted text-[11px] w-4 text-right tabular-nums">
                                {stars}
                              </span>
                              <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                              <div
                                className="flex-1 h-1.5 rounded-full overflow-hidden"
                                style={{ background: "var(--theme-bg-inset)" }}
                              >
                                <div
                                  className="h-full rounded-full bg-accent-400 transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-text-muted text-[10px] w-6 tabular-nums">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-4">
                    {f.reviews.map((r) => (
                      <ReviewCard key={r.id} review={r} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* About */}
              {tab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Bio */}
                  <Section title="About Me" icon={BookOpen}>
                    <div className="text-text-secondary text-[14px] leading-[1.8] whitespace-pre-line">
                      {f.bio}
                    </div>
                  </Section>

                  {/* Education */}
                  <Section title="Education" icon={GraduationCap}>
                    {f.education.map((edu, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <p className="text-text-primary font-semibold text-[14px]">
                            {edu.school}
                          </p>
                          <p className="text-text-tertiary text-[13px]">
                            {edu.degree}
                          </p>
                        </div>
                        <span className="text-text-muted text-[12px] shrink-0">
                          {edu.year}
                        </span>
                      </div>
                    ))}
                  </Section>

                  {/* Certifications */}
                  <Section title="Certifications" icon={Award}>
                    <ul className="space-y-2">
                      {f.certifications.map((cert, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-secondary-500 shrink-0" />
                          <span className="text-text-secondary text-[13px]">
                            {cert}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ====== SIDEBAR ====== */}
          <div className="space-y-5">
            {/* Skills */}
            <div className="card p-5">
              <h3 className="text-text-primary font-bold text-[14px] mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary-500" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {f.skills.map((s) => (
                  <SkillTag key={s} skill={s} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="card p-5">
              <h3 className="text-text-primary font-bold text-[14px] mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                Stats
              </h3>
              <div
                className="divide-y"
                style={{ borderColor: "var(--theme-border-subtle)" }}
              >
                <InfoRow
                  icon={Timer}
                  label="Response Time"
                  value={f.responseTime}
                  color="text-secondary-500"
                />
                <InfoRow
                  icon={DollarSign}
                  label="Total Earned"
                  value={f.totalEarnings}
                  color="text-accent-500"
                />
                <InfoRow
                  icon={Briefcase}
                  label="Jobs Done"
                  value={f.completedJobs}
                />
                <InfoRow
                  icon={CheckCircle2}
                  label="Success Rate"
                  value={`${f.successRate}%`}
                  color="text-secondary-500"
                />
              </div>
            </div>

            {/* Languages */}
            <div className="card p-5">
              <h3 className="text-text-primary font-bold text-[14px] mb-3 flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary-500" />
                Languages
              </h3>
              <div className="space-y-2">
                {f.languages.map((l) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-text-secondary text-[13px]">
                      {l.name}
                    </span>
                    <span className="text-text-muted text-[12px] font-medium">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Hire CTA */}
            <div
              className="card p-5 text-center"
              style={{
                background: "var(--theme-comparison-highlight-bg)",
                borderColor: "var(--theme-comparison-highlight-border)",
              }}
            >
              <p className="text-text-primary font-bold text-[14px] mb-1">
                Ready to start?
              </p>
              <p className="text-text-tertiary text-[12px] mb-3">
                Hire {f.name.split(" ")[0]} for your next project
              </p>
              <button
                onClick={() => setContactOpen(true)}
                className="btn-primary w-full py-2.5 text-[13px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  Send Proposal
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ====== MOBILE BOTTOM BAR ====== */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3"
        style={{
          background: "var(--theme-nav-bg-scrolled)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--theme-border-subtle)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="mr-auto">
            <span className="text-text-primary font-extrabold text-lg tabular-nums">
              ${f.hourlyRate}
            </span>
            <span className="text-text-muted text-[11px]">/hr</span>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={clsx(
              "p-2.5 rounded-xl border transition-all",
              saved
                ? "text-danger-500 border-danger-500/15"
                : "text-text-muted border-border-default",
            )}
            style={
              saved ? { background: "var(--theme-badge-danger-bg)" } : undefined
            }
          >
            <Heart className={clsx("w-4 h-4", saved && "fill-current")} />
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className="btn-primary px-5 py-2.5 text-[13px]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Hire Me
            </span>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <ContactModal name={f.name} onClose={() => setContactOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreelancerProfile;
