import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PresentationProvider } from "./context/PresentationContext";

createRoot(document.getElementById("root")).render(
  <PresentationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PresentationProvider>,
);
