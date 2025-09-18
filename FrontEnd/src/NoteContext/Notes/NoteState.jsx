// import React, { Children, useState } from "react";
// import NoteContext from "./NoteContext";
// import { allAPI } from "../../API_Container/allApi";
// import { useEffect } from "react";

// const NoteState = ({ children }) => {
//   const host = "http://localhost:5000";

//   const [notes , setNotes] = useState([]);
//   const [user , setuser] = useState([])
 
//   // fetch all notes 

// //   const getAllNotes = async ()=>{
// //     const url = `${host}/api/notes/fetchallNotes`;

// //     const response = await fetch(url ,{
          
// //       method : 'GET',
// //     headers : {
// //       "Content-Type": "application/json",
// //       'auth-token' :localStorage.getItem('token'),
// //     },
// //     });
// //     const json = await response.json();
// //     //console.log(json);
// //     setNotes(json);
// //   }
// //    //--------------------------------------------------Add a Note--------------------------------------------------                   
// //    const addNote =async (notes)=>{
    
// //     const note = {
// //       _id: notes._id,
// //       user: notes.user,
// //       title : notes.title,
// //       description :notes.description,
// //       tags : notes.tags,
// //     }

// //     const url = `${host}/api/notes/addnote`;

// //     const response = await fetch(url ,{
          
// //       method : 'POST',
// //     headers : {
// //       "Content-Type": "application/json",
// //       'auth-token' : localStorage.getItem('token'),
// //     },
    
// //     body :JSON.stringify(notes)
// //     });
// //     //const json = await response.json();
   

// //    setNotes(notes.concat(note));
// //   // API => Call

// //    }
// // //-----------------------------------------------------Delete a Note-----------------------------------------------
  
// //    const deleteNote = async(id)=>{
 
// //     // api call method : DELETE

// //     const url = `${host}/api/notes/delete/${id}`;

// //     const response = await fetch(url ,{
          
// //       method : 'DELETE',
// //     headers : {
// //       "Content-Type": "application/json",
// //       'auth-token' : localStorage.getItem('token'),
// //     },
    
// //     });
// //     const json = await response.json();
   

// //     const newNote = notes.filter((note)=>note._id !== id);
// //     setNotes(newNote);
// //    }
// //     //-----------------------------------------------------upDate  Note---------------------------------------------
// //    const updateNote =async (id ,title, description,tags )=>{
// //  //console.log(id , title);
// //  //API calls 

// //  const url = `${host}/api/notes/update/${id}`;
// //  const response = await fetch(url ,{    
// //    method : 'PUT',
// //  headers : {
// //    "Content-Type": "application/json",
// //    'auth-token' : localStorage.getItem('token'),
// //  },
// //  body :JSON.stringify({title,description ,tags})
// //  });
// //  const json = await response.json();

// //  let newNotes  =  JSON.parse(JSON.stringify(notes)); // making second copy of notes
// // //logic for editing our existing note

// //      for(let index= 0 ; index< notes.length ; index++){
// //        const element = notes[index];    
// //         if(element._id === id){
// //           newNotes[index].title = title;
// //           newNotes[index].description = description;
// //           newNotes[index].tags = tags;
// //           break;
// //         }   
     
// //      }
// //      setNotes(newNotes);
// //    }

//    const fetcUser = async()=>{

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${allAPI.fetchUser.url}`, {
//         method : "GET",
//         headers : {
//         "Content-Type": "application/json",
//         "auth-token": token
//         }
//       });
//       const data = await res.json();
      
      
//     } catch (error) {
//       console.log(error)
//     }
//    }

//    useEffect(()=>{
//     fetcUser();
//    },[])

//   //  const updateNote =async (updateNote)=>{
//   //   //console.log(id , title);
//   //   //API calls 
   
//   //   const url = `${host}/api/notes/update/${updateNote.id}`;
//   //   const response = await fetch(url ,{    
//   //     method : 'PUT',
//   //   headers : {
//   //     "Content-Type": "application/json",
//   //     'auth-token' : authToken,
//   //   },
//   //   body :JSON.stringify(updateNote)
//   //   });
//   //   const json = await response.json();
//   //   console.log(json)
//   //       for(let index= 0 ; index< notes.length ; index++){
//   //         const element = notes[index];    
//   //          if(element._id === updateNote.id){
//   //            element.title = updateNote.title;
//   //            element.description = updateNote.description;
//   //            element.tags =  updateNote.tags;
//   //          }   
//   //       }
//   //     }

//   return (
//     <NoteContext.Provider
//       value={{}}
//     >
//       {children}
//     </NoteContext.Provider>
//   );
// };
// export default NoteState;