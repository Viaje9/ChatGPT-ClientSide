import { defineConfig } from "vite";
import * as dotenv from "dotenv";
import react from "@vitejs/plugin-react";
dotenv.config();

export default ({mode}) => {
  console.log('Current environment:', mode,'----------------');
  let base = "/";
  if (mode === "production") {
    base = process.env.PUBLIC_URL 
  }

  console.log('Current base url:', process.env,'----------------');

  return defineConfig({
    server: {
      port: 5050,
    },
    plugins: [react()],
    base,
  });
};
