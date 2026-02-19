import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { demoProposals, demoJobs } from "../../../data/demoData";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Search,
  Send,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  FileText,
  Calendar,
  MoreVertical,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Trash2,
  ExternalLink,
  User,
  MapPin,
  Star,
  Tag,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  Award,
  Briefcase,
  ArrowRight,
  Filter,
  Package,
  CircleDot,
  Timer,
  HandshakeIcon,
  Ban,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-500/20",
    icon: Clock,
    dot: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
  },
  accepted: {
    label: "Accepted",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-500/20",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
    gradient: "from-emerald-500 to-emerald-600",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-500/20",
    icon: XCircle,
    dot: "bg-red-500",
    gradient: "from-red-500 to-rose-600",
  },
  interviewing: {
    label: "Interviewing",
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-500/20",
    icon: MessageSquare,
    dot: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
};

const FILTER_OPTIONS = [
  { key: "all", label: "All", icon: Package },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "accepted", label: "Accepted", icon: CheckCircle2 },
  { key: "interviewing", label: "Interview", icon: MessageSquare },
  { key: "rejected", label: "Rejected", icon: XCircle },
];

const StatCard = ({ icon: Icon, label, value, gradient, textColor }) => (
  <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3.5 sm:p-4 lg:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p
          className={`text-xl sm:text-2xl font-bold tracking-tight ${textColor}`}
        >
          {value}
        </p>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
          {label}
        </p>
      </div>
    </div>
  </div>
);

const WithdrawModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
            Withdraw Proposal
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
            Are you sure you want to withdraw your proposal for{" "}
            <span className="font-semibold text-slate-700">"{title}"</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-2.5 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/25 transition-all active:scale-[0.98]"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProposalDetailView = ({ proposal, job, onBack, onWithdraw }) => {
  const statusInfo = STATUS_CONFIG[proposal.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Proposals
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          {/* Proposal Details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="p-4 sm:p-5 lg:p-6 border-b border-slate-100 bg-slate-50/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate">
                    {proposal.jobTitle}
                  </h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg ring-1 ring-inset ${statusInfo.bg} ${statusInfo.text} ${statusInfo.ring}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusInfo.label}
                    </span>
                    {proposal.clientViewed && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <Eye className="w-3 h-3" />
                        Viewed by client
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 lg:p-6 space-y-5 sm:space-y-6">
              {/* Bid & Delivery */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Your Bid
                    </p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    ${proposal.bid.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Delivery Time
                    </p>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">
                    {proposal.deliveryTime}
                  </p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Cover Letter
                  </h3>
                </div>
                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {proposal.coverLetter}
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Submitted{" "}
                  {new Date(proposal.submittedAt).toLocaleDateString()}
                </span>
                {proposal.clientViewed && (
                  <span className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Client viewed
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          {job && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-4 sm:p-5 lg:p-6 border-b border-slate-100 bg-slate-50/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Briefcase className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Job Details
                  </h2>
                </div>
              </div>
              <div className="p-4 sm:p-5 lg:p-6">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {job.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-medium rounded-lg ring-1 ring-inset ring-blue-500/20"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-5">
          {/* Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Quick Actions
              </h3>
            </div>
            <div className="space-y-2.5">
              {proposal.status === "accepted" && (
                <Link
                  to="/dashboard/messages"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message Client
                </Link>
              )}
              {proposal.status === "pending" && (
                <button
                  onClick={() => onWithdraw(proposal)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100 hover:bg-red-100 transition-all active:scale-[0.98]"
                >
                  <Ban className="w-4 h-4" />
                  Withdraw Proposal
                </button>
              )}
              <Link
                to={`/jobs/${proposal.jobId}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all active:scale-[0.98]"
              >
                <ExternalLink className="w-4 h-4" />
                View Job Listing
              </Link>
            </div>
          </div>

          {/* Client Info */}
          {job && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Client
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0">
                  {job.client?.name?.[0] || "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {job.client?.name}
                  </p>
                  {job.client?.location && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {job.client.location}
                    </p>
                  )}
                  {job.client?.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-slate-600 font-medium">
                        {job.client.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Status Timeline */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <CircleDot className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Timeline
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Proposal Submitted
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {new Date(proposal.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {proposal.clientViewed && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Viewed by Client
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Client reviewed your proposal
                    </p>
                  </div>
                </div>
              )}
              {proposal.status === "accepted" && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-700">
                      Proposal Accepted
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Client accepted your bid
                    </p>
                  </div>
                </div>
              )}
              {proposal.status === "rejected" && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-700">
                      Proposal Declined
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Client chose another freelancer
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProposalCard = ({ proposal, onSelect, onWithdraw }) => {
  const statusInfo = STATUS_CONFIG[proposal.status] || STATUS_CONFIG.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
      <div className="p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-lg ring-1 ring-inset ${statusInfo.bg} ${statusInfo.text} ${statusInfo.ring}`}
              >
                <StatusIcon className="w-3 h-3" />
                {statusInfo.label}
              </span>
              {proposal.clientViewed && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-600">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">Viewed</span>
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {proposal.jobTitle}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Bid & Delivery */}
        <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-slate-500">Bid:</span>
            <span className="font-bold text-slate-900">
              ${proposal.bid.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-slate-500">Delivery:</span>
            <span className="font-bold text-slate-900">
              {proposal.deliveryTime}
            </span>
          </div>
        </div>

        {/* Cover Letter Preview */}
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-4">
          {proposal.coverLetter}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-3 sm:pt-4 border-t border-slate-100">
          <button
            onClick={() => onSelect(proposal)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>
          {proposal.status === "accepted" && (
            <Link
              to="/dashboard/messages"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-semibold rounded-xl border border-emerald-100 hover:bg-emerald-100 transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Message</span>
            </Link>
          )}
          {proposal.status === "pending" && (
            <button
              onClick={() => onWithdraw(proposal)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-red-50 text-red-600 text-xs sm:text-sm font-semibold rounded-xl border border-red-100 hover:bg-red-100 transition-all active:scale-[0.98]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Withdraw</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Proposals = () => {
  const [proposals, setProposals] = useState(demoProposals);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [withdrawTarget, setWithdrawTarget] = useState(null);

  const filteredProposals = useMemo(() => {
    let result = proposals;
    if (filter !== "all") {
      result = result.filter((p) => p.status === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.jobTitle?.toLowerCase().includes(q) ||
          p.coverLetter?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [proposals, filter, searchQuery]);

  const stats = useMemo(
    () => ({
      total: proposals.length,
      pending: proposals.filter((p) => p.status === "pending").length,
      accepted: proposals.filter((p) => p.status === "accepted").length,
      rejected: proposals.filter((p) => p.status === "rejected").length,
    }),
    [proposals],
  );

  const filterCounts = useMemo(() => {
    const counts = { all: proposals.length };
    proposals.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, [proposals]);

  const handleWithdrawConfirm = useCallback(() => {
    if (withdrawTarget) {
      setProposals((prev) => prev.filter((p) => p.id !== withdrawTarget.id));
      if (selectedProposal?.id === withdrawTarget.id) {
        setSelectedProposal(null);
      }
      setWithdrawTarget(null);
      toast.success("Proposal withdrawn successfully!", {
        icon: "📋",
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
        },
      });
    }
  }, [withdrawTarget, selectedProposal]);

  const getJobDetails = useCallback(
    (jobId) => demoJobs.find((j) => j.id === jobId),
    [],
  );

  // Detail View
  if (selectedProposal) {
    const job = getJobDetails(selectedProposal.jobId);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <ProposalDetailView
            proposal={selectedProposal}
            job={job}
            onBack={() => setSelectedProposal(null)}
            onWithdraw={(p) => setWithdrawTarget(p)}
          />
          <WithdrawModal
            isOpen={!!withdrawTarget}
            onClose={() => setWithdrawTarget(null)}
            onConfirm={handleWithdrawConfirm}
            title={withdrawTarget?.jobTitle}
          />
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                My Proposals
              </h1>
              <Send className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500">
              Track and manage your submitted proposals.
            </p>
          </div>
          <Link to="/jobs">
            <button className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]">
              <Sparkles className="w-4 h-4" />
              Browse Jobs
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <StatCard
            icon={FileText}
            label="Total Proposals"
            value={stats.total}
            gradient="from-blue-500 to-blue-600"
            textColor="text-slate-900"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={stats.pending}
            gradient="from-amber-500 to-orange-500"
            textColor="text-amber-600"
          />
          <StatCard
            icon={CheckCircle2}
            label="Accepted"
            value={stats.accepted}
            gradient="from-emerald-500 to-emerald-600"
            textColor="text-emerald-600"
          />
          <StatCard
            icon={XCircle}
            label="Rejected"
            value={stats.rejected}
            gradient="from-red-500 to-rose-600"
            textColor="text-red-600"
          />
        </div>

        {/* Success Rate Banner */}
        {stats.total > 0 && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Acceptance Rate
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {stats.total > 0
                      ? `${Math.round((stats.accepted / stats.total) * 100)}% of your proposals get accepted`
                      : "Submit proposals to see your success rate"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {stats.total > 0
                      ? `${Math.round((stats.accepted / stats.total) * 100)}%`
                      : "—"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    Success
                  </p>
                </div>
                <div className="hidden sm:block w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                    style={{
                      width: `${stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5 sm:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search proposals..."
                className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {FILTER_OPTIONS.map((option) => {
              const isActive = filter === option.key;
              const count = filterCounts[option.key] || 0;
              return (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <option.icon className="w-3.5 h-3.5" />
                  {option.label}
                  <span
                    className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] sm:text-xs font-bold rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Proposals List */}
        {filteredProposals.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onSelect={setSelectedProposal}
                onWithdraw={(p) => setWithdrawTarget(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-5">
                <Send className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {searchQuery || filter !== "all"
                  ? "No proposals found"
                  : "No proposals yet"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
                {searchQuery || filter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Start browsing jobs and submit your first proposal to get hired!"}
              </p>
              {searchQuery || filter !== "all" ? (
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Clear Filters
                </button>
              ) : (
                <Link to="/jobs">
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]">
                    <Sparkles className="w-4 h-4" />
                    Browse Jobs
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        {filteredProposals.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 px-4 sm:px-5 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {filteredProposals.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700">
                  {proposals.length}
                </span>{" "}
                proposals
              </p>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
              >
                Submit New Proposal
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={!!withdrawTarget}
        onClose={() => setWithdrawTarget(null)}
        onConfirm={handleWithdrawConfirm}
        title={withdrawTarget?.jobTitle}
      />
    </div>
  );
};

export default Proposals;
