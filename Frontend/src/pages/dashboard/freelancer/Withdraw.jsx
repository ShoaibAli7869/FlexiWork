import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Building,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Wallet,
  TrendingUp,
  Calendar,
  ChevronRight,
  X,
  Shield,
  Info,
  History,
  Plus,
  CreditCard,
  Loader2,
  BadgeCheck,
  Send,
  Sparkles,
  BarChart3,
  CircleDot,
  ArrowLeft,
  Banknote,
  PiggyBank,
} from "lucide-react";
import toast from "react-hot-toast";

// Demo data
const demoBalance = {
  available: 4250.0,
  pending: 1800.0,
  inEscrow: 3500.0,
  totalEarned: 45680.0,
  currency: "USD",
};

const demoBankAccounts = [
  {
    id: "ba_1",
    bankName: "Chase Bank",
    last4: "6789",
    accountType: "checking",
    isDefault: true,
  },
  {
    id: "ba_2",
    bankName: "Bank of America",
    last4: "4321",
    accountType: "savings",
    isDefault: false,
  },
];

const demoWithdrawalHistory = [
  {
    id: "wd_1",
    amount: 2500,
    status: "completed",
    bankName: "Chase Bank",
    last4: "6789",
    requestedAt: "2024-03-10T10:30:00",
    completedAt: "2024-03-12T14:00:00",
  },
  {
    id: "wd_2",
    amount: 1800,
    status: "processing",
    bankName: "Chase Bank",
    last4: "6789",
    requestedAt: "2024-03-14T09:15:00",
    completedAt: null,
  },
  {
    id: "wd_3",
    amount: 3200,
    status: "completed",
    bankName: "Bank of America",
    last4: "4321",
    requestedAt: "2024-02-28T11:00:00",
    completedAt: "2024-03-02T16:30:00",
  },
  {
    id: "wd_4",
    amount: 1500,
    status: "failed",
    bankName: "Chase Bank",
    last4: "6789",
    requestedAt: "2024-02-15T08:45:00",
    completedAt: null,
  },
];

const quickAmounts = [100, 500, 1000, 2500];

const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-500/20",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
  },
  processing: {
    label: "Processing",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-500/20",
    icon: Clock,
    dot: "bg-amber-500",
  },
  failed: {
    label: "Failed",
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-500/20",
    icon: X,
    dot: "bg-red-500",
  },
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const StatCard = ({ icon: Icon, label, amount, gradient, className = "" }) => (
  <div
    className={`group relative bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 ${className}`}
  >
    <div className="flex items-center gap-3 sm:gap-4">
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {formatCurrency(amount)}
        </p>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
          {label}
        </p>
      </div>
    </div>
  </div>
);

const HistoryItem = ({ withdrawal }) => {
  const statusConfig = STATUS_CONFIG[withdrawal.status];
  const Icon = statusConfig.icon;

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 hover:bg-slate-50/80 rounded-xl transition-all duration-200 cursor-pointer">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 ${statusConfig.bg}`}
        >
          <Icon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${statusConfig.text}`}
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm sm:text-base font-bold text-slate-900">
            {formatCurrency(withdrawal.amount)}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              To {withdrawal.bankName} •••• {withdrawal.last4}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-13 sm:pl-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3 h-3" />
          <span>{new Date(withdrawal.requestedAt).toLocaleDateString()}</span>
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ring-1 ring-inset ${statusConfig.bg} ${statusConfig.text} ${statusConfig.ring}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
          {statusConfig.label}
        </span>
      </div>
    </div>
  );
};

const ConfirmModal = ({
  isOpen,
  withdrawal,
  bank,
  onClose,
  onConfirm,
  isProcessing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Send className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Confirm Withdrawal
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Please review your withdrawal details.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Amount</span>
            <span className="font-bold text-slate-900 text-lg">
              {formatCurrency(parseFloat(withdrawal.amount))}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
            <span className="text-slate-500">To</span>
            <div className="text-right">
              <p className="font-semibold text-slate-900">{bank?.bankName}</p>
              <p className="text-xs text-slate-500">•••• {bank?.last4}</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Estimated Arrival</span>
            <span className="font-semibold text-slate-900">
              2-3 business days
            </span>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-3 mb-5 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-700">
            Once initiated, this withdrawal cannot be cancelled.
          </p>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/25 transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Confirm Withdrawal"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Withdraw = () => {
  const [balance] = useState(demoBalance);
  const [bankAccounts] = useState(demoBankAccounts);
  const [withdrawalHistory] = useState(demoWithdrawalHistory);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    bankAccountId: bankAccounts.find((ba) => ba.isDefault)?.id || "",
    note: "",
  });

  const selectedBank = useMemo(
    () => bankAccounts.find((ba) => ba.id === withdrawForm.bankAccountId),
    [withdrawForm.bankAccountId, bankAccounts],
  );

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setWithdrawForm((prev) => ({ ...prev, amount: value }));
  }, []);

  const setQuickAmount = useCallback(
    (amount) => {
      if (amount <= balance.available) {
        setWithdrawForm((prev) => ({ ...prev, amount: amount.toString() }));
      } else {
        toast.error("Amount exceeds available balance");
      }
    },
    [balance.available],
  );

  const withdrawAll = useCallback(() => {
    setWithdrawForm((prev) => ({
      ...prev,
      amount: balance.available.toString(),
    }));
  }, [balance.available]);

  const handleWithdrawClick = useCallback(() => {
    const amount = parseFloat(withdrawForm.amount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amount < 10) {
      toast.error("Minimum withdrawal amount is $10");
      return;
    }
    if (amount > balance.available) {
      toast.error("Amount exceeds available balance");
      return;
    }
    if (!withdrawForm.bankAccountId) {
      toast.error("Please select a bank account");
      return;
    }
    setShowConfirmModal(true);
  }, [withdrawForm, balance.available]);

  const processWithdrawal = useCallback(async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowConfirmModal(false);
    toast.success(
      `${formatCurrency(parseFloat(withdrawForm.amount))} withdrawal initiated!`,
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
    setWithdrawForm({
      amount: "",
      bankAccountId: bankAccounts.find((ba) => ba.isDefault)?.id || "",
      note: "",
    });
  }, [withdrawForm, bankAccounts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Withdraw Funds
              </h1>
              <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500">
              Transfer your earnings to your bank account securely.
            </p>
          </div>
          <Link to="/dashboard/earnings">
            <button className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200">
              <BarChart3 className="w-4 h-4" />
              Earnings Report
            </button>
          </Link>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="md:col-span-2 group relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-green-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
                <span className="text-sm sm:text-base font-semibold">
                  Available Balance
                </span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                Ready
              </span>
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {formatCurrency(balance.available)}
            </p>
            <p className="text-xs sm:text-sm opacity-80 mt-1">
              Ready for immediate withdrawal
            </p>
          </div>
          <StatCard
            icon={Clock}
            label="Pending"
            amount={balance.pending}
            gradient="from-amber-500 to-orange-500"
          />
          <StatCard
            icon={Shield}
            label="In Escrow"
            amount={balance.inEscrow}
            gradient="from-blue-500 to-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Quick Withdraw Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Send className="w-4 h-4 text-slate-600" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  New Withdrawal
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {/* Amount Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                    Amount to Withdraw
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={withdrawForm.amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      className="w-full pl-11 sm:pl-12 pr-28 py-3.5 sm:py-4 text-2xl sm:text-3xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all"
                    />
                    <button
                      onClick={withdrawAll}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Withdraw All
                    </button>
                  </div>
                </div>

                {/* Quick Amounts */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setQuickAmount(amount)}
                      disabled={amount > balance.available}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>

                {/* Bank Account Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                    Withdraw To
                  </label>
                  {bankAccounts.length === 0 ? (
                    <Link
                      to="/dashboard/payment-methods"
                      className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50/50 transition-colors"
                    >
                      <Plus className="w-6 h-6" />
                      <span className="font-semibold text-sm">
                        Add Bank Account
                      </span>
                    </Link>
                  ) : (
                    <div className="space-y-2.5">
                      {bankAccounts.map((account) => (
                        <button
                          key={account.id}
                          onClick={() =>
                            setWithdrawForm((prev) => ({
                              ...prev,
                              bankAccountId: account.id,
                            }))
                          }
                          className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-200 ${
                            withdrawForm.bankAccountId === account.id
                              ? "bg-blue-50 border-2 border-blue-500 ring-2 ring-blue-500/20"
                              : "bg-slate-50 border-2 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                              <Building className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {account.bankName}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-500">
                                {account.accountType.charAt(0).toUpperCase() +
                                  account.accountType.slice(1)}{" "}
                                •••• {account.last4}
                              </p>
                            </div>
                          </div>
                          {account.isDefault && (
                            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-md bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-500/20">
                              Default
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Withdraw Button */}
                <button
                  onClick={handleWithdrawClick}
                  disabled={!withdrawForm.amount || !withdrawForm.bankAccountId}
                  className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-sm sm:text-base font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Withdraw{" "}
                  {withdrawForm.amount
                    ? formatCurrency(parseFloat(withdrawForm.amount))
                    : "Funds"}
                </button>
              </div>
            </div>

            {/* Withdrawal History */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-4 sm:p-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <History className="w-4 h-4 text-slate-600" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Withdrawal History
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {withdrawalHistory.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-500">
                      No withdrawal history yet.
                    </p>
                  </div>
                ) : (
                  withdrawalHistory
                    .slice(0, 5)
                    .map((withdrawal) => (
                      <HistoryItem
                        key={withdrawal.id}
                        withdrawal={withdrawal}
                      />
                    ))
                )}
              </div>
              {withdrawalHistory.length > 5 && (
                <div className="p-3 sm:p-4 border-t border-slate-100">
                  <Link
                    to="/dashboard/earnings"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                  >
                    View All History
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-5">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Withdrawal Info
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  {
                    icon: Clock,
                    label: "Processing Time",
                    value: "2-3 business days",
                  },
                  {
                    icon: DollarSign,
                    label: "Minimum Withdrawal",
                    value: "$10.00",
                  },
                  {
                    icon: Sparkles,
                    label: "Withdrawal Fees",
                    value: "Free for all accounts",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0">
                      <item.icon className="w-full h-full" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Payment Methods
                </h3>
              </div>
              <Link
                to="/dashboard/payment-methods"
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    Manage payment methods
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            <div className="bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-200 p-4 sm:p-5">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-blue-800 mb-1.5">
                    Need Help?
                  </p>
                  <p className="text-xs text-blue-700">
                    If you have any questions about withdrawals, please contact
                    our support team.
                  </p>
                  <button className="mt-3 text-xs font-semibold text-blue-700 hover:underline">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        withdrawal={withdrawForm}
        bank={selectedBank}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={processWithdrawal}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default Withdraw;
