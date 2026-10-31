<script lang="ts">
import ActionBar from "#lib/ui/ActionBar.svelte";
import Button from "#lib/ui/Button.svelte";
import Footman from "#lib/ui/Footman.svelte";
import Frame from "#lib/ui/Frame.svelte";
import Grunt from "#lib/ui/Grunt.svelte";
</script>

<svelte:head>
  <title>wc3.dev</title>
  <meta name="description" content="Open source tools for Warcraft III modding." />
</svelte:head>

<div class="flex min-h-dvh flex-col">
  <main class="flex flex-1 flex-col items-center justify-center gap-10 px-4 py-10">
    <h1 class="sr-only">wc3.dev</h1>
    <div class="relative w-full max-w-72">
      <Footman />
      <Frame variant="silver" title="WC3.DEV" subtitle="modding tools" class="w-full">
        <nav class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <Button href="https://github.com/wc3-dev/moonwell">Moonwell</Button>
            <Button href="https://github.com/wc3-dev/moonwell-editor">Moonwell Editor</Button>
          </div>
          <div class="flex flex-col gap-1">
            <Button href="https://docs.wc3.dev">Documentation</Button>
          </div>
          <div class="flex flex-col gap-1">
            <Button href="https://github.com/wc3-dev">GitHub</Button>
          </div>
        </nav>
      </Frame>
      <Grunt />
    </div>
  </main>

  <ActionBar>Not affiliated with Blizzard Entertainment</ActionBar>
</div>
