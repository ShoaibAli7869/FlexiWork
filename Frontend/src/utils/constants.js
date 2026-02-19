export const APP_NAME = "FlexiWork";

export const JOB_CATEGORIES = [
  "Development",
  "Design",
  "Writing",
  "Marketing",
  "Video & Animation",
  "Music & Audio",
  "Business",
  "Data",
];

export const EXPERIENCE_LEVELS = ["Entry", "Intermediate", "Expert"];

export const PROJECT_DURATIONS = [
  { value: "less_than_week", label: "Less than a week" },
  { value: "1_2_weeks", label: "1-2 weeks" },
  { value: "2_4_weeks", label: "2-4 weeks" },
  { value: "1_3_months", label: "1-3 months" },
  { value: "3_6_months", label: "3-6 months" },
  { value: "6_months_plus", label: "6+ months" },
];

export const PROPOSAL_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  INTERVIEWING: "interviewing",
  WITHDRAWN: "withdrawn",
};

export const PROJECT_STATUS = {
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  COMPLETED: "completed",
  PAUSED: "paused",
  CANCELLED: "cancelled",
};

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";
