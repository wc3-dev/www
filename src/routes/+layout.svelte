<script lang="ts">
import "virtual:uno.css";
import "../app.css";
import type { LayoutProps } from "./$types";

let { children }: LayoutProps = $props();
</script>

{@render children()}
