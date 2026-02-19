import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import {
  User,
  Building,
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Camera,
  Save,
  Shield,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  Star,
  Loader2,
  ExternalLink,
  Lock,
  BadgeCheck,
  Zap,
  FileText,
  Edit3,
  Image,
  Info,
  Link as LinkIcon,
  AtSign,
  Hash,
  Eye,
  Target,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";

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

const tabContentVariants = {
  enter: { opacity: 0, x: 20 },
  center: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

// ─── Constants ───────────────────────────────────────────────────────

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Marketing",
  "Real Estate",
  "Manufacturing",
  "Entertainment",
  "Non-profit",
  "Other",
];

const companySizes = [
  "Just me",
  "2-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

const timezones = [
  "UTC-12",
  "UTC-11",
  "UTC-10",
  "UTC-9",
  "UTC-8 (PST)",
  "UTC-7 (MST)",
  "UTC-6 (CST)",
  "UTC-5 (EST)",
  "UTC-4",
  "UTC-3",
  "UTC-2",
  "UTC-1",
  "UTC+0 (GMT)",
  "UTC+1",
  "UTC+2",
  "UTC+3",
  "UTC+4",
  "UTC+5",
  "UTC+5:30 (IST)",
  "UTC+6",
  "UTC+7",
  "UTC+8",
  "UTC+9",
  "UTC+10",
  "UTC+11",
  "UTC+12",
];

const tabsConfig = [
  { id: "profile", label: "Profile", icon: User, color: "blue" },
  { id: "company", label: "Company", icon: Building2, color: "violet" },
  { id: "verification", label: "Verification", icon: Shield, color: "emerald" },
];

const verificationItems = [
  {
    type: "Email",
    icon: Mail,
    key: "email",
    description: "Verify your email address",
    color: "blue",
  },
  {
    type: "Phone",
    icon: Phone,
    key: "phone",
    description: "Add and verify your phone number",
    color: "violet",
  },
  {
    type: "Identity",
    icon: User,
    key: "identity",
    description: "Upload a government-issued ID",
    color: "amber",
  },
  {
    type: "Payment",
    icon: Shield,
    key: "payment",
    description: "Add a verified payment method",
    color: "emerald",
  },
];

const verificationBenefits = [
  { icon: BadgeCheck, text: "Verified badge on your profile" },
  { icon: TrendingUp, text: "40% more proposals from top freelancers" },
  { icon: Zap, text: "Priority customer support" },
  { icon: Star, text: "Higher trust score in the marketplace" },
];

const hiringStats = [
  {
    label: "Jobs Posted",
    value: "12",
    icon: Briefcase,
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-50",
  },
  {
    label: "Freelancers Hired",
    value: "8",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-50",
  },
  {
    label: "Total Spent",
    value: "$45k",
    icon: CircleDollarSign,
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "bg-violet-50",
  },
];

// ─── Sub Components ──────────────────────────────────────────────────

const InputField = memo(
  ({ label, icon: Icon, iconColor, required, hint, children }) => (
    <div className="space-y-1.5">
      <label className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          {Icon && (
            <Icon className={`w-4 h-4 ${iconColor || "text-gray-400"}`} />
          )}
          {label}
          {required && <span className="text-red-400 text-xs">*</span>}
        </span>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </label>
      {children}
    </div>
  ),
);
InputField.displayName = "InputField";

const SectionCard = memo(
  ({ icon: Icon, iconColor, iconBg, title, subtitle, children }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="flex items-center gap-2.5 p-5 sm:p-6 pb-0">
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
      <div className="p-5 sm:p-6 pt-4">{children}</div>
    </motion.div>
  ),
);
SectionCard.displayName = "SectionCard";

const VerificationCard = memo(({ item, verified, onVerify }) => {
  const colorMap = {
    blue: { bg: "bg-blue-100", icon: "text-blue-600", glow: "bg-blue-50" },
    violet: {
      bg: "bg-violet-100",
      icon: "text-violet-600",
      glow: "bg-violet-50",
    },
    amber: { bg: "bg-amber-100", icon: "text-amber-600", glow: "bg-amber-50" },
    emerald: {
      bg: "bg-emerald-100",
      icon: "text-emerald-600",
      glow: "bg-emerald-50",
    },
  };
  const colors = colorMap[item.color] || colorMap.blue;

  return (
    <motion.div
      variants={itemVariants}
      className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
        verified
          ? "bg-emerald-50/50 border-emerald-200"
          : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 ${verified ? "bg-emerald-100" : colors.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}
        >
          <item.icon
            className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${verified ? "text-emerald-600" : colors.icon}`}
            strokeWidth={2}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {item.type}
            </p>
            {verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </motion.div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {item.description}
          </p>
        </div>
      </div>
      {verified ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider rounded-xl shrink-0">
          <BadgeCheck className="w-3.5 h-3.5" />
          Verified
        </span>
      ) : (
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onVerify(item.type)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all shrink-0"
        >
          Verify Now
        </motion.button>
      )}
    </motion.div>
  );
});
VerificationCard.displayName = "VerificationCard";

const HiringStatCard = memo(({ stat }) => (
  <div className="relative overflow-hidden p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-sm transition-all duration-200 group">
    <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.06] transform translate-x-3 -translate-y-3">
      <stat.icon className="w-full h-full" />
    </div>
    <div
      className={`w-9 h-9 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-2.5 shadow-sm group-hover:scale-110 transition-transform duration-300`}
    >
      <stat.icon className="w-4.5 h-4.5 text-white" strokeWidth={2} />
    </div>
    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
    <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
  </div>
));
HiringStatCard.displayName = "HiringStatCard";

// ─── Main Component ──────────────────────────────────────────────────

const ClientProfile = () => {
  const { user, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    companyName: user?.companyName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    website: user?.website || "",
    industry: user?.industry || "",
    companySize: user?.companySize || "",
    bio: user?.bio || "",
    timezone: user?.timezone || "UTC-5",
  });

  const [verificationStatus] = useState({
    email: true,
    phone: false,
    identity: false,
    payment: true,
  });

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const completeness = useMemo(() => {
    const fields = [
      formData.name,
      formData.companyName,
      formData.email,
      formData.phone,
      formData.location,
      formData.website,
      formData.industry,
      formData.companySize,
      formData.bio,
    ];
    const filled = fields.filter((f) => f && f.trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  const completenessChecklist = useMemo(
    () => [
      { label: "Full Name", done: !!formData.name.trim() },
      { label: "Email Address", done: !!formData.email.trim() },
      { label: "Company Name", done: !!formData.companyName.trim() },
      { label: "Phone Number", done: !!formData.phone.trim() },
      { label: "Location", done: !!formData.location.trim() },
      { label: "Website", done: !!formData.website.trim() },
      { label: "Industry", done: !!formData.industry },
      { label: "Company Size", done: !!formData.companySize },
      { label: "Bio", done: !!formData.bio.trim() },
    ],
    [formData],
  );

  const verifiedCount = useMemo(
    () => Object.values(verificationStatus).filter(Boolean).length,
    [verificationStatus],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      updateProfile(formData);
      setSaving(false);
      toast.success("Profile updated successfully!");
    },
    [formData, updateProfile],
  );

  const handleAvatarUpload = useCallback(() => {
    toast.success("Avatar upload feature coming soon!");
  }, []);

  const handleVerify = useCallback((type) => {
    toast.success(`${type} verification initiated!`);
  }, []);

  const getProgressColor = useMemo(() => {
    if (completeness < 40) return "from-red-400 to-red-500";
    if (completeness < 70) return "from-amber-400 to-orange-500";
    return "from-emerald-400 to-emerald-500";
  }, [completeness]);

  const inputClasses =
    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400";
  const selectClasses =
    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer";

  return (
    <motion.div
      className=" mx-auto px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Client Profile
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Manage your profile, company info & verification
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Tab Navigation */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm"
          >
            <nav className="flex gap-1 overflow-x-auto no-scrollbar">
              {tabsConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-1 sm:flex-initial justify-center sm:justify-start ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Tab Content */}
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* ── Profile Tab ──────────────────────── */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  variants={tabContentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  {/* Avatar Section */}
                  <SectionCard
                    icon={Image}
                    iconColor="text-rose-600"
                    iconBg="bg-rose-100"
                    title="Profile Photo"
                    subtitle="Your public avatar"
                  >
                    <div className="flex items-center gap-5 sm:gap-6">
                      <div className="relative group">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                          {formData.name ? formData.name[0].toUpperCase() : "C"}
                        </div>
                        <button
                          type="button"
                          onClick={handleAvatarUpload}
                          className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-md hover:bg-gray-50 hover:scale-110 transition-all duration-200"
                        >
                          <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                          {formData.name || "Your Name"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formData.email}
                        </p>
                        <button
                          type="button"
                          onClick={handleAvatarUpload}
                          className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                        >
                          <Edit3 className="w-3 h-3" />
                          Change photo
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Personal Info */}
                  <SectionCard
                    icon={User}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100"
                    title="Personal Information"
                    subtitle="Your basic contact details"
                  >
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          label="Full Name"
                          icon={User}
                          iconColor="text-blue-500"
                          required
                        >
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            className={inputClasses}
                            placeholder="John Doe"
                            required
                          />
                        </InputField>
                        <InputField
                          label="Email Address"
                          icon={Mail}
                          iconColor="text-rose-500"
                          required
                        >
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            className={inputClasses}
                            placeholder="john@example.com"
                            required
                          />
                        </InputField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          label="Phone Number"
                          icon={Phone}
                          iconColor="text-violet-500"
                        >
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            className={inputClasses}
                            placeholder="+1 (555) 123-4567"
                          />
                        </InputField>
                        <InputField
                          label="Location"
                          icon={MapPin}
                          iconColor="text-red-500"
                        >
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              updateField("location", e.target.value)
                            }
                            className={inputClasses}
                            placeholder="San Francisco, CA"
                          />
                        </InputField>
                      </div>

                      <InputField
                        label="Timezone"
                        icon={Globe}
                        iconColor="text-emerald-500"
                      >
                        <select
                          value={formData.timezone}
                          onChange={(e) =>
                            updateField("timezone", e.target.value)
                          }
                          className={selectClasses}
                        >
                          {timezones.map((tz) => (
                            <option key={tz} value={tz}>
                              {tz}
                            </option>
                          ))}
                        </select>
                      </InputField>

                      <InputField
                        label="About You"
                        icon={FileText}
                        iconColor="text-amber-500"
                        hint={`${formData.bio.length}/500`}
                      >
                        <textarea
                          value={formData.bio}
                          onChange={(e) => updateField("bio", e.target.value)}
                          rows={4}
                          maxLength={500}
                          className={`${inputClasses} resize-none leading-relaxed`}
                          placeholder="Tell freelancers about yourself and what you're looking for..."
                        />
                      </InputField>
                    </div>
                  </SectionCard>

                  {/* Save */}
                  <div className="flex justify-end pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={saving}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── Company Tab ──────────────────────── */}
              {activeTab === "company" && (
                <motion.div
                  key="company"
                  variants={tabContentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <SectionCard
                    icon={Building2}
                    iconColor="text-violet-600"
                    iconBg="bg-violet-100"
                    title="Company Details"
                    subtitle="Your organization information"
                  >
                    <div className="space-y-5">
                      <InputField
                        label="Company Name"
                        icon={Building}
                        iconColor="text-violet-500"
                      >
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            updateField("companyName", e.target.value)
                          }
                          className={inputClasses}
                          placeholder="Acme Inc."
                        />
                      </InputField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          label="Industry"
                          icon={Target}
                          iconColor="text-blue-500"
                        >
                          <select
                            value={formData.industry}
                            onChange={(e) =>
                              updateField("industry", e.target.value)
                            }
                            className={selectClasses}
                          >
                            <option value="">Select industry</option>
                            {industries.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </select>
                        </InputField>
                        <InputField
                          label="Company Size"
                          icon={Users}
                          iconColor="text-emerald-500"
                        >
                          <select
                            value={formData.companySize}
                            onChange={(e) =>
                              updateField("companySize", e.target.value)
                            }
                            className={selectClasses}
                          >
                            <option value="">Select size</option>
                            {companySizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </InputField>
                      </div>

                      <InputField
                        label="Company Website"
                        icon={LinkIcon}
                        iconColor="text-teal-500"
                      >
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) =>
                            updateField("website", e.target.value)
                          }
                          className={inputClasses}
                          placeholder="https://www.example.com"
                        />
                      </InputField>
                    </div>
                  </SectionCard>

                  {/* Hiring Stats */}
                  <SectionCard
                    icon={BarChart3}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100"
                    title="Hiring Stats"
                    subtitle="Your activity on the platform"
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {hiringStats.map((stat) => (
                        <HiringStatCard key={stat.label} stat={stat} />
                      ))}
                    </div>
                  </SectionCard>

                  {/* Save */}
                  <div className="flex justify-end pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={saving}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── Verification Tab ─────────────────── */}
              {activeTab === "verification" && (
                <motion.div
                  key="verification"
                  variants={tabContentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <SectionCard
                    icon={Shield}
                    iconColor="text-emerald-600"
                    iconBg="bg-emerald-100"
                    title="Account Verification"
                    subtitle={`${verifiedCount}/4 verified`}
                  >
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                      Verified accounts build more trust with freelancers and
                      get better responses to job postings.
                    </p>
                    <div className="space-y-3">
                      {verificationItems.map((item) => (
                        <VerificationCard
                          key={item.key}
                          item={item}
                          verified={verificationStatus[item.key]}
                          onVerify={handleVerify}
                        />
                      ))}
                    </div>
                  </SectionCard>

                  {/* Benefits */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-blue-900 text-sm sm:text-base">
                        Benefits of Full Verification
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {verificationBenefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 p-3 bg-white/60 rounded-xl"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                            <benefit.icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-blue-800">
                            {benefit.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* ── Sidebar ──────────────────────────────── */}
        <div className="order-first lg:order-last">
          <div className="lg:sticky lg:top-6 space-y-5">
            {/* Profile Completeness */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                  Completion
                </h3>
              </div>

              {/* Circular Progress */}
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-28 h-28">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="url(#profileGrad)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 264" }}
                      animate={{
                        strokeDasharray: `${(completeness / 100) * 264} 264`,
                      }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    />
                    <defs>
                      <linearGradient
                        id="profileGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor={
                            completeness >= 70
                              ? "#10b981"
                              : completeness >= 40
                                ? "#f59e0b"
                                : "#ef4444"
                          }
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            completeness >= 70
                              ? "#14b8a6"
                              : completeness >= 40
                                ? "#f97316"
                                : "#f87171"
                          }
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {completeness}%
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Complete
                    </span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                {completenessChecklist.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    {item.done ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                    )}
                    <span
                      className={
                        item.done
                          ? "text-gray-700 font-medium"
                          : "text-gray-400"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verification Summary */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4.5 h-4.5 text-emerald-600" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                  Verification
                </h3>
              </div>
              <div className="space-y-2.5">
                {verificationItems.map((item) => {
                  const verified = verificationStatus[item.key];
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="flex items-center gap-2 text-gray-600">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        {item.type}
                      </span>
                      {verified ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(verifiedCount / 4) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {verifiedCount}/4 verifications complete
              </p>
            </motion.div>

            {/* Trust Tips */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-amber-900 text-sm">
                  Build Trust
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-amber-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Complete your profile for a verified badge
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Add company details for credibility
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Verify your identity for top-tier trust
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Write a compelling bio to attract talent
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientProfile;
