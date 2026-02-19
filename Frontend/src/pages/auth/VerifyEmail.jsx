import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error, expired
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const token = searchParams.get("token");
  const email = searchParams.get("email") || "your email";

  useEffect(() => {
    if (token) {
      // Simulate API verification call
      const verifyEmail = async () => {
        setStatus("verifying");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate random success/failure for demo
        const isValid = token !== "expired" && token !== "invalid";

        if (token === "expired") {
          setStatus("expired");
        } else if (isValid) {
          setStatus("success");
          toast.success("Email verified successfully!");
          // Redirect to login after 3 seconds
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
        }
      };

      verifyEmail();
    }
  }, [token, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    setResending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResending(false);
    setCountdown(60);
    toast.success("Verification email sent!");
  };

  // No token - show waiting for verification screen
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-6">
              We've sent a verification link to{" "}
              <span className="font-semibold text-gray-900">{email}</span>.
              Please check your inbox and click the link to verify your account.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or click below to resend.
              </p>
            </div>

            <button
              onClick={handleResendEmail}
              disabled={resending || countdown > 0}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {resending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Resend Verification Email
                </>
              )}
            </button>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500">
                Wrong email?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Sign up again
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link to="/login" className="text-blue-600 hover:underline">
              ← Back to Login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Verifying status
  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Your Email
            </h1>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success status
  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now access all features of your account.
            </p>

            <Link
              to="/login"
              className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-center"
            >
              Continue to Login
            </Link>

            <p className="text-sm text-gray-500 mt-4">
              Redirecting you automatically in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Expired status
  if (status === "expired") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-yellow-600" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Link Expired
            </h1>
            <p className="text-gray-600 mb-6">
              This verification link has expired. Please request a new one to verify your email address.
            </p>

            <button
              onClick={handleResendEmail}
              disabled={resending || countdown > 0}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {resending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                "Send New Verification Link"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              <Link to="/login" className="text-blue-600 hover:underline">
                ← Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error status
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't verify your email address. The link may be invalid or has already been used.
          </p>

          <button
            onClick={handleResendEmail}
            disabled={resending || countdown > 0}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
          >
            {resending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              "Request New Verification Link"
            )}
          </button>

          <Link
            to="/login"
            className="block w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-center"
          >
            Back to Login
          </Link>

          <p className="text-sm text-gray-500 mt-6">
            Need help?{" "}
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
