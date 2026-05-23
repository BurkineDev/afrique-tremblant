import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AfriqueTremblantLandingPage from "./AfriqueTremblantLandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AfriqueTremblantLandingPage />
  </StrictMode>
);
