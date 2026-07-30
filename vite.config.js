import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dev server runs on 5173. The proxy below forwards any request starting
// with /api to the Flask backend on :5000, so during development you can call
// fetch("/api/...") with no CORS worries and no hardcoded localhost:5000.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
