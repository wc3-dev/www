import adapter from "@sveltejs/adapter-static";
import { sveltepress } from "@sveltepress/vite";
import UnoCSS from "@unocss/vite";
import { defineConfig } from "vite";
import { theme } from "./src/theme.ts";

// The docs are their own site, served by the wc3-docs Worker, with the Markdown pages in src/routes. They share the
// landing page's textures, fonts, styles and UI components from the folder above.
export default defineConfig({
  plugins: [
    UnoCSS("../uno.config.ts"),
    sveltepress({
      theme,
      siteConfig: {
        title: "Moonwell Docs",
        description: "Documentation for Moonwell, a modding framework for Warcraft III: Reforged.",
      },
      pagefind: { rootSelector: "main" },
      svelteKitOptions: {
        compilerOptions: {
          runes: ({ filename }) =>
            filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
        },
        adapter: adapter({ fallback: "404.html" }),
        files: { assets: "../static", appTemplate: "../src/app.html" },
      },
    }),
  ],
  server: { fs: { allow: [".."] } },
});
