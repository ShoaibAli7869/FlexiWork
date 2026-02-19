import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  Plus,
  X,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Shield,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
  FileText,
  ChevronRight,
  Sparkles,
  Lock,
  Star,
  Trash2,
  Settings,
  Search,
  Filter,
  BarChart3,
  PiggyBank,
  Banknote,
  CircleDollarSign,
  BadgeCheck,
  Loader2,
  ExternalLink,
  Calendar,
  Hash,
  Layers,
  Zap,
  Info,
} from "lucide-react";
import { demoTransactions } from "../../../data/demoData";
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

const stats = [
  {
    label: "Total Spent",
    key: "totalSpent",
    icon: TrendingUp,
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/10",
    textColor: "text-gray-900",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    label: "In Escrow",
    key: "escrow",
    value: "$4,500",
    icon: Shield,
    gradient: "from-amber-400 to-orange-500",
    bgGlow: "bg-amber-500/10",
    textColor: "text-amber-600",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Pending",
    key: "pending",
    value: "$800",
    icon: Clock,
    gradient: "from-orange-400 to-red-500",
    bgGlow: "bg-orange-500/10",
    textColor: "text-orange-600",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    label: "Account Balance",
    key: "balance",
    value: "$2,340",
    icon: Wallet,
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/10",
    textColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const filterTabs = [
  { value: "all", label: "All", icon: Layers },
  { value: "earning", label: "Payments", icon: ArrowUpRight },
  { value: "withdrawal", label: "Withdrawals", icon: ArrowDownLeft },
  { value: "refund", label: "Refunds", icon: RefreshCw },
];

const txTypeConfig = {
  earning: {
    icon: ArrowUpRight,
    color: "text-red-600",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    prefix: "-",
    label: "Payment",
  },
  refund: {
    icon: ArrowDownLeft,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    prefix: "+",
    label: "Refund",
  },
  withdrawal: {
    icon: RefreshCw,
    color: "text-gray-600",
    bg: "bg-gray-50",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    prefix: "-",
    label: "Withdrawal",
  },
};

const quickAmounts = [50, 100, 250, 500, 1000];

const invoices = [
  { id: "INV-001", date: "Mar 2024", amount: "$2,450", status: "paid" },
  { id: "INV-002", date: "Feb 2024", amount: "$3,200", status: "paid" },
  { id: "INV-003", date: "Jan 2024", amount: "$1,890", status: "paid" },
];

// ─── Sub Components ──────────────────────────────────────────────────

const StatCard = memo(({ stat, index, computedValue }) => (
  <motion.div variants={itemVariants}>
    <div className="relative group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div
        className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <stat.icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        </div>
        <p
          className={`text-xl sm:text-2xl font-bold ${stat.textColor} tracking-tight`}
        >
          {computedValue || stat.value}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          {stat.label}
        </p>
      </div>
    </div>
  </motion.div>
));
StatCard.displayName = "StatCard";

const TransactionRow = memo(({ tx, onDownload }) => {
  const config = txTypeConfig[tx.type] || txTypeConfig.withdrawal;
  const TxIcon = config.icon;

  return (
    <motion.div
      variants={itemVariants}
      className="group flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/80 transition-colors duration-200 rounded-xl mx-1"
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 ${config.iconBg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
        >
          <TxIcon
            className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${config.iconColor}`}
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {tx.description}
            </p>
            <span
              className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.iconColor}`}
            >
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {tx.client}
            </p>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="text-xs text-gray-400 hidden sm:inline flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {tx.date}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right shrink-0 ml-3 flex items-center gap-3">
        <div>
          <p className={`font-bold text-sm sm:text-base ${config.color}`}>
            {config.prefix}${tx.amount.toLocaleString()}
          </p>
          <span className="text-xs text-gray-400 sm:hidden">{tx.date}</span>
        </div>
        <button
          onClick={() => onDownload(tx.id)}
          className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
          title="Download Invoice"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
});
TransactionRow.displayName = "TransactionRow";

const PaymentMethodCard = memo(({ method, onSetDefault, onRemove }) => (
  <motion.div
    layout
    className="group relative p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-14 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold tracking-wider shadow-sm ${
            method.brand === "Visa"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
              : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
          }`}
        >
          {method.brand.toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            •••• {method.last4}
          </p>
          <p className="text-xs text-gray-400">Expires 12/25</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {method.isDefault && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded-lg">
            <BadgeCheck className="w-3 h-3" />
            Default
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
      {!method.isDefault && (
        <button
          onClick={() => onSetDefault(method.id)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <Star className="w-3 h-3" />
          Set Default
        </button>
      )}
      <button
        onClick={() => onRemove(method.id)}
        className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
      >
        <Trash2 className="w-3 h-3" />
        Remove
      </button>
    </div>
  </motion.div>
));
PaymentMethodCard.displayName = "PaymentMethodCard";

const InvoiceRow = memo(({ invoice, onDownload }) => (
  <div className="group flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all duration-200">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
        <Receipt className="w-4 h-4 text-blue-500" />
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{invoice.id}</p>
        <p className="text-xs text-gray-500">{invoice.date}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="font-bold text-sm text-gray-900">{invoice.amount}</span>
      <button
        onClick={() => onDownload(invoice.id)}
        className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all group-hover:text-gray-400"
        title="Download"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  </div>
));
InvoiceRow.displayName = "InvoiceRow";

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

const AddFundsModal = memo(
  ({ show, addAmount, setAddAmount, paymentMethods, onSubmit, onClose }) => (
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
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <PiggyBank className="w-4.5 h-4.5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Add Funds</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/80 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={onSubmit} className="p-6 space-y-5">
              {/* Amount */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <CircleDollarSign className="w-4 h-4 text-emerald-500" />
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all placeholder:text-gray-400 placeholder:font-normal"
                    placeholder="0.00"
                    min="1"
                    required
                  />
                </div>

                {/* Quick Amounts */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAddAmount(String(amt))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        addAmount === String(amt)
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                        m.isDefault
                          ? "border-blue-300 bg-blue-50/50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        defaultChecked={m.isDefault}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div
                        className={`w-12 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold tracking-wider shadow-sm ${
                          m.brand === "Visa"
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                            : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        }`}
                      >
                        {m.brand.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          •••• {m.last4}
                        </p>
                        <p className="text-[10px] text-gray-400">Exp 12/25</p>
                      </div>
                      {m.isDefault && (
                        <span className="ml-auto text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                          Default
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your payment is encrypted and secured. We never store your
                  full card details.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  Add ${addAmount || "0"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  ),
);
AddFundsModal.displayName = "AddFundsModal";

// ─── Main Component ──────────────────────────────────────────────────

const Payments = () => {
  const [transactions] = useState(demoTransactions);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [paymentMethods] = useState([
    { id: "1", type: "card", brand: "Visa", last4: "4242", isDefault: true },
    {
      id: "2",
      type: "card",
      brand: "Mastercard",
      last4: "8888",
      isDefault: false,
    },
  ]);

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (filter !== "all") {
      result = result.filter((t) => t.type === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.client?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [transactions, filter, searchQuery]);

  const totalSpent = useMemo(
    () =>
      transactions
        .filter(
          (t) =>
            (t.type === "earning" || t.type === "withdrawal") &&
            t.status === "completed",
        )
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions],
  );

  const handleAddFunds = useCallback(
    (e) => {
      e.preventDefault();
      if (!addAmount || parseInt(addAmount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      toast.success(
        `$${parseInt(addAmount).toLocaleString()} added to your account!`,
      );
      setShowAddFundsModal(false);
      setAddAmount("");
    },
    [addAmount],
  );

  const handleSetDefaultPayment = useCallback((id) => {
    toast.success("Default payment method updated");
  }, []);

  const handleRemovePayment = useCallback((id) => {
    if (window.confirm("Remove this payment method?")) {
      toast.success("Payment method removed");
    }
  }, []);

  const handleDownloadInvoice = useCallback((txId) => {
    toast.success("Invoice downloaded");
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className=" mx-auto px-4 sm:px-0"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Payments
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Track spending, manage funds & payment methods
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAddFundsModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add Funds
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.key}
            stat={stat}
            index={index}
            computedValue={
              stat.key === "totalSpent"
                ? `$${totalSpent.toLocaleString()}`
                : undefined
            }
          />
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2">
          <SectionCard
            icon={Receipt}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
            title="Transaction History"
            subtitle={`${filteredTransactions.length} transactions`}
          >
            {/* Search & Filters */}
            <div className="space-y-3 mb-5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
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
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transaction List */}
            <div className="divide-y divide-gray-50 -mx-1">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((tx) => (
                  <TransactionRow
                    key={tx.id}
                    tx={tx}
                    onDownload={handleDownloadInvoice}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-7 h-7 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-700 mb-1">
                  No transactions found
                </p>
                <p className="text-sm text-gray-400">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Your transactions will appear here"}
                </p>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-5 order-first lg:order-last">
          <div className="lg:sticky lg:top-6 space-y-5">
            {/* Payment Methods */}
            <SectionCard
              icon={CreditCard}
              iconColor="text-violet-600"
              iconBg="bg-violet-100"
              title="Payment Methods"
              action={
                <button
                  onClick={() =>
                    toast.success("Add payment method coming soon!")
                  }
                  className="p-2 hover:bg-violet-50 rounded-xl text-violet-600 transition-colors"
                  title="Add method"
                >
                  <Plus className="w-4 h-4" />
                </button>
              }
            >
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    onSetDefault={handleSetDefaultPayment}
                    onRemove={handleRemovePayment}
                  />
                ))}
                <button
                  onClick={() =>
                    toast.success("Add payment method coming soon!")
                  }
                  className="w-full p-3.5 border-2 border-dashed border-gray-200 hover:border-violet-300 rounded-xl text-sm font-semibold text-gray-500 hover:text-violet-600 hover:bg-violet-50/50 flex items-center justify-center gap-1.5 transition-all group"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                  Add Payment Method
                </button>
              </div>
            </SectionCard>

            {/* Invoices */}
            <SectionCard
              icon={FileText}
              iconColor="text-blue-600"
              iconBg="bg-blue-100"
              title="Recent Invoices"
              action={
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                  View All
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              }
            >
              <div className="space-y-2.5">
                {invoices.map((inv) => (
                  <InvoiceRow
                    key={inv.id}
                    invoice={inv}
                    onDownload={handleDownloadInvoice}
                  />
                ))}
              </div>
            </SectionCard>

            {/* Security Info */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">
                    Secure Payments
                  </p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    All transactions are protected with bank-level 256-bit
                    encryption and our escrow guarantee.
                  </p>
                  <button className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                    <Info className="w-3.5 h-3.5" />
                    Learn More
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      <AddFundsModal
        show={showAddFundsModal}
        addAmount={addAmount}
        setAddAmount={setAddAmount}
        paymentMethods={paymentMethods}
        onSubmit={handleAddFunds}
        onClose={() => {
          setShowAddFundsModal(false);
          setAddAmount("");
        }}
      />
    </motion.div>
  );
};

export default Payments;
