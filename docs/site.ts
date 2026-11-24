import adapter from "@sveltejs/adapter-static";
import { sveltepress } from "@sveltepress/vite";
import UnoCSS from "@unocss/vite";
import { defineConfig } from "vite";
import { theme } from "./src/theme.ts";

export function docsSite(
  siteConfig: { title: string; description: string },
  pageLayout = theme.pageLayout,
) {
  const staticAdapter = adapter({ fallback: "404.html" });

  return defineConfig({
    plugins: [
      UnoCSS("../uno.config.ts"),
      sveltepress({
        theme: { ...theme, pageLayout },
        siteConfig,
        pagefind: { rootSelector: "main" },
        svelteKitOptions: {
          compilerOptions: {
            runes: ({ filename }) =>
              filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
          },
          adapter: {
            ...staticAdapter,
            async adapt(builder) {
              await staticAdapter.adapt(builder);
              const redirects = [...builder.prerendered.redirects].map(
                ([path, { location, status }]) => `${path} ${location} ${status}`,
              );
              if (redirects.length) {
                builder.copy("../static/_redirects", "build/_redirects", {
                  replace: { DOCS_REDIRECTS: `Docs redirects\n${redirects.join("\n")}` },
                });
              }
            },
          },
          files: { assets: "../static", appTemplate: "../src/app.html" },
        },
      }),
    ],
    server: { fs: { allow: [".."] } },
  });
}
