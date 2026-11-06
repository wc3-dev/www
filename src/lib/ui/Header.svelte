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
{#if variant === "gold"}
  <h2 class="header gold"><span class="carved">{@render children()}</span></h2>
  <!-- The game's logo lettering: a gold gradient with streaked noise, an inner bevel lit from the top left with a
       maroon shadow, a black outline and a blurred drop shadow. -->
  <svg width="0" height="0" aria-hidden="true">
    <filter id="carved" x="-20%" y="-40%" width="140%" height="190%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.03 0.9" numOctaves="2" seed="3" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.5" intercept="0.62" />
        <feFuncG type="linear" slope="0.5" intercept="0.62" />
        <feFuncB type="linear" slope="0.5" intercept="0.62" />
      </feComponentTransfer>
      <feBlend in="SourceGraphic" mode="multiply" />
      <feComposite in2="SourceAlpha" operator="in" result="textured" />

      <feOffset in="SourceAlpha" dx="1.2" dy="1.2" />
      <feComposite in="SourceAlpha" operator="out" />
      <feGaussianBlur stdDeviation="0.5" />
      <feComposite in2="SourceAlpha" operator="in" result="lightEdge" />
      <feFlood flood-color="#fff" flood-opacity="0.68" />
      <feComposite in2="lightEdge" operator="in" result="light" />
      <feOffset in="SourceAlpha" dx="-1.2" dy="-1.2" />
      <feComposite in="SourceAlpha" operator="out" result="shadowEdge" />
      <feFlood flood-color="#9b0e0e" flood-opacity="0.83" />
      <feComposite in2="shadowEdge" operator="in" result="shade" />

      <feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="outline" />
      <feOffset dx="2" dy="3" />
      <feGaussianBlur stdDeviation="2.5" />
      <feComponentTransfer result="drop"><feFuncA type="linear" slope="0.85" /></feComponentTransfer>

      <feMerge>
        <feMergeNode in="drop" />
        <feMergeNode in="outline" />
        <feMergeNode in="textured" />
        <feMergeNode in="shade" />
        <feMergeNode in="light" />
      </feMerge>
    </filter>
  </svg>
{:else}
  <h2 class="header {variant}">{@render children()}</h2>
{/if}

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


  .carved {
    background: linear-gradient(#fff36b, #f5b800 55%, #c76d00);
    background-clip: text;
    color: transparent;
    text-shadow: none;
    filter: url("#carved");
  }

  svg {
    position: absolute;
  }

</style>
