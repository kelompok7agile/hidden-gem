import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basenameProd = "";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base:  "/",
    plugins: [react()],
    server: {
      port: 3000,
      watch: {
        usePolling: true,
      },
      historyApiFallback: true,
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
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    esbuild: {
      jsx: "automatic",
      target: "esnext",
    },
  };
});
