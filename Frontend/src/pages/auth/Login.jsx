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

/* Demo card data — static, never re-created */
const DEMO_ACCOUNTS = [
  {
    key: "freelancer",
    label: "Freelancer",
    email: "freelancer@demo.com",
    tag: "DEV",
    tagStyle: {
      background: "var(--theme-badge-secondary-bg)",
      color: "var(--theme-badge-secondary-text)",
      border: "1px solid var(--theme-badge-secondary-border)",
    },
  },
  {
    key: "client",
    label: "Client",
    email: "client@demo.com",
    tag: "BIZ",
    tagStyle: {
      background: "var(--theme-badge-primary-bg)",
      color: "var(--theme-badge-primary-text)",
      border: "1px solid var(--theme-badge-primary-border)",
    },
  },
];

/* -------------------------------------------------- */
/*  Login Component                                   */
/* -------------------------------------------------- */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect when already authed
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const result = await login(email, password);
      setLoading(false);
      if (result.success) navigate("/dashboard");
    },
    [email, password, login, navigate],
  );

  const setDemo = useCallback((type) => {
    setEmail(type === "freelancer" ? "freelancer@demo.com" : "client@demo.com");
    setPassword("demo123");
  }, []);

  const isValid = email.length > 0 && password.length > 0;

  /* ---- Inline style objects (use CSS vars from index.css) ---- */
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

  const inputBase = {
    background: "var(--theme-bg-inset)",
    border: "1px solid var(--theme-border-default)",
    color: "var(--theme-text-primary)",
  };

  const inputFocus = {
    outline: "none",
    borderColor: "var(--brand-primary-500)",
    boxShadow: "0 0 0 3px var(--theme-badge-primary-bg)",
    background: "var(--theme-surface)",
  };

  const btnPrimary = {
    background:
      "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
    color: "var(--theme-text-on-primary)",
  };

  const btnPrimaryHover = {
    boxShadow: "0 8px 30px rgba(108, 59, 247, 0.35)",
  };

  const divider = {
    background:
      "linear-gradient(90deg, transparent, var(--theme-border-strong), transparent)",
    height: "1px",
  };

  /* ---- small helpers to merge focus styles on inputs ---- */
  const [focusedField, setFocusedField] = useState(null);

  const inputStyle = (name) => ({
    ...inputBase,
    ...(focusedField === name ? inputFocus : {}),
    transition: "all .2s ease",
  });

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
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "var(--theme-orb-primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none"
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
              Sign in to your account
            </h1>
            <p
              className="text-sm mt-1.5"
              style={{ color: "var(--theme-text-tertiary)" }}
            >
              Enter your credentials to continue
            </p>
          </div>

          {/* ---- Form ---- */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("email")}
                className="w-full h-11 px-3.5 rounded-xl text-sm placeholder:opacity-40"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium"
                  style={{ color: "var(--theme-text-secondary)" }}
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium transition-colors duration-200"
                  style={{ color: "var(--theme-text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text-muted)")
                  }
                >
                  Reset it
                </Link>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("password")}
                  className="w-full h-11 px-3.5 pr-11 rounded-xl text-sm placeholder:opacity-40"
                  placeholder="••••••••"
                  autoComplete="current-password"
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
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded cursor-pointer accent-[var(--brand-primary-500)]"
                style={{
                  borderColor: "var(--theme-border-strong)",
                }}
              />
              <label
                htmlFor="remember"
                className="text-sm cursor-pointer select-none"
                style={{ color: "var(--theme-text-tertiary)" }}
              >
                Remember me
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
                  Object.assign(e.currentTarget.style, btnPrimaryHover);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Signing in…</span>
                </>
              ) : (
                "Sign in"
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
              Demo
            </span>
            <div className="flex-1" style={divider} />
          </div>

          {/* ---- Demo buttons ---- */}
          <div className="grid grid-cols-2 gap-2.5">
            {DEMO_ACCOUNTS.map(
              ({ key, label, email: dEmail, tag, tagStyle }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDemo(key)}
                  className="rounded-xl p-3 text-left active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  style={{
                    background: "var(--theme-surface-muted)",
                    border: "1px solid var(--theme-border-default)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--theme-border-strong)";
                    e.currentTarget.style.background =
                      "var(--theme-surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--theme-border-default)";
                    e.currentTarget.style.background =
                      "var(--theme-surface-muted)";
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={tagStyle}
                    >
                      {tag}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--theme-text-primary)" }}
                    >
                      {label}
                    </span>
                  </div>
                  <p
                    className="text-[10px] truncate"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {dEmail}
                  </p>
                </button>
              ),
            )}
          </div>
        </div>

        {/* ---- Bottom link ---- */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--theme-text-tertiary)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
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
            Get started
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
