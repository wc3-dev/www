import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import UnoCSS from "@unocss/vite";
import { defineConfig } from "vite";

// Every page is built ahead of time into build/, which the wc3-dev Worker serves as static files.
export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit({
      compilerOptions: {
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
      },
      adapter: adapter({ fallback: "404.html" }),
    }),
  ],
});
