import { useState } from "react";
import { Star, ThumbsUp, Flag, MessageSquare, CheckCircle } from "lucide-react";

const ReviewCard = ({
  review,
  showResponse = true,
  showActions = true,
  onHelpful,
  onReport,
  onRespond,
  isFreelancerView = false,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [reportReason, setReportReason] = useState("");

  const {
    id,
    overallRating,
    ratings,
    title,
    content,
    recommend,
    createdAt,
    response,
    helpful = 0,
    reviewer,
    projectTitle,
  } = review;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    if (onRespond && responseText.trim()) {
      onRespond(id, responseText);
      setShowResponseForm(false);
      setResponseText("");
    }
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (onReport && reportReason.trim()) {
      onReport(id, reportReason);
      setShowReportModal(false);
      setReportReason("");
    }
  };

  const StarDisplay = ({ rating, size = "sm" }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {reviewer?.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{reviewer?.name || "Anonymous"}</p>
              {reviewer?.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarDisplay rating={overallRating} size="md" />
          <span className="text-sm font-medium text-gray-700">
            {overallRating}/5
          </span>
        </div>
      </div>

      {/* Project reference */}
      {projectTitle && (
        <div className="mb-3 text-sm text-gray-500">
          Project: <span className="font-medium text-gray-700">{projectTitle}</span>
        </div>
      )}

      {/* Review Title */}
      {title && (
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      )}

      {/* Review Content */}
      <p className="text-gray-600 mb-4">{content}</p>

      {/* Detailed Ratings */}
      {ratings && Object.keys(ratings).length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          {Object.entries(ratings).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <div className="flex items-center gap-1">
                <StarDisplay rating={rating} size="sm" />
                <span className="text-xs text-gray-500 ml-1">{rating}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendation Badge */}
      {recommend !== undefined && (
        <div
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-4 ${
            recommend
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {recommend ? (
            <>
              <ThumbsUp className="w-4 h-4" />
              Recommends
            </>
          ) : (
            "Does not recommend"
          )}
        </div>
      )}

      {/* Freelancer Response */}
      {showResponse && response && (
        <div className="mt-4 pl-4 border-l-2 border-blue-200 bg-blue-50 rounded-r-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-900">Freelancer Response</span>
            <span className="text-xs text-blue-600">
              {formatDate(response.createdAt)}
            </span>
          </div>
          <p className="text-blue-800 text-sm">{response.content}</p>
        </div>
      )}

      {/* Response Form (for freelancers) */}
      {isFreelancerView && !response && showResponseForm && (
        <form onSubmit={handleSubmitResponse} className="mt-4 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Response
          </label>
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Thank the reviewer or address their feedback..."
            required
          />
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Post Response
            </button>
            <button
              type="button"
              onClick={() => setShowResponseForm(false)}
              className="px-4 py-2 border text-sm rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onHelpful?.(id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
            >
              <ThumbsUp className="w-4 h-4" />
              Helpful ({helpful})
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
            >
              <Flag className="w-4 h-4" />
              Report
            </button>
          </div>
          {isFreelancerView && !response && !showResponseForm && (
            <button
              onClick={() => setShowResponseForm(true)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <MessageSquare className="w-4 h-4" />
              Respond
            </button>
          )}
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Report Review
            </h3>
            <form onSubmit={handleSubmitReport}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for reporting
              </label>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Please explain why you're reporting this review..."
                required
                minLength={20}
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 20 characters required
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
