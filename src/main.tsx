import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Application starting...");

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
} else {
  console.log("Root element found, mounting app...");
  createRoot(rootElement).render(<App />);
  console.log("App mounted successfully");
}