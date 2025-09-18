import Swal from "sweetalert2";

/**
 * Centralized error handler for API & runtime errors
 * @param {Object} error - Error object (from Axios/fetch/runtime)
 */
export const errorCatcher = (error) => {
  let errorTitle = "Unexpected Error";
  let errorMsg = "Something went wrong. Please try again later.";

  if (error?.response) {
    // Backend responded with a non-2xx status
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        errorTitle = "Bad Request";
        errorMsg = data.message || "Invalid request data.";
        break;
      case 401:
        errorTitle = "Unauthorized";
        errorMsg = data.message || "Please log in to continue.";
        break;
      case 403:
        errorTitle = "Forbidden";
        errorMsg = data.message || "You don't have permission for this action.";
        break;
      case 404:
        errorTitle = "Not Found";
        errorMsg = data.message || "The requested resource could not be found.";
        break;
      case 409:
        errorTitle = "Conflict";
        errorMsg = data.message || "Duplicate data exists.";
        break;
      case 422:
        errorTitle = "Validation Error";
        errorMsg = data.errors
          ? data.errors.map((e) => e.msg).join(", ")
          : data.message || "Invalid data submitted.";
        break;
      case 500:
        errorTitle = "Server Error";
        errorMsg = data.message || "Our server encountered an error.";
        break;
      default:
        errorTitle = `Error ${status}`;
        errorMsg = data.message || "An unknown backend error occurred.";
    }
  } else if (error?.request) {
    // Request sent but no response received
    errorTitle = "Network Error";
    errorMsg = "Server not responding. Check your internet connection.";
  } else if (error instanceof SyntaxError) {
    errorTitle = "Parsing Error";
    errorMsg = error.message;
  } else {
    errorTitle = "Application Error";
    errorMsg = error?.message || "An unexpected error occurred.";
  }

  // Show popup
  Swal.fire({
    title: errorTitle,
    text: errorMsg,
    icon: "error",
    confirmButtonText: "OK",
    draggable: true,
  });

  // Log for developers
  console.error("Caught Error:", error);
};
