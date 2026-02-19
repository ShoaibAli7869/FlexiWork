import { useState, useCallback, useMemo, memo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

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

const CheckIcon = memo(() => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const CrossIcon = memo(() => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
));
CrossIcon.displayName = "CrossIcon";

/* -------------------------------------------------- */
/*  Shared style objects                              */
/* -------------------------------------------------- */
const S = {
  page: {
    background: "var(--theme-bg)",
    color: "var(--theme-text-primary)",
  },
  dotBg: {
    backgroundImage:
      "radial-gradient(circle, var(--theme-dot-color) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
  },
  card: {
    background: "var(--theme-surface-card)",
    border: "1px solid var(--theme-border-default)",
    boxShadow: "var(--theme-shadow-xl)",
  },
  inputIdle: {
    background: "var(--theme-bg-inset)",
    border: "1px solid var(--theme-border-default)",
    color: "var(--theme-text-primary)",
    transition: "all .2s ease",
  },
  inputFocus: {
    background: "var(--theme-surface)",
    border: "1px solid var(--brand-primary-500)",
    color: "var(--theme-text-primary)",
    boxShadow: "0 0 0 3px var(--theme-badge-primary-bg)",
    transition: "all .2s ease",
  },
  inputError: {
    background: "var(--theme-bg-inset)",
    border: "1px solid var(--brand-danger-500)",
    color: "var(--theme-text-primary)",
    boxShadow: "0 0 0 3px var(--theme-badge-danger-bg)",
    transition: "all .2s ease",
  },
  btnPrimary: {
    background:
      "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
    color: "var(--theme-text-on-primary)",
  },
  btnHoverShadow: "0 8px 30px rgba(108, 59, 247, 0.35)",
  divider: {
    background:
      "linear-gradient(90deg, transparent, var(--theme-border-strong), transparent)",
    height: "1px",
  },
};

/* Password strength levels — module constant */
const STRENGTH_LEVELS = [
  { color: "transparent", label: "" },
  { color: "var(--brand-danger-500)", label: "Very Weak" },
  { color: "var(--brand-danger-400)", label: "Weak" },
  { color: "var(--brand-accent-500)", label: "Fair" },
  { color: "var(--brand-secondary-600)", label: "Good" },
  { color: "var(--brand-secondary-500)", label: "Strong" },
];

/* Password requirements — module constant */
const PW_RULES = [
  { test: (p) => p.length >= 8, text: "At least 8 characters" },
  { test: (p) => /[a-z]/.test(p), text: "One lowercase letter" },
  { test: (p) => /[A-Z]/.test(p), text: "One uppercase letter" },
  { test: (p) => /[0-9]/.test(p), text: "One number" },
  { test: (p) => /[^a-zA-Z0-9]/.test(p), text: "One special character" },
];

/* -------------------------------------------------- */
/*  Logo Block (shared)                               */
/* -------------------------------------------------- */
const Logo = memo(() => (
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
        <span style={{ color: "var(--theme-text-primary)" }}>Freelance</span>
        <span style={{ color: "var(--brand-primary-500)" }}>Hub</span>
      </span>
    </Link>
  </div>
));
Logo.displayName = "Logo";

/* -------------------------------------------------- */
/*  Invalid Token View                                */
/* -------------------------------------------------- */
const InvalidTokenView = memo(() => (
  <div
    className="min-h-screen flex items-center justify-center p-4 relative"
    style={S.page}
  >
    <div
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={S.dotBg}
      aria-hidden="true"
    />
    <div
      className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: "var(--theme-orb-primary)" }}
      aria-hidden="true"
    />

    <div className="relative w-full max-w-[440px] z-10">
      <Logo />

      <div className="rounded-3xl p-7 sm:p-9 text-center" style={S.card}>
        {/* Warning icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: "var(--theme-badge-danger-bg)",
            border: "1px solid var(--theme-badge-danger-border)",
          }}
        >
          <svg
            className="w-7 h-7"
            style={{ color: "var(--theme-badge-danger-text)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1
          className="text-2xl font-bold tracking-tight mb-2"
          style={{ color: "var(--theme-text-primary)" }}
        >
          Invalid Reset Link
        </h1>
        <p
          className="text-sm mb-6"
          style={{ color: "var(--theme-text-tertiary)" }}
        >
          This password reset link is invalid or has expired. Please request a
          new one.
        </p>

        <Link
          to="/forgot-password"
          className="flex items-center justify-center w-full h-11 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
          style={S.btnPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = S.btnHoverShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "";
          }}
        >
          Request New Link
        </Link>

        <div className="mt-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
            style={{ color: "var(--theme-text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--theme-text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--theme-text-muted)")
            }
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  </div>
));
InvalidTokenView.displayName = "InvalidTokenView";

/* -------------------------------------------------- */
/*  ResetPassword Component                           */
/* -------------------------------------------------- */
const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  /* ---- Derived state ---- */
  const strength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    return s;
  }, [formData.password]);

  const strengthMeta = STRENGTH_LEVELS[strength];

  const passwordsMatch =
    formData.confirmPassword.length === 0 ||
    formData.password === formData.confirmPassword;

  const isValid =
    formData.password.length >= 8 &&
    formData.password === formData.confirmPassword;

  const ruleResults = useMemo(
    () => PW_RULES.map((r) => ({ ...r, pass: r.test(formData.password) })),
    [formData.password],
  );

  /* ---- Handlers ---- */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (token) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("Invalid or expired reset token");
      }
      setLoading(false);
    },
    [formData, token, navigate],
  );

  /* ---- Input style helper ---- */
  const fieldStyle = useCallback(
    (name, hasError = false) => {
      if (hasError) return S.inputError;
      return focusedField === name ? S.inputFocus : S.inputIdle;
    },
    [focusedField],
  );

  /* ---- No token → show error view ---- */
  if (!token) return <InvalidTokenView />;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={S.page}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={S.dotBg}
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
        <Logo />

        {/* ---- Card ---- */}
        <div className="rounded-3xl p-7 sm:p-9" style={S.card}>
          {/* Header */}
          <div className="text-center mb-7">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: "var(--theme-badge-primary-bg)",
                border: "1px solid var(--theme-badge-primary-border)",
              }}
            >
              <svg
                className="w-7 h-7"
                style={{ color: "var(--theme-badge-primary-text)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h1
              className="text-2xl font-bold tracking-tight mb-1.5"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Create New Password
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--theme-text-tertiary)" }}
            >
              Must be different from previously used passwords.
            </p>
          </div>

          {/* ---- Form ---- */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* New Password */}
            <div>
              <label
                htmlFor="reset-password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="reset-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={fieldStyle("password")}
                  className="w-full h-11 px-3.5 pr-11 rounded-xl text-sm placeholder:opacity-40"
                  placeholder="Enter new password"
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
              {formData.password.length > 0 && (
                <div className="mt-2.5 flex items-center gap-2.5">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            level <= strength
                              ? strengthMeta.color
                              : "var(--theme-bg-inset)",
                        }}
                      />
                    ))}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="reset-confirm"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Confirm New Password
              </label>
              <input
                id="reset-confirm"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirm")}
                onBlur={() => setFocusedField(null)}
                style={fieldStyle("confirm", !passwordsMatch)}
                className="w-full h-11 px-3.5 rounded-xl text-sm placeholder:opacity-40"
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
              />
              {!passwordsMatch && (
                <p
                  className="text-xs mt-1.5 font-medium"
                  style={{ color: "var(--brand-danger-500)" }}
                >
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Requirements checklist */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "var(--theme-surface-muted)",
                border: "1px solid var(--theme-border-subtle)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2.5"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Password Requirements
              </p>
              <ul className="space-y-1.5">
                {ruleResults.map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[13px] transition-colors duration-200"
                    style={{
                      color: rule.pass
                        ? "var(--brand-secondary-500)"
                        : "var(--theme-text-muted)",
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                      style={{
                        background: rule.pass
                          ? "var(--theme-badge-secondary-bg)"
                          : "transparent",
                      }}
                    >
                      {rule.pass ? <CheckIcon /> : <CrossIcon />}
                    </span>
                    {rule.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full h-11 text-sm font-semibold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-1"
              style={S.btnPrimary}
              onMouseEnter={(e) => {
                if (!loading && isValid)
                  e.currentTarget.style.boxShadow = S.btnHoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span>Resetting…</span>
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1" style={S.divider} />
          </div>

          {/* Back to login */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98]"
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
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Sign In
          </Link>
        </div>

        {/* Bottom link */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--theme-text-tertiary)" }}
        >
          Remember your password?{" "}
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

export default ResetPassword;
