import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { memo, useMemo, useCallback } from "react";
import {
  Briefcase,
  DollarSign,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  MessageSquare,
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
  ChevronRight,
  Calendar,
  Target,
  Sparkles,
  Send,
  Award,
  Timer,
} from "lucide-react";
import { Button, Badge, Avatar, Card } from "../../../components/common";

const stats = [
  {
    label: "Active Jobs",
    value: "8",
    change: "+2",
    positive: true,
    icon: Briefcase,
    gradient: "from-blue-500 to-blue-600",
    bgGlow: "bg-blue-500/10",
    lightBg: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Total Spent",
    value: "$45,200",
    change: "+$5,400",
    positive: true,
    icon: DollarSign,
    gradient: "from-emerald-500 to-emerald-600",
    bgGlow: "bg-emerald-500/10",
    lightBg: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "Hired Freelancers",
    value: "23",
    change: "+3",
    positive: true,
    icon: Users,
    gradient: "from-violet-500 to-violet-600",
    bgGlow: "bg-violet-500/10",
    lightBg: "bg-violet-50",
    textColor: "text-violet-600",
  },
  {
    label: "Pending Proposals",
    value: "47",
    change: "+12",
    positive: true,
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/10",
    lightBg: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

const activeJobs = [
  {
    id: 1,
    title: "E-commerce Website Redesign",
    freelancer: { name: "Sarah Johnson", avatar: null },
    status: "in_progress",
    progress: 65,
    budget: "$5,000",
    dueDate: "5 days left",
    milestones: { completed: 2, total: 4 },
    priority: "high",
  },
  {
    id: 2,
    title: "Mobile App Development",
    freelancer: { name: "Michael Chen", avatar: null },
    status: "in_progress",
    progress: 30,
    budget: "$12,000",
    dueDate: "3 weeks left",
    milestones: { completed: 1, total: 5 },
    priority: "medium",
  },
  {
    id: 3,
    title: "Brand Identity Design",
    freelancer: { name: "Emma Williams", avatar: null },
    status: "review",
    progress: 90,
    budget: "$2,500",
    dueDate: "2 days left",
    milestones: { completed: 3, total: 3 },
    priority: "urgent",
  },
];

const recentProposals = [
  {
    id: 1,
    freelancer: {
      name: "David Kim",
      title: "Full-Stack Developer",
      rating: 4.9,
      avatar: null,
      completedJobs: 127,
    },
    job: "API Integration Project",
    bid: "$3,500",
    deliveryTime: "2 weeks",
    receivedAt: "2 hours ago",
  },
  {
    id: 2,
    freelancer: {
      name: "Lisa Anderson",
      title: "Content Writer",
      rating: 4.8,
      avatar: null,
      completedJobs: 89,
    },
    job: "Blog Content Creation",
    bid: "$800",
    deliveryTime: "1 week",
    receivedAt: "5 hours ago",
  },
  {
    id: 3,
    freelancer: {
      name: "James Wilson",
      title: "Video Editor",
      rating: 5.0,
      avatar: null,
      completedJobs: 203,
    },
    job: "Product Video Production",
    bid: "$1,200",
    deliveryTime: "10 days",
    receivedAt: "1 day ago",
  },
];

const quickActions = [
  {
    to: "/dashboard/post-job",
    icon: Plus,
    label: "Post a Job",
    description: "Create a new listing",
    gradient: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    iconBg: "bg-blue-100",
    textColor: "text-blue-700",
    descColor: "text-blue-500",
  },
  {
    to: "/freelancers",
    icon: Users,
    label: "Find Talent",
    description: "Browse freelancers",
    gradient: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 hover:bg-emerald-100",
    iconBg: "bg-emerald-100",
    textColor: "text-emerald-700",
    descColor: "text-emerald-500",
  },
  {
    to: "/dashboard/my-jobs",
    icon: Eye,
    label: "View Jobs",
    description: "Manage listings",
    gradient: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 hover:bg-violet-100",
    iconBg: "bg-violet-100",
    textColor: "text-violet-700",
    descColor: "text-violet-500",
  },
  {
    to: "/dashboard/messages",
    icon: MessageSquare,
    label: "Messages",
    description: "Chat with team",
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 hover:bg-amber-100",
    iconBg: "bg-amber-100",
    textColor: "text-amber-700",
    descColor: "text-amber-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const getProgressColor = (progress) => {
  if (progress >= 90) return "from-emerald-400 to-emerald-500";
  if (progress >= 60) return "from-blue-400 to-blue-500";
  if (progress >= 30) return "from-amber-400 to-amber-500";
  return "from-red-400 to-red-500";
};

const getPriorityConfig = (priority) => {
  const configs = {
    urgent: {
      color: "bg-red-100 text-red-700 border-red-200",
      label: "Urgent",
    },
    high: {
      color: "bg-orange-100 text-orange-700 border-orange-200",
      label: "High",
    },
    medium: {
      color: "bg-blue-100 text-blue-700 border-blue-200",
      label: "Medium",
    },
    low: { color: "bg-gray-100 text-gray-600 border-gray-200", label: "Low" },
  };
  return configs[priority] || configs.medium;
};

const StatCard = memo(({ stat, index }) => (
  <motion.div variants={itemVariants}>
    <Card className="relative overflow-hidden p-0 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group">
      <div
        className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-${stat.gradient.split("-")[1]}-500/25 group-hover:scale-110 transition-transform duration-300`}
          >
            <stat.icon
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              strokeWidth={2}
            />
          </div>
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
          >
            {stat.positive ? (
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            )}
            <span className="text-xs font-semibold">{stat.change}</span>
          </div>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {stat.value}
          </p>
          <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{
              delay: index * 0.15 + 0.5,
              duration: 1,
              ease: "easeOut",
            }}
          />
        </div>
      </div>
    </Card>
  </motion.div>
));

StatCard.displayName = "StatCard";

const JobCard = memo(({ job, index }) => {
  const priorityConfig = getPriorityConfig(job.priority);
  const progressColor = getProgressColor(job.progress);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {job.title}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${priorityConfig.color}`}
            >
              {priorityConfig.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Avatar name={job.freelancer.name} size="xs" />
            <span className="text-sm text-gray-500 font-medium">
              {job.freelancer.name}
            </span>
          </div>
        </div>
        <Badge
          variant={job.status === "review" ? "warning" : "primary"}
          size="sm"
          className="shrink-0"
        >
          {job.status === "review" ? (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Review
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Active
            </span>
          )}
        </Badge>
      </div>

      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-semibold text-gray-700">{job.budget}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-amber-500" />
          {job.dueDate}
        </span>
        <span className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-blue-500" />
          {job.milestones.completed}/{job.milestones.total} milestones
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${progressColor} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${job.progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <span className="text-sm font-bold text-gray-700 tabular-nums min-w-[3rem] text-right">
          {job.progress}%
        </span>
      </div>
    </motion.div>
  );
});

JobCard.displayName = "JobCard";

const ProposalCard = memo(({ proposal, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="group p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="relative shrink-0">
        <Avatar name={proposal.freelancer.name} size="md" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
          <CheckCircle className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {proposal.freelancer.name}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500">
              {proposal.freelancer.title}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {proposal.bid}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="flex items-center gap-1 text-xs sm:text-sm">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-gray-700">
              {proposal.freelancer.rating}
            </span>
          </span>
          <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            {proposal.freelancer.completedJobs} jobs
          </span>
        </div>

        <div className="mt-2 px-3 py-1.5 bg-blue-50 rounded-lg inline-flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-xs sm:text-sm font-medium text-blue-700 truncate">
            {proposal.job}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {proposal.receivedAt}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {proposal.deliveryTime}
          </span>
        </div>
      </div>
    </div>

    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
      <Button
        size="sm"
        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm shadow-blue-500/25"
      >
        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
        Accept
      </Button>
      <Button size="sm" variant="secondary" className="flex-1">
        <Eye className="w-3.5 h-3.5 mr-1.5" />
        View
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="px-3 hover:bg-blue-50 hover:text-blue-600"
      >
        <MessageSquare className="w-4 h-4" />
      </Button>
    </div>
  </motion.div>
));

ProposalCard.displayName = "ProposalCard";

const QuickActionCard = memo(({ action, index }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link to={action.to} className="block">
      <div
        className={`relative overflow-hidden p-5 sm:p-6 ${action.bgColor} rounded-2xl transition-all duration-300 group border border-transparent hover:border-gray-200`}
      >
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 opacity-[0.07] transform translate-x-4 -translate-y-4">
          <action.icon className="w-full h-full" />
        </div>
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 ${action.iconBg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
        >
          <action.icon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${action.textColor}`}
            strokeWidth={2}
          />
        </div>
        <p className={`font-semibold ${action.textColor} text-sm sm:text-base`}>
          {action.label}
        </p>
        <p className={`text-xs ${action.descColor} mt-0.5`}>
          {action.description}
        </p>
        <ChevronRight
          className={`w-4 h-4 ${action.textColor} absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
        />
      </div>
    </Link>
  </motion.div>
));

QuickActionCard.displayName = "QuickActionCard";

const ClientDashboard = () => {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8 mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-6 h-6 text-amber-500" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Client Dashboard
            </h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base font-medium">
            Manage your projects and discover top talent
          </p>
        </div>
        <Link to="/dashboard/post-job">
          <Button
            leftIcon={<Plus className="w-5 h-5" strokeWidth={2.5} />}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl px-6 py-2.5 font-semibold w-full sm:w-auto"
          >
            Post a New Job
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Active Jobs */}
        <motion.div variants={itemVariants}>
          <Card className="p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase
                    className="w-4.5 h-4.5 text-blue-600"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Active Jobs
                  </h2>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Track your ongoing projects
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/my-jobs"
                className="flex items-center gap-1 text-blue-600 text-xs sm:text-sm font-semibold hover:text-blue-700 group transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3">
              {activeJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Proposals */}
        <motion.div variants={itemVariants}>
          <Card className="p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Send
                    className="w-4.5 h-4.5 text-violet-600"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Recent Proposals
                  </h2>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Review and respond to bids
                  </p>
                </div>
              </div>
              <Badge
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none shadow-sm px-3"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {recentProposals.length} new
              </Badge>
            </div>

            <div className="space-y-3">
              {recentProposals.map((proposal, index) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  index={index}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientDashboard;
