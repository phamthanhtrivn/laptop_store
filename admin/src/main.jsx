import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import TokenContextProvider from "./context/TokenContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TokenContextProvider>
      <App />
    </TokenContextProvider>
  </BrowserRouter>
);
