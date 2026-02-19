import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const L = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

// Public Pages
const Home = L(lazy(() => import("../pages/public/Home")));
const BrowseJobs = L(lazy(() => import("../pages/public/BrowseJobs")));
const JobDetail = L(lazy(() => import("../pages/public/JobDetail")));
const BrowseFreelancers = L(
  lazy(() => import("../pages/public/BrowseFreelancers")),
);
const FreelancerProfile = L(
  lazy(() => import("../pages/public/FreelancerProfile")),
);
const Pricing = L(lazy(() => import("../pages/public/Pricing")));

// Auth Pages
const Login = L(lazy(() => import("../pages/auth/Login")));
const Register = L(lazy(() => import("../pages/auth/Register")));
const ForgotPassword = L(lazy(() => import("../pages/auth/ForgotPassword")));
const ResetPassword = L(lazy(() => import("../pages/auth/ResetPassword")));
const VerifyEmail = L(lazy(() => import("../pages/auth/VerifyEmail")));

// Freelancer Dashboard
const FreelancerDashboard = L(
  lazy(() => import("../pages/dashboard/freelancer/Dashboard")),
);
const FreelancerProposals = L(
  lazy(() => import("../pages/dashboard/freelancer/Proposals")),
);
const FreelancerProjects = L(
  lazy(() => import("../pages/dashboard/freelancer/Projects")),
);
const FreelancerEarnings = L(
  lazy(() => import("../pages/dashboard/freelancer/Earnings")),
);
const FreelancerPortfolio = L(
  lazy(() => import("../pages/dashboard/freelancer/Portfolio")),
);
const FreelancerProfilePage = L(
  lazy(() => import("../pages/dashboard/freelancer/Profile")),
);
const SubmitProposal = L(
  lazy(() => import("../pages/dashboard/freelancer/SubmitProposal")),
);
const Withdraw = L(
  lazy(() => import("../pages/dashboard/freelancer/Withdraw")),
);
const SkillVerification = L(
  lazy(() => import("../pages/dashboard/freelancer/SkillVerification")),
);

// Client Dashboard
const ClientDashboard = L(
  lazy(() => import("../pages/dashboard/client/Dashboard")),
);
const PostJob = L(lazy(() => import("../pages/dashboard/client/PostJob")));
const MyJobs = L(lazy(() => import("../pages/dashboard/client/MyJobs")));
const ClientProposals = L(
  lazy(() => import("../pages/dashboard/client/Proposals")),
);
const Payments = L(lazy(() => import("../pages/dashboard/client/Payments")));
const ClientProfile = L(
  lazy(() => import("../pages/dashboard/client/Profile")),
);
const HireFreelancer = L(
  lazy(() => import("../pages/dashboard/client/HireFreelancer")),
);

// Shared Dashboard
const Messages = L(lazy(() => import("../pages/dashboard/shared/Messages")));
const Settings = L(lazy(() => import("../pages/dashboard/shared/Settings")));
const Notifications = L(
  lazy(() => import("../pages/dashboard/shared/Notifications")),
);
const ProjectDetail = L(
  lazy(() => import("../pages/dashboard/shared/ProjectDetail")),
);
const Escrow = L(lazy(() => import("../pages/dashboard/shared/Escrow")));
const SubmitReview = L(
  lazy(() => import("../pages/dashboard/shared/SubmitReview")),
);
const Disputes = L(lazy(() => import("../pages/dashboard/shared/Disputes")));
const Contracts = L(lazy(() => import("../pages/dashboard/shared/Contracts")));
const PaymentMethods = L(
  lazy(() => import("../pages/dashboard/shared/PaymentMethods")),
);
const AIMatching = L(
  lazy(() => import("../pages/dashboard/shared/AIMatching")),
);
const Workspace = L(lazy(() => import("../pages/dashboard/shared/Workspace")));

// Errors
const NotFound = L(lazy(() => import("../pages/errors/NotFound")));

// Protected wrapper component
const Protected = ({ children, roles }) => (
  <ProtectedRoute allowedRoles={roles}>{children}</ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <BrowseJobs /> },
      { path: "jobs/:id", element: <JobDetail /> },
      { path: "freelancers", element: <BrowseFreelancers /> },
      { path: "freelancers/:id", element: <FreelancerProfile /> },
      { path: "pricing", element: <Pricing /> },
    ],
  },
  // Auth Routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      // Default dashboard (freelancer)
      { index: true, element: <FreelancerDashboard /> },

      // Freelancer Routes
      { path: "proposals", element: <FreelancerProposals /> },
      { path: "projects", element: <FreelancerProjects /> },
      { path: "projects/:id", element: <ProjectDetail /> },
      { path: "earnings", element: <FreelancerEarnings /> },
      { path: "portfolio", element: <FreelancerPortfolio /> },
      { path: "profile", element: <FreelancerProfilePage /> },
      { path: "submit-proposal/:jobId", element: <SubmitProposal /> },
      { path: "withdraw", element: <Withdraw /> },
      { path: "skill-verification", element: <SkillVerification /> },

      // Client Routes
      {
        path: "client",
        element: (
          <Protected roles={["client"]}>
            <ClientDashboard />
          </Protected>
        ),
      },
      {
        path: "client/profile",
        element: (
          <Protected roles={["client"]}>
            <ClientProfile />
          </Protected>
        ),
      },
      {
        path: "post-job",
        element: (
          <Protected roles={["client"]}>
            <PostJob />
          </Protected>
        ),
      },
      {
        path: "my-jobs",
        element: (
          <Protected roles={["client"]}>
            <MyJobs />
          </Protected>
        ),
      },
      {
        path: "proposals-received",
        element: (
          <Protected roles={["client"]}>
            <ClientProposals />
          </Protected>
        ),
      },
      {
        path: "hire/:proposalId",
        element: (
          <Protected roles={["client"]}>
            <HireFreelancer />
          </Protected>
        ),
      },

      // Shared Routes (accessible by both client and freelancer)
      { path: "payments", element: <Payments /> },
      { path: "messages", element: <Messages /> },
      { path: "settings", element: <Settings /> },
      { path: "notifications", element: <Notifications /> },
      { path: "escrow", element: <Escrow /> },
      { path: "contracts", element: <Contracts /> },
      { path: "disputes", element: <Disputes /> },
      { path: "review/:projectId", element: <SubmitReview /> },
      { path: "payment-methods", element: <PaymentMethods /> },
      { path: "ai-matching", element: <AIMatching /> },
      { path: "workspace/:projectId", element: <Workspace /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
