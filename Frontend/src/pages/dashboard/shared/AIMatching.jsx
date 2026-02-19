import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Star,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  Filter,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  Award,
  Briefcase,
  Users,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  MessageSquare,
  Eye,
  Brain,
  Sliders,
  ArrowUpRight,
  Lightbulb,
  ChevronDown,
  Search,
  Flame,
  Shield,
  Gem,
  ArrowRight,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const demoMatchedJobs = [
  {
    id: "j1",
    title: "Senior React Developer for E-commerce Platform",
    company: "TechCorp Inc.",
    location: "Remote",
    budget: { min: 5000, max: 8000, type: "fixed" },
    duration: "2-3 months",
    skills: ["React", "Next.js", "TypeScript", "Node.js"],
    matchScore: 98,
    matchReasons: [
      {
        label: "Skills Match",
        score: 100,
        detail: "All 4 required skills match your profile",
      },
      {
        label: "Experience Level",
        score: 95,
        detail: "Senior level matches your 5+ years experience",
      },
      {
        label: "Budget Fit",
        score: 98,
        detail: "Within your preferred rate range",
      },
      {
        label: "Past Success",
        score: 100,
        detail: "You've completed 3 similar projects",
      },
    ],
    postedAt: "2 hours ago",
    proposals: 8,
    clientRating: 4.9,
    clientHireRate: 85,
    featured: true,
    description:
      "We're looking for an experienced React developer to build a modern e-commerce platform with advanced features.",
  },
  {
    id: "j2",
    title: "Full-Stack Developer for SaaS Dashboard",
    company: "DataDrive",
    location: "Remote",
    budget: { min: 8000, max: 12000, type: "fixed" },
    duration: "3-4 months",
    skills: ["React", "Python", "PostgreSQL", "AWS"],
    matchScore: 92,
    matchReasons: [
      {
        label: "Skills Match",
        score: 85,
        detail: "3 of 4 skills match, Python is similar to your Node.js",
      },
      {
        label: "Project Type",
        score: 95,
        detail: "Dashboard projects align with your portfolio",
      },
      {
        label: "Client Quality",
        score: 100,
        detail: "Verified client with excellent history",
      },
      {
        label: "Growth Potential",
        score: 90,
        detail: "Long-term opportunity likely",
      },
    ],
    postedAt: "5 hours ago",
    proposals: 12,
    clientRating: 4.8,
    clientHireRate: 78,
    featured: false,
    description:
      "Build a comprehensive SaaS analytics dashboard with real-time data visualization.",
  },
  {
    id: "j3",
    title: "Mobile App Developer - React Native",
    company: "HealthFirst",
    location: "Remote",
    budget: { min: 4000, max: 6000, type: "fixed" },
    duration: "1-2 months",
    skills: ["React Native", "TypeScript", "Firebase", "Redux"],
    matchScore: 87,
    matchReasons: [
      {
        label: "Skills Match",
        score: 80,
        detail: "Strong React foundation transfers to React Native",
      },
      {
        label: "Industry Fit",
        score: 90,
        detail: "Healthcare projects match your interests",
      },
      {
        label: "Timeline",
        score: 95,
        detail: "Fits your current availability",
      },
      {
        label: "Reputation Boost",
        score: 85,
        detail: "Client has 50+ hires, good for reviews",
      },
    ],
    postedAt: "1 day ago",
    proposals: 24,
    clientRating: 4.7,
    clientHireRate: 72,
    featured: false,
    description:
      "Develop a health tracking mobile application with Firebase backend integration.",
  },
  {
    id: "j4",
    title: "API Integration Specialist",
    company: "FinanceFlow",
    location: "Remote",
    budget: { min: 3000, max: 4500, type: "fixed" },
    duration: "2-4 weeks",
    skills: ["Node.js", "REST APIs", "GraphQL", "Stripe"],
    matchScore: 85,
    matchReasons: [
      {
        label: "Skills Match",
        score: 95,
        detail: "Perfect match for API and Stripe skills",
      },
      { label: "Quick Win", score: 90, detail: "Short project, fast payment" },
      {
        label: "Experience",
        score: 75,
        detail: "Slightly below your typical project size",
      },
      { label: "Client Trust", score: 80, detail: "Verified payment method" },
    ],
    postedAt: "3 days ago",
    proposals: 18,
    clientRating: 4.6,
    clientHireRate: 65,
    featured: false,
    description:
      "Integrate multiple payment gateways and third-party APIs into existing fintech platform.",
  },
];

const demoMatchedFreelancers = [
  {
    id: "f1",
    name: "Sarah Johnson",
    title: "Senior UI/UX Designer",
    location: "San Francisco, CA",
    hourlyRate: 85,
    rating: 4.9,
    reviews: 127,
    completedJobs: 89,
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    matchScore: 96,
    matchReasons: [
      {
        label: "Skills Match",
        score: 100,
        detail: "Expert in all required design tools",
      },
      { label: "Availability", score: 95, detail: "Can start immediately" },
      {
        label: "Past Work",
        score: 98,
        detail: "Portfolio shows similar e-commerce projects",
      },
      { label: "Communication", score: 92, detail: "< 1 hour response time" },
    ],
    verified: true,
    topRated: true,
    avatar: null,
    bio: "Passionate designer with 8+ years creating beautiful, user-centered digital experiences.",
  },
  {
    id: "f2",
    name: "Michael Chen",
    title: "Full-Stack Developer",
    location: "Toronto, Canada",
    hourlyRate: 75,
    rating: 4.8,
    reviews: 94,
    completedJobs: 67,
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    matchScore: 93,
    matchReasons: [
      {
        label: "Technical Fit",
        score: 95,
        detail: "Strong full-stack capabilities",
      },
      { label: "Budget Match", score: 90, detail: "Within your budget range" },
      { label: "Timezone", score: 92, detail: "Overlapping work hours" },
      { label: "Success Rate", score: 96, detail: "98% job success rate" },
    ],
    verified: true,
    topRated: true,
    avatar: null,
    bio: "Building scalable web applications with modern technologies for 6+ years.",
  },
  {
    id: "f3",
    name: "Emily Rodriguez",
    title: "Content Strategist",
    location: "Austin, TX",
    hourlyRate: 65,
    rating: 4.9,
    reviews: 76,
    completedJobs: 52,
    skills: ["Content Strategy", "SEO", "Copywriting", "Marketing"],
    matchScore: 89,
    matchReasons: [
      {
        label: "Industry Expert",
        score: 95,
        detail: "Specialized in tech/SaaS content",
      },
      {
        label: "Writing Quality",
        score: 90,
        detail: "Sample work matches your brand voice",
      },
      { label: "SEO Knowledge", score: 88, detail: "Proven SEO results" },
      {
        label: "Collaboration",
        score: 85,
        detail: "Works well with design teams",
      },
    ],
    verified: true,
    topRated: false,
    avatar: null,
    bio: "Helping SaaS companies tell their story and drive organic growth through strategic content.",
  },
];

const defaultPreferences = {
  budgetWeight: 80,
  skillsWeight: 100,
  experienceWeight: 90,
  availabilityWeight: 70,
  locationWeight: 50,
  ratingWeight: 85,
};

const CircularProgress = ({ score, size = 80 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getGradientId = () => {
    if (score >= 90) return "gradient-green";
    if (score >= 80) return "gradient-blue";
    return "gradient-yellow";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient
            id="gradient-green"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient
            id="gradient-blue"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient
            id="gradient-yellow"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${getGradientId()})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-gray-900">{score}%</span>
        <span className="text-[10px] text-gray-500 font-medium">MATCH</span>
      </div>
    </div>
  );
};

const MatchReasonBar = ({ reason }) => {
  const getColors = (score) => {
    if (score >= 90)
      return {
        bar: "from-emerald-400 to-emerald-500",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
      };
    if (score >= 80)
      return {
        bar: "from-blue-400 to-indigo-500",
        bg: "bg-blue-50",
        text: "text-blue-700",
      };
    if (score >= 70)
      return {
        bar: "from-amber-400 to-orange-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
      };
    return {
      bar: "from-gray-300 to-gray-400",
      bg: "bg-gray-50",
      text: "text-gray-600",
    };
  };

  const colors = getColors(reason.score);

  return (
    <div
      className={`${colors.bg} rounded-xl p-3 transition-all duration-200 hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-semibold ${colors.text}`}>
          {reason.label}
        </span>
        <span className={`text-xs font-bold ${colors.text}`}>
          {reason.score}%
        </span>
      </div>
      <div className="h-1.5 bg-white/60 rounded-full overflow-hidden mb-1.5">
        <div
          className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${reason.score}%` }}
        />
      </div>
      <p className="text-[11px] text-gray-500 leading-relaxed">
        {reason.detail}
      </p>
    </div>
  );
};

const AIMatching = () => {
  const [userRole] = useState("freelancer");
  const [matchedJobs] = useState(demoMatchedJobs);
  const [matchedFreelancers] = useState(demoMatchedFreelancers);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [savedItems, setSavedItems] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  const refreshMatches = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    toast.success("✨ Matches refreshed with latest AI analysis!", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const toggleSaveItem = useCallback((id) => {
    setSavedItems((prev) => {
      const isSaved = prev.includes(id);
      toast.success(isSaved ? "Removed from saved" : "💜 Saved for later!", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
      return isSaved ? prev.filter((i) => i !== id) : [...prev, id];
    });
  }, []);

  const provideFeedback = useCallback((id, type) => {
    setFeedback((prev) => ({ ...prev, [id]: type }));
    toast.success(
      type === "positive"
        ? "👍 Great! We'll show more like this"
        : "👎 Got it! Adjusting your recommendations",
      { style: { borderRadius: "12px", background: "#1F2937", color: "#fff" } },
    );
  }, []);

  const getFilteredItems = useMemo(() => {
    const items = userRole === "freelancer" ? matchedJobs : matchedFreelancers;
    let filtered = items;

    if (activeFilter === "top")
      filtered = items.filter((i) => i.matchScore >= 90);
    else if (activeFilter === "saved")
      filtered = items.filter((i) => savedItems.includes(i.id));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        if ("title" in item && typeof item.title === "string") {
          return (
            item.title.toLowerCase().includes(query) ||
            item.skills?.some((s) => s.toLowerCase().includes(query))
          );
        }
        if ("name" in item) {
          return (
            item.name.toLowerCase().includes(query) ||
            item.title?.toLowerCase().includes(query) ||
            item.skills?.some((s) => s.toLowerCase().includes(query))
          );
        }
        return false;
      });
    }

    return filtered;
  }, [
    userRole,
    matchedJobs,
    matchedFreelancers,
    activeFilter,
    savedItems,
    searchQuery,
  ]);

  const stats = useMemo(() => {
    const items = userRole === "freelancer" ? matchedJobs : matchedFreelancers;
    const avgScore = Math.round(
      items.reduce((sum, i) => sum + i.matchScore, 0) / items.length,
    );
    return { count: items.length, avgScore };
  }, [userRole, matchedJobs, matchedFreelancers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  AI Smart Matching
                </h1>
                <p className="text-gray-500 mt-0.5 text-sm sm:text-base">
                  Personalized{" "}
                  {userRole === "freelancer" ? "job" : "freelancer"}{" "}
                  recommendations powered by AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  showPreferences
                    ? "bg-purple-100 text-purple-700 shadow-inner"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600 shadow-sm hover:shadow-md"
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Preferences</span>
              </button>
              <button
                onClick={refreshMatches}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-200 disabled:opacity-60 hover:from-violet-700 hover:to-purple-700 active:scale-[0.98]"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Brain,
                  value: stats.count,
                  label: "New Matches",
                  sublabel: "Today",
                  color: "from-pink-400 to-rose-400",
                },
                {
                  icon: Target,
                  value: `${stats.avgScore}%`,
                  label: "Avg Match Score",
                  sublabel: "All time best",
                  color: "from-amber-400 to-orange-400",
                },
                {
                  icon: TrendingUp,
                  value: "3.2x",
                  label: "Success Rate",
                  sublabel: "vs. manual search",
                  color: "from-emerald-400 to-green-400",
                },
                {
                  icon: Zap,
                  value: "48hr",
                  label: "Avg Time to Hire",
                  sublabel: "Industry leading",
                  color: "from-cyan-400 to-blue-400",
                },
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5 tracking-tight">
                      {stat.value}
                    </div>
                    <p className="text-sm text-white/80 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${userRole === "freelancer" ? "jobs" : "freelancers"} by title, skills...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {[
                {
                  id: "all",
                  label: "All Matches",
                  icon: Sparkles,
                  count:
                    userRole === "freelancer"
                      ? matchedJobs.length
                      : matchedFreelancers.length,
                },
                {
                  id: "top",
                  label: "Top (90%+)",
                  icon: Flame,
                  count: (userRole === "freelancer"
                    ? matchedJobs
                    : matchedFreelancers
                  ).filter((i) => i.matchScore >= 90).length,
                },
                {
                  id: "saved",
                  label: "Saved",
                  icon: Bookmark,
                  count: savedItems.length,
                },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeFilter === filter.id
                      ? "bg-purple-100 text-purple-700 shadow-inner ring-1 ring-purple-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <filter.icon className="w-3.5 h-3.5" />
                  {filter.label}
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${
                      activeFilter === filter.id
                        ? "bg-purple-200 text-purple-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-sm text-gray-500 flex-shrink-0">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {getFilteredItems.length}
              </span>{" "}
              results
            </div>
          </div>

          {/* Preferences Panel */}
          {showPreferences && (
            <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-gray-900">
                    Matching Preferences
                  </h3>
                </div>
                <button
                  onClick={() => setPreferences(defaultPreferences)}
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Reset to defaults
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(preferences).map(([key, value]) => {
                  const icons = {
                    budgetWeight: DollarSign,
                    skillsWeight: Target,
                    experienceWeight: Briefcase,
                    availabilityWeight: Clock,
                    locationWeight: MapPin,
                    ratingWeight: Star,
                  };
                  const Icon = icons[key] || Target;
                  return (
                    <div
                      key={key}
                      className="bg-white rounded-xl border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700 capitalize">
                            {key.replace("Weight", "")}
                          </span>
                        </div>
                        <span
                          className={`text-sm font-bold px-2 py-0.5 rounded-md ${
                            value >= 80
                              ? "bg-green-100 text-green-700"
                              : value >= 50
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {value}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            [key]: parseInt(e.target.value),
                          })
                        }
                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-600 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowPreferences(false);
                    toast.success(
                      "✅ Preferences saved! Matches will update.",
                      {
                        style: {
                          borderRadius: "12px",
                          background: "#1F2937",
                          color: "#fff",
                        },
                      },
                    );
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-purple-200 hover:shadow-xl transition-all"
                >
                  Save & Update Matches
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Matches List */}
        <div className="space-y-4 sm:space-y-5">
          {userRole === "freelancer"
            ? getFilteredItems.map((job, index) => (
                <div
                  key={job.id}
                  className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200 ${
                    job.featured
                      ? "ring-2 ring-purple-300/50 border-purple-200"
                      : "border-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Featured Banner */}
                  {job.featured && (
                    <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-5 py-2 flex items-center gap-2">
                      <Gem className="w-4 h-4 text-white" />
                      <span className="text-xs font-semibold text-white tracking-wide">
                        TOP MATCH — RECOMMENDED FOR YOU
                      </span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 lg:p-7">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-7">
                      {/* Match Score Circle */}
                      <div className="flex-shrink-0 flex lg:flex-col items-center gap-4 lg:gap-3">
                        <CircularProgress score={job.matchScore} size={88} />
                        <div className="flex items-center gap-1 lg:hidden">
                          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                          <span className="text-xs font-semibold text-purple-600">
                            AI Match
                          </span>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-xs text-gray-400 font-medium">
                                {job.postedAt}
                              </span>
                              {job.proposals < 15 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                                  <Zap className="w-3 h-3" />
                                  Early applicant advantage
                                </span>
                              )}
                            </div>
                            <Link
                              to={`/jobs/${job.id}`}
                              className="text-lg sm:text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors leading-tight block"
                            >
                              {job.title}
                            </Link>
                            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                              <Shield className="w-3.5 h-3.5 text-blue-500" />
                              {job.company}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleSaveItem(job.id)}
                            className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${
                              savedItems.includes(job.id)
                                ? "bg-purple-100 text-purple-600 shadow-inner"
                                : "hover:bg-gray-100 text-gray-300 hover:text-gray-500"
                            }`}
                          >
                            <Bookmark
                              className={`w-5 h-5 ${savedItems.includes(job.id) ? "fill-current" : ""}`}
                            />
                          </button>
                        </div>

                        {/* Description Preview */}
                        {job.description && (
                          <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
                            {job.description}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {[
                            {
                              icon: MapPin,
                              text: job.location,
                              color: "text-blue-600 bg-blue-50",
                            },
                            {
                              icon: DollarSign,
                              text: `$${job.budget.min.toLocaleString()} - $${job.budget.max.toLocaleString()}`,
                              color: "text-emerald-600 bg-emerald-50",
                            },
                            {
                              icon: Clock,
                              text: job.duration,
                              color: "text-amber-600 bg-amber-50",
                            },
                            {
                              icon: Users,
                              text: `${job.proposals} proposals`,
                              color: "text-violet-600 bg-violet-50",
                            },
                          ].map((meta, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${meta.color}`}
                            >
                              <meta.icon className="w-3.5 h-3.5" />
                              {meta.text}
                            </span>
                          ))}
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Match Reasons - Expandable */}
                        <button
                          onClick={() =>
                            setExpandedCard(
                              expandedCard === job.id ? null : job.id,
                            )
                          }
                          className="flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700 mb-4 group/btn"
                        >
                          <Brain className="w-4 h-4" />
                          Why this matches you
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${expandedCard === job.id ? "rotate-180" : ""}`}
                          />
                        </button>

                        {expandedCard === job.id && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 animate-in slide-in-from-top-2 duration-200">
                            {job.matchReasons.map((reason, idx) => (
                              <MatchReasonBar key={idx} reason={reason} />
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-4">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1.5 text-gray-600">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="font-semibold">
                                {job.clientRating}
                              </span>
                              <span className="text-gray-400">
                                client rating
                              </span>
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">
                              <span className="font-semibold text-gray-700">
                                {job.clientHireRate}%
                              </span>{" "}
                              hire rate
                            </span>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <div className="flex items-center gap-1 border-r border-gray-200 pr-3">
                              <button
                                onClick={() =>
                                  provideFeedback(job.id, "positive")
                                }
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  feedback[job.id] === "positive"
                                    ? "bg-green-100 text-green-600 scale-110"
                                    : "hover:bg-gray-100 text-gray-400"
                                }`}
                                title="More like this"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  provideFeedback(job.id, "negative")
                                }
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  feedback[job.id] === "negative"
                                    ? "bg-red-100 text-red-600 scale-110"
                                    : "hover:bg-gray-100 text-gray-400"
                                }`}
                                title="Less like this"
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>

                            <Link
                              to={`/jobs/${job.id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">Details</span>
                            </Link>
                            <Link
                              to={`/dashboard/submit-proposal/${job.id}`}
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all text-sm font-semibold shadow-md shadow-purple-200 hover:shadow-lg active:scale-[0.98] flex-1 sm:flex-initial justify-center"
                            >
                              Apply Now
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : getFilteredItems.map((freelancer, index) => (
                <div
                  key={freelancer.id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-5 sm:p-6 lg:p-7">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-7">
                      {/* Match Score */}
                      <div className="flex-shrink-0 flex lg:flex-col items-center gap-4 lg:gap-3">
                        <CircularProgress
                          score={freelancer.matchScore}
                          size={88}
                        />
                      </div>

                      {/* Freelancer Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-200">
                                {freelancer.name.charAt(0)}
                              </div>
                              {freelancer.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Link
                                  to={`/freelancers/${freelancer.id}`}
                                  className="text-lg sm:text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
                                >
                                  {freelancer.name}
                                </Link>
                                {freelancer.topRated && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                                    <Award className="w-3 h-3" />
                                    Top Rated
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-500 text-sm mt-0.5">
                                {freelancer.title}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleSaveItem(freelancer.id)}
                            className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${
                              savedItems.includes(freelancer.id)
                                ? "bg-purple-100 text-purple-600 shadow-inner"
                                : "hover:bg-gray-100 text-gray-300 hover:text-gray-500"
                            }`}
                          >
                            <Bookmark
                              className={`w-5 h-5 ${savedItems.includes(freelancer.id) ? "fill-current" : ""}`}
                            />
                          </button>
                        </div>

                        {/* Bio */}
                        {freelancer.bio && (
                          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                            {freelancer.bio}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {[
                            {
                              icon: MapPin,
                              text: freelancer.location,
                              color: "text-blue-600 bg-blue-50",
                            },
                            {
                              icon: DollarSign,
                              text: `$${freelancer.hourlyRate}/hr`,
                              color: "text-emerald-600 bg-emerald-50",
                            },
                            {
                              icon: Star,
                              text: `${freelancer.rating} (${freelancer.reviews})`,
                              color: "text-amber-600 bg-amber-50",
                              starFill: true,
                            },
                            {
                              icon: Briefcase,
                              text: `${freelancer.completedJobs} jobs`,
                              color: "text-violet-600 bg-violet-50",
                            },
                          ].map((meta, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${meta.color}`}
                            >
                              <meta.icon
                                className={`w-3.5 h-3.5 ${meta.starFill ? "fill-current" : ""}`}
                              />
                              {meta.text}
                            </span>
                          ))}
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {freelancer.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Match Reasons */}
                        <button
                          onClick={() =>
                            setExpandedCard(
                              expandedCard === freelancer.id
                                ? null
                                : freelancer.id,
                            )
                          }
                          className="flex items-center gap-2 text-sm text-purple-600 font-medium hover:text-purple-700 mb-4"
                        >
                          <Brain className="w-4 h-4" />
                          Why this matches your project
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${expandedCard === freelancer.id ? "rotate-180" : ""}`}
                          />
                        </button>

                        {expandedCard === freelancer.id && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                            {freelancer.matchReasons.map((reason, idx) => (
                              <MatchReasonBar key={idx} reason={reason} />
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() =>
                                provideFeedback(freelancer.id, "positive")
                              }
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                feedback[freelancer.id] === "positive"
                                  ? "bg-green-100 text-green-600 scale-110"
                                  : "hover:bg-gray-100 text-gray-400"
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                provideFeedback(freelancer.id, "negative")
                              }
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                feedback[freelancer.id] === "negative"
                                  ? "bg-red-100 text-red-600 scale-110"
                                  : "hover:bg-gray-100 text-gray-400"
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                            <Link
                              to={`/freelancers/${freelancer.id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm font-medium"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">Profile</span>
                            </Link>
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-gray-700">
                              <MessageSquare className="w-4 h-4" />
                              <span className="hidden sm:inline">Message</span>
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all text-sm font-semibold shadow-md shadow-purple-200 hover:shadow-lg active:scale-[0.98] flex-1 sm:flex-initial justify-center">
                              Invite to Job
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

          {/* Empty State */}
          {getFilteredItems.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 sm:p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No matches found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
                {activeFilter === "saved"
                  ? "You haven't saved any matches yet. Browse all matches and save the ones you like!"
                  : searchQuery
                    ? `No results for "${searchQuery}". Try different keywords.`
                    : "Try adjusting your preferences or check back later for new matches."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    View all matches
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div className="mt-8 sm:mt-10">
          <div className="relative overflow-hidden bg-white rounded-2xl border border-purple-100 shadow-sm">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-full" />
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-200">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      AI Insights & Tips
                    </h3>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      Personalized
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-5">
                    Actionable suggestions to boost your match scores and land
                    more projects.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        icon: Target,
                        title: "Add Portfolio Items",
                        desc: "Increase match scores by up to 15% with more project samples",
                        color: "from-emerald-400 to-green-500",
                        bg: "bg-emerald-50",
                        progress: 65,
                      },
                      {
                        icon: Shield,
                        title: "Verify Skills",
                        desc: "Complete skill verification to unlock premium job matches",
                        color: "from-blue-400 to-indigo-500",
                        bg: "bg-blue-50",
                        progress: 40,
                      },
                      {
                        icon: Zap,
                        title: "Response Rate",
                        desc: "Your response rate is excellent — this boosts your visibility",
                        color: "from-amber-400 to-orange-500",
                        bg: "bg-amber-50",
                        progress: 95,
                      },
                    ].map((tip, idx) => (
                      <div
                        key={idx}
                        className={`${tip.bg} rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-default`}
                      >
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}
                        >
                          <tip.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {tip.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                          {tip.desc}
                        </p>
                        <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${tip.color} rounded-full transition-all duration-700`}
                            style={{ width: `${tip.progress}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
                          {tip.progress}% complete
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMatching;
