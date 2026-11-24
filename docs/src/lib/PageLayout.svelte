<script lang="ts">
import site from "virtual:sveltepress/site";
import type { Snippet } from "svelte";
import Button from "#lib/ui/Button.svelte";
import { page } from "$app/state";
import logo from "./moonwell/moonwell.png";
import { projects } from "./nav";
import Search from "./Search.svelte";
import "virtual:uno.css";
import "../../../src/app.css";
import "./prose.css";
import "./moonwell.css";

let {
  fm,
  children,
  title,
  home,
  sections = [],
  notes = false,
}: {
  fm: {
    title?: string;
    description?: string;
    anchors?: { id: string; title: string; depth: number }[];
  };
  children: Snippet;
  title: string;
  home: string;
  sections?: { title: string; pages: { title: string; href: string }[] }[];
  notes?: boolean;
} = $props();
const docs = $derived(notes ? "https://docs.wc3.dev" : "");
let menuOpen = $state(false);
</script>

<svelte:head>
  <title>{fm.title} | {site.title}</title>
  {#if fm.description}<meta name="description" content={fm.description} />{/if}
</svelte:head>

<div class="moonwell">
  <a class="skip" href="#article">Skip to content</a>
  <header class="titlebar">
    <a class="home" href={home}><img src={logo} alt={title + " home"} width="58" height="58" /></a>
    <span>{title}</span>
    <nav class="project-links" aria-label="Documentation sites">
      {#each projects as project}
        <Button href={docs + project.href} aria-current={project.href === home ? "location" : undefined}>{project.title}</Button>
      {/each}
      <Button href={notes ? "/" : "https://notes.wc3.dev/"} aria-current={notes ? "location" : undefined}>Patch Notes</Button>
    </nav>
  </header>
  <div class="panes">
    <aside class="directory">
      <Search />
      <button class="menu-toggle" aria-expanded={menuOpen} aria-controls="guide-menu" onclick={() => (menuOpen = !menuOpen)}>Contents</button>
      <nav id="guide-menu" class:open={menuOpen} aria-label="Documentation contents">
        {#each sections as section}
          <h2>{section.title}</h2>
          {#each section.pages as link}
            <a href={link.href} aria-current={page.url.pathname === link.href ? "page" : undefined}>{link.title}</a>
          {/each}
        {/each}
        {#if fm.anchors?.length}
          <h2>In this guide</h2>
          {#each fm.anchors as anchor}
            <a class:deep={anchor.depth === 3} href={'#' + anchor.id} onclick={() => (menuOpen = false)}>{anchor.title}</a>
          {/each}
        {/if}
        <h2>Documentation</h2>
        {#each projects as project}<a href={docs + project.href}>{project.title}</a>{/each}
        <a href={docs + "/projects/"}>All projects</a>
        <a href="https://notes.wc3.dev/">Patch notes</a>
        <a href="https://wc3.dev/">Back to wc3.dev</a>
      </nav>
    </aside>
    <main class="reader">
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (The scrollable article needs keyboard focus for paging.) -->
      <article class="prose" id="article" tabindex="0" aria-label={fm.title}>
        <h1>{fm.title}</h1>
        {@render children()}
      </article>
    </main>
  </div>
  <div class="sill" aria-hidden="true"></div>
  <footer>Not affiliated with Blizzard Entertainment</footer>
</div>
