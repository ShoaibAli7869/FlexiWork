// Reviews Service
// Handles all review-related API operations

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Demo reviews data
const demoReviews = [
  {
    id: "r1",
    projectId: "p1",
    freelancerId: "f1",
    clientId: "c1",
    overallRating: 5,
    ratings: {
      quality: 5,
      communication: 5,
      expertise: 5,
      professionalism: 5,
      deadline: 4,
    },
    title: "Exceptional work on our e-commerce redesign",
    content:
      "Sarah delivered outstanding work on our e-commerce platform redesign. Her attention to detail and creative solutions exceeded our expectations. Communication was excellent throughout the project.",
    recommend: true,
    isPublic: true,
    createdAt: "2024-02-20T10:00:00Z",
    response: null,
    helpful: 12,
    reviewer: {
      name: "TechCorp Inc.",
      avatar: null,
    },
  },
  {
    id: "r2",
    projectId: "p2",
    freelancerId: "f1",
    clientId: "c2",
    overallRating: 5,
    ratings: {
      quality: 5,
      communication: 5,
      expertise: 5,
      professionalism: 5,
      deadline: 5,
    },
    title: "Best designer I've worked with",
    content:
      "Incredible design skills and very professional. The mobile app design helped us secure our Series A funding. Highly recommended!",
    recommend: true,
    isPublic: true,
    createdAt: "2024-01-15T14:30:00Z",
    response: {
      content: "Thank you so much! It was a pleasure working on your project.",
      createdAt: "2024-01-16T09:00:00Z",
    },
    helpful: 8,
    reviewer: {
      name: "StartupXYZ",
      avatar: null,
    },
  },
];

/**
 * Get reviews for a freelancer
 * @param {string} freelancerId - The freelancer's ID
 * @param {object} options - Query options (page, limit, sort)
 * @returns {Promise<object>} Reviews data with pagination
 */
export const getFreelancerReviews = async (freelancerId, options = {}) => {
  await delay(500);

  const { page = 1, limit = 10, sort = "recent" } = options;

  const reviews = demoReviews.filter((r) => r.freelancerId === freelancerId);

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sort === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sort === "highest") {
      return b.overallRating - a.overallRating;
    }
    if (sort === "lowest") {
      return a.overallRating - b.overallRating;
    }
    if (sort === "helpful") {
      return b.helpful - a.helpful;
    }
    return 0;
  });

  // Calculate stats
  const stats = {
    totalReviews: reviews.length,
    averageRating:
      reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length || 0,
    ratingBreakdown: {
      5: reviews.filter((r) => r.overallRating === 5).length,
      4: reviews.filter((r) => r.overallRating === 4).length,
      3: reviews.filter((r) => r.overallRating === 3).length,
      2: reviews.filter((r) => r.overallRating === 2).length,
      1: reviews.filter((r) => r.overallRating === 1).length,
    },
    recommendationRate:
      (reviews.filter((r) => r.recommend).length / reviews.length) * 100 || 0,
  };

  // Paginate
  const startIndex = (page - 1) * limit;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + limit);

  return {
    success: true,
    data: {
      reviews: paginatedReviews,
      stats,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(sortedReviews.length / limit),
        totalCount: sortedReviews.length,
      },
    },
  };
};

/**
 * Get a single review by ID
 * @param {string} reviewId - The review ID
 * @returns {Promise<object>} Review data
 */
export const getReviewById = async (reviewId) => {
  await delay(300);

  const review = demoReviews.find((r) => r.id === reviewId);

  if (!review) {
    return {
      success: false,
      error: "Review not found",
    };
  }

  return {
    success: true,
    data: review,
  };
};

/**
 * Submit a new review
 * @param {object} reviewData - The review data
 * @returns {Promise<object>} Created review
 */
export const submitReview = async (reviewData) => {
  await delay(1000);

  const {
    projectId,
    freelancerId,
    overallRating,
    ratings,
    title,
    content,
    recommend,
    isPublic,
  } = reviewData;

  // Validation
  if (!projectId || !freelancerId) {
    return {
      success: false,
      error: "Project ID and Freelancer ID are required",
    };
  }

  if (!overallRating || overallRating < 1 || overallRating > 5) {
    return {
      success: false,
      error: "Valid overall rating is required (1-5)",
    };
  }

  if (!content || content.length < 50) {
    return {
      success: false,
      error: "Review content must be at least 50 characters",
    };
  }

  const newReview = {
    id: `r${Date.now()}`,
    projectId,
    freelancerId,
    clientId: "current_user", // Would come from auth context
    overallRating,
    ratings: ratings || {},
    title: title || "",
    content,
    recommend: recommend ?? true,
    isPublic: isPublic ?? true,
    createdAt: new Date().toISOString(),
    response: null,
    helpful: 0,
    reviewer: {
      name: "You",
      avatar: null,
    },
  };

  // In real app, this would be sent to the server
  demoReviews.push(newReview);

  return {
    success: true,
    data: newReview,
    message: "Review submitted successfully",
  };
};

/**
 * Respond to a review (freelancer only)
 * @param {string} reviewId - The review ID
 * @param {string} responseContent - The response content
 * @returns {Promise<object>} Updated review
 */
export const respondToReview = async (reviewId, responseContent) => {
  await delay(500);

  if (!responseContent || responseContent.length < 10) {
    return {
      success: false,
      error: "Response must be at least 10 characters",
    };
  }

  const reviewIndex = demoReviews.findIndex((r) => r.id === reviewId);

  if (reviewIndex === -1) {
    return {
      success: false,
      error: "Review not found",
    };
  }

  if (demoReviews[reviewIndex].response) {
    return {
      success: false,
      error: "You have already responded to this review",
    };
  }

  demoReviews[reviewIndex].response = {
    content: responseContent,
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: demoReviews[reviewIndex],
    message: "Response added successfully",
  };
};

/**
 * Mark a review as helpful
 * @param {string} reviewId - The review ID
 * @returns {Promise<object>} Updated review
 */
export const markReviewHelpful = async (reviewId) => {
  await delay(300);

  const reviewIndex = demoReviews.findIndex((r) => r.id === reviewId);

  if (reviewIndex === -1) {
    return {
      success: false,
      error: "Review not found",
    };
  }

  demoReviews[reviewIndex].helpful += 1;

  return {
    success: true,
    data: {
      helpful: demoReviews[reviewIndex].helpful,
    },
  };
};

/**
 * Report a review
 * @param {string} reviewId - The review ID
 * @param {string} reason - The reason for reporting
 * @returns {Promise<object>} Report confirmation
 */
export const reportReview = async (reviewId, reason) => {
  await delay(500);

  if (!reason || reason.length < 20) {
    return {
      success: false,
      error: "Please provide a detailed reason (at least 20 characters)",
    };
  }

  // In real app, this would create a report in the database
  return {
    success: true,
    message:
      "Thank you for your report. Our team will review it within 24-48 hours.",
  };
};

/**
 * Check if user can review a project
 * @param {string} projectId - The project ID
 * @returns {Promise<object>} Eligibility status
 */
export const checkReviewEligibility = async (projectId) => {
  await delay(300);

  // In real app, this would check:
  // 1. If the project is completed
  // 2. If the user was part of the project
  // 3. If a review has already been submitted

  return {
    success: true,
    data: {
      canReview: true,
      reason: null,
      projectDetails: {
        title: "E-commerce Website Redesign",
        completedAt: "2024-03-15T00:00:00Z",
        freelancer: {
          id: "f1",
          name: "Sarah Johnson",
          title: "Senior UI/UX Designer",
        },
      },
    },
  };
};

/**
 * Get review summary for multiple freelancers
 * @param {string[]} freelancerIds - Array of freelancer IDs
 * @returns {Promise<object>} Review summaries
 */
export const getBatchReviewSummaries = async (freelancerIds) => {
  await delay(400);

  const summaries = freelancerIds.reduce((acc, id) => {
    const reviews = demoReviews.filter((r) => r.freelancerId === id);
    acc[id] = {
      totalReviews: reviews.length,
      averageRating:
        reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length ||
        0,
      recommendationRate:
        (reviews.filter((r) => r.recommend).length / reviews.length) * 100 || 0,
    };
    return acc;
  }, {});

  return {
    success: true,
    data: summaries,
  };
};

export default {
  getFreelancerReviews,
  getReviewById,
  submitReview,
  respondToReview,
  markReviewHelpful,
  reportReview,
  checkReviewEligibility,
  getBatchReviewSummaries,
};
