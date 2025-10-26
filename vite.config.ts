
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://script.google.com/macros/s/AKfycbziVNbExIf5VpiKS36Wo0iLGggZoG1scWw4WcKy0WVK5dMCWszAo-K77NaqzjMJ4Vuf/exec",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});