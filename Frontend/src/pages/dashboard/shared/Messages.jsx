import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Paperclip,
  Send,
  Image,
  File,
  X,
  MoreVertical,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
  Smile,
  Pin,
  ChevronLeft,
  MessageCircle,
  ArrowRight,
  Download,
  Mic,
  AtSign,
} from "lucide-react";
import toast from "react-hot-toast";

const demoConversations = [
  {
    id: "1",
    recipientName: "Sarah Johnson",
    recipientTitle: "Senior UI/UX Designer",
    avatar: null,
    project: "E-commerce Website Redesign",
    projectId: "p1",
    lastMessage: "I've uploaded the final designs for your review",
    lastMessageTime: "2 min ago",
    unread: 2,
    online: true,
    pinned: true,
    messages: [
      {
        id: "m1",
        sender: "them",
        content: "Hi! I've started working on the wireframes for the homepage.",
        time: "Yesterday, 10:30 AM",
        read: true,
      },
      {
        id: "m2",
        sender: "me",
        content:
          "Great! Looking forward to seeing them. Please make sure to include the featured products section we discussed.",
        time: "Yesterday, 11:15 AM",
        read: true,
      },
      {
        id: "m3",
        sender: "them",
        content:
          "Of course! I'll also add the promotional banner area. Here's a quick sketch of my initial ideas:",
        time: "Yesterday, 2:00 PM",
        read: true,
      },
      {
        id: "m4",
        sender: "them",
        content: "",
        time: "Yesterday, 2:01 PM",
        read: true,
        attachment: {
          type: "image",
          name: "homepage-sketch.png",
          size: "1.2 MB",
          url: "#",
        },
      },
      {
        id: "m5",
        sender: "me",
        content:
          "This looks fantastic! I love the clean layout. Can we make the search bar more prominent?",
        time: "Yesterday, 3:30 PM",
        read: true,
      },
      {
        id: "m6",
        sender: "them",
        content: "Absolutely! I've uploaded the final designs for your review",
        time: "2 min ago",
        read: false,
      },
      {
        id: "m7",
        sender: "them",
        content: "",
        time: "2 min ago",
        read: false,
        attachment: {
          type: "file",
          name: "final-designs-v2.fig",
          size: "8.4 MB",
          url: "#",
        },
      },
    ],
  },
  {
    id: "2",
    recipientName: "Michael Chen",
    recipientTitle: "Full Stack Developer",
    avatar: null,
    project: "Mobile App Development",
    projectId: "p2",
    lastMessage: "The API integration is complete. Ready for testing.",
    lastMessageTime: "1 hour ago",
    unread: 0,
    online: true,
    pinned: false,
    messages: [
      {
        id: "m1",
        sender: "them",
        content:
          "I've finished setting up the backend. The API integration is complete. Ready for testing.",
        time: "1 hour ago",
        read: true,
      },
    ],
  },
  {
    id: "3",
    recipientName: "Emily Davis",
    recipientTitle: "Brand Designer",
    avatar: null,
    project: "Brand Identity Design",
    projectId: "p3",
    lastMessage:
      "Thank you for the great review! It was a pleasure working with you.",
    lastMessageTime: "2 days ago",
    unread: 0,
    online: false,
    pinned: false,
    messages: [
      {
        id: "m1",
        sender: "me",
        content:
          "The brand guidelines look perfect! Great work on this project.",
        time: "2 days ago",
        read: true,
      },
      {
        id: "m2",
        sender: "them",
        content:
          "Thank you for the great review! It was a pleasure working with you.",
        time: "2 days ago",
        read: true,
      },
    ],
  },
  {
    id: "4",
    recipientName: "Alex Turner",
    recipientTitle: "SEO Specialist",
    avatar: null,
    project: "SEO Optimization",
    projectId: "p4",
    lastMessage: "I'll send the keyword research report by tomorrow.",
    lastMessageTime: "3 days ago",
    unread: 0,
    online: false,
    pinned: false,
    messages: [
      {
        id: "m1",
        sender: "them",
        content: "I'll send the keyword research report by tomorrow.",
        time: "3 days ago",
        read: true,
      },
    ],
  },
];

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
];

const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState(demoConversations);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const chatId = searchParams.get("chat");
    if (chatId) {
      const chat = conversations.find((c) => c.id === chatId);
      if (chat) {
        setSelectedChat(chat);
        setShowMobileChat(true);
      }
    }
  }, [searchParams, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat?.messages]);

  useEffect(() => {
    if (selectedChat) {
      const timer = setTimeout(() => {
        if (Math.random() > 0.7) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [selectedChat, selectedChat?.messages]);

  const filteredConversations = useMemo(
    () =>
      conversations
        .filter((conv) => {
          const q = searchQuery.toLowerCase();
          const matchesSearch =
            conv.recipientName.toLowerCase().includes(q) ||
            conv.project.toLowerCase().includes(q);
          const matchesFilter =
            filter === "all" ||
            (filter === "unread" && conv.unread > 0) ||
            (filter === "pinned" && conv.pinned);
          return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        }),
    [conversations, searchQuery, filter],
  );

  const totalUnread = useMemo(
    () => conversations.reduce((sum, c) => sum + c.unread, 0),
    [conversations],
  );

  const handleSelectChat = useCallback((conv) => {
    setSelectedChat(conv);
    setShowMobileChat(true);
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c)),
    );
  }, []);

  const handleBackToList = useCallback(() => {
    setShowMobileChat(false);
  }, []);

  const handleSendMessage = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim() && attachments.length === 0) return;
      if (!selectedChat) return;

      const newMsg = {
        id: Date.now().toString(),
        sender: "me",
        content: newMessage,
        time: "Just now",
        read: false,
        attachment: attachments[0] || null,
      };

      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv.id === selectedChat.id) {
            return {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: newMessage || "Sent an attachment",
              lastMessageTime: "Just now",
            };
          }
          return conv;
        });
        setSelectedChat(updated.find((c) => c.id === selectedChat.id));
        return updated;
      });

      setNewMessage("");
      setAttachments([]);
      inputRef.current?.focus();
    },
    [newMessage, attachments, selectedChat],
  );

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      type: file.type.startsWith("image/") ? "image" : "file",
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      url: URL.createObjectURL(file),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
    setShowAttachmentMenu(false);
  }, []);

  const removeAttachment = useCallback((index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handlePinConversation = useCallback((convId, e) => {
    e.stopPropagation();
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, pinned: !c.pinned } : c)),
    );
    toast.success("📌 Conversation pinned", {
      style: { borderRadius: "12px", background: "#1F2937", color: "#fff" },
    });
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Messages
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              {totalUnread > 0
                ? `${totalUnread} unread conversations`
                : "All caught up!"}
            </p>
          </div>
        </div>
        {totalUnread > 0 && (
          <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
            {totalUnread} new
          </span>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-[calc(100%-2.5rem)] sm:h-[calc(100%-3.5rem)] flex overflow-hidden">
        {/* ─── SIDEBAR ─── */}
        <div
          className={`${
            showMobileChat ? "hidden md:flex" : "flex"
          } w-full md:w-80 lg:w-96 border-r border-gray-100 flex-col bg-white`}
        >
          {/* Search */}
          <div className="p-3 sm:p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-3 sm:px-4 py-2 border-b border-gray-100 flex gap-1">
            {[
              { id: "all", label: "All" },
              { id: "unread", label: "Unread" },
              { id: "pinned", label: "Pinned" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === f.id
                    ? "bg-blue-100 text-blue-700 ring-1 ring-blue-200"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => {
              const color = getAvatarColor(conv.recipientName);
              const isSelected = selectedChat?.id === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelectChat(conv)}
                  className={`w-full p-3 sm:p-4 text-left transition-all duration-150 border-b border-gray-50 group relative ${
                    isSelected ? "bg-blue-50/80" : "hover:bg-gray-50/80"
                  }`}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-r-full" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                      >
                        {getInitials(conv.recipientName)}
                      </div>
                      {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {conv.pinned && (
                            <Pin className="w-3 h-3 text-blue-500 flex-shrink-0 fill-blue-500" />
                          )}
                          <p className="font-semibold text-gray-900 truncate text-sm">
                            {conv.recipientName}
                          </p>
                        </div>
                        <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2 font-medium">
                          {conv.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 truncate mb-1 font-medium">
                        {conv.project}
                      </p>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm truncate ${
                            conv.unread > 0
                              ? "text-gray-900 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <span className="ml-2 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pin button on hover */}
                  <button
                    onClick={(e) => handlePinConversation(conv.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
                    title={conv.pinned ? "Unpin" : "Pin"}
                  >
                    <Pin
                      className={`w-3 h-3 ${conv.pinned ? "text-blue-500 fill-blue-500" : "text-gray-400"}`}
                    />
                  </button>
                </button>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  No conversations found
                </p>
                <p className="text-xs text-gray-500">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ─── CHAT WINDOW ─── */}
        <div
          className={`${
            showMobileChat ? "flex" : "hidden md:flex"
          } flex-1 flex-col bg-white`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between bg-white/95 backdrop-blur-xl">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Back button (mobile) */}
                  <button
                    onClick={handleBackToList}
                    className="md:hidden p-2 -ml-1 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${getAvatarColor(
                        selectedChat.recipientName,
                      )} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                    >
                      {getInitials(selectedChat.recipientName)}
                    </div>
                    {selectedChat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {selectedChat.recipientName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {selectedChat.online ? (
                        <span className="text-emerald-600 font-medium">
                          ● Online
                        </span>
                      ) : (
                        selectedChat.recipientTitle
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors hidden sm:flex">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors hidden sm:flex">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Project Context Bar */}
              <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <AtSign className="w-3 h-3 text-blue-500" />
                  <span>Project:</span>
                  <a
                    href={`/dashboard/projects/${selectedChat.projectId}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    {selectedChat.project}
                  </a>
                </p>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 space-y-3 bg-gradient-to-b from-gray-50/50 to-white">
                {selectedChat.messages.map((msg, idx) => {
                  const isMe = msg.sender === "me";
                  const showAvatar =
                    !isMe &&
                    (idx === 0 ||
                      selectedChat.messages[idx - 1]?.sender === "me");

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"} ${
                        !showAvatar && !isMe ? "pl-10 sm:pl-12" : ""
                      }`}
                    >
                      {/* Avatar for other person */}
                      {showAvatar && !isMe && (
                        <div className="flex-shrink-0 mr-2 mt-auto">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br ${getAvatarColor(
                              selectedChat.recipientName,
                            )} rounded-lg flex items-center justify-center text-white font-bold text-[10px] sm:text-xs`}
                          >
                            {getInitials(selectedChat.recipientName)}
                          </div>
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] sm:max-w-[70%] lg:max-w-[65%]`}
                      >
                        {msg.content && (
                          <div
                            className={`px-3.5 sm:px-4 py-2.5 text-sm leading-relaxed ${
                              isMe
                                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-lg shadow-sm shadow-blue-200"
                                : "bg-white text-gray-900 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                            }`}
                          >
                            {msg.content}
                          </div>
                        )}

                        {msg.attachment && (
                          <div
                            className={`mt-1.5 overflow-hidden ${
                              isMe
                                ? "bg-blue-500/90 rounded-2xl rounded-br-lg"
                                : "bg-white rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                            }`}
                          >
                            {msg.attachment.type === "image" ? (
                              <div className="p-2">
                                <div
                                  className={`rounded-xl h-36 sm:h-44 flex items-center justify-center ${
                                    isMe ? "bg-blue-400/30" : "bg-gray-100"
                                  }`}
                                >
                                  <Image
                                    className={`w-8 h-8 ${
                                      isMe ? "text-blue-200" : "text-gray-300"
                                    }`}
                                  />
                                </div>
                                <div className="flex items-center justify-between mt-1.5 px-1">
                                  <p
                                    className={`text-[11px] truncate ${
                                      isMe ? "text-blue-200" : "text-gray-500"
                                    }`}
                                  >
                                    {msg.attachment.name}
                                  </p>
                                  <button
                                    className={`p-1 rounded-md ${
                                      isMe
                                        ? "hover:bg-blue-400/30"
                                        : "hover:bg-gray-100"
                                    } transition-colors`}
                                  >
                                    <Download
                                      className={`w-3 h-3 ${
                                        isMe ? "text-blue-200" : "text-gray-400"
                                      }`}
                                    />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="p-3 flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    isMe ? "bg-blue-400/30" : "bg-gray-100"
                                  }`}
                                >
                                  <File
                                    className={`w-5 h-5 ${
                                      isMe ? "text-white" : "text-gray-500"
                                    }`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-medium truncate ${
                                      isMe ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {msg.attachment.name}
                                  </p>
                                  <p
                                    className={`text-[11px] ${
                                      isMe ? "text-blue-200" : "text-gray-400"
                                    }`}
                                  >
                                    {msg.attachment.size}
                                  </p>
                                </div>
                                <button
                                  className={`p-2 rounded-xl ${
                                    isMe
                                      ? "hover:bg-blue-400/30 text-white"
                                      : "hover:bg-gray-100 text-gray-400"
                                  } transition-colors flex-shrink-0`}
                                >
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Time & Read Receipt */}
                        <div
                          className={`flex items-center gap-1 mt-1 px-1 ${
                            isMe ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span className="text-[10px] text-gray-400 font-medium">
                            {msg.time}
                          </span>
                          {isMe && (
                            <span
                              className={
                                msg.read ? "text-blue-500" : "text-gray-300"
                              }
                            >
                              {msg.read ? (
                                <CheckCheck className="w-3.5 h-3.5" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
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

                <div ref={messagesEndRef} />
              </div>

              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="px-3 sm:px-4 py-2.5 border-t border-gray-100 bg-gray-50/80">
                  <div className="flex gap-2 flex-wrap">
                    {attachments.map((att, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 group hover:border-blue-200 transition-colors"
                      >
                        <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                          {att.type === "image" ? (
                            <Image className="w-3.5 h-3.5 text-blue-500" />
                          ) : (
                            <File className="w-3.5 h-3.5 text-violet-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate max-w-[120px]">
                            {att.name}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {att.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeAttachment(index)}
                          className="p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 sm:p-4 border-t border-gray-100 bg-white"
              >
                <div className="flex items-end gap-2">
                  {/* Attachment Button */}
                  <div className="relative flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      className={`p-2.5 rounded-xl transition-all ${
                        showAttachmentMenu
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    {showAttachmentMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowAttachmentMenu(false)}
                        />
                        <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 w-44 z-20">
                          <button
                            type="button"
                            onClick={() => {
                              fileInputRef.current.accept = "image/*";
                              fileInputRef.current.click();
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Image className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700">
                              Photo
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              fileInputRef.current.accept = "*/*";
                              fileInputRef.current.click();
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors"
                          >
                            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                              <File className="w-4 h-4 text-violet-600" />
                            </div>
                            <span className="font-medium text-gray-700">
                              Document
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  {/* Emoji (hidden on very small) */}
                  <button
                    type="button"
                    className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors hidden sm:flex flex-shrink-0"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400 pr-12"
                    />
                    {/* Voice (when no text) */}
                    {!newMessage.trim() && attachments.length === 0 && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!newMessage.trim() && attachments.length === 0}
                    className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-200 disabled:shadow-none active:scale-[0.95] flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your Messages
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Select a conversation from the sidebar to start messaging your
                  team members and collaborators.
                </p>
                <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span>Read receipts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Paperclip className="w-3 h-3 text-blue-600" />
                    </div>
                    <span>File sharing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center">
                      <Pin className="w-3 h-3 text-violet-600" />
                    </div>
                    <span>Pin chats</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
