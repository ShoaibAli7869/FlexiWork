import { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

/* -------------------------------------------------- */
/*  Memoised micro-components                         */
/* -------------------------------------------------- */
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

/* -------------------------------------------------- */
/*  Shared style objects (CSS custom properties)      */
/* -------------------------------------------------- */
const styles = {
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
  btnPrimary: {
    background:
      "linear-gradient(135deg, var(--brand-primary-500), var(--brand-primary-600))",
    color: "var(--theme-text-on-primary)",
  },
  btnPrimaryHoverShadow: "0 8px 30px rgba(108, 59, 247, 0.35)",
};

/* -------------------------------------------------- */
/*  Success View                                      */
/* -------------------------------------------------- */
const SuccessView = memo(({ email, onRetry }) => (
  <div
    className="min-h-screen flex items-center justify-center p-4 relative"
    style={styles.page}
  >
    {/* Background */}
    <div
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={styles.dotBg}
      aria-hidden="true"
    />
    <div
      className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: "var(--theme-orb-secondary)" }}
      aria-hidden="true"
    />

    <div className="relative w-full max-w-[440px] z-10">
      {/* Logo */}
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

      {/* Card */}
      <div className="rounded-3xl p-7 sm:p-9 text-center" style={styles.card}>
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: "var(--theme-badge-secondary-bg)",
            border: "1px solid var(--theme-badge-secondary-border)",
          }}
        >
          <svg
            className="w-7 h-7"
            style={{ color: "var(--theme-badge-secondary-text)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>

        <h1
          className="text-2xl font-bold tracking-tight mb-2"
          style={{ color: "var(--theme-text-primary)" }}
        >
          Check your email
        </h1>

        <p
          className="text-sm mb-1"
          style={{ color: "var(--theme-text-tertiary)" }}
        >
          We&apos;ve sent a password reset link to
        </p>
        <p
          className="text-sm font-semibold mb-6"
          style={{ color: "var(--theme-text-primary)" }}
        >
          {email}
        </p>

        <p
          className="text-xs leading-relaxed mb-6"
          style={{ color: "var(--theme-text-muted)" }}
        >
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <button
            type="button"
            onClick={onRetry}
            className="underline underline-offset-2 cursor-pointer transition-colors duration-200"
            style={{ color: "var(--brand-primary-500)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--brand-primary-400)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--brand-primary-500)")
            }
          >
            try another email
          </button>
        </p>

        <Link
          to="/login"
          className="flex items-center justify-center w-full h-11 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
          style={styles.btnPrimary}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.btnPrimaryHoverShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "";
          }}
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  </div>
));
SuccessView.displayName = "SuccessView";

/* -------------------------------------------------- */
/*  ForgotPassword Component                          */
/* -------------------------------------------------- */
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim()) {
        toast.error("Please enter your email address");
        return;
      }
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email!");
    },
    [email],
  );

  const handleRetry = useCallback(() => {
    setIsSubmitted(false);
    setEmail("");
  }, []);

  /* ---- Success state ---- */
  if (isSubmitted) {
    return <SuccessView email={email} onRetry={handleRetry} />;
  }

  const isValid = email.trim().length > 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={styles.page}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={styles.dotBg}
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
        <div className="rounded-3xl p-7 sm:p-9" style={styles.card}>
          {/* Header */}
          <div className="text-center mb-7">
            {/* Key icon */}
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
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
            </div>

            <h1
              className="text-2xl font-bold tracking-tight mb-1.5"
              style={{ color: "var(--theme-text-primary)" }}
            >
              Forgot your password?
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--theme-text-tertiary)" }}
            >
              No worries — enter your email and we&apos;ll send you a reset
              link.
            </p>
          </div>

          {/* ---- Form ---- */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={focused ? styles.inputFocus : styles.inputIdle}
                className="w-full h-11 px-3.5 rounded-xl text-sm placeholder:opacity-40"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full h-11 text-sm font-semibold rounded-xl disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              style={styles.btnPrimary}
              onMouseEnter={(e) => {
                if (!isSubmitting && isValid)
                  e.currentTarget.style.boxShadow =
                    styles.btnPrimaryHoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  <span>Sending…</span>
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* ---- Divider ---- */}
          <div className="flex items-center gap-4 my-6">
            <div
              className="flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--theme-border-strong), transparent)",
                height: "1px",
              }}
            />
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

        {/* ---- Bottom link ---- */}
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

export default ForgotPassword;
