// src/pages/BrowseFreelancers.jsx
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
  Star,
  MapPin,
  Shield,
  Zap,
  Heart,
  ExternalLink,
  Users,
  Briefcase,
  Award,
  TrendingUp,
  LayoutGrid,
  List,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Globe,
  BadgeCheck,
  Flame,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { clsx } from "clsx";

// ============================================
// CONSTANTS
// ============================================
const CATEGORIES = [
  { id: "all", name: "All", count: 2847 },
  { id: "development", name: "Development", count: 1243 },
  { id: "design", name: "Design", count: 567 },
  { id: "marketing", name: "Marketing", count: 389 },
  { id: "writing", name: "Writing", count: 298 },
  { id: "data", name: "Data", count: 201 },
  { id: "video", name: "Video", count: 149 },
];

const EXPERIENCE_LEVELS = [
  { id: "any", name: "Any Level" },
  { id: "entry", name: "Entry", sub: "0–2 yrs" },
  { id: "intermediate", name: "Mid", sub: "2–5 yrs" },
  { id: "expert", name: "Expert", sub: "5–10 yrs" },
  { id: "master", name: "Master", sub: "10+ yrs" },
];

const SORT_OPTIONS = [
  { id: "relevance", name: "Relevant" },
  { id: "rating", name: "Top Rated" },
  { id: "rate-low", name: "Price: Low" },
  { id: "rate-high", name: "Price: High" },
  { id: "projects", name: "Most Projects" },
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
// FREELANCER DATA WITH UNSPLASH IMAGES
// ============================================
const FREELANCERS = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Full-Stack Developer",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    location: "San Francisco, US",
    rating: 4.9,
    reviews: 127,
    rate: 95,
    projects: 89,
    success: 98,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: true,
    online: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Product Designer",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    location: "London, UK",
    rating: 4.8,
    reviews: 94,
    rate: 110,
    projects: 67,
    success: 97,
    skills: ["Figma", "UI/UX", "React"],
    category: "design",
    experience: "expert",
    verified: true,
    topRated: true,
    online: false,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    title: "Mobile Developer",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    location: "Barcelona, ES",
    rating: 4.9,
    reviews: 156,
    rate: 85,
    projects: 112,
    success: 99,
    skills: ["Flutter", "React", "Swift", "Kotlin"],
    category: "development",
    experience: "master",
    verified: true,
    topRated: true,
    online: true,
  },
  {
    id: "4",
    name: "James Park",
    title: "DevOps Engineer",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    location: "Seoul, KR",
    rating: 4.7,
    reviews: 83,
    rate: 120,
    projects: 54,
    success: 96,
    skills: ["AWS", "Docker", "DevOps", "Python"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "5",
    name: "Aisha Patel",
    title: "Data Scientist",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    location: "Mumbai, IN",
    rating: 4.8,
    reviews: 71,
    rate: 75,
    projects: 48,
    success: 95,
    skills: ["Python", "TypeScript", "MongoDB"],
    category: "data",
    experience: "intermediate",
    verified: true,
    topRated: false,
    online: false,
  },
  {
    id: "6",
    name: "David Kim",
    title: "UI/UX Designer",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    location: "Tokyo, JP",
    rating: 4.9,
    reviews: 203,
    rate: 130,
    projects: 134,
    success: 99,
    skills: ["Figma", "UI/UX", "Tailwind CSS"],
    category: "design",
    experience: "master",
    verified: true,
    topRated: true,
    online: true,
  },
  {
    id: "7",
    name: "Priya Sharma",
    title: "Frontend Developer",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    location: "Toronto, CA",
    rating: 4.6,
    reviews: 45,
    rate: 65,
    projects: 32,
    success: 94,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    category: "development",
    experience: "intermediate",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "8",
    name: "Alex Thompson",
    title: "Backend Developer",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    location: "Berlin, DE",
    rating: 4.7,
    reviews: 88,
    rate: 100,
    projects: 73,
    success: 96,
    skills: ["Node.js", "Python", "GraphQL", "PostgreSQL"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: false,
    online: false,
  },
  {
    id: "9",
    name: "Nina Kowalski",
    title: "Motion Designer",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    location: "Amsterdam, NL",
    rating: 4.8,
    reviews: 62,
    rate: 90,
    projects: 51,
    success: 97,
    skills: ["Figma", "UI/UX"],
    category: "video",
    experience: "expert",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "10",
    name: "Omar Hassan",
    title: "Cloud Architect",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    location: "Dubai, AE",
    rating: 4.9,
    reviews: 115,
    rate: 150,
    projects: 78,
    success: 98,
    skills: ["AWS", "Docker", "DevOps", "Go"],
    category: "development",
    experience: "master",
    verified: true,
    topRated: true,
    online: true,
  },
  {
    id: "11",
    name: "Lisa Wang",
    title: "Content Strategist",
    photo:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
    location: "Singapore, SG",
    rating: 4.6,
    reviews: 39,
    rate: 55,
    projects: 28,
    success: 93,
    skills: ["UI/UX", "Figma"],
    category: "writing",
    experience: "intermediate",
    verified: false,
    topRated: false,
    online: false,
  },
  {
    id: "12",
    name: "Carlos Mendez",
    title: "Blockchain Developer",
    photo:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
    location: "São Paulo, BR",
    rating: 4.7,
    reviews: 56,
    rate: 135,
    projects: 41,
    success: 95,
    skills: ["Rust", "TypeScript", "Node.js"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "13",
    name: "Emma Fischer",
    title: "SEO Specialist",
    photo:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
    location: "Stockholm, SE",
    rating: 4.5,
    reviews: 34,
    rate: 60,
    projects: 45,
    success: 92,
    skills: ["Python", "GraphQL"],
    category: "marketing",
    experience: "intermediate",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "14",
    name: "Ryan O'Brien",
    title: "Systems Architect",
    photo:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face",
    location: "Sydney, AU",
    rating: 4.8,
    reviews: 92,
    rate: 140,
    projects: 63,
    success: 97,
    skills: ["AWS", "Docker", "Go", "DevOps"],
    category: "development",
    experience: "master",
    verified: true,
    topRated: true,
    online: false,
  },
  {
    id: "15",
    name: "Yuki Tanaka",
    title: "Frontend Developer",
    photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face",
    location: "Tokyo, JP",
    rating: 4.7,
    reviews: 67,
    rate: 80,
    projects: 52,
    success: 96,
    skills: ["Vue.js", "TypeScript", "Next.js", "Tailwind CSS"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "16",
    name: "Ahmed Ali",
    title: "ML Engineer",
    photo:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face",
    location: "Paris, FR",
    rating: 4.8,
    reviews: 48,
    rate: 115,
    projects: 35,
    success: 97,
    skills: ["Python", "TypeScript", "Docker"],
    category: "data",
    experience: "expert",
    verified: true,
    topRated: false,
    online: false,
  },
  {
    id: "17",
    name: "Sofia Petrov",
    title: "Product Designer",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
    location: "Berlin, DE",
    rating: 4.9,
    reviews: 143,
    rate: 105,
    projects: 98,
    success: 98,
    skills: ["Figma", "UI/UX", "React"],
    category: "design",
    experience: "master",
    verified: true,
    topRated: true,
    online: true,
  },
  {
    id: "18",
    name: "Daniel Costa",
    title: "Full-Stack Developer",
    photo:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face",
    location: "London, UK",
    rating: 4.6,
    reviews: 58,
    rate: 85,
    projects: 44,
    success: 94,
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    category: "development",
    experience: "intermediate",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "19",
    name: "Maria Gonzalez",
    title: "Video Editor",
    photo:
      "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=200&h=200&fit=crop&crop=face",
    location: "Barcelona, ES",
    rating: 4.7,
    reviews: 41,
    rate: 70,
    projects: 56,
    success: 95,
    skills: ["Figma", "UI/UX"],
    category: "video",
    experience: "expert",
    verified: true,
    topRated: false,
    online: false,
  },
  {
    id: "20",
    name: "Tom Wilson",
    title: "Backend Developer",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    location: "San Francisco, US",
    rating: 4.8,
    reviews: 79,
    rate: 110,
    projects: 61,
    success: 97,
    skills: ["Go", "Rust", "PostgreSQL", "Docker"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: false,
    online: true,
  },
  {
    id: "21",
    name: "Zara Khan",
    title: "Data Analyst",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    location: "Toronto, CA",
    rating: 4.5,
    reviews: 29,
    rate: 60,
    projects: 23,
    success: 91,
    skills: ["Python", "MongoDB", "PostgreSQL"],
    category: "data",
    experience: "entry",
    verified: false,
    topRated: false,
    online: true,
  },
  {
    id: "22",
    name: "Leo Chang",
    title: "Mobile Developer",
    photo:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?w=200&h=200&fit=crop&crop=face",
    location: "Singapore, SG",
    rating: 4.7,
    reviews: 72,
    rate: 90,
    projects: 58,
    success: 96,
    skills: ["Flutter", "Swift", "Kotlin", "React"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: false,
    online: false,
  },
  {
    id: "23",
    name: "Anna Müller",
    title: "Frontend Developer",
    photo:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
    location: "Amsterdam, NL",
    rating: 4.8,
    reviews: 86,
    rate: 95,
    projects: 71,
    success: 97,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    category: "development",
    experience: "expert",
    verified: true,
    topRated: true,
    online: true,
  },
  {
    id: "24",
    name: "Raj Kapoor",
    title: "DevOps Engineer",
    photo:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop&crop=face",
    location: "Mumbai, IN",
    rating: 4.6,
    reviews: 53,
    rate: 70,
    projects: 47,
    success: 94,
    skills: ["AWS", "Docker", "DevOps", "Python"],
    category: "development",
    experience: "intermediate",
    verified: true,
    topRated: false,
    online: true,
  },
];

// ============================================
// HOOKS
// ============================================
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

// ============================================
// SMALL COMPONENTS (Memoized)
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

const Avatar = memo(({ src, name, size = 48, online, verified }) => (
  <div className="relative shrink-0">
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className="rounded-2xl object-cover"
      style={{ width: size, height: size }}
    />
    {verified && (
      <div
        className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-primary-500 rounded-md flex items-center justify-center"
        style={{ boxShadow: "0 0 0 2px var(--theme-surface-card)" }}
      >
        <BadgeCheck className="w-3 h-3 text-white" />
      </div>
    )}
    {online && (
      <div
        className="absolute top-0 right-0 w-3 h-3 bg-secondary-400 rounded-full"
        style={{ boxShadow: "0 0 0 2px var(--theme-surface-card)" }}
      />
    )}
  </div>
));

// ============================================
// DROPDOWN
// ============================================
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

// ============================================
// RANGE SLIDER
// ============================================
const RangeSlider = memo(
  ({ value, onChange, min = 0, max = 200, step = 5 }) => {
    const leftPct = ((value[0] - min) / (max - min)) * 100;
    const rightPct = ((value[1] - min) / (max - min)) * 100;
    const rangeInputClass = `absolute w-full h-8 appearance-none bg-transparent pointer-events-none
    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary-500
    [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab
    [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform
    [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary-500
    [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:border-none`;

    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold text-text-primary">
            Hourly Rate
          </span>
          <span className="text-[12px] font-bold text-primary-500 tabular-nums">
            ${value[0]} – ${value[1]}
            {value[1] >= max ? "+" : ""}
          </span>
        </div>
        <div className="relative h-8 flex items-center">
          <div
            className="absolute h-1 w-full rounded-full"
            style={{ background: "var(--theme-bg-inset)" }}
          />
          <div
            className="absolute h-1 rounded-full bg-primary-500"
            style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) =>
              onChange([Math.min(+e.target.value, value[1] - step), value[1]])
            }
            className={clsx(rangeInputClass, "z-10")}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) =>
              onChange([value[0], Math.max(+e.target.value, value[0] + step)])
            }
            className={clsx(rangeInputClass, "z-20")}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {[
            [0, 50],
            [50, 100],
            [100, 200],
          ].map(([lo, hi]) => (
            <button
              key={lo}
              onClick={() => onChange([lo, hi])}
              className={clsx(
                "flex-1 py-1 rounded text-[10px] font-semibold border transition-all",
                value[0] === lo && value[1] === hi
                  ? "border-primary-500/25 text-primary-500"
                  : "border-transparent text-text-muted",
              )}
              style={{
                background:
                  value[0] === lo && value[1] === hi
                    ? "var(--theme-badge-primary-bg)"
                    : "var(--theme-bg-inset)",
              }}
            >
              ${lo}–{hi >= 200 ? "$200+" : `$${hi}`}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

// ============================================
// TOGGLE
// ============================================
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

// ============================================
// SKELETON
// ============================================
const Skeleton = memo(({ viewMode }) => (
  <div
    className={clsx(
      "card animate-pulse",
      viewMode === "list" ? "p-4 flex items-center gap-4" : "p-4 space-y-3",
    )}
  >
    <div
      className={clsx(
        "rounded-xl shrink-0",
        viewMode === "list" ? "w-12 h-12" : "w-11 h-11",
      )}
      style={{ background: "var(--theme-bg-inset)" }}
    />
    <div className="flex-1 space-y-2">
      <div
        className="h-3.5 w-28 rounded"
        style={{ background: "var(--theme-bg-inset)" }}
      />
      <div
        className="h-3 w-40 rounded"
        style={{ background: "var(--theme-bg-inset)" }}
      />
    </div>
    {viewMode === "list" && (
      <div
        className="h-8 w-20 rounded-lg"
        style={{ background: "var(--theme-bg-inset)" }}
      />
    )}
  </div>
));

// ============================================
// GRID CARD
// ============================================
const GridCard = memo(({ f }) => {
  const [fav, setFav] = useState(false);

  return (
    <div className="card card-glow group flex flex-col overflow-hidden">
      <div className="p-4 pb-3 flex-1">
        {/* Top badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            {f.topRated && (
              <span className="badge badge-accent !text-[9px] !py-0 !px-1.5 !gap-0.5">
                <Flame className="w-2.5 h-2.5" />
                Top
              </span>
            )}
            {f.online && (
              <span className="flex items-center gap-1 text-[10px] text-secondary-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse" />
                Online
              </span>
            )}
          </div>
          <button
            onClick={() => setFav(!fav)}
            className={clsx(
              "p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100",
              fav
                ? "text-danger-500 opacity-100"
                : "text-text-muted hover:text-danger-400",
            )}
            style={
              fav ? { background: "var(--theme-badge-danger-bg)" } : undefined
            }
          >
            <Heart className={clsx("w-3.5 h-3.5", fav && "fill-current")} />
          </button>
        </div>

        {/* Profile row */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar
            src={f.photo}
            name={f.name}
            size={44}
            online={false}
            verified={f.verified}
          />
          <div className="min-w-0">
            <h3 className="text-text-primary font-bold text-[14px] truncate group-hover:text-primary-500 transition-colors">
              {f.name}
            </h3>
            <p className="text-text-secondary text-[12px] truncate">
              {f.title}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-3 h-3 text-text-muted" />
          <span className="text-text-muted text-[11px]">{f.location}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {f.skills.slice(0, 3).map((s) => (
            <SkillTag key={s} skill={s} />
          ))}
          {f.skills.length > 3 && (
            <span className="text-text-muted text-[10px] font-medium px-1 self-center">
              +{f.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-4 py-3 flex items-center justify-between border-t"
        style={{ borderColor: "var(--theme-border-subtle)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
            <span className="text-text-primary font-bold text-[13px] tabular-nums">
              {f.rating}
            </span>
            <span className="text-text-muted text-[10px]">({f.reviews})</span>
          </div>
          <span className="text-text-muted text-[10px]">·</span>
          <span className="text-text-muted text-[11px] tabular-nums">
            {f.projects} projects
          </span>
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className="text-text-primary font-extrabold text-[16px] tabular-nums">
            ${f.rate}
          </span>
          <span className="text-text-muted text-[10px]">/hr</span>
        </div>
      </div>

      {/* Hover CTA */}
      <Link
        to={`/freelancer/${f.id}`}
        className="block px-4 py-2.5 text-center text-[13px] font-semibold text-primary-500 hover:text-primary-600 border-t transition-colors"
        style={{
          borderColor: "var(--theme-border-subtle)",
          background: "var(--theme-surface-hover)",
        }}
      >
        View Profile →
      </Link>
    </div>
  );
});

// ============================================
// LIST CARD
// ============================================
const ListCard = memo(({ f }) => {
  const [fav, setFav] = useState(false);

  return (
    <div className="card group overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
        {/* Left */}
        <div className="flex items-center gap-3 sm:w-[240px] shrink-0">
          <Avatar
            src={f.photo}
            name={f.name}
            size={44}
            online={f.online}
            verified={f.verified}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-text-primary font-bold text-[14px] truncate group-hover:text-primary-500 transition-colors">
                {f.name}
              </h3>
              {f.topRated && (
                <Flame className="w-3 h-3 text-accent-500 shrink-0" />
              )}
            </div>
            <p className="text-text-secondary text-[12px] truncate">
              {f.title}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-text-muted" />
              <span className="text-text-muted text-[10px]">{f.location}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1">
            {f.skills.slice(0, 4).map((s) => (
              <SkillTag key={s} skill={s} />
            ))}
            {f.skills.length > 4 && (
              <span className="text-text-muted text-[10px] font-medium px-1 self-center">
                +{f.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
            <span className="text-text-primary font-bold text-[13px] tabular-nums">
              {f.rating}
            </span>
            <span className="text-text-muted text-[10px]">({f.reviews})</span>
          </div>

          <div className="text-right">
            <span className="text-text-primary font-extrabold text-lg tabular-nums">
              ${f.rate}
            </span>
            <span className="text-text-muted text-[11px]">/hr</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFav(!fav)}
              className={clsx(
                "p-2 rounded-xl border transition-all",
                fav
                  ? "text-danger-500 border-danger-500/15"
                  : "text-text-muted border-border-default hover:text-danger-400",
              )}
              style={
                fav ? { background: "var(--theme-badge-danger-bg)" } : undefined
              }
            >
              <Heart className={clsx("w-3.5 h-3.5", fav && "fill-current")} />
            </button>
            <Link
              to={`/freelancer/${f.id}`}
              className="btn-primary px-3.5 py-2 text-[13px] flex items-center gap-1"
            >
              <span className="relative z-10">View</span>
              <ExternalLink className="w-3 h-3 relative z-10" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

// ============================================
// PAGINATION
// ============================================
const Pagination = memo(({ current, total, onChange }) => {
  if (total <= 1) return null;
  const pages = [];
  const d = 1;
  pages.push(1);
  if (current - d > 2) pages.push("…");
  for (
    let i = Math.max(2, current - d);
    i <= Math.min(total - 1, current + d);
    i++
  )
    pages.push(i);
  if (current + d < total - 1) pages.push("…");
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
    skills,
    toggleSkill,
    skillSearch,
    setSkillSearch,
    range,
    setRange,
    verified,
    setVerified,
    topRated,
    setTopRated,
    onlineOnly,
    setOnline,
    experience,
    setExperience,
    count,
    clear,
  }) => {
    const filtered = useMemo(
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
              className="w-full pl-7 pr-3 py-1.5 rounded-lg text-[12px] border outline-none transition-all text-text-primary placeholder:text-text-muted focus:border-primary-500"
              style={{
                background: "var(--theme-bg-inset)",
                borderColor: "var(--theme-border-default)",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
            {filtered.map((s) => (
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

        {/* Rate */}
        <RangeSlider value={range} onChange={setRange} />

        {/* Toggles */}
        <div>
          <h4 className="text-text-primary font-semibold text-[12px] uppercase tracking-wider mb-1.5">
            Filters
          </h4>
          <Toggle
            label="Verified"
            icon={Shield}
            color="text-primary-500"
            checked={verified}
            onChange={() => setVerified(!verified)}
          />
          <Toggle
            label="Top Rated"
            icon={Award}
            color="text-accent-500"
            checked={topRated}
            onChange={() => setTopRated(!topRated)}
          />
          <Toggle
            label="Online"
            icon={Globe}
            color="text-secondary-500"
            checked={onlineOnly}
            onChange={() => setOnline(!onlineOnly)}
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
const BrowseFreelancers = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [category, setCategory] = useState("all");
  const [experience, setExperience] = useState("any");
  const [range, setRange] = useState([0, 200]);
  const [skills, setSkills] = useState([]);
  const [verified, setVerified] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [onlineOnly, setOnline] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = view === "grid" ? 12 : 8;
  const headerRef = useRef(null);
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
    setRange([0, 200]);
    setSkills([]);
    setVerified(false);
    setTopRated(false);
    setOnline(false);
  }, []);

  const filtered = useMemo(() => {
    let r = [...FREELANCERS];
    const q = debouncedSearch.toLowerCase();
    if (q)
      r = r.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.title.toLowerCase().includes(q) ||
          f.skills.some((s) => s.toLowerCase().includes(q)) ||
          f.location.toLowerCase().includes(q),
      );
    if (category !== "all") r = r.filter((f) => f.category === category);
    if (experience !== "any") r = r.filter((f) => f.experience === experience);
    r = r.filter(
      (f) => f.rate >= range[0] && (range[1] >= 200 || f.rate <= range[1]),
    );
    if (skills.length)
      r = r.filter((f) => skills.every((s) => f.skills.includes(s)));
    if (verified) r = r.filter((f) => f.verified);
    if (topRated) r = r.filter((f) => f.topRated);
    if (onlineOnly) r = r.filter((f) => f.online);

    const sorters = {
      rating: (a, b) => b.rating - a.rating,
      "rate-low": (a, b) => a.rate - b.rate,
      "rate-high": (a, b) => b.rate - a.rate,
      projects: (a, b) => b.projects - a.projects,
      relevance: (a, b) =>
        b.rating * Math.log(b.projects + 1) -
        a.rating * Math.log(a.projects + 1),
    };
    r.sort(sorters[sort] || sorters.relevance);
    return r;
  }, [
    debouncedSearch,
    category,
    experience,
    range,
    skills,
    verified,
    topRated,
    onlineOnly,
    sort,
  ]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page, PAGE_SIZE],
  );

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    category,
    experience,
    range,
    skills,
    verified,
    topRated,
    onlineOnly,
    sort,
    view,
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
    if (range[0] > 0 || range[1] < 200)
      f.push({
        k: "r",
        l: `$${range[0]}–$${range[1]}${range[1] >= 200 ? "+" : ""}/hr`,
        r: () => setRange([0, 200]),
      });
    skills.forEach((s) =>
      f.push({ k: `s-${s}`, l: s, r: () => toggleSkill(s) }),
    );
    if (verified)
      f.push({ k: "v", l: "Verified", r: () => setVerified(false) });
    if (topRated)
      f.push({ k: "t", l: "Top Rated", r: () => setTopRated(false) });
    if (onlineOnly) f.push({ k: "o", l: "Online", r: () => setOnline(false) });
    return f;
  }, [
    category,
    experience,
    range,
    skills,
    verified,
    topRated,
    onlineOnly,
    toggleSkill,
  ]);

  const filterProps = {
    skills,
    toggleSkill,
    skillSearch,
    setSkillSearch,
    range,
    setRange,
    verified,
    setVerified,
    topRated,
    setTopRated,
    onlineOnly,
    setOnline: setOnline,
    experience,
    setExperience,
    count: activeFilters.length,
    clear,
  };

  return (
    <div className="min-h-screen bg-page">
      {/* HEADER */}
      <section className="relative overflow-hidden pt-24 lg:pt-28 pb-6 hero-bg">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] orb-primary opacity-30 pointer-events-none" />

        <div ref={headerRef} className="container-custom relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text-primary leading-tight">
                Find <span className="text-gradient">Talent</span>
              </h1>
              <p className="mt-1.5 text-text-secondary text-sm sm:text-base">
                {FREELANCERS.length} verified professionals ready to work
              </p>
            </div>
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
                placeholder="Search name, skill, or role…"
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
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary-500" />
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
                  results
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
              <div className="flex items-center gap-1.5">
                <Dropdown
                  options={SORT_OPTIONS}
                  value={sort}
                  onChange={setSort}
                  icon={ArrowUpDown}
                  placeholder="Sort"
                />
                <div
                  className="flex rounded-lg overflow-hidden border"
                  style={{ borderColor: "var(--theme-border-default)" }}
                >
                  {[
                    { m: "grid", I: LayoutGrid },
                    { m: "list", I: List },
                  ].map(({ m, I }) => (
                    <button
                      key={m}
                      onClick={() => setView(m)}
                      className={clsx(
                        "p-2 transition-all",
                        view === m
                          ? "text-primary-500"
                          : "text-text-muted hover:text-text-primary",
                      )}
                      style={{
                        background:
                          view === m
                            ? "var(--theme-badge-primary-bg)"
                            : "var(--theme-surface-card)",
                      }}
                    >
                      <I className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
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

            {/* Results */}
            {loading ? (
              <div
                className={clsx(
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                    : "space-y-3",
                )}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} viewMode={view} />
                ))}
              </div>
            ) : paginated.length > 0 ? (
              <motion.div
                key={`${page}-${view}-${sort}`}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03 } },
                }}
                className={clsx(
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                    : "space-y-3",
                )}
              >
                {paginated.map((f) =>
                  view === "grid" ? (
                    <GridCard key={f.id} f={f} />
                  ) : (
                    <ListCard key={f.id} f={f} />
                  ),
                )}
              </motion.div>
            ) : (
              <div className="card p-10 text-center">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: "var(--theme-badge-primary-bg)" }}
                >
                  <Users className="w-5 h-5 text-primary-500" />
                </div>
                <h3 className="text-text-primary font-bold text-lg mb-1">
                  No results
                </h3>
                <p className="text-text-tertiary text-sm mb-4">
                  Adjust filters to find more talent.
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
                    Show {filtered.length} Results
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

export default BrowseFreelancers;
