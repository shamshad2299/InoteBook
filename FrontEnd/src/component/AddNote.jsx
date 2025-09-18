import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Bell,
  Sun,
  Moon,
  Home,
  BookOpen,
  Star,
  Trash2,
  Settings,
  LogOut,
  Edit3,
  MoreVertical,
  Image,
  Tag,
  Eye,
  Calendar,
  User,
  X,
  Menu,
  Grid,
  List,
  Filter,
  Download,
  Share2,
  Lock,
} from "lucide-react";
import { allAPI } from "../API_Container/allApi";
import { errorCatcher } from "../ErrorCatcher/allError";
import Swal from "sweetalert2";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function PremiumNotesDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate()
  const sampleData = [
    {
      _id: 1,
      title: "Web Development Best Practices",
      slug: "web-dev-best-practices",
      content: "A comprehensive guide to modern web development techniques...",
      excerpt: "Learn the latest web development best practices for 2023",
      category: "Development",
      tags: ["webdev", "javascript", "react"],
      featuredImage:
        "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metaTitle: "Web Development Best Practices | Dev Notes",
      metaDescription:
        "Learn the latest web development best practices for 2023 with comprehensive examples and code snippets.",
      createdAt: "2023-10-15",
      updatedAt: "2023-10-16",
      readTime: "5 min read",
      isFeatured: true,
      isPrivate: false,
    },
    {
      _id: 2,
      title: "UI/UX Design Principles",
      slug: "ui-ux-design-principles",
      content: "Understanding the core principles of effective UI/UX design...",
      excerpt: "Key principles for creating intuitive user interfaces",
      category: "Design",
      tags: ["design", "ui", "ux"],
      featuredImage:
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metaTitle: "UI/UX Design Principles | Design Notes",
      metaDescription:
        "Explore the fundamental principles of UI/UX design that create exceptional user experiences.",
      createdAt: "2023-10-10",
      updatedAt: "2023-10-12",
      readTime: "8 min read",
      isFeatured: true,
      isPrivate: true,
    },
    {
      _id: 3,
      title: "Advanced React Patterns",
      slug: "advanced-react-patterns",
      content: "Deep dive into advanced React patterns and techniques...",
      excerpt: "Master complex React patterns for better applications",
      category: "Development",
      tags: ["react", "javascript", "patterns"],
      featuredImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metaTitle: "Advanced React Patterns | React Notes",
      metaDescription:
        "Learn advanced React patterns to build more maintainable and efficient applications.",
      createdAt: "2023-10-05",
      updatedAt: "2023-10-08",
      readTime: "12 min read",
      isFeatured: false,
      isPrivate: false,
    },
  ];
  const [notes, setNotes] = useState(sampleData);
  const [reload, setReload] = useState(false);

    useEffect(() => {
      if (!localStorage.getItem("token")) {

       Swal.fire({
        title :"please Login to open it",
        icon:"warning",
       
       })
        navigate("/login");
      }
    }, []);

  //fetch allNotes with coressponing User
  const FetcUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${allAPI.getNoteByUser.url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const data = await response.json();

      if (!response.ok) throw { response: { status: response.status, data } };
      if (data.success) {
        console.log(data);
        setNotes((prevNotes) => {
          const merged = [...prevNotes, ...data.note];
          const unique = merged.filter(
            (note, index, self) =>
              index === self.findIndex((n) => n._id === note._id)
          );
          return unique;
        });
      }
    } catch (error) {
      console.error("FetchUser Error:", error);
    }
  };

  useEffect(() => {
    FetcUser();
  }, [reload]);
  const categories = [
    "all",
    "Development",
    "Design",
    "Personal",
    "Work",
    "Ideas",
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleViewMode = () =>
    setViewMode(viewMode === "grid" ? "list" : "grid");

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note?.title.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      note?.content.toLowerCase()?.includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 p-4 ${
          darkMode
            ? "bg-black/30 backdrop-blur-xl"
            : "bg-white/70 backdrop-blur-lg"
        } shadow-2xl rounded-r-2xl`}
      >
        <div className="flex items-center justify-between mb-10 mt-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            NoteSphere
          </h1>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: BookOpen, label: "All Notes" },
            { icon: Star, label: "Featured" },
            { icon: Trash2, label: "Trash" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ x: 5 }}
              className={`flex items-center cursor-pointer w-full p-3 rounded-xl ${
                index === 0
                  ? darkMode
                    ? "bg-indigo-600"
                    : "bg-indigo-100 text-indigo-700"
                  : darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-black/5"
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 cursor-pointer">
            Categories
          </h2>
          <div className="space-y-2 ">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 5 }}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center  cursor-pointer w-full p-2 rounded-xl  ${
                  activeCategory === category
                    ? darkMode
                      ? "bg-purple-600"
                      : "bg-purple-100 text-purple-700"
                    : darkMode
                    ? "hover:bg-white/5"
                    : "hover:bg-black/5"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current mr-3 opacity-70 cursor-pointer"></div>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          {/* <button
            className={`flex items-center w-full p-3 rounded-xl ${
              darkMode ? "hover:bg-white/5" : "hover:bg-black/5"
            }`}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button> */}
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`${
          sidebarOpen ? "md:pl-64" : "pl-0"
        } transition-all duration-300`}
      >
        <div className="p-6">
          {/* Top Navigation */}
          <div
            className={`flex items-center justify-between p-4 rounded-2xl ${
              darkMode
                ? "bg-black/30 backdrop-blur-md"
                : "bg-white/50 backdrop-blur-md"
            } shadow-lg mb-8`}
          >
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 mr-4 rounded-xl hover:bg-white/10"
              >
                <Menu size={20} />
              </button>
              <div
                className={`relative ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl overflow-hidden`}
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-3 sm:w-64 w-45 focus:outline-none ${
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 ">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleViewMode}
                className={`p-2 rounded-xl hidden sm:block ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                }`}
              >
                {viewMode === "grid" ? <List size={20} /> : <Grid size={20} />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-xl hidden sm:block ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                }`}
              >
                <Filter size={20} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-xl hidden sm:block ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                }`}
              >
                <Bell size={20} />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl  ${
                  darkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <div
                className={`w-10 h-10  hidden sm:block rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 cursor-pointer`}
              ></div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Notes",
                value: "127",
                icon: BookOpen,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Featured",
                value: "12",
                icon: Star,
                color: "from-amber-500 to-orange-500",
              },
              {
                title: "Private",
                value: "23",
                icon: Lock,
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Categories",
                value: "8",
                icon: Tag,
                color: "from-green-500 to-teal-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-80">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon size={24} className="opacity-80" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notes Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Notes</h2>
            <p className="text-sm opacity-70">{filteredNotes.length} notes</p>
          </div>

          {/* Notes Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setActiveNote(note);
                    setShowNewNoteModal(true);
                  }}
                  className={`rounded-2xl overflow-hidden cursor-pointer ${
                    darkMode
                      ? "bg-black/30 backdrop-blur-md"
                      : "bg-white/70 backdrop-blur-md"
                  } shadow-lg`}
                >
                  {note.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={note.featuredImage}
                        alt={note.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{note.title}</h3>
                      {note.isPrivate && (
                        <Lock size={16} className="flex-shrink-0" />
                      )}
                    </div>

                    <p
                      className={`text-sm mb-4 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {note.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-indigo-900/50 text-indigo-200"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          +{note.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div
                      className={`flex justify-between items-center text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {new Date(note.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User size={12} className="mr-1" />
                        {note.readTime}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredNotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No notes found</h3>
              <p className="opacity-70">
                Try adjusting your search or create a new note
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setActiveNote(null);
          setShowNewNoteModal(true);
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white z-40"
      >
        <Plus size={24} />
      </motion.button>

      {/* New Note Modal */}
      <AnimatePresence>
        {showNewNoteModal && (
          <NoteEditorModal
            note={activeNote}
            onClose={() => {
              setShowNewNoteModal(false);
              setActiveNote(null);
            }}
            fuser={() => FetcUser()}
            darkMode={darkMode}
            reload={reload}
            setReload={setReload}
          />
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-72 h-72 rounded-full ${
            darkMode ? "bg-purple-900/20" : "bg-purple-300/30"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-96 h-96 rounded-full ${
            darkMode ? "bg-indigo-900/20" : "bg-indigo-300/30"
          } blur-3xl`}
        ></div>
      </div>
    </div>
  );
}

function NoteEditorModal({ note, onClose, darkMode, reload, setReload }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    note || {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      category: "General",
      tags: [],
      featuredImage: "",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      robots: true,
      isPrivate: false,
    }
  );
  const [currentTag, setCurrentTag] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] });
      setCurrentTag("");
    }
  };

  // // handle input change for tags
  // const handleTagsChange = (e) => {
  //   const input = e.target.value;
  //   const tagArray = input
  //     .split(",")
  //     .map((tag) => tag.trim())
  //     .filter(Boolean);
  //   setFormData({ ...formData, tags: tagArray });
  // };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Get token from localStorage (or wherever you saved it at login)
  //   const token = localStorage.getItem("token");

  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${allAPI.addNote.url}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": token
  //       },
  //       body: JSON.stringify(formData), // 👈 no need to wrap again {formData}
  //     });

  //     const res = await response.json();
  //     console.log(res);
  //     if(res.success){
  //       setLoading(false);
  //       Swal.fire({
  //         title : "Note added successfully",
  //         icon : "success",
  //         timer : "2000"
  //       })
  //     }
  //     else {
  //        Swal.fire({
  //         title : "Note added error ",
  //         icon : "error",
  //         timer : "2000"
  //       })
  //     }

  //     onClose();
  //   } catch (error) {
  //     errorCatcher(error);
  //     console.error("Error adding note:", error);
  //   } finally{
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      // Determine if we're creating or updating
      const isUpdate = Boolean(note && note._id);
      const url = isUpdate
        ? `${allAPI.updateNote.url}/${note._id}`
        : allAPI.addNote.url;

      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      console.log(res);

      if (res.success) {
        setLoading(false);
        Swal.fire({
          title: isUpdate
            ? "Note updated successfully"
            : "Note added successfully",
          icon: "success",
          timer: 2000,
        }).then(() => {
          onClose();
          setReload(true);
        });
      } else {
        if (res.errors && Array.isArray(res.errors)) {
          // Option 1: Show all in an alert
          Swal.fire({
            title: "Validation Error",
            html: res.errors.map((err) => `<p>${err.msg}</p>`).join(""),
            icon: "error",
          });

        }
      }
    } catch (error) {
      errorCatcher(error);
      console.error("Error with note operation:", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {note ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none`}
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Note title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none`}
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="note-slug"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                rows="6"
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none`}
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Write your note content here..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                rows="2"
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none`}
                value={formData.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                placeholder="Short description of your note"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none`}
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="General">General</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Ideas">Ideas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none mb-2`}
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="Type and press Enter to add tags"
              />
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-600 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 hover:text-red-300"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                className={`w-full p-3 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 focus:ring-2 focus:ring-purple-500"
                    : "bg-gray-100 focus:ring-2 focus:ring-indigo-500"
                } focus:outline-none`}
                value={formData.featuredImage}
                onChange={(e) => handleChange("featuredImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {formData.featuredImage && (
                <div className="mt-3">
                  <img
                    src={formData.featuredImage}
                    alt="Preview"
                    className="rounded-xl w-full max-h-48 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="robots"
                  checked={formData.robots}
                  onChange={(e) => handleChange("robots", e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="robots">Allow search engines to index</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="private"
                  checked={formData.isPrivate}
                  onChange={(e) => handleChange("isPrivate", e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="private">Private note</label>
              </div>
            </div>
          </div>

          {/* SEO & Preview Section */}
          <div className="space-y-6">
            <div
              className={`p-4 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Eye size={18} /> SEO Preview
              </h3>

              <div
                className={`p-3 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
              >
                <p className="text-blue-600 text-lg font-medium mb-1">
                  {formData.metaTitle || "Note Title"}
                </p>
                <p className="text-green-600 text-sm mb-1">
                  https://yoursite.com/notes/{formData.slug || "note-slug"}
                </p>
                <p className="text-gray-600 text-sm">
                  {formData.metaDescription ||
                    "Note description will appear here..."}
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Settings size={18} /> SEO Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    className={`w-full p-3 rounded-xl ${
                      darkMode
                        ? "bg-gray-700 focus:ring-2 focus:ring-purple-500"
                        : "bg-white focus:ring-2 focus:ring-indigo-500"
                    } focus:outline-none`}
                    value={formData.metaTitle}
                    onChange={(e) => handleChange("metaTitle", e.target.value)}
                    placeholder="SEO meta title"
                  />
                  <p className="text-xs mt-1 opacity-70">
                    {formData?.metaTitle?.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meta Description
                  </label>
                  <textarea
                    rows="3"
                    className={`w-full p-3 rounded-xl ${
                      darkMode
                        ? "bg-gray-700 focus:ring-2 focus:ring-purple-500"
                        : "bg-white focus:ring-2 focus:ring-indigo-500"
                    } focus:outline-none`}
                    value={formData.metaDescription}
                    onChange={(e) =>
                      handleChange("metaDescription", e.target.value)
                    }
                    placeholder="SEO meta description"
                  ></textarea>
                  <p className="text-xs mt-1 opacity-70">
                    {formData?.metaDescription?.length}/160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    className={`w-full p-3 rounded-xl ${
                      darkMode
                        ? "bg-gray-700 focus:ring-2 focus:ring-purple-500"
                        : "bg-white focus:ring-2 focus:ring-indigo-500"
                    } focus:outline-none`}
                    value={formData.canonicalUrl}
                    onChange={(e) =>
                      handleChange("canonicalUrl", e.target.value)
                    }
                    placeholder="https://example.com/canonical-url"
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <h3 className="font-semibold mb-3">Note Preview</h3>

              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } space-y-3`}
              >
                {formData.featuredImage && (
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                )}

                <h4 className="font-bold text-lg">
                  {formData.title || "Note Title"}
                </h4>
                <p className="text-sm opacity-80">
                  {formData.excerpt || "Note excerpt will appear here..."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-600 rounded-full text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                  {formData.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600 rounded-full text-xs text-white">
                      +{formData.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs opacity-70">
                  <span>{formData.category || "General"}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-xl ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleSubmit}
          >
            {note ? "Update Note" : "Create Note"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
