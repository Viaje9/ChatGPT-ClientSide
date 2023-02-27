import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({mode}) => {
  let base = "/";
  if (mode === "production") {
    base = loadEnv(mode, process.cwd()).VITE_PUBLIC_URL 
  }
  return defineConfig({
    server: {
      port: 5050,
    },
    plugins: [react()],
    base,
  });
};
