<!-- A link to a page, in a tooltip frame. -->
<script lang="ts">
import Frame from "#lib/ui/Frame.svelte";

let { title, description, href }: { title: string; description: string; href: string } = $props();
</script>

<a class="card" {href}>
  <Frame variant="tooltip" class="h-full">
    <strong>{title}</strong>
    <span>{description}</span>
  </Frame>
</a>

<style>
  .card {
    display: block;
    color: var(--text);
    text-decoration: none;
  }

  strong {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--gold);
    font-family: "Friz Quadrata", Georgia, serif;
    font-weight: 400;
  }

  span {
    display: block;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .card:hover strong {
    color: #fff;
  }
</style>
