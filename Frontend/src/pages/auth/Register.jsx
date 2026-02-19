import { useState, useEffect, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* -------------------------------------------------- */
/*  Memoised micro-components                         */
/* -------------------------------------------------- */
const EyeIcon = memo(({ visible }) => (
  <svg
    className="w-[18px] h-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {visible ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    ) : (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    )}
  </svg>
));
EyeIcon.displayName = "EyeIcon";

const Spinner = memo(() => (
  <svg
    className="animate-spin h-[18px] w-[18px]"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
));
Spinner.displayName = "Spinner";

/* Role card data — module-level constant */
const ROLES = [
  {
    value: "freelancer",
    title: "Work as Freelancer",
    desc: "Find projects & get paid",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    activeGradient:
      "linear-gradient(135deg, var(--brand-secondary-50), var(--theme-surface))",
    activeBorder: "var(--brand-secondary-500)",
    iconBg: "var(--theme-badge-secondary-bg)",
    iconColor: "var(--theme-badge-secondary-text)",
  },
  {
    value: "client",
    title: "Hire Talent",
    desc: "Post jobs & build teams",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    ),
    activeGradient:
      "linear-gradient(135deg, var(--brand-primary-50), var(--theme-surface))",
    activeBorder: "var(--brand-primary-500)",
    iconBg: "var(--theme-badge-primary-bg)",
    iconColor: "var(--theme-badge-primary-text)",
  },
];

/* -------------------------------------------------- */
/*  Register Component                                */
/* -------------------------------------------------- */
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setRole = useCallback((role) => {
    setFormData((prev) => ({ ...prev, role }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const result = await register(formData);
      setLoading(false);
      if (result.success) navigate("/dashboard");
    },
    [formData, register, navigate],
  );

  const isValid =
    formData.name.length > 0 &&
    formData.email.length > 0 &&
    formData.password.length > 0;

  /* ---- Reusable style objects (CSS custom props) ---- */
  const page = {
    background: "var(--theme-bg)",
    color: "var(--theme-text-primary)",
  };

  const dotBg = {
    backgroundImage:
      "radial-gradient(circle, var(--theme-dot-color) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  };

  const card = {
    background: "var(--theme-surface-card)",
    border: "1px solid var(--theme-border-default)",
    boxShadow: "var(--theme-shadow-xl)",
  };

  const inputIdle = {
    background: "var(--theme-bg-inset)",
    border: "1px solid var(--theme-border-default)",
    color: "var(--theme-text-primary)",
    transition: "all .2s ease",
  };

  const inputActive = {
    ...inputIdle,
    borderColor: "var(--brand-primary-500)",
    boxShadow: "0 0 0 3px var(--theme-badge-primary-bg)",
    background: "var(--theme-surface)",
  };

  const btnPrimary = {
    background:
      "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
    color: "var(--theme-text-on-primary)",
  };

  const divider = {
    background:
      "linear-gradient(90deg, transparent, var(--theme-border-strong), transparent)",
    height: "1px",
  };

  const fieldStyle = (name) =>
    focusedField === name ? inputActive : inputIdle;

  /* ---- Password strength indicator ---- */
  const pwLen = formData.password.length;
  const strength = pwLen === 0 ? 0 : pwLen < 6 ? 1 : pwLen < 10 ? 2 : 3;
  const strengthMeta = [
    { width: "0%", color: "transparent", label: "" },
    {
      width: "33%",
      color: "var(--brand-danger-500)",
      label: "Weak",
    },
    {
      width: "66%",
      color: "var(--brand-accent-500)",
      label: "Fair",
    },
    {
      width: "100%",
      color: "var(--brand-secondary-500)",
      label: "Strong",
    },
  ][strength];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={page}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={dotBg}
        aria-hidden="true"
      />

      {/* Decorative orbs */}
      <div
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--theme-orb-primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "var(--theme-orb-secondary)" }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[440px] z-10">
        {/* ---- Logo ---- */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-700))",
              }}
            >
              <svg
                className="w-5 h-5"
                style={{ color: "var(--theme-text-on-primary)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span style={{ color: "var(--theme-text-primary)" }}>
                Freelance
              </span>
              <span style={{ color: "var(--brand-primary-500)" }}>Hub</span>
            </span>
          </Link>
        </div>

        {/* ---- Card ---- */}
        <div className="rounded-3xl p-7 sm:p-9" style={card}>
          {/* Header */}
          <div className="text-center mb-7">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Create your account
            </h1>
            <p
              className="text-sm mt-1.5"
              style={{ color: "var(--theme-text-tertiary)" }}
            >
              Start your journey with FlexiWork
            </p>
          </div>

          {/* ---- Form ---- */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="reg-name"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Full Name
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={fieldStyle("name")}
                className="w-full h-11 px-3.5 rounded-xl text-sm placeholder:opacity-40"
                placeholder="John Doe"
                autoComplete="name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="reg-email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Email
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={fieldStyle("email")}
                className="w-full h-11 px-3.5 rounded-xl text-sm placeholder:opacity-40"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="reg-password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={fieldStyle("password")}
                  className="w-full h-11 px-3.5 pr-11 rounded-xl text-sm placeholder:opacity-40"
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200 cursor-pointer"
                  style={{ color: "var(--theme-text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color =
                      "var(--theme-text-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text-muted)")
                  }
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>

              {/* Strength bar */}
              {pwLen > 0 && (
                <div className="mt-2 flex items-center gap-2.5">
                  <div
                    className="flex-1 h-1 rounded-full overflow-hidden"
                    style={{ background: "var(--theme-bg-inset)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: strengthMeta.width,
                        background: strengthMeta.color,
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-medium shrink-0"
                    style={{ color: strengthMeta.color }}
                  >
                    {strengthMeta.label}
                  </span>
                </div>
              )}
            </div>

            {/* Role selection */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => {
                  const active = formData.role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className="relative rounded-xl p-4 text-left transition-all duration-200 cursor-pointer active:scale-[0.98]"
                      style={{
                        background: active
                          ? r.activeGradient
                          : "var(--theme-surface-muted)",
                        border: active
                          ? `2px solid ${r.activeBorder}`
                          : "2px solid var(--theme-border-default)",
                      }}
                      onMouseEnter={(e) => {
                        if (!active)
                          e.currentTarget.style.borderColor =
                            "var(--theme-border-strong)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active)
                          e.currentTarget.style.borderColor =
                            "var(--theme-border-default)";
                      }}
                    >
                      {/* Active indicator dot */}
                      {active && (
                        <div
                          className="absolute top-3 right-3 w-2 h-2 rounded-full"
                          style={{ background: r.activeBorder }}
                        />
                      )}

                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5"
                        style={{
                          background: r.iconBg,
                          color: r.iconColor,
                        }}
                      >
                        {r.icon}
                      </div>
                      <p
                        className="text-sm font-semibold"
                        style={{
                          color: active
                            ? "var(--theme-text-primary)"
                            : "var(--theme-text-secondary)",
                        }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--theme-text-muted)" }}
                      >
                        {r.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded cursor-pointer mt-0.5 accent-[var(--brand-primary-500)]"
                style={{ borderColor: "var(--theme-border-strong)" }}
                required
              />
              <label
                htmlFor="terms"
                className="text-xs leading-relaxed cursor-pointer select-none"
                style={{ color: "var(--theme-text-tertiary)" }}
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-2"
                  style={{ color: "var(--brand-primary-500)" }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-2"
                  style={{ color: "var(--brand-primary-500)" }}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full h-11 text-sm font-semibold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              style={btnPrimary}
              onMouseEnter={(e) => {
                if (!loading && isValid)
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(108, 59, 247, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Creating account…</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* ---- Divider ---- */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1" style={divider} />
            <span
              className="text-[11px] uppercase tracking-widest font-semibold"
              style={{ color: "var(--theme-text-muted)" }}
            >
              or
            </span>
            <div className="flex-1" style={divider} />
          </div>

          {/* Social / alt sign-up hint */}
          <button
            type="button"
            className="w-full h-11 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98]"
            style={{
              background: "var(--theme-surface-muted)",
              border: "1px solid var(--theme-border-default)",
              color: "var(--theme-text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-border-strong)";
              e.currentTarget.style.background = "var(--theme-surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--theme-border-default)";
              e.currentTarget.style.background = "var(--theme-surface-muted)";
            }}
          >
            <svg
              className="w-[18px] h-[18px]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* ---- Bottom link ---- */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--theme-text-tertiary)" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold underline underline-offset-4 transition-colors duration-200"
            style={{
              color: "var(--brand-primary-500)",
              textDecorationColor: "var(--theme-border-accent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--brand-primary-400)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand-primary-500)")
            }
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
