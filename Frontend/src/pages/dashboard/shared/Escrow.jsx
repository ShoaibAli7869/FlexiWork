import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Lock,
  Unlock,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  CreditCard,
  Info,
  ExternalLink,
  X,
  Zap,
  TrendingUp,
  Eye,
  ChevronRight,
  Wallet,
  ArrowRight,
  AlertTriangle,
  Layers,
  Receipt,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const demoEscrowAccounts = [
  {
    id: "e1",
    projectId: "p1",
    projectTitle: "E-commerce Website Redesign",
    freelancer: { id: "f1", name: "Sarah Johnson", avatar: null },
    totalBudget: 5000,
    funded: 5000,
    released: 3750,
    balance: 1250,
    status: "active",
    milestones: [
      { id: "m1", title: "Project Setup", amount: 500, status: "released" },
      { id: "m2", title: "UI/UX Design", amount: 1500, status: "released" },
      {
        id: "m3",
        title: "Frontend Development",
        amount: 1750,
        status: "released",
      },
      { id: "m4", title: "Testing & Launch", amount: 1250, status: "funded" },
    ],
    createdAt: "2024-02-01",
  },
  {
    id: "e2",
    projectId: "p2",
    projectTitle: "Mobile App Development",
    freelancer: { id: "f2", name: "Michael Chen", avatar: null },
    totalBudget: 12000,
    funded: 6000,
    released: 2400,
    balance: 3600,
    status: "active",
    milestones: [
      {
        id: "m1",
        title: "Requirements & Planning",
        amount: 1200,
        status: "released",
      },
      {
        id: "m2",
        title: "Backend Development",
        amount: 3600,
        status: "funded",
      },
      {
        id: "m3",
        title: "Frontend Development",
        amount: 4200,
        status: "pending",
      },
      {
        id: "m4",
        title: "Testing & Deployment",
        amount: 3000,
        status: "pending",
      },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "e3",
    projectId: "p3",
    projectTitle: "Brand Identity Design",
    freelancer: { id: "f3", name: "Emily Davis", avatar: null },
    totalBudget: 2500,
    funded: 2500,
    released: 2500,
    balance: 0,
    status: "completed",
    milestones: [
      {
        id: "m1",
        title: "Research & Concepts",
        amount: 800,
        status: "released",
      },
      {
        id: "m2",
        title: "Design Development",
        amount: 1200,
        status: "released",
      },
      {
        id: "m3",
        title: "Final Deliverables",
        amount: 500,
        status: "released",
      },
    ],
    createdAt: "2024-01-10",
  },
];

const demoTransactionHistory = [
  {
    id: "t1",
    type: "fund",
    amount: 1250,
    projectTitle: "E-commerce Website Redesign",
    milestone: "Testing & Launch",
    date: "2024-02-28",
    status: "completed",
  },
  {
    id: "t2",
    type: "release",
    amount: 1750,
    projectTitle: "E-commerce Website Redesign",
    milestone: "Frontend Development",
    freelancer: "Sarah Johnson",
    date: "2024-02-27",
    status: "completed",
  },
  {
    id: "t3",
    type: "fund",
    amount: 3600,
    projectTitle: "Mobile App Development",
    milestone: "Backend Development",
    date: "2024-02-20",
    status: "completed",
  },
  {
    id: "t4",
    type: "release",
    amount: 1200,
    projectTitle: "Mobile App Development",
    milestone: "Requirements & Planning",
    freelancer: "Michael Chen",
    date: "2024-02-15",
    status: "completed",
  },
  {
    id: "t5",
    type: "refund",
    amount: 500,
    projectTitle: "Website Maintenance",
    reason: "Project cancelled by mutual agreement",
    date: "2024-02-10",
    status: "completed",
  },
];

const milestoneStatusConfig = {
  funded: {
    label: "Funded",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-600",
    icon: Lock,
  },
  released: {
    label: "Released",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
    iconBg: "bg-blue-100 text-blue-600",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500",
    iconBg: "bg-gray-100 text-gray-400",
    icon: Clock,
  },
  disputed: {
    label: "Disputed",
    color: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500",
    iconBg: "bg-red-100 text-red-600",
    icon: AlertCircle,
  },
};

const Escrow = () => {
  const [escrowAccounts] = useState(demoEscrowAccounts);
  const [transactions] = useState(demoTransactionHistory);
  const [activeTab, setActiveTab] = useState("accounts");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [fundAmount, setFundAmount] = useState("");

  const totals = useMemo(
    () =>
      escrowAccounts.reduce(
        (acc, account) => ({
          totalBalance: acc.totalBalance + account.balance,
          totalReleased: acc.totalReleased + account.released,
          totalFunded: acc.totalFunded + account.funded,
          activeCount: acc.activeCount + (account.status === "active" ? 1 : 0),
        }),
        { totalBalance: 0, totalReleased: 0, totalFunded: 0, activeCount: 0 },
      ),
    [escrowAccounts],
  );

  const handleFundMilestone = useCallback((account, milestone) => {
    setSelectedAccount(account);
    setSelectedMilestone(milestone);
    setFundAmount(milestone.amount.toString());
    setShowFundModal(true);
  }, []);

  const handleReleaseFunds = useCallback((account, milestone) => {
    setSelectedAccount(account);
    setSelectedMilestone(milestone);
    setShowReleaseModal(true);
  }, []);

  const confirmFunding = useCallback(() => {
    toast.success(
      `💰 $${fundAmount} funded to escrow for "${selectedMilestone.title}"`,
      {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      },
    );
    setShowFundModal(false);
    setSelectedAccount(null);
    setSelectedMilestone(null);
    setFundAmount("");
  }, [fundAmount, selectedMilestone]);

  const confirmRelease = useCallback(() => {
    toast.success(
      `✅ $${selectedMilestone.amount.toLocaleString()} released to ${selectedAccount.freelancer.name}`,
      { style: { borderRadius: "12px", background: "#1F2937", color: "#fff" } },
    );
    setShowReleaseModal(false);
    setSelectedAccount(null);
    setSelectedMilestone(null);
  }, [selectedMilestone, selectedAccount]);

  const closeModals = useCallback(() => {
    setShowFundModal(false);
    setShowReleaseModal(false);
    setSelectedAccount(null);
    setSelectedMilestone(null);
    setFundAmount("");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8sm:py-6 ">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <Lock className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Escrow Management
              </h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                Manage your escrow funds and payment releases securely
              </p>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="relative mb-6 sm:mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-2xl sm:rounded-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="relative p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[
                {
                  icon: Lock,
                  value: `$${totals.totalBalance.toLocaleString()}`,
                  label: "In Escrow",
                  sublabel: "Protected funds",
                  color: "from-emerald-400 to-green-400",
                },
                {
                  icon: Unlock,
                  value: `$${totals.totalReleased.toLocaleString()}`,
                  label: "Released",
                  sublabel: "Paid to freelancers",
                  color: "from-blue-400 to-indigo-400",
                },
                {
                  icon: Wallet,
                  value: `$${totals.totalFunded.toLocaleString()}`,
                  label: "Total Funded",
                  sublabel: "All time",
                  color: "from-violet-400 to-purple-400",
                },
                {
                  icon: Zap,
                  value: totals.activeCount,
                  label: "Active Projects",
                  sublabel: "With escrow",
                  color: "from-amber-400 to-orange-400",
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
                    <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 hidden sm:block">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-sm sm:text-base">
              How Escrow Protection Works
            </h3>
            <p className="text-xs sm:text-sm text-blue-700 mt-1 leading-relaxed">
              When you fund a milestone, money is held securely in escrow. Once
              you approve the completed work, funds are released to the
              freelancer. This protects both parties.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 sm:mb-6 overflow-hidden">
          <div className="p-1.5 sm:p-2 flex gap-1">
            {[
              {
                id: "accounts",
                label: "Escrow Accounts",
                icon: Shield,
                count: escrowAccounts.length,
              },
              {
                id: "transactions",
                label: "Transactions",
                icon: Receipt,
                count: transactions.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-emerald-50 text-emerald-700 shadow-inner ring-1 ring-emerald-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === "accounts" ? "Accounts" : "History"}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${
                    activeTab === tab.id
                      ? "bg-emerald-200 text-emerald-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── ESCROW ACCOUNTS TAB ─── */}
        {activeTab === "accounts" && (
          <div className="space-y-4 sm:space-y-5">
            {escrowAccounts.map((account, index) => {
              const progressPercent = Math.round(
                (account.released / account.totalBudget) * 100,
              );
              const isCompleted = account.status === "completed";

              return (
                <div
                  key={account.id}
                  className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    isCompleted
                      ? "border-blue-100 hover:shadow-blue-100/50"
                      : "border-gray-100 hover:shadow-emerald-100/50 hover:border-emerald-200"
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Status bar */}
                  <div
                    className={`h-1 ${
                      isCompleted
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                        : "bg-gradient-to-r from-emerald-500 to-green-500"
                    }`}
                  />

                  {/* Account Header */}
                  <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-200 flex-shrink-0">
                          {account.freelancer.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <Link
                            to={`/dashboard/projects/${account.projectId}`}
                            className="font-bold text-gray-900 hover:text-emerald-600 transition-colors text-sm sm:text-base truncate block"
                          >
                            {account.projectTitle}
                          </Link>
                          <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                            <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                            <span className="truncate">
                              {account.freelancer.name}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold">
                            In Escrow
                          </p>
                          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 tracking-tight">
                            ${account.balance.toLocaleString()}
                          </p>
                        </div>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                      <span className="text-gray-500">
                        Released{" "}
                        <span className="font-semibold text-gray-900">
                          ${account.released.toLocaleString()}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900">
                          ${account.totalBudget.toLocaleString()}
                        </span>
                      </span>
                      <span
                        className={`font-bold ${
                          progressPercent === 100
                            ? "text-blue-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          progressPercent === 100
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                            : "bg-gradient-to-r from-emerald-500 to-green-500"
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="divide-y divide-gray-50">
                    {account.milestones.map((milestone) => {
                      const config = milestoneStatusConfig[milestone.status];
                      const MilestoneIcon = config.icon;

                      return (
                        <div
                          key={milestone.id}
                          className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}
                            >
                              <MilestoneIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">
                                {milestone.title}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold border ${config.color}`}
                              >
                                <span
                                  className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${config.dotColor}`}
                                />
                                {config.label}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-3">
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              ${milestone.amount.toLocaleString()}
                            </span>
                            {milestone.status === "pending" && (
                              <button
                                onClick={() =>
                                  handleFundMilestone(account, milestone)
                                }
                                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-emerald-200 hover:shadow-lg hover:from-emerald-700 hover:to-green-700 transition-all active:scale-[0.98]"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Fund</span>
                              </button>
                            )}
                            {milestone.status === "funded" && (
                              <button
                                onClick={() =>
                                  handleReleaseFunds(account, milestone)
                                }
                                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
                              >
                                <Unlock className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">
                                  Release
                                </span>
                              </button>
                            )}
                            {milestone.status === "released" && (
                              <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                                <span className="hidden sm:inline">Done</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Account Footer */}
                  {account.status === "active" && (
                    <div className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <Shield className="w-3.5 h-3.5 text-emerald-500" />
                        Protected since{" "}
                        {new Date(account.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </div>
                      <Link
                        to={`/dashboard/projects/${account.projectId}`}
                        className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group/link"
                      >
                        View Project
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ─── TRANSACTION HISTORY TAB ─── */}
        {activeTab === "transactions" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table header - hidden on mobile */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 lg:px-6 py-3 bg-gray-50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              <div className="col-span-5">Transaction</div>
              <div className="col-span-3">Project</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-right">Date</div>
            </div>

            <div className="divide-y divide-gray-50">
              {transactions.map((tx, index) => {
                const typeStyles = {
                  fund: {
                    icon: ArrowDownLeft,
                    bg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    amountColor: "text-emerald-600",
                    label: "Funded to Escrow",
                    sign: "+",
                    gradient: "from-emerald-500 to-green-500",
                  },
                  release: {
                    icon: ArrowUpRight,
                    bg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    amountColor: "text-blue-600",
                    label: `Released to ${tx.freelancer}`,
                    sign: "-",
                    gradient: "from-blue-500 to-indigo-500",
                  },
                  refund: {
                    icon: ArrowDownLeft,
                    bg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    amountColor: "text-orange-600",
                    label: "Refunded",
                    sign: "+",
                    gradient: "from-orange-500 to-amber-500",
                  },
                };
                const style = typeStyles[tx.type];
                const TxIcon = style.icon;

                return (
                  <div
                    key={tx.id}
                    className="px-4 sm:px-5 lg:px-6 py-4 sm:py-5 hover:bg-gray-50/50 transition-colors"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    {/* Mobile Layout */}
                    <div className="sm:hidden">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${style.bg} rounded-xl flex items-center justify-center`}
                          >
                            <TxIcon className={`w-5 h-5 ${style.iconColor}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {style.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {tx.projectTitle}
                              {tx.milestone && ` · ${tx.milestone}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pl-[52px]">
                        <p className="text-xs text-gray-400 font-medium">
                          {new Date(tx.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p
                          className={`font-bold text-base ${style.amountColor}`}
                        >
                          {style.sign}${tx.amount.toLocaleString()}
                        </p>
                      </div>
                      {tx.reason && (
                        <p className="text-xs text-gray-400 mt-1.5 pl-[52px]">
                          {tx.reason}
                        </p>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 items-center">
                      <div className="col-span-5 flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <TxIcon className={`w-5 h-5 ${style.iconColor}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">
                            {style.label}
                          </p>
                          {tx.milestone && (
                            <p className="text-xs text-gray-500 truncate">
                              {tx.milestone}
                            </p>
                          )}
                          {tx.reason && (
                            <p className="text-xs text-gray-400 truncate">
                              {tx.reason}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm text-gray-600 truncate">
                          {tx.projectTitle}
                        </p>
                      </div>
                      <div className="col-span-2 text-right">
                        <p
                          className={`font-bold text-base ${style.amountColor}`}
                        >
                          {style.sign}${tx.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="col-span-2 text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(tx.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {transactions.length === 0 && (
              <div className="p-12 sm:p-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">
                  No transactions yet
                </h3>
                <p className="text-sm text-gray-500">
                  Your transaction history will appear here
                </p>
              </div>
            )}
          </div>
        )}

        {/* ─── FUND MODAL ─── */}
        {showFundModal && selectedMilestone && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && closeModals()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Mobile handle */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        Fund Milestone
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
                      Amount to Fund
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Payment Method
                    </label>
                    <div className="flex items-center gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        Visa •••• 4242
                      </span>
                      <button className="ml-auto text-xs text-emerald-600 font-semibold hover:underline">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Milestone Amount</span>
                      <span className="font-semibold text-gray-900">
                        ${parseFloat(fundAmount || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Platform Fee (5%)</span>
                      <span className="font-semibold text-gray-900">
                        ${(parseFloat(fundAmount || 0) * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold pt-2.5 border-t border-gray-200 text-base">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        ${(parseFloat(fundAmount || 0) * 1.05).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    By funding this milestone, you agree to release the funds
                    only when deliverables meet your requirements. Funds are
                    protected by our escrow service.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={confirmFunding}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <Lock className="w-4 h-4" />
                    Fund ${fundAmount}
                  </button>
                  <button
                    onClick={closeModals}
                    className="flex-1 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── RELEASE MODAL ─── */}
        {showReleaseModal && selectedMilestone && selectedAccount && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
            onClick={(e) => e.target === e.currentTarget && closeModals()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Mobile handle */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                      <Unlock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
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
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-xl text-center">
                    <p className="text-xs uppercase tracking-wider text-blue-500 font-semibold mb-1">
                      Amount to Release
                    </p>
                    <p className="text-3xl font-extrabold text-blue-700 tracking-tight">
                      ${selectedMilestone.amount.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                      {selectedAccount.freelancer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {selectedAccount.freelancer.name}
                      </p>
                      <p className="text-xs text-gray-500">Freelancer</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <h4 className="font-semibold text-emerald-800 text-sm flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      Before releasing, confirm:
                    </h4>
                    <ul className="text-xs text-emerald-700 space-y-1.5 ml-6">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                        All deliverables have been received
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                        Work meets the agreed requirements
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                        You're satisfied with the quality
                      </li>
                    </ul>
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
                    onClick={confirmRelease}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <Unlock className="w-4 h-4" />
                    Release Funds
                  </button>
                  <button
                    onClick={closeModals}
                    className="flex-1 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                <button className="w-full mt-3 text-xs text-orange-600 hover:underline font-medium flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Report an issue with this milestone
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Escrow;
