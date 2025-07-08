import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(), // Important : activer le plugin officiel Tailwind v4.1
    react(),       // Plugin React classique
  ],
});
