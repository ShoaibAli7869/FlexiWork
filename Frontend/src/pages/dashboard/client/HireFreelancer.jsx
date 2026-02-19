import { useState, useCallback, useMemo, memo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Star,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  Shield,
  CreditCard,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  ChevronRight,
  Sparkles,
  Zap,
  Award,
  Target,
  Timer,
  Lock,
  ExternalLink,
  HelpCircle,
  Layers,
  CircleDollarSign,
  ArrowRight,
  Loader2,
  BadgeCheck,
  MessageCircle,
  Briefcase,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

const demoProposal = {
  id: "prop1",
  freelancer: {
    id: "f1",
    name: "Sarah Johnson",
    title: "Senior UI/UX Designer",
    avatar: null,
    rating: 4.9,
    reviews: 127,
    completedJobs: 89,
    location: "San Francisco, CA",
    hourlyRate: 85,
    responseTime: "< 1 hour",
    successRate: 98,
    memberSince: "2021",
  },
  job: {
    id: "j1",
    title: "E-commerce Website Redesign",
    description:
      "Complete redesign of our e-commerce platform with modern UI/UX",
  },
  bid: 5000,
  deliveryTime: "4 weeks",
  coverLetter:
    "I would love to work on this project. With my 8+ years of experience in UI/UX design...",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

const ProgressStep = memo(({ step, index, currentStep, totalSteps }) => {
  const isCompleted = currentStep > step.id;
  const isActive = currentStep === step.id;
  const isPending = currentStep < step.id;

  return (
    <div className="flex items-center flex-1">
      <div className="flex items-center gap-2 sm:gap-3 relative z-10">
        <motion.div
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-500 ${
            isCompleted
              ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              : isActive
                ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-100 text-gray-400 border border-gray-200"
          }`}
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isCompleted ? (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          ) : (
            <step.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
          )}
        </motion.div>
        <div className="hidden sm:block">
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              isActive
                ? "text-blue-600"
                : isCompleted
                  ? "text-emerald-600"
                  : "text-gray-400"
            }`}
          >
            Step {step.id}
          </p>
          <p
            className={`text-sm font-medium ${
              isActive || isCompleted ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {step.title}
          </p>
        </div>
      </div>
      {index < totalSteps - 1 && (
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
});
ProgressStep.displayName = "ProgressStep";

const MilestoneItem = memo(
  ({ milestone, index, onRemove, onChange, canRemove }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, height: 0 }}
      className="group relative flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all duration-300"
    >
      <div className="flex flex-col items-center gap-1 pt-2">
        <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-sm">
          {index + 1}
        </span>
        {index < 3 && <div className="w-0.5 h-4 bg-gray-200 rounded-full" />}
      </div>
      <div className="flex-1 space-y-2.5">
        <input
          type="text"
          value={milestone.title}
          onChange={(e) => onChange(milestone.id, "title", e.target.value)}
          placeholder="Milestone title"
          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
        />
        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={milestone.amount}
              onChange={(e) =>
                onChange(
                  milestone.id,
                  "amount",
                  parseFloat(e.target.value) || 0,
                )
              }
              placeholder="Amount"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={milestone.dueDate}
              onChange={(e) =>
                onChange(milestone.id, "dueDate", e.target.value)
              }
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>
        </div>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(milestone.id)}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Remove milestone"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  ),
);
MilestoneItem.displayName = "MilestoneItem";

const FreelancerSidebar = memo(({ proposal }) => (
  <motion.div variants={containerVariants} className="space-y-4 sm:space-y-5">
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-5">
        <User className="w-4.5 h-4.5 text-blue-600" />
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
          Freelancer
        </h3>
      </div>
      <div className="flex items-center gap-3.5 mb-5">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
            {proposal.freelancer.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
            <BadgeCheck className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            {proposal.freelancer.name}
          </p>
          <p className="text-sm text-gray-500">{proposal.freelancer.title}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2.5 text-gray-600">
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <span>
            <span className="font-semibold text-gray-900">
              {proposal.freelancer.rating}
            </span>{" "}
            ({proposal.freelancer.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-gray-600">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-500" />
          </div>
          <span>{proposal.freelancer.location}</span>
        </div>
        <div className="flex items-center gap-2.5 text-gray-600">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <span>
            <span className="font-semibold text-gray-900">
              {proposal.freelancer.completedJobs}
            </span>{" "}
            jobs completed
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-gray-600">
          <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-violet-500" />
          </div>
          <span>
            <span className="font-semibold text-gray-900">
              {proposal.freelancer.successRate}%
            </span>{" "}
            success rate
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-gray-600">
          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
            <Timer className="w-4 h-4 text-orange-500" />
          </div>
          <span>
            Responds{" "}
            <span className="font-semibold text-gray-900">
              {proposal.freelancer.responseTime}
            </span>
          </span>
        </div>
      </div>
      <Link
        to={`/freelancers/${proposal.freelancer.id}`}
        className="flex items-center justify-center gap-2 w-full mt-5 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 transition-all duration-200 group"
      >
        <Eye className="w-4 h-4" />
        View Full Profile
        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4.5 h-4.5 text-violet-600" />
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
          Proposal
        </h3>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center py-2.5 px-3.5 bg-gray-50 rounded-xl">
          <span className="text-gray-500 flex items-center gap-1.5">
            <CircleDollarSign className="w-4 h-4 text-emerald-500" />
            Bid Amount
          </span>
          <span className="font-bold text-gray-900 text-base">
            ${proposal.bid.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center py-2.5 px-3.5 bg-gray-50 rounded-xl">
          <span className="text-gray-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            Delivery
          </span>
          <span className="font-bold text-gray-900">
            {proposal.deliveryTime}
          </span>
        </div>
      </div>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-blue-900">Need Help?</p>
          <p className="text-sm text-blue-700 mt-1 leading-relaxed">
            Our support team is available 24/7 to assist you with the hiring
            process.
          </p>
          <button className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
            <MessageCircle className="w-4 h-4" />
            Contact Support
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
));
FreelancerSidebar.displayName = "FreelancerSidebar";

const SectionCard = memo(
  ({ icon: Icon, iconColor, title, children, className = "" }) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className={`w-9 h-9 ${iconColor} rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-4.5 h-4.5 text-current" strokeWidth={2} />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  ),
);
SectionCard.displayName = "SectionCard";

const HireFreelancer = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [proposal] = useState(demoProposal);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [contractData, setContractData] = useState({
    projectTitle: proposal.job.title,
    description: proposal.job.description,
    agreedAmount: proposal.bid,
    paymentType: "milestone",
    startDate: "",
    endDate: "",
    milestones: [
      { id: 1, title: "Project Setup & Discovery", amount: 500, dueDate: "" },
      { id: 2, title: "UI/UX Design", amount: 1500, dueDate: "" },
      { id: 3, title: "Development", amount: 2000, dueDate: "" },
      { id: 4, title: "Testing & Launch", amount: 1000, dueDate: "" },
    ],
    terms: {
      revisions: 3,
      confidentiality: true,
      ownershipTransfer: true,
    },
  });

  const [paymentMethod, setPaymentMethod] = useState({
    type: "card",
    cardLast4: "4242",
    fundNow: true,
  });

  const totalMilestoneAmount = useMemo(
    () =>
      contractData.milestones.reduce(
        (sum, m) => sum + (parseFloat(m.amount) || 0),
        0,
      ),
    [contractData.milestones],
  );

  const handleAddMilestone = useCallback(() => {
    setContractData((prev) => {
      const newId = Math.max(...prev.milestones.map((m) => m.id), 0) + 1;
      return {
        ...prev,
        milestones: [
          ...prev.milestones,
          { id: newId, title: "", amount: 0, dueDate: "" },
        ],
      };
    });
  }, []);

  const handleRemoveMilestone = useCallback((id) => {
    setContractData((prev) => {
      if (prev.milestones.length <= 1) {
        toast.error("You need at least one milestone");
        return prev;
      }
      return {
        ...prev,
        milestones: prev.milestones.filter((m) => m.id !== id),
      };
    });
  }, []);

  const handleMilestoneChange = useCallback((id, field, value) => {
    setContractData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m,
      ),
    }));
  }, []);

  const updateContractField = useCallback((field, value) => {
    setContractData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateTermsField = useCallback((field, value) => {
    setContractData((prev) => ({
      ...prev,
      terms: { ...prev.terms, [field]: value },
    }));
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStep === 1) {
      if (!contractData.startDate || !contractData.endDate) {
        toast.error("Please select start and end dates");
        return;
      }
      if (
        contractData.paymentType === "milestone" &&
        totalMilestoneAmount !== contractData.agreedAmount
      ) {
        toast.error(
          `Milestone amounts must equal the agreed amount ($${contractData.agreedAmount})`,
        );
        return;
      }
    }
    setDirection(1);
    setCurrentStep((s) => s + 1);
  }, [currentStep, contractData, totalMilestoneAmount]);

  const handlePrevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(
      "Contract created successfully! Freelancer has been notified.",
    );
    navigate("/dashboard/projects");
  }, [agreedToTerms, navigate]);

  const steps = useMemo(
    () => [
      { id: 1, title: "Contract Details", icon: FileText },
      { id: 2, title: "Review Terms", icon: Shield },
      { id: 3, title: "Payment", icon: CreditCard },
    ],
    [],
  );

  const escrowAmount = useMemo(
    () => (paymentMethod.fundNow ? contractData.milestones[0]?.amount || 0 : 0),
    [paymentMethod.fundNow, contractData.milestones],
  );

  const platformFee = useMemo(
    () => (escrowAmount * 0.05).toFixed(2),
    [escrowAmount],
  );

  const totalDueNow = useMemo(
    () => (escrowAmount * 1.05).toFixed(2),
    [escrowAmount],
  );

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 sm:px-0"
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
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Hire Freelancer
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-0.5">
              Create a contract with{" "}
              <span className="font-semibold text-gray-700">
                {proposal.freelancer.name}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        variants={itemVariants}
        className="mb-8 sm:mb-10 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm"
      >
        <div className="flex items-center">
          {steps.map((step, index) => (
            <ProgressStep
              key={step.id}
              step={step}
              index={index}
              currentStep={currentStep}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Contract Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                <SectionCard
                  icon={Briefcase}
                  iconColor="bg-blue-100 text-blue-600"
                  title="Project Information"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={contractData.projectTitle}
                        onChange={(e) =>
                          updateContractField("projectTitle", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={contractData.description}
                        onChange={(e) =>
                          updateContractField("description", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            Start Date
                          </span>
                        </label>
                        <input
                          type="date"
                          value={contractData.startDate}
                          onChange={(e) =>
                            updateContractField("startDate", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-red-500" />
                            End Date
                          </span>
                        </label>
                        <input
                          type="date"
                          value={contractData.endDate}
                          onChange={(e) =>
                            updateContractField("endDate", e.target.value)
                          }
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  icon={Layers}
                  iconColor="bg-violet-100 text-violet-600"
                  title="Payment Structure"
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateContractField("paymentType", "milestone")
                        }
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          contractData.paymentType === "milestone"
                            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        {contractData.paymentType === "milestone" && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          </div>
                        )}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                            contractData.paymentType === "milestone"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Target
                            className={`w-5 h-5 ${
                              contractData.paymentType === "milestone"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Milestone-Based
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Pay in stages as work is completed
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateContractField("paymentType", "hourly")
                        }
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                          contractData.paymentType === "hourly"
                            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        {contractData.paymentType === "hourly" && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          </div>
                        )}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                            contractData.paymentType === "hourly"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Clock
                            className={`w-5 h-5 ${
                              contractData.paymentType === "hourly"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Hourly Rate
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Pay based on hours worked
                        </p>
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <CircleDollarSign className="w-4 h-4 text-emerald-500" />
                          Total Budget
                        </span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={contractData.agreedAmount}
                          onChange={(e) =>
                            updateContractField(
                              "agreedAmount",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm font-semibold"
                        />
                      </div>
                    </div>

                    {contractData.paymentType === "milestone" && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-amber-500" />
                            Milestones
                          </label>
                          <button
                            type="button"
                            onClick={handleAddMilestone}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold group"
                          >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                            Add Milestone
                          </button>
                        </div>
                        <div className="space-y-3">
                          <AnimatePresence>
                            {contractData.milestones.map((milestone, index) => (
                              <MilestoneItem
                                key={milestone.id}
                                milestone={milestone}
                                index={index}
                                onRemove={handleRemoveMilestone}
                                onChange={handleMilestoneChange}
                                canRemove={contractData.milestones.length > 1}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                        <div
                          className={`mt-4 p-4 rounded-xl flex justify-between items-center ${
                            totalMilestoneAmount === contractData.agreedAmount
                              ? "bg-emerald-50 border border-emerald-200"
                              : "bg-red-50 border border-red-200"
                          }`}
                        >
                          <span className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                            {totalMilestoneAmount ===
                            contractData.agreedAmount ? (
                              <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4.5 h-4.5 text-red-500" />
                            )}
                            Total Milestones
                          </span>
                          <span
                            className={`font-bold text-base ${
                              totalMilestoneAmount === contractData.agreedAmount
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            ${totalMilestoneAmount.toLocaleString()}
                            {totalMilestoneAmount !==
                              contractData.agreedAmount && (
                              <span className="text-xs font-normal ml-2">
                                (should be $
                                {contractData.agreedAmount.toLocaleString()})
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {/* Step 2: Review Terms */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                <SectionCard
                  icon={Shield}
                  iconColor="bg-emerald-100 text-emerald-600"
                  title="Contract Terms"
                >
                  <div className="space-y-3">
                    <label className="flex items-start gap-3.5 cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={contractData.terms.confidentiality}
                          onChange={(e) =>
                            updateTermsField(
                              "confidentiality",
                              e.target.checked,
                            )
                          }
                          className="w-5 h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          <p className="font-semibold text-gray-900 text-sm">
                            Confidentiality Agreement
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          Freelancer agrees to keep all project information
                          confidential and not share with third parties
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3.5 cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={contractData.terms.ownershipTransfer}
                          onChange={(e) =>
                            updateTermsField(
                              "ownershipTransfer",
                              e.target.checked,
                            )
                          }
                          className="w-5 h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-500" />
                          <p className="font-semibold text-gray-900 text-sm">
                            Intellectual Property Transfer
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          All work product ownership transfers to you upon
                          payment completion
                        </p>
                      </div>
                    </label>

                    <div className="pt-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Number of Revisions
                      </label>
                      <select
                        value={contractData.terms.revisions}
                        onChange={(e) =>
                          updateTermsField(
                            "revisions",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option value={1}>1 Revision</option>
                        <option value={2}>2 Revisions</option>
                        <option value={3}>3 Revisions</option>
                        <option value={5}>5 Revisions</option>
                        <option value={-1}>Unlimited Revisions</option>
                      </select>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  icon={FileText}
                  iconColor="bg-blue-100 text-blue-600"
                  title="Contract Summary"
                >
                  <div className="space-y-0 divide-y divide-gray-100">
                    {[
                      {
                        label: "Project Title",
                        value: contractData.projectTitle,
                      },
                      {
                        label: "Freelancer",
                        value: proposal.freelancer.name,
                      },
                      {
                        label: "Payment Type",
                        value: contractData.paymentType,
                        capitalize: true,
                      },
                      {
                        label: "Total Amount",
                        value: `$${contractData.agreedAmount.toLocaleString()}`,
                        bold: true,
                      },
                      {
                        label: "Duration",
                        value: `${contractData.startDate || "—"} to ${contractData.endDate || "—"}`,
                      },
                      ...(contractData.paymentType === "milestone"
                        ? [
                            {
                              label: "Milestones",
                              value: `${contractData.milestones.length} milestones`,
                            },
                          ]
                        : []),
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between py-3 text-sm"
                      >
                        <span className="text-gray-500">{item.label}</span>
                        <span
                          className={`font-medium text-gray-900 ${
                            item.capitalize ? "capitalize" : ""
                          } ${item.bold ? "text-base font-bold" : ""}`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-amber-900 text-sm">
                        Review Carefully
                      </p>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        Once the contract is created and the freelancer accepts,
                        these terms become binding. Make sure all details are
                        correct before proceeding.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Payment & Confirm */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-5"
              >
                <SectionCard
                  icon={CreditCard}
                  iconColor="bg-indigo-100 text-indigo-600"
                  title="Payment Method"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold tracking-wider">
                            VISA
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Visa •••• 4242
                          </p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                        Change
                      </button>
                    </div>

                    <label className="flex items-start gap-3.5 cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all">
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={paymentMethod.fundNow}
                          onChange={(e) =>
                            setPaymentMethod({
                              ...paymentMethod,
                              fundNow: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Fund first milestone now
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Deposit $
                          {contractData.milestones[0]?.amount?.toLocaleString() ||
                            0}{" "}
                          into escrow to start the project immediately
                        </p>
                      </div>
                    </label>
                  </div>
                </SectionCard>

                <SectionCard
                  icon={CircleDollarSign}
                  iconColor="bg-emerald-100 text-emerald-600"
                  title="Order Summary"
                >
                  <div className="space-y-0 divide-y divide-gray-100">
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">Contract Total</span>
                      <span className="font-medium text-gray-900">
                        ${contractData.agreedAmount.toLocaleString()}
                      </span>
                    </div>
                    {paymentMethod.fundNow && (
                      <div className="flex justify-between py-3 text-sm">
                        <span className="text-gray-500">
                          First Milestone Escrow
                        </span>
                        <span className="font-medium text-gray-900">
                          ${escrowAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">Platform Fee (5%)</span>
                      <span className="font-medium text-gray-900">
                        ${platformFee}
                      </span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span className="font-bold text-gray-900 text-base">
                        Due Now
                      </span>
                      <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        ${totalDueNow}
                      </span>
                    </div>
                  </div>
                </SectionCard>

                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-900 text-sm">
                        Escrow Protection
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                        Your payment is protected by our escrow service. Funds
                        are only released when you approve completed work.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-5 h-5 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Escrow Agreement
                    </a>
                  </p>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex justify-between items-center"
          >
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePrevStep}
                className="px-5 sm:px-6 py-2.5 sm:py-3 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2 text-sm shadow-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
            ) : (
              <div />
            )}
            {currentStep < 3 ? (
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNextStep}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold flex items-center gap-2 text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={isSubmitting || !agreedToTerms}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Create Contract & Hire
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="order-first lg:order-last">
          <div className="lg:sticky lg:top-6">
            <FreelancerSidebar proposal={proposal} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HireFreelancer;
