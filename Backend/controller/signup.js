const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');

const userSignUp = async (req, res)=>{

  const JWT_SECRET =process.env.JWT_SECRET;

//ROUTE -1 => Create a user using  :POST "/api/auth/createuser" doesn't require Auth

    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Email already exists. Please choose another email." });
      }

      // destructuring name ,email and password from req.body

    const {name , email , password} = req.body;
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password ,salt);

      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const data = {
        user : {
          id : newUser.id
        }
      }
    const authToken = jwt.sign(data,JWT_SECRET);

    success = true;
      res.json({success, authToken });
    } catch (error) {
      success = false;
      console.log(error.message);
      res.status(500).json({success, error: "Failed to create user. Please try again." });
    }
}

module.exports = userSignUp;