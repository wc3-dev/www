<!--
  The game's action bar as a page footer: a gryphon on each end, the right one mirrored, and the content in the stone
  panel between them, where the game has its spell slots.
-->
<script lang="ts">
import type { Snippet } from "svelte";
import Peon from "./Peon.svelte";

let { children }: { children: Snippet } = $props();
</script>

<footer class="action-bar">
  <Peon />
  <p>{@render children()}</p>
</footer>

<style>
  .action-bar {
    position: relative;
    container-type: inline-size;
    width: min(100%, 711px);
    aspect-ratio: 711 / 76;
    margin-inline: auto;
  }

  .action-bar::before,
  .action-bar::after {
    content: "";
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 18%;
    aspect-ratio: 128 / 76;
    background: url("/ui/gryphon.png") center / 100% 100%;
    pointer-events: none;
  }

  .action-bar::before {
    left: 0;
  }

  .action-bar::after {
    right: 0;
    scale: -1 1;
  }

  p {
    position: absolute;
    inset: auto 14% 0;
    height: 66%;
    margin: 0;
    padding: 0 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 6px solid transparent;
    border-image: url("/ui/action-bar.png") 8 fill / 6px stretch;
    color: var(--muted);
    font-size: clamp(0.6rem, 2.2cqw, 0.85rem);
    text-align: center;
    text-shadow: 1px 1px 0 #000;
  }
</style>
