const notes = require("../../Models/Notes");

const updateNote = async(req , res) =>{

  try {
    const userId = req?.user?.id;
    const note = await notes.find({userId})
    const {title , description , tags} = req?.body;
    const payload = {
      ...(title && {title : title}),
      ...(description && { description : description}),
      ...(tags  && {tags: tags}),
    }

    const updatedNote = await notes.findByIdAndUpdate({}) 
    
    
  } catch (error) {

    res.json({
      message : error.message || error,
      success : false, 
      error : true,
    })
    
  }

}

module.exports = updateNote;