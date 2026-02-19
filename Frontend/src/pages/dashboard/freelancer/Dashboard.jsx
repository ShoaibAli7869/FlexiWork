import { useState, useMemo, useCallback } from "react";
import { Card, Badge, Avatar } from "../../../components/common";
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  FolderOpen,
  ChevronRight,
  Bell,
  Search,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  Zap,
  Eye,
  Star,
  Filter,
} from "lucide-react";

const STATS_DATA = [
  {
    label: "Total Earnings",
    value: "$12,450",
    change: "+12%",
    positive: true,
    icon: DollarSign,
    gradient: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-700",
    ringColor: "ring-emerald-500/20",
  },
  {
    label: "Active Projects",
    value: "4",
    change: "+2",
    positive: true,
    icon: Briefcase,
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-700",
    ringColor: "ring-blue-500/20",
  },
  {
    label: "Proposals Sent",
    value: "23",
    change: "+5",
    positive: true,
    icon: TrendingUp,
    gradient: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-700",
    ringColor: "ring-violet-500/20",
  },
  {
    label: "Avg Response",
    value: "2h",
    change: "-30min",
    positive: true,
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
    textColor: "text-amber-700",
    ringColor: "ring-amber-500/20",
  },
];

const PROJECTS_DATA = [
  {
    title: "E-commerce Website Redesign",
    client: "TechCorp Inc.",
    progress: 75,
    dueIn: "5 days",
    status: "In Progress",
    priority: "high",
    budget: "$3,200",
  },
  {
    title: "Mobile App Development",
    client: "StartupXYZ",
    progress: 45,
    dueIn: "12 days",
    status: "In Progress",
    priority: "medium",
    budget: "$5,800",
  },
  {
    title: "Brand Identity Design",
    client: "Creative Studio",
    progress: 90,
    dueIn: "2 days",
    status: "Review",
    priority: "urgent",
    budget: "$1,500",
  },
  {
    title: "Dashboard UI Kit",
    client: "DesignHub",
    progress: 20,
    dueIn: "18 days",
    status: "Started",
    priority: "low",
    budget: "$2,100",
  },
];

const MESSAGES_DATA = [
  {
    name: "John Smith",
    message:
      "Hey, I reviewed the designs and they look fantastic! Just a few minor tweaks needed.",
    time: "5 min ago",
    unread: true,
    online: true,
  },
  {
    name: "Sarah Wilson",
    message: "The project is looking great! Can we discuss the next milestone?",
    time: "1 hour ago",
    unread: true,
    online: true,
  },
  {
    name: "Mike Johnson",
    message: "Can we schedule a call tomorrow to go over the requirements?",
    time: "3 hours ago",
    unread: false,
    online: false,
  },
  {
    name: "Emily Davis",
    message: "Payment has been processed. Thanks for the amazing work!",
    time: "5 hours ago",
    unread: false,
    online: false,
  },
];

const TASKS_DATA = [
  {
    text: "Submit project proposal for TechCorp",
    done: true,
    priority: "high",
  },
  {
    text: "Review design mockups with client",
    done: false,
    priority: "urgent",
  },
  {
    text: "Update portfolio with recent work",
    done: false,
    priority: "medium",
  },
  { text: "Invoice for Brand Identity project", done: false, priority: "high" },
  { text: "Respond to new project inquiry", done: false, priority: "low" },
];

const priorityConfig = {
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

const StatCard = ({ stat }) => {
  const IconComponent = stat.icon;
  return (
    <Card className="group relative overflow-hidden p-4 sm:p-5 lg:p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100 hover:border-slate-200 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
          >
            <IconComponent
              className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white"
              strokeWidth={2}
            />
          </div>
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ring-1 ring-inset ${
              stat.positive
                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                : "bg-red-50 text-red-700 ring-red-600/10"
            }`}
          >
            {stat.positive ? (
              <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
            ) : (
              <ArrowDownRight className="w-3 h-3" strokeWidth={2.5} />
            )}
            {stat.change}
          </span>
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
            {stat.label}
          </p>
        </div>
      </div>
    </Card>
  );
};

const ProjectCard = ({ project }) => {
  const priority = priorityConfig[project.priority] || priorityConfig.medium;
  const progressColor =
    project.progress >= 80
      ? "from-emerald-400 to-emerald-500"
      : project.progress >= 50
        ? "from-blue-400 to-blue-500"
        : project.progress >= 25
          ? "from-amber-400 to-amber-500"
          : "from-slate-300 to-slate-400";

  return (
    <div className="group p-3.5 sm:p-4 bg-slate-50/70 rounded-xl hover:bg-white hover:shadow-md hover:shadow-slate-100 transition-all duration-300 border border-transparent hover:border-slate-150 cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900 text-sm sm:text-base truncate group-hover:text-blue-600 transition-colors">
            {project.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{project.client}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ring-inset ${priority.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            <span className="hidden sm:inline">{project.priority}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Due in {project.dueIn}
        </span>
        <span className="font-semibold text-slate-700">{project.budget}</span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-1.5 sm:h-2 bg-slate-200/80 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-slate-600 tabular-nums min-w-[2rem] text-right">
          {project.progress}%
        </span>
      </div>
    </div>
  );
};

const MessageItem = ({ message }) => {
  return (
    <div className="group flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer">
      <div className="relative flex-shrink-0">
        <Avatar name={message.name} size="md" />
        {message.online && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={`text-sm font-semibold truncate ${
              message.unread ? "text-slate-900" : "text-slate-600"
            }`}
          >
            {message.name}
          </h4>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium whitespace-nowrap flex-shrink-0">
            {message.time}
          </span>
        </div>
        <p
          className={`text-xs sm:text-sm truncate mt-0.5 ${
            message.unread ? "text-slate-700 font-medium" : "text-slate-500"
          }`}
        >
          {message.message}
        </p>
      </div>
      {message.unread && (
        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
      )}
    </div>
  );
};

const TaskItem = ({ task, onToggle }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  return (
    <div
      className={`group flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
        task.done ? "bg-slate-50/50 opacity-60" : "hover:bg-slate-50"
      }`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {task.done ? (
        <CheckCircle2
          className="w-5 h-5 text-emerald-500 flex-shrink-0"
          strokeWidth={2}
        />
      ) : (
        <Circle
          className="w-5 h-5 text-slate-300 group-hover:text-slate-400 flex-shrink-0 transition-colors"
          strokeWidth={2}
        />
      )}
      <span
        className={`flex-1 text-xs sm:text-sm min-w-0 truncate ${
          task.done
            ? "line-through text-slate-400"
            : "text-slate-700 font-medium"
        }`}
      >
        {task.text}
      </span>
      {!task.done && (
        <span
          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priority.dot}`}
        />
      )}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, count, actionText, onAction }) => (
  <div className="flex items-center justify-between mb-4 sm:mb-5">
    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-600"
          strokeWidth={2}
        />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
        {title}
      </h3>
      {count !== undefined && (
        <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-[10px] sm:text-xs font-bold bg-blue-100 text-blue-700 rounded-full flex-shrink-0">
          {count}
        </span>
      )}
    </div>
    {actionText && (
      <button
        onClick={onAction}
        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 group/btn"
      >
        <span className="hidden sm:inline">{actionText}</span>
        <span className="sm:hidden">All</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    )}
  </div>
);

const FreelancerDashboard = () => {
  const [tasks, setTasks] = useState(TASKS_DATA);

  const toggleTask = useCallback((index) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t)),
    );
  }, []);

  const completedTasks = useMemo(
    () => tasks.filter((t) => t.done).length,
    [tasks],
  );

  const unreadCount = useMemo(
    () => MESSAGES_DATA.filter((m) => m.unread).length,
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight truncate">
                Dashboard
              </h1>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500 truncate">
              Welcome back! Here's your overview for today.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              className="relative p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
            </button>
            <button
              className="relative p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]">
              <Zap className="w-4 h-4" />
              New Proposal
            </button>
          </div>
        </div>

        {/* Mobile New Proposal Button */}
        <button className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.98]">
          <Zap className="w-4 h-4" />
          Create New Proposal
        </button>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {STATS_DATA.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Active Projects - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <SectionHeader
                icon={FolderOpen}
                title="Active Projects"
                count={PROJECTS_DATA.length}
                actionText="View All"
              />
              <div className="space-y-2.5 sm:space-y-3">
                {PROJECTS_DATA.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Tasks */}
            <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <SectionHeader
                icon={CheckCircle2}
                title="Tasks"
                count={tasks.length - completedTasks}
                actionText="View All"
              />
              <div className="space-y-1">
                {tasks.map((task, index) => (
                  <TaskItem
                    key={task.text}
                    task={task}
                    onToggle={() => toggleTask(index)}
                  />
                ))}
              </div>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className="font-bold text-slate-700">
                    {completedTasks}/{tasks.length}
                  </span>
                </div>
                <div className="mt-2 h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(completedTasks / tasks.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Quick Stats Mini Card */}
            <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 bg-gradient-to-br from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Star
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-amber-300"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Your Rating</h3>
              </div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight">
                  4.9
                </span>
                <span className="text-sm text-blue-200 font-medium">/5.0</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200">
                Based on 127 client reviews
              </p>
              <div className="flex items-center gap-0.5 mt-2.5 sm:mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < 5 ? "text-amber-400 fill-amber-400" : "text-blue-300"
                    }`}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Messages Section - Full Width */}
        <Card className="p-4 sm:p-5 lg:p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300">
          <SectionHeader
            icon={MessageSquare}
            title="Recent Messages"
            count={unreadCount}
            actionText="View All"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5">
            {MESSAGES_DATA.map((message) => (
              <MessageItem key={message.name} message={message} />
            ))}
          </div>
        </Card>

        {/* Profile Completion Banner */}
        <Card className="overflow-hidden border border-slate-100">
          <div className="relative p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    Complete your profile to get more visibility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Your profile is 78% complete — add skills and portfolio
                    items
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-slate-900 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex-shrink-0 active:scale-[0.98]">
                Complete Profile
              </button>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
