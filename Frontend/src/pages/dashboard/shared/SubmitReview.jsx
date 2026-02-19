import { useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Send,
  Eye,
  EyeOff,
  Info,
  Sparkles,
  Award,
  MessageSquare,
  Shield,
  Heart,
  X,
  PenTool,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const demoCompletedProject = {
  id: "1",
  title: "E-commerce Website Redesign",
  freelancer: {
    id: "f1",
    name: "Sarah Johnson",
    title: "Senior UI/UX Designer",
    avatar: null,
  },
  client: { id: "c1", name: "TechCorp Inc.", avatar: null },
  completedDate: "2024-03-15",
  budget: 5000,
};

const ratingCategories = [
  {
    id: "quality",
    label: "Quality of Work",
    description: "Was the work delivered to a high standard?",
    icon: Award,
  },
  {
    id: "communication",
    label: "Communication",
    description: "How well did they communicate?",
    icon: MessageSquare,
  },
  {
    id: "expertise",
    label: "Expertise",
    description: "Did they demonstrate the required skills?",
    icon: Sparkles,
  },
  {
    id: "professionalism",
    label: "Professionalism",
    description: "Were they professional and reliable?",
    icon: Shield,
  },
  {
    id: "deadline",
    label: "Meeting Deadlines",
    description: "Did they deliver on time?",
    icon: CheckCircle,
  },
];

const StarRating = ({ rating, onRate, size = "md" }) => {
  const [hovered, setHovered] = useState(0);
  const sizeMap = {
    sm: "w-5 h-5",
    md: "w-7 h-7 sm:w-8 sm:h-8",
    lg: "w-9 h-9 sm:w-11 sm:h-11",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(star)}
          className="focus:outline-none transition-all duration-150 hover:scale-125 active:scale-95"
        >
          <Star
            className={`${sizeMap[size]} transition-colors duration-150 ${
              star <= (hovered || rating)
                ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                : "text-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const getRatingLabel = (rating) => {
  const labels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };
  const colors = {
    1: "text-red-600 bg-red-50 border-red-200",
    2: "text-orange-600 bg-orange-50 border-orange-200",
    3: "text-amber-600 bg-amber-50 border-amber-200",
    4: "text-emerald-600 bg-emerald-50 border-emerald-200",
    5: "text-emerald-600 bg-emerald-50 border-emerald-200",
  };
  return { label: labels[rating] || "", color: colors[rating] || "" };
};

const SubmitReview = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project] = useState(demoCompletedProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [review, setReview] = useState({
    overallRating: 0,
    ratings: {
      quality: 0,
      communication: 0,
      expertise: 0,
      professionalism: 0,
      deadline: 0,
    },
    title: "",
    content: "",
    recommend: null,
    isPublic: true,
  });

  const handleOverallRating = useCallback((rating) => {
    setReview((prev) => ({ ...prev, overallRating: rating }));
  }, []);

  const handleCategoryRating = useCallback((category, rating) => {
    setReview((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [category]: rating },
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (review.overallRating === 0) {
        toast.error("Please provide an overall rating", {
          style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
        });
        return;
      }
      if (!review.content.trim()) {
        toast.error("Please write a review", {
          style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
        });
        return;
      }
      if (review.content.length < 50) {
        toast.error("Review must be at least 50 characters", {
          style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
        });
        return;
      }
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("⭐ Review submitted successfully!", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    },
    [review],
  );

  // ─── SUCCESS STATE ───
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
            <div className="p-6 sm:p-8 lg:p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                Thank You for Your Review!
              </h1>
              <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                Your feedback helps build a trustworthy community and helps{" "}
                <span className="font-semibold text-gray-700">
                  {project.freelancer.name}
                </span>{" "}
                improve their services.
              </p>

              {/* Review Preview */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 sm:p-6 mb-8 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
                    {project.freelancer.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {project.freelancer.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.overallRating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {review.overallRating}/5
                      </span>
                    </div>
                  </div>
                </div>
                {review.title && (
                  <p className="font-bold text-gray-900 text-sm mb-1">
                    "{review.title}"
                  </p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {review.content}
                </p>
                {review.recommend !== null && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                        review.recommend
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {review.recommend ? (
                        <>
                          <ThumbsUp className="w-3 h-3" /> Recommends
                        </>
                      ) : (
                        <>
                          <ThumbsDown className="w-3 h-3" /> Does not recommend
                        </>
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/dashboard/projects"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  Back to Projects
                </Link>
                <Link
                  to={`/freelancers/${project.freelancer.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── REVIEW FORM ───
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
              <PenTool className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                Leave a Review
              </h1>
              <p className="text-gray-500 mt-0.5 text-sm">
                Share your experience working with {project.freelancer.name}
              </p>
            </div>
          </div>
        </div>

        {/* Project Summary Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-5 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200 flex-shrink-0">
              {project.freelancer.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-sm sm:text-base truncate">
                  {project.freelancer.name}
                </p>
                <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-500">
                {project.freelancer.title}
              </p>
            </div>
            <div className="text-right hidden sm:block flex-shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Project
              </p>
              <p className="font-semibold text-gray-900 text-sm">
                {project.title}
              </p>
            </div>
          </div>
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Project:{" "}
              <span className="font-semibold text-gray-900">
                {project.title}
              </span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ─── OVERALL RATING ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <Star className="w-5 h-5 text-amber-500" />
                Overall Rating
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                How would you rate your overall experience?
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <StarRating
                  rating={review.overallRating}
                  onRate={handleOverallRating}
                  size="lg"
                />
                {review.overallRating > 0 && (
                  <span
                    className={`px-4 py-1.5 rounded-xl text-sm font-bold border ${
                      getRatingLabel(review.overallRating).color
                    }`}
                  >
                    {getRatingLabel(review.overallRating).label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ─── DETAILED RATINGS ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <Sparkles className="w-5 h-5 text-violet-500" />
                Detailed Ratings
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Rate specific aspects of their work
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {ratingCategories.map((category) => {
                const CategoryIcon = category.icon;
                const catRating = review.ratings[category.id];
                return (
                  <div
                    key={category.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          catRating > 0
                            ? "bg-amber-100 text-amber-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {category.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-12 sm:ml-0">
                      <StarRating
                        rating={catRating}
                        onRate={(rating) =>
                          handleCategoryRating(category.id, rating)
                        }
                        size="sm"
                      />
                      {catRating > 0 && (
                        <span className="text-xs text-gray-400 font-medium w-8 text-right">
                          {catRating}/5
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── WRITTEN REVIEW ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <PenTool className="w-5 h-5 text-blue-500" />
                Written Review
              </h2>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Review Title{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={review.title}
                  onChange={(e) =>
                    setReview({ ...review, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                  placeholder="Summarize your experience in a few words"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={review.content}
                  onChange={(e) =>
                    setReview({ ...review, content: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400 resize-none"
                  placeholder="Share details about your experience. What went well? Was the work delivered as expected? Would you recommend this freelancer?"
                  required
                />
                <div className="flex justify-between items-center mt-1.5">
                  <p
                    className={`text-xs font-medium ${
                      review.content.length > 0 && review.content.length < 50
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {review.content.length < 50
                      ? `${50 - review.content.length} more characters needed`
                      : `${review.content.length}/1000`}
                  </p>
                  {review.content.length >= 50 && (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ─── RECOMMENDATION ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <h2 className="flex items-center gap-2 font-bold text-gray-900">
                <Heart className="w-5 h-5 text-pink-500" />
                Would you recommend {project.freelancer.name.split(" ")[0]}?
              </h2>
            </div>
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReview({ ...review, recommend: true })}
                  className={`p-4 sm:p-5 rounded-xl border-2 flex flex-col items-center gap-2 font-semibold transition-all text-sm ${
                    review.recommend === true
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 scale-[1.02] shadow-sm"
                      : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30 text-gray-700"
                  }`}
                >
                  <ThumbsUp
                    className={`w-6 h-6 ${
                      review.recommend === true
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span>Yes, I recommend</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReview({ ...review, recommend: false })}
                  className={`p-4 sm:p-5 rounded-xl border-2 flex flex-col items-center gap-2 font-semibold transition-all text-sm ${
                    review.recommend === false
                      ? "border-red-500 bg-red-50 text-red-700 scale-[1.02] shadow-sm"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50/30 text-gray-700"
                  }`}
                >
                  <ThumbsDown
                    className={`w-6 h-6 ${
                      review.recommend === false
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── PRIVACY SETTING ─── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <label className="flex items-start gap-3 sm:gap-4 p-5 sm:p-6 cursor-pointer hover:bg-gray-50/50 transition-colors">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={review.isPublic}
                  onChange={(e) =>
                    setReview({ ...review, isPublic: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    review.isPublic ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      review.isPublic ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">
                    Make this review public
                  </p>
                  {review.isPublic ? (
                    <Eye className="w-4 h-4 text-blue-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {review.isPublic
                    ? "Your review will be visible on the freelancer's profile."
                    : "Your review will only be shared with our team for quality purposes."}
                </p>
              </div>
            </label>
          </div>

          {/* ─── GUIDELINES ─── */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-200">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-amber-800 text-sm">
                Review Guidelines
              </p>
              <ul className="text-xs text-amber-700 mt-1.5 space-y-1 leading-relaxed">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                  Be honest and specific about your experience
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                  Focus on the work delivered and professional conduct
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                  Avoid personal attacks or inappropriate language
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                  Reviews cannot be edited once submitted
                </li>
              </ul>
            </div>
          </div>

          {/* ─── SUBMIT ─── */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-200 hover:shadow-xl hover:from-amber-600 hover:to-orange-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSubmitting ? (
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
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Review
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitReview;
