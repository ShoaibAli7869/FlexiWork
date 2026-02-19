import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  Settings as SettingsIcon,
  Mail,
  Bell,
  BellOff,
  Lock,
  Shield,
  Trash2,
  Save,
  Eye,
  EyeOff,
  User,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Fingerprint,
  Globe,
  Palette,
  Moon,
  Smartphone,
  Key,
  X,
  Zap,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [notifications, setNotifications] = useState({
    email: true,
    proposals: true,
    messages: true,
    marketing: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const notificationLabels = {
    email: {
      label: "Email Notifications",
      desc: "Receive updates via email",
      icon: Mail,
    },
    proposals: {
      label: "Proposal Alerts",
      desc: "New proposals on your projects",
      icon: Zap,
    },
    messages: {
      label: "Message Notifications",
      desc: "When someone sends you a message",
      icon: Bell,
    },
    marketing: {
      label: "Marketing Emails",
      desc: "Tips, product updates, and offers",
      icon: Globe,
    },
  };

  const handleSaveEmail = useCallback(() => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
      return;
    }
    updateProfile({ email });
    toast.success("✅ Email updated successfully!", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, [email, updateProfile]);

  const handleSaveNotifications = useCallback(() => {
    toast.success("🔔 Notification preferences saved!", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const handleUpdatePassword = useCallback(() => {
    if (!passwords.current) {
      toast.error("Please enter your current password");
      return;
    }
    if (passwords.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    if (passwords.newPassword !== passwords.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    setPasswords({ current: "", newPassword: "", confirm: "" });
    toast.success("🔒 Password updated successfully!", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, [passwords]);

  const handleDeleteAccount = useCallback(() => {
    if (deleteConfirmText !== "DELETE") return;
    logout();
    navigate("/");
    toast.success("Account deleted", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, [deleteConfirmText, logout, navigate]);

  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      return { label: "Weak", color: "from-red-500 to-red-400", width: "20%" };
    if (score <= 2)
      return {
        label: "Fair",
        color: "from-orange-500 to-amber-400",
        width: "40%",
      };
    if (score <= 3)
      return {
        label: "Good",
        color: "from-yellow-500 to-amber-400",
        width: "60%",
      };
    if (score <= 4)
      return {
        label: "Strong",
        color: "from-emerald-500 to-green-400",
        width: "80%",
      };
    return {
      label: "Very Strong",
      color: "from-emerald-500 to-green-400",
      width: "100%",
    };
  };

  const strength = getPasswordStrength(passwords.newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className=" mx-auto px-4 sm:px-6 sm:py-6 ">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-300">
                <SettingsIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Settings
              </h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                Manage your account preferences and security
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* ─── ACCOUNT SETTINGS ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Account Settings</h2>
                  <p className="text-xs text-gray-500">
                    Update your account information
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveEmail}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
                >
                  <Save className="w-4 h-4" />
                  Save Email
                </button>
              </div>
            </div>
          </div>

          {/* ─── NOTIFICATIONS ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Notifications</h2>
                  <p className="text-xs text-gray-500">
                    Choose what you want to be notified about
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {Object.entries(notifications).map(([key, value]) => {
                const config = notificationLabels[key];
                const Icon = config.icon;
                return (
                  <label
                    key={key}
                    className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors ${
                          value
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {config.label}
                        </p>
                        <p className="text-xs text-gray-500">{config.desc}</p>
                      </div>
                    </div>
                    {/* Toggle */}
                    <div className="relative flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [key]: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                          value ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                            value ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                onClick={handleSaveNotifications}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-amber-200 hover:shadow-lg hover:from-amber-600 hover:to-orange-700 transition-all active:scale-[0.98]"
              >
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          </div>

          {/* ─── PASSWORD ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Change Password</h2>
                  <p className="text-xs text-gray-500">
                    Update your password regularly for security
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {/* Password Strength */}
                {passwords.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-400 font-medium">
                        Password strength
                      </span>
                      <span
                        className={`text-[11px] font-bold ${
                          strength.label === "Weak"
                            ? "text-red-500"
                            : strength.label === "Fair"
                              ? "text-orange-500"
                              : strength.label === "Good"
                                ? "text-yellow-600"
                                : "text-emerald-600"
                        }`}
                      >
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${strength.color} rounded-full transition-all duration-500`}
                        style={{ width: strength.width }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      passwords.confirm &&
                      passwords.confirm !== passwords.newPassword
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-400"
                        : passwords.confirm &&
                            passwords.confirm === passwords.newPassword
                          ? "border-emerald-300 focus:ring-emerald-500/20 focus:border-emerald-400"
                          : "border-gray-200 focus:ring-violet-500/20 focus:border-violet-400"
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {passwords.confirm &&
                    passwords.confirm === passwords.newPassword && (
                      <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    )}
                </div>
                {passwords.confirm &&
                  passwords.confirm !== passwords.newPassword && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Passwords don't match
                    </p>
                  )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleUpdatePassword}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-violet-200 hover:shadow-lg hover:from-violet-700 hover:to-purple-700 transition-all active:scale-[0.98]"
                >
                  <Key className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* ─── SECURITY ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Security</h2>
                  <p className="text-xs text-gray-500">
                    Additional security settings
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                {
                  icon: Smartphone,
                  label: "Two-Factor Authentication",
                  desc: "Add an extra layer of security to your account",
                  action: "Enable",
                  color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
                },
                {
                  icon: Globe,
                  label: "Active Sessions",
                  desc: "Manage your active login sessions",
                  action: "View",
                  color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
                },
                {
                  icon: Shield,
                  label: "Login History",
                  desc: "Review recent login activity",
                  action: "View",
                  color: "text-violet-600 bg-violet-50 hover:bg-violet-100",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all ${item.color}`}
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ─── DANGER ZONE ─── */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-red-500 to-rose-500" />
            <div className="p-5 sm:p-6 border-b border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-red-700">Danger Zone</h2>
                  <p className="text-xs text-red-500">Irreversible actions</p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-4">
                <Info className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-800 font-semibold mb-1">
                    Delete your account
                  </p>
                  <p className="text-xs text-red-600 leading-relaxed">
                    Once you delete your account, all your data, projects,
                    contracts, and payment history will be permanently removed.
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-red-200 hover:shadow-lg hover:from-red-700 hover:to-rose-700 transition-all active:scale-[0.98]"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* ─── DELETE CONFIRMATION MODAL ─── */}
        {showDeleteConfirm && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setShowDeleteConfirm(false)
            }
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl lg:rounded-3xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Delete Account
                      </h2>
                      <p className="text-xs text-gray-500">
                        This cannot be undone
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
                  <p className="text-sm text-red-700 leading-relaxed">
                    All your data including projects, contracts, messages,
                    payment history, and profile information will be permanently
                    deleted.
                  </p>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Type{" "}
                    <span className="font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                      DELETE
                    </span>{" "}
                    to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
                    placeholder="DELETE"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== "DELETE"}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold shadow-lg shadow-red-200 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
