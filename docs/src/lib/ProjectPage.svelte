<script lang="ts">
import type { ComponentProps } from "svelte";
import PageLayout from "./PageLayout.svelte";
import { page } from "$app/state";
import { projects, moonwellSections } from "./nav";

let { fm, children }: Pick<ComponentProps<typeof PageLayout>, "fm" | "children"> = $props();
const project = $derived(projects.find(({ href }) => page.url.pathname.startsWith(href)));
</script>

<PageLayout {fm} {children} title={project ? project.title + " Documentation" : "Warcraft III Modding Docs"} home={project?.href ?? "/"} sections={project?.href === "/moonwell/" ? moonwellSections : []} />
