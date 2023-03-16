import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { IsLoadedProvider } from "./contexts/IsLoadedContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <IsLoadedProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </IsLoadedProvider>
    </BrowserRouter>
  </React.StrictMode>
);
