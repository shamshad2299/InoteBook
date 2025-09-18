// import React, { useContext, useEffect, useState } from "react";
// import NoteContext from "../NoteContext/Notes/NoteContext";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// function AddNotes({ showAlert }) {
//   const [note, setNote] = useState({ title: "", description: "", tags: "" });
//   const [isFocused, setIsFocused] = useState({ title: false, description: false, tags: false });

//   const navigate = useNavigate();
//   const { addNote, loading } = useContext(NoteContext);

//  const handleOnClick = (event) => {
//   event.preventDefault();

//   // Call your addNote function
//   addNote(note);

//   // SweetAlert2 success popup
//   Swal.fire({
//     icon: "success",
//     title: "Note Added",
//     text: "Your note has been added successfully!",
//     showConfirmButton: false,
//     timer: 2000, // auto-close in 2 seconds
//     timerProgressBar: true,
//   }).then(() => {
//     // Navigate only after alert closes
//     navigate("/home");
//   });

// };

//   const handleOnChange = (event) => {
//     setNote({ ...note, [event.target.name]: event.target.value });
//   };

//   const handleFocus = (field) => {
//     setIsFocused({ ...isFocused, [field]: true });
//   };

//   const handleBlur = (field) => {
//     setIsFocused({ ...isFocused, [field]: false });
//   };

//    useEffect(() => {
//       if (!localStorage.getItem("token")) {
//             showAlert("Please login first to access your notes", "danger");
//         navigate("/login");
//       } 
//     }, []);

//   return (
//     <div className="min-h-screen py-10 bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
//       <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-6">
//           <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
//             <i className="fas fa-plus-circle"></i> Create New Note
//           </h2>
//         </div>

//         {/* Form */}
//         <div className="p-8">
//           <form onSubmit={handleOnClick} className="space-y-6">
//             {/* Title */}
//             <div className="relative">
//               <input
//                 type="text"
//                 name="title"
//                 id="title"
//                 value={note.title}
//                 onChange={handleOnChange}
//                 onFocus={() => handleFocus("title")}
//                 onBlur={() => handleBlur("title")}
//                 minLength={5}
//                 required
//                 placeholder="Note Title"
//                 className={`peer w-full rounded-xl border-2 px-4 py-4 text-lg focus:outline-none transition-all ${
//                   isFocused.title
//                     ? "border-indigo-500 shadow-lg bg-indigo-50 placeholder-transparent"
//                     : "border-gray-300 bg-white placeholder-transparent"
//                 }`}
//               />
//               <label
//                 htmlFor="title"
//                 className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm"
//               >
//                 <i className="fas fa-heading mr-2"></i> Note Title
//               </label>
//             </div>

//             {/* Description */}
//             <div className="relative">
//               <textarea
//                 name="description"
//                 id="description"
//                 value={note.description}
//                 onChange={handleOnChange}
//                 onFocus={() => handleFocus("description")}
//                 onBlur={() => handleBlur("description")}
//                 minLength={5}
//                 required
//                 placeholder="Note Description"
//                 className={`peer w-full rounded-xl border-2 px-4 py-4 text-lg resize-none h-32 focus:outline-none transition-all ${
//                   isFocused.description
//                     ? "border-indigo-500 shadow-lg bg-indigo-50 placeholder-transparent"
//                     : "border-gray-300 bg-white placeholder-transparent"
//                 }`}
//               ></textarea>
//               <label
//                 htmlFor="description"
//                 className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm"
//               >
//                 <i className="fas fa-align-left mr-2"></i> Note Description
//               </label>
//             </div>

//             {/* Tags */}
//             <div className="relative">
//               <input
//                 type="text"
//                 name="tags"
//                 id="tags"
//                 value={note.tags}
//                 onChange={handleOnChange}
//                 onFocus={() => handleFocus("tags")}
//                 onBlur={() => handleBlur("tags")}
//                 placeholder="Tags (comma separated)"
//                 className={`peer w-full rounded-xl border-2 px-4 py-4 text-lg focus:outline-none transition-all ${
//                   isFocused.tags
//                     ? "border-indigo-500 shadow-lg bg-indigo-50 placeholder-transparent"
//                     : "border-gray-300 bg-white placeholder-transparent"
//                 }`}
//               />
//               <label
//                 htmlFor="tags"
//                 className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-indigo-600 peer-focus:text-sm"
//               >
//                 <i className="fas fa-tags mr-2"></i> Tags
//               </label>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={note.title.length < 5 || note.description.length < 5}
//               className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all cursor-pointer ${
//                 note.title.length < 5 || note.description.length < 5
//                   ? "bg-indigo-300 cursor-not-allowed"
//                   : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-lg"
//               } flex items-center justify-center gap-2`}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm mr-2"></span> Adding Note...
//                 </>
//               ) : (
//                 <>
//                   <i className="fas fa-plus-circle "></i> Add Note
//                 </>
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="bg-gray-100 text-center py-4 text-gray-500 text-sm">
//           <i className="fas fa-info-circle mr-1"></i> Title and description must be at least 5 characters long
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddNotes;
