<!--
  The header plate that sits on a frame's top edge, stretched in the middle to fit its text. A subtitle goes on a
  smaller card tucked behind the plate.
-->
<script lang="ts">
import type { Snippet } from "svelte";

let {
  variant = "gold",
  subtitle,
  children,
}: { variant?: "gold" | "stone"; subtitle?: string; children: Snippet } = $props();
</script>

{#if subtitle}
  <p class="subtitle">{subtitle}</p>
{/if}
<h2 class="header {variant}">{@render children()}</h2>

<style>
  .header {
    position: absolute;
    top: -20px;
    left: 50%;
    translate: -50% 0;
    min-width: 180px;
    height: 56px;
    margin: 0;
    padding: 2px 28px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0 solid transparent;
    border-width: 0 24px;
    color: var(--gold);
    font-family: Goodmountain, "Friz Quadrata", serif;
    font-size: 1.6rem;
    font-weight: 400;
    white-space: nowrap;
    text-shadow: 1px 1px 0 #000;
  }

  .subtitle {
    position: absolute;
    top: 8px;
    left: 50%;
    translate: -50% 0;
    min-width: 148px;
    height: 45px;
    margin: 0;
    padding: 14px 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0 solid transparent;
    border-width: 0 12px;
    border-image: url("/ui/header-stone.png") 20 46 21 fill / 5px 12px 6px stretch;
    color: var(--text);
    font-size: 0.75rem;
    font-style: italic;
    white-space: nowrap;
    text-shadow: 1px 1px 0 #000;
  }

  .gold {
    border-image: url("/ui/header-gold.png") 0 24 fill / 0 24px stretch;
  }

  .stone {
    border-image: url("/ui/header-stone.png") 20 46 21 fill / 10px 24px 11px stretch;
  }
</style>
