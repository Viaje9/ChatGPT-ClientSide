import { defineConfig } from "vite";
import * as dotenv from "dotenv";
import react from "@vitejs/plugin-react";
dotenv.config();

export default ({mode}) => {
  let base = "/";
  if (mode === "production") {
    base = process.env.PUBLIC_URL 
  }

  return defineConfig({
    server: {
      port: 5050,
    },
    plugins: [react()],
    base,
  });
};
