// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Empty() {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/addnotes");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 w-full  bg-black  ">
//       <div className="w-full flex items-center justify-center">
//         <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden p-6 md:p-8">
//           <div className="text-center py-8 md:py-12">
//             {/* Illustration */}
//             <div className="relative mb-8">
//               <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
//                 <i className="fas fa-sticky-note text-blue-500 text-5xl md:text-6xl"></i>
//               </div>
//               <div className="absolute top-0 right-0  mr-6 md:mr-8">
//                 <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-100 rounded-full flex items-center justify-center">
//                   <i className="fas fa-search text-yellow-500"></i>
//                 </div>
//               </div>
//             </div>

//             <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
//               No Notes Yet
//             </h2>

//             <p className="text-gray-600 lg:text-sm md:text-xl mb-8 max-w-2xl mx-auto">
//               It looks like you haven't created any notes yet. Start organizing
//               your thoughts and ideas by creating your first note!
//             </p>

//             <button
//               onClick={handleClick}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out text-lg"
//             >
//               <i className="fas fa-plus-circle mr-2"></i>
//               Create Your First Note
//             </button>

//             <div className="mt-12 pt-8 border-t border-gray-200">
//               <p className="text-gray-500 text-sm mb-4">
//                 Get started with these features:
//               </p>
//               <div className="flex flex-wrap justify-center gap-3">
//                 <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl text-sm">
//                   <i className="fas fa-check-circle text-green-500 mr-1"></i>{" "}
//                   Easy organization
//                 </span>
//                 <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl text-sm">
//                   <i className="fas fa-check-circle text-green-500 mr-1"></i>{" "}
//                   Quick access
//                 </span>
//                 <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl text-sm">
//                   <i className="fas fa-check-circle text-green-500 mr-1"></i>{" "}
//                   Secure storage
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Empty;
