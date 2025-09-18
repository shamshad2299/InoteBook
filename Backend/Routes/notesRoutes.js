const express = require("express")
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNoteByUserId,
} = require("../controller/Notes/NoteController.js");
const { noteValidator } = require("../validator/noteValidator.js");
const fetchUser = require("../MiddleWare/fetchUser.js")

const router = express.Router();

router.post("/",fetchUser, noteValidator, createNote);
router.get("/usernote" , fetchUser , getNoteByUserId);
router.get("/",fetchUser, getNotes);
router.get("/:id",fetchUser, getNoteById);
router.put("/:id",fetchUser, noteValidator, updateNote);
router.delete("/:id",fetchUser, deleteNote);


module.exports =  router;
