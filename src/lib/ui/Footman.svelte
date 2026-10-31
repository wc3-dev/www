<!--
  A footman standing on the menu's top edge, leaning his back on the left of the header plate, arms folded and ankles
  crossed. Drawn here rather than taken from the game.
-->
<div class="footman" aria-hidden="true">
  <svg viewBox="0 0 150 195">
    <defs>
      <linearGradient id="footman-steel" x1="0" x2="1" y1="0" y2="0.4">
        <stop offset="0" stop-color="#e3e9ef" />
        <stop offset="0.55" stop-color="#a9b4c1" />
        <stop offset="1" stop-color="#66717f" />
      </linearGradient>
      <linearGradient id="footman-cloth" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#3a70cf" />
        <stop offset="1" stop-color="#1c3f82" />
      </linearGradient>
    </defs>

    <g transform="rotate(13 62 190)">
      <!-- The leg he stands on. -->
      <path d="M68 122 L72 152 L74 176" stroke="#1d2229" stroke-width="20" />
      <path d="M68 122 L72 152 L74 176" stroke="#76818f" stroke-width="15.500" />
      <path d="M84 170 L85 187 L56 187 C56 179 63 174 69 170 Z" fill="#5b6675" stroke="#1d2229" stroke-width="2.500" />

      <!-- The far arm, under the near one. -->
      <path d="M54 76 L50 96 L84 104" stroke="#1d2229" stroke-width="18" />
      <path d="M54 76 L50 96 L84 104" stroke="#76818f" stroke-width="13.500" />

      <path
        d="M50 66 C46 88 50 110 54 128 L92 128 C96 110 98 88 94 64 C82 54 62 54 50 66 Z"
        fill="url(#footman-steel)"
        stroke="#1d2229"
        stroke-width="2.500"
      />

      <!-- The leg crossed over it. -->
      <path d="M82 124 L62 152 L46 176" stroke="#1d2229" stroke-width="20" />
      <path d="M82 124 L62 152 L46 176" stroke="url(#footman-steel)" stroke-width="15.500" />
      <circle cx="62" cy="152" r="8" fill="#e3e9ef" stroke="#1d2229" stroke-width="2.500" />
      <path d="M56 170 L54 187 L26 187 C26 179 34 174 42 170 Z" fill="#8e9aa8" stroke="#1d2229" stroke-width="2.500" />

      <!-- Tabard and belt. -->
      <path d="M58 64 L86 64 L90 148 L72 156 L54 148 Z" fill="url(#footman-cloth)" stroke="#12295a" stroke-width="2.500" />
      <path d="M72 122 L81 134 L72 146 L63 134 Z" fill="#e0b030" stroke="#7d5f10" stroke-width="1.500" />
      <path d="M52 110 C64 117 84 117 95 110 L96 119 C84 126 64 126 53 119 Z" fill="#6b4a2b" stroke="#1d2229" stroke-width="2.500" />
      <rect x="66" y="112" width="13" height="11" rx="2" fill="#e0b030" stroke="#7d5f10" stroke-width="1.500" />

      <!-- The near arm, folded over the chest. -->
      <path d="M92 76 L95 97 L58 92" stroke="#1d2229" stroke-width="19" />
      <path d="M92 76 L95 97 L58 92" stroke="url(#footman-steel)" stroke-width="14.500" />
      <circle cx="54" cy="92" r="10" fill="#c3ccd6" stroke="#1d2229" stroke-width="2.500" />
      <path d="M47 87 L58 86 M46 92 L58 92 M47 97 L58 98" stroke="#5b6675" stroke-width="1.500" />

      <!-- The helm. -->
      <path
        d="M50 22 L62 15 L92 14 L100 24 L100 62 L74 66 L60 66 L50 56 Z"
        fill="url(#footman-steel)"
        stroke="#1d2229"
        stroke-width="2.500"
      />
      <path d="M50 39 L82 36 L82 43 L50 46 Z" fill="#14181e" />
      <path d="M74 15 L77 36 M77 43 L73 66" stroke="#e0b030" stroke-width="3" fill="none" />
      <g fill="#14181e">
        <circle cx="56" cy="53" r="1.300" />
        <circle cx="62" cy="52" r="1.300" />
        <circle cx="60" cy="58" r="1.300" />
        <circle cx="66" cy="57" r="1.300" />
      </g>

      <!-- Near shoulder. -->
      <path
        d="M73 76 C72 52 113 49 118 72 C119 85 108 90 96 90 C84 90 75 86 73 76 Z"
        fill="url(#footman-steel)"
        stroke="#1d2229"
        stroke-width="2.500"
      />
      <path d="M75 79 C84 90 108 92 117 77" stroke="#e0b030" stroke-width="3.500" fill="none" />
      <path d="M82 66 C90 58 102 58 110 64" stroke="#fff" stroke-opacity="0.65" stroke-width="2" fill="none" />
    </g>
  </svg>
</div>

<style>
  .footman {
    position: absolute;
    z-index: 1;
    /* Set by hand to the plate's width, which follows the title's font. */
    right: calc(50% + 6.375rem);
    bottom: calc(100% - 0.3125rem);
    width: 1.18rem;
    pointer-events: none;
  }

  svg {
    display: block;
    width: 100%;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(1px 1px 0 #000);
  }
</style>
