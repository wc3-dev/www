<script lang="ts">
import type { ComponentProps } from "svelte";
import GlobalLayout from "#docs/GlobalLayout.svelte";
import PageLayout from "#docs/PageLayout.svelte";
import { page } from "$app/state";
import MoonwellPage from "./MoonwellPage.svelte";
import { projects } from "./nav";

let { fm, children }: ComponentProps<typeof PageLayout> = $props();

const project = $derived(projects.find(({ href }) => page.url.pathname.startsWith(href)));
const projectMenu = { title: "Documentation", pages: projects };
</script>

{#if project?.href === "/moonwell/"}
  <MoonwellPage {fm} {children} />
{:else}
  <GlobalLayout title={project?.title ?? "Documentation"} href={project?.href ?? "/"} sections={[projectMenu]}>
    <PageLayout {fm} {children} />
  </GlobalLayout>
{/if}
