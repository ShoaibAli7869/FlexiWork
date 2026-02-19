import { useState, useCallback, useRef, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import {
  User,
  Briefcase,
  FileText,
  DollarSign,
  MapPin,
  Tag,
  Save,
  Camera,
  Loader2,
  CheckCircle2,
  Shield,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Sparkles,
  AlertCircle,
  Eye,
  X,
  Link2,
  Star,
  Clock,
  Award,
  ChevronRight,
  Settings,
  Upload,
  Palette,
} from "lucide-react";

const InputField = ({
  icon: Icon,
  label,
  hint,
  error,
  className = "",
  children,
  ...props
}) => (
  <div className={`space-y-1.5 sm:space-y-2 ${className}`}>
    {label && (
      <div className="flex items-center justify-between">
        <label className="block text-xs sm:text-sm font-semibold text-slate-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {hint && (
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
            {hint}
          </span>
        )}
      </div>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-400 pointer-events-none" />
      )}
      {children || (
        <>
          {props.rows ? (
            <textarea
              {...props}
              className={`w-full ${
                Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"
              } pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 resize-none ${
                error
                  ? "border-red-300 focus:ring-red-500/20 focus:border-red-400"
                  : ""
              }`}
            />
          ) : (
            <input
              {...props}
              className={`w-full ${
                Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"
              } pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 ${
                error
                  ? "border-red-300 focus:ring-red-500/20 focus:border-red-400"
                  : ""
              }`}
            />
          )}
        </>
      )}
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
        <AlertCircle className="w-3 h-3 flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const SectionCard = ({
  icon: Icon,
  title,
  description,
  children,
  gradient,
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 overflow-hidden">
    <div className="p-4 sm:p-5 lg:p-6 border-b border-slate-100 bg-slate-50/30">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br ${
            gradient || "from-blue-500 to-blue-600"
          } rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {title}
          </h3>
          {description && (
            <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="p-4 sm:p-5 lg:p-6">{children}</div>
  </div>
);

const SkillTag = ({ skill, onRemove }) => (
  <span className="group inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-lg ring-1 ring-inset ring-blue-500/20 transition-all duration-200 hover:bg-blue-100">
    {skill}
    {onRemove && (
      <button
        type="button"
        onClick={() => onRemove(skill)}
        className="p-0.5 rounded-full hover:bg-blue-200 transition-colors opacity-60 group-hover:opacity-100"
        aria-label={`Remove ${skill}`}
      >
        <X className="w-3 h-3" />
      </button>
    )}
  </span>
);

const ProfileCompletionItem = ({ label, completed }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
        completed
          ? "bg-emerald-100 text-emerald-600"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {completed ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <div className="w-2 h-2 rounded-full bg-slate-300" />
      )}
    </div>
    <span
      className={`text-xs sm:text-sm ${
        completed ? "text-slate-500 line-through" : "text-slate-700 font-medium"
      }`}
    >
      {label}
    </span>
  </div>
);

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const fileInputRef = useRef(null);
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    title: user?.title || "",
    bio: user?.bio || "",
    hourlyRate: user?.hourlyRate || 50,
    location: user?.location || "",
    skills: user?.skills || [],
    email: user?.email || "",
    phone: user?.phone || "",
    website: user?.website || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    twitter: user?.twitter || "",
    avatar: user?.avatar || "",
    availability: user?.availability || "full-time",
    experience: user?.experience || "3-5",
  });

  const [errors, setErrors] = useState({});

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const addSkill = useCallback(() => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
    }
  }, [newSkill, formData.skills]);

  const removeSkill = useCallback((skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  }, []);

  const handleSkillKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
      }
      if (e.key === "," || e.key === "Tab") {
        e.preventDefault();
        addSkill();
      }
    },
    [addSkill],
  );

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.hourlyRate < 0)
      newErrors.hourlyRate = "Rate cannot be negative";
    return newErrors;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        toast.error("Please fix the errors before saving.", {
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            fontSize: "14px",
          },
        });
        return;
      }

      setSaving(true);
      try {
        await new Promise((r) => setTimeout(r, 800));
        updateProfile({
          ...formData,
        });
        toast.success("Profile updated successfully!", {
          icon: "✨",
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            fontSize: "14px",
          },
        });
      } catch {
        toast.error("Failed to save profile. Please try again.", {
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            fontSize: "14px",
          },
        });
      } finally {
        setSaving(false);
      }
    },
    [formData, validate, updateProfile],
  );

  const profileCompletion = useMemo(() => {
    const fields = [
      { label: "Full name", done: !!formData.name },
      { label: "Professional title", done: !!formData.title },
      { label: "Bio description", done: !!formData.bio },
      { label: "Hourly rate", done: formData.hourlyRate > 0 },
      { label: "Location", done: !!formData.location },
      { label: "Skills (3+)", done: formData.skills.length >= 3 },
      { label: "Profile photo", done: !!formData.avatar },
      { label: "Website or portfolio", done: !!formData.website },
    ];
    const completed = fields.filter((f) => f.done).length;
    return {
      fields,
      completed,
      total: fields.length,
      percentage: Math.round((completed / fields.length) * 100),
    };
  }, [formData]);

  const tabs = [
    { key: "general", label: "General", icon: User },
    { key: "professional", label: "Professional", icon: Briefcase },
    { key: "social", label: "Links", icon: Link2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Edit Profile
              </h1>
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500">
              Manage your personal information and preferences.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
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
          </button>
        </div>

        {/* Layout: Main + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5 lg:space-y-6 order-first">
            {/* Avatar Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 h-24 sm:h-28 relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              </div>
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 -mt-12 sm:-mt-14">
                <div className="relative inline-block">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt={formData.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {formData.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
                    aria-label="Upload photo"
                  >
                    <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        updateField("avatar", url);
                      }
                    }}
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                    {formData.name || "Your Name"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 truncate">
                    {formData.title || "Add your professional title"}
                  </p>
                  {formData.location && (
                    <p className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3 h-3" />
                      {formData.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Completion
                  </h3>
                </div>
                <span className="text-sm sm:text-base font-bold text-slate-900">
                  {profileCompletion.percentage}%
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    profileCompletion.percentage >= 80
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : profileCompletion.percentage >= 50
                        ? "bg-gradient-to-r from-amber-400 to-amber-500"
                        : "bg-gradient-to-r from-red-400 to-red-500"
                  }`}
                  style={{ width: `${profileCompletion.percentage}%` }}
                />
              </div>

              <div className="space-y-2.5">
                {profileCompletion.fields.map((field) => (
                  <ProfileCompletionItem
                    key={field.label}
                    label={field.label}
                    completed={field.done}
                  />
                ))}
              </div>
            </div>

            {/* Tab Navigation - Desktop */}
            <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }`}
                    >
                      <tab.icon
                        className={`w-[18px] h-[18px] ${
                          isActive ? "text-blue-600" : "text-slate-400"
                        }`}
                      />
                      {tab.label}
                      <ChevronRight
                        className={`w-4 h-4 ml-auto transition-transform ${
                          isActive
                            ? "text-blue-500 translate-x-0"
                            : "text-slate-300 -translate-x-1 opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Mobile Tab Navigation */}
            <div className="flex lg:hidden gap-1.5 bg-white rounded-2xl border border-slate-100 p-1.5 shadow-sm overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5 lg:space-y-6"
            >
              {/* General Tab */}
              {activeTab === "general" && (
                <>
                  <SectionCard
                    icon={User}
                    title="Personal Information"
                    description="Your basic profile details"
                    gradient="from-blue-500 to-blue-600"
                  >
                    <div className="space-y-4 sm:space-y-5">
                      <InputField
                        icon={User}
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="John Doe"
                        required
                        error={errors.name}
                      />

                      <InputField
                        icon={Briefcase}
                        label="Professional Title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="Full-Stack Developer"
                        hint="This appears on your profile"
                      />

                      <InputField
                        icon={FileText}
                        label="Bio"
                        value={formData.bio}
                        onChange={(e) => updateField("bio", e.target.value)}
                        placeholder="Tell clients about your experience, skills, and what makes you unique..."
                        rows={4}
                        hint={`${formData.bio.length}/500`}
                        maxLength={500}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          icon={MapPin}
                          label="Location"
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            updateField("location", e.target.value)
                          }
                          placeholder="San Francisco, CA"
                        />

                        <InputField
                          icon={Mail}
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>

                      <InputField
                        icon={Phone}
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        hint="Optional"
                      />
                    </div>
                  </SectionCard>

                  {/* Avatar URL (alternative) */}
                  <SectionCard
                    icon={Camera}
                    title="Profile Photo"
                    description="Upload or enter an image URL"
                    gradient="from-violet-500 to-purple-600"
                  >
                    <div className="space-y-4">
                      <InputField
                        icon={Link2}
                        label="Image URL"
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => updateField("avatar", e.target.value)}
                        placeholder="https://example.com/your-photo.jpg"
                        hint="Or upload above"
                      />
                      {formData.avatar && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                              src={formData.avatar}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-700 truncate">
                              Profile photo preview
                            </p>
                            <p className="text-xs text-slate-500">
                              Image loaded successfully
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateField("avatar", "")}
                            className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            <X className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Professional Tab */}
              {activeTab === "professional" && (
                <>
                  <SectionCard
                    icon={DollarSign}
                    title="Rate & Availability"
                    description="Set your pricing and schedule"
                    gradient="from-emerald-500 to-emerald-600"
                  >
                    <div className="space-y-4 sm:space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField
                          icon={DollarSign}
                          label="Hourly Rate (USD)"
                          type="number"
                          min="0"
                          value={formData.hourlyRate}
                          onChange={(e) =>
                            updateField(
                              "hourlyRate",
                              parseInt(e.target.value) || 0,
                            )
                          }
                          placeholder="50"
                          error={errors.hourlyRate}
                        />

                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                            Availability
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-400 pointer-events-none" />
                            <select
                              value={formData.availability}
                              onChange={(e) =>
                                updateField("availability", e.target.value)
                              }
                              className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                            >
                              <option value="full-time">
                                Full-time (40+ hrs/week)
                              </option>
                              <option value="part-time">
                                Part-time (20-30 hrs/week)
                              </option>
                              <option value="freelance">
                                Freelance (10-20 hrs/week)
                              </option>
                              <option value="not-available">
                                Not Available
                              </option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                          Experience Level
                        </label>
                        <div className="relative">
                          <Award className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-400 pointer-events-none" />
                          <select
                            value={formData.experience}
                            onChange={(e) =>
                              updateField("experience", e.target.value)
                            }
                            className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                          >
                            <option value="entry">
                              Entry Level (0-1 years)
                            </option>
                            <option value="1-3">Junior (1-3 years)</option>
                            <option value="3-5">Mid-Level (3-5 years)</option>
                            <option value="5-10">Senior (5-10 years)</option>
                            <option value="10+">Expert (10+ years)</option>
                          </select>
                          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                        </div>
                      </div>

                      {/* Rate Preview */}
                      <div className="flex items-center gap-3 p-3 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-emerald-800">
                            ${formData.hourlyRate}/hr · ~$
                            {(formData.hourlyRate * 160).toLocaleString()}/month
                          </p>
                          <p className="text-xs text-emerald-600">
                            Based on 160 hours/month estimate
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard
                    icon={Tag}
                    title="Skills & Expertise"
                    description="Add your technical and professional skills"
                    gradient="from-amber-500 to-orange-500"
                  >
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                            placeholder="Type a skill and press Enter"
                            className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={addSkill}
                          disabled={!newSkill.trim()}
                          className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] flex-shrink-0"
                        >
                          Add
                        </button>
                      </div>

                      {formData.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <SkillTag
                              key={skill}
                              skill={skill}
                              onRemove={removeSkill}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 sm:py-8">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Palette className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="text-sm font-medium text-slate-500">
                            No skills added yet
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Add skills to help clients find you
                          </p>
                        </div>
                      )}

                      {formData.skills.length > 0 && (
                        <p className="text-xs text-slate-400">
                          {formData.skills.length} skill
                          {formData.skills.length !== 1 ? "s" : ""} added ·
                          Click × to remove
                        </p>
                      )}
                    </div>
                  </SectionCard>
                </>
              )}

              {/* Social/Links Tab */}
              {activeTab === "social" && (
                <SectionCard
                  icon={Globe}
                  title="Online Presence"
                  description="Add your website and social profiles"
                  gradient="from-indigo-500 to-indigo-600"
                >
                  <div className="space-y-4 sm:space-y-5">
                    <InputField
                      icon={Globe}
                      label="Website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />

                    <InputField
                      icon={Linkedin}
                      label="LinkedIn"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />

                    <InputField
                      icon={Github}
                      label="GitHub"
                      type="url"
                      value={formData.github}
                      onChange={(e) => updateField("github", e.target.value)}
                      placeholder="https://github.com/username"
                    />

                    <InputField
                      icon={Twitter}
                      label="Twitter / X"
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => updateField("twitter", e.target.value)}
                      placeholder="https://twitter.com/username"
                    />

                    {/* Links Preview */}
                    {(formData.website ||
                      formData.linkedin ||
                      formData.github ||
                      formData.twitter) && (
                      <div className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-xs font-semibold text-slate-500 mb-2.5 uppercase tracking-wider">
                          Preview
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.website && (
                            <a
                              href={formData.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs sm:text-sm font-medium text-slate-700 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                            >
                              <Globe className="w-3.5 h-3.5 text-blue-500" />
                              Website
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                          {formData.linkedin && (
                            <a
                              href={formData.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs sm:text-sm font-medium text-slate-700 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                            >
                              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                              LinkedIn
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                          {formData.github && (
                            <a
                              href={formData.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs sm:text-sm font-medium text-slate-700 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                            >
                              <Github className="w-3.5 h-3.5 text-slate-800" />
                              GitHub
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                          {formData.twitter && (
                            <a
                              href={formData.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs sm:text-sm font-medium text-slate-700 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                            >
                              <Twitter className="w-3.5 h-3.5 text-sky-500" />
                              Twitter
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Save Button - Bottom */}
              <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      name: user?.name || "",
                      title: user?.title || "",
                      bio: user?.bio || "",
                      hourlyRate: user?.hourlyRate || 50,
                      location: user?.location || "",
                      skills: user?.skills || [],
                      email: user?.email || "",
                      phone: user?.phone || "",
                      website: user?.website || "",
                      linkedin: user?.linkedin || "",
                      github: user?.github || "",
                      twitter: user?.twitter || "",
                      avatar: user?.avatar || "",
                      availability: user?.availability || "full-time",
                      experience: user?.experience || "3-5",
                    })
                  }
                  className="px-5 py-2.5 sm:py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all duration-200 active:scale-[0.98]"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Visibility Tip */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 lg:p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Profile Visibility Tip
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Complete profiles get 3x more views and are 5x more likely to
                  be hired by clients.
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
