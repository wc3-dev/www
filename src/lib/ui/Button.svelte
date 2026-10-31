<!--
  The red button of the game's menus. With href it is a link, otherwise a button. Hovering lights it with the
  game's highlight, added on top as the game does; pressing swaps in the pressed texture.
-->
<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

let {
  href,
  children,
  ...rest
}: { href?: string; children: Snippet } & HTMLAnchorAttributes & HTMLButtonAttributes = $props();
</script>

{#if href}
  <a class="button" {href} {...rest as HTMLAnchorAttributes}><span>{@render children()}</span></a>
{:else}
  <button class="button" type="button" {...rest as HTMLButtonAttributes}>
    <span>{@render children()}</span>
  </button>
{/if}

<style>
  .button {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    height: 30px;
    padding: 2px 16px 0;
    border: 0;
    background: none;
    color: #fff;
    font: inherit;
    font-size: 0.95rem;
    text-decoration: none;
    text-shadow: 1px 1px 0 #000;
    cursor: pointer;
  }

  .button::before,
  .button::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border: solid transparent;
    border-width: 0 16px;
  }

  .button::before {
    border-image: url("/ui/button-up.png") 0 12 fill / 0 16px stretch;
  }

  .button:active::before {
    border-image-source: url("/ui/button-down.png");
  }

  .button::after {
    border-image: url("/ui/button-highlight.png") 0 12 fill / 0 16px stretch;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 120ms;
  }

  .button:hover::after,
  .button:focus-visible::after,
  .button[aria-current="page"]::after {
    opacity: 1;
  }

  .button:focus-visible {
    outline: none;
  }

  .button:active span {
    translate: 1px 1px;
  }
</style>
