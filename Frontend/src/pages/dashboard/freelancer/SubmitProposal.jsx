import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  DollarSign,
  Clock,
  FileText,
  Paperclip,
  X,
  Plus,
  Star,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Calculator,
  Lightbulb,
  Upload,
  Image as ImageIcon,
  File,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  Send,
  Shield,
  MapPin,
  Briefcase,
  TrendingUp,
  Target,
  Loader2,
  Tag,
  Zap,
  Calendar,
  Users,
  BadgeCheck,
  HelpCircle,
  ChevronRight,
  Wand2,
  GripVertical,
  Timer,
  ArrowRight,
  CircleDot,
  BarChart3,
} from "lucide-react";
import toast from "react-hot-toast";

const demoJob = {
  id: "1",
  title: "Senior React Developer for E-commerce Platform",
  description: `We're looking for an experienced React developer to build a modern e-commerce platform.`,
  budget: { min: 5000, max: 8000, type: "fixed" },
  duration: "2-3 months",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "Stripe"],
  experience: "Expert",
  category: "Development",
  client: {
    name: "TechCorp Inc.",
    location: "San Francisco, CA",
    verified: true,
    rating: 4.8,
    jobsPosted: 24,
    hireRate: 85,
    totalSpent: "$125,000+",
  },
  proposals: 12,
  postedAt: "2024-03-10",
};

const demoPortfolioItems = [
  {
    id: "p1",
    title: "E-commerce Dashboard",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    category: "Web Development",
  },
  {
    id: "p2",
    title: "React Native Shopping App",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    category: "Mobile Development",
  },
  {
    id: "p3",
    title: "SaaS Analytics Platform",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
    category: "Full Stack",
  },
  {
    id: "p4",
    title: "Payment Integration System",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
    category: "Backend",
  },
];

const coverLetterTemplates = [
  { id: "professional", name: "Professional", icon: Briefcase },
  { id: "casual", name: "Casual & Friendly", icon: Sparkles },
  { id: "technical", name: "Technical Focus", icon: Target },
];

const COVER_LETTER_CONTENT = {
  professional: `Dear TechCorp Inc.,

I am writing to express my strong interest in your Senior React Developer project. With over 5 years of experience in React development and a proven track record of delivering high-quality e-commerce solutions, I am confident I can exceed your expectations.

Key qualifications that make me an ideal fit:
• Extensive experience with React, Next.js, and TypeScript
• Successfully delivered 15+ e-commerce projects
• Strong expertise in Stripe payment integration
• Excellent communication and project management skills

I have reviewed your requirements carefully and understand the scope of work involved. I am particularly excited about the opportunity to build a modern, scalable e-commerce platform.

Looking forward to the opportunity to work together.

Best regards`,
  casual: `Hi there!

I came across your project and got really excited - this is exactly the kind of work I love doing!

I've been building React applications for the past 5 years, and e-commerce is definitely my sweet spot.

Here's what I can bring to your project:
✓ Deep expertise in React, Next.js & TypeScript
✓ Hands-on experience with Stripe & payment systems
✓ A portfolio full of happy clients
✓ Clear communication - no disappearing acts!

I've already got some ideas on how to approach this, and I'd love to chat about your vision.

Cheers!`,
  technical: `Hello,

With 5+ years of specialized experience in React ecosystem and e-commerce development, I'd like to propose my services.

Technical Approach:
1. Architecture: Next.js 14 with App Router for optimal performance and SEO
2. State Management: Zustand for complexity needs
3. Database: PostgreSQL with Prisma ORM for type-safe queries
4. Payments: Stripe Elements with webhooks
5. Authentication: NextAuth.js with multiple provider support

Relevant Experience:
• Built 3 e-commerce platforms handling $1M+ monthly transactions
• Implemented complex product filtering with Elasticsearch
• Achieved 95+ Lighthouse scores on production sites

Available for a technical deep-dive call at your convenience.

Regards`,
};

const InputField = ({
  icon: Icon,
  label,
  hint,
  error,
  children,
  className = "",
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
              className={`w-full ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"} pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 resize-none ${error ? "border-red-300" : ""}`}
            />
          ) : (
            <input
              {...props}
              className={`w-full ${Icon ? "pl-10 sm:pl-11" : "pl-3.5 sm:pl-4"} pr-3.5 sm:pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 ${error ? "border-red-300" : ""}`}
            />
          )}
        </>
      )}
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

const CollapsibleSection = ({
  title,
  section,
  icon: Icon,
  badge,
  badgeColor,
  expanded,
  onToggle,
  children,
}) => (
  <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <button
      type="button"
      onClick={() => onToggle(section)}
      className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-600"
            strokeWidth={2}
          />
        </div>
        <span className="text-sm sm:text-base font-bold text-slate-900">
          {title}
        </span>
        {badge && (
          <span
            className={`px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full ring-1 ring-inset ${
              badgeColor || "bg-blue-50 text-blue-700 ring-blue-500/20"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        className={`p-1 rounded-lg transition-colors ${expanded ? "bg-slate-100" : ""}`}
      >
        {expanded ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
        )}
      </div>
    </button>
    {expanded && <div className="border-t border-slate-100">{children}</div>}
  </div>
);

const PortfolioItem = ({ item, selected, onToggle }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
        selected
          ? "ring-2 ring-blue-500 ring-offset-2"
          : "ring-1 ring-slate-200 hover:ring-slate-300"
      }`}
    >
      <div className="aspect-[3/2] bg-slate-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${selected ? "scale-105" : "group-hover:scale-105"}`}
        />
        {!loaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        )}
      </div>
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="p-2 sm:p-2.5 bg-white">
        <p className="text-[10px] sm:text-xs font-semibold text-slate-900 truncate">
          {item.title}
        </p>
        <p className="text-[10px] text-slate-500">{item.category}</p>
      </div>
    </button>
  );
};

const MilestoneCard = ({ milestone, index, total, onUpdate, onRemove }) => (
  <div className="group relative p-3.5 sm:p-4 bg-slate-50/70 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-200">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-blue-700">
            {index + 1}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Milestone {index + 1}
        </span>
      </div>
      {total > 1 && (
        <button
          type="button"
          onClick={() => onRemove(milestone.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Remove milestone"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
      <input
        type="text"
        value={milestone.title}
        onChange={(e) => onUpdate(milestone.id, "title", e.target.value)}
        placeholder="Milestone title"
        className="w-full px-3 py-2 sm:py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400 transition-all"
      />
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="number"
          value={milestone.amount}
          onChange={(e) => onUpdate(milestone.id, "amount", e.target.value)}
          placeholder="Amount"
          className="w-full pl-8 pr-3 py-2 sm:py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400 transition-all"
        />
      </div>
      <select
        value={milestone.duration}
        onChange={(e) => onUpdate(milestone.id, "duration", e.target.value)}
        className="w-full px-3 py-2 sm:py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer"
      >
        <option value="1 week">1 week</option>
        <option value="2 weeks">2 weeks</option>
        <option value="3 weeks">3 weeks</option>
        <option value="4 weeks">4 weeks</option>
        <option value="6 weeks">6 weeks</option>
        <option value="8 weeks">8 weeks</option>
      </select>
    </div>
    <textarea
      value={milestone.description}
      onChange={(e) => onUpdate(milestone.id, "description", e.target.value)}
      placeholder="Describe deliverables for this milestone..."
      rows={2}
      className="w-full mt-2.5 px-3 py-2 sm:py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 placeholder:text-slate-400 transition-all resize-none"
    />
  </div>
);

const PreviewModal = ({ isOpen, content, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Cover Letter Preview
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
              {content || "No content yet. Start writing your cover letter."}
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

const SubmitProposal = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job] = useState(demoJob);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    coverLetter: true,
    pricing: true,
    milestones: false,
    portfolio: false,
    attachments: false,
  });

  const [proposal, setProposal] = useState({
    bidAmount: "",
    bidType: "fixed",
    deliveryTime: "",
    coverLetter: "",
    milestones: [
      {
        id: 1,
        title: "Project Setup & Planning",
        amount: "",
        duration: "1 week",
        description: "",
      },
      {
        id: 2,
        title: "Core Development",
        amount: "",
        duration: "4 weeks",
        description: "",
      },
      {
        id: 3,
        title: "Testing & Deployment",
        amount: "",
        duration: "1 week",
        description: "",
      },
    ],
    selectedPortfolio: [],
    attachments: [],
    questionsForClient: "",
    availableHoursPerWeek: "40",
  });

  const serviceFee = useMemo(
    () =>
      proposal.bidAmount
        ? (parseFloat(proposal.bidAmount) * 0.1).toFixed(2)
        : "0",
    [proposal.bidAmount],
  );
  const youReceive = useMemo(
    () =>
      proposal.bidAmount
        ? (parseFloat(proposal.bidAmount) * 0.9).toFixed(2)
        : "0",
    [proposal.bidAmount],
  );
  const totalMilestoneAmount = useMemo(
    () =>
      proposal.milestones.reduce(
        (sum, m) => sum + (parseFloat(m.amount) || 0),
        0,
      ),
    [proposal.milestones],
  );

  const updateField = useCallback((field, value) => {
    setProposal((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleSection = useCallback((section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const autoDistributeMilestones = useCallback(() => {
    if (!proposal.bidAmount) {
      toast.error("Please enter a bid amount first");
      return;
    }
    const total = parseFloat(proposal.bidAmount);
    const distribution = [0.2, 0.5, 0.3];
    const newMilestones = proposal.milestones.map((m, i) => ({
      ...m,
      amount: (
        total * (distribution[i] || 1 / proposal.milestones.length)
      ).toFixed(0),
    }));
    setProposal((prev) => ({ ...prev, milestones: newMilestones }));
    toast.success("Milestone amounts distributed!", {
      icon: "✨",
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
        fontSize: "14px",
      },
    });
  }, [proposal.bidAmount, proposal.milestones]);

  const generateCoverLetter = useCallback((templateId) => {
    setProposal((prev) => ({
      ...prev,
      coverLetter: COVER_LETTER_CONTENT[templateId] || "",
    }));
    toast.success("Template applied!", {
      icon: "📝",
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
        fontSize: "14px",
      },
    });
  }, []);

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      type: file.type.includes("image") ? "image" : "document",
    }));
    setProposal((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  }, []);

  const removeAttachment = useCallback((id) => {
    setProposal((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((a) => a.id !== id),
    }));
  }, []);

  const togglePortfolioItem = useCallback((itemId) => {
    setProposal((prev) => ({
      ...prev,
      selectedPortfolio: prev.selectedPortfolio.includes(itemId)
        ? prev.selectedPortfolio.filter((id) => id !== itemId)
        : [...prev.selectedPortfolio, itemId],
    }));
  }, []);

  const addMilestone = useCallback(() => {
    setProposal((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: Date.now(),
          title: "",
          amount: "",
          duration: "1 week",
          description: "",
        },
      ],
    }));
  }, []);

  const removeMilestone = useCallback(
    (id) => {
      if (proposal.milestones.length <= 1) {
        toast.error("You need at least one milestone");
        return;
      }
      setProposal((prev) => ({
        ...prev,
        milestones: prev.milestones.filter((m) => m.id !== id),
      }));
    },
    [proposal.milestones.length],
  );

  const updateMilestone = useCallback((id, field, value) => {
    setProposal((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m,
      ),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!proposal.bidAmount) {
        toast.error("Please enter your bid amount");
        return;
      }
      if (!proposal.deliveryTime) {
        toast.error("Please select delivery time");
        return;
      }
      if (proposal.coverLetter.length < 100) {
        toast.error("Cover letter must be at least 100 characters");
        return;
      }

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      toast.success("Proposal submitted successfully! 🎉", {
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
        },
      });
      navigate("/dashboard/proposals");
    },
    [proposal, navigate],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6">
        {/* Header */}
        <div>
          <Link
            to={`/jobs/${jobId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group mb-3 sm:mb-4"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Job
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  Submit a Proposal
                </h1>
                <Send className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Stand out from {job.proposals} other proposals with a compelling
                pitch
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Job Summary Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />$
                        {job.budget.min.toLocaleString()} - $
                        {job.budget.max.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.duration}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 bg-violet-50 text-violet-700 text-[10px] sm:text-xs font-semibold rounded-md ring-1 ring-inset ring-violet-500/20">
                        {job.experience}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-medium rounded-md ring-1 ring-inset ring-blue-500/20"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter Section */}
              <CollapsibleSection
                title="Cover Letter"
                section="coverLetter"
                icon={FileText}
                badge="Required"
                badgeColor="bg-red-50 text-red-600 ring-red-500/20"
                expanded={expandedSections.coverLetter}
                onToggle={toggleSection}
              >
                <div className="p-4 sm:p-5 space-y-4">
                  {/* AI Templates */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Wand2 className="w-4 h-4 text-violet-500" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700">
                        AI Templates
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {coverLetterTemplates.map((template) => (
                        <button
                          key={template.id}
                          type="button"
                          onClick={() => generateCoverLetter(template.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-violet-50 text-violet-700 text-xs sm:text-sm font-medium rounded-xl ring-1 ring-inset ring-violet-500/20 hover:bg-violet-100 transition-all active:scale-[0.98]"
                        >
                          <template.icon className="w-3.5 h-3.5" />
                          {template.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={proposal.coverLetter}
                    onChange={(e) => updateField("coverLetter", e.target.value)}
                    rows={10}
                    className="w-full px-3.5 sm:px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 resize-none"
                    placeholder="Introduce yourself and explain why you're the best fit for this project..."
                  />
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-medium ${
                        proposal.coverLetter.length < 100
                          ? "text-red-500"
                          : "text-slate-400"
                      }`}
                    >
                      {proposal.coverLetter.length < 100
                        ? `${100 - proposal.coverLetter.length} more characters needed`
                        : `${proposal.coverLetter.length} characters`}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPreview(true)}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Pricing Section */}
              <CollapsibleSection
                title="Pricing & Timeline"
                section="pricing"
                icon={Calculator}
                badge="Required"
                badgeColor="bg-red-50 text-red-600 ring-red-500/20"
                expanded={expandedSections.pricing}
                onToggle={toggleSection}
              >
                <div className="p-4 sm:p-5 space-y-5">
                  {/* Bid Type */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2.5">
                      Bid Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          key: "fixed",
                          label: "Fixed Price",
                          desc: "Set total price for the project",
                          icon: Target,
                        },
                        {
                          key: "hourly",
                          label: "Hourly Rate",
                          desc: "Charge by the hour",
                          icon: Timer,
                        },
                      ].map((type) => (
                        <button
                          key={type.key}
                          type="button"
                          onClick={() => updateField("bidType", type.key)}
                          className={`p-3 sm:p-4 rounded-xl text-left transition-all duration-200 ${
                            proposal.bidType === type.key
                              ? "bg-blue-50 border-2 border-blue-500 ring-2 ring-blue-500/20"
                              : "bg-slate-50 border-2 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <type.icon
                              className={`w-4 h-4 ${
                                proposal.bidType === type.key
                                  ? "text-blue-600"
                                  : "text-slate-400"
                              }`}
                            />
                            <p className="text-sm font-bold text-slate-900">
                              {type.label}
                            </p>
                          </div>
                          <p className="text-[10px] sm:text-xs text-slate-500">
                            {type.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bid Amount & Delivery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <InputField
                      icon={DollarSign}
                      label={
                        proposal.bidType === "fixed"
                          ? "Your Bid ($)"
                          : "Hourly Rate ($)"
                      }
                      type="number"
                      value={proposal.bidAmount}
                      onChange={(e) => updateField("bidAmount", e.target.value)}
                      placeholder={
                        proposal.bidType === "fixed"
                          ? `${job.budget.min} - ${job.budget.max}`
                          : "85"
                      }
                      hint={`Budget: $${job.budget.min.toLocaleString()} - $${job.budget.max.toLocaleString()}`}
                    />
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                        Delivery Time <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-400 pointer-events-none" />
                        <select
                          value={proposal.deliveryTime}
                          onChange={(e) =>
                            updateField("deliveryTime", e.target.value)
                          }
                          className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="">Select duration</option>
                          <option value="Less than 1 week">
                            Less than 1 week
                          </option>
                          <option value="1-2 weeks">1-2 weeks</option>
                          <option value="2-4 weeks">2-4 weeks</option>
                          <option value="1-2 months">1-2 months</option>
                          <option value="2-3 months">2-3 months</option>
                          <option value="3+ months">3+ months</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Earnings Calculator */}
                  {proposal.bidAmount && (
                    <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-3">
                        <BarChart3 className="w-4 h-4 text-slate-500" />
                        <h4 className="text-xs sm:text-sm font-bold text-slate-700">
                          Earnings Breakdown
                        </h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Your bid</span>
                          <span className="font-semibold text-slate-900">
                            ${parseFloat(proposal.bidAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Service fee (10%)
                          </span>
                          <span className="font-semibold text-red-500">
                            -${serviceFee}
                          </span>
                        </div>
                        <div className="border-t border-slate-200 pt-2 flex justify-between">
                          <span className="font-bold text-slate-900">
                            You'll receive
                          </span>
                          <span className="font-bold text-emerald-600 text-base sm:text-lg">
                            ${parseFloat(youReceive).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Availability */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                      Available Hours per Week
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-[18px] sm:h-[18px] text-slate-400 pointer-events-none" />
                      <select
                        value={proposal.availableHoursPerWeek}
                        onChange={(e) =>
                          updateField("availableHoursPerWeek", e.target.value)
                        }
                        className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="10">10 hours/week</option>
                        <option value="20">20 hours/week</option>
                        <option value="30">30 hours/week</option>
                        <option value="40">40 hours/week (Full-time)</option>
                        <option value="40+">40+ hours/week</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Milestones Section */}
              <CollapsibleSection
                title="Proposed Milestones"
                section="milestones"
                icon={CheckCircle2}
                badge="Recommended"
                badgeColor="bg-emerald-50 text-emerald-700 ring-emerald-500/20"
                expanded={expandedSections.milestones}
                onToggle={toggleSection}
              >
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-slate-500">
                      Break down the project into clear deliverables
                    </p>
                    <button
                      type="button"
                      onClick={autoDistributeMilestones}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Auto-distribute
                    </button>
                  </div>

                  <div className="space-y-3">
                    {proposal.milestones.map((milestone, index) => (
                      <MilestoneCard
                        key={milestone.id}
                        milestone={milestone}
                        index={index}
                        total={proposal.milestones.length}
                        onUpdate={updateMilestone}
                        onRemove={removeMilestone}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addMilestone}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Milestone
                  </button>

                  {totalMilestoneAmount > 0 && (
                    <div
                      className={`p-3 rounded-xl flex items-center justify-between ${
                        totalMilestoneAmount ===
                        parseFloat(proposal.bidAmount || 0)
                          ? "bg-emerald-50 border border-emerald-100"
                          : "bg-amber-50 border border-amber-100"
                      }`}
                    >
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          totalMilestoneAmount ===
                          parseFloat(proposal.bidAmount || 0)
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        Total Milestones
                      </span>
                      <div className="text-right">
                        <span
                          className={`text-sm sm:text-base font-bold ${
                            totalMilestoneAmount ===
                            parseFloat(proposal.bidAmount || 0)
                              ? "text-emerald-700"
                              : "text-amber-700"
                          }`}
                        >
                          ${totalMilestoneAmount.toLocaleString()}
                        </span>
                        {totalMilestoneAmount !==
                          parseFloat(proposal.bidAmount || 0) && (
                          <p className="text-[10px] text-amber-600">
                            Should equal ${proposal.bidAmount}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleSection>

              {/* Portfolio Section */}
              <CollapsibleSection
                title="Portfolio Items"
                section="portfolio"
                icon={ImageIcon}
                badge={
                  proposal.selectedPortfolio.length > 0
                    ? `${proposal.selectedPortfolio.length} selected`
                    : null
                }
                badgeColor="bg-blue-50 text-blue-700 ring-blue-500/20"
                expanded={expandedSections.portfolio}
                onToggle={toggleSection}
              >
                <div className="p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-slate-500 mb-4">
                    Select relevant work samples to showcase your expertise
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {demoPortfolioItems.map((item) => (
                      <PortfolioItem
                        key={item.id}
                        item={item}
                        selected={proposal.selectedPortfolio.includes(item.id)}
                        onToggle={togglePortfolioItem}
                      />
                    ))}
                  </div>
                </div>
              </CollapsibleSection>

              {/* Attachments Section */}
              <CollapsibleSection
                title="Attachments"
                section="attachments"
                icon={Paperclip}
                badge={
                  proposal.attachments.length > 0
                    ? `${proposal.attachments.length} files`
                    : null
                }
                badgeColor="bg-slate-100 text-slate-600 ring-slate-500/20"
                expanded={expandedSections.attachments}
                onToggle={toggleSection}
              >
                <div className="p-4 sm:p-5">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 sm:p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 mb-1.5">
                      Drop files here or{" "}
                      <label className="text-blue-600 font-semibold hover:underline cursor-pointer">
                        browse
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </p>
                    <p className="text-xs text-slate-400">
                      PDF, DOC, Images up to 10MB each
                    </p>
                  </div>

                  {proposal.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {proposal.attachments.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {file.type === "image" ? (
                              <ImageIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            ) : (
                              <File className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {file.size}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(file.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CollapsibleSection>

              {/* Questions for Client */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Questions for Client
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500">
                      Optional
                    </p>
                  </div>
                </div>
                <textarea
                  value={proposal.questionsForClient}
                  onChange={(e) =>
                    updateField("questionsForClient", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3.5 sm:px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 resize-none"
                  placeholder="Ask any clarifying questions about the project requirements..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-5 py-3 sm:py-3.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Proposal
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-5">
            {/* Client Info */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  About the Client
                </h3>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0">
                  {job.client.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {job.client.name}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.client.location}
                  </p>
                </div>
              </div>

              {job.client.verified && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-600 mb-4 p-2.5 bg-emerald-50 rounded-lg">
                  <BadgeCheck className="w-4 h-4" />
                  Payment Verified
                </div>
              )}

              <div className="space-y-3 text-sm">
                {[
                  {
                    label: "Rating",
                    value: (
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        {job.client.rating}
                      </span>
                    ),
                  },
                  { label: "Jobs Posted", value: job.client.jobsPosted },
                  { label: "Hire Rate", value: `${job.client.hireRate}%` },
                  { label: "Total Spent", value: job.client.totalSpent },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs sm:text-sm text-slate-500">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border border-blue-100 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Tips to Win
                </h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Personalize your cover letter for this specific project",
                  "Highlight relevant experience and similar past work",
                  "Be competitive but fair with your pricing",
                  "Propose clear milestones and deliverables",
                  "Ask thoughtful questions to show engagement",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-600">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Card */}
            <div className="bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-200 p-4 sm:p-5">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-amber-800 mb-1.5">
                    Proposal Guidelines
                  </p>
                  <ul className="text-[10px] sm:text-xs text-amber-700 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CircleDot className="w-2.5 h-2.5 flex-shrink-0" />
                      Don't share personal contact info
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CircleDot className="w-2.5 h-2.5 flex-shrink-0" />
                      Keep all payments on-platform
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CircleDot className="w-2.5 h-2.5 flex-shrink-0" />
                      Be honest about your capabilities
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Proposal Strength (only show when form has data) */}
            {(proposal.coverLetter || proposal.bidAmount) && (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-violet-600" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Proposal Strength
                  </h3>
                </div>
                {(() => {
                  let score = 0;
                  if (proposal.coverLetter.length >= 100) score += 25;
                  if (proposal.bidAmount) score += 25;
                  if (proposal.deliveryTime) score += 15;
                  if (proposal.milestones.some((m) => m.title && m.amount))
                    score += 15;
                  if (proposal.selectedPortfolio.length > 0) score += 10;
                  if (proposal.attachments.length > 0) score += 5;
                  if (proposal.questionsForClient) score += 5;

                  const color =
                    score >= 80
                      ? "from-emerald-400 to-emerald-500"
                      : score >= 50
                        ? "from-amber-400 to-amber-500"
                        : "from-red-400 to-red-500";
                  const label =
                    score >= 80
                      ? "Strong"
                      : score >= 50
                        ? "Good"
                        : "Needs Work";

                  return (
                    <>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-500">{label}</span>
                        <span className="font-bold text-slate-900">
                          {score}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        content={proposal.coverLetter}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default SubmitProposal;
