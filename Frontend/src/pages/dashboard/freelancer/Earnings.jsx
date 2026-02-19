import { useState, useMemo, useCallback } from "react";
import { demoTransactions } from "../../../data/demoData";
import toast from "react-hot-toast";
import {
  DollarSign,
  Clock,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  TrendingUp,
  Download,
  Filter,
  ChevronRight,
  CreditCard,
  Building2,
  CircleDollarSign,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Calendar,
  Search,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Receipt,
  PiggyBank,
  BadgeDollarSign,
} from "lucide-react";

const FILTER_OPTIONS = [
  { key: "all", label: "All", icon: Receipt },
  { key: "earning", label: "Earnings", icon: ArrowDownLeft },
  { key: "withdrawal", label: "Withdrawals", icon: ArrowUpRight },
  { key: "refund", label: "Refunds", icon: RotateCcw },
];

const STATUS_CONFIG = {
  completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-500/20",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
  },
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-500/20",
    icon: AlertCircle,
    dot: "bg-amber-500",
  },
  failed: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-500/20",
    icon: XCircle,
    dot: "bg-red-500",
  },
};

const TYPE_CONFIG = {
  earning: {
    gradient: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: ArrowDownLeft,
    sign: "+",
    amountColor: "text-emerald-600",
  },
  withdrawal: {
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-600",
    icon: ArrowUpRight,
    sign: "-",
    amountColor: "text-red-600",
  },
  refund: {
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    icon: RotateCcw,
    sign: "+",
    amountColor: "text-blue-600",
  },
};

const StatCard = ({
  icon: Icon,
  label,
  amount,
  gradient,
  textColor,
  children,
  className = "",
}) => (
  <div
    className={`group relative overflow-hidden bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 lg:p-6 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
        >
          <Icon
            className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white"
            strokeWidth={2}
          />
        </div>
        <MoreHorizontal className="w-5 h-5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-slate-500" />
      </div>
      <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">
        {label}
      </p>
      <p
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${textColor}`}
      >
        {amount}
      </p>
      {children}
    </div>
  </div>
);

const TransactionRow = ({ tx }) => {
  const typeConfig = TYPE_CONFIG[tx.type] || TYPE_CONFIG.earning;
  const statusConfig = STATUS_CONFIG[tx.status] || STATUS_CONFIG.completed;
  const IconComponent = typeConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 lg:p-5 hover:bg-slate-50/80 transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br ${typeConfig.gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 flex-shrink-0`}
        >
          <IconComponent
            className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white"
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm sm:text-base font-semibold text-slate-900 truncate">
            {tx.description}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {tx.client}
            </p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" />
              {tx.date}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-13 sm:pl-0">
        <span className="sm:hidden flex items-center gap-1 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          {tx.date}
        </span>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <span
            className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ring-1 ring-inset ${statusConfig.bg} ${statusConfig.text} ${statusConfig.ring}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
            <span className="capitalize">{tx.status}</span>
          </span>

          <p
            className={`text-sm sm:text-base lg:text-lg font-bold tabular-nums ${typeConfig.amountColor}`}
          >
            {typeConfig.sign}${tx.amount.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const Earnings = () => {
  const [transactions] = useState(demoTransactions);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBalance, setShowBalance] = useState(true);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    if (filter !== "all") {
      filtered = filtered.filter((t) => t.type === filter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description?.toLowerCase().includes(query) ||
          t.client?.toLowerCase().includes(query),
      );
    }
    return filtered;
  }, [transactions, filter, searchQuery]);

  const totalEarnings = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "earning" && t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  );

  const pendingAmount = useMemo(
    () =>
      transactions
        .filter((t) => t.status === "pending")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  );

  const availableAmount = useMemo(() => totalEarnings - 3000, [totalEarnings]);

  const handleWithdraw = useCallback(() => {
    toast.success(
      "Withdrawal initiated! Funds will arrive in 2-3 business days.",
      {
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
        },
      },
    );
  }, []);

  const handleExport = useCallback(() => {
    toast.success("Transaction report downloading...", {
      icon: "📄",
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
        fontSize: "14px",
      },
    });
  }, []);

  const formatAmount = useCallback(
    (amount) => (showBalance ? `$${amount.toLocaleString()}` : "••••••"),
    [showBalance],
  );

  const filterCounts = useMemo(() => {
    const counts = { all: transactions.length };
    transactions.forEach((t) => {
      counts[t.type] = (counts[t.type] || 0) + 1;
    });
    return counts;
  }, [transactions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Earnings
              </h1>
              <BadgeDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500">
              Track your income, withdrawals, and financial activity.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              aria-label={showBalance ? "Hide balances" : "Show balances"}
            >
              {showBalance ? (
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
              ) : (
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
              )}
            </button>
            <button
              onClick={handleExport}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleWithdraw}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-[0.98]"
            >
              <Wallet className="w-4 h-4" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex sm:hidden gap-2">
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-slate-300 transition-all duration-200 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={handleWithdraw}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-[0.98]"
          >
            <Wallet className="w-4 h-4" />
            Withdraw
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <StatCard
            icon={TrendingUp}
            label="Total Earnings"
            amount={formatAmount(totalEarnings)}
            gradient="from-emerald-500 to-emerald-600"
            textColor="text-emerald-600"
          >
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-500/20">
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                +18.2%
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400">
                vs last month
              </span>
            </div>
          </StatCard>

          <StatCard
            icon={Clock}
            label="Pending"
            amount={formatAmount(pendingAmount)}
            gradient="from-amber-500 to-orange-500"
            textColor="text-amber-600"
          >
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-slate-500">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                Processing 2 payments
              </span>
            </div>
          </StatCard>

          <StatCard
            icon={Wallet}
            label="Available to Withdraw"
            amount={formatAmount(availableAmount)}
            gradient="from-blue-500 to-blue-600"
            textColor="text-blue-600"
          >
            <button
              onClick={handleWithdraw}
              className="mt-3 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 active:scale-[0.98]"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Withdraw Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </StatCard>
        </div>

        {/* Payout Methods Quick Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 lg:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Payout Method: Bank Account
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Chase •••• 4829 · Next payout in 3 days
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10">
              Manage
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Transactions Header */}
          <div className="p-3.5 sm:p-4 lg:p-5 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Receipt
                    className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-600"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Transaction History
                  </h3>
                  <p className="text-xs text-slate-500 hidden sm:block">
                    {filteredTransactions.length} transactions found
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64 lg:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {FILTER_OPTIONS.map((f) => {
                const isActive = filter === f.key;
                const count = filterCounts[f.key] || 0;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-200"
                    }`}
                  >
                    <f.icon className="w-3.5 h-3.5" strokeWidth={2} />
                    {f.label}
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

          {/* Transaction List */}
          <div className="divide-y divide-slate-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <TransactionRow key={tx.id} tx={tx} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                  <CircleDollarSign className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                  No transactions found
                </p>
                <p className="text-xs sm:text-sm text-slate-500 text-center max-w-sm">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : "There are no transactions matching this filter."}
                </p>
                {(searchQuery || filter !== "all") && (
                  <button
                    onClick={() => {
                      setFilter("all");
                      setSearchQuery("");
                    }}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all duration-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredTransactions.length > 0 && (
            <div className="p-3.5 sm:p-4 lg:p-5 border-t border-slate-100 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <p className="text-xs sm:text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredTransactions.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {transactions.length}
                  </span>{" "}
                  transactions
                </p>
                <button className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group">
                  View All Transactions
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Earnings Insight Banner */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 lg:p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Earnings Insight
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Your earnings increased by 18.2% this month compared to last
                month. Keep up the great work! You're on track to hit $15,000
                this quarter.
              </p>
            </div>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-violet-50 text-violet-700 text-xs sm:text-sm font-semibold rounded-xl hover:bg-violet-100 transition-all duration-200 flex-shrink-0 ring-1 ring-inset ring-violet-500/20">
              <PiggyBank className="w-4 h-4" />
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
