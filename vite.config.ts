import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
//@ts-expect-error ts config don't have a reach in this file
import { dependencies } from "./package.json";

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    open: "/",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      ...(process.env.NODE_ENV !== "development"
        ? {
            "./runtimeConfig": "./runtimeConfig.browser", //fix production build
          }
        : {}),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-router-dom", "react-dom"],
          ...renderChunks(dependencies),
        },
      },
    },
  },
});
