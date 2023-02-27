import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({mode}) => {
  console.log('Current environment:', mode,'----------------');
  let base = "/";
  if (mode === "production") {
    base = loadEnv(mode, process.cwd()).VITE_PUBLIC_URL 
  }
  
  console.log('Current base url:', base,'----------------');

  return defineConfig({
    server: {
      port: 5050,
    },
    plugins: [react()],
    base,
  });
};
