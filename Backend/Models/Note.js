const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
 userId : {
 type : mongoose.Schema.Types.ObjectId,
 ref : 'user',
  },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      maxlength: [160, "Excerpt cannot exceed 160 characters"],
    },
    category: {
      type: String,
      default: "General",
      enum :["all", "Development", "Design", "Personal", "Work", "Ideas"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featuredImage: {
      type: String, // URL
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
        },
        message: "Invalid image URL",
      },
    },
    author: {
      type: String ,
      bio: String,
      profileUrl: String,
    },
    meta: {
      title: { type: String, maxlength: 60 },
      description: { type: String, maxlength: 160 },
      canonicalUrl: String,
      ogImage: String,
    },
    seo: {
      robots: { type: Boolean, default: true },
      schemaType: { type: String, default: "Article" },
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
 
