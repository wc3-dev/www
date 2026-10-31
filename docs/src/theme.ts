import type { ResolvedTheme } from "@sveltepress/vite";
import { createHighlighter } from "shiki";

const shikiTheme = "vitesse-dark";
const shiki = await createHighlighter({
  themes: [shikiTheme],
  langs: ["csharp", "powershell", "shellscript"],
});

// Shiki leaves braces as they are, and Svelte would read them as code. Its background goes too: prose.css sets one.
function highlight(code: string, lang: string) {
  const known = shiki.getLoadedLanguages().includes(lang);
  return shiki
    .codeToHtml(code, { lang: known ? lang : "text", theme: shikiTheme })
    .replace(/background-color:[^;"]*;?/, "")
    .replaceAll("{", "&#123;")
    .replaceAll("}", "&#125;");
}

type Node = { type: string; depth?: number; value?: string; children?: Node[]; data?: object };

function text(node: Node): string {
  return node.value ?? node.children?.map(text).join("") ?? "";
}

// Gives each h2 and h3 an id and hands the list to the page as fm.anchors, for its table of contents. The ids follow
// GitHub's rules, as the old docs' did, so links into a page keep working.
function anchors() {
  return (tree: Node, file: { data: Record<string, unknown> }) => {
    const found: { id: string; title: string; depth: number }[] = [];
    const used = new Map<string, number>();
    for (const node of tree.children ?? []) {
      if (node.type !== "heading" || (node.depth !== 2 && node.depth !== 3)) continue;
      const title = text(node);
      const slug = title
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s_-]/gu, "")
        .replace(/\s/g, "-");
      const count = used.get(slug) ?? 0;
      used.set(slug, count + 1);
      const id = count ? `${slug}-${count}` : slug;
      node.data = { ...node.data, hProperties: { id } };
      found.push({ id, title, depth: node.depth });
    }
    file.data.anchors = found;
  };
}

export const theme: ResolvedTheme = {
  name: "wc3-dev",
  globalLayout: "#docs/GlobalLayout.svelte",
  pageLayout: "#docs/PageLayout.svelte",
  vitePlugins: (corePlugin) => [corePlugin],
  highlighter: highlight,
  remarkPlugins: [anchors as never],
};
