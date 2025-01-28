import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://tall-rosemaria-mwinfoserve-0b3c5186.koyeb.app",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
