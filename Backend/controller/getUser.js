
const User = require("../Models/user");

const getUserDetails = async (req ,res)=>{

  // ROUTE - 3 => Get logged in User Details using : POST "api/auth/getuser". Login required

try {
const userId = req.user.id;
  const newuser = await User.findById(userId).select("-password");
  res.send(newuser);
} catch (error) {
  
  console.log(error.message);
  res.status(500).json({ error: "Failed to create user due to internal server error . Please try again." });

}

}

module.exports = getUserDetails;