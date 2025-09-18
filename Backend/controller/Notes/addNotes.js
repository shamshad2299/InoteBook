const Notes = require("../../Models/Notes");

const addNotes = async(req , res)=>{
  try {

    const user = req?.user?.id;
    const {title , description , tags} = req?.body;

    if(!title) throw new Error("please Enter Title");
    if(!description) throw new Error("please Enter description");
    if(!tags) throw new Error("please Enter tags");
    
    const note = new Notes({
      user,
      title ,
      description ,
      tags,
    });

    const finalNote = await note.save()

    res.json(finalNote);
  } catch (error) {
    res.json({
      message : error.message || error,
      success : false, 
      error : true,
    })
    
  }
}
module.exports = addNotes