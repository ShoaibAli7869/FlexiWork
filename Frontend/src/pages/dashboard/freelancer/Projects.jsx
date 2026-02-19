import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Clock,
  DollarSign,
  CheckCircle2,
  MessageSquare,
  FileText,
  Calendar,
  MoreVertical,
  ArrowRight,
  Briefcase,
  TrendingUp,
  AlertCircle,
  Eye,
  Send,
  Download,
  Star,
  MapPin,
  Users,
  Activity,
  Target,
  CircleDot,
  Sparkles,
  ChevronRight,
  FolderOpen,
  Pause,
  Play,
  XCircle,
  Package,
  BarChart3,
  Zap,
  Award,
  Layers,
  Grid3X3,
  List,
} from "lucide-react";
import { Button, Badge, Card, Avatar } from "../../../components/common";

const projects = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    description:
      "Complete redesign of an e-commerce platform with modern UI/UX",
    client: {
      name: "TechCorp Inc.",
      avatar: null,
      rating: 4.8,
    },
    status: "in_progress",
    priority: "high",
    progress: 75,
    budget: "$5,000",
    earned: "$3,750",
    startDate: "Feb 1, 2024",
    deadline: "Mar 15, 2024",
    daysLeft: 8,
    milestones: {
      total: 4,
      completed: 3,
    },
    tasks: {
      total: 12,
      completed: 9,
    },
    lastActivity: "2 hours ago",
    tags: ["UI/UX", "React", "Tailwind"],
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Cross-platform mobile application for fitness tracking",
    client: {
      name: "StartupXYZ",
      avatar: null,
      rating: 5.0,
    },
    status: "in_progress",
    priority: "medium",
    progress: 45,
    budget: "$12,000",
    earned: "$5,400",
    startDate: "Jan 15, 2024",
    deadline: "Apr 30, 2024",
    daysLeft: 53,
    milestones: {
      total: 5,
      completed: 2,
    },
    tasks: {
      total: 24,
      completed: 11,
    },
    lastActivity: "1 day ago",
    tags: ["React Native", "Firebase", "Mobile"],
  },
  {
    id: 3,
    title: "Brand Identity Design",
    description:
      "Complete brand identity package including logo and guidelines",
    client: {
      name: "Creative Studio",
      avatar: null,
      rating: 4.9,
    },
    status: "review",
    priority: "urgent",
    progress: 100,
    budget: "$2,500",
    earned: "$2,500",
    startDate: "Feb 10, 2024",
    deadline: "Feb 28, 2024",
    daysLeft: 1,
    milestones: {
      total: 3,
      completed: 3,
    },
    tasks: {
      total: 8,
      completed: 8,
    },
    lastActivity: "5 hours ago",
    tags: ["Branding", "Design", "Illustrator"],
  },
  {
    id: 4,
    title: "SEO Optimization Project",
    description:
      "Complete SEO audit and optimization for better search rankings",
    client: {
      name: "Marketing Pro",
      avatar: null,
      rating: 4.7,
    },
    status: "completed",
    priority: "low",
    progress: 100,
    budget: "$1,500",
    earned: "$1,500",
    startDate: "Jan 1, 2024",
    deadline: "Jan 31, 2024",
    daysLeft: 0,
    milestones: {
      total: 2,
      completed: 2,
    },
    tasks: {
      total: 6,
      completed: 6,
    },
    lastActivity: "2 weeks ago",
    tags: ["SEO", "Analytics", "Marketing"],
  },
  {
    id: 5,
    title: "Dashboard UI Kit Development",
    description: "Comprehensive UI kit for SaaS dashboards",
    client: {
      name: "DesignHub",
      avatar: null,
      rating: 4.6,
    },
    status: "paused",
    priority: "low",
    progress: 30,
    budget: "$3,200",
    earned: "$960",
    startDate: "Feb 5, 2024",
    deadline: "Mar 30, 2024",
    daysLeft: 23,
    milestones: {
      total: 5,
      completed: 1,
    },
    tasks: {
      total: 15,
      completed: 5,
    },
    lastActivity: "1 week ago",
    tags: ["UI Kit", "Figma", "Components"],
  },
];

const STATUS_CONFIG = {
  in_progress: {
    label: "In Progress",
    variant: "primary",
    color: "text-blue-600",
    bg: "bg-blue-50",
    ring: "ring-blue-500/20",
    icon: Play,
    gradient: "from-blue-500 to-blue-600",
  },
  review: {
    label: "In Review",
    variant: "warning",
    color: "text-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-500/20",
    icon: Eye,
    gradient: "from-amber-500 to-orange-500",
  },
  completed: {
    label: "Completed",
    variant: "success",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-500/20",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-emerald-600",
  },
  paused: {
    label: "Paused",
    variant: "default",
    color: "text-slate-600",
    bg: "bg-slate-50",
    ring: "ring-slate-500/20",
    icon: Pause,
    gradient: "from-slate-500 to-slate-600",
  },
};

const PRIORITY_CONFIG = {
  urgent: {
    color: "bg-red-100 text-red-700 ring-red-500/20",
    dot: "bg-red-500",
  },
  high: {
    color: "bg-orange-100 text-orange-700 ring-orange-500/20",
    dot: "bg-orange-500",
  },
  medium: {
    color: "bg-blue-100 text-blue-700 ring-blue-500/20",
    dot: "bg-blue-500",
  },
  low: {
    color: "bg-slate-100 text-slate-600 ring-slate-500/20",
    dot: "bg-slate-400",
  },
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  subValue,
  gradient,
  className = "",
}) => (
  <div
    className={`bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-md hover:border-slate-200 transition-all duration-300 ${className}`}
  >
    <div className="flex items-center gap-3 sm:gap-4">
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-0.5">
          {label}
        </p>
        <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-slate-400 mt-0.5">{subValue}</p>
        )}
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, viewMode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const statusInfo = STATUS_CONFIG[project.status];
  const priorityInfo = PRIORITY_CONFIG[project.priority];
  const StatusIcon = statusInfo.icon;

  const progressColor =
    project.progress >= 80
      ? "from-emerald-400 to-emerald-500"
      : project.progress >= 50
        ? "from-blue-400 to-blue-500"
        : project.progress >= 25
          ? "from-amber-400 to-amber-500"
          : "from-red-400 to-red-500";

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden">
        <div className="p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg ring-1 ring-inset ${statusInfo.bg} ${statusInfo.color} ${statusInfo.ring}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-md ring-1 ring-inset ${priorityInfo.color}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${priorityInfo.dot}`}
                      />
                      {project.priority}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-1">
                    {project.description}
                  </p>
                </div>
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  </button>
                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-1 w-40 sm:w-44 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 py-1.5 z-20">
                        <Link
                          to={`/dashboard/projects/${project.id}`}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                          <Download className="w-4 h-4" />
                          Download Files
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <XCircle className="w-4 h-4" />
                          End Project
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Client */}
              <div className="flex items-center gap-2.5 mb-4">
                <Avatar name={project.client.name} size="sm" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-700 truncate">
                    {project.client.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-slate-500">
                      {project.client.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                  <span className="text-slate-600 font-medium">Progress</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400 mb-0.5">
                    Budget
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {project.budget}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400 mb-0.5">
                    Earned
                  </p>
                  <p className="text-sm sm:text-base font-bold text-emerald-600">
                    {project.earned}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400 mb-0.5">
                    Milestones
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {project.milestones.completed}/{project.milestones.total}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400 mb-0.5">
                    Days Left
                  </p>
                  <p
                    className={`text-sm sm:text-base font-bold ${project.daysLeft <= 7 ? "text-red-600" : "text-slate-900"}`}
                  >
                    {project.daysLeft}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-medium rounded-md ring-1 ring-inset ring-slate-200/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions - Desktop */}
            <div className="hidden lg:flex flex-col gap-2 w-40 flex-shrink-0">
              <Link to={`/dashboard/projects/${project.id}`} className="w-full">
                <Button className="w-full" size="sm">
                  <Eye className="w-4 h-4 mr-1.5" />
                  View Project
                </Button>
              </Link>
              <Link to="/dashboard/messages" className="w-full">
                <Button variant="secondary" className="w-full" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Message
                </Button>
              </Link>
              {project.status !== "completed" && (
                <Button variant="ghost" className="w-full" size="sm">
                  <Send className="w-4 h-4 mr-1.5" />
                  Submit Work
                </Button>
              )}
            </div>
          </div>

          {/* Actions - Mobile */}
          <div className="flex lg:hidden gap-2 mt-4 pt-4 border-t border-slate-100">
            <Link to={`/dashboard/projects/${project.id}`} className="flex-1">
              <Button className="w-full" size="sm">
                View
              </Button>
            </Link>
            <Link to="/dashboard/messages" className="flex-1">
              <Button variant="secondary" className="w-full" size="sm">
                Message
              </Button>
            </Link>
            {project.status !== "completed" && (
              <Button variant="ghost" className="flex-1" size="sm">
                Submit
              </Button>
            )}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Started {project.startDate}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              {project.lastActivity}
            </span>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="group hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col">
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-lg ring-1 ring-inset ${statusInfo.bg} ${statusInfo.color} ${statusInfo.ring}`}
            >
              <StatusIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {statusInfo.label}
            </span>
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold rounded-md ring-1 ring-inset ${priorityInfo.color}`}
            >
              <span className={`w-1 h-1 rounded-full ${priorityInfo.dot}`} />
              {project.priority}
            </span>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors relative"
          >
            <MoreVertical className="w-4 h-4 text-slate-400" />
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 py-1.5 z-20">
                  <Link
                    to={`/dashboard/projects/${project.id}`}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <XCircle className="w-3.5 h-3.5" />
                    End
                  </button>
                </div>
              </>
            )}
          </button>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Client */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar name={project.client.name} size="xs" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-600 truncate">
              {project.client.name}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500">Progress</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {project.progress}%
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div>
            <p className="text-slate-400 mb-0.5">Earned</p>
            <p className="font-bold text-emerald-600">{project.earned}</p>
          </div>
          <div>
            <p className="text-slate-400 mb-0.5">Days Left</p>
            <p
              className={`font-bold ${project.daysLeft <= 7 ? "text-red-600" : "text-slate-900"}`}
            >
              {project.daysLeft}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 mt-auto">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="text-[10px] text-slate-400 px-1 py-0.5">
              +{project.tags.length - 2}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <Link to={`/dashboard/projects/${project.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              View
            </Button>
          </Link>
          <Link to="/dashboard/messages" className="flex-1">
            <Button variant="secondary" className="w-full" size="sm">
              <MessageSquare className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "all" || project.status === filter;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const stats = useMemo(() => {
    const activeProjects = projects.filter(
      (p) => p.status === "in_progress",
    ).length;
    const totalEarned = projects.reduce((sum, p) => {
      const amount = parseFloat(p.earned.replace(/[$,]/g, ""));
      return sum + amount;
    }, 0);
    const completionRate = Math.round(
      (projects.filter((p) => p.status === "completed").length /
        projects.length) *
        100,
    );
    const avgProgress = Math.round(
      projects.reduce((sum, p) => sum + p.progress, 0) / projects.length,
    );

    return { activeProjects, totalEarned, completionRate, avgProgress };
  }, []);

  const filterOptions = [
    { key: "all", label: "All Projects", count: projects.length },
    {
      key: "in_progress",
      label: "In Progress",
      count: projects.filter((p) => p.status === "in_progress").length,
    },
    {
      key: "review",
      label: "In Review",
      count: projects.filter((p) => p.status === "review").length,
    },
    {
      key: "completed",
      label: "Completed",
      count: projects.filter((p) => p.status === "completed").length,
    },
    {
      key: "paused",
      label: "Paused",
      count: projects.filter((p) => p.status === "paused").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Projects
              </h1>
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500">
              Manage and track your ongoing projects
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center bg-white rounded-xl border border-slate-200 p-1 gap-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Link to="/jobs">
              <Button size="sm" className="whitespace-nowrap">
                <Zap className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Browse Jobs</span>
                <span className="sm:hidden">Jobs</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <StatCard
            icon={Activity}
            label="Active Projects"
            value={stats.activeProjects}
            gradient="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={DollarSign}
            label="Total Earned"
            value={`$${stats.totalEarned.toLocaleString()}`}
            gradient="from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={Target}
            label="Completion Rate"
            value={`${stats.completionRate}%`}
            gradient="from-violet-500 to-purple-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Progress"
            value={`${stats.avgProgress}%`}
            gradient="from-amber-500 to-orange-500"
          />
        </div>

        {/* Filters */}
        <Card className="p-3.5 sm:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>

            {/* Filter Buttons - Desktop */}
            <div className="hidden sm:flex gap-2 flex-shrink-0">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    filter === option.key
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {option.label}
                  <span
                    className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] sm:text-xs font-bold rounded-full ${
                      filter === option.key
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-500"
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Buttons - Mobile */}
          <div className="flex sm:hidden gap-1.5 mt-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  filter === option.key
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                    : "bg-slate-50 text-slate-600 border border-slate-200"
                }`}
              >
                {option.label}
                <span
                  className={`inline-flex items-center justify-center min-w-[1rem] h-4 px-1 text-[10px] font-bold rounded-full ${
                    filter === option.key
                      ? "bg-white/20 text-white"
                      : "bg-slate-200/80 text-slate-500"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                : "space-y-4 sm:space-y-5"
            }
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-5">
                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {searchQuery ? "No projects found" : "No projects yet"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "Start applying to jobs to get your first project and begin earning!"}
              </p>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Clear Search
                </button>
              ) : (
                <Link to="/jobs">
                  <Button>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Browse Available Jobs
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        )}

        {/* Performance Insight Banner */}
        {filteredProjects.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 lg:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Great Progress!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    You're averaging {stats.avgProgress}% completion across all
                    projects. Keep up the excellent work!
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10 flex-shrink-0">
                <BarChart3 className="w-4 h-4" />
                View Analytics
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
