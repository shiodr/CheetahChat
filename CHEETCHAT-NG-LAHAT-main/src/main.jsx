import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Your global styles
import { db } from "./lib/firebase"; // Import your Firebase configuration

// Example: Fetching data from Firestore
// (Assuming you're using Firestore)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);