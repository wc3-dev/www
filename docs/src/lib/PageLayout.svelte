<!--
  One docs page: its Markdown in a frame, and beside it a tooltip with the page's headings, on screens wide enough for
  one. Sveltepress passes the page's frontmatter as fm.
-->
<script lang="ts">
import type { Snippet } from "svelte";
import Frame from "#lib/ui/Frame.svelte";

let {
  fm,
  children,
}: {
  fm: {
    title?: string;
    description?: string;
    anchors?: { id: string; title: string; depth: number }[];
  };
  children: Snippet;
} = $props();
</script>

<svelte:head>
  <title>{fm.title} | Moonwell Docs</title>
  {#if fm.description}
    <meta name="description" content={fm.description} />
  {/if}
</svelte:head>

<div class="page">
  <Frame variant="silver" class="min-w-0 flex-1">
    <article class="prose">
      <h1>{fm.title}</h1>
      {@render children()}
    </article>
  </Frame>

  {#if fm.anchors?.length}
    <aside data-pagefind-ignore>
      <Frame variant="tooltip">
        <h2>On this page</h2>
        <ul>
          {#each fm.anchors as anchor}
            <li class:deep={anchor.depth === 3}><a href="#{anchor.id}">{anchor.title}</a></li>
          {/each}
        </ul>
      </Frame>
    </aside>
  {/if}
</div>

<style>
  .page {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  aside {
    display: none;
    position: sticky;
    top: 1rem;
    flex: none;
    width: 16rem;
    max-height: calc(100dvh - 2rem);
    overflow-y: auto;
  }

  aside h2 {
    margin: 0 0 0.5rem;
    color: var(--gold);
    font-size: 0.9rem;
    font-weight: 400;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .deep {
    padding-left: 0.75rem;
  }

  aside a {
    color: var(--text);
    text-decoration: none;
  }

  aside a:hover {
    color: #fff;
  }

  @media (min-width: 88rem) {
    aside {
      display: block;
    }
  }
</style>
