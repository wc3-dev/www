<script lang="ts">
import type { Snippet } from "svelte";
import GlobalLayout from "#docs/GlobalLayout.svelte";
import { page } from "$app/state";
import { moonwellSections, projects } from "../lib/nav";

let { children }: { children: Snippet } = $props();

const project = $derived(projects.find(({ href }) => page.url.pathname.startsWith(href)));
const projectMenu = { title: "Documentation", pages: projects };
</script>

<GlobalLayout
  title={project?.title ?? "Documentation"}
  href={project?.href ?? "/"}
  sections={project?.href === "/moonwell/" ? [...moonwellSections, projectMenu] : [projectMenu]}
>
  {@render children()}
</GlobalLayout>
