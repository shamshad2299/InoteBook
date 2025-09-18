const express = require("express");
var fetchUser = require("../MiddleWare/fetchUser");
const userSignUp = require("../controller/signup");
const {userSignIn , verify } = require("../controller/signin");
const getUserDetails = require("../controller/getUser");

const router = express.Router();

router.post("/createuser" , userSignUp)
router.post( "/login", userSignIn)
router.post("/getuser",fetchUser, getUserDetails)
router.get("/verify",fetchUser , verify)

module.exports = router;