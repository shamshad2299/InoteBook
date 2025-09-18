const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');

exports.userSignIn =async(req, res) =>{
  const JWT_SECRET =process.env.JWT_SECRET;

        let success = false;
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {email , password}  =req.body;
      try {
        let user = await User.findOne({email });
        if(!user){
          return res.status(400).json({error : "Please Enter Correct Details"});
  
        }
        const passwordCompare = await bcrypt.compare(password , user.password);
        if(!passwordCompare){
          success = false;
          return  res.status(400).json({success,error : "Please Enter Correct password"});
        }
        
        // payload value of our newly created user
  
          const data = {
            user : {
              id :user.id
            }
          }
   
       const authToken = jwt.sign(data,JWT_SECRET);
       success = true;
       res.json({success,authToken});
      } catch (error) {
  
        console.log(error.message);
        res.status(500).json({ error: "Failed to create user due to internal server error . Please try again." });
        
      }
}


;


exports.verify = (req , res)=>{
  res.status(200).json({
    success : true ,
    user : req?.user,
  });
}
