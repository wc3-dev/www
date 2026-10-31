<!--
  The search box, on the game's edit box texture. Pagefind writes its index beside the built site, so search only finds
  anything in a build, not under `vite dev`. Results open in a tooltip below the box.
-->
<script lang="ts">
import Frame from "#lib/ui/Frame.svelte";

type Hit = { url: string; title: string; excerpt: string };
type Result = {
  data: () => Promise<{ url: string; excerpt: string; meta: { title: string } }>;
};

let query = $state("");
let hits = $state<Hit[]>([]);

const pagefind = () => import(/* @vite-ignore */ `${location.origin}/pagefind/pagefind.js`);

async function search() {
  const engine = await pagefind().catch(() => null);
  const found = await engine?.debouncedSearch(query);
  if (!found) return;
  hits = await Promise.all(
    found.results.slice(0, 6).map(async (result: Result) => {
      const data = await result.data();
      return { url: data.url, title: data.meta.title, excerpt: data.excerpt };
    }),
  );
}
</script>

<div class="search">
  <input
    type="search"
    placeholder="Search"
    aria-label="Search the docs"
    bind:value={query}
    oninput={search}
  />

  {#if query && hits.length}
    <div class="results">
      <Frame variant="tooltip">
        <ul>
          {#each hits as hit}
            <li>
              <a href={hit.url} onclick={() => (query = "")}>{hit.title}</a>
              <p>{@html hit.excerpt}</p>
            </li>
          {/each}
        </ul>
      </Frame>
    </div>
  {/if}
</div>

<style>
  .search {
    position: relative;
    flex: 1;
    max-width: 24rem;
    margin-left: auto;
  }

  input {
    width: 100%;
    height: 28px;
    padding: 0 8px;
    border: solid transparent;
    border-width: 0 8px;
    border-image: url("/ui/input.png") 0 8 fill / 0 8px stretch;
    background: none;
    color: var(--text);
    font: inherit;
    font-size: 0.9rem;
    outline: none;
  }

  .results {
    position: absolute;
    top: 100%;
    right: 0;
    width: min(32rem, calc(100vw - 2rem));
    margin-top: 0.25rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li + li {
    margin-top: 0.75rem;
  }

  a {
    color: var(--gold);
    text-decoration: none;
  }

  a:hover {
    color: #fff;
  }

  p {
    margin: 0.1rem 0 0;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  p :global(mark) {
    background: none;
    color: var(--gold);
  }
</style>
