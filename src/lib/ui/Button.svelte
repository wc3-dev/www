<!--
  The red button of the game's login screens. With href it is a link, otherwise a button. Hovering lights it with the
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
    min-width: 220px;
    height: 54px;
    padding: 0 32px 2px;
    border: 0;
    background: none;
    color: var(--gold);
    font: inherit;
    font-size: 1.05rem;
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
    border-width: 16px 22px;
  }

  .button::before {
    border-image: url("/ui/button-up.png") 40 56 fill / 16px 22px stretch;
  }

  .button:active::before {
    border-image-source: url("/ui/button-down.png");
  }

  .button::after {
    border-image: url("/ui/button-highlight.png") 14 18 fill / 16px 22px stretch;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 120ms;
  }

  .button:hover,
  .button:focus-visible {
    color: #fff;
  }

  .button:hover::after,
  .button:focus-visible::after {
    opacity: 1;
  }

  .button:focus-visible {
    outline: none;
  }

  .button:active span {
    translate: 1px 1px;
  }
</style>
