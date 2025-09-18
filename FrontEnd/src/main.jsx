import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//import './index.css'
import { RouterProvider } from "react-router-dom";
//import NotebookRouter from "./Router/NotebookRouter.jsx";
import NotebookRouter from "../src/NotebookRouter/NotebookRouter.jsx"
//import NotebookRouter from "../../src/Router/NotebookRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotebookRouter>
      <RouterProvider router={NotebookRouter} />
    </NotebookRouter>
  </StrictMode>
);
