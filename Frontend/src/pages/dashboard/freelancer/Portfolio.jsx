import { useState, useEffect, useCallback, useMemo } from "react";
import { demoPortfolio } from "../../../data/demoData";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  Image as ImageIcon,
  Tag,
  FolderOpen,
  Link2,
  FileText,
  Type,
  Save,
  Sparkles,
  Grid3X3,
  List,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Heart,
  ChevronRight,
  Layers,
  Upload,
  AlertTriangle,
  CheckCircle2,
  GripVertical,
  LayoutGrid,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Web Design",
  "Mobile App",
  "Brand Identity",
  "UI/UX",
  "Illustration",
  "Photography",
];

const INITIAL_FORM_DATA = {
  title: "",
  description: "",
  category: "",
  tags: "",
  link: "",
  image: "",
};

const InputField = ({ icon: Icon, label, error, className = "", ...props }) => (
  <div className={`space-y-1.5 ${className}`}>
    {label && (
      <label className="block text-xs sm:text-sm font-semibold text-slate-700">
        {label}
        {props.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      )}
      {props.rows ? (
        <textarea
          {...props}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 resize-none ${
            error
              ? "border-red-300 focus:ring-red-500/20 focus:border-red-400"
              : ""
          }`}
        />
      ) : (
        <input
          {...props}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 sm:py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 ${
            error
              ? "border-red-300 focus:ring-red-500/20 focus:border-red-400"
              : ""
          }`}
        />
      )}
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

const PortfolioCard = ({ item, onEdit, onDelete, viewMode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-48 md:w-56 lg:w-64 h-40 sm:h-auto flex-shrink-0 bg-slate-100 overflow-hidden">
            {!imageError ? (
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <ImageIcon className="w-8 h-8 text-slate-300" />
              </div>
            )}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-slate-100 animate-pulse" />
            )}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-blue-700 rounded-lg shadow-sm">
                <FolderOpen className="w-3 h-3" />
                {item.category}
              </span>
            </div>
          </div>
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/50 py-1.5 z-20">
                        <button
                          onClick={() => {
                            onEdit(item);
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            onClick={() => setShowMenu(false)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Live
                          </a>
                        )}
                        <button
                          onClick={() => {
                            onDelete(item.id);
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-3">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] sm:text-xs font-medium rounded-md ring-1 ring-inset ring-slate-200/80"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
                {item.tags?.length > 4 && (
                  <span className="text-[10px] sm:text-xs text-slate-400 font-medium px-1.5 py-0.5">
                    +{item.tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 gap-2">
            <ImageIcon className="w-10 h-10 text-slate-300" />
            <span className="text-xs text-slate-400">Image unavailable</span>
          </div>
        )}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Category Badge */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3">
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] sm:text-xs font-semibold text-blue-700 rounded-lg shadow-sm">
            <FolderOpen className="w-3 h-3" />
            {item.category}
          </span>
        </div>

        {/* Action buttons on hover */}
        <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white shadow-sm transition-all duration-200"
            aria-label="Edit project"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-700" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-50 shadow-sm transition-all duration-200"
            aria-label="Delete project"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
          </button>
        </div>

        {/* Bottom overlay content */}
        {item.link && (
          <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 delay-75">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700 rounded-lg shadow-sm hover:bg-white transition-all duration-200"
            >
              <ExternalLink className="w-3 h-3" />
              View Live
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 lg:p-5 flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-1.5 line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3">
          {item.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] sm:text-xs font-medium rounded-md ring-1 ring-inset ring-slate-200/80"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {item.tags?.length > 3 && (
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium px-1 py-0.5">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Mobile action buttons */}
        <div className="flex gap-2 mt-3 sm:hidden">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition-all active:scale-[0.98]"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg border border-red-100 hover:bg-red-100 transition-all active:scale-[0.98]"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
            Delete Project
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-700">"{title}"</span>?
            This action cannot be undone.
          </p>
          <div className="flex gap-2.5 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/25 transition-all active:scale-[0.98]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio");
      return saved ? JSON.parse(saved) : demoPortfolio;
    } catch {
      return demoPortfolio;
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    } catch (e) {
      console.error("Failed to save portfolio:", e);
    }
  }, [portfolio]);

  const filteredPortfolio = useMemo(() => {
    let items = portfolio;
    if (activeCategory !== "All") {
      items = items.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return items;
  }, [portfolio, activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = { All: portfolio.length };
    portfolio.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [portfolio]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newItem = {
        id: editingItem?.id || Date.now().toString(),
        ...formData,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        image: formData.image || "https://via.placeholder.com/400x300",
      };

      if (editingItem) {
        setPortfolio((prev) =>
          prev.map((p) => (p.id === editingItem.id ? newItem : p)),
        );
        toast.success("Project updated successfully!", {
          icon: "✨",
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            fontSize: "14px",
          },
        });
      } else {
        setPortfolio((prev) => [...prev, newItem]);
        toast.success("Project added to portfolio!", {
          icon: "🎉",
          style: {
            borderRadius: "12px",
            background: "#1e293b",
            color: "#fff",
            fontSize: "14px",
          },
        });
      }

      resetForm();
    },
    [editingItem, formData],
  );

  const handleEdit = useCallback((item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags?.join(", ") || "",
      link: item.link || "",
      image: item.image,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      setPortfolio((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success("Project deleted!", {
        icon: "🗑️",
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "14px",
        },
      });
      setDeleteTarget(null);
    }
  }, [deleteTarget]);

  const handleDeleteRequest = useCallback(
    (id) => {
      const item = portfolio.find((p) => p.id === id);
      setDeleteTarget(item);
    },
    [portfolio],
  );

  const resetForm = useCallback(() => {
    setShowForm(false);
    setEditingItem(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-5 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Portfolio
              </h1>
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-violet-500 flex-shrink-0" />
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-slate-500">
              Showcase your best work to attract clients.
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98] flex-shrink-0"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Add Project
          </button>
        </div>

        {/* Form Panel */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
            {/* Form Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 ${
                    editingItem
                      ? "bg-gradient-to-br from-amber-500 to-orange-500"
                      : "bg-gradient-to-br from-blue-500 to-blue-600"
                  } rounded-xl flex items-center justify-center shadow-sm`}
                >
                  {editingItem ? (
                    <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {editingItem ? "Edit Project" : "Add New Project"}
                  </h2>
                  <p className="text-xs text-slate-500 hidden sm:block">
                    {editingItem
                      ? "Update your project details"
                      : "Fill in the details to showcase your work"}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="p-2 rounded-xl hover:bg-slate-200/80 transition-colors"
                aria-label="Close form"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 lg:p-6">
              <div className="space-y-4 sm:space-y-5">
                <InputField
                  icon={Type}
                  label="Project Title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g., E-commerce Website Redesign"
                  required
                />

                <InputField
                  icon={FileText}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Describe your project, the challenges, and solutions..."
                  rows={3}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    icon={FolderOpen}
                    label="Category"
                    type="text"
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    placeholder="e.g., Web Design"
                    required
                  />
                  <InputField
                    icon={Tag}
                    label="Tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) => updateField("tags", e.target.value)}
                    placeholder="React, UI/UX, Responsive"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    icon={Link2}
                    label="Project Link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => updateField("link", e.target.value)}
                    placeholder="https://example.com"
                  />
                  <InputField
                    icon={ImageIcon}
                    label="Image URL"
                    type="url"
                    value={formData.image}
                    onChange={(e) => updateField("image", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="relative w-full h-32 sm:h-40 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-slate-600 rounded-md">
                        <Eye className="w-3 h-3" />
                        Preview
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 sm:flex-none px-5 py-2.5 sm:py-3 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all duration-200 active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-200 active:scale-[0.98]"
                >
                  {editingItem ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Update Project
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-3.5 sm:p-4 lg:p-5 space-y-3 sm:space-y-4">
            {/* Top row: Search + View toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 sm:py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 placeholder:text-slate-400"
                />
              </div>
              <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category filter tabs */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count = categoryCounts[cat] || 0;
                if (cat !== "All" && count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {cat}
                    <span
                      className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[10px] sm:text-xs font-bold rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200/80 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredPortfolio.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                : "space-y-3 sm:space-y-4"
            }
          >
            {filteredPortfolio.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center max-w-sm mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-5">
                <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                {searchQuery || activeCategory !== "All"
                  ? "No projects found"
                  : "Your portfolio is empty"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 sm:mb-6">
                {searchQuery || activeCategory !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "Add your first project to start showcasing your work to potential clients."}
              </p>
              {searchQuery || activeCategory !== "All" ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Project
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats Footer */}
        {portfolio.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 lg:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtNGgydjRoNHYyaC00djRoLTJ2LTR6bS0yMi0yaC0ydi00aDJ2LTRoMnY0aDR2MmgtNHY0aC0ydi00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Portfolio Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {portfolio.length} projects across{" "}
                    {
                      Object.keys(categoryCounts).filter((k) => k !== "All")
                        .length
                    }{" "}
                    categories
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-white">
                    {portfolio.length}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    Projects
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-white">
                    {
                      [...new Set(portfolio.flatMap((p) => p.tags || []))]
                        .length
                    }
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    Skills
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-lg sm:text-2xl font-bold text-white">
                    {
                      Object.keys(categoryCounts).filter((k) => k !== "All")
                        .length
                    }
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    Categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title={deleteTarget?.title}
      />
    </div>
  );
};

export default Portfolio;
