// import React, { useContext, useEffect, useRef, useState } from "react";
// import NoteContext from "../NoteContext/Notes/NoteContext";
// import NotesItem from "./NotesItem";
// import Empty from "./Empty";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function MyNotes({ showAlert }) {
//   const navigate = useNavigate();
//   const [showUpdate, setShowUpdate] = useState(false);
//   const myNotes = useContext(NoteContext);
//   const { notes, getAllNotes, updateNote } = myNotes;
//   const ref = useRef(null);
//   const refClose = useRef(null);
//   const [item , setItem] = useState(4);
//   const [note, setNote] = useState({
//     id: "",
//     etitle: "",
//     edescription: "",
//     etags: "",
//   });


//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredNotes, setFilteredNotes] = useState([]);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       getAllNotes();
//     } else {
//       showAlert("Please login first to access your notes", "danger");
//       navigate("/login");
//     }
//   }, []);

//   useEffect(() => {
//     setFilteredNotes(
//       notes.filter(
//         (note) =>
//           note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           note.tags.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, notes]);

//   const updateMyNote = (currentNotes) => {
    
//     setNote({
//       id: currentNotes._id,
//       etitle: currentNotes.title,
//       edescription: currentNotes.description,
//       etags: currentNotes.tags,
//     });
//   };

// const handleOnClick = () => {
//   Swal.fire({
//     title: "Do you want to edit the note?",
//     showCancelButton: true,
//     confirmButtonText: "Save",
//     cancelButtonText: "Cancel",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Update the note
//       updateNote(note.id, note.etitle, note.edescription, note.etags);

//       // Show success alert
//       Swal.fire("Saved!", "Your note has been updated.", "success");
//       setShowUpdate(false);
//     } else if (result.dismiss === Swal.DismissReason.cancel) {
//       // Optional: feedback on cancel
//       Swal.fire("Cancelled", "Your note was not changed", "info");
//     }
//   });
// };


//   const handleOnChange = (event) => {
//     setNote({ ...note, [event.target.name]: event.target.value });
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//   };

//   return (
//     <>
//       <div className="min-h-screen p-6 md:p-8 relative bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC1Go0sDHZWp9Hl9GZnTOIP2bsuJvTtlQcMbISj3L-84u3fw-eepkDTTM&s')] bg-cover bg-center font-sans ">
//         {/* Background shapes */}
//         <div className="absolute inset-0 overflow-hidden z-0">
//           <div className="absolute w-72 h-72 rounded-full bg-white bg-opacity-30 -top-24 -right-24"></div>
//           <div className="absolute w-48 h-48 rounded-full bg-white bg-opacity-30 -bottom-12 -left-12"></div>
//           <div className="absolute w-36 h-36 rounded-full bg-white bg-opacity-30 top-1/2 left-3/4"></div>
//         </div>

//         {/* Header */}
//         <div className="text-center mb-8 relative z-10">
//           <h1 className="font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
//             My Notes
//           </h1>
//           <p className="text-gray-500 text-lg">
//             Manage and organize your thoughts
//           </p>
//         </div>

//         {/* Search container */}
//         <div className="max-w-4xl mx-auto mb-8 relative z-10">
//           <div className="relative flex items-center mb-4">
//             <span className="absolute left-4 z-10 text-gray-400">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Search notes by title, content or tags..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full py-3 pl-12 pr-12 border-none rounded-xl bg-white shadow-md text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
//             />
//             {searchTerm && (
//               <button
//                 className="absolute right-4 bg-transparent border-none text-gray-400 cursor-pointer z-10"
//                 onClick={clearSearch}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L7.293 8 2.146 2.854Z" />
//                 </svg>
//               </button>
//             )}
//           </div>
//           <div className="text-right text-gray-500 text-sm">
//             {filteredNotes.length}{" "}
//             {filteredNotes.length === 1 ? "note" : "notes"}
//           </div>
//         </div>

//         {/* Notes grid */}
//          <div className=" gap-6  mx-auto relative z-10 w-full  " >
//           {filteredNotes.length === 0 ? (
//             <div>
//               <Empty searchTerm={searchTerm} />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  mx-auto relative z-10 w-full ">
//             {  filteredNotes.map((note) => (
//               <NotesItem
//                 setShowUpdate={setShowUpdate}
//                 showUpdate={showUpdate}
//                 key={note._id}
//                 notes={note}
//                 updateMyNote={updateMyNote}
//                 showAlert={showAlert}
//               />
//             ))}
//             </div>
//           )}
//         </div>

//         {/* Edit Note Modal */}
//         {showUpdate && (
//           <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
//               {/* Modal Header */}
//               <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                 <h3 className="flex items-center text-gray-800 font-semibold text-xl">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     fill="currentColor"
//                     viewBox="0 0 16 16"
//                     className="mr-2"
//                   >
//                     <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
//                   </svg>
//                   Edit Note
//                 </h3>
//                 <button
//                   onClick={() => setShowUpdate(false)}
//                   className="text-3xl hover:text-gray-700  cursor-pointer bg-black rounded-full p-2 text-white"
//                 >
//                   &times;
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="p-6">
//                 <form>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="etitle"
//                       className="font-medium text-gray-700 mb-2 block"
//                     >
//                       Title
//                     </label>
//                     <input
//                       onChange={handleOnChange}
//                       value={note.etitle}
//                       type="text"
//                       className="w-full border border-gray-200 rounded-lg py-3 px-4 text-base transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//                       id="etitle"
//                       name="etitle"
//                       placeholder="Enter title"
//                     />
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="edescription"
//                       className="font-medium text-gray-700 mb-2 block"
//                     >
//                       Description
//                     </label>
//                     <textarea
//                       onChange={handleOnChange}
//                       value={note.edescription}
//                       className="w-full border border-gray-200 rounded-lg py-3 px-4 text-base transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//                       id="edescription"
//                       name="edescription"
//                       rows="4"
//                       placeholder="Enter description"
//                     ></textarea>
//                   </div>
//                   <div className="mb-5">
//                     <label
//                       htmlFor="etags"
//                       className="font-medium text-gray-700 mb-2 block"
//                     >
//                       Tags
//                     </label>
//                     <input
//                       onChange={handleOnChange}
//                       value={note.etags}
//                       type="text"
//                       className="w-full border border-gray-200 rounded-lg py-3 px-4 text-base transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//                       id="etags"
//                       name="etags"
//                       placeholder="Enter tags (comma separated)"
//                     />
//                   </div>
//                 </form>
//               </div>

//               {/* Modal Footer */}
//               <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
//                 <button
//                   onClick={() => setShowUpdate(false)}
//                   className="border border-gray-200 rounded-lg py-2 px-5 font-medium transition-all duration-300 hover:bg-gray-50 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                 onClick={() => (handleOnClick())}


//                   disabled={
//                     note.etitle.length < 5 || note.edescription.length < 5
//                   }
//                   className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-lg py-2 px-5 font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   Update Note
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }