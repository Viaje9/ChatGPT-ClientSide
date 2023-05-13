import { defineConfig } from "vite";
import { resolve } from "path";
import * as dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import checker from 'vite-plugin-checker';

dotenv.config();

export default ({ mode }) => {
  let base = "/";
  if (mode === "production") {
    base = process.env.VITE_PUBLIC_URL;
  }

  return defineConfig({
    server: {
      port: 5050,
    },
    plugins: [
      react(),
      eslint(),
      checker({
        typescript: true,
      })
    ],
    base,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  });
};