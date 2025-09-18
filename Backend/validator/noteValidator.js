const { body } = require("express-validator") 

exports.noteValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("slug").notEmpty().withMessage("Slug is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("excerpt")
    .isLength({ max: 160 })
    .withMessage("Excerpt cannot exceed 160 characters"),
  body("meta.title")
    .optional()
    .isLength({ max: 60 })
    .withMessage("Meta title must be <= 60 characters"),
  body("meta.description")
    .optional()
    .isLength({ max: 160 })
    .withMessage("Meta description must be <= 160 characters"),
];
