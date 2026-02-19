import { useState, useMemo, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  CheckCircle,
  Circle,
  MessageSquare,
  FileText,
  Upload,
  Calendar,
  User,
  AlertCircle,
  MoreVertical,
  Download,
  ExternalLink,
  Plus,
  Play,
  Pause,
  Flag,
  Shield,
  Zap,
  Target,
  Briefcase,
  ChevronRight,
  X,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  BadgeCheck,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

const demoProject = {
  id: "1",
  title: "E-commerce Website Redesign",
  description: `Complete redesign of the client's e-commerce platform including:
- New modern UI/UX design
- Mobile-responsive layouts
- Improved checkout flow
- Product page optimization
- Integration with existing backend`,
  status: "in_progress",
  client: {
    id: "c1",
    name: "TechCorp Inc.",
    avatar: null,
    email: "john@techcorp.com",
  },
  freelancer: { id: "f1", name: "Sarah Johnson", avatar: null },
  budget: 5000,
  spent: 3750,
  startDate: "2024-02-01",
  deadline: "2024-03-15",
  createdAt: "2024-01-25",
  category: "Web Development",
  skills: ["React", "Node.js", "UI/UX", "Figma"],
  escrowBalance: 1250,
  totalMilestones: 4,
  completedMilestones: 3,
};

const demoMilestones = [
  {
    id: "m1",
    title: "Project Setup & Discovery",
    description:
      "Initial project setup, requirements gathering, and design research",
    amount: 500,
    status: "completed",
    dueDate: "2024-02-07",
    completedAt: "2024-02-06",
    deliverables: [
      "Requirements document",
      "Wireframes",
      "Tech stack decision",
    ],
  },
  {
    id: "m2",
    title: "UI/UX Design",
    description: "Complete design mockups for all pages including mobile views",
    amount: 1500,
    status: "completed",
    dueDate: "2024-02-14",
    completedAt: "2024-02-13",
    deliverables: ["Figma designs", "Design system", "Interactive prototype"],
  },
  {
    id: "m3",
    title: "Frontend Development",
    description:
      "Implement the approved designs in React with responsive layouts",
    amount: 1750,
    status: "completed",
    dueDate: "2024-02-28",
    completedAt: "2024-02-27",
    deliverables: [
      "React components",
      "Responsive layouts",
      "State management",
    ],
  },
  {
    id: "m4",
    title: "Testing & Launch",
    description: "QA testing, bug fixes, and deployment to production",
    amount: 1250,
    status: "in_progress",
    dueDate: "2024-03-15",
    completedAt: null,
    deliverables: ["Test reports", "Bug fixes", "Production deployment"],
  },
];

const demoTimeline = [
  {
    id: "t5",
    type: "milestone_started",
    title: "Milestone Started",
    description: "Testing & Launch milestone has begun",
    timestamp: "2024-02-28T09:00:00",
    user: "Sarah Johnson",
  },
  {
    id: "t1",
    type: "milestone_completed",
    title: "Milestone Completed",
    description: "Frontend Development milestone marked as complete",
    timestamp: "2024-02-27T14:30:00",
    user: "Sarah Johnson",
  },
  {
    id: "t2",
    type: "payment_released",
    title: "Payment Released",
    description: "$1,750 released from escrow for Frontend Development",
    timestamp: "2024-02-27T15:00:00",
    user: "TechCorp Inc.",
  },
  {
    id: "t3",
    type: "file_uploaded",
    title: "Files Uploaded",
    description: "5 new files uploaded for review",
    timestamp: "2024-02-26T10:15:00",
    user: "Sarah Johnson",
  },
  {
    id: "t4",
    type: "message",
    title: "New Message",
    description: "Client sent feedback on the latest designs",
    timestamp: "2024-02-25T16:45:00",
    user: "TechCorp Inc.",
  },
];

const demoFiles = [
  {
    id: "f1",
    name: "design-mockups.fig",
    size: "12.5 MB",
    uploadedAt: "2024-02-13",
    type: "design",
    icon: "🎨",
  },
  {
    id: "f2",
    name: "requirements.pdf",
    size: "245 KB",
    uploadedAt: "2024-02-06",
    type: "document",
    icon: "📄",
  },
  {
    id: "f3",
    name: "frontend-code.zip",
    size: "8.2 MB",
    uploadedAt: "2024-02-27",
    type: "code",
    icon: "💻",
  },
  {
    id: "f4",
    name: "test-report.pdf",
    size: "1.1 MB",
    uploadedAt: "2024-03-01",
    type: "document",
    icon: "📋",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    dotColor: "bg-gray-400",
    icon: Circle,
    gradient: "from-gray-400 to-gray-500",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
    icon: Play,
    gradient: "from-blue-500 to-indigo-500",
  },
  review: {
    label: "In Review",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-green-500",
  },
  paused: {
    label: "Paused",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    dotColor: "bg-orange-500",
    icon: Pause,
    gradient: "from-orange-500 to-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    icon: AlertCircle,
    gradient: "from-red-500 to-rose-500",
  },
};

const milestoneStatusConfig = {
  pending: {
    label: "Pending",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
  in_progress: {
    label: "In Progress",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  submitted: {
    label: "Submitted",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [project] = useState(demoProject);
  const [milestones, setMilestones] = useState(demoMilestones);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const progress = useMemo(
    () => Math.round((project.spent / project.budget) * 100),
    [project],
  );
  const daysRemaining = useMemo(
    () =>
      Math.ceil(
        (new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24),
      ),
    [project.deadline],
  );

  const handleSubmitWork = useCallback((milestoneId) => {
    const milestone = demoMilestones.find((m) => m.id === milestoneId);
    setSelectedMilestone(milestone);
    setShowSubmitModal(true);
  }, []);

  const handleConfirmSubmit = useCallback(() => {
    if (!selectedMilestone) return;
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === selectedMilestone.id ? { ...m, status: "submitted" } : m,
      ),
    );
    toast.success("✅ Work submitted for review!", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
    setShowSubmitModal(false);
    setSubmitMessage("");
    setSelectedMilestone(null);
  }, [selectedMilestone]);

  const handleReleaseFunds = useCallback((milestoneId) => {
    const milestone = demoMilestones.find((m) => m.id === milestoneId);
    setSelectedMilestone(milestone);
    setShowReleaseModal(true);
  }, []);

  const handleConfirmRelease = useCallback(() => {
    if (!selectedMilestone) return;
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === selectedMilestone.id
          ? { ...m, status: "completed", completedAt: new Date().toISOString() }
          : m,
      ),
    );
    toast.success(
      `💰 $${selectedMilestone.amount.toLocaleString()} released!`,
      {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      },
    );
    setShowReleaseModal(false);
    setSelectedMilestone(null);
  }, [selectedMilestone]);

  const closeModals = useCallback(() => {
    setShowSubmitModal(false);
    setShowReleaseModal(false);
    setSelectedMilestone(null);
    setSubmitMessage("");
  }, []);

  const StatusBadge = ({ status }) => {
    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${config.color}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`}
        />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${statusConfig[project.status].gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight truncate">
                    {project.title}
                  </h1>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{project.category}</span>
                  <span className="text-gray-300">•</span>
                  <span>
                    Started{" "}
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                to="/dashboard/messages"
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Message</span>
              </Link>
              <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-500">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="relative mb-6 sm:mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="relative p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[
                {
                  icon: DollarSign,
                  value: `$${project.budget.toLocaleString()}`,
                  label: "Budget",
                  sublabel: `$${project.spent.toLocaleString()} spent`,
                  color: "from-emerald-400 to-green-400",
                },
                {
                  icon: Clock,
                  value: new Date(project.deadline).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric" },
                  ),
                  label: "Deadline",
                  sublabel:
                    daysRemaining > 0
                      ? `${daysRemaining} days left`
                      : "Overdue",
                  color:
                    daysRemaining < 7
                      ? "from-red-400 to-rose-400"
                      : "from-amber-400 to-orange-400",
                },
                {
                  icon: Target,
                  value: `${project.completedMilestones}/${project.totalMilestones}`,
                  label: "Milestones",
                  sublabel: `${project.totalMilestones - project.completedMilestones} remaining`,
                  color: "from-blue-400 to-indigo-400",
                },
                {
                  icon: Shield,
                  value: `$${project.escrowBalance.toLocaleString()}`,
                  label: "In Escrow",
                  sublabel: "Protected funds",
                  color: "from-violet-400 to-purple-400",
                },
              ].map((stat, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-2 sm:mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-0.5 tracking-tight">
                      {stat.value}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-5 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-blue-600">{progress}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 sm:mb-6 overflow-hidden">
          <div className="p-1.5 sm:p-2 flex gap-1 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: Layers },
              { id: "milestones", label: "Milestones", icon: Target },
              { id: "files", label: "Files", icon: FileText },
              { id: "timeline", label: "Activity", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 shadow-inner ring-1 ring-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* ─── OVERVIEW ─── */}
            {activeTab === "overview" && (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-gray-100">
                    <h2 className="flex items-center gap-2 font-bold text-gray-900">
                      <Layers className="w-5 h-5 text-blue-600" />
                      Project Description
                    </h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Milestone */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6 border-b border-gray-100">
                    <h2 className="flex items-center gap-2 font-bold text-gray-900">
                      <Zap className="w-5 h-5 text-blue-600" />
                      Current Milestone
                    </h2>
                  </div>
                  <div className="p-5 sm:p-6">
                    {milestones
                      .filter(
                        (m) =>
                          m.status === "in_progress" ||
                          m.status === "submitted",
                      )
                      .slice(0, 1)
                      .map((milestone) => (
                        <div key={milestone.id} className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-gray-900">
                                {milestone.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {milestone.description}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${milestoneStatusConfig[milestone.status].color} flex-shrink-0`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${milestoneStatusConfig[milestone.status].dot}`}
                              />
                              {milestoneStatusConfig[milestone.status].label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-semibold text-gray-600">
                              <Calendar className="w-3.5 h-3.5" />
                              Due{" "}
                              {new Date(milestone.dueDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" },
                              )}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg text-xs font-semibold text-emerald-600">
                              <DollarSign className="w-3.5 h-3.5" />$
                              {milestone.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {milestone.status === "in_progress" && (
                              <button
                                onClick={() => handleSubmitWork(milestone.id)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
                              >
                                <Send className="w-4 h-4" />
                                Submit Work
                              </button>
                            )}
                            {milestone.status === "submitted" && (
                              <button
                                onClick={() => handleReleaseFunds(milestone.id)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:shadow-lg transition-all active:scale-[0.98]"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Release Funds
                              </button>
                            )}
                            <Link
                              to="/dashboard/messages"
                              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Discuss
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── MILESTONES ─── */}
            {activeTab === "milestones" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-bold text-gray-900">
                    <Target className="w-5 h-5 text-blue-600" />
                    All Milestones
                  </h2>
                  <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Milestone</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {milestones.map((milestone, index) => {
                    const msConfig = milestoneStatusConfig[milestone.status];
                    return (
                      <div
                        key={milestone.id}
                        className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              milestone.status === "completed"
                                ? "bg-emerald-100 text-emerald-600"
                                : milestone.status === "in_progress"
                                  ? "bg-blue-100 text-blue-600"
                                  : milestone.status === "submitted"
                                    ? "bg-violet-100 text-violet-600"
                                    : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {milestone.status === "completed" ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="text-sm font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900 text-sm">
                                  {milestone.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {milestone.description}
                                </p>
                              </div>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold border flex-shrink-0 ${msConfig.color}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${msConfig.dot}`}
                                />
                                {msConfig.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                              <span className="flex items-center gap-1 text-gray-500">
                                <Calendar className="w-3.5 h-3.5" />
                                Due{" "}
                                {new Date(milestone.dueDate).toLocaleDateString(
                                  "en-US",
                                  { month: "short", day: "numeric" },
                                )}
                              </span>
                              <span className="font-bold text-gray-900">
                                ${milestone.amount.toLocaleString()}
                              </span>
                              {milestone.completedAt && (
                                <span className="flex items-center gap-1 text-emerald-600">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  {new Date(
                                    milestone.completedAt,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              )}
                            </div>
                            {milestone.deliverables && (
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {milestone.deliverables.map((d, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-medium"
                                  >
                                    {d}
                                  </span>
                                ))}
                              </div>
                            )}
                            {milestone.status === "in_progress" && (
                              <button
                                onClick={() => handleSubmitWork(milestone.id)}
                                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Submit Work
                              </button>
                            )}
                            {milestone.status === "submitted" && (
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() =>
                                    handleReleaseFunds(milestone.id)
                                  }
                                  className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-200 hover:shadow-lg transition-all active:scale-[0.98]"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Approve & Release
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-2 border border-orange-200 text-orange-600 text-xs font-semibold rounded-xl hover:bg-orange-50 transition-all">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  Request Revision
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── FILES ─── */}
            {activeTab === "files" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-bold text-gray-900">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Project Files
                  </h2>
                  <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]">
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {demoFiles.map((file) => (
                    <div
                      key={file.id}
                      className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                          {file.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.size} ·{" "}
                            {new Date(file.uploadedAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            toast.success(`📥 Downloading ${file.name}...`, {
                              style: {
                                borderRadius: "12px",
                                background: "#1F2937",
                                color: "#fff",
                              },
                            })
                          }
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── TIMELINE ─── */}
            {activeTab === "timeline" && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100">
                  <h2 className="flex items-center gap-2 font-bold text-gray-900">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Activity Timeline
                  </h2>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="relative">
                    <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-px bg-gray-200" />
                    <div className="space-y-6">
                      {demoTimeline.map((event) => {
                        const eventStyles = {
                          milestone_completed: {
                            icon: CheckCircle,
                            bg: "bg-emerald-100 text-emerald-600",
                            ring: "ring-emerald-50",
                          },
                          payment_released: {
                            icon: DollarSign,
                            bg: "bg-blue-100 text-blue-600",
                            ring: "ring-blue-50",
                          },
                          file_uploaded: {
                            icon: Upload,
                            bg: "bg-violet-100 text-violet-600",
                            ring: "ring-violet-50",
                          },
                          message: {
                            icon: MessageSquare,
                            bg: "bg-gray-100 text-gray-600",
                            ring: "ring-gray-50",
                          },
                          milestone_started: {
                            icon: Play,
                            bg: "bg-amber-100 text-amber-600",
                            ring: "ring-amber-50",
                          },
                        };
                        const style =
                          eventStyles[event.type] || eventStyles.message;
                        const EventIcon = style.icon;

                        return (
                          <div
                            key={event.id}
                            className="flex gap-3 sm:gap-4 relative"
                          >
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ring-4 ${style.bg} ${style.ring} z-10`}
                            >
                              <EventIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                              <p className="font-semibold text-gray-900 text-sm">
                                {event.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {event.description}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
                                {event.user} ·{" "}
                                {new Date(event.timestamp).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Client Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <User className="w-4 h-4 text-blue-600" />
                  Client
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                    {project.client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {project.client.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {project.client.email}
                    </p>
                  </div>
                </div>
                <Link
                  to="/dashboard/messages"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </Link>
              </div>
            </div>

            {/* Escrow */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
              <div className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Escrow Balance
                </h3>
                <div className="text-3xl font-extrabold text-emerald-600 mb-2 tracking-tight">
                  ${project.escrowBalance.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Held securely until milestone completion
                </p>
                <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                  {[
                    {
                      label: "Total Budget",
                      value: `$${project.budget.toLocaleString()}`,
                      color: "text-gray-900",
                    },
                    {
                      label: "Released",
                      value: `$${project.spent.toLocaleString()}`,
                      color: "text-blue-600",
                    },
                    {
                      label: "In Escrow",
                      value: `$${project.escrowBalance.toLocaleString()}`,
                      color: "text-emerald-600",
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-4 py-2.5"
                    >
                      <span className="text-xs text-gray-500">{row.label}</span>
                      <span className={`text-sm font-semibold ${row.color}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="space-y-1.5">
                  {[
                    {
                      icon: FileText,
                      label: "View Contract",
                      color: "text-gray-600",
                      hoverBg: "hover:bg-gray-50",
                    },
                    {
                      icon: Flag,
                      label: "Report Issue",
                      color: "text-gray-600",
                      hoverBg: "hover:bg-gray-50",
                    },
                    {
                      icon: Pause,
                      label: "Pause Project",
                      color: "text-red-600",
                      hoverBg: "hover:bg-red-50",
                    },
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl ${action.hoverBg} transition-all text-sm font-medium ${action.color} group`}
                    >
                      <action.icon className="w-4 h-4" />
                      {action.label}
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SUBMIT WORK MODAL ─── */}
        {showSubmitModal && selectedMilestone && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && closeModals()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Submit Work
                      </h2>
                      <p className="text-xs text-gray-500">
                        {selectedMilestone.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModals}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message to Client
                    </label>
                    <textarea
                      value={submitMessage}
                      onChange={(e) => setSubmitMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400 resize-none"
                      placeholder="Add any notes about your submission..."
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm text-blue-700 font-medium">
                      Milestone Amount
                    </span>
                    <span className="text-xl font-extrabold text-blue-700">
                      ${selectedMilestone.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    The client will review your work and release the funds upon
                    approval.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleConfirmSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    Submit Work
                  </button>
                  <button
                    onClick={closeModals}
                    className="flex-1 sm:flex-initial px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── RELEASE FUNDS MODAL ─── */}
        {showReleaseModal && selectedMilestone && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && closeModals()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Release Funds
                      </h2>
                      <p className="text-xs text-gray-500">
                        {selectedMilestone.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModals}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-5 rounded-xl text-center">
                    <p className="text-xs uppercase tracking-wider text-emerald-500 font-semibold mb-1">
                      Amount to Release
                    </p>
                    <p className="text-3xl font-extrabold text-emerald-700 tracking-tight">
                      ${selectedMilestone.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Once released, funds will be transferred immediately. This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleConfirmRelease}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Release Funds
                  </button>
                  <button
                    onClick={closeModals}
                    className="flex-1 sm:flex-initial px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
