import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Fallback persistence layer using localStorage. The host-shell `window.storage`
// contract returns `{ value }` from get(), so this polyfill matches that shape
// rather than returning the raw string. set/remove swallow QuotaExceededError
// and similar so a private-mode browser does not crash the save path.
if (!window.storage) {
  window.storage = {
    get: async (key) => {
      try {
        const value = localStorage.getItem(key);
        return value == null ? null : { value };
      } catch (err) {
        console.warn("[storage] get failed", err);
        return null;
      }
    },
    set: async (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        console.warn("[storage] set failed (quota or private mode?)", err);
      }
    },
    remove: async (key) => {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.warn("[storage] remove failed", err);
      }
    },
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
