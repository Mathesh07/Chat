import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    port: 5173, // Vite default port
    proxy: {
      "/auth": {
        target: "http://localhost:5001/api", // your backend
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:5001/api",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
  },
});
