import react from "@vitejs/plugin-react-swc"
import path from "path"

/** @type {import("vite").UserConfig} */
export default {
  plugins: [react()],
  root: "src",
  envDir: "../",
  publicDir: "../public",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
}
