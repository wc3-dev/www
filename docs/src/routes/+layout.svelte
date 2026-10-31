<!-- Sveltepress wraps this in the theme's global layout. -->
<script lang="ts">
import type { Snippet } from "svelte";

let { children }: { children: Snippet } = $props();
</script>

{@render children()}
