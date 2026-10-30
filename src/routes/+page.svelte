<script lang="ts">
import Button from "#lib/ui/Button.svelte";
import Divider from "#lib/ui/Divider.svelte";
import Frame from "#lib/ui/Frame.svelte";
</script>

<svelte:head>
  <title>wc3.dev</title>
  <meta name="description" content="Open source tools for Warcraft III modding." />
</svelte:head>

<main class="flex min-h-dvh flex-col items-center justify-center gap-12 px-4 py-16">
  <header class="text-center">
    <h1 class="logo">wc3.dev</h1>
    <p class="tagline">Open source tools for Warcraft III modding</p>
  </header>

  <Frame title="Welcome" class="w-full max-w-md">
    <p class="intro">
      Home of Moonwell, an all-in-one modding framework for Warcraft III: Reforged, and the tools
      around it.
    </p>
    <Divider />
    <nav class="mt-6 flex flex-col items-center gap-2">
      <Button href="https://github.com/wc3-dev/moonwell">Moonwell</Button>
      <Button href="https://github.com/wc3-dev/moonwell-editor">Moonwell Editor</Button>
      <Button href="https://github.com/wc3-dev">GitHub</Button>
    </nav>
  </Frame>
</main>

<footer class="corner left-4">wc3.dev</footer>
<footer class="corner right-4">Not affiliated with Blizzard Entertainment</footer>

<style>
  .logo {
    margin: 0;
    font-family: LifeCraft, "Friz Quadrata", serif;
    text-transform: uppercase;
    font-size: clamp(3rem, 10vw, 5.5rem);
    font-weight: 400;
    letter-spacing: 0.04em;
    line-height: 1;
    color: var(--gold);
    background: linear-gradient(#fff3b0, #ffd100 45%, #b8860b);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 3px 2px #000) drop-shadow(0 0 18px rgb(255 160 0 / 0.25));
  }

  .tagline {
    margin: 0.75rem 0 0;
    color: var(--muted);
    font-size: 1.1rem;
    text-shadow: 1px 1px 0 #000;
  }

  .intro {
    margin: 0 0 1.25rem;
    text-align: center;
    line-height: 1.5;
  }

  .corner {
    position: fixed;
    bottom: 0.75rem;
    color: var(--muted);
    font-size: 0.8rem;
    text-shadow: 1px 1px 0 #000;
  }
</style>
