import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "pleasantly-quick-seasnail.ngrok-free.app",
      "ping-me-dev.tomeofmanythings.com",
    ],
  },
});
