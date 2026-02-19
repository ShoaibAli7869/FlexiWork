// src/pages/BrowseJobs.jsx
import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  ArrowUpDown,
  CheckCircle2,
  Globe,
  Flame,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  List,
  Bookmark,
  Calendar,
  Timer,
  Zap,
  Shield,
  TrendingUp,
  Eye,
  Sparkles,
  Tag,
  Building2,
  Star,
  CircleDollarSign,
  Award,
} from "lucide-react";
import { clsx } from "clsx";

// ============================================
// HOOKS
// ============================================
const useDebounce = (value, delay) => {
  const [d, setD] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setD(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return d;
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [ref, handler]);
};

// ============================================
// CONSTANTS
// ============================================
const CATEGORIES = [
  { id: "all", name: "All Jobs", count: 186 },
  { id: "development", name: "Development", count: 78 },
  { id: "design", name: "Design", count: 34 },
  { id: "marketing", name: "Marketing", count: 28 },
  { id: "writing", name: "Writing", count: 22 },
  { id: "data", name: "Data", count: 14 },
  { id: "video", name: "Video", count: 10 },
];

const EXPERIENCE_LEVELS = [
  { id: "any", name: "Any Level" },
  { id: "entry", name: "Entry" },
  { id: "intermediate", name: "Mid-Level" },
  { id: "expert", name: "Expert" },
];

const BUDGET_TYPES = [
  { id: "any", name: "Any Budget" },
  { id: "fixed", name: "Fixed Price" },
  { id: "hourly", name: "Hourly" },
];

const DURATION_OPTIONS = [
  { id: "any", name: "Any Duration" },
  { id: "short", name: "< 1 month" },
  { id: "medium", name: "1–3 months" },
  { id: "long", name: "3–6 months" },
  { id: "ongoing", name: "Ongoing" },
];

const SORT_OPTIONS = [
  { id: "newest", name: "Newest" },
  { id: "budget-high", name: "Budget: High" },
  { id: "budget-low", name: "Budget: Low" },
  { id: "proposals-low", name: "Fewest Proposals" },
  { id: "relevance", name: "Relevant" },
];

const SKILLS = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "Figma",
  "AWS",
  "Flutter",
  "Vue.js",
  "Next.js",
  "GraphQL",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Swift",
  "Kotlin",
  "Go",
  "Rust",
  "UI/UX",
  "DevOps",
];

// ============================================
// JOB DATA
// ============================================
const JOBS = [
  {
    id: "j1",
    title: "Senior React Developer for SaaS Dashboard",
    description:
      "We're building a modern analytics dashboard and need an experienced React developer. You'll work with our design team to implement pixel-perfect components with real-time data visualization.",
    category: "development",
    experience: "expert",
    budgetType: "hourly",
    budgetMin: 80,
    budgetMax: 120,
    duration: "long",
    skills: ["React", "TypeScript", "GraphQL", "Tailwind CSS"],
    proposals: 12,
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    client: {
      name: "TechVault Inc.",
      photo:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop",
      rating: 4.9,
      reviews: 47,
      spent: "$120K+",
      verified: true,
    },
    featured: true,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j2",
    title: "Brand Identity Design for Fintech Startup",
    description:
      "Looking for a talented designer to create a complete brand identity including logo, color palette, typography system, and brand guidelines for our fintech product launch.",
    category: "design",
    experience: "intermediate",
    budgetType: "fixed",
    budgetMin: 3000,
    budgetMax: 5000,
    duration: "short",
    skills: ["Figma", "UI/UX"],
    proposals: 28,
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    client: {
      name: "PayFlow",
      photo:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?w=80&h=80&fit=crop",
      rating: 4.7,
      reviews: 12,
      spent: "$45K+",
      verified: true,
    },
    featured: true,
    urgent: true,
    remote: true,
    location: "Remote",
  },
  {
    id: "j3",
    title: "Full-Stack E-Commerce Platform Development",
    description:
      "Need a developer to build a complete e-commerce platform with product management, cart, checkout, payment integration (Stripe), and admin dashboard.",
    category: "development",
    experience: "expert",
    budgetType: "fixed",
    budgetMin: 8000,
    budgetMax: 15000,
    duration: "medium",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    proposals: 19,
    postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    client: {
      name: "ShopNest",
      photo:
        "https://images.unsplash.com/photo-1572059002053-8cc5ad2f4a38?w=80&h=80&fit=crop",
      rating: 4.8,
      reviews: 31,
      spent: "$89K+",
      verified: true,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j4",
    title: "Technical Content Writer — Developer Blog",
    description:
      "We need an experienced technical writer to produce weekly blog posts about web development, cloud architecture, and DevOps best practices for our engineering blog.",
    category: "writing",
    experience: "intermediate",
    budgetType: "hourly",
    budgetMin: 40,
    budgetMax: 60,
    duration: "ongoing",
    skills: ["React", "Node.js", "DevOps"],
    proposals: 8,
    postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    client: {
      name: "DevBlog Pro",
      photo:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=80&h=80&fit=crop",
      rating: 4.6,
      reviews: 8,
      spent: "$18K+",
      verified: false,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j5",
    title: "Mobile App UI/UX Redesign",
    description:
      "Redesign our fitness tracking app with modern UI patterns. Deliverables include user research, wireframes, high-fidelity mockups, and interactive prototype in Figma.",
    category: "design",
    experience: "expert",
    budgetType: "fixed",
    budgetMin: 5000,
    budgetMax: 8000,
    duration: "medium",
    skills: ["Figma", "UI/UX", "Flutter"],
    proposals: 34,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    client: {
      name: "FitTrack",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop",
      rating: 4.9,
      reviews: 22,
      spent: "$67K+",
      verified: true,
    },
    featured: true,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j6",
    title: "Python Backend API Development",
    description:
      "Build RESTful APIs using FastAPI/Django for our data analytics platform. Must include authentication, rate limiting, caching, and comprehensive API documentation.",
    category: "development",
    experience: "intermediate",
    budgetType: "hourly",
    budgetMin: 50,
    budgetMax: 80,
    duration: "medium",
    skills: ["Python", "PostgreSQL", "Docker", "AWS"],
    proposals: 15,
    postedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
    client: {
      name: "DataPulse",
      photo:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=80&fit=crop",
      rating: 4.5,
      reviews: 14,
      spent: "$52K+",
      verified: true,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j7",
    title: "SEO & Content Marketing Strategy",
    description:
      "Develop and execute a comprehensive SEO strategy including keyword research, on-page optimization, content calendar, and link building for our B2B SaaS platform.",
    category: "marketing",
    experience: "expert",
    budgetType: "fixed",
    budgetMin: 2000,
    budgetMax: 4000,
    duration: "medium",
    skills: ["UI/UX"],
    proposals: 21,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    client: {
      name: "GrowthLab",
      photo:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop",
      rating: 4.7,
      reviews: 19,
      spent: "$34K+",
      verified: true,
    },
    featured: false,
    urgent: true,
    remote: true,
    location: "Remote",
  },
  {
    id: "j8",
    title: "DevOps Pipeline Setup — CI/CD & Monitoring",
    description:
      "Set up complete CI/CD pipeline using GitHub Actions, Docker, and Kubernetes. Includes monitoring with Grafana/Prometheus and automated testing integration.",
    category: "development",
    experience: "expert",
    budgetType: "fixed",
    budgetMin: 4000,
    budgetMax: 7000,
    duration: "short",
    skills: ["Docker", "DevOps", "AWS", "Python"],
    proposals: 9,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    client: {
      name: "CloudFirst",
      photo:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=80&h=80&fit=crop",
      rating: 4.8,
      reviews: 36,
      spent: "$95K+",
      verified: true,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j9",
    title: "Vue.js Dashboard with Real-Time Charts",
    description:
      "Create an admin dashboard using Vue 3 with Composition API. Features include real-time data charts, user management, role-based access, and dark mode support.",
    category: "development",
    experience: "intermediate",
    budgetType: "fixed",
    budgetMin: 3000,
    budgetMax: 6000,
    duration: "medium",
    skills: ["Vue.js", "TypeScript", "Tailwind CSS"],
    proposals: 17,
    postedAt: new Date(Date.now() - 3.5 * 24 * 60 * 60 * 1000),
    client: {
      name: "Metric AI",
      photo:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop",
      rating: 4.6,
      reviews: 11,
      spent: "$28K+",
      verified: false,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j10",
    title: "iOS & Android App — Flutter Development",
    description:
      "Build a cross-platform food delivery app using Flutter. Includes customer app, delivery partner app, and restaurant dashboard with real-time tracking.",
    category: "development",
    experience: "expert",
    budgetType: "fixed",
    budgetMin: 12000,
    budgetMax: 20000,
    duration: "long",
    skills: ["Flutter", "Kotlin", "Swift", "GraphQL"],
    proposals: 23,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    client: {
      name: "QuickBite",
      photo:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop",
      rating: 4.9,
      reviews: 28,
      spent: "$150K+",
      verified: true,
    },
    featured: true,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j11",
    title: "Data Visualization Dashboard in Python",
    description:
      "Create interactive dashboards using Plotly/Dash for our analytics data. Connect to PostgreSQL, implement filtering, export functionality, and responsive layout.",
    category: "data",
    experience: "intermediate",
    budgetType: "hourly",
    budgetMin: 45,
    budgetMax: 70,
    duration: "short",
    skills: ["Python", "PostgreSQL"],
    proposals: 11,
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    client: {
      name: "InsightCo",
      photo:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=80&fit=crop",
      rating: 4.4,
      reviews: 6,
      spent: "$12K+",
      verified: false,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j12",
    title: "Video Editor — YouTube Channel Content",
    description:
      "Edit weekly YouTube videos for a tech review channel. Includes color grading, motion graphics, thumbnail design, and sound mixing. Long-term collaboration.",
    category: "video",
    experience: "intermediate",
    budgetType: "hourly",
    budgetMin: 30,
    budgetMax: 50,
    duration: "ongoing",
    skills: ["UI/UX", "Figma"],
    proposals: 42,
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    client: {
      name: "TechReview",
      photo:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=80&fit=crop",
      rating: 4.8,
      reviews: 53,
      spent: "$78K+",
      verified: true,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j13",
    title: "Next.js Marketing Website with CMS",
    description:
      "Build a fast, SEO-optimized marketing website using Next.js 14 with app router. Integrate Sanity CMS for content management. Includes blog, landing pages, and contact forms.",
    category: "development",
    experience: "intermediate",
    budgetType: "fixed",
    budgetMin: 4000,
    budgetMax: 7000,
    duration: "short",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    proposals: 26,
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    client: {
      name: "BrandForge",
      photo:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=80&h=80&fit=crop",
      rating: 4.7,
      reviews: 15,
      spent: "$41K+",
      verified: true,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j14",
    title: "Blockchain Smart Contract Audit",
    description:
      "Audit Solidity smart contracts for our DeFi protocol. Review security vulnerabilities, gas optimization, and provide detailed report with recommendations.",
    category: "development",
    experience: "expert",
    budgetType: "fixed",
    budgetMin: 6000,
    budgetMax: 10000,
    duration: "short",
    skills: ["Rust", "TypeScript"],
    proposals: 7,
    postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    client: {
      name: "ChainGuard",
      photo:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=80&fit=crop",
      rating: 4.9,
      reviews: 9,
      spent: "$200K+",
      verified: true,
    },
    featured: true,
    urgent: true,
    remote: true,
    location: "Remote",
  },
  {
    id: "j15",
    title: "Email Marketing Automation Setup",
    description:
      "Set up email marketing automation workflows using our platform. Create templates, segment audiences, A/B test subject lines, and set up drip campaigns for onboarding.",
    category: "marketing",
    experience: "entry",
    budgetType: "fixed",
    budgetMin: 1000,
    budgetMax: 2000,
    duration: "short",
    skills: ["UI/UX"],
    proposals: 31,
    postedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    client: {
      name: "MailPilot",
      photo:
        "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=80&h=80&fit=crop",
      rating: 4.5,
      reviews: 7,
      spent: "$8K+",
      verified: false,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
  {
    id: "j16",
    title: "Go Microservices Architecture",
    description:
      "Design and implement microservices using Go with gRPC communication. Includes service discovery, circuit breakers, distributed tracing, and container orchestration.",
    category: "development",
    experience: "expert",
    budgetType: "hourly",
    budgetMin: 90,
    budgetMax: 140,
    duration: "long",
    skills: ["Go", "Docker", "DevOps", "PostgreSQL"],
    proposals: 6,
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    client: {
      name: "ScaleOps",
      photo:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=80&h=80&fit=crop",
      rating: 4.8,
      reviews: 41,
      spent: "$175K+",
      verified: true,
    },
    featured: false,
    urgent: false,
    remote: true,
    location: "Remote",
  },
];

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

const getDurationLabel = (d) => {
  const map = {
    short: "< 1 month",
    medium: "1–3 months",
    long: "3–6 months",
    ongoing: "Ongoing",
  };
  return map[d] || d;
};

// ============================================
// SMALL COMPONENTS
// ============================================
const SkillTag = memo(({ skill }) => (
  <span
    className="px-2 py-[3px] rounded-md text-[11px] font-medium"
    style={{
      background: "var(--theme-badge-primary-bg)",
      color: "var(--theme-badge-primary-text)",
      border: "1px solid var(--theme-badge-primary-border)",
    }}
  >
    {skill}
  </span>
));

const FilterPill = memo(({ label, onRemove }) => (
  <motion.span
    layout
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[11px] font-semibold"
    style={{
      background: "var(--theme-badge-primary-bg)",
      color: "var(--theme-badge-primary-text)",
      border: "1px solid var(--theme-badge-primary-border)",
    }}
  >
    {label}
    <button
      onClick={onRemove}
      className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-danger-500 hover:text-white transition-all"
    >
      <X className="w-2.5 h-2.5" />
    </button>
  </motion.span>
));

const Toggle = memo(({ checked, onChange, label, icon: Icon, color }) => (
  <button
    onClick={onChange}
    className="w-full flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-surface-hover transition-colors group"
  >
    <div className="flex items-center gap-2">
      <Icon className={clsx("w-3.5 h-3.5", color)} />
      <span className="text-text-secondary text-[13px] font-medium group-hover:text-text-primary transition-colors">
        {label}
      </span>
    </div>
    <div
      className={clsx(
        "relative w-9 h-5 rounded-full transition-all shrink-0",
        checked ? "bg-primary-500" : "",
      )}
      style={
        !checked ? { background: "var(--theme-border-default)" } : undefined
      }
    >
      <div
        className={clsx(
          "absolute top-[2px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-[2px]",
        )}
      />
    </div>
  </button>
));

const Dropdown = memo(
  ({ options, value, onChange, icon: Icon, placeholder }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useClickOutside(ref, () => setOpen(false));
    const selected = options.find((o) => o.id === value);
    const isActive = value !== options[0]?.id;

    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            "flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all border whitespace-nowrap",
            isActive || open
              ? "border-primary-500/20 text-text-primary"
              : "border-border-default text-text-secondary hover:border-border-strong",
          )}
          style={{ background: "var(--theme-surface-card)" }}
        >
          {Icon && (
            <Icon
              className={clsx(
                "w-3.5 h-3.5",
                isActive ? "text-primary-500" : "text-text-tertiary",
              )}
            />
          )}
          {selected?.name || placeholder}
          <ChevronDown
            className={clsx(
              "w-3 h-3 text-text-muted transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full right-0 mt-1.5 min-w-[180px] rounded-xl shadow-theme-xl z-50 py-1"
              style={{
                background: "var(--theme-surface-card)",
                border: "1px solid var(--theme-border-default)",
              }}
            >
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onChange(opt.id);
                    setOpen(false);
                  }}
                  className={clsx(
                    "w-full flex items-center justify-between px-3.5 py-2 text-[13px] transition-colors",
                    value === opt.id
                      ? "text-primary-600 font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
                  )}
                  style={
                    value === opt.id
                      ? { background: "var(--theme-badge-primary-bg)" }
                      : undefined
                  }
                >
                  {opt.name}
                  {value === opt.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

const Skeleton = memo(() => (
  <div className="card p-5 animate-pulse space-y-3">
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl shrink-0"
        style={{ background: "var(--theme-bg-inset)" }}
      />
      <div className="flex-1 space-y-1.5">
        <div
          className="h-4 w-48 rounded"
          style={{ background: "var(--theme-bg-inset)" }}
        />
        <div
          className="h-3 w-24 rounded"
          style={{ background: "var(--theme-bg-inset)" }}
        />
      </div>
      <div
        className="h-5 w-28 rounded"
        style={{ background: "var(--theme-bg-inset)" }}
      />
    </div>
    <div
      className="h-10 rounded-lg"
      style={{ background: "var(--theme-bg-inset)" }}
    />
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-5 w-14 rounded"
          style={{ background: "var(--theme-bg-inset)" }}
        />
      ))}
    </div>
  </div>
));

// ============================================
// JOB CARD
// ============================================
const JobCard = memo(({ job, view }) => {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="card group overflow-hidden"
    >
      <div
        className={clsx("p-4 sm:p-5", view === "grid" ? "flex flex-col" : "")}
      >
        {/* Top: Badges + Bookmark */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {job.featured && (
              <span className="badge badge-accent !text-[9px] !py-0 !px-1.5 !gap-0.5">
                <Flame className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
            {job.urgent && (
              <span className="badge badge-danger !text-[9px] !py-0 !px-1.5 !gap-0.5">
                <Zap className="w-2.5 h-2.5" />
                Urgent
              </span>
            )}
            <span className="text-text-muted text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(job.postedAt)}
            </span>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={clsx(
              "p-1.5 rounded-lg transition-all",
              saved
                ? "text-primary-500 opacity-100"
                : "text-text-muted hover:text-primary-400 opacity-0 group-hover:opacity-100",
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
          </button>
        </div>

        {/* Title + Budget */}
        <div className="flex items-start justify-between gap-4 mb-2.5">
          <Link
            to={`/jobs/${job.id}`}
            className="text-text-primary font-bold text-[15px] leading-snug hover:text-primary-500 transition-colors line-clamp-2 flex-1"
          >
            {job.title}
          </Link>
          <div className="shrink-0 text-right">
            <div className="text-text-primary font-extrabold text-[15px] tabular-nums whitespace-nowrap">
              {formatBudget(job)}
            </div>
            <span className="text-text-muted text-[10px] capitalize">
              {job.budgetType}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-tertiary text-[13px] leading-relaxed line-clamp-2 mb-3">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3.5">
          {job.skills.slice(0, 4).map((s) => (
            <SkillTag key={s} skill={s} />
          ))}
          {job.skills.length > 4 && (
            <span className="text-text-muted text-[10px] font-medium px-1 self-center">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer: Client + Meta */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "var(--theme-border-subtle)" }}
        >
          {/* Client */}
          <div className="flex items-center gap-2.5">
            <img
              src={job.client.photo}
              alt={job.client.name}
              width={28}
              height={28}
              className="rounded-lg object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-text-primary text-[12px] font-semibold truncate">
                  {job.client.name}
                </span>
                {job.client.verified && (
                  <Shield className="w-3 h-3 text-primary-500 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                <span className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-accent-400 fill-accent-400" />
                  {job.client.rating}
                </span>
                <span>·</span>
                <span>{job.client.spent} spent</span>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-[11px] text-text-muted">
            <span className="hidden sm:flex items-center gap-1">
              <Timer className="w-3 h-3" />
              {getDurationLabel(job.duration)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {job.proposals} proposals
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// ============================================
// PAGINATION
// ============================================
const Pagination = memo(({ current, total, onChange }) => {
  if (total <= 1) return null;
  const pages = [];
  pages.push(1);
  if (current > 3) pages.push("…");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  )
    pages.push(i);
  if (current < total - 2) pages.push("…");
  if (total > 1) pages.push(total);

  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      <button
        onClick={() => onChange(1)}
        disabled={current === 1}
        className="p-2 rounded-lg text-text-tertiary hover:text-text-primary disabled:opacity-20 transition-all"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="p-2 rounded-lg text-text-tertiary hover:text-text-primary disabled:opacity-20 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p, i) => (
        <button
          key={`${p}-${i}`}
          onClick={() => typeof p === "number" && onChange(p)}
          disabled={p === "…"}
          className={clsx(
            "w-9 h-9 rounded-lg text-[13px] font-medium transition-all",
            p === current
              ? "text-primary-600 font-bold"
              : "text-text-tertiary hover:text-text-primary",
            p === "…" && "cursor-default",
          )}
          style={
            p === current
              ? { background: "var(--theme-badge-primary-bg)" }
              : undefined
          }
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="p-2 rounded-lg text-text-tertiary hover:text-text-primary disabled:opacity-20 transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange(total)}
        disabled={current === total}
        className="p-2 rounded-lg text-text-tertiary hover:text-text-primary disabled:opacity-20 transition-all"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  );
});

// ============================================
// FILTER PANEL
// ============================================
const FilterPanel = memo(
  ({
    experience,
    setExperience,
    budgetType,
    setBudgetType,
    duration,
    setDuration,
    skills,
    toggleSkill,
    skillSearch,
    setSkillSearch,
    featured,
    setFeatured,
    urgent,
    setUrgent,
    verified,
    setVerified,
    count,
    clear,
  }) => {
    const filteredSkills = useMemo(
      () =>
        SKILLS.filter((s) =>
          s.toLowerCase().includes(skillSearch.toLowerCase()),
        ),
      [skillSearch],
    );

    return (
      <div className="space-y-5">
        {/* Experience */}
        <div>
          <h4 className="text-text-primary font-semibold text-[12px] uppercase tracking-wider mb-2">
            Experience
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {EXPERIENCE_LEVELS.map((l) => (
              <button
                key={l.id}
                onClick={() => setExperience(l.id)}
                className={clsx(
                  "px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
                  experience === l.id
                    ? "border-primary-500/25 text-primary-500"
                    : "border-transparent text-text-tertiary hover:text-text-primary",
                )}
                style={{
                  background:
                    experience === l.id
                      ? "var(--theme-badge-primary-bg)"
                      : "var(--theme-bg-inset)",
                }}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Type */}
        <div>
          <h4 className="text-text-primary font-semibold text-[12px] uppercase tracking-wider mb-2">
            Budget Type
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {BUDGET_TYPES.map((b) => (
              <button
                key={b.id}
                onClick={() => setBudgetType(b.id)}
                className={clsx(
                  "px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all",
                  budgetType === b.id
                    ? "border-primary-500/25 text-primary-500"
                    : "border-transparent text-text-tertiary hover:text-text-primary",
                )}
                style={{
                  background:
                    budgetType === b.id
                      ? "var(--theme-badge-primary-bg)"
                      : "var(--theme-bg-inset)",
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="text-text-primary font-semibold text-[12px] uppercase tracking-wider mb-2">
            Duration
          </h4>
          <div className="space-y-1">
            {DURATION_OPTIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDuration(d.id)}
                className={clsx(
                  "w-full text-left px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all",
                  duration === d.id
                    ? "text-primary-500"
                    : "text-text-tertiary hover:text-text-primary",
                )}
                style={{
                  background:
                    duration === d.id
                      ? "var(--theme-badge-primary-bg)"
                      : "transparent",
                }}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-text-primary font-semibold text-[12px] uppercase tracking-wider mb-2 flex items-center justify-between">
            Skills
            {skills.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary-500 text-white text-[9px] font-bold flex items-center justify-center">
                {skills.length}
              </span>
            )}
          </h4>
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted" />
            <input
              type="text"
              placeholder="Filter…"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 rounded-lg text-[12px] border outline-none text-text-primary placeholder:text-text-muted focus:border-primary-500 transition-all"
              style={{
                background: "var(--theme-bg-inset)",
                borderColor: "var(--theme-border-default)",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
            {filteredSkills.map((s) => (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={clsx(
                  "px-2 py-1 rounded-md text-[10px] font-medium border transition-all",
                  skills.includes(s)
                    ? "border-primary-500/25 text-primary-500"
                    : "border-transparent text-text-tertiary hover:text-text-primary",
                )}
                style={{
                  background: skills.includes(s)
                    ? "var(--theme-badge-primary-bg)"
                    : "var(--theme-bg-inset)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div>
          <h4 className="text-text-primary font-semibold text-[12px] uppercase tracking-wider mb-1.5">
            Filters
          </h4>
          <Toggle
            label="Featured"
            icon={Flame}
            color="text-accent-500"
            checked={featured}
            onChange={() => setFeatured(!featured)}
          />
          <Toggle
            label="Urgent"
            icon={Zap}
            color="text-danger-500"
            checked={urgent}
            onChange={() => setUrgent(!urgent)}
          />
          <Toggle
            label="Verified Client"
            icon={Shield}
            color="text-primary-500"
            checked={verified}
            onChange={() => setVerified(!verified)}
          />
        </div>

        {count > 0 && (
          <button
            onClick={clear}
            className="w-full py-2 text-[13px] font-semibold text-danger-500 rounded-xl border border-danger-500/15 transition-all hover:border-danger-500/30"
            style={{ background: "var(--theme-badge-danger-bg)" }}
          >
            Clear Filters ({count})
          </button>
        )}
      </div>
    );
  },
);

// ============================================
// MAIN
// ============================================
const BrowseJobs = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [category, setCategory] = useState("all");
  const [experience, setExperience] = useState("any");
  const [budgetType, setBudgetType] = useState("any");
  const [duration, setDuration] = useState("any");
  const [skills, setSkills] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 8;
  const topRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  const toggleSkill = useCallback(
    (s) =>
      setSkills((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s])),
    [],
  );

  const clear = useCallback(() => {
    setSearch("");
    setCategory("all");
    setExperience("any");
    setBudgetType("any");
    setDuration("any");
    setSkills([]);
    setFeatured(false);
    setUrgent(false);
    setVerified(false);
  }, []);

  const filtered = useMemo(() => {
    let r = [...JOBS];
    const q = debouncedSearch.toLowerCase();
    if (q)
      r = r.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q)),
      );
    if (category !== "all") r = r.filter((j) => j.category === category);
    if (experience !== "any") r = r.filter((j) => j.experience === experience);
    if (budgetType !== "any") r = r.filter((j) => j.budgetType === budgetType);
    if (duration !== "any") r = r.filter((j) => j.duration === duration);
    if (skills.length)
      r = r.filter((j) => skills.some((s) => j.skills.includes(s)));
    if (featured) r = r.filter((j) => j.featured);
    if (urgent) r = r.filter((j) => j.urgent);
    if (verified) r = r.filter((j) => j.client.verified);

    const sorters = {
      newest: (a, b) => b.postedAt - a.postedAt,
      "budget-high": (a, b) => b.budgetMax - a.budgetMax,
      "budget-low": (a, b) => a.budgetMin - b.budgetMin,
      "proposals-low": (a, b) => a.proposals - b.proposals,
      relevance: (a, b) =>
        (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
        b.client.rating - a.client.rating,
    };
    r.sort(sorters[sort] || sorters.newest);
    return r;
  }, [
    debouncedSearch,
    category,
    experience,
    budgetType,
    duration,
    skills,
    featured,
    urgent,
    verified,
    sort,
  ]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    category,
    experience,
    budgetType,
    duration,
    skills,
    featured,
    urgent,
    verified,
    sort,
  ]);
  useEffect(() => {
    if (page > 1 && topRef.current)
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  const activeFilters = useMemo(() => {
    const f = [];
    if (category !== "all")
      f.push({
        k: "c",
        l: CATEGORIES.find((c) => c.id === category)?.name,
        r: () => setCategory("all"),
      });
    if (experience !== "any")
      f.push({
        k: "e",
        l: EXPERIENCE_LEVELS.find((e) => e.id === experience)?.name,
        r: () => setExperience("any"),
      });
    if (budgetType !== "any")
      f.push({
        k: "b",
        l: BUDGET_TYPES.find((b) => b.id === budgetType)?.name,
        r: () => setBudgetType("any"),
      });
    if (duration !== "any")
      f.push({
        k: "d",
        l: DURATION_OPTIONS.find((d) => d.id === duration)?.name,
        r: () => setDuration("any"),
      });
    skills.forEach((s) =>
      f.push({ k: `s-${s}`, l: s, r: () => toggleSkill(s) }),
    );
    if (featured)
      f.push({ k: "f", l: "Featured", r: () => setFeatured(false) });
    if (urgent) f.push({ k: "u", l: "Urgent", r: () => setUrgent(false) });
    if (verified)
      f.push({ k: "v", l: "Verified", r: () => setVerified(false) });
    return f;
  }, [
    category,
    experience,
    budgetType,
    duration,
    skills,
    featured,
    urgent,
    verified,
    toggleSkill,
  ]);

  const filterProps = {
    experience,
    setExperience,
    budgetType,
    setBudgetType,
    duration,
    setDuration,
    skills,
    toggleSkill,
    skillSearch,
    setSkillSearch,
    featured,
    setFeatured,
    urgent,
    setUrgent,
    verified,
    setVerified,
    count: activeFilters.length,
    clear,
  };

  return (
    <div className="min-h-screen bg-page">
      {/* HEADER */}
      <section className="relative overflow-hidden pt-24 lg:pt-28 pb-6 hero-bg">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] orb-primary opacity-30 pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary leading-tight">
              Find <span className="text-gradient">Work</span>
            </h1>
            <p className="mt-1.5 text-text-secondary text-sm sm:text-base">
              {JOBS.length} open positions from verified clients
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl">
            <div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-theme-sm transition-all focus-within:shadow-theme-md"
              style={{
                background: "var(--theme-surface-card)",
                border: "1px solid var(--theme-border-default)",
              }}
            >
              <Search className="w-4 h-4 text-text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search jobs, skills, or keywords…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-muted text-sm min-w-0"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-text-muted hover:text-text-primary p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-[13px] font-medium border whitespace-nowrap shrink-0 transition-all",
                  category === c.id
                    ? "border-primary-500/20 text-primary-600"
                    : "border-border-default text-text-tertiary hover:text-text-primary hover:border-border-strong",
                )}
                style={{
                  background:
                    category === c.id
                      ? "var(--theme-badge-primary-bg)"
                      : "var(--theme-surface-card)",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="container-custom py-5 lg:py-6" ref={topRef}>
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-[248px] shrink-0">
            <div className="card p-4 sticky top-24">
              <h3 className="text-text-primary font-semibold text-[13px] mb-4 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary-500" />{" "}
                Filters
                {activeFilters.length > 0 && (
                  <span className="ml-auto w-4.5 h-4.5 rounded-full bg-primary-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </h3>
              <FilterPanel {...filterProps} />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-text-secondary text-[13px]">
                  <span className="text-text-primary font-bold tabular-nums">
                    {filtered.length}
                  </span>{" "}
                  jobs
                </span>
                <button
                  onClick={() => setDrawer(true)}
                  className="lg:hidden btn-secondary px-2.5 py-1.5 text-[12px] flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {activeFilters.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                </button>
              </div>
              <Dropdown
                options={SORT_OPTIONS}
                value={sort}
                onChange={setSort}
                icon={ArrowUpDown}
                placeholder="Sort"
              />
            </div>

            {/* Active pills */}
            <AnimatePresence mode="popLayout">
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 flex flex-wrap items-center gap-1"
                >
                  {activeFilters.map((f) => (
                    <FilterPill key={f.k} label={f.l} onRemove={f.r} />
                  ))}
                  <button
                    onClick={clear}
                    className="text-danger-500 text-[11px] font-semibold hover:underline ml-1"
                  >
                    Clear
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Jobs */}
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} />
                ))}
              </div>
            ) : paginated.length > 0 ? (
              <motion.div
                key={`${page}-${sort}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04 } },
                }}
                className="space-y-3"
              >
                {paginated.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </motion.div>
            ) : (
              <div className="card p-10 text-center">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: "var(--theme-badge-primary-bg)" }}
                >
                  <Briefcase className="w-5 h-5 text-primary-500" />
                </div>
                <h3 className="text-text-primary font-bold text-lg mb-1">
                  No jobs found
                </h3>
                <p className="text-text-tertiary text-sm mb-4">
                  Adjust your filters to see more results.
                </p>
                <button
                  onClick={clear}
                  className="btn-primary px-5 py-2 text-sm"
                >
                  <span className="relative z-10">Clear Filters</span>
                </button>
              </div>
            )}

            <Pagination current={page} total={totalPages} onChange={setPage} />
            {filtered.length > 0 && (
              <p className="text-center text-text-muted text-[11px] mt-2 tabular-nums">
                {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setDrawer(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] max-w-[88vw] z-50 lg:hidden overflow-y-auto"
              style={{
                background: "var(--theme-bg)",
                borderLeft: "1px solid var(--theme-border-default)",
              }}
            >
              <div className="p-4 pb-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-text-primary font-bold text-base">
                    Filters
                  </h3>
                  <button
                    onClick={() => setDrawer(false)}
                    className="p-1.5 rounded-lg hover:bg-surface-hover text-text-secondary"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <FilterPanel {...filterProps} />
                <button
                  onClick={() => setDrawer(false)}
                  className="btn-primary w-full py-2.5 text-sm mt-5"
                >
                  <span className="relative z-10">
                    Show {filtered.length} Jobs
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrowseJobs;
