const notes = require("../../Models/Notes");

const getAllNotes = async(req , res)=>{
  try {
    const user = req?.user?.id;
    if(!user){
      throw new Error("user not found !");
    }
    const allNotes  = await notes.find({user : user});
    res.json(allNotes);
    
  } catch (error) {
    res.json({
      message : error.message || error,
      success : false, 
      error : true,
    })
  }
}
module.exports = getAllNotes;