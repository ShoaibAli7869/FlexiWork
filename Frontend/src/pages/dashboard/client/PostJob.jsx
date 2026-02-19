import { useState, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Code,
  Palette,
  PenTool,
  TrendingUp,
  Video,
  Music,
  BarChart3,
  Database,
  CheckCircle,
  DollarSign,
  Clock,
  Target,
  Star,
  Award,
  Zap,
  FileText,
  AlignLeft,
  Search,
  Hash,
  X,
  Sparkles,
  Lightbulb,
  ChevronRight,
  Send,
  Eye,
  Timer,
  Users,
  Shield,
  Layers,
  Info,
  Loader2,
  Type,
  List,
  ListOrdered,
  Bold,
  Italic,
  Link as LinkIcon,
  HelpCircle,
  Wand2,
  CircleDollarSign,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

// ─── Constants ───────────────────────────────────────────────────────

const categories = [
  { value: "Development", icon: Code, color: "blue" },
  { value: "Design", icon: Palette, color: "violet" },
  { value: "Writing", icon: PenTool, color: "emerald" },
  { value: "Marketing", icon: TrendingUp, color: "orange" },
  { value: "Video", icon: Video, color: "rose" },
  { value: "Music", icon: Music, color: "pink" },
  { value: "Business", icon: BarChart3, color: "amber" },
  { value: "Data", icon: Database, color: "cyan" },
];

const experiences = [
  {
    value: "Entry",
    label: "Entry Level",
    description: "New to the field",
    icon: Star,
    color: "emerald",
  },
  {
    value: "Intermediate",
    label: "Intermediate",
    description: "2-5 years experience",
    icon: TrendingUp,
    color: "blue",
  },
  {
    value: "Expert",
    label: "Expert",
    description: "5+ years experience",
    icon: Award,
    color: "violet",
  },
];

const durations = [
  { value: "Less than 1 week", label: "Less than 1 week", icon: "⚡" },
  { value: "1-2 weeks", label: "1-2 weeks", icon: "📅" },
  { value: "2-4 weeks", label: "2-4 weeks", icon: "📆" },
  { value: "1-3 months", label: "1-3 months", icon: "📋" },
  { value: "3-6 months", label: "3-6 months", icon: "📊" },
  { value: "6+ months", label: "6+ months", icon: "🏗️" },
];

const popularSkills = [
  "React",
  "Node.js",
  "Python",
  "Figma",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX Design",
  "JavaScript",
  "Next.js",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL",
  "MongoDB",
  "Vue.js",
  "Swift",
  "Flutter",
  "WordPress",
];

const colorMap = {
  blue: {
    selected:
      "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm shadow-blue-500/10",
    iconBg: "bg-blue-100",
    icon: "text-blue-600",
    text: "text-blue-700",
    ring: "ring-blue-500/20",
  },
  violet: {
    selected:
      "border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 shadow-sm shadow-violet-500/10",
    iconBg: "bg-violet-100",
    icon: "text-violet-600",
    text: "text-violet-700",
    ring: "ring-violet-500/20",
  },
  emerald: {
    selected:
      "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm shadow-emerald-500/10",
    iconBg: "bg-emerald-100",
    icon: "text-emerald-600",
    text: "text-emerald-700",
    ring: "ring-emerald-500/20",
  },
  orange: {
    selected:
      "border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-sm shadow-orange-500/10",
    iconBg: "bg-orange-100",
    icon: "text-orange-600",
    text: "text-orange-700",
    ring: "ring-orange-500/20",
  },
  rose: {
    selected:
      "border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 shadow-sm shadow-rose-500/10",
    iconBg: "bg-rose-100",
    icon: "text-rose-600",
    text: "text-rose-700",
    ring: "ring-rose-500/20",
  },
  pink: {
    selected:
      "border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-sm shadow-pink-500/10",
    iconBg: "bg-pink-100",
    icon: "text-pink-600",
    text: "text-pink-700",
    ring: "ring-pink-500/20",
  },
  amber: {
    selected:
      "border-amber-500 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm shadow-amber-500/10",
    iconBg: "bg-amber-100",
    icon: "text-amber-600",
    text: "text-amber-700",
    ring: "ring-amber-500/20",
  },
  cyan: {
    selected:
      "border-cyan-500 bg-gradient-to-br from-cyan-50 to-sky-50 shadow-sm shadow-cyan-500/10",
    iconBg: "bg-cyan-100",
    icon: "text-cyan-600",
    text: "text-cyan-700",
    ring: "ring-cyan-500/20",
  },
};

// ─── Animation Variants ──────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

// ─── Sub Components ──────────────────────────────────────────────────

const stepConfig = [
  { id: 1, title: "Basic Info", icon: Briefcase },
  { id: 2, title: "Description", icon: FileText },
  { id: 3, title: "Budget", icon: DollarSign },
];

const ProgressSteps = memo(({ currentStep }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm mb-6 sm:mb-8">
    <div className="flex items-center">
      {stepConfig.map((s, index) => {
        const isCompleted = currentStep > s.id;
        const isActive = currentStep === s.id;
        return (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
              <motion.div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  isCompleted
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                    : isActive
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                }`}
                animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isCompleted ? (
                  <CheckCircle
                    className="w-4.5 h-4.5 sm:w-5 sm:h-5"
                    strokeWidth={2.5}
                  />
                ) : (
                  <s.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                )}
              </motion.div>
              <div className="hidden sm:block">
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                        ? "text-emerald-600"
                        : "text-gray-400"
                  }`}
                >
                  Step {s.id}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    isActive || isCompleted ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {s.title}
                </p>
              </div>
            </div>
            {index < stepConfig.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4 h-0.5 rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
    {/* Mobile step labels */}
    <div className="flex justify-between mt-3 sm:hidden">
      {stepConfig.map((s) => (
        <span
          key={s.id}
          className={`text-[10px] font-bold uppercase tracking-wider ${
            currentStep === s.id
              ? "text-blue-600"
              : currentStep > s.id
                ? "text-emerald-600"
                : "text-gray-400"
          }`}
        >
          {s.title}
        </span>
      ))}
    </div>
  </div>
));
ProgressSteps.displayName = "ProgressSteps";

const SkillTag = memo(({ skill, onRemove }) => (
  <motion.span
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100 group hover:border-blue-200 transition-colors"
  >
    <Hash className="w-3 h-3 text-blue-400" />
    {skill}
    <button
      onClick={() => onRemove(skill)}
      className="ml-0.5 p-0.5 rounded-full hover:bg-blue-200/60 text-blue-400 hover:text-blue-600 transition-colors"
      aria-label={`Remove ${skill}`}
    >
      <X className="w-3 h-3" />
    </button>
  </motion.span>
));
SkillTag.displayName = "SkillTag";

const SummaryRow = memo(({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-sm text-gray-500 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      {label}
    </span>
    <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%] truncate">
      {value || "—"}
    </span>
  </div>
));
SummaryRow.displayName = "SummaryRow";

// ─── Main Component ──────────────────────────────────────────────────

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    description: "",
    skills: [],
    budgetMin: "",
    budgetMax: "",
    budgetType: "fixed",
    duration: "",
    experience: "Intermediate",
  });

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Skills
  const addSkill = useCallback((skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setFormData((prev) => {
      if (prev.skills.includes(trimmed)) {
        toast.error("Skill already added");
        return prev;
      }
      if (prev.skills.length >= 15) {
        toast.error("Maximum 15 skills");
        return prev;
      }
      return { ...prev, skills: [...prev.skills, trimmed] };
    });
    setSkillInput("");
  }, []);

  const removeSkill = useCallback((skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  }, []);

  // Validation
  const isStep1Valid = useMemo(
    () =>
      formData.title.trim() && formData.category && formData.skills.length > 0,
    [formData.title, formData.category, formData.skills],
  );

  const isStep2Valid = useMemo(
    () => formData.description.trim().length >= 50,
    [formData.description],
  );

  const isStep3Valid = useMemo(
    () => formData.budgetMin && formData.budgetMax && formData.duration,
    [formData.budgetMin, formData.budgetMax, formData.duration],
  );

  const descCharCount = useMemo(
    () => formData.description.trim().length,
    [formData.description],
  );

  const handleNext = useCallback(() => {
    if (step === 1 && !isStep1Valid) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (step === 2 && !isStep2Valid) {
      toast.error("Description must be at least 50 characters");
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  }, [step, isStep1Valid, isStep2Valid]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => s - 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isStep3Valid) {
      toast.error("Please fill in all budget details");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Job posted successfully!");
    navigate("/dashboard/my-jobs");
  }, [isStep3Valid, navigate]);

  const suggestedSkills = useMemo(
    () =>
      popularSkills.filter((s) => !formData.skills.includes(s)).slice(0, 12),
    [formData.skills],
  );

  return (
    <motion.div
      className=" mx-auto px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 group text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>
        <div className="flex items-center gap-3">
          <motion.div
            className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
          >
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Post a New Job
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Find the perfect freelancer for your project
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <motion.div variants={itemVariants}>
        <ProgressSteps currentStep={step} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ── Step 1: Basic Info ───────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                {/* Title */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Type
                        className="w-4.5 h-4.5 text-blue-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Job Title
                      </h2>
                      <p className="text-xs text-gray-500">
                        Make it clear and descriptive
                      </p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                    placeholder="e.g., Senior React Developer for E-commerce Platform"
                  />
                  {formData.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-medium">
                        Great title!
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Category */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Layers
                        className="w-4.5 h-4.5 text-violet-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Category
                      </h2>
                      <p className="text-xs text-gray-500">
                        Select the best match for your project
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {categories.map((cat) => {
                      const isSelected = formData.category === cat.value;
                      const colors = colorMap[cat.color];
                      return (
                        <motion.button
                          key={cat.value}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateField("category", cat.value)}
                          className={`relative p-3.5 rounded-xl border-2 text-left transition-all duration-300 ${
                            isSelected
                              ? colors.selected
                              : "border-gray-100 hover:border-gray-200 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2"
                            >
                              <CheckCircle
                                className={`w-4 h-4 ${colors.icon}`}
                              />
                            </motion.div>
                          )}
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
                              isSelected ? colors.iconBg : "bg-gray-100"
                            }`}
                          >
                            <cat.icon
                              className={`w-4.5 h-4.5 ${isSelected ? colors.icon : "text-gray-400"}`}
                            />
                          </div>
                          <p
                            className={`text-xs font-semibold ${isSelected ? colors.text : "text-gray-600"}`}
                          >
                            {cat.value}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Zap
                        className="w-4.5 h-4.5 text-amber-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Required Skills
                      </h2>
                      <p className="text-xs text-gray-500">
                        {formData.skills.length}/15 skills added
                      </p>
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                      placeholder="Type a skill and press Enter..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <AnimatePresence>
                    {formData.skills.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-2 mb-4"
                      >
                        {formData.skills.map((skill) => (
                          <SkillTag
                            key={skill}
                            skill={skill}
                            onRemove={removeSkill}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Suggested Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSkill(skill)}
                          className="px-2.5 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all border border-gray-100 hover:border-blue-200"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Award
                        className="w-4.5 h-4.5 text-emerald-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Experience Level
                      </h2>
                      <p className="text-xs text-gray-500">
                        What expertise do you need?
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {experiences.map((exp) => {
                      const isSelected = formData.experience === exp.value;
                      const colors = colorMap[exp.color];
                      return (
                        <motion.button
                          key={exp.value}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateField("experience", exp.value)}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                            isSelected
                              ? colors.selected
                              : "border-gray-100 hover:border-gray-200 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle
                                className={`w-5 h-5 ${colors.icon}`}
                              />
                            </motion.div>
                          )}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                              isSelected ? colors.iconBg : "bg-gray-100"
                            }`}
                          >
                            <exp.icon
                              className={`w-5 h-5 ${isSelected ? colors.icon : "text-gray-400"}`}
                            />
                          </div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {exp.label}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {exp.description}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    disabled={!isStep1Valid}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Description ─────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
                      <AlignLeft
                        className="w-4.5 h-4.5 text-violet-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Job Description
                      </h2>
                      <p className="text-xs text-gray-500">
                        Detailed description helps attract better proposals
                      </p>
                    </div>
                  </div>

                  {/* Mini Toolbar */}
                  <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border border-gray-200 border-b-0 rounded-t-xl">
                    {[Bold, Italic, List, ListOrdered, LinkIcon].map(
                      (Icon, i) => (
                        <button
                          key={i}
                          className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
                          title={Icon.displayName}
                        >
                          <Icon className="w-4 h-4 text-gray-500" />
                        </button>
                      ),
                    )}
                  </div>

                  <textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-b-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none placeholder:text-gray-400 leading-relaxed"
                    placeholder={`Describe your project in detail. Include:\n\n• Project overview and goals\n• Specific requirements and deliverables\n• Any technical specifications\n• Timeline expectations\n• Communication preferences`}
                  />

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {descCharCount >= 50 ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          descCharCount >= 50
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {descCharCount}/50 characters minimum
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {descCharCount} characters
                    </span>
                  </div>
                </div>

                {/* Writing Tips */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Lightbulb className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">
                        Writing Tips
                      </p>
                      <ul className="mt-2 space-y-1.5 text-xs text-blue-700 leading-relaxed">
                        <li className="flex items-start gap-1.5">
                          <Sparkles className="w-3 h-3 text-blue-400 mt-0.5 shrink-0" />
                          Be specific about deliverables and expectations
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Sparkles className="w-3 h-3 text-blue-400 mt-0.5 shrink-0" />
                          Include technical requirements and preferred tools
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Sparkles className="w-3 h-3 text-blue-400 mt-0.5 shrink-0" />
                          Mention your communication style and availability
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-2">
                  <motion.button
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBack}
                    className="px-5 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2 text-sm shadow-sm transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    disabled={!isStep2Valid}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Budget ──────────────────────── */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                {/* Budget Type */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <CircleDollarSign
                        className="w-4.5 h-4.5 text-emerald-600"
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Budget Type
                      </h2>
                      <p className="text-xs text-gray-500">
                        Choose how you want to pay
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      {
                        value: "fixed",
                        label: "Fixed Price",
                        desc: "Set a total project budget",
                        icon: Target,
                      },
                      {
                        value: "hourly",
                        label: "Hourly Rate",
                        desc: "Pay by the hour",
                        icon: Clock,
                      },
                    ].map((opt) => {
                      const isSelected = formData.budgetType === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateField("budgetType", opt.value)}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                            isSelected
                              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm shadow-blue-500/10"
                              : "border-gray-100 hover:border-gray-200 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3"
                            >
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                            </motion.div>
                          )}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                              isSelected ? "bg-blue-100" : "bg-gray-100"
                            }`}
                          >
                            <opt.icon
                              className={`w-5 h-5 ${isSelected ? "text-blue-600" : "text-gray-400"}`}
                            />
                          </div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {opt.label}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {opt.desc}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-1.5 mb-5">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      Budget Range
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={formData.budgetMin}
                          onChange={(e) =>
                            updateField("budgetMin", e.target.value)
                          }
                          placeholder="Min"
                          className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400 placeholder:font-normal"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="number"
                          value={formData.budgetMax}
                          onChange={(e) =>
                            updateField("budgetMax", e.target.value)
                          }
                          placeholder="Max"
                          className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400 placeholder:font-normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                      <Timer className="w-4 h-4 text-orange-500" />
                      Project Duration
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {durations.map((d) => (
                        <motion.button
                          key={d.value}
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateField("duration", d.value)}
                          className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                            formData.duration === d.value
                              ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-500/10"
                              : "border-gray-100 hover:border-gray-200 bg-white"
                          }`}
                        >
                          <span className="text-base mb-0.5 block">
                            {d.icon}
                          </span>
                          <p
                            className={`text-xs font-semibold ${
                              formData.duration === d.value
                                ? "text-blue-700"
                                : "text-gray-600"
                            }`}
                          >
                            {d.label}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Eye
                        className="w-4.5 h-4.5 text-indigo-600"
                        strokeWidth={2}
                      />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Job Summary
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    <SummaryRow
                      icon={Type}
                      label="Title"
                      value={formData.title}
                    />
                    <SummaryRow
                      icon={Layers}
                      label="Category"
                      value={formData.category}
                    />
                    <SummaryRow
                      icon={Award}
                      label="Experience"
                      value={formData.experience}
                    />
                    <SummaryRow
                      icon={DollarSign}
                      label="Budget"
                      value={
                        formData.budgetMin && formData.budgetMax
                          ? `$${Number(formData.budgetMin).toLocaleString()} – $${Number(formData.budgetMax).toLocaleString()}`
                          : undefined
                      }
                    />
                    <SummaryRow
                      icon={Timer}
                      label="Duration"
                      value={formData.duration}
                    />
                    <SummaryRow
                      icon={Zap}
                      label="Skills"
                      value={
                        formData.skills.length > 0
                          ? formData.skills.join(", ")
                          : undefined
                      }
                    />
                  </div>
                </div>

                {/* Escrow Info */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900 text-sm">
                        Payment Protection
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                        All payments are protected through our secure escrow
                        system. Funds are only released when you approve the
                        work.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-2">
                  <motion.button
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleBack}
                    className="px-5 py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2 text-sm shadow-sm transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={!isStep3Valid || isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Post Job
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sidebar ──────────────────────────────── */}
        <div className="order-first lg:order-last">
          <div className="lg:sticky lg:top-6 space-y-5">
            {/* Completion */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                  Progress
                </h3>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
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
                      stroke="url(#progressGrad)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 264" }}
                      animate={{
                        strokeDasharray: `${
                          ([
                            !!formData.title,
                            formData.skills.length > 0,
                            descCharCount >= 50,
                            !!formData.budgetMin && !!formData.budgetMax,
                            !!formData.duration,
                          ].filter(Boolean).length /
                            5) *
                          264
                        } 264`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient
                        id="progressGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">
                      {Math.round(
                        ([
                          !!formData.title,
                          formData.skills.length > 0,
                          descCharCount >= 50,
                          !!formData.budgetMin && !!formData.budgetMax,
                          !!formData.duration,
                        ].filter(Boolean).length /
                          5) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Job Title", done: !!formData.title },
                  { label: "Skills Added", done: formData.skills.length > 0 },
                  {
                    label: "Description (50+ chars)",
                    done: descCharCount >= 50,
                  },
                  {
                    label: "Budget Range",
                    done: !!formData.budgetMin && !!formData.budgetMax,
                  },
                  { label: "Duration", done: !!formData.duration },
                ].map((item) => (
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
                      className={`${item.done ? "text-gray-700 font-medium" : "text-gray-400"}`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-amber-900 text-sm">Pro Tips</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-amber-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Clear titles get 3x more proposals
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Add 5-8 skills for best results
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Detailed descriptions attract quality freelancers
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  Competitive budgets lead to faster hiring
                </li>
              </ul>
            </motion.div>

            {/* AI */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-5 sm:p-6"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                  <Wand2 className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-violet-900 text-sm">
                    AI Assistant
                  </p>
                  <p className="text-xs text-violet-700 mt-1 leading-relaxed">
                    Let AI help write your job description and suggest the right
                    skills.
                  </p>
                  <button className="mt-3 text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 group">
                    <Sparkles className="w-3.5 h-3.5" />
                    Try AI Writer
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostJob;
