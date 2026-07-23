import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves project sites from /<repo-name>/.
// Set BASE_PATH at build time, e.g. `BASE_PATH=/my-repo/ npm run build`.
// Defaults to "/" for local dev and custom-domain / user-site deployments.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  server: {
    host: true,
  },
});
