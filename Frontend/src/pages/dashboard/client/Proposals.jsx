import { useState, useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  Star,
  BookmarkPlus,
  MessageSquare,
  X,
  Send,
  DollarSign,
  Clock,
  MapPin,
  Briefcase,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Hash,
  Calendar,
  Target,
  TrendingUp,
  BadgeCheck,
  ExternalLink,
  FileText,
  Layers,
  Filter,
  Search,
  Zap,
  CircleDollarSign,
  Timer,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  BarChart3,
  Shield,
  AlertCircle,
  UserCheck,
  Inbox,
} from "lucide-react";
import {
  demoProposals,
  demoFreelancers,
  demoJobs,
} from "../../../data/demoData";
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

// ─── Constants ───────────────────────────────────────────────────────

const statusConfig = {
  pending: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: Clock,
    label: "Pending",
    gradient: "from-amber-400 to-orange-500",
  },
  accepted: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    icon: CheckCircle,
    label: "Accepted",
    gradient: "from-emerald-400 to-teal-500",
  },
  rejected: {
    color: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    icon: XCircle,
    label: "Rejected",
    gradient: "from-red-400 to-rose-500",
  },
  shortlisted: {
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    icon: Star,
    label: "Shortlisted",
    gradient: "from-blue-400 to-indigo-500",
  },
};

const filterTabs = [
  { value: "all", label: "All", icon: Layers, count: 0 },
  { value: "pending", label: "Pending", icon: Clock, count: 0 },
  { value: "shortlisted", label: "Shortlisted", icon: Star, count: 0 },
  { value: "accepted", label: "Accepted", icon: CheckCircle, count: 0 },
  { value: "rejected", label: "Rejected", icon: XCircle, count: 0 },
];

// ─── Sub Components ──────────────────────────────────────────────────

const StatusBadge = memo(({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${config.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
});
StatusBadge.displayName = "StatusBadge";

const SkillChip = memo(({ skill }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-medium">
    <Hash className="w-3 h-3 opacity-50" />
    {skill}
  </span>
));
SkillChip.displayName = "SkillChip";

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
      info: "bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300",
      ghost:
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

const SectionCard = memo(
  ({ icon: Icon, iconColor, iconBg, title, subtitle, action, children }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
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
        {action}
      </div>
      <div className="p-5 sm:p-6 pt-4">{children}</div>
    </motion.div>
  ),
);
SectionCard.displayName = "SectionCard";

const StatItem = memo(({ icon: Icon, iconColor, label, value }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm text-gray-500 flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50`}
      >
        <Icon className={`w-3.5 h-3.5 ${iconColor || "text-gray-400"}`} />
      </div>
      {label}
    </span>
    <span className="text-sm font-semibold text-gray-900">{value}</span>
  </div>
));
StatItem.displayName = "StatItem";

const FreelancerAvatar = memo(({ name, size = "md" }) => {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("") || "?";
  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  };
  return (
    <div
      className={`${sizes[size]} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25 shrink-0`}
    >
      {initials}
    </div>
  );
});
FreelancerAvatar.displayName = "FreelancerAvatar";

// Message Modal
const MessageModal = memo(
  ({ show, freelancerName, message, setMessage, onSubmit, onClose }) => (
    <AnimatePresence>
      {show && (
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
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Send Message
                  </h2>
                  <p className="text-xs text-gray-500">To {freelancerName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/80 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400 leading-relaxed"
                placeholder="Type your message..."
                required
              />
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ),
);
MessageModal.displayName = "MessageModal";

// Proposal Card (List)
const ProposalCard = memo(
  ({ proposal, freelancer, onSelect, onAccept, onShortlist, onReject }) => {
    const config = statusConfig[proposal.status] || statusConfig.pending;

    return (
      <motion.div
        variants={itemVariants}
        layout
        className="group bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300"
      >
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="relative">
            <FreelancerAvatar name={proposal.freelancerName} />
            {proposal.status === "accepted" && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                    {proposal.freelancerName}
                  </h3>
                  {freelancer?.rating >= 4.8 && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[10px] font-bold">
                      <Award className="w-3 h-3" />
                      Top Rated
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {freelancer?.title}
                </p>
              </div>
              <StatusBadge status={proposal.status} />
            </div>

            {/* Job Reference */}
            <div className="flex items-center gap-1.5 mb-3 px-3 py-1.5 bg-blue-50/80 rounded-lg w-fit">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs font-medium text-blue-700 truncate max-w-[250px]">
                {proposal.jobTitle}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-gray-500 mb-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CircleDollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-bold text-gray-900">
                  ${proposal.bid?.toLocaleString()}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold text-gray-700">
                  {proposal.deliveryTime}
                </span>
              </span>
              {freelancer && (
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-gray-700">
                    {freelancer.rating}
                  </span>
                </span>
              )}
            </div>

            {/* Cover Letter Preview */}
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {proposal.coverLetter}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-50">
              <ActionButton
                icon={Eye}
                label="View Details"
                variant="primary"
                size="sm"
                onClick={() => onSelect(proposal)}
              />
              {proposal.status === "pending" && (
                <>
                  <ActionButton
                    icon={CheckCircle}
                    label="Accept"
                    variant="success"
                    size="sm"
                    onClick={() => onAccept(proposal.id)}
                  />
                  <ActionButton
                    icon={Star}
                    label="Shortlist"
                    variant="info"
                    size="sm"
                    onClick={() => onShortlist(proposal.id)}
                  />
                  <ActionButton
                    icon={XCircle}
                    label="Reject"
                    variant="danger"
                    size="sm"
                    onClick={() => onReject(proposal.id)}
                  />
                </>
              )}
              {proposal.status === "shortlisted" && (
                <>
                  <ActionButton
                    icon={CheckCircle}
                    label="Accept"
                    variant="success"
                    size="sm"
                    onClick={() => onAccept(proposal.id)}
                  />
                  <ActionButton
                    icon={XCircle}
                    label="Reject"
                    variant="danger"
                    size="sm"
                    onClick={() => onReject(proposal.id)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);
ProposalCard.displayName = "ProposalCard";

// Proposal Detail View
const ProposalDetailView = memo(
  ({
    proposal,
    freelancer,
    job,
    onBack,
    onAccept,
    onReject,
    onShortlist,
    onMessage,
  }) => {
    const config = statusConfig[proposal.status] || statusConfig.pending;

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
            Back to Proposals
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Proposal Header */}
            <SectionCard
              icon={FileText}
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
              title={proposal.jobTitle}
              action={<StatusBadge status={proposal.status} />}
            >
              <p className="text-sm text-gray-500 -mt-2 mb-5">
                Proposal from{" "}
                <span className="font-semibold text-gray-700">
                  {proposal.freelancerName}
                </span>
              </p>

              {/* Bid & Delivery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="relative overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.06] transform translate-x-3 -translate-y-3">
                    <DollarSign className="w-full h-full" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CircleDollarSign className="w-3.5 h-3.5" />
                    Bid Amount
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ${proposal.bid?.toLocaleString()}
                  </p>
                </div>
                <div className="relative overflow-hidden p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.06] transform translate-x-3 -translate-y-3">
                    <Clock className="w-full h-full" />
                  </div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    Delivery Time
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {proposal.deliveryTime}
                  </p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  Cover Letter
                </h3>
                <div className="p-4 sm:p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {proposal.coverLetter}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-100">
                {(proposal.status === "pending" ||
                  proposal.status === "shortlisted") && (
                  <>
                    <ActionButton
                      icon={CheckCircle}
                      label="Accept Proposal"
                      variant="success"
                      onClick={() => onAccept(proposal.id)}
                    />
                    {proposal.status === "pending" && (
                      <ActionButton
                        icon={Star}
                        label="Shortlist"
                        variant="info"
                        onClick={() => onShortlist(proposal.id)}
                      />
                    )}
                    <ActionButton
                      icon={XCircle}
                      label="Reject"
                      variant="danger"
                      onClick={() => onReject(proposal.id)}
                    />
                  </>
                )}
                <ActionButton
                  icon={MessageSquare}
                  label="Message"
                  variant="ghost"
                  onClick={onMessage}
                />
              </div>
            </SectionCard>

            {/* Job Details */}
            {job && (
              <SectionCard
                icon={Briefcase}
                iconColor="text-violet-600"
                iconBg="bg-violet-100"
                title="Job Details"
                subtitle="Original job posting"
              >
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills?.map((skill) => (
                    <SkillChip key={skill} skill={skill} />
                  ))}
                </div>
              </SectionCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5 order-first lg:order-last">
            <div className="lg:sticky lg:top-6 space-y-5">
              {/* Freelancer Profile */}
              {freelancer && (
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <UserCheck className="w-4.5 h-4.5 text-blue-600" />
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                      Freelancer
                    </h3>
                  </div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="relative">
                      <FreelancerAvatar name={freelancer.name} size="lg" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                        <BadgeCheck className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">
                        {freelancer.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {freelancer.title}
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-50">
                    <StatItem
                      icon={Star}
                      iconColor="text-amber-500"
                      label="Rating"
                      value={
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {freelancer.rating}{" "}
                          <span className="text-gray-400 font-normal">
                            ({freelancer.reviews})
                          </span>
                        </span>
                      }
                    />
                    <StatItem
                      icon={Briefcase}
                      iconColor="text-emerald-500"
                      label="Jobs Completed"
                      value={freelancer.completedJobs}
                    />
                    <StatItem
                      icon={DollarSign}
                      iconColor="text-blue-500"
                      label="Hourly Rate"
                      value={`$${freelancer.hourlyRate}/hr`}
                    />
                    <StatItem
                      icon={MapPin}
                      iconColor="text-red-500"
                      label="Location"
                      value={freelancer.location}
                    />
                  </div>

                  <Link
                    to={`/freelancers/${freelancer.id}`}
                    className="flex items-center justify-center gap-2 w-full mt-5 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 transition-all group"
                  >
                    <Eye className="w-4 h-4" />
                    View Full Profile
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              )}

              {/* Proposal Tips */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900 text-sm">
                    Review Tips
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-blue-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    Review the freelancer's portfolio and past work
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    Compare bids and delivery times carefully
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    Message freelancers to clarify any questions
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    Shortlist your favorites before making a decision
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  },
);
ProposalDetailView.displayName = "ProposalDetailView";

// ─── Main Component ──────────────────────────────────────────────────

const ClientProposals = () => {
  const [proposals, setProposals] = useState(demoProposals);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  const filteredProposals = useMemo(() => {
    let result = proposals;
    if (filter !== "all") {
      result = result.filter((p) => p.status === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.freelancerName?.toLowerCase().includes(q) ||
          p.jobTitle?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [proposals, filter, searchQuery]);

  const proposalCounts = useMemo(
    () => ({
      all: proposals.length,
      pending: proposals.filter((p) => p.status === "pending").length,
      shortlisted: proposals.filter((p) => p.status === "shortlisted").length,
      accepted: proposals.filter((p) => p.status === "accepted").length,
      rejected: proposals.filter((p) => p.status === "rejected").length,
    }),
    [proposals],
  );

  const getFreelancer = useCallback(
    (id) => demoFreelancers.find((f) => f.id === id),
    [],
  );

  const getJob = useCallback((id) => demoJobs.find((j) => j.id === id), []);

  const handleAccept = useCallback((proposalId) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: "accepted" } : p)),
    );
    setSelectedProposal((prev) =>
      prev?.id === proposalId ? { ...prev, status: "accepted" } : prev,
    );
    toast.success("Proposal accepted! The freelancer has been notified.");
  }, []);

  const handleReject = useCallback((proposalId) => {
    if (window.confirm("Are you sure you want to reject this proposal?")) {
      setProposals((prev) =>
        prev.map((p) =>
          p.id === proposalId ? { ...p, status: "rejected" } : p,
        ),
      );
      setSelectedProposal((prev) =>
        prev?.id === proposalId ? { ...prev, status: "rejected" } : prev,
      );
      toast.success("Proposal rejected");
    }
  }, []);

  const handleShortlist = useCallback((proposalId) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId ? { ...p, status: "shortlisted" } : p,
      ),
    );
    setSelectedProposal((prev) =>
      prev?.id === proposalId ? { ...prev, status: "shortlisted" } : prev,
    );
    toast.success("Freelancer shortlisted");
  }, []);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!message.trim()) return;
      toast.success("Message sent to freelancer!");
      setShowMessageModal(false);
      setMessage("");
    },
    [message],
  );

  // ── Detail View ────────────────────────────────────────────────────
  if (selectedProposal) {
    const freelancer = getFreelancer(selectedProposal.freelancerId);
    const job = getJob(selectedProposal.jobId);

    return (
      <>
        <ProposalDetailView
          proposal={selectedProposal}
          freelancer={freelancer}
          job={job}
          onBack={() => setSelectedProposal(null)}
          onAccept={handleAccept}
          onReject={handleReject}
          onShortlist={handleShortlist}
          onMessage={() => setShowMessageModal(true)}
        />
        <MessageModal
          show={showMessageModal}
          freelancerName={selectedProposal.freelancerName}
          message={message}
          setMessage={setMessage}
          onSubmit={handleSendMessage}
          onClose={() => {
            setShowMessageModal(false);
            setMessage("");
          }}
        />
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
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Inbox className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Proposals Received
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {proposals.length} total proposals across all jobs
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        {[
          {
            label: "Pending",
            count: proposalCounts.pending,
            icon: Clock,
            color: "amber",
          },
          {
            label: "Shortlisted",
            count: proposalCounts.shortlisted,
            icon: Star,
            color: "blue",
          },
          {
            label: "Accepted",
            count: proposalCounts.accepted,
            icon: CheckCircle,
            color: "emerald",
          },
          {
            label: "Rejected",
            count: proposalCounts.rejected,
            icon: XCircle,
            color: "red",
          },
        ].map((stat) => {
          const colorMap = {
            amber: {
              bg: "bg-amber-50",
              icon: "text-amber-600",
              text: "text-amber-700",
              gradient: "from-amber-400 to-orange-500",
            },
            blue: {
              bg: "bg-blue-50",
              icon: "text-blue-600",
              text: "text-blue-700",
              gradient: "from-blue-400 to-indigo-500",
            },
            emerald: {
              bg: "bg-emerald-50",
              icon: "text-emerald-600",
              text: "text-emerald-700",
              gradient: "from-emerald-400 to-teal-500",
            },
            red: {
              bg: "bg-red-50",
              icon: "text-red-600",
              text: "text-red-700",
              gradient: "from-red-400 to-rose-500",
            },
          };
          const c = colorMap[stat.color];
          return (
            <div
              key={stat.label}
              className={`${c.bg} border border-gray-100 rounded-2xl p-3.5 sm:p-4 group hover:shadow-sm transition-all`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${c.gradient} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                {stat.count}
              </p>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 shadow-sm mb-6 space-y-3"
      >
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by freelancer name or job title..."
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
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.value;
            const count = proposalCounts[tab.value];
            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25"
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

      {/* Proposals List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredProposals.map((proposal) => {
            const freelancer = getFreelancer(proposal.freelancerId);
            return (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                freelancer={freelancer}
                onSelect={setSelectedProposal}
                onAccept={handleAccept}
                onShortlist={handleShortlist}
                onReject={handleReject}
              />
            );
          })}
        </AnimatePresence>

        {filteredProposals.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Inbox className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No proposals found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {searchQuery
                ? `No proposals matching "${searchQuery}". Try a different search.`
                : "Proposals from freelancers will appear here when they apply to your jobs."}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ClientProposals;
