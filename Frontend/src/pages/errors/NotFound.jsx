import { Link } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Search,
  Compass,
  MapPin,
  Sparkles,
  ChevronRight,
  Briefcase,
  MessageSquare,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../components/common";

const quickLinks = [
  {
    icon: Home,
    label: "Homepage",
    description: "Go back to the main page",
    to: "/",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Briefcase,
    label: "Browse Jobs",
    description: "Find freelance opportunities",
    to: "/jobs",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Compass,
    label: "Dashboard",
    description: "Access your workspace",
    to: "/dashboard",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: HelpCircle,
    label: "Help Center",
    description: "Get support and answers",
    to: "/help",
    color: "from-amber-500 to-orange-500",
  },
];

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 Illustration */}
          <div className="relative mb-6 sm:mb-8">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 bg-blue-100/50 rounded-full blur-3xl" />
            </div>

            {/* 404 Number */}
            <div className="relative">
              <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-black leading-none tracking-tighter select-none">
                <span className="bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent">
                  4
                </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    0
                  </span>
                  {/* Floating compass icon */}
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-bounce">
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </span>
                <span className="bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent">
                  4
                </span>
              </h1>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              <span className="text-xs sm:text-sm font-semibold text-red-500 uppercase tracking-wider">
                Page Not Found
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Oops! You've wandered off the map
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Don't
              worry — let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-12">
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 active:scale-[0.98] group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Go Back
            </button>
            <Link to="/" className="w-full sm:w-auto">
              <button className="w-full inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]">
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="max-w-md mx-auto mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm text-slate-500 mb-3 font-medium">
              Or try searching for what you need:
            </p>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search pages, jobs, help articles..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 placeholder:text-slate-400 shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value) {
                    window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs sm:text-sm text-slate-500 mb-4 font-medium">
              Popular destinations:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3.5 sm:p-4 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 text-left"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 mb-2.5 sm:mb-3`}
                  >
                    <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Think this is a bug?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Let us know and we'll fix it right away.
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-all duration-200 border border-white/10 flex-shrink-0 group"
              >
                <MessageSquare className="w-4 h-4" />
                Report Issue
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
