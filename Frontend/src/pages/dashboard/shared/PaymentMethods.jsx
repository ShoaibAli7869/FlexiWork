import { useState, useCallback } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Shield,
  X,
  Building,
  Star,
  Lock,
  Wallet,
  Zap,
  Eye,
  EyeOff,
  Info,
  ArrowRight,
  Fingerprint,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const demoPaymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
    cardholderName: "John Doe",
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expMonth: 6,
    expYear: 2026,
    isDefault: false,
    cardholderName: "John Doe",
  },
  {
    id: "pm_3",
    type: "card",
    brand: "amex",
    last4: "1234",
    expMonth: 3,
    expYear: 2025,
    isDefault: false,
    cardholderName: "John Doe",
  },
];

const demoBankAccounts = [
  {
    id: "ba_1",
    type: "bank",
    bankName: "Chase Bank",
    last4: "6789",
    accountType: "checking",
    isDefault: true,
  },
];

const cardBrands = {
  visa: {
    name: "Visa",
    gradient: "from-blue-600 to-blue-700",
    bg: "bg-blue-600",
    light: "bg-blue-50 text-blue-700 border-blue-200",
  },
  mastercard: {
    name: "Mastercard",
    gradient: "from-red-500 to-orange-500",
    bg: "bg-red-500",
    light: "bg-red-50 text-red-700 border-red-200",
  },
  amex: {
    name: "Amex",
    gradient: "from-blue-400 to-cyan-500",
    bg: "bg-blue-400",
    light: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  discover: {
    name: "Discover",
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-500",
    light: "bg-orange-50 text-orange-700 border-orange-200",
  },
};

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState(demoPaymentMethods);
  const [bankAccounts, setBankAccounts] = useState(demoBankAccounts);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [activeTab, setActiveTab] = useState("cards");
  const [isProcessing, setIsProcessing] = useState(false);

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    setAsDefault: false,
  });

  const [newBank, setNewBank] = useState({
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    accountHolderName: "",
    setAsDefault: false,
  });

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const detectCardBrand = (number) => {
    const n = number.replace(/\s/g, "");
    if (/^4/.test(n)) return "visa";
    if (/^5[1-5]/.test(n)) return "mastercard";
    if (/^3[47]/.test(n)) return "amex";
    if (/^6(?:011|5)/.test(n)) return "discover";
    return null;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      setNewCard({ ...newCard, cardNumber: formatted });
    }
  };

  const setDefaultPaymentMethod = useCallback((id) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({ ...pm, isDefault: pm.id === id })),
    );
    toast.success("✅ Default payment method updated", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const setDefaultBankAccount = useCallback((id) => {
    setBankAccounts((prev) =>
      prev.map((ba) => ({ ...ba, isDefault: ba.id === id })),
    );
    toast.success("✅ Default bank account updated", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const deletePaymentMethod = useCallback(
    (id) => {
      const method = paymentMethods.find((pm) => pm.id === id);
      if (method?.isDefault) {
        toast.error("Cannot delete default payment method", {
          style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
        });
        return;
      }
      setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
      setShowDeleteModal(null);
      toast.success("🗑️ Payment method removed", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    },
    [paymentMethods],
  );

  const deleteBankAccount = useCallback(
    (id) => {
      const account = bankAccounts.find((ba) => ba.id === id);
      if (account?.isDefault && bankAccounts.length > 1) {
        toast.error("Cannot delete default bank account", {
          style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
        });
        return;
      }
      setBankAccounts((prev) => prev.filter((ba) => ba.id !== id));
      setShowDeleteModal(null);
      toast.success("🗑️ Bank account removed", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    },
    [bankAccounts],
  );

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (newCard.cardNumber.replace(/\s/g, "").length < 15) {
      toast.error("Please enter a valid card number");
      return;
    }
    if (!newCard.cardholderName.trim()) {
      toast.error("Please enter cardholder name");
      return;
    }
    if (!newCard.expMonth || !newCard.expYear) {
      toast.error("Please enter expiration date");
      return;
    }
    if (newCard.cvc.length < 3) {
      toast.error("Please enter a valid CVC");
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const brand = detectCardBrand(newCard.cardNumber) || "visa";
    const newPM = {
      id: `pm_${Date.now()}`,
      type: "card",
      brand,
      last4: newCard.cardNumber.replace(/\s/g, "").slice(-4),
      expMonth: parseInt(newCard.expMonth),
      expYear: parseInt(newCard.expYear),
      isDefault: newCard.setAsDefault || paymentMethods.length === 0,
      cardholderName: newCard.cardholderName,
    };

    if (newCard.setAsDefault) {
      setPaymentMethods((prev) => [
        ...prev.map((pm) => ({ ...pm, isDefault: false })),
        newPM,
      ]);
    } else {
      setPaymentMethods((prev) => [...prev, newPM]);
    }

    setIsProcessing(false);
    setShowAddCardModal(false);
    setNewCard({
      cardNumber: "",
      cardholderName: "",
      expMonth: "",
      expYear: "",
      cvc: "",
      setAsDefault: false,
    });
    toast.success("💳 Card added successfully", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  };

  const handleAddBank = async (e) => {
    e.preventDefault();
    if (!newBank.bankName.trim()) {
      toast.error("Please enter bank name");
      return;
    }
    if (newBank.accountNumber.length < 8) {
      toast.error("Please enter a valid account number");
      return;
    }
    if (newBank.routingNumber.length !== 9) {
      toast.error("Routing number must be 9 digits");
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newBA = {
      id: `ba_${Date.now()}`,
      type: "bank",
      bankName: newBank.bankName,
      last4: newBank.accountNumber.slice(-4),
      accountType: newBank.accountType,
      isDefault: newBank.setAsDefault || bankAccounts.length === 0,
    };

    if (newBank.setAsDefault) {
      setBankAccounts((prev) => [
        ...prev.map((ba) => ({ ...ba, isDefault: false })),
        newBA,
      ]);
    } else {
      setBankAccounts((prev) => [...prev, newBA]);
    }

    setIsProcessing(false);
    setShowAddBankModal(false);
    setNewBank({
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      accountType: "checking",
      accountHolderName: "",
      setAsDefault: false,
    });
    toast.success("🏦 Bank account linked successfully", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  };

  const closeAllModals = () => {
    setShowAddCardModal(false);
    setShowAddBankModal(false);
    setShowDeleteModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Wallet className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Payment Methods
              </h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                Manage your cards and bank accounts securely
              </p>
            </div>
          </div>
        </div>

        {/* Security Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200">
            <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 text-sm sm:text-base">
              Bank-Level Security
            </h3>
            <p className="text-xs sm:text-sm text-emerald-700 mt-0.5 leading-relaxed">
              All payment information is encrypted end-to-end and processed
              securely through Stripe. Your data is PCI DSS compliant.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 sm:mb-6 overflow-hidden">
          <div className="p-1.5 sm:p-2 flex gap-1">
            {[
              {
                id: "cards",
                label: "Payment Cards",
                icon: CreditCard,
                count: paymentMethods.length,
              },
              {
                id: "bank",
                label: "Bank Accounts",
                icon: Building,
                count: bankAccounts.length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 shadow-inner ring-1 ring-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === "cards" ? "Cards" : "Banks"}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-xs font-bold ${
                    activeTab === tab.id
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── CARDS TAB ─── */}
        {activeTab === "cards" && (
          <div className="space-y-4 sm:space-y-5">
            {/* Add Card Button */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Add and manage your debit or credit cards
              </p>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Card</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {paymentMethods.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No cards added yet
                </h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  Add your first payment card to start funding escrow accounts
                  and paying for services.
                </p>
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add your first card
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const brand = cardBrands[method.brand] || cardBrands.visa;
                  return (
                    <div
                      key={method.id}
                      className={`group relative bg-gradient-to-br ${brand.gradient} rounded-2xl p-5 sm:p-6 text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                        method.isDefault
                          ? "ring-2 ring-blue-300 ring-offset-2"
                          : ""
                      }`}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                      <div className="relative">
                        {/* Top Row */}
                        <div className="flex items-start justify-between mb-6 sm:mb-8">
                          <div>
                            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">
                              {brand.name}
                            </p>
                            {method.isDefault && (
                              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-md text-[10px] font-bold">
                                <Star className="w-3 h-3" />
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <CreditCard className="w-8 h-8 text-white/30" />
                        </div>

                        {/* Card Number */}
                        <p className="text-base sm:text-lg font-mono tracking-[0.2em] mb-4 sm:mb-6">
                          •••• •••• •••• {method.last4}
                        </p>

                        {/* Bottom Row */}
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">
                              Card Holder
                            </p>
                            <p className="text-sm font-semibold">
                              {method.cardholderName}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">
                              Expires
                            </p>
                            <p className="text-sm font-semibold">
                              {String(method.expMonth).padStart(2, "0")}/
                              {method.expYear}
                            </p>
                          </div>
                        </div>

                        {/* Actions overlay */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-2xl flex items-center justify-center gap-3">
                          {!method.isDefault && (
                            <button
                              onClick={() => setDefaultPaymentMethod(method.id)}
                              className="px-4 py-2 bg-white text-gray-900 rounded-xl text-xs font-semibold hover:bg-gray-100 transition-colors"
                            >
                              Set Default
                            </button>
                          )}
                          {!method.isDefault && (
                            <button
                              onClick={() =>
                                setShowDeleteModal({
                                  type: "card",
                                  id: method.id,
                                })
                              }
                              className="p-2.5 bg-white/20 hover:bg-red-500 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Add New Card Placeholder */}
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-300 hover:bg-blue-50/30 transition-all min-h-[180px] group"
                >
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 group-hover:text-blue-600 transition-colors">
                    Add New Card
                  </p>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── BANK ACCOUNTS TAB ─── */}
        {activeTab === "bank" && (
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Link bank accounts for withdrawals
              </p>
              <button
                onClick={() => setShowAddBankModal(true)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Bank Account</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {bankAccounts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No bank accounts linked
                </h3>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                  Link your bank account to withdraw your earnings securely.
                </p>
                <button
                  onClick={() => setShowAddBankModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Link your first account
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      account.isDefault
                        ? "border-blue-200 hover:shadow-blue-100/50"
                        : "border-gray-100 hover:border-gray-200 hover:shadow-gray-100/50"
                    }`}
                  >
                    {account.isDefault && (
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                    )}
                    <div className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Building className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <p className="font-bold text-gray-900 text-sm sm:text-base">
                                {account.bankName}
                              </p>
                              {account.isDefault && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold rounded-md">
                                  <Star className="w-3 h-3" />
                                  DEFAULT
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {account.accountType.charAt(0).toUpperCase() +
                                account.accountType.slice(1)}{" "}
                              •••• {account.last4}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!account.isDefault && (
                            <button
                              onClick={() => setDefaultBankAccount(account.id)}
                              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-semibold transition-all"
                            >
                              Set Default
                            </button>
                          )}
                          {!account.isDefault && (
                            <button
                              onClick={() =>
                                setShowDeleteModal({
                                  type: "bank",
                                  id: account.id,
                                })
                              }
                              className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Mobile actions */}
                      {!account.isDefault && (
                        <div className="flex items-center gap-2 mt-3 sm:hidden">
                          <button
                            onClick={() => setDefaultBankAccount(account.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-blue-600 bg-blue-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <Star className="w-3.5 h-3.5" />
                            Set Default
                          </button>
                          <button
                            onClick={() =>
                              setShowDeleteModal({
                                type: "bank",
                                id: account.id,
                              })
                            }
                            className="flex items-center justify-center gap-1.5 px-3 py-2 text-red-600 bg-red-50 rounded-xl text-xs font-semibold transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              About Payment Methods
            </h3>
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: CreditCard,
                  title: "Payment Cards",
                  desc: "Used to fund escrow accounts and pay for services",
                  color: "from-blue-400 to-indigo-500",
                  bg: "bg-blue-50",
                },
                {
                  icon: Building,
                  title: "Bank Accounts",
                  desc: "Used to withdraw your earnings to your bank",
                  color: "from-emerald-400 to-green-500",
                  bg: "bg-emerald-50",
                },
                {
                  icon: Shield,
                  title: "Encrypted & Secure",
                  desc: "All data is encrypted using bank-level security",
                  color: "from-violet-400 to-purple-500",
                  bg: "bg-violet-50",
                },
                {
                  icon: Lock,
                  title: "PCI Compliant",
                  desc: "We never store your full card details on our servers",
                  color: "from-amber-400 to-orange-500",
                  bg: "bg-amber-50",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.bg} rounded-xl p-4 transition-all hover:scale-[1.02] cursor-default`}
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── ADD CARD MODAL ─── */}
      {showAddCardModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Add Payment Card
                    </h2>
                    <p className="text-xs text-gray-500">
                      Securely add a new card
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddCardModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <form
              onSubmit={handleAddCard}
              className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-140px)]"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={newCard.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                  />
                  {detectCardBrand(newCard.cardNumber) && (
                    <div
                      className={`absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 ${
                        cardBrands[detectCardBrand(newCard.cardNumber)]?.bg
                      } rounded-md text-white text-[10px] font-bold uppercase`}
                    >
                      {detectCardBrand(newCard.cardNumber)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={newCard.cardholderName}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cardholderName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Month
                  </label>
                  <select
                    value={newCard.expMonth}
                    onChange={(e) =>
                      setNewCard({ ...newCard, expMonth: e.target.value })
                    }
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option
                        key={i + 1}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Year
                  </label>
                  <select
                    value={newCard.expYear}
                    onChange={(e) =>
                      setNewCard({ ...newCard, expYear: e.target.value })
                    }
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={2024 + i}>
                        {2024 + i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    CVC
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newCard.cvc}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        setNewCard({ ...newCard, cvc: value });
                      }}
                      placeholder="•••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                <input
                  type="checkbox"
                  checked={newCard.setAsDefault}
                  onChange={(e) =>
                    setNewCard({ ...newCard, setAsDefault: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Set as default payment method
                </span>
              </label>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Your card information is encrypted and securely processed by
                  Stripe. We never store your full card number.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Add Card
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="flex-1 sm:flex-initial px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADD BANK MODAL ─── */}
      {showAddBankModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && closeAllModals()}
        >
          <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Link Bank Account
                    </h2>
                    <p className="text-xs text-gray-500">
                      Add a bank for withdrawals
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddBankModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <form
              onSubmit={handleAddBank}
              className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-140px)]"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={newBank.bankName}
                  onChange={(e) =>
                    setNewBank({ ...newBank, bankName: e.target.value })
                  }
                  placeholder="Chase Bank"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={newBank.accountHolderName}
                  onChange={(e) =>
                    setNewBank({
                      ...newBank,
                      accountHolderName: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["checking", "savings"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setNewBank({ ...newBank, accountType: type })
                      }
                      className={`p-3.5 rounded-xl border-2 transition-all font-semibold text-sm ${
                        newBank.accountType === type
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Routing Number
                </label>
                <input
                  type="text"
                  value={newBank.routingNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                    setNewBank({ ...newBank, routingNumber: value });
                  }}
                  placeholder="123456789"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Account Number
                </label>
                <input
                  type="text"
                  value={newBank.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 17);
                    setNewBank({ ...newBank, accountNumber: value });
                  }}
                  placeholder="000123456789"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                <input
                  type="checkbox"
                  checked={newBank.setAsDefault}
                  onChange={(e) =>
                    setNewBank({ ...newBank, setAsDefault: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Set as default withdrawal account
                </span>
              </label>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Your bank information is encrypted and securely stored with
                  bank-level security protocols.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Building className="w-4 h-4" />
                      Link Account
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddBankModal(false)}
                  className="flex-1 sm:flex-initial px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE MODAL ─── */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setShowDeleteModal(null)
          }
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Remove{" "}
              {showDeleteModal.type === "card"
                ? "Payment Card"
                : "Bank Account"}
              ?
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              This action cannot be undone. You can always add it back later.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  showDeleteModal.type === "card"
                    ? deletePaymentMethod(showDeleteModal.id)
                    : deleteBankAccount(showDeleteModal.id)
                }
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 font-semibold shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
