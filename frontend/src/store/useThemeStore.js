import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: "light",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
    
    // Apply theme to document immediately
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("chat-theme", newTheme);
    set({ theme: newTheme });
    
    // Apply theme immediately
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  initTheme: () => {
    const savedTheme = localStorage.getItem("chat-theme") || "light";
    set({ theme: savedTheme });
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
}));