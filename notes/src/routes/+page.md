---
title: Patch Notes
description: Browse the archived Warcraft III Reforged patch notes by version.
---

<script>
import { patches } from "./patches";
</script>

<ul>
  {#each patches as patch}
    <li><a href={patch.href}>{patch.title}</a></li>
  {/each}
</ul>
