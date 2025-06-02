import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basenameProd = "";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "/",
    plugins: [react()],
    server: {
      port: 4173,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    define: {
      global: "globalThis",
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    esbuild: {
      jsx: "automatic",
      target: "esnext",
    },
  };
});
