import { useState, useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Briefcase,
  Eye,
  EyeOff,
  Pause,
  Play,
  Lock,
  Trash2,
  PenLine,
  X,
  Save,
  ChevronRight,
  DollarSign,
  Clock,
  Users,
  Calendar,
  BarChart3,
  Star,
  Hash,
  MessageSquare,
  ExternalLink,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Sparkles,
  Target,
  Layers,
  TrendingUp,
  Award,
  MapPin,
  FileText,
  Loader2,
  Send,
  CircleDollarSign,
  Timer,
  Zap,
  Shield,
  MoreHorizontal,
  Copy,
  Share2,
  Archive,
} from "lucide-react";
import { demoJobs, demoProposals } from "../../../data/demoData";
import toast from "react-hot-toast";

// ─── Animation Variants ──────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

// ─── Helpers ─────────────────────────────────────────────────────────

const statusConfig = {
  open: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    dot: "bg-emerald-500",
    label: "Open",
    gradient: "from-emerald-500 to-teal-500",
  },
  closed: {
    color: "bg-gray-100 text-gray-600 border-gray-200",
    icon: XCircle,
    iconColor: "text-gray-400",
    dot: "bg-gray-400",
    label: "Closed",
    gradient: "from-gray-400 to-gray-500",
  },
  paused: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Pause,
    iconColor: "text-amber-500",
    dot: "bg-amber-500",
    label: "Paused",
    gradient: "from-amber-400 to-orange-500",
  },
};

const filterTabs = [
  { value: "all", label: "All Jobs", icon: Layers },
  { value: "open", label: "Open", icon: CheckCircle },
  { value: "paused", label: "Paused", icon: Pause },
  { value: "closed", label: "Closed", icon: XCircle },
];

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

// ─── Sub Components ──────────────────────────────────────────────────

const StatusBadge = memo(({ status }) => {
  const config = statusConfig[status] || statusConfig.closed;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
});
StatusBadge.displayName = "StatusBadge";

const SkillChip = memo(({ skill, variant = "default" }) => {
  const styles =
    variant === "blue"
      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-100"
      : "bg-gray-50 text-gray-600 border-gray-100";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${styles}`}
    >
      <Hash className="w-3 h-3 opacity-50" />
      {skill}
    </span>
  );
});
SkillChip.displayName = "SkillChip";

const StatItem = memo(({ icon: Icon, iconColor, label, value }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm text-gray-500 flex items-center gap-2">
      <Icon className={`w-4 h-4 ${iconColor || "text-gray-400"}`} />
      {label}
    </span>
    <span className="text-sm font-semibold text-gray-900">{value}</span>
  </div>
));
StatItem.displayName = "StatItem";

const SectionCard = memo(
  ({
    icon: Icon,
    iconColor,
    iconBg,
    title,
    subtitle,
    action,
    children,
    className = "",
  }) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between p-5 sm:p-6 pb-0">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 ${iconBg || "bg-blue-100"} rounded-xl flex items-center justify-center shrink-0`}
          >
            <Icon
              className={`w-4.5 h-4.5 ${iconColor || "text-blue-600"}`}
              strokeWidth={2}
            />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {action && action}
      </div>
      <div className="p-5 sm:p-6 pt-4">{children}</div>
    </motion.div>
  ),
);
SectionCard.displayName = "SectionCard";

const ActionButton = memo(
  ({
    icon: Icon,
    label,
    onClick,
    variant = "default",
    size = "md",
    className = "",
    disabled = false,
  }) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
      success:
        "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/25",
      danger:
        "bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300",
      warning:
        "bg-white border border-amber-200 text-amber-600 hover:bg-amber-50 hover:border-amber-300",
      ghost:
        "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
      default:
        "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2.5 text-sm gap-2",
    };

    return (
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {Icon && <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />}
        {label}
      </motion.button>
    );
  },
);
ActionButton.displayName = "ActionButton";

const ProposalCard = memo(({ proposal }) => {
  const isAccepted = proposal.status === "accepted";
  return (
    <div className="group flex items-start gap-3.5 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200">
      <div className="relative shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
          {proposal.freelancerName?.charAt(0) || "?"}
        </div>
        {isAccepted && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-gray-900 text-sm truncate">
            {proposal.freelancerName}
          </h4>
          <StatusBadge status={isAccepted ? "open" : "closed"} />
        </div>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CircleDollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-gray-700">
              ${proposal.bid?.toLocaleString()}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-blue-500" />
            {proposal.deliveryTime}
          </span>
        </div>
      </div>
    </div>
  );
});
ProposalCard.displayName = "ProposalCard";

const EmptyState = memo(
  ({ icon: Icon, title, description, actionLabel, actionTo }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        {description}
      </p>
      {actionTo && (
        <Link to={actionTo}>
          <ActionButton icon={Plus} label={actionLabel} variant="primary" />
        </Link>
      )}
    </motion.div>
  ),
);
EmptyState.displayName = "EmptyState";

// ─── Job Card (List View) ────────────────────────────────────────────

const JobCard = memo(({ job, onSelect, onPause, onClose, proposalCount }) => {
  const config = statusConfig[job.status] || statusConfig.closed;

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="group bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            <StatusBadge status={job.status} />
            {proposalCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                <Users className="w-3 h-3" />
                {proposalCount} proposals
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
            {job.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5 text-xs sm:text-sm text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <CircleDollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold text-gray-700">
                ${job.budget.min.toLocaleString()} – $
                {job.budget.max.toLocaleString()}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {job.duration}
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <Calendar className="w-3.5 h-3.5 text-violet-500" />
              {formatDate(job.postedAt)}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-sm`}
          >
            <Briefcase className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.slice(0, 4).map((skill) => (
          <SkillChip key={skill} skill={skill} />
        ))}
        {job.skills.length > 4 && (
          <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-400 rounded-lg text-xs font-medium">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-50">
        <ActionButton
          icon={Eye}
          label="View Details"
          variant="primary"
          size="sm"
          onClick={() => onSelect(job)}
        />
        <Link to="/dashboard/proposals-received">
          <ActionButton
            icon={MessageSquare}
            label="Proposals"
            variant="ghost"
            size="sm"
          />
        </Link>
        {job.status === "open" && (
          <ActionButton
            icon={Pause}
            label="Pause"
            variant="warning"
            size="sm"
            onClick={() => onPause(job.id)}
          />
        )}
        {job.status === "paused" && (
          <ActionButton
            icon={Play}
            label="Resume"
            variant="success"
            size="sm"
            onClick={() => onPause(job.id)}
          />
        )}
        {job.status !== "closed" && (
          <ActionButton
            icon={Lock}
            label="Close"
            variant="danger"
            size="sm"
            onClick={() => onClose(job.id)}
          />
        )}
      </div>
    </motion.div>
  );
});
JobCard.displayName = "JobCard";

// ─── Edit Modal ──────────────────────────────────────────────────────

const EditModal = memo(({ editData, setEditData, onSave, onClose }) => (
  <motion.div
    variants={modalOverlayVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <motion.div
      variants={modalContentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
            <PenLine className="w-4.5 h-4.5 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Edit Job</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/80 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-blue-500" />
            Job Title
          </label>
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-violet-500" />
            Description
          </label>
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none leading-relaxed"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Min Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={editData.budgetMin}
                onChange={(e) =>
                  setEditData({ ...editData, budgetMin: e.target.value })
                }
                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              Max Budget
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={editData.budgetMax}
                onChange={(e) =>
                  setEditData({ ...editData, budgetMax: e.target.value })
                }
                className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="flex-1 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onSave}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
));
EditModal.displayName = "EditModal";

// ─── Job Detail View ─────────────────────────────────────────────────

const JobDetailView = memo(
  ({ job, proposals, onBack, onEdit, onPause, onClose, onDelete }) => {
    const config = statusConfig[job.status] || statusConfig.closed;

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 group text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Jobs
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Job Header */}
            <SectionCard
              icon={Briefcase}
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
              title={job.title}
              action={<StatusBadge status={job.status} />}
            >
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-violet-500" />
                  Posted {formatDate(job.postedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  {job.proposals} proposals
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {job.duration}
                </span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {job.skills.map((skill) => (
                  <SkillChip key={skill} skill={skill} variant="blue" />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {job.status !== "closed" && (
                  <>
                    <ActionButton
                      icon={PenLine}
                      label="Edit Job"
                      variant="ghost"
                      onClick={() => onEdit(job)}
                    />
                    <ActionButton
                      icon={job.status === "paused" ? Play : Pause}
                      label={job.status === "paused" ? "Resume" : "Pause"}
                      variant="warning"
                      onClick={() => onPause(job.id)}
                    />
                    <ActionButton
                      icon={Lock}
                      label="Close Job"
                      variant="danger"
                      onClick={() => onClose(job.id)}
                    />
                  </>
                )}
                <ActionButton
                  icon={Trash2}
                  label="Delete"
                  variant="danger"
                  onClick={() => onDelete(job.id)}
                />
              </div>
            </SectionCard>

            {/* Proposals */}
            <SectionCard
              icon={MessageSquare}
              iconColor="text-violet-600"
              iconBg="bg-violet-100"
              title={`Proposals (${proposals.length})`}
              action={
                <Link
                  to="/dashboard/proposals-received"
                  className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:text-blue-700 group"
                >
                  View all
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              }
            >
              {proposals.length > 0 ? (
                <div className="space-y-3">
                  {proposals.map((proposal) => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-7 h-7 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">
                    No proposals yet
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Proposals will appear here when freelancers apply
                  </p>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 order-first lg:order-last">
            <div className="lg:sticky lg:top-6 space-y-5">
              {/* Budget Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CircleDollarSign className="w-4.5 h-4.5 text-emerald-600" />
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Budget
                  </h3>
                </div>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  ${job.budget.min.toLocaleString()} – $
                  {job.budget.max.toLocaleString()}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-lg">
                  <Target className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-semibold text-blue-700">
                    {job.budget.type === "fixed"
                      ? "Fixed Price"
                      : "Hourly Rate"}
                  </span>
                </div>
              </motion.div>

              {/* Job Stats */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Job Stats
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  <StatItem
                    icon={Eye}
                    iconColor="text-blue-500"
                    label="Views"
                    value="234"
                  />
                  <StatItem
                    icon={Users}
                    iconColor="text-violet-500"
                    label="Proposals"
                    value={job.proposals}
                  />
                  <StatItem
                    icon={Layers}
                    iconColor="text-emerald-500"
                    label="Category"
                    value={job.category}
                  />
                  <StatItem
                    icon={Award}
                    iconColor="text-amber-500"
                    label="Experience"
                    value={job.experience}
                  />
                </div>
              </motion.div>

              {/* Quick Actions Sidebar */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900 text-sm">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white/80 hover:bg-white rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 transition-all group">
                    <Share2 className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    Share Job
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white/80 hover:bg-white rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 transition-all group">
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    Duplicate Job
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-white/80 hover:bg-white rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 transition-all group">
                    <Archive className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    Archive Job
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);
JobDetailView.displayName = "JobDetailView";

// ─── Main Component ──────────────────────────────────────────────────

const MyJobs = () => {
  const [jobs, setJobs] = useState(demoJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const filteredJobs = useMemo(() => {
    let result = jobs;
    if (filter !== "all") {
      result = result.filter((job) => job.status === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [jobs, filter, searchQuery]);

  const jobCounts = useMemo(
    () => ({
      all: jobs.length,
      open: jobs.filter((j) => j.status === "open").length,
      paused: jobs.filter((j) => j.status === "paused").length,
      closed: jobs.filter((j) => j.status === "closed").length,
    }),
    [jobs],
  );

  const getJobProposals = useCallback(
    (jobId) => demoProposals.filter((p) => p.jobId === jobId),
    [],
  );

  const handleCloseJob = useCallback((jobId) => {
    if (window.confirm("Are you sure you want to close this job?")) {
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: "closed" } : j)),
      );
      setSelectedJob((prev) =>
        prev?.id === jobId ? { ...prev, status: "closed" } : prev,
      );
      toast.success("Job closed");
    }
  }, []);

  const handlePauseJob = useCallback((jobId) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const newStatus = j.status === "paused" ? "open" : "paused";
        return { ...j, status: newStatus };
      }),
    );
    setSelectedJob((prev) => {
      if (prev?.id !== jobId) return prev;
      const newStatus = prev.status === "paused" ? "open" : "paused";
      return { ...prev, status: newStatus };
    });
    setJobs((prev) => {
      const job = prev.find((j) => j.id === jobId);
      if (job) {
        toast.success(job.status === "paused" ? "Job paused" : "Job reopened");
      }
      return prev;
    });
  }, []);

  const handleDeleteJob = useCallback((jobId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this job? This cannot be undone.",
      )
    ) {
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      setSelectedJob(null);
      toast.success("Job deleted");
    }
  }, []);

  const handleEditJob = useCallback((job) => {
    setEditData({
      title: job.title,
      description: job.description,
      budgetMin: job.budget.min,
      budgetMax: job.budget.max,
    });
    setShowEditModal(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (!selectedJob) return;
    const updates = {
      title: editData.title,
      description: editData.description,
      budget: {
        min: parseInt(editData.budgetMin),
        max: parseInt(editData.budgetMax),
      },
    };
    setJobs((prev) =>
      prev.map((j) =>
        j.id === selectedJob.id
          ? { ...j, ...updates, budget: { ...j.budget, ...updates.budget } }
          : j,
      ),
    );
    setSelectedJob((prev) =>
      prev
        ? {
            ...prev,
            ...updates,
            budget: { ...prev.budget, ...updates.budget },
          }
        : prev,
    );
    setShowEditModal(false);
    toast.success("Job updated");
  }, [selectedJob, editData]);

  // ── Detail View ────────────────────────────────────────────────────
  if (selectedJob) {
    const proposals = getJobProposals(selectedJob.id);
    return (
      <>
        <JobDetailView
          job={selectedJob}
          proposals={proposals}
          onBack={() => setSelectedJob(null)}
          onEdit={handleEditJob}
          onPause={handlePauseJob}
          onClose={handleCloseJob}
          onDelete={handleDeleteJob}
        />
        <AnimatePresence>
          {showEditModal && (
            <EditModal
              editData={editData}
              setEditData={setEditData}
              onSave={handleSaveEdit}
              onClose={() => setShowEditModal(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // ── List View ──────────────────────────────────────────────────────
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              My Jobs
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {jobs.length} total jobs posted
            </p>
          </div>
        </div>
        <Link to="/dashboard/post-job">
          <ActionButton icon={Plus} label="Post New Job" variant="primary" />
        </Link>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 shadow-sm mb-6 space-y-3"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs by title or skill..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.value;
            const count = jobCounts[tab.value];
            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
                <span
                  className={`ml-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Jobs List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={setSelectedJob}
              onPause={handlePauseJob}
              onClose={handleCloseJob}
              proposalCount={getJobProposals(job.id).length}
            />
          ))}
        </AnimatePresence>

        {filteredJobs.length === 0 && (
          <EmptyState
            icon={Briefcase}
            title="No jobs found"
            description={
              searchQuery
                ? `No jobs matching "${searchQuery}". Try a different search term.`
                : "You haven't posted any jobs yet. Create your first listing to start receiving proposals."
            }
            actionLabel="Post Your First Job"
            actionTo="/dashboard/post-job"
          />
        )}
      </div>
    </motion.div>
  );
};

export default MyJobs;
