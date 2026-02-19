// src/components/layout/Navbar.jsx
import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Briefcase,
  PlusCircle,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

/* ── Static Data ── */
const NAV_ITEMS = Object.freeze([
  Object.freeze({ name: "Find Talent", href: "/freelancers" }),
  Object.freeze({ name: "Find Work", href: "/jobs" }),
  Object.freeze({ name: "Pricing", href: "/pricing" }),
]);

const USER_MENU_ITEMS = Object.freeze([
  Object.freeze({
    icon: User,
    label: "My Profile",
    href: "/dashboard/profile",
  }),
  Object.freeze({
    icon: Briefcase,
    label: "My Projects",
    href: "/dashboard/projects",
  }),
  Object.freeze({
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  }),
]);

const MOBILE_ANIMATION = Object.freeze({
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.25, ease: "easeInOut" },
});

const DROPDOWN_ANIMATION = Object.freeze({
  initial: { opacity: 0, y: 8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.96 },
  transition: { duration: 0.15 },
});

/* ── Sub-Components ── */
const Logo = memo(() => (
  <Link to="/" className="flex items-center gap-2.5 group shrink-0">
    <div
      className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden
                 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-primary-500), var(--brand-secondary-500))",
      }}
    >
      <Zap
        className="w-[18px] h-[18px] text-white fill-white"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top right, transparent, rgba(255,255,255,0.15))",
        }}
        aria-hidden="true"
      />
    </div>
    <span className="text-xl font-extrabold tracking-tight">
      <span style={{ color: "var(--theme-text-primary)" }}>Flexi</span>
      <span className="text-gradient">Work</span>
    </span>
  </Link>
));
Logo.displayName = "Logo";

const NavLink = memo(({ item, isActive, onClick }) => (
  <Link
    to={item.href}
    onClick={onClick}
    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
    style={{
      color: isActive
        ? "var(--brand-primary-400)"
        : "var(--theme-text-secondary)",
    }}
    onMouseEnter={(e) => {
      if (!isActive) {
        e.currentTarget.style.color = "var(--theme-text-primary)";
        e.currentTarget.style.background = "var(--theme-surface-hover)";
      }
    }}
    onMouseLeave={(e) => {
      if (!isActive) {
        e.currentTarget.style.color = "var(--theme-text-secondary)";
        e.currentTarget.style.background = "transparent";
      }
    }}
    aria-current={isActive ? "page" : undefined}
  >
    {item.name}
    {isActive && (
      <motion.div
        layoutId="navbar-active"
        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--brand-primary-500), var(--brand-secondary-500))",
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        aria-hidden="true"
      />
    )}
  </Link>
));
NavLink.displayName = "NavLink";

const IconButton = memo(({ icon: Icon, badge, badgeText, label, onClick }) => (
  <button
    onClick={onClick}
    className="relative p-2.5 rounded-xl cursor-pointer transition-all duration-200"
    style={{ color: "var(--theme-text-tertiary)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "var(--theme-text-primary)";
      e.currentTarget.style.background = "var(--theme-surface-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "var(--theme-text-tertiary)";
      e.currentTarget.style.background = "transparent";
    }}
    aria-label={label}
  >
    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
    {badge && (
      <span
        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2"
        style={{
          background: "var(--brand-danger-500)",
          ringColor: "var(--theme-nav-bg-scrolled)",
        }}
        aria-hidden="true"
      />
    )}
    {badgeText && (
      <span
        className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                   text-[10px] font-bold rounded-full flex items-center justify-center ring-2"
        style={{
          background: "var(--brand-primary-500)",
          color: "white",
          ringColor: "var(--theme-nav-bg-scrolled)",
        }}
      >
        {badgeText}
      </span>
    )}
  </button>
));
IconButton.displayName = "IconButton";

const UserMenuItem = memo(({ icon: Icon, label, href, onClick, danger }) => {
  const Component = href ? Link : "button";
  return (
    <Component
      to={href}
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl
                 cursor-pointer transition-all duration-200"
      style={{
        color: danger
          ? "var(--brand-danger-400)"
          : "var(--theme-text-secondary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = danger
          ? "var(--theme-badge-danger-bg)"
          : "var(--theme-surface-hover)";
        if (!danger) e.currentTarget.style.color = "var(--theme-text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        if (!danger)
          e.currentTarget.style.color = "var(--theme-text-secondary)";
      }}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      {label}
    </Component>
  );
});
UserMenuItem.displayName = "UserMenuItem";

const MobileNavLink = memo(({ item, isActive, onClick }) => (
  <Link
    to={item.href}
    onClick={onClick}
    className="block px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200"
    style={{
      color: isActive
        ? "var(--brand-primary-400)"
        : "var(--theme-text-secondary)",
      background: isActive ? "var(--theme-badge-primary-bg)" : "transparent",
    }}
    aria-current={isActive ? "page" : undefined}
  >
    {item.name}
  </Link>
));
MobileNavLink.displayName = "MobileNavLink";

/* ── Main Component ── */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);

  const isLanding = location.pathname === "/";
  const isAuthenticated = false; // Replace with auth hook
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "freelancer",
  };

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);
  const toggleMobile = useCallback(() => setMobileMenuOpen((p) => !p), []);
  const toggleUser = useCallback(() => setUserMenuOpen((p) => !p), []);

  // Determine nav background
  const navBackground = isLanding
    ? scrolled
      ? "var(--theme-nav-bg-scrolled)"
      : "transparent"
    : "var(--theme-nav-bg-scrolled)";

  const navBorder =
    scrolled || !isLanding ? "var(--theme-nav-border)" : "transparent";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: navBackground,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter:
          scrolled || !isLanding ? `blur(var(--theme-nav-blur))` : "none",
        WebkitBackdropFilter:
          scrolled || !isLanding ? `blur(var(--theme-nav-blur))` : "none",
        boxShadow: scrolled ? "var(--theme-shadow-md)" : "none",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
              />
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <IconButton icon={Search} label="Search" />
                <IconButton icon={Bell} badge label="Notifications" />
                <IconButton
                  icon={MessageSquare}
                  badgeText="3"
                  label="Messages"
                />

                <div
                  className="w-px h-6 mx-1"
                  style={{ background: "var(--theme-border-default)" }}
                  aria-hidden="true"
                />

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUser}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl cursor-pointer
                               transition-all duration-200"
                    style={{
                      background: userMenuOpen
                        ? "var(--theme-surface-hover)"
                        : "transparent",
                    }}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    <div className="relative">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--brand-primary-500), var(--brand-secondary-500))",
                        }}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2"
                        style={{
                          background: "var(--brand-secondary-400)",
                          ringColor: "var(--theme-nav-bg-scrolled)",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200"
                      style={{
                        color: "var(--theme-text-tertiary)",
                        transform: userMenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        {...DROPDOWN_ANIMATION}
                        className="absolute right-0 mt-2 w-60 rounded-2xl overflow-hidden"
                        style={{
                          background: "var(--theme-glass-strong-bg)",
                          border: "1px solid var(--theme-glass-strong-border)",
                          backdropFilter: `blur(var(--theme-nav-blur))`,
                          boxShadow: "var(--theme-shadow-xl)",
                        }}
                        role="menu"
                      >
                        <div
                          className="p-4"
                          style={{
                            borderBottom:
                              "1px solid var(--theme-border-default)",
                          }}
                        >
                          <p
                            className="font-semibold text-sm"
                            style={{ color: "var(--theme-text-primary)" }}
                          >
                            {user.name}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "var(--theme-text-tertiary)" }}
                          >
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          {USER_MENU_ITEMS.map((item) => (
                            <UserMenuItem
                              key={item.label}
                              icon={item.icon}
                              label={item.label}
                              href={item.href}
                            />
                          ))}
                        </div>
                        <div
                          className="p-1.5"
                          style={{
                            borderTop: "1px solid var(--theme-border-default)",
                          }}
                        >
                          <UserMenuItem
                            icon={LogOut}
                            label="Sign Out"
                            onClick={() => {}}
                            danger
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {user.role === "client" && (
                  <button
                    className="px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2
                               cursor-pointer transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                      color: "var(--theme-text-on-primary)",
                    }}
                  >
                    <PlusCircle className="w-4 h-4" aria-hidden="true" />
                    Post a Job
                  </button>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--theme-text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--theme-text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--theme-text-secondary)";
                  }}
                >
                  Log In
                </Link>
                <Link to="/register">
                  <button
                    className="px-5 py-2.5 text-sm font-bold rounded-xl cursor-pointer
                               transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                      color: "var(--theme-text-on-primary)",
                      boxShadow: "0 2px 10px rgba(108, 59, 247, 0.2)",
                    }}
                  >
                    Get Started Free
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMobile}
            className="lg:hidden p-2 rounded-lg cursor-pointer transition-all duration-200"
            style={{ color: "var(--theme-text-secondary)" }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              {...MOBILE_ANIMATION}
              className="lg:hidden overflow-hidden"
            >
              <div
                className="py-4 space-y-1"
                style={{ borderTop: "1px solid var(--theme-border-default)" }}
              >
                {NAV_ITEMS.map((item) => (
                  <MobileNavLink
                    key={item.name}
                    item={item}
                    isActive={location.pathname === item.href}
                    onClick={closeMobile}
                  />
                ))}

                <div
                  className="pt-4 mt-4 space-y-2 px-4"
                  style={{ borderTop: "1px solid var(--theme-border-default)" }}
                >
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="block w-full py-2.5 text-center text-sm font-medium rounded-xl
                               transition-all duration-200"
                    style={{
                      color: "var(--theme-text-secondary)",
                      border: "1px solid var(--theme-border-default)",
                    }}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="block w-full"
                  >
                    <button
                      className="w-full py-2.5 text-sm font-bold rounded-xl cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
                        color: "var(--theme-text-on-primary)",
                      }}
                    >
                      Get Started Free
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export { Navbar };
export default memo(Navbar);
