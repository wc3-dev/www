<!-- The gold header plate that sits on a frame's top edge, stretched in the middle to fit its text. -->
<script lang="ts">
import type { Snippet } from "svelte";

let { children }: { children: Snippet } = $props();
</script>

<h2 class="header">{@render children()}</h2>

<style>
  .header {
    position: absolute;
    top: -12px;
    left: 50%;
    translate: -50% 0;
    min-width: 180px;
    height: 40px;
    margin: 0;
    padding: 0 28px 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0 solid transparent;
    border-width: 0 24px;
    border-image: url("/ui/header-gold.png") 0 24 fill / 0 24px stretch;
    color: var(--gold);
    font-size: 1rem;
    font-weight: 400;
    white-space: nowrap;
    text-shadow: 1px 1px 0 #000;
  }
</style>
