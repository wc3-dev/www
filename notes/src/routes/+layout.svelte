<script lang="ts">
import type { Snippet } from "svelte";
import GlobalLayout from "#docs/GlobalLayout.svelte";
import { patches } from "./patches";

let { children }: { children: Snippet } = $props();
</script>

<GlobalLayout title="Patch Notes" href="/" sections={[{ title: "Versions", pages: patches }]}>
  {@render children()}
</GlobalLayout>
