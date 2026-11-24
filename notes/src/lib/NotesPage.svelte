<script lang="ts">
import type { ComponentProps } from "svelte";
import PageLayout from "#docs/PageLayout.svelte";
import { patches } from "../routes/patches";

let { fm, children }: Pick<ComponentProps<typeof PageLayout>, "fm" | "children"> = $props();
</script>

<PageLayout {fm} {children} title="Warcraft III Patch Notes" home="/" notes sections={[{ title: "Versions", pages: patches }]} />
