import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
const basenameProd = "";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "/",
    plugins: [
      react(),
      commonjs({
        include: "node_modules/**",
        transformMixedEsModules: true,
        ignoreTryCatch: false,
        requireReturnsDefault: "auto",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    define: {
      // global: {
      //   basename: isProd ? basenameProd : "",
      // },
      global: "globalThis",
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
