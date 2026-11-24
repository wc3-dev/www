<script lang="ts">
import { onMount } from "svelte";

let { target, label }: { target: string; label: string } = $props();
let pane: HTMLElement;
let enabled = $state(false);
let maximum = $state(0);
let position = $state(0);
let thumbHeight = $state(20);

onMount(() => {
  if (CSS.supports("selector(::-webkit-scrollbar)")) return;
  const element = document.getElementById(target);
  if (!element) return;
  pane = element;

  function measure() {
    const height = pane.clientHeight;
    maximum = Math.max(0, pane.scrollHeight - height);
    thumbHeight = Math.max(20, (height - 42) * height / Math.max(1, pane.scrollHeight));
    position = pane.scrollTop;
  }

  const observer = new ResizeObserver(measure);
  observer.observe(pane);
  for (const child of pane.children) observer.observe(child);
  const sync = () => { position = pane.scrollTop; };
  pane.addEventListener("scroll", sync, { passive: true });
  enabled = true;
  measure();
  return () => {
    observer.disconnect();
    pane.removeEventListener("scroll", sync);
  };
});

function keydown(event: KeyboardEvent) {
  const steps: Record<string, number> = {
    ArrowUp: -40, ArrowDown: 40, PageUp: -pane.clientHeight, PageDown: pane.clientHeight,
    Home: -maximum, End: maximum,
  };
  if (!(event.key in steps)) return;
  event.preventDefault();
  pane.scrollTop += steps[event.key];
}
</script>

{#if enabled && maximum > 0}
  <div class="quest-scrollbar" style:--thumb-height={thumbHeight + "px"}>
    <button type="button" class="up" aria-label={"Scroll " + label + " up"} onclick={() => pane.scrollBy(0, -40)}></button>
    <input type="range" min="0" max={maximum} value={position} aria-label={"Scroll " + label}
      aria-controls={target} aria-orientation="vertical" onkeydown={keydown}
      oninput={(event) => (pane.scrollTop = event.currentTarget.valueAsNumber)} />
    <button type="button" class="down" aria-label={"Scroll " + label + " down"} onclick={() => pane.scrollBy(0, 40)}></button>
  </div>
{/if}

<style>
  .quest-scrollbar {
    position: absolute;
    inset: var(--pane-cap-height) var(--right-rail-width) 0 auto;
    width: 22px;
    display: grid;
    grid-template-rows: 21px minmax(0, 1fr) 21px;
    background: #24211e;
    box-shadow: inset 1px 0 #514a40, inset -1px 0 #514a40;
  }
  button { background: transparent center / 100% 100% no-repeat; }
  .up { background-image: url("./moonwell/scroll-ScrollUpButton-Up.png"); }
  .down { background-image: url("./moonwell/scroll-ScrollDownButton-Up.png"); }
  input {
    appearance: none;
    writing-mode: vertical-lr;
    direction: ltr;
    width: 100%;
    height: 100%;
    min-height: 0;
    margin: 0;
    background: transparent;
  }
  input::-moz-range-thumb {
    box-sizing: border-box;
    width: 22px;
    height: var(--thumb-height);
    border: 5px solid transparent;
    border-image: url("./moonwell/scroll-Knob.png") 5 fill / 5px stretch;
    background: transparent;
  }
  input::-moz-range-track { background: transparent; }
  :is(input, button):focus-visible { outline: 1px solid #ffdc91; outline-offset: -2px; }
  @media (forced-colors: active) {
    .quest-scrollbar { display: none; }
  }
</style>
