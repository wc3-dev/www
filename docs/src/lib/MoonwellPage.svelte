<script lang="ts">
import site from "virtual:sveltepress/site";
import { type ComponentProps, onMount } from "svelte";
import Button from "#lib/ui/Button.svelte";
import { page } from "$app/state";
import logo from "./moonwell/moonwell.png";
import { moonwellSections, projects } from "./nav";
import type PageLayout from "./PageLayout.svelte";
import Search from "./Search.svelte";
import "virtual:uno.css";
import "../../../src/app.css";
import "./prose.css";
import "./moonwell.css";

let { fm, children }: ComponentProps<typeof PageLayout> = $props();
const themes = ["Quest Log", "Spellbook", "Achievements"] as const;
type Theme = (typeof themes)[number];
let theme = $state<Theme>("Quest Log");
let menuOpen = $state(false);

onMount(() => {
  try {
    const saved = localStorage.getItem("moonwell-theme");
    theme = themes.find((name) => name === saved) ?? "Quest Log";
  } catch {
    // Storage may be disabled.
  }
});

function selectTheme(name: Theme) {
  theme = name;
  try {
    localStorage.setItem("moonwell-theme", name);
  } catch {
    // The selection still applies to this page.
  }
}
</script>

<svelte:head>
  <title>{fm.title} | {site.title}</title>
  {#if fm.description}<meta name="description" content={fm.description} />{/if}
</svelte:head>

<div class="moonwell" data-theme={theme}>
  <a class="skip" href="#article">Skip to content</a>
  <header class="titlebar">
    <a class="home" href="/moonwell/"><img src={logo} alt="Moonwell documentation home" width="58" height="58" /></a>
    <span>Moonwell Documentation</span>
    <nav class="theme-buttons" aria-label="Documentation theme">
      {#each themes as name}
        <Button aria-pressed={theme === name} onclick={() => selectTheme(name)}>{name}</Button>
      {/each}
    </nav>
  </header>
  <div class="panes">
    <aside class="directory">
      <Search />
      <button class="menu-toggle" aria-expanded={menuOpen} aria-controls="guide-menu" onclick={() => (menuOpen = !menuOpen)}>Contents</button>
      <nav id="guide-menu" class:open={menuOpen} aria-label="Documentation contents">
        {#each moonwellSections as section}
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
        {#each projects as project}<a href={project.href}>{project.title}</a>{/each}
        <a href="/">All projects</a>
        <a href="https://notes.wc3.dev/">Patch notes</a>
        <a href="https://wc3.dev/">Back to wc3.dev</a>
      </nav>
    </aside>
    <main class="reader" id="article">
      <article class="prose">
        <h1>{fm.title}</h1>
        {@render children()}
      </article>
    </main>
  </div>
  <div class="sill" aria-hidden="true"></div>
  <footer>Not affiliated with Blizzard Entertainment</footer>
</div>
