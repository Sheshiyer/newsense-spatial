import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@core": resolve(__dirname, "packages/three-core/src"),
    },
  },
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    sourcemap: true,
  },
});
