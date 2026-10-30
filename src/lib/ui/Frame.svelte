<!--
  A frame as the game draws its dialogs and tooltips: a tiled background inside an edge cut in nine (see
  scripts/textures.mjs). A title puts a header plate on the top edge.
-->
<script lang="ts">
import type { Snippet } from "svelte";
import Header from "./Header.svelte";

let {
  variant = "gold",
  title,
  class: className = "",
  children,
}: {
  variant?: "gold" | "silver" | "tooltip";
  title?: string;
  class?: string;
  children: Snippet;
} = $props();
</script>

<section class="frame {variant} {className}" class:titled={!!title}>
  {#if title}
    <Header>{title}</Header>
  {/if}
  {@render children()}
</section>

<style>
  .frame {
    --edge: 32px;
    --inset: 11px;
    --slice: 32;
    position: relative;
    isolation: isolate;
    padding: calc(var(--edge) - 4px) var(--edge);
  }

  .frame.titled {
    padding-top: calc(var(--edge) + 16px);
  }

  .frame::before,
  .frame::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
  }

  .frame::before {
    inset: var(--inset);
    background: url("/ui/frame-background.png");
  }

  .frame::after {
    inset: 0;
    border: var(--edge) solid transparent;
    border-image: var(--edge-image) var(--slice) / var(--edge) stretch;
  }

  .gold {
    --edge-image: url("/ui/frame-gold.png");
  }

  .silver {
    --edge-image: url("/ui/frame-silver.png");
  }

  .tooltip {
    --edge: 16px;
    --inset: 4px;
    --slice: 16;
    --edge-image: url("/ui/frame-tooltip.png");
    padding: 12px 14px;
  }

  .tooltip::before {
    background: rgb(23 23 48 / 0.9);
  }
</style>
