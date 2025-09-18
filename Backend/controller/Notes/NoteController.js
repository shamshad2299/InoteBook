const Note = require("../../Models/Note");
const { validationResult } = require("express-validator");

// Create Note
exports.createNote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const noteData = {
      ...req.body,
        userId : req.user.id
    }
    const note = new Note(noteData);
    await note.save();
    res.status(201).json({ success: true, 
      data:  note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get Note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, data: note });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, data: note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getNoteByUserId = async (req, res) => {
  try {
  
     const note = await Note.find({ userId: req.user.id }).populate("userId");

    if (!note) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      note,
    });

   } catch (error) {
    console.error("Error in getNoteByUserId:", error);

    // Handle known errors (e.g., invalid ObjectId)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid User ID format",
      });
   }

    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};
