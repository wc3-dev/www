<!--
  The frame of every docs page: the logo and search on top, the menu and the page side by side, and the action bar
  below. On a phone the menu moves under the page, and a link jumps to it.
-->
<script lang="ts">
import type { Snippet } from "svelte";
import ActionBar from "#lib/ui/ActionBar.svelte";
import Button from "#lib/ui/Button.svelte";
import Frame from "#lib/ui/Frame.svelte";
import { page } from "$app/state";
import "../../../src/app.css";
import "./prose.css";
import { sections } from "./nav";
import Search from "./Search.svelte";

let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
  />
</svelte:head>

<div class="flex min-h-dvh flex-col">
  <header class="top">
    <a class="logo" href="/">Moonwell</a>
    <Search />
    <a class="jump" href="#menu">Menu</a>
  </header>

  <div class="columns">
    <main>{@render children()}</main>

    <div class="menu" id="menu">
      {#each sections as section}
        <Frame variant="silver" title={section.title} class="w-full">
          <nav class="flex flex-col gap-1">
            {#each section.pages as link}
              <Button
                href={link.href}
                aria-current={page.url.pathname === link.href ? "page" : undefined}
              >
                {link.title}
              </Button>
            {/each}
          </nav>
        </Frame>
      {/each}
      <Button href="https://wc3.dev">Back to wc3.dev</Button>
    </div>
  </div>

  <ActionBar>Not affiliated with Blizzard Entertainment</ActionBar>
</div>

<style>
  .top {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 92rem;
    width: 100%;
    margin-inline: auto;
    padding: 1rem;
  }

  .logo {
    font-family: Goodmountain, "Friz Quadrata", serif;
    font-size: 2rem;
    letter-spacing: 0.04em;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--gold);
    text-shadow: 0 2px 2px #000;
  }

  .jump {
    color: var(--gold);
    text-shadow: 1px 1px 0 #000;
  }

  .columns {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 92rem;
    width: 100%;
    margin-inline: auto;
    padding: 0.5rem 1rem 2rem;
  }

  main {
    min-width: 0;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media (min-width: 64rem) {
    .jump {
      display: none;
    }

    .columns {
      flex-direction: row;
      align-items: flex-start;
    }

    main {
      order: 2;
      flex: 1;
    }

    .menu {
      order: 1;
      flex: none;
      width: 18rem;
    }
  }
</style>
