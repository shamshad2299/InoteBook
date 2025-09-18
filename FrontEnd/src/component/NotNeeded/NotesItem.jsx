// import React, { useContext } from 'react'
// import NoteContext from "../NoteContext/Notes/NoteContext";
// import { FaEdit } from "react-icons/fa";
// import { RiDeleteBinFill } from "react-icons/ri";
// import Swal from 'sweetalert2';

// function NotesItem({notes, updateMyNote, showAlert , showUpdate , setShowUpdate}) {
//   const myContext = useContext(NoteContext);


//   const {deleteNote} = myContext;


//  const handleOnDelete = () => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "This action cannot be undone!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",   // red button
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//     cancelButtonText: "Cancel",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Perform delete
//       deleteNote(notes._id);

//       // Success alert
//       Swal.fire("Deleted!", "Your item has been deleted.", "success");

//       // Also trigger your custom alert
//       showAlert("Item deleted successfully", "success");
//     }
//   });
// };


//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-800 mb-3">{notes.title}</h3>
//         <p className="text-gray-600 mb-5">{notes.description}</p>
//         <div className="flex flex-wrap gap-3">
//           <button
//              onClick={() => {
//              updateMyNote(notes);
//             setShowUpdate(!showUpdate);
//               }} 
//             className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:from-blue-600 hover:to-indigo-700 hover:shadow-md cursor-pointer"
//           >
//             Edit Note <FaEdit className="text-sm" />
//           </button>
//           <button
//             onClick={handleOnDelete}
//             className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:from-red-600 hover:to-orange-600 hover:shadow-md cursor-pointer"
//           >
//             Delete Note <RiDeleteBinFill className="text-sm" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NotesItem;