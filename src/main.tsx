import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Debug: Verify Supabase configuration
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const payload = JSON.parse(atob(key.split('.')[1]));
console.log('🎯 Using Supabase Project:', payload.ref);
console.log('✅ Expected:', 'brwdpahslxwqwbncfpqy');
console.log('🔗 URL:', import.meta.env.VITE_SUPABASE_URL);

createRoot(document.getElementById("root")!).render(<App />);
