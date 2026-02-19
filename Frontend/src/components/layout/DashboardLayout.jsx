import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  MessageSquare,
  DollarSign,
  Briefcase,
  User,
  Settings,
  LogOut,
  PlusCircle,
  Users,
  Shield,
  FileSignature,
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  Award,
  Wallet,
  CreditCard,
  Layers,
  Search,
  Moon,
  Sun,
  HelpCircle,
  ExternalLink,
  Zap,
  Globe,
  BadgeCheck,
  TrendingUp,
  Loader2,
  Command,
  Hash,
} from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────────────

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  closed: {
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.02,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

// ─── Sub Components ──────────────────────────────────────────────────

const NavDivider = memo(({ label, collapsed }) => (
  <div className={`pt-5 pb-1.5 ${collapsed ? "px-0" : "px-3"}`}>
    {collapsed ? (
      <div className="w-full h-px bg-gray-200 mx-auto" />
    ) : (
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
        {label}
      </p>
    )}
  </div>
));
NavDivider.displayName = "NavDivider";

const NavLink = memo(({ link, isActive, collapsed, onClick, index }) => {
  const Icon = link.icon;

  return (
    <motion.div
      custom={index}
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
    >
      <Link
        to={link.path}
        onClick={onClick}
        title={collapsed ? link.label : undefined}
        className={`
          group relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200
          ${collapsed ? "justify-center px-3 py-2.5" : "px-3 py-2.5"}
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 shadow-sm"
              : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
          }
        `}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}

        <div
          className={`shrink-0 transition-all duration-200 ${
            isActive
              ? "text-blue-600"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        >
          <Icon
            className="w-[18px] h-[18px]"
            strokeWidth={isActive ? 2.2 : 1.8}
          />
        </div>

        {!collapsed && (
          <>
            <span className="flex-1 truncate">{link.label}</span>

            {/* Badges */}
            {link.badge && (
              <span className="px-2 py-0.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-[10px] font-bold rounded-md shadow-sm shadow-violet-500/25 uppercase tracking-wider">
                {link.badge}
              </span>
            )}
            {link.path === "/dashboard/messages" && (
              <span className="relative flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-md shadow-sm shadow-blue-500/25">
                3
              </span>
            )}
            {link.path === "/dashboard/disputes" && (
              <span className="relative flex items-center justify-center w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-md shadow-sm shadow-red-500/25">
                1
              </span>
            )}
          </>
        )}

        {/* Collapsed badges */}
        {collapsed &&
          (link.badge ||
            link.path === "/dashboard/messages" ||
            link.path === "/dashboard/disputes") && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white" />
          )}

        {/* Tooltip for collapsed */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
            {link.label}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        )}
      </Link>
    </motion.div>
  );
});
NavLink.displayName = "NavLink";

const UserSection = memo(({ user, collapsed, onLogout }) => (
  <div
    className={`border-t border-gray-100 bg-gradient-to-t from-gray-50 to-white ${collapsed ? "p-2" : "p-4"}`}
  >
    {collapsed ? (
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/25">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
        </div>
        <button
          onClick={onLogout}
          title="Logout"
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    ) : (
      <>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/25">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <Link
            to="/dashboard/notifications"
            className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Bell className="w-4.5 h-4.5 text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`
              inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg capitalize border
              ${
                user?.role === "client"
                  ? "bg-violet-50 text-violet-700 border-violet-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }
            `}
          >
            <BadgeCheck className="w-3 h-3" />
            {user?.role}
          </span>
          <button
            onClick={onLogout}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </>
    )}
  </div>
));
UserSection.displayName = "UserSection";

const WorkspaceLink = memo(({ collapsed }) => (
  <div className={`border-t border-gray-100 ${collapsed ? "p-2" : "p-3"}`}>
    <Link
      to="/dashboard/workspace/p1"
      title={collapsed ? "Open Workspace" : undefined}
      className={`
        flex items-center gap-2.5 rounded-xl text-sm font-semibold
        bg-gradient-to-r from-violet-50 to-blue-50 text-violet-700
        hover:from-violet-100 hover:to-blue-100 border border-violet-100/50
        transition-all duration-200 group
        ${collapsed ? "justify-center p-2.5" : "px-3.5 py-2.5"}
      `}
    >
      <Layers className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
      {!collapsed && (
        <>
          <span className="flex-1">Workspace</span>
          <span className="relative flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </span>
        </>
      )}
    </Link>
  </div>
));
WorkspaceLink.displayName = "WorkspaceLink";

const SidebarHeader = memo(({ collapsed, onToggle }) => (
  <div
    className={`flex items-center border-b border-gray-100 ${collapsed ? "justify-center p-3" : "justify-between p-4"}`}
  >
    <Link to="/" className="flex items-center gap-2.5">
      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25 shrink-0">
        <span className="text-white font-bold text-sm">F</span>
      </div>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
        >
          FreelanceHub
        </motion.span>
      )}
    </Link>
    {!collapsed && (
      <button
        onClick={onToggle}
        className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
        title="Collapse sidebar"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    )}
  </div>
));
SidebarHeader.displayName = "SidebarHeader";

const MobileTopBar = memo(({ onMenuToggle }) => (
  <div className="lg:hidden sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-lg border-b border-gray-100 flex items-center justify-between px-4">
    <button
      onClick={onMenuToggle}
      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
    >
      <Menu className="w-5 h-5 text-gray-700" />
    </button>
    <Link to="/" className="flex items-center gap-2">
      <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-xs">F</span>
      </div>
      <span className="font-bold text-base text-gray-900">FreelanceHub</span>
    </Link>
    <Link
      to="/dashboard/notifications"
      className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
    >
      <Bell className="w-5 h-5 text-gray-600" />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
    </Link>
  </div>
));
MobileTopBar.displayName = "MobileTopBar";

const CollapsedToggle = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="hidden lg:flex absolute -right-3 top-20 z-50 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
    title="Expand sidebar"
  >
    <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
  </button>
));
CollapsedToggle.displayName = "CollapsedToggle";

const LoadingScreen = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
          <span className="text-white font-bold text-xl">F</span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-blue-400"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Loading dashboard...</span>
      </div>
    </motion.div>
  </div>
));
LoadingScreen.displayName = "LoadingScreen";

// ─── Main Component ──────────────────────────────────────────────────

const DashboardLayout = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const freelancerLinks = useMemo(
    () => [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      { path: "/dashboard/proposals", label: "My Proposals", icon: FileText },
      { path: "/dashboard/projects", label: "Projects", icon: FolderKanban },
      { path: "/dashboard/messages", label: "Messages", icon: MessageSquare },
      { divider: true, label: "AI & Discovery" },
      {
        path: "/dashboard/ai-matching",
        label: "AI Matching",
        icon: Sparkles,
        badge: "New",
      },
      {
        path: "/dashboard/skill-verification",
        label: "Skill Verification",
        icon: Award,
      },
      { divider: true, label: "Financial" },
      { path: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
      { path: "/dashboard/withdraw", label: "Withdraw", icon: Wallet },
      { path: "/dashboard/escrow", label: "Escrow", icon: Shield },
      {
        path: "/dashboard/payment-methods",
        label: "Payment Methods",
        icon: CreditCard,
      },
      { path: "/dashboard/contracts", label: "Contracts", icon: FileSignature },
      { path: "/dashboard/disputes", label: "Disputes", icon: AlertTriangle },
      { divider: true, label: "Account" },
      { path: "/dashboard/portfolio", label: "Portfolio", icon: Briefcase },
      { path: "/dashboard/profile", label: "Profile", icon: User },
      { path: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
    [],
  );

  const clientLinks = useMemo(
    () => [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      { path: "/dashboard/post-job", label: "Post a Job", icon: PlusCircle },
      { path: "/dashboard/my-jobs", label: "My Jobs", icon: Briefcase },
      {
        path: "/dashboard/proposals-received",
        label: "Proposals",
        icon: Users,
      },
      { path: "/dashboard/messages", label: "Messages", icon: MessageSquare },
      { divider: true, label: "AI & Discovery" },
      {
        path: "/dashboard/ai-matching",
        label: "AI Matching",
        icon: Sparkles,
        badge: "New",
      },
      { divider: true, label: "Financial" },
      { path: "/dashboard/payments", label: "Payments", icon: DollarSign },
      { path: "/dashboard/escrow", label: "Escrow", icon: Shield },
      {
        path: "/dashboard/payment-methods",
        label: "Payment Methods",
        icon: CreditCard,
      },
      { path: "/dashboard/contracts", label: "Contracts", icon: FileSignature },
      { path: "/dashboard/disputes", label: "Disputes", icon: AlertTriangle },
      { divider: true, label: "Account" },
      { path: "/dashboard/client/profile", label: "Profile", icon: User },
      { path: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
    [],
  );

  const links = useMemo(
    () => (user?.role === "client" ? clientLinks : freelancerLinks),
    [user?.role, clientLinks, freelancerLinks],
  );

  const isActiveLink = useCallback(
    (link) => {
      if (link.exact) return location.pathname === link.path;
      return location.pathname.startsWith(link.path);
    },
    [location.pathname],
  );

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return null;

  const sidebarWidth = sidebarCollapsed ? "w-[72px]" : "w-[260px]";

  return (
    <div className="min-h-screen flex bg-gray-50/80">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50
          ${sidebarWidth} bg-white border-r border-gray-100
          flex flex-col h-screen
          transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Collapsed expand button */}
        {sidebarCollapsed && <CollapsedToggle onClick={toggleSidebar} />}

        {/* Header */}
        <SidebarHeader collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

        {/* Mobile close */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-3.5 right-3 p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-hidden overflow-x-hidden py-2 space-y-0.5 scrollbar-hide ${sidebarCollapsed ? "px-2" : "px-3"}`}
        >
          {links.map((link, index) => {
            if (link.divider) {
              return (
                <NavDivider
                  key={`divider-${index}`}
                  label={link.label}
                  collapsed={sidebarCollapsed}
                />
              );
            }
            return (
              <NavLink
                key={link.path}
                link={link}
                isActive={isActiveLink(link)}
                collapsed={sidebarCollapsed}
                onClick={() => setMobileMenuOpen(false)}
                index={index}
              />
            );
          })}
        </nav>

        {/* Workspace */}
        <WorkspaceLink collapsed={sidebarCollapsed} />

        {/* User */}
        <UserSection
          user={user}
          collapsed={sidebarCollapsed}
          onLogout={handleLogout}
        />
      </aside>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <main className="flex-1 min-h-screen flex flex-col min-w-0">
        {/* Mobile top bar */}
        <MobileTopBar onMenuToggle={toggleMobileMenu} />

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="hidden lg:flex items-center justify-between px-8 py-3 border-t border-gray-100 bg-white/50 text-xs text-gray-400">
          <span>© 2024 FreelanceHub. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-600 transition-colors">
              Help
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Terms
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
