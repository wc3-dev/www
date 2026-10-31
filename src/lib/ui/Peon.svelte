<!--
  A peon walking the top of the action bar: out with a sack of gold, back empty-handed. Drawn here rather than taken
  from the game's textures, which have no walking frames.
-->
<div class="peon" aria-hidden="true">
  <svg viewBox="0 0 36 36">
    <g class="stride">
      <g class="leg far">
        <path d="M15 25 L14 32" />
        <path class="foot" d="M14 33 L17.5 33" />
      </g>
      <g class="sack">
        <circle cx="8" cy="17" r="7" fill="#7a5c35" stroke="#2e2113" />
        <path d="M5 11 L11 11" stroke="#2e2113" stroke-width="1.5" />
        <circle cx="6" cy="10" r="2" fill="#ffd100" />
        <circle cx="9.5" cy="9.5" r="2" fill="#e8b400" />
      </g>
      <path d="M10 15 C13 10 21 10 24 14 L21 27 L12 27 Z" fill="#6f8f3f" stroke="#2c3a18" />
      <path d="M11 24 L22 24 L23 29 L10 29 Z" fill="#6b4a2b" stroke="#2e2113" />
      <path d="M21 11 L14 7.5 L20.5 14 Z" fill="#6f8f3f" stroke="#2c3a18" />
      <path d="M21 9 C25 7 30 9 30 13 L31 18 C28 20 24 20 22 18 Z" fill="#7d9c48" stroke="#2c3a18" />
      <path d="M28.2 17 L29 13.6 L30 17 Z" fill="#f0e6d2" />
      <circle cx="27" cy="12" r="1" fill="#ffd100" />
      <g class="leg near">
        <path d="M15 25 L14 32" />
        <path class="foot" d="M14 33 L17.5 33" />
      </g>
      <g class="arm">
        <path d="M19 15 L21 23" />
      </g>
    </g>
  </svg>
</div>

<style>
  .peon {
    --out: 30s;
    --step: 0.3s;
    position: absolute;
    bottom: calc(66% - 0.15cqw);
    left: 13cqw;
    width: 2.8cqw;
    aspect-ratio: 1;
    animation: patrol calc(var(--out) * 2) linear infinite;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(1px 1px 0 #000);
  }

  .stride {
    animation: bob calc(var(--step) / 2) ease-in-out infinite alternate;
  }

  .leg,
  .arm {
    transform-box: view-box;
    transform-origin: 15px 25px;
    animation: step var(--step) ease-in-out infinite alternate;
  }

  .leg path,
  .arm path {
    fill: none;
    stroke: #5d7a33;
    stroke-width: 3.4;
  }

  .leg path.foot {
    stroke: #2e2113;
    stroke-width: 2.4;
  }

  .far {
    animation-delay: calc(var(--step) * -1);
  }

  .far path {
    filter: brightness(0.75);
  }

  .arm {
    transform-origin: 19px 15px;
    animation-delay: calc(var(--step) * -1);
  }

  .sack {
    animation: out calc(var(--out) * 2) step-end infinite;
  }

  @keyframes patrol {
    0% {
      translate: 0;
      scale: 1 1;
    }
    49.9% {
      translate: calc(74cqw - 100%);
      scale: 1 1;
    }
    50% {
      translate: calc(74cqw - 100%);
      scale: -1 1;
    }
    99.9% {
      translate: 0;
      scale: -1 1;
    }
    100% {
      translate: 0;
      scale: 1 1;
    }
  }

  @keyframes bob {
    to {
      transform: translateY(-0.8px);
    }
  }

  @keyframes step {
    from {
      transform: rotate(-26deg);
    }
    to {
      transform: rotate(26deg);
    }
  }

  @keyframes out {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .peon,
    .stride,
    .leg,
    .arm,
    .sack {
      animation: none;
    }
  }
</style>
