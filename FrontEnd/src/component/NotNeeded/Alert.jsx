// import React, { useEffect } from 'react';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

// function Alert({ alert }) {
//   useEffect(() => {
//     if (alert) {
//       let icon;
//       switch (alert.type) {
//         case 'success':
//           icon = 'success';
//           break;
//         case 'danger':
//           icon = 'error';
//           break;
//         case 'warning':
//           icon = 'warning';
//           break;
//         case 'info':
//           icon = 'info';
//           break;
//         default:
//           icon = 'question';
//       }

//       Swal.fire({
//         icon: icon,
//         title: alert.type.toUpperCase(),
//         text: alert.msg,
//         timer: 5000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//         toast: true,
//         position: 'top-end',
//         background: '#1e293b', // tailwind slate-800 look
//         color: '#fff'
//       });
//     }
//   }, [alert]);

//   return null; // no UI needed, Swal handles it
// }

// export default Alert;
