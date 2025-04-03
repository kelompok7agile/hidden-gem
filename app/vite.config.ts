import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
const basenameProd = "";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "/",
    plugins: [react(), commonjs()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // global: {
      //   basename: isProd ? basenameProd : "",
      // },
      global: "globalThis",
      plugins: [commonjs()],
    },
  };
});
