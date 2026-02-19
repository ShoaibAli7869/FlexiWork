// src/pages/JobDetail.jsx
import { useState, useEffect, useRef, memo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Star,
  Shield,
  Clock,
  MapPin,
  Users,
  Timer,
  Briefcase,
  DollarSign,
  Calendar,
  Zap,
  Flame,
  CheckCircle2,
  Send,
  X,
  ChevronRight,
  Globe,
  Eye,
  Heart,
  BadgeCheck,
  Building2,
  TrendingUp,
  Award,
  FileText,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";
import { clsx } from "clsx";

// ============================================
// JOB DATA (self-contained)
// ============================================
const JOBS = {
  j1: {
    id: "j1",
    title: "Senior React Developer for SaaS Dashboard",
    description: `We're building a modern analytics dashboard for our B2B SaaS platform and need an experienced React developer to lead the frontend development.

You'll work closely with our design and backend teams to implement pixel-perfect, performant components with real-time data visualization capabilities.`,
    responsibilities: [
      "Build reusable component library using React 18+ and TypeScript",
      "Implement real-time data visualization with D3.js or Recharts",
      "Integrate REST and GraphQL APIs with proper state management",
      "Write comprehensive unit and integration tests",
      "Optimize bundle size and rendering performance",
      "Participate in code reviews and architectural decisions",
    ],
    requirements: [
      "5+ years of professional React development experience",
      "Strong TypeScript skills with complex type patterns",
      "Experience with state management (Zustand, Redux Toolkit, or Jotai)",
      "Familiarity with testing frameworks (Vitest, Testing Library)",
      "Understanding of CI/CD pipelines and deployment workflows",
      "Excellent communication skills in English",
    ],
    niceToHave: [
      "Experience with Next.js or Remix",
      "Background in data visualization libraries",
      "Contributions to open-source projects",
      "Experience in B2B SaaS products",
    ],
    category: "Development",
    experience: "Expert",
    budgetType: "hourly",
    budgetMin: 80,
    budgetMax: 120,
    duration: "3–6 months",
    durationId: "long",
    skills: ["React", "TypeScript", "GraphQL", "Tailwind CSS", "D3.js"],
    proposals: 12,
    views: 234,
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    client: {
      name: "TechVault Inc.",
      photo:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&h=120&fit=crop",
      location: "San Francisco, US",
      rating: 4.9,
      reviews: 47,
      spent: "$120K+",
      verified: true,
      joined: "2021",
      hireRate: 89,
      activeJobs: 3,
      description:
        "Enterprise SaaS company building next-gen analytics tools for modern businesses.",
    },
    featured: true,
    urgent: false,
    remote: true,
    attachments: 2,
  },
  j2: {
    id: "j2",
    title: "Brand Identity Design for Fintech Startup",
    description: `We're launching a new fintech product focused on micro-investing for Gen Z, and we need a talented designer to create our complete brand identity from scratch.

The ideal candidate will bring fresh, modern design sensibility with deep understanding of fintech branding and the Gen Z audience.`,
    responsibilities: [
      "Develop comprehensive brand strategy and visual identity",
      "Design logo system with multiple variations and use cases",
      "Create color palette, typography system, and design tokens",
      "Build brand guidelines document (60+ pages)",
      "Design social media templates and marketing collateral",
      "Create icon set and illustration style guide",
    ],
    requirements: [
      "3+ years of brand identity design experience",
      "Strong portfolio showcasing fintech or finance brands",
      "Expert-level Figma skills",
      "Understanding of design systems and scalable design",
      "Ability to present and justify design decisions",
    ],
    niceToHave: [
      "Motion design skills for brand animations",
      "Experience with Gen Z-focused products",
      "Illustration capabilities",
    ],
    category: "Design",
    experience: "Mid-Level",
    budgetType: "fixed",
    budgetMin: 3000,
    budgetMax: 5000,
    duration: "< 1 month",
    durationId: "short",
    skills: ["Figma", "UI/UX", "Branding"],
    proposals: 28,
    views: 412,
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    client: {
      name: "PayFlow",
      photo:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?w=120&h=120&fit=crop",
      location: "London, UK",
      rating: 4.7,
      reviews: 12,
      spent: "$45K+",
      verified: true,
      joined: "2023",
      hireRate: 92,
      activeJobs: 2,
      description:
        "Fintech startup making investing accessible and fun for the next generation.",
    },
    featured: true,
    urgent: true,
    remote: true,
    attachments: 5,
  },
  j3: {
    id: "j3",
    title: "Full-Stack E-Commerce Platform Development",
    description: `Build a complete, production-ready e-commerce platform from the ground up. The platform needs to handle product catalogs, user accounts, shopping cart, checkout with Stripe integration, order management, and a comprehensive admin dashboard.

This is a greenfield project with full creative and technical freedom on the stack (within our preferred technologies).`,
    responsibilities: [
      "Architect and build the complete platform end-to-end",
      "Implement secure authentication and authorization system",
      "Build product catalog with search, filtering, and categories",
      "Integrate Stripe for payments with webhook handling",
      "Create admin dashboard for order and inventory management",
      "Deploy to AWS with CI/CD pipeline",
    ],
    requirements: [
      "5+ years full-stack development experience",
      "Strong Node.js/Express or NestJS backend skills",
      "React or Next.js frontend proficiency",
      "MongoDB or PostgreSQL database design experience",
      "Stripe payment integration experience",
      "AWS deployment experience (EC2, S3, CloudFront)",
    ],
    niceToHave: [
      "Previous e-commerce platform builds",
      "Experience with Redis caching",
      "Knowledge of SEO best practices",
    ],
    category: "Development",
    experience: "Expert",
    budgetType: "fixed",
    budgetMin: 8000,
    budgetMax: 15000,
    duration: "1–3 months",
    durationId: "medium",
    skills: ["React", "Node.js", "MongoDB", "AWS", "Stripe"],
    proposals: 19,
    views: 356,
    postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    client: {
      name: "ShopNest",
      photo:
        "https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?w=120&h=120&fit=crop",
      location: "Toronto, CA",
      rating: 4.8,
      reviews: 31,
      spent: "$89K+",
      verified: true,
      joined: "2022",
      hireRate: 85,
      activeJobs: 1,
      description:
        "Building the next generation of e-commerce tools for independent sellers.",
    },
    featured: false,
    urgent: false,
    remote: true,
    attachments: 3,
  },
};

// Fallback for unknown IDs
const getJob = (id) => JOBS[id] || null;

// ============================================
// UTILITIES
// ============================================
const formatBudget = (job) => {
  const fmt = (n) =>
    n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `$${n}`;
  if (job.budgetType === "hourly")
    return `${fmt(job.budgetMin)} – ${fmt(job.budgetMax)}/hr`;
  return `${fmt(job.budgetMin)} – ${fmt(job.budgetMax)}`;
};

const formatTime = (date) => {
  const ms = Date.now() - date.getTime();
  const hrs = Math.floor(ms / 3600000);
  if (hrs < 1) return "Just now";
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
};

const formatDeadline = (date) => {
  const days = Math.ceil((date - Date.now()) / 86400000);
  if (days <= 0) return "Expired";
  if (days === 1) return "Tomorrow";
  if (days < 7) return `${days} days left`;
  return `${Math.floor(days / 7)} weeks left`;
};

// ============================================
// SMALL COMPONENTS
// ============================================
const SkillTag = memo(({ skill, large }) => (
  <span
    className={clsx(
      "rounded-lg font-medium",
      large ? "px-3 py-1.5 text-[13px]" : "px-2 py-[3px] text-[11px]",
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
    <span className="text-text-primary text-[13px] font-semibold">{value}</span>
  </div>
));

const SectionCard = memo(({ title, icon: Icon, children, className }) => (
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

const CheckItem = memo(({ text }) => (
  <li className="flex items-start gap-2.5 py-1">
    <CheckCircle2 className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
    <span className="text-text-secondary text-[13px] leading-relaxed">
      {text}
    </span>
  </li>
));

const NiceItem = memo(({ text }) => (
  <li className="flex items-start gap-2.5 py-1">
    <Star className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
    <span className="text-text-tertiary text-[13px] leading-relaxed">
      {text}
    </span>
  </li>
));

// ============================================
// CONTACT MODAL
// ============================================
const ContactModal = memo(({ clientName, onClose }) => {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setSent(true);
    setTimeout(() => {
      onClose();
      setSent(false);
      setMsg("");
    }, 1500);
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
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md rounded-2xl shadow-theme-xl overflow-hidden"
        style={{
          background: "var(--theme-surface-card)",
          border: "1px solid var(--theme-border-default)",
        }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary font-bold text-lg">
              Message {clientName}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface-hover text-text-tertiary transition-colors"
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
                placeholder="Hi, I'm interested in this project and would love to discuss the details…"
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none text-text-primary placeholder:text-text-muted resize-none transition-all focus:border-primary-500"
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
                    Send Message
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
// SIMILAR JOBS
// ============================================
const SimilarJobCard = memo(({ job }) => (
  <Link
    to={`/jobs/${job.id}`}
    className="block card p-4 hover:border-border-strong transition-all group"
  >
    <div className="flex items-start justify-between gap-3 mb-2">
      <h4 className="text-text-primary text-[13px] font-semibold line-clamp-1 group-hover:text-primary-500 transition-colors flex-1">
        {job.title}
      </h4>
      <span className="text-text-primary text-[12px] font-bold tabular-nums whitespace-nowrap">
        {formatBudget(job)}
      </span>
    </div>
    <div className="flex items-center gap-2 text-[11px] text-text-muted">
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {formatTime(job.postedAt)}
      </span>
      <span>·</span>
      <span>{job.proposals} proposals</span>
    </div>
  </Link>
));

// ============================================
// MAIN PAGE
// ============================================
const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const headerRef = useRef(null);

  const job = getJob(id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Copy link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Similar jobs (exclude current)
  const similarJobs = Object.values(JOBS)
    .filter((j) => j.id !== id)
    .slice(0, 2);

  // 404
  if (!job) {
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
            Job Not Found
          </h1>
          <p className="text-text-tertiary text-sm mb-6">
            This job may have been removed or the link is incorrect.
          </p>
          <Link
            to="/jobs"
            className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Jobs
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      {/* Top Bar */}
      <div
        className="sticky top-16 md:top-[72px] z-30 border-b"
        style={{
          background: "var(--theme-nav-bg-scrolled)",
          borderColor: "var(--theme-border-subtle)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="container-custom flex items-center justify-between h-12">
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 text-text-secondary text-[13px] font-medium hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              onClick={copyLink}
              className={clsx(
                "p-2 rounded-lg transition-all text-text-tertiary hover:text-text-primary hover:bg-surface-hover",
                copied && "text-secondary-500",
              )}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={clsx(
                "p-2 rounded-lg transition-all",
                saved
                  ? "text-primary-500"
                  : "text-text-tertiary hover:text-primary-400 hover:bg-surface-hover",
              )}
              style={
                saved
                  ? { background: "var(--theme-badge-primary-bg)" }
                  : undefined
              }
            >
              <Bookmark className={clsx("w-4 h-4", saved && "fill-current")} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8">
          {/* ====== LEFT COLUMN ====== */}
          <div className="space-y-5 min-w-0">
            {/* Header Card */}
            <SectionCard>
              {/* Badges */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
                {job.featured && (
                  <span className="badge badge-accent !text-[10px] !py-[2px] !px-2 !gap-1">
                    <Flame className="w-3 h-3" />
                    Featured
                  </span>
                )}
                {job.urgent && (
                  <span className="badge badge-danger !text-[10px] !py-[2px] !px-2 !gap-1">
                    <Zap className="w-3 h-3" />
                    Urgent
                  </span>
                )}
                <span className="badge badge-primary !text-[10px] !py-[2px] !px-2">
                  {job.category}
                </span>
                <span
                  className="badge !text-[10px] !py-[2px] !px-2"
                  style={{
                    background: "var(--theme-bg-inset)",
                    color: "var(--theme-text-tertiary)",
                    border: "1px solid var(--theme-border-subtle)",
                  }}
                >
                  {job.experience}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-text-primary font-black text-xl sm:text-2xl leading-snug mb-4">
                {job.title}
              </h1>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-text-muted mb-5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Posted {formatTime(job.postedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {job.proposals} proposals
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {job.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5" />
                  {job.duration}
                </span>
                {job.remote && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" />
                    Remote
                  </span>
                )}
              </div>

              {/* Budget highlight (mobile) */}
              <div className="lg:hidden card-flat p-4 rounded-xl mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-text-primary font-extrabold text-2xl tabular-nums">
                      {formatBudget(job)}
                    </div>
                    <span className="text-text-muted text-[12px] capitalize">
                      {job.budgetType} · {job.duration}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/submit-proposal/${job.id}`)
                    }
                    className="btn-primary px-5 py-2.5 text-sm"
                  >
                    <span className="relative z-10">Apply Now</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="text-text-secondary text-[14px] leading-[1.75] whitespace-pre-line">
                {job.description}
              </div>
            </SectionCard>

            {/* Responsibilities */}
            <SectionCard title="Responsibilities" icon={Briefcase}>
              <ul className="space-y-0.5">
                {job.responsibilities.map((r, i) => (
                  <CheckItem key={i} text={r} />
                ))}
              </ul>
            </SectionCard>

            {/* Requirements */}
            <SectionCard title="Requirements" icon={FileText}>
              <ul className="space-y-0.5">
                {job.requirements.map((r, i) => (
                  <CheckItem key={i} text={r} />
                ))}
              </ul>
              {job.niceToHave?.length > 0 && (
                <div
                  className="mt-5 pt-4"
                  style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
                >
                  <h3 className="text-text-primary font-semibold text-[13px] mb-2 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-accent-400" />
                    Nice to Have
                  </h3>
                  <ul className="space-y-0.5">
                    {job.niceToHave.map((r, i) => (
                      <NiceItem key={i} text={r} />
                    ))}
                  </ul>
                </div>
              )}
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Required Skills" icon={Zap}>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <SkillTag key={s} skill={s} large />
                ))}
              </div>
            </SectionCard>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <SectionCard title="Similar Jobs" icon={Briefcase}>
                <div className="space-y-3">
                  {similarJobs.map((j) => (
                    <SimilarJobCard key={j.id} job={j} />
                  ))}
                </div>
                <Link
                  to="/jobs"
                  className="flex items-center gap-1 text-primary-500 text-[13px] font-semibold mt-4 hover:text-primary-600 transition-colors"
                >
                  Browse all jobs <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </SectionCard>
            )}
          </div>

          {/* ====== RIGHT SIDEBAR ====== */}
          <div className="space-y-5">
            {/* Budget & Actions */}
            <div className="card p-5 sticky top-[7.5rem] hidden lg:block">
              <div className="mb-5">
                <div className="text-text-primary font-extrabold text-3xl tabular-nums">
                  {formatBudget(job)}
                </div>
                <span className="text-text-muted text-[13px] capitalize">
                  {job.budgetType} Rate
                </span>
              </div>

              {/* Quick Info */}
              <div
                className="space-y-0 mb-5 divide-y"
                style={{ borderColor: "var(--theme-border-subtle)" }}
              >
                <InfoRow icon={Timer} label="Duration" value={job.duration} />
                <InfoRow
                  icon={Award}
                  label="Experience"
                  value={job.experience}
                />
                <InfoRow
                  icon={Users}
                  label="Proposals"
                  value={job.proposals}
                  color="text-primary-500"
                />
                <InfoRow
                  icon={Calendar}
                  label="Deadline"
                  value={formatDeadline(job.deadline)}
                  color={
                    job.deadline - Date.now() < 7 * 86400000
                      ? "text-danger-500"
                      : "text-text-tertiary"
                  }
                />
                {job.attachments > 0 && (
                  <InfoRow
                    icon={FileText}
                    label="Attachments"
                    value={`${job.attachments} files`}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() =>
                    navigate(`/dashboard/submit-proposal/${job.id}`)
                  }
                  className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Proposal
                  </span>
                </button>
                <button
                  onClick={() => setContactOpen(true)}
                  className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Contact Client
                </button>
              </div>

              {/* Save + Share */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSaved(!saved)}
                  className={clsx(
                    "flex-1 py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 border transition-all",
                    saved
                      ? "text-primary-500 border-primary-500/20"
                      : "text-text-tertiary border-border-default hover:text-text-primary hover:border-border-strong",
                  )}
                  style={
                    saved
                      ? { background: "var(--theme-badge-primary-bg)" }
                      : undefined
                  }
                >
                  <Bookmark
                    className={clsx("w-3.5 h-3.5", saved && "fill-current")}
                  />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  onClick={copyLink}
                  className="flex-1 py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 border text-text-tertiary border-border-default hover:text-text-primary hover:border-border-strong transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-secondary-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Share
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Client Info */}
            <div className="card p-5">
              <h3 className="text-text-primary font-bold text-[14px] mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary-500" />
                About the Client
              </h3>

              {/* Client Header */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={job.client.photo}
                  alt={job.client.name}
                  width={44}
                  height={44}
                  className="rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-primary font-semibold text-[14px] truncate">
                      {job.client.name}
                    </span>
                    {job.client.verified && (
                      <BadgeCheck className="w-4 h-4 text-primary-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-text-muted text-[11px]">
                    <MapPin className="w-3 h-3" />
                    {job.client.location}
                  </div>
                </div>
              </div>

              {/* Client Bio */}
              <p className="text-text-tertiary text-[12px] leading-relaxed mb-4">
                {job.client.description}
              </p>

              {/* Client Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  {
                    icon: Star,
                    label: "Rating",
                    value: `${job.client.rating} (${job.client.reviews})`,
                    color: "text-accent-400",
                  },
                  {
                    icon: DollarSign,
                    label: "Total Spent",
                    value: job.client.spent,
                    color: "text-secondary-500",
                  },
                  {
                    icon: TrendingUp,
                    label: "Hire Rate",
                    value: `${job.client.hireRate}%`,
                    color: "text-primary-500",
                  },
                  {
                    icon: Briefcase,
                    label: "Active Jobs",
                    value: job.client.activeJobs,
                    color: "text-accent-500",
                  },
                ].map(({ icon: I, label, value, color }) => (
                  <div
                    key={label}
                    className="p-2.5 rounded-lg text-center"
                    style={{ background: "var(--theme-bg-inset)" }}
                  >
                    <I className={clsx("w-3.5 h-3.5 mx-auto mb-1", color)} />
                    <div className="text-text-primary text-[12px] font-bold">
                      {value}
                    </div>
                    <div className="text-text-muted text-[10px]">{label}</div>
                  </div>
                ))}
              </div>

              {/* Member Since */}
              <div
                className="flex items-center gap-2 text-[11px] text-text-muted pt-3"
                style={{ borderTop: "1px solid var(--theme-border-subtle)" }}
              >
                <Calendar className="w-3 h-3" />
                Member since {job.client.joined}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden card p-4 sticky bottom-4 shadow-theme-lg">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/dashboard/submit-proposal/${job.id}`)
                  }
                  className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Apply
                  </span>
                </button>
                <button
                  onClick={() => setContactOpen(true)}
                  className="btn-secondary px-4 py-3 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={clsx(
                    "px-4 py-3 rounded-xl border transition-all",
                    saved
                      ? "text-primary-500 border-primary-500/20"
                      : "text-text-tertiary border-border-default",
                  )}
                  style={
                    saved
                      ? { background: "var(--theme-badge-primary-bg)" }
                      : undefined
                  }
                >
                  <Bookmark
                    className={clsx("w-4 h-4", saved && "fill-current")}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <ContactModal
            clientName={job.client.name}
            onClose={() => setContactOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobDetail;
