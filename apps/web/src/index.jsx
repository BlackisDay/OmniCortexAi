// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/globals.css";

// Create a React Query client
const queryClient = new QueryClient();

// Get the root element from index.html
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found in index.html");

// Create React 18 root
const root = createRoot(container);

// Render the app
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);