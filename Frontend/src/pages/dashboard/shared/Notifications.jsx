import { useState, useMemo, useCallback } from "react";
import {
  Bell,
  Briefcase,
  MessageSquare,
  DollarSign,
  CheckCircle,
  Star,
  Trash2,
  Check,
  CheckCheck,
  Filter,
  X,
  Sparkles,
  BellOff,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";

const initialNotifications = [
  {
    id: 1,
    type: "proposal",
    title: "New proposal received",
    message: 'Sarah Johnson sent a proposal for "E-commerce Website Redesign"',
    time: "5 minutes ago",
    read: false,
    icon: Briefcase,
    gradient: "from-blue-500 to-indigo-500",
    bg: "bg-blue-50",
    borderColor: "border-blue-200",
    dotColor: "bg-blue-500",
  },
  {
    id: 2,
    type: "message",
    title: "New message",
    message:
      'Michael Chen: "I have completed the first milestone and ready for review..."',
    time: "1 hour ago",
    read: false,
    icon: MessageSquare,
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    message:
      'You received $2,500 for "Mobile App Development" milestone payment',
    time: "2 hours ago",
    read: true,
    icon: DollarSign,
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    borderColor: "border-violet-200",
    dotColor: "bg-violet-500",
  },
  {
    id: 4,
    type: "milestone",
    title: "Milestone completed",
    message:
      'Emma Williams marked "Design Phase" as complete — ready for your review',
    time: "5 hours ago",
    read: true,
    icon: CheckCircle,
    gradient: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50",
    borderColor: "border-teal-200",
    dotColor: "bg-teal-500",
  },
  {
    id: 5,
    type: "review",
    title: "New 5-star review",
    message:
      "TechCorp Inc. left you a glowing 5-star review on your recent project",
    time: "1 day ago",
    read: true,
    icon: Star,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    borderColor: "border-amber-200",
    dotColor: "bg-amber-500",
  },
];

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notificationList, setNotificationList] =
    useState(initialNotifications);
  const [deletingIds, setDeletingIds] = useState([]);

  const unreadCount = useMemo(
    () => notificationList.filter((n) => !n.read).length,
    [notificationList],
  );

  const filteredNotifications = useMemo(
    () =>
      notificationList.filter((n) => {
        if (filter === "unread") return !n.read;
        return true;
      }),
    [notificationList, filter],
  );

  const markAllAsRead = useCallback(() => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("✅ All notifications marked as read", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const markAsRead = useCallback((id) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const deleteNotification = useCallback((id) => {
    setDeletingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setNotificationList((prev) => prev.filter((n) => n.id !== id));
      setDeletingIds((prev) => prev.filter((did) => did !== id));
      toast.success("🗑️ Notification removed", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    }, 300);
  }, []);

  const clearAll = useCallback(() => {
    if (window.confirm("Clear all notifications? This cannot be undone.")) {
      setNotificationList([]);
      toast.success("All notifications cleared", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs font-bold text-white">
                      {unreadCount}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Notifications
                </h1>
                <p className="text-gray-500 mt-0.5 text-sm">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                    : "You're all caught up!"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-[0.98]"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Mark all read</span>
                  <span className="sm:hidden">Read all</span>
                </button>
              )}
              {notificationList.length > 0 && (
                <button
                  onClick={clearAll}
                  className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-400 hover:text-gray-600"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {notificationList.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              {
                icon: Zap,
                value: notificationList.length,
                label: "Total",
                color: "from-blue-400 to-indigo-400",
                bg: "bg-blue-50 border-blue-100",
              },
              {
                icon: Bell,
                value: unreadCount,
                label: "Unread",
                color: "from-red-400 to-rose-400",
                bg: "bg-red-50 border-red-100",
              },
              {
                icon: Check,
                value: notificationList.length - unreadCount,
                label: "Read",
                color: "from-emerald-400 to-green-400",
                bg: "bg-emerald-50 border-emerald-100",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.bg} border rounded-xl p-3 sm:p-4 text-center transition-all hover:scale-[1.02] cursor-default`}
              >
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm`}
                >
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-5 sm:mb-6 overflow-hidden">
          <div className="p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              {[
                { id: "all", label: "All", count: notificationList.length },
                { id: "unread", label: "Unread", count: unreadCount },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    filter === f.id
                      ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200 shadow-inner"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {f.label}
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                      filter === f.id
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors hidden sm:flex">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const isDeleting = deletingIds.includes(notification.id);
            const Icon = notification.icon;

            return (
              <div
                key={notification.id}
                className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isDeleting
                    ? "opacity-0 scale-95 -translate-x-4"
                    : "opacity-100 scale-100 translate-x-0"
                } ${
                  !notification.read
                    ? `${notification.bg} ${notification.borderColor} border hover:shadow-md`
                    : "border-gray-100 hover:shadow-gray-100/50 hover:border-gray-200"
                }`}
              >
                {/* Unread accent bar */}
                {!notification.read && (
                  <div
                    className={`h-0.5 bg-gradient-to-r ${notification.gradient}`}
                  />
                )}

                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${notification.gradient} rounded-xl flex items-center justify-center shadow-md`}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      {!notification.read && (
                        <div
                          className={`absolute -top-1 -right-1 w-3 h-3 ${notification.dotColor} rounded-full border-2 border-white animate-pulse`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={`font-bold text-sm sm:text-base truncate ${
                                !notification.read
                                  ? "text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-md ring-1 ring-blue-200">
                                NEW
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-sm leading-relaxed ${
                              !notification.read
                                ? "text-gray-700"
                                : "text-gray-500"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-[11px] text-gray-400 font-medium">
                              {notification.time}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Actions (always visible) */}
                  <div className="flex items-center justify-end gap-2 mt-3 sm:hidden">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 rounded-lg text-xs font-semibold transition-all active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 bg-red-50 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                {filter === "unread" ? (
                  <Sparkles className="w-10 h-10 text-blue-500" />
                ) : (
                  <BellOff className="w-10 h-10 text-blue-400" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {filter === "unread"
                  ? "All caught up! 🎉"
                  : "No notifications yet"}
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed mb-6">
                {filter === "unread"
                  ? "You've read all your notifications. Great job staying on top of things!"
                  : "When you receive proposals, messages, payments, or updates, they'll appear here."}
              </p>
              {filter === "unread" && (
                <button
                  onClick={() => setFilter("all")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  View all notifications
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Tips */}
        {notificationList.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-1">
                  Stay organized
                </h4>
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                  Pro tip: Mark important notifications as read to keep your
                  inbox clean. You can always find past notifications in your
                  activity history.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
