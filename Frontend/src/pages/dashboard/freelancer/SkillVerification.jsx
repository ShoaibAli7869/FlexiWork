import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  Star,
  Trophy,
  Zap,
  Shield,
  Target,
  BookOpen,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Medal,
  Timer,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  X,
  Check,
  Sparkles,
  ArrowLeft,
  BarChart3,
  BadgeCheck,
  Users,
  Crown,
  Lightbulb,
  GitBranch,
} from "lucide-react";
import toast from "react-hot-toast";

// Demo verified skills
const demoVerifiedSkills = [
  {
    id: "vs1",
    name: "React",
    level: "Expert",
    score: 92,
    verifiedAt: "2024-02-15",
    expiresAt: "2025-02-15",
    badge: "gold",
    questionsAnswered: 40,
    timeSpent: "45 min",
    percentile: 95,
    completedAssessments: 1,
    nextLevel: 95,
  },
  {
    id: "vs2",
    name: "JavaScript",
    level: "Expert",
    score: 88,
    verifiedAt: "2024-01-20",
    expiresAt: "2025-01-20",
    badge: "gold",
    questionsAnswered: 50,
    timeSpent: "52 min",
    percentile: 90,
    completedAssessments: 1,
    nextLevel: 90,
  },
  {
    id: "vs3",
    name: "TypeScript",
    level: "Advanced",
    score: 78,
    verifiedAt: "2024-03-01",
    expiresAt: "2025-03-01",
    badge: "silver",
    questionsAnswered: 35,
    timeSpent: "38 min",
    percentile: 82,
    completedAssessments: 1,
    nextLevel: 85,
  },
];

// Demo available assessments
const demoAssessments = [
  {
    id: "a1",
    name: "Node.js",
    category: "Backend Development",
    duration: "45 min",
    questions: 40,
    difficulty: "Intermediate to Advanced",
    description:
      "Test your knowledge of Node.js fundamentals, async programming, Express.js, and best practices.",
    topics: [
      "Core Modules",
      "Async/Await",
      "Express.js",
      "Error Handling",
      "Security",
    ],
    popularity: 15420,
    avgScore: 72,
    locked: false,
    badge: "silver",
    points: 250,
  },
  {
    id: "a2",
    name: "Next.js",
    category: "Frontend Frameworks",
    duration: "40 min",
    questions: 35,
    difficulty: "Advanced",
    description:
      "Demonstrate expertise in Next.js including SSR, SSG, API routes, and performance optimization.",
    topics: [
      "App Router",
      "Data Fetching",
      "API Routes",
      "Middleware",
      "Deployment",
    ],
    popularity: 8930,
    avgScore: 68,
    locked: false,
    badge: "gold",
    points: 300,
  },
  {
    id: "a3",
    name: "PostgreSQL",
    category: "Databases",
    duration: "50 min",
    questions: 45,
    difficulty: "Intermediate",
    description:
      "Validate your SQL skills including complex queries, indexing, and database design.",
    topics: ["SQL Queries", "Joins", "Indexing", "Transactions", "Performance"],
    popularity: 12350,
    avgScore: 70,
    locked: false,
    badge: "silver",
    points: 200,
  },
  {
    id: "a4",
    name: "AWS Solutions Architect",
    category: "Cloud Computing",
    duration: "60 min",
    questions: 50,
    difficulty: "Advanced",
    description:
      "Prove your AWS architecture skills across core services and best practices.",
    topics: ["EC2", "S3", "Lambda", "VPC", "IAM"],
    popularity: 22100,
    avgScore: 65,
    locked: true,
    unlockRequirement: "Complete 2 more assessments",
    badge: "platinum",
    points: 500,
  },
  {
    id: "a5",
    name: "System Design",
    category: "Architecture",
    duration: "90 min",
    questions: 25,
    difficulty: "Expert",
    description:
      "Advanced assessment covering scalable system design, microservices, and distributed systems.",
    topics: [
      "Scalability",
      "Microservices",
      "Caching",
      "Load Balancing",
      "Database Sharding",
    ],
    popularity: 18500,
    avgScore: 58,
    locked: true,
    unlockRequirement: "Achieve Expert level in 3 skills",
    badge: "diamond",
    points: 750,
  },
  {
    id: "a6",
    name: "Tailwind CSS",
    category: "Frontend Development",
    duration: "30 min",
    questions: 30,
    difficulty: "Beginner to Intermediate",
    description:
      "Test your proficiency with Tailwind CSS utility classes and responsive design.",
    topics: ["Utility Classes", "Responsive", "Customization", "Plugins"],
    popularity: 9850,
    avgScore: 75,
    locked: false,
    badge: "bronze",
    points: 150,
  },
];

// Badge configurations
const badgeConfig = {
  gold: {
    color: "from-yellow-400 to-yellow-600",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Gold",
    minScore: 85,
    icon: Trophy,
    glow: "shadow-lg shadow-yellow-500/30",
  },
  silver: {
    color: "from-gray-300 to-gray-500",
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Silver",
    minScore: 70,
    icon: Trophy,
    glow: "shadow-lg shadow-gray-500/30",
  },
  bronze: {
    color: "from-orange-400 to-orange-600",
    bg: "bg-orange-100",
    text: "text-orange-700",
    label: "Bronze",
    minScore: 50,
    icon: Trophy,
    glow: "shadow-lg shadow-orange-500/30",
  },
  platinum: {
    color: "from-slate-300 to-slate-500",
    bg: "bg-slate-100",
    text: "text-slate-700",
    label: "Platinum",
    minScore: 90,
    icon: Trophy,
    glow: "shadow-lg shadow-slate-500/30",
  },
  diamond: {
    color: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    label: "Diamond",
    minScore: 95,
    icon: Trophy,
    glow: "shadow-lg shadow-cyan-500/30",
  },
};

const SkillCard = ({ skill, onRetake }) => {
  const badgeInfo = badgeConfig[skill.badge];
  const isExpiringSoon =
    new Date(skill.expiresAt) - new Date() <= 30 * 24 * 60 * 60 * 1000;
  const IconComponent = badgeInfo.icon;

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 overflow-hidden">
      <div className="flex items-start gap-4">
        {/* Badge */}
        <div className="flex-shrink-0 relative">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${badgeInfo.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 ${badgeInfo.glow}`}
          >
            <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          {isExpiringSoon && (
            <AlertTriangle className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-red-500 bg-white rounded-full p-0.5 shadow-sm" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {skill.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs sm:text-sm font-semibold rounded-md ring-1 ring-inset ${badgeInfo.bg} ${badgeInfo.text}`}
                >
                  {badgeInfo.label}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Top {100 - skill.percentile}%
                </span>
                {isExpiringSoon && (
                  <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Expiring Soon
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => onRetake(skill.id)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Retake assessment"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Progress & Stats */}
          <div className="space-y-3">
            {/* Score Progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500">Your Score</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {skill.score}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${badgeInfo.color} transition-all duration-700`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" />
                <span>{skill.timeSpent}</span>
              </div>
              <div className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{skill.questionsAnswered} questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Expires {new Date(skill.expiresAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                <span>Next: {skill.nextLevel}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssessmentCard = ({ assessment, onStart }) => {
  const badgeInfo = badgeConfig[assessment.badge] || badgeConfig.bronze;
  const IconComponent = badgeInfo.icon;

  return (
    <div
      className={`group relative bg-white rounded-xl sm:rounded-2xl border ${
        assessment.locked
          ? "border-slate-100 opacity-75"
          : "border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50"
      } transition-all duration-300 overflow-hidden`}
    >
      {assessment.locked && (
        <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-500">Locked</p>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {assessment.name}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-md ring-1 ring-inset ${badgeInfo.bg} ${badgeInfo.text}`}
              >
                {badgeInfo.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {assessment.category}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Medal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">
              {assessment.points}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2">
          {assessment.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-4">
          {assessment.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-medium rounded-md"
            >
              <GitBranch className="w-2.5 h-2.5" />
              {topic}
            </span>
          ))}
          {assessment.topics.length > 3 && (
            <span className="text-[10px] text-slate-400 px-1 py-0.5">
              +{assessment.topics.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{assessment.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{assessment.questions} questions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Avg: {assessment.avgScore}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{assessment.popularity.toLocaleString()} takers</span>
          </div>
        </div>

        {/* Action Button */}
        {assessment.locked ? (
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-xs text-slate-600 flex-1">
              {assessment.unlockRequirement}
            </span>
          </div>
        ) : (
          <button
            onClick={() => onStart(assessment)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <Play className="w-4 h-4" />
            Start Assessment
          </button>
        )}
      </div>
    </div>
  );
};

const StartModal = ({ isOpen, assessment, onClose, onStart }) => {
  if (!isOpen || !assessment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-2 duration-300">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Start Assessment
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {assessment.name}
            </h3>
            <p className="text-sm text-slate-500">{assessment.category}</p>
          </div>

          {/* Assessment Details */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Duration</span>
              <span className="font-semibold text-slate-900">
                {assessment.duration}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Questions</span>
              <span className="font-semibold text-slate-900">
                {assessment.questions}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Difficulty</span>
              <span className="font-semibold text-slate-900">
                {assessment.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Passing Score</span>
              <span className="font-semibold text-slate-900">50%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Points Available</span>
              <span className="font-semibold text-emerald-600">
                {assessment.points}
              </span>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900">Before you start:</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Find a quiet place with stable internet connection
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                You cannot pause or exit once started (timer continues)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Results are available immediately after completion
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                You can retake after 7 days if needed for improvement
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 sm:py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={onStart}
              className="flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/25 transition-all active:scale-[0.98]"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillVerification = () => {
  const [verifiedSkills] = useState(demoVerifiedSkills);
  const [assessments] = useState(demoAssessments);
  const [activeTab, setActiveTab] = useState("verified");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showStartModal, setShowStartModal] = useState(false);

  // Calculate stats
  const totalVerified = verifiedSkills.length;
  const avgScore = Math.round(
    verifiedSkills.reduce((sum, s) => sum + s.score, 0) / (totalVerified || 1),
  );
  const expertBadges = verifiedSkills.filter((s) => s.badge === "gold").length;
  const totalPoints = verifiedSkills.reduce((sum, s) => sum + 100, 0); // Base 100 points per skill

  // Get badge for score
  const getBadgeForScore = (score) => {
    if (score >= 95) return "diamond";
    if (score >= 90) return "platinum";
    if (score >= 85) return "gold";
    if (score >= 70) return "silver";
    return "bronze";
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if expiring soon (within 30 days)
  const isExpiringSoon = (expiresAt) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  // Start assessment
  const handleStartAssessment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowStartModal(false);
    toast.success("Assessment started! Good luck!", {
      icon: "🎯",
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
        fontSize: "14px",
      },
    });
  };

  // Retake assessment
  const handleRetake = (skillId) => {
    toast.success(
      "Retake scheduled! You can retake this assessment in 7 days.",
      {
        icon: "🔄",
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Skill Verification
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-slate-500">
                  Verify your skills to stand out and unlock premium
                  opportunities
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("available")}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            Take New Assessment
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {totalVerified}
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Verified Skills
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {avgScore}%
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Average Score
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  {expertBadges}
                </p>
                <p className="text-xs sm:text-sm text-slate-500">Gold Badges</p>
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">
                  +35%
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Profile Visibility
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => setActiveTab("verified")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors relative ${
                activeTab === "verified"
                  ? "text-green-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2
                  className={`w-5 h-5 ${activeTab === "verified" ? "text-green-600" : "text-slate-400"}`}
                />
                <span>Verified Skills</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-slate-100 text-slate-600 rounded-full">
                  {verifiedSkills.length}
                </span>
              </div>
              {activeTab === "verified" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors relative ${
                activeTab === "available"
                  ? "text-green-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen
                  className={`w-5 h-5 ${activeTab === "available" ? "text-green-600" : "text-slate-400"}`}
                />
                <span>Available Assessments</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-slate-100 text-slate-600 rounded-full">
                  {assessments.length}
                </span>
              </div>
              {activeTab === "available" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600" />
              )}
            </button>
          </div>

          {/* Verified Skills Tab */}
          {activeTab === "verified" && (
            <div className="p-4 sm:p-5 lg:p-6">
              {verifiedSkills.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    No verified skills yet
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Take assessments to verify your skills and earn prestigious
                    badges
                  </p>
                  <button
                    onClick={() => setActiveTab("available")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/25 transition-all active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Browse Assessments
                  </button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {verifiedSkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      onRetake={handleRetake}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Available Assessments Tab */}
          {activeTab === "available" && (
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {assessments.map((assessment) => (
                  <AssessmentCard
                    key={assessment.id}
                    assessment={assessment}
                    onStart={(ass) => {
                      setSelectedAssessment(ass);
                      setShowStartModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-4 sm:p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <Zap className="w-5 h-5 text-green-600" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Benefits of Skill Verification
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  Higher Visibility
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Verified profiles appear 3x more in search results and client
                  recommendations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  Earn Prestigious Badges
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Display achievement badges on your profile to build trust and
                  credibility
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  Premium Opportunities
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Access exclusive high-paying jobs reserved for verified top
                  performers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        {verifiedSkills.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 lg:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Achievement Unlocked!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    With {verifiedSkills.length} verified skills, you're among
                    the top 15% of professionals on our platform.
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10 flex-shrink-0">
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Start Modal */}
      <StartModal
        isOpen={showStartModal}
        assessment={selectedAssessment}
        onClose={() => setShowStartModal(false)}
        onStart={handleStartAssessment}
      />
    </div>
  );
};

export default SkillVerification;
