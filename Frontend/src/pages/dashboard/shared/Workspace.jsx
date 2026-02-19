import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Users,
  MessageSquare,
  FileText,
  Upload,
  Download,
  Share2,
  Video,
  Phone,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Send,
  Paperclip,
  Image,
  File,
  Folder,
  Clock,
  CheckCircle,
  Circle,
  Plus,
  X,
  Trash2,
  List,
  Grid,
  Copy,
  Bell,
  BellOff,
  Code,
  Palette,
  ChevronLeft,
  MoreVertical,
  Zap,
  ArrowLeft,
  Shield,
  Target,
  Layers,
  Activity,
  Hash,
} from "lucide-react";
import toast from "react-hot-toast";

const demoProject = {
  id: "p1",
  title: "E-commerce Platform Redesign",
  description: "Complete redesign and development of the e-commerce platform",
  status: "in_progress",
  client: { id: "c1", name: "John Smith", avatar: null, online: true },
  freelancer: { id: "f1", name: "Sarah Johnson", avatar: null, online: true },
  startDate: "2024-02-15",
  deadline: "2024-04-30",
};

const demoMembers = [
  {
    id: "c1",
    name: "John Smith",
    role: "Client",
    online: true,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "f1",
    name: "Sarah Johnson",
    role: "Freelancer",
    online: true,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "g1",
    name: "Mike Chen",
    role: "Guest",
    online: false,
    color: "from-emerald-500 to-teal-600",
  },
];

const demoFiles = [
  {
    id: "file1",
    name: "Homepage_Design_v3.fig",
    type: "design",
    size: "12.4 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-03-14T10:30:00",
    icon: "🎨",
  },
  {
    id: "file2",
    name: "Product_Requirements.pdf",
    type: "document",
    size: "2.1 MB",
    uploadedBy: "John Smith",
    uploadedAt: "2024-03-10T09:15:00",
    icon: "📄",
  },
  {
    id: "file3",
    name: "API_Documentation.md",
    type: "code",
    size: "45 KB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-03-12T14:20:00",
    icon: "💻",
  },
  {
    id: "file4",
    name: "Brand_Assets.zip",
    type: "archive",
    size: "89.2 MB",
    uploadedBy: "John Smith",
    uploadedAt: "2024-02-20T11:00:00",
    icon: "📦",
  },
  {
    id: "file5",
    name: "Dashboard_Mockup.png",
    type: "image",
    size: "3.8 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-03-13T16:45:00",
    icon: "🖼️",
  },
];

const demoTasks = [
  {
    id: "t1",
    title: "Design homepage mockups",
    status: "completed",
    assignee: "Sarah Johnson",
    dueDate: "2024-03-10",
  },
  {
    id: "t2",
    title: "Review and approve designs",
    status: "completed",
    assignee: "John Smith",
    dueDate: "2024-03-12",
  },
  {
    id: "t3",
    title: "Implement responsive layout",
    status: "in_progress",
    assignee: "Sarah Johnson",
    dueDate: "2024-03-18",
  },
  {
    id: "t4",
    title: "Set up product database",
    status: "in_progress",
    assignee: "Sarah Johnson",
    dueDate: "2024-03-20",
  },
  {
    id: "t5",
    title: "Create checkout flow",
    status: "pending",
    assignee: "Sarah Johnson",
    dueDate: "2024-03-25",
  },
  {
    id: "t6",
    title: "User testing",
    status: "pending",
    assignee: "John Smith",
    dueDate: "2024-04-01",
  },
];

const demoChatMessages = [
  {
    id: "m1",
    sender: "John Smith",
    senderId: "c1",
    message:
      "Hey Sarah! Just reviewed the latest designs, they look amazing! 🎉",
    timestamp: "2024-03-14T09:30:00",
    type: "text",
  },
  {
    id: "m2",
    sender: "Sarah Johnson",
    senderId: "f1",
    message:
      "Thanks John! I made adjustments to the color scheme based on your feedback.",
    timestamp: "2024-03-14T09:32:00",
    type: "text",
  },
  {
    id: "m3",
    sender: "Sarah Johnson",
    senderId: "f1",
    message: "Here's the updated product page:",
    timestamp: "2024-03-14T09:33:00",
    type: "text",
    attachment: { name: "ProductPage_v2.fig", size: "8.2 MB", type: "design" },
  },
  {
    id: "m4",
    sender: "John Smith",
    senderId: "c1",
    message:
      "Perfect! Can we schedule a call tomorrow to discuss the checkout flow?",
    timestamp: "2024-03-14T09:45:00",
    type: "text",
  },
  {
    id: "m5",
    sender: "Sarah Johnson",
    senderId: "f1",
    message: "Sure! How about 2 PM EST?",
    timestamp: "2024-03-14T09:47:00",
    type: "text",
  },
];

const demoActivity = [
  {
    id: "a1",
    user: "Sarah Johnson",
    action: "uploaded",
    target: "Homepage_Design_v3.fig",
    timestamp: "2024-03-14T10:30:00",
    icon: Upload,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: "a2",
    user: "John Smith",
    action: "commented on",
    target: "Product page design",
    timestamp: "2024-03-14T09:45:00",
    icon: MessageSquare,
    color: "text-violet-600 bg-violet-100",
  },
  {
    id: "a3",
    user: "Sarah Johnson",
    action: "completed task",
    target: "Design homepage mockups",
    timestamp: "2024-03-13T18:00:00",
    icon: CheckCircle,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    id: "a4",
    user: "John Smith",
    action: "approved",
    target: "Brand colors",
    timestamp: "2024-03-12T14:30:00",
    icon: Shield,
    color: "text-amber-600 bg-amber-100",
  },
];

const Workspace = () => {
  const { projectId } = useParams();
  const [project] = useState(demoProject);
  const [members] = useState(demoMembers);
  const [files, setFiles] = useState(demoFiles);
  const [tasks, setTasks] = useState(demoTasks);
  const [chatMessages, setChatMessages] = useState(demoChatMessages);
  const [activity] = useState(demoActivity);

  const [activeTab, setActiveTab] = useState("chat");
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [fileViewMode, setFileViewMode] = useState("grid");
  const [showShareModal, setShowShareModal] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showMobilePanel, setShowMobilePanel] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (newMessage) {
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  const taskStats = useMemo(
    () => ({
      pending: tasks.filter((t) => t.status === "pending").length,
      inProgress: tasks.filter((t) => t.status === "in_progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    }),
    [tasks],
  );

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const formatDate = (ts) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim()) return;
      const msg = {
        id: `m${Date.now()}`,
        sender: "Sarah Johnson",
        senderId: "f1",
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: "text",
      };
      setChatMessages((prev) => [...prev, msg]);
      setNewMessage("");
      inputRef.current?.focus();
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setChatMessages((prev) => [
            ...prev,
            {
              id: `m${Date.now()}`,
              sender: "John Smith",
              senderId: "c1",
              message: "Got it! I'll review this shortly.",
              timestamp: new Date().toISOString(),
              type: "text",
            },
          ]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    },
    [newMessage],
  );

  const handleFileUpload = useCallback((e) => {
    const uploaded = Array.from(e.target.files);
    const newFiles = uploaded.map((f) => ({
      id: `file${Date.now()}${Math.random()}`,
      name: f.name,
      type: f.type.includes("image") ? "image" : "document",
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      uploadedBy: "Sarah Johnson",
      uploadedAt: new Date().toISOString(),
      icon: f.type.includes("image") ? "🖼️" : "📄",
    }));
    setFiles((prev) => [...newFiles, ...prev]);
    toast.success(`📎 ${uploaded.length} file(s) uploaded`, {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  const handleAddTask = useCallback(
    (e) => {
      e.preventDefault();
      if (!newTaskTitle.trim()) return;
      setTasks((prev) => [
        ...prev,
        {
          id: `t${Date.now()}`,
          title: newTaskTitle,
          status: "pending",
          assignee: "Sarah Johnson",
          dueDate: new Date(Date.now() + 7 * 86400000)
            .toISOString()
            .split("T")[0],
        },
      ]);
      setNewTaskTitle("");
      setShowAddTask(false);
      toast.success("✅ Task added", {
        style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
      });
    },
    [newTaskTitle],
  );

  const toggleTaskStatus = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next =
          t.status === "pending"
            ? "in_progress"
            : t.status === "in_progress"
              ? "completed"
              : "pending";
        return { ...t, status: next };
      }),
    );
  }, []);

  const getFileTypeIcon = (type) => {
    const map = {
      image: <Image className="w-5 h-5 text-purple-500" />,
      design: <Palette className="w-5 h-5 text-pink-500" />,
      code: <Code className="w-5 h-5 text-emerald-500" />,
      document: <FileText className="w-5 h-5 text-blue-500" />,
    };
    return map[type] || <File className="w-5 h-5 text-gray-500" />;
  };

  const tabs = [
    { id: "chat", icon: MessageSquare, label: "Chat", badge: null },
    { id: "files", icon: Folder, label: "Files", badge: files.length },
    {
      id: "tasks",
      icon: Target,
      label: "Tasks",
      badge: taskStats.pending + taskStats.inProgress,
    },
    { id: "activity", icon: Activity, label: "Activity", badge: null },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/dashboard/projects"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors lg:hidden flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 flex-shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-lg font-extrabold text-gray-900 truncate">
              {project.title}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">
              Collaboration Workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Online avatars - hidden on very small */}
          <div className="hidden sm:flex items-center -space-x-2">
            {members
              .filter((m) => m.online)
              .map((m) => (
                <div
                  key={m.id}
                  className={`w-8 h-8 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm`}
                  title={m.name}
                >
                  {m.name.charAt(0)}
                </div>
              ))}
            <span className="ml-3 text-xs text-gray-500 font-medium">
              {members.filter((m) => m.online).length} online
            </span>
          </div>

          <button
            onClick={() => setNotifications(!notifications)}
            className={`p-2 rounded-xl transition-all ${notifications ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
          >
            {notifications ? (
              <Bell className="w-4 h-4" />
            ) : (
              <BellOff className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Share</span>
          </button>

          <button
            onClick={() => setShowVideoCall(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all text-sm font-semibold active:scale-[0.98]"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Call</span>
          </button>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Users className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tab Sidebar */}
        <div className="hidden sm:flex w-16 lg:w-20 bg-white border-r border-gray-100 flex-col items-center py-4 gap-2 flex-shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title={tab.label}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[8px] font-semibold hidden lg:block">
                {tab.label}
              </span>
              {tab.badge && (
                <span
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Tab Bar */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 relative ${
                activeTab === tab.id ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white pb-14 sm:pb-0">
          {/* ─── CHAT TAB ─── */}
          {activeTab === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto px-3 sm:px-5 lg:px-6 py-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
                {chatMessages.map((msg, idx) => {
                  const isOwn = msg.senderId === "f1";
                  const member = members.find((m) => m.id === msg.senderId);
                  const showAvatar =
                    !isOwn &&
                    (idx === 0 ||
                      chatMessages[idx - 1]?.senderId !== msg.senderId);
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"} ${!showAvatar && !isOwn ? "pl-10 sm:pl-12" : ""}`}
                    >
                      {showAvatar && !isOwn && (
                        <div className="flex-shrink-0 mr-2 mt-auto">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br ${member?.color || "from-gray-400 to-gray-500"} rounded-lg flex items-center justify-center text-white font-bold text-[10px] sm:text-xs`}
                          >
                            {msg.sender.charAt(0)}
                          </div>
                        </div>
                      )}
                      <div className="max-w-[85%] sm:max-w-[70%]">
                        {showAvatar && !isOwn && (
                          <p className="text-[10px] text-gray-400 mb-1 ml-1 font-medium">
                            {msg.sender}
                          </p>
                        )}
                        <div
                          className={`px-3.5 sm:px-4 py-2.5 text-sm leading-relaxed ${
                            isOwn
                              ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-lg shadow-sm shadow-blue-200"
                              : "bg-white text-gray-900 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                          }`}
                        >
                          <p>{msg.message}</p>
                          {msg.attachment && (
                            <div
                              className={`mt-2 p-2.5 rounded-xl flex items-center gap-2.5 ${isOwn ? "bg-blue-500/30" : "bg-gray-50 border border-gray-100"}`}
                            >
                              {getFileTypeIcon(msg.attachment.type)}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate">
                                  {msg.attachment.name}
                                </p>
                                <p
                                  className={`text-[10px] ${isOwn ? "text-blue-200" : "text-gray-400"}`}
                                >
                                  {msg.attachment.size}
                                </p>
                              </div>
                              <Download className="w-4 h-4 cursor-pointer flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                        <p
                          className={`text-[10px] text-gray-400 mt-1 px-1 font-medium ${isOwn ? "text-right" : ""}`}
                        >
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex justify-start pl-10 sm:pl-12">
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form
                onSubmit={handleSendMessage}
                className="border-t border-gray-100 p-3 sm:p-4 flex items-end gap-2 bg-white"
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200 disabled:shadow-none active:scale-[0.95] flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          )}

          {/* ─── FILES TAB ─── */}
          {activeTab === "files" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2 font-bold text-gray-900">
                  <Folder className="w-5 h-5 text-blue-600" />
                  Project Files
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-md text-xs font-bold">
                    {files.length}
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setFileViewMode((v) => (v === "grid" ? "list" : "grid"))
                    }
                    className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-500"
                  >
                    {fileViewMode === "grid" ? (
                      <List className="w-4 h-4" />
                    ) : (
                      <Grid className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                </div>
              </div>

              {fileViewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group"
                    >
                      <div className="h-20 sm:h-24 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-3xl">
                        {file.icon}
                      </div>
                      <p className="font-semibold text-gray-900 truncate text-xs sm:text-sm">
                        {file.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                        {file.size} · {formatDate(file.uploadedAt)}
                      </p>
                      <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download className="w-3.5 h-3.5 text-blue-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all group"
                    >
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                        {file.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.uploadedBy} · {formatDate(file.uploadedAt)}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 font-medium hidden sm:block">
                        {file.size}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-blue-50 rounded-xl transition-colors">
                          <Download className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── TASKS TAB ─── */}
          {activeTab === "tasks" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2 font-bold text-gray-900">
                  <Target className="w-5 h-5 text-blue-600" />
                  Tasks
                </h2>
                <button
                  onClick={() => setShowAddTask(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Task</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  {
                    label: "Pending",
                    value: taskStats.pending,
                    color: "bg-gray-50 border-gray-200 text-gray-700",
                  },
                  {
                    label: "In Progress",
                    value: taskStats.inProgress,
                    color: "bg-blue-50 border-blue-200 text-blue-700",
                  },
                  {
                    label: "Completed",
                    value: taskStats.completed,
                    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`${s.color} border rounded-xl p-3 sm:p-4 text-center`}
                  >
                    <p className="text-xl sm:text-2xl font-extrabold">
                      {s.value}
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium opacity-70">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {showAddTask && (
                <form
                  onSubmit={handleAddTask}
                  className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl"
                >
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddTask(false)}
                      className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 sm:p-4 bg-white border border-gray-100 rounded-xl transition-all hover:border-blue-200 ${task.status === "completed" ? "opacity-60" : ""}`}
                  >
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="flex-shrink-0"
                    >
                      {task.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : task.status === "in_progress" ? (
                        <Clock className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold text-sm ${task.status === "completed" ? "text-gray-400 line-through" : "text-gray-900"}`}
                      >
                        {task.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {task.assignee} · Due {formatDate(task.dueDate)}
                      </p>
                    </div>
                    <span
                      className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                        task.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : task.status === "in_progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── ACTIVITY TAB ─── */}
          {activeTab === "activity" && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <h2 className="flex items-center gap-2 font-bold text-gray-900 mb-5">
                <Activity className="w-5 h-5 text-blue-600" />
                Activity Feed
              </h2>
              <div className="relative">
                <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-px bg-gray-200" />
                <div className="space-y-5">
                  {activity.map((item) => {
                    const member = members.find((m) => m.name === item.user);
                    const EventIcon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 sm:gap-4 relative"
                      >
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ring-4 ring-white z-10 ${item.color}`}
                        >
                          <EventIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-semibold">{item.user}</span>{" "}
                            <span className="text-gray-500">{item.action}</span>{" "}
                            <span className="font-semibold">{item.target}</span>
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 font-medium">
                            {formatDate(item.timestamp)} at{" "}
                            {formatTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Desktop */}
        <div className="hidden lg:block w-72 xl:w-80 bg-white border-l border-gray-100 p-5 overflow-y-auto flex-shrink-0">
          <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-5">
            <Layers className="w-4 h-4 text-blue-600" />
            Project Details
          </h3>
          <div className="space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                Status
              </p>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                In Progress
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                Timeline
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {formatDate(project.startDate)} — {formatDate(project.deadline)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-3">
                Team Members
              </p>
              <div className="space-y-3">
                {members.map((m) => (
                  <div key={m.id} className="flex items-center gap-2.5">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-9 h-9 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                      >
                        {m.name.charAt(0)}
                      </div>
                      {m.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">
                        {m.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-3">
                Quick Stats
              </p>
              <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                {[
                  { label: "Files", value: files.length },
                  { label: "Tasks", value: tasks.length },
                  { label: "Messages", value: chatMessages.length },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5"
                  >
                    <span className="text-xs text-gray-500">{s.label}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setShowMobileSidebar(false)}
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Project Info</h3>
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2">
                    Status
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    In Progress
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-3">
                    Team
                  </p>
                  <div className="space-y-3">
                    {members.map((m) => (
                      <div key={m.id} className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {m.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {m.role}
                            {m.online ? " · Online" : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
              {[
                {
                  initial: "S",
                  color: "from-blue-600 to-indigo-600",
                  label: "You",
                },
                {
                  initial: "J",
                  color: "from-violet-600 to-purple-600",
                  label: "John Smith",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="aspect-video bg-gray-800 rounded-2xl flex flex-col items-center justify-center gap-3 border border-gray-700"
                >
                  {(i === 0 && isVideoOff) || i === 1 ? (
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg`}
                    >
                      {p.initial}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">Camera active</div>
                  )}
                  <p className="text-xs text-gray-400 font-medium">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 sm:p-6 flex items-center justify-center gap-3 sm:gap-4">
            {[
              {
                icon: isMuted ? MicOff : Mic,
                active: isMuted,
                onClick: () => setIsMuted(!isMuted),
              },
              {
                icon: isVideoOff ? VideoOff : Video,
                active: isVideoOff,
                onClick: () => setIsVideoOff(!isVideoOff),
              },
              { icon: Monitor, active: false, onClick: () => {} },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={`p-3 sm:p-4 rounded-2xl transition-all ${btn.active ? "bg-red-500 text-white" : "bg-gray-700/80 text-white hover:bg-gray-600"}`}
              >
                <btn.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            ))}
            <button
              onClick={() => setShowVideoCall(false)}
              className="p-3 sm:p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all ml-4"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setShowShareModal(false)
          }
        >
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Share Workspace
                  </h2>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Invite by email
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                    <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200">
                      Invite
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Or share link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`https://freelancehub.com/ws/${project.id}`}
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://freelancehub.com/ws/${project.id}`,
                        );
                        toast.success("📋 Link copied!", {
                          style: {
                            borderRadius: "12px",
                            background: "#1F2937",
                            color: "#fff",
                          },
                        });
                      }}
                      className="px-3 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                    Current Members
                  </p>
                  <div className="space-y-3">
                    {members.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-9 h-9 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center text-white text-xs font-bold`}
                          >
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {m.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {m.role}
                            </p>
                          </div>
                        </div>
                        <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                          <option>Can edit</option>
                          <option>Can view</option>
                          <option>Remove</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;
