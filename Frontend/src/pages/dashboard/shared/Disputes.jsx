import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Upload,
  ChevronLeft,
  Filter,
  Search,
  User,
  DollarSign,
  Calendar,
  ArrowRight,
  X,
  Shield,
  Zap,
  Scale,
  Send,
  Paperclip,
  Download,
  Eye,
  Phone,
  ArrowUpRight,
  Layers,
  Flag,
  Hash,
  ExternalLink,
  ChevronDown,
  Flame,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

const demoDisputes = [
  {
    id: "d1",
    projectId: "p1",
    projectTitle: "E-commerce Website Redesign",
    type: "payment",
    status: "open",
    priority: "high",
    amount: 1250,
    createdAt: "2024-03-01T10:00:00",
    updatedAt: "2024-03-02T14:30:00",
    reason: "Client refuses to release payment despite completed milestone",
    description:
      "I have completed all deliverables for the Frontend Development milestone as specified in the contract. The client has been unresponsive for 5 days after submission and has not released the escrow payment.",
    otherParty: { id: "c1", name: "TechCorp Inc.", role: "client" },
    messages: 3,
    attachments: 2,
  },
  {
    id: "d2",
    projectId: "p2",
    projectTitle: "Mobile App Development",
    type: "scope",
    status: "in_review",
    priority: "medium",
    amount: 2000,
    createdAt: "2024-02-25T09:00:00",
    updatedAt: "2024-03-01T11:00:00",
    reason: "Client requesting features outside original scope",
    description:
      "The client is requesting additional features that were not part of the original project scope and refusing to pay for the extra work.",
    otherParty: { id: "c2", name: "StartupXYZ", role: "client" },
    messages: 8,
    attachments: 5,
  },
  {
    id: "d3",
    projectId: "p3",
    projectTitle: "Brand Identity Design",
    type: "quality",
    status: "resolved",
    priority: "low",
    amount: 500,
    createdAt: "2024-02-15T14:00:00",
    updatedAt: "2024-02-20T16:00:00",
    resolvedAt: "2024-02-20T16:00:00",
    resolution: "Partial refund of $250 issued to client",
    reason: "Quality of deliverables not matching expectations",
    description:
      "Client claimed the logo designs did not meet the quality standards discussed. After mediation, a partial refund was agreed upon.",
    otherParty: { id: "c3", name: "Creative Studio", role: "client" },
    messages: 12,
    attachments: 8,
  },
];

const statusConfig = {
  open: {
    label: "Open",
    color: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    icon: AlertTriangle,
    gradient: "from-red-500 to-rose-500",
  },
  in_review: {
    label: "In Review",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
  },
  resolved: {
    label: "Resolved",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-green-500",
  },
  closed: {
    label: "Closed",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    dotColor: "bg-gray-400",
    icon: XCircle,
    gradient: "from-gray-400 to-gray-500",
  },
};

const typeConfig = {
  payment: {
    label: "Payment Issue",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: DollarSign,
  },
  scope: {
    label: "Scope Dispute",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    icon: Layers,
  },
  quality: {
    label: "Quality Concern",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: Eye,
  },
  communication: {
    label: "Communication",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: MessageSquare,
  },
  deadline: {
    label: "Deadline Issue",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: Clock,
  },
};

const priorityConfig = {
  low: {
    label: "Low",
    color: "text-gray-600",
    bg: "bg-gray-50 border-gray-200",
    dot: "bg-gray-400",
  },
  medium: {
    label: "Medium",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
  },
  high: {
    label: "High",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    dot: "bg-red-500",
  },
};

const Disputes = () => {
  const [disputes] = useState(demoDisputes);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showNewDisputeModal, setShowNewDisputeModal] = useState(false);
  const [newDispute, setNewDispute] = useState({
    projectId: "",
    type: "payment",
    reason: "",
    description: "",
    amount: "",
  });
  const [newMessage, setNewMessage] = useState("");

  const filteredDisputes = useMemo(
    () =>
      disputes.filter((dispute) => {
        const matchesFilter = filter === "all" || dispute.status === filter;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          dispute.projectTitle.toLowerCase().includes(q) ||
          dispute.reason.toLowerCase().includes(q) ||
          dispute.otherParty.name.toLowerCase().includes(q);
        return matchesFilter && matchesSearch;
      }),
    [disputes, filter, searchQuery],
  );

  const stats = useMemo(
    () => ({
      open: disputes.filter((d) => d.status === "open").length,
      inReview: disputes.filter((d) => d.status === "in_review").length,
      resolved: disputes.filter((d) => d.status === "resolved").length,
      totalAmount: disputes.reduce((sum, d) => sum + d.amount, 0),
    }),
    [disputes],
  );

  const handleCreateDispute = useCallback((e) => {
    e.preventDefault();
    toast.success(
      "📋 Dispute submitted! Our team will review within 24-48 hours.",
      {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      },
    );
    setShowNewDisputeModal(false);
    setNewDispute({
      projectId: "",
      type: "payment",
      reason: "",
      description: "",
      amount: "",
    });
  }, []);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim()) return;
      toast.success("💬 Message sent to dispute resolution team", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
      setNewMessage("");
    },
    [newMessage],
  );

  const handleUploadEvidence = useCallback(() => {
    toast.success("📎 Select files to upload as evidence", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  // ─── DISPUTE DETAIL VIEW ───
  if (selectedDispute) {
    const status = statusConfig[selectedDispute.status];
    const type = typeConfig[selectedDispute.type];
    const priority = priorityConfig[selectedDispute.priority];
    const StatusIcon = status.icon;
    const TypeIcon = type.icon;
    const isActive =
      selectedDispute.status !== "resolved" &&
      selectedDispute.status !== "closed";

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8  sm:py-6 ">
          {/* Back Header */}
          <div className="mb-6">
            <button
              onClick={() => setSelectedDispute(null)}
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Disputes
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${status.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <StatusIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-900 truncate">
                      Dispute #{selectedDispute.id.toUpperCase()}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${status.color}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dotColor} animate-pulse`}
                      />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {selectedDispute.projectTitle}
                  </p>
                </div>
              </div>

              {isActive && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      toast.success("📞 Requesting mediation call...", {
                        style: {
                          borderRadius: "12px",
                          background: "#1F2937",
                          color: "#fff",
                        },
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Request Mediation</span>
                    <span className="sm:hidden">Mediate</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-5">
              {/* Dispute Details Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <h2 className="flex items-center gap-2 font-bold text-gray-900">
                    <Scale className="w-5 h-5 text-blue-600" />
                    Dispute Details
                  </h2>
                </div>
                <div className="p-5 sm:p-6 space-y-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                      Reason
                    </label>
                    <p className="font-semibold text-gray-900 mt-1 leading-relaxed">
                      {selectedDispute.reason}
                    </p>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                      Description
                    </label>
                    <p className="text-gray-600 mt-1 leading-relaxed text-sm">
                      {selectedDispute.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
                    {[
                      {
                        label: "Type",
                        content: (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${type.color}`}
                          >
                            <TypeIcon className="w-3 h-3" />
                            {type.label}
                          </span>
                        ),
                      },
                      {
                        label: "Amount",
                        content: (
                          <span className="text-lg font-extrabold text-gray-900">
                            ${selectedDispute.amount.toLocaleString()}
                          </span>
                        ),
                      },
                      {
                        label: "Priority",
                        content: (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${priority.bg}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}
                            />
                            <span className={priority.color}>
                              {priority.label}
                            </span>
                          </span>
                        ),
                      },
                      {
                        label: "Filed On",
                        content: (
                          <span className="text-sm font-semibold text-gray-900">
                            {new Date(
                              selectedDispute.createdAt,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        ),
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50/80 rounded-xl p-3 border border-gray-100"
                      >
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mb-2">
                          {item.label}
                        </label>
                        {item.content}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resolution Banner */}
              {selectedDispute.status === "resolved" &&
                selectedDispute.resolution && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-800 mb-1">
                          Resolution
                        </h3>
                        <p className="text-emerald-700 text-sm leading-relaxed">
                          {selectedDispute.resolution}
                        </p>
                        <p className="text-xs text-emerald-500 mt-2 font-medium">
                          Resolved on{" "}
                          {new Date(
                            selectedDispute.resolvedAt,
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Communication */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100">
                  <h2 className="flex items-center gap-2 font-bold text-gray-900">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Communication
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Messages with the dispute resolution team
                  </p>
                </div>
                <div className="p-4 sm:p-5 bg-gradient-to-b from-gray-50 to-white min-h-[200px]">
                  <div className="space-y-4">
                    {[
                      {
                        initials: "Y",
                        name: "You",
                        color: "bg-blue-500",
                        message:
                          "I've submitted all evidence regarding the completed work. Please review the attached screenshots and commit history.",
                        time: "2 hours ago",
                        isYou: true,
                      },
                      {
                        initials: "M",
                        name: "Mediator",
                        color: "bg-gray-800",
                        message:
                          "Thank you for submitting the evidence. Our team is currently reviewing your case. We will update you within 24-48 hours.",
                        time: "1 hour ago",
                        isYou: false,
                      },
                    ].map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.isYou ? "" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 ${msg.color} rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                        >
                          {msg.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-900 leading-relaxed">
                              {msg.message}
                            </p>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-1.5 px-1 font-medium">
                            {msg.name} · {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {isActive && (
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 sm:p-5 border-t border-gray-100"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-200 active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Evidence */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="flex items-center gap-2 font-bold text-gray-900">
                      <Paperclip className="w-5 h-5 text-blue-600" />
                      Evidence & Attachments
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedDispute.attachments} files attached
                    </p>
                  </div>
                  {isActive && (
                    <button
                      onClick={handleUploadEvidence}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">Upload</span>
                    </button>
                  )}
                </div>
                <div className="p-4 sm:p-5 space-y-3">
                  {[
                    {
                      name: "milestone-deliverables.zip",
                      size: "4.2 MB",
                      date: "Mar 1, 2024",
                      icon: "📦",
                    },
                    {
                      name: "communication-screenshots.pdf",
                      size: "1.8 MB",
                      date: "Mar 1, 2024",
                      icon: "📸",
                    },
                  ].map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-lg flex-shrink-0">
                          {file.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.size} · {file.date}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex-shrink-0 ml-3">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Other Party */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                    <User className="w-4 h-4 text-blue-600" />
                    Other Party
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                      {selectedDispute.otherParty.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedDispute.otherParty.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize font-medium">
                        {selectedDispute.otherParty.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/freelancers/${selectedDispute.otherParty.id}`}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Related Project */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Related Project
                  </h3>
                  <p className="font-semibold text-gray-900 mb-3 text-sm leading-relaxed">
                    {selectedDispute.projectTitle}
                  </p>
                  <Link
                    to={`/dashboard/projects/${selectedDispute.projectId}`}
                    className="flex items-center gap-1.5 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors group"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Actions */}
              {isActive && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                      <Zap className="w-4 h-4 text-blue-600" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2.5">
                      <button
                        onClick={() =>
                          toast.success("⚡ Escalation request submitted", {
                            style: {
                              borderRadius: "12px",
                              background: "#1F2937",
                              color: "#fff",
                            },
                          })
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-50 text-sm font-medium transition-all"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        Escalate Dispute
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to withdraw this dispute?",
                            )
                          ) {
                            toast.success("Dispute withdrawn", {
                              style: {
                                borderRadius: "12px",
                                background: "#1F2937",
                                color: "#fff",
                              },
                            });
                            setSelectedDispute(null);
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-sm font-medium transition-all"
                      >
                        <X className="w-4 h-4" />
                        Withdraw Dispute
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6">
                  <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Timeline
                  </h3>
                  <div className="relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />
                    <div className="space-y-5">
                      {[
                        {
                          label: "Dispute Filed",
                          time: selectedDispute.createdAt,
                          color: "bg-blue-500",
                          ring: "ring-blue-100",
                        },
                        {
                          label: "Under Review",
                          time: selectedDispute.updatedAt,
                          color: "bg-amber-500",
                          ring: "ring-amber-100",
                        },
                        ...(selectedDispute.resolvedAt
                          ? [
                              {
                                label: "Resolved",
                                time: selectedDispute.resolvedAt,
                                color: "bg-emerald-500",
                                ring: "ring-emerald-100",
                              },
                            ]
                          : []),
                      ].map((event, idx) => (
                        <div key={idx} className="flex gap-4 relative">
                          <div
                            className={`w-3.5 h-3.5 ${event.color} rounded-full ring-4 ${event.ring} flex-shrink-0 mt-0.5 z-10`}
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {event.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {new Date(event.time).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
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
  }

  // ─── DISPUTES LIST VIEW ───
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 scroll-pt-3.5m:py-6 ">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 via-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
                  <Scale className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Disputes
                </h1>
                <p className="text-gray-500 mt-0.5 text-sm">
                  Manage and track your dispute cases
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNewDisputeModal(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-200 hover:shadow-xl hover:from-red-700 hover:to-rose-700 transition-all active:scale-[0.98]"
            >
              <AlertTriangle className="w-4 h-4" />
              File Dispute
            </button>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="relative mb-6 sm:mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="relative p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[
                {
                  icon: AlertTriangle,
                  value: stats.open,
                  label: "Open",
                  sublabel: "Need attention",
                  color: "from-red-400 to-rose-400",
                },
                {
                  icon: Clock,
                  value: stats.inReview,
                  label: "In Review",
                  sublabel: "Being processed",
                  color: "from-amber-400 to-orange-400",
                },
                {
                  icon: CheckCircle,
                  value: stats.resolved,
                  label: "Resolved",
                  sublabel: "Successfully closed",
                  color: "from-emerald-400 to-green-400",
                },
                {
                  icon: DollarSign,
                  value: `$${stats.totalAmount.toLocaleString()}`,
                  label: "Total Disputed",
                  sublabel: "All cases",
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
                    <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-0.5 tracking-tight">
                      {stat.value}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 hidden sm:block">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 sm:mb-6 overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search disputes by project, reason, or party..."
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all placeholder:text-gray-400"
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

          <div className="p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {[
                { id: "all", label: "All", icon: Layers },
                { id: "open", label: "Open", icon: AlertTriangle },
                { id: "in_review", label: "In Review", icon: Clock },
                { id: "resolved", label: "Resolved", icon: CheckCircle },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === f.id
                      ? "bg-red-50 text-red-700 shadow-inner ring-1 ring-red-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <f.icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
              <span className="font-semibold text-gray-900">
                {filteredDisputes.length}
              </span>{" "}
              results
            </div>
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {filteredDisputes.map((dispute, index) => {
            const status = statusConfig[dispute.status];
            const type = typeConfig[dispute.type];
            const priority = priorityConfig[dispute.priority];
            const TypeIcon = type.icon;

            return (
              <div
                key={dispute.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-100/40 hover:border-red-200 cursor-pointer"
                onClick={() => setSelectedDispute(dispute)}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className={`h-1 bg-gradient-to-r ${status.gradient}`} />
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Top: Badges + Amount */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${type.color}`}
                        >
                          <TypeIcon className="w-3 h-3" />
                          {type.label}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${status.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${status.dotColor} animate-pulse`}
                          />
                          {status.label}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${priority.bg}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}
                          />
                          <span className={priority.color}>
                            {priority.label}
                          </span>
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight group-hover:text-red-600 transition-colors">
                        {dispute.reason}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{dispute.projectTitle}</span>
                      </p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <p className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                        ${dispute.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {dispute.description}
                  </p>

                  {/* Footer Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                      {[
                        {
                          icon: User,
                          text: dispute.otherParty.name,
                          color: "text-blue-600 bg-blue-50",
                        },
                        {
                          icon: MessageSquare,
                          text: `${dispute.messages}`,
                          color: "text-violet-600 bg-violet-50",
                        },
                        {
                          icon: Paperclip,
                          text: `${dispute.attachments}`,
                          color: "text-amber-600 bg-amber-50",
                        },
                      ].map((meta, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${meta.color}`}
                        >
                          <meta.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {meta.text}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(dispute.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <ChevronLeft className="w-4 h-4 rotate-180 text-gray-300 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredDisputes.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Scale className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No disputes found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}". Try different keywords.`
                  : filter === "all"
                    ? "You don't have any disputes yet. That's great!"
                    : `No ${filter.replace("_", " ")} disputes found.`}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {filter !== "all" && (
                  <button
                    onClick={() => setFilter("all")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors text-sm"
                  >
                    <Layers className="w-4 h-4" />
                    View all disputes
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* New Dispute Modal */}
        {showNewDisputeModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setShowNewDisputeModal(false)
            }
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Handle (mobile) */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="p-5 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        File a Dispute
                      </h2>
                      <p className="text-xs text-gray-500">
                        We'll review within 24-48 hours
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewDisputeModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={handleCreateDispute}
                className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-140px)]"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Related Project <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newDispute.projectId}
                    onChange={(e) =>
                      setNewDispute({
                        ...newDispute,
                        projectId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all appearance-none"
                    required
                  >
                    <option value="">Select a project</option>
                    <option value="p1">E-commerce Website Redesign</option>
                    <option value="p2">Mobile App Development</option>
                    <option value="p3">Brand Identity Design</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Dispute Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newDispute.type}
                      onChange={(e) =>
                        setNewDispute({ ...newDispute, type: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all appearance-none"
                      required
                    >
                      <option value="payment">💰 Payment Issue</option>
                      <option value="scope">📋 Scope Dispute</option>
                      <option value="quality">🎯 Quality Concern</option>
                      <option value="communication">💬 Communication</option>
                      <option value="deadline">⏰ Deadline Issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Disputed Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        value={newDispute.amount}
                        onChange={(e) =>
                          setNewDispute({
                            ...newDispute,
                            amount: e.target.value,
                          })
                        }
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
                        placeholder="0.00"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Brief Summary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newDispute.reason}
                    onChange={(e) =>
                      setNewDispute({ ...newDispute, reason: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all placeholder:text-gray-400"
                    placeholder="One-line summary of the dispute"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newDispute.description}
                    onChange={(e) =>
                      setNewDispute({
                        ...newDispute,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all placeholder:text-gray-400 resize-none"
                    placeholder="Provide a detailed description of the issue..."
                    required
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <strong>Before filing:</strong> We recommend trying to
                    resolve the issue directly with the other party first.
                    Disputes should be a last resort.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 font-semibold shadow-lg shadow-red-200 hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Submit Dispute
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewDisputeModal(false)}
                    className="flex-1 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Disputes;
