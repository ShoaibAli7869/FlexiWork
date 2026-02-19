import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  PenTool,
  Search,
  Filter,
  Calendar,
  User,
  DollarSign,
  X,
  ArrowUpRight,
  Shield,
  Briefcase,
  TrendingUp,
  Zap,
  ChevronRight,
  MoreHorizontal,
  Hash,
  Timer,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  Layers,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";

const demoContracts = [
  {
    id: "c1",
    projectId: "p1",
    projectTitle: "E-commerce Website Redesign",
    type: "fixed",
    status: "active",
    client: { id: "cl1", name: "TechCorp Inc." },
    freelancer: { id: "f1", name: "Sarah Johnson" },
    amount: 5000,
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    signedAt: "2024-01-30",
    terms: { paymentSchedule: "milestone", revisions: 3, deliveryDays: 45 },
    progress: 65,
  },
  {
    id: "c2",
    projectId: "p2",
    projectTitle: "Mobile App Development",
    type: "hourly",
    status: "active",
    client: { id: "cl2", name: "StartupXYZ" },
    freelancer: { id: "f2", name: "Michael Chen" },
    amount: 12000,
    hourlyRate: 75,
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    signedAt: "2024-01-12",
    terms: {
      paymentSchedule: "weekly",
      maxHoursPerWeek: 40,
      deliveryDays: 105,
    },
    progress: 40,
  },
  {
    id: "c3",
    projectId: "p3",
    projectTitle: "Brand Identity Design",
    type: "fixed",
    status: "completed",
    client: { id: "cl3", name: "Creative Studio" },
    freelancer: { id: "f3", name: "Emily Davis" },
    amount: 2500,
    startDate: "2024-01-10",
    endDate: "2024-02-20",
    signedAt: "2024-01-08",
    completedAt: "2024-02-20",
    terms: { paymentSchedule: "milestone", revisions: 2, deliveryDays: 40 },
    progress: 100,
  },
  {
    id: "c4",
    projectId: "p4",
    projectTitle: "SEO Optimization Campaign",
    type: "fixed",
    status: "pending_signature",
    client: { id: "cl4", name: "Marketing Pro" },
    freelancer: { id: "f4", name: "Alex Turner" },
    amount: 1500,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    terms: { paymentSchedule: "milestone", revisions: 1, deliveryDays: 30 },
    progress: 0,
  },
];

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-green-500",
  },
  pending_signature: {
    label: "Pending Signature",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
  },
  completed: {
    label: "Completed",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
    icon: Award,
    gradient: "from-blue-500 to-indigo-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    icon: AlertCircle,
    gradient: "from-red-500 to-rose-500",
  },
  expired: {
    label: "Expired",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    dotColor: "bg-gray-400",
    icon: AlertCircle,
    gradient: "from-gray-400 to-gray-500",
  },
};

const Contracts = () => {
  const [contracts] = useState(demoContracts);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showContractModal, setShowContractModal] = useState(false);

  const filteredContracts = useMemo(
    () =>
      contracts.filter((contract) => {
        const matchesFilter = filter === "all" || contract.status === filter;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          contract.projectTitle.toLowerCase().includes(q) ||
          contract.client.name.toLowerCase().includes(q) ||
          contract.freelancer.name.toLowerCase().includes(q);
        return matchesFilter && matchesSearch;
      }),
    [contracts, filter, searchQuery],
  );

  const stats = useMemo(
    () => ({
      active: contracts.filter((c) => c.status === "active").length,
      pending: contracts.filter((c) => c.status === "pending_signature").length,
      completed: contracts.filter((c) => c.status === "completed").length,
      totalValue: contracts.reduce((sum, c) => sum + c.amount, 0),
    }),
    [contracts],
  );

  const handleViewContract = useCallback((contract) => {
    setSelectedContract(contract);
    setShowContractModal(true);
  }, []);

  const handleDownloadContract = useCallback((contract) => {
    toast.success(`📄 Downloading "${contract.projectTitle}"...`, {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const handleSignContract = useCallback(() => {
    toast.success("✅ Contract signed successfully!", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const handleTerminateContract = useCallback(() => {
    if (window.confirm("Are you sure you want to terminate this contract?")) {
      toast.success("Contract termination request submitted", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    }
  }, []);

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Contracts
                </h1>
                <p className="text-gray-500 mt-0.5 text-sm sm:text-base">
                  Manage your project contracts and agreements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Zap,
                  value: stats.active,
                  label: "Active",
                  sublabel: "In progress",
                  color: "from-emerald-400 to-green-400",
                },
                {
                  icon: Clock,
                  value: stats.pending,
                  label: "Pending",
                  sublabel: "Awaiting signature",
                  color: "from-amber-400 to-orange-400",
                },
                {
                  icon: Award,
                  value: stats.completed,
                  label: "Completed",
                  sublabel: "Successfully delivered",
                  color: "from-blue-400 to-indigo-400",
                },
                {
                  icon: DollarSign,
                  value: `$${stats.totalValue.toLocaleString()}`,
                  label: "Total Value",
                  sublabel: "All contracts",
                  color: "from-violet-400 to-purple-400",
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
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project, client, or freelancer..."
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
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

          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {[
                { id: "all", label: "All Contracts", icon: Layers },
                { id: "active", label: "Active", icon: Zap },
                { id: "pending_signature", label: "Pending", icon: Clock },
                { id: "completed", label: "Completed", icon: Award },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === f.id
                      ? "bg-blue-100 text-blue-700 shadow-inner ring-1 ring-blue-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <f.icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 flex-shrink-0">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredContracts.length}
              </span>{" "}
              contracts
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="space-y-4 sm:space-y-5">
          {filteredContracts.map((contract, index) => {
            const status = statusConfig[contract.status];
            const StatusIcon = status.icon;
            const daysRemaining = getDaysRemaining(contract.endDate);

            return (
              <div
                key={contract.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Status indicator bar */}
                <div className={`h-1 bg-gradient-to-r ${status.gradient}`} />

                <div className="p-5 sm:p-6 lg:p-7">
                  {/* Top Section */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${status.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${status.dotColor} animate-pulse`}
                          />
                          {status.label}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium">
                          {contract.type === "fixed" ? (
                            <>
                              <CreditCard className="w-3 h-3" />
                              Fixed Price
                            </>
                          ) : (
                            <>
                              <Timer className="w-3 h-3" />
                              Hourly
                            </>
                          )}
                        </span>
                        {contract.status === "active" && daysRemaining > 0 && (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                              daysRemaining <= 7
                                ? "bg-red-50 text-red-600 border border-red-200"
                                : daysRemaining <= 14
                                  ? "bg-amber-50 text-amber-600 border border-amber-200"
                                  : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            {daysRemaining} days left
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {contract.projectTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                          ${contract.amount.toLocaleString()}
                        </p>
                        {contract.type === "hourly" && (
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            ${contract.hourlyRate}/hr rate
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for Active Contracts */}
                  {contract.status === "active" &&
                    contract.progress !== undefined && (
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-600">
                            Project Progress
                          </span>
                          <span className="text-xs font-bold text-blue-600">
                            {contract.progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${contract.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                  {/* Parties & Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
                    {[
                      {
                        label: "Client",
                        value: contract.client.name,
                        icon: User,
                        color: "text-blue-600 bg-blue-50",
                        initial: contract.client.name.charAt(0),
                        initialBg: "bg-blue-500",
                      },
                      {
                        label: "Freelancer",
                        value: contract.freelancer.name,
                        icon: Briefcase,
                        color: "text-violet-600 bg-violet-50",
                        initial: contract.freelancer.name.charAt(0),
                        initialBg: "bg-violet-500",
                      },
                      {
                        label: "Start Date",
                        value: new Date(contract.startDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        ),
                        icon: Calendar,
                        color: "text-emerald-600 bg-emerald-50",
                      },
                      {
                        label: "End Date",
                        value: new Date(contract.endDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        ),
                        icon: Calendar,
                        color: "text-amber-600 bg-amber-50",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50/80 rounded-xl p-3 sm:p-4 border border-gray-100 hover:border-gray-200 transition-colors"
                      >
                        <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                          {item.label}
                        </p>
                        <div className="flex items-center gap-2">
                          {item.initial ? (
                            <div
                              className={`w-7 h-7 ${item.initialBg} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                            >
                              {item.initial}
                            </div>
                          ) : (
                            <div
                              className={`w-7 h-7 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              <item.icon className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <span className="font-semibold text-gray-900 text-sm truncate">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-4">
                    <div className="text-sm">
                      {contract.signedAt ? (
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          Signed on{" "}
                          {new Date(contract.signedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                          <AlertTriangle className="w-4 h-4" />
                          Awaiting signature
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleViewContract(contract)}
                        className="flex items-center gap-2 px-4 py-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={() => handleDownloadContract(contract)}
                        className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-medium text-gray-700"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                      {contract.status === "pending_signature" && (
                        <button
                          onClick={() => handleSignContract(contract)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg active:scale-[0.98] flex-1 sm:flex-initial justify-center"
                        >
                          <PenTool className="w-4 h-4" />
                          Sign Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredContracts.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 sm:p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No contracts found
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
                {searchQuery
                  ? `No results for "${searchQuery}". Try different keywords.`
                  : filter === "all"
                    ? "You don't have any contracts yet. Start a project to create one!"
                    : `No ${filter.replace("_", " ")} contracts found.`}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {filter !== "all" && (
                  <button
                    onClick={() => setFilter("all")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Layers className="w-4 h-4" />
                    View all contracts
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

        {/* Contract View Modal */}
        {showContractModal && selectedContract && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setShowContractModal(false)
            }
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-xl z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Contract Details
                      </h2>
                      <p className="text-xs text-gray-500 font-medium">
                        ID: {selectedContract.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowContractModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Contract Title */}
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
                      Service Agreement
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {(() => {
                        const s = statusConfig[selectedContract.status];
                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${s.color}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${s.dotColor}`}
                            />
                            {s.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Parties */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-100">
                      <p className="text-[11px] uppercase tracking-wider text-blue-500 font-semibold mb-3">
                        Client
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {selectedContract.client.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {selectedContract.client.name}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl p-4 border border-violet-100">
                      <p className="text-[11px] uppercase tracking-wider text-violet-500 font-semibold mb-3">
                        Freelancer
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {selectedContract.freelancer.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {selectedContract.freelancer.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      Project Details
                    </h4>
                    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                      {[
                        {
                          label: "Project",
                          value: selectedContract.projectTitle,
                          icon: FileText,
                        },
                        {
                          label: "Contract Type",
                          value:
                            selectedContract.type === "fixed"
                              ? "Fixed Price"
                              : "Hourly",
                          icon: CreditCard,
                        },
                        {
                          label: "Total Amount",
                          value: `$${selectedContract.amount.toLocaleString()}`,
                          icon: DollarSign,
                          highlight: true,
                        },
                        {
                          label: "Start Date",
                          value: new Date(
                            selectedContract.startDate,
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }),
                          icon: Calendar,
                        },
                        {
                          label: "End Date",
                          value: new Date(
                            selectedContract.endDate,
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }),
                          icon: Calendar,
                        },
                      ].map((row, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-100/50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 text-sm text-gray-500">
                            <row.icon className="w-4 h-4" />
                            {row.label}
                          </div>
                          <span
                            className={`text-sm font-semibold ${
                              row.highlight
                                ? "text-emerald-600"
                                : "text-gray-900"
                            }`}
                          >
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms */}
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Terms & Conditions
                    </h4>
                    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                      {[
                        {
                          label: "Payment Schedule",
                          value: selectedContract.terms.paymentSchedule,
                        },
                        selectedContract.terms.revisions && {
                          label: "Included Revisions",
                          value: `${selectedContract.terms.revisions} revision${
                            selectedContract.terms.revisions > 1 ? "s" : ""
                          }`,
                        },
                        selectedContract.terms.maxHoursPerWeek && {
                          label: "Max Hours/Week",
                          value: `${selectedContract.terms.maxHoursPerWeek} hours`,
                        },
                        {
                          label: "Delivery Timeline",
                          value: `${selectedContract.terms.deliveryDays} days`,
                        },
                      ]
                        .filter(Boolean)
                        .map((row, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-100/50 transition-colors"
                          >
                            <span className="text-sm text-gray-500">
                              {row.label}
                            </span>
                            <span className="text-sm font-semibold text-gray-900 capitalize">
                              {row.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Signatures */}
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4">
                      <PenTool className="w-4 h-4 text-blue-600" />
                      Signatures
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          name: selectedContract.client.name,
                          role: "Client",
                          signed: !!selectedContract.signedAt,
                          color: "bg-blue-500",
                        },
                        {
                          name: selectedContract.freelancer.name,
                          role: "Freelancer",
                          signed: !!selectedContract.signedAt,
                          color: "bg-violet-500",
                        },
                      ].map((party, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-4 rounded-xl border ${
                            party.signed
                              ? "bg-emerald-50/50 border-emerald-200"
                              : "bg-amber-50/50 border-amber-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 ${party.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}
                            >
                              {party.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {party.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {party.role}
                              </p>
                            </div>
                          </div>
                          {party.signed ? (
                            <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-semibold">
                              <CheckCircle className="w-5 h-5" />
                              Signed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-amber-600 text-sm font-semibold">
                              <Clock className="w-5 h-5" />
                              Pending
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleDownloadContract(selectedContract)}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-200 hover:shadow-xl active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    {selectedContract.status === "active" && (
                      <button
                        onClick={() =>
                          handleTerminateContract(selectedContract)
                        }
                        className="flex items-center justify-center gap-2 px-5 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all font-medium"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Terminate
                      </button>
                    )}
                    <button
                      onClick={() => setShowContractModal(false)}
                      className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contracts;
