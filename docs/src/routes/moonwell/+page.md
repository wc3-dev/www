---
title: Moonwell
description: "All-in-one modding framework for Warcraft III: Reforged."
---

<script>
import LinkCard from "#docs/LinkCard.svelte";
</script>

Moonwell is a C# modding framework and build toolchain for [Warcraft III: Reforged](https://warcraft3.blizzard.com/).

With **Moonwell**, a map is a C# project (`MyMap.csproj`) and a Warcraft III map saved as a folder (`map/`).

```text
MyMap/
├── MyMap.csproj
├── Map.cs
├── Start.cs
├── Champion/
│   ├── Champion.cs
│   ├── Fury.cs
│   └── Smite.cs
└── map/
```

You declare the map's settings, its units, heroes, items, abilities, buffs, destructables, doodads, and upgrades, all in code.

```csharp
public sealed class Settings : Map
{
    public Settings()
    {
        Name = "MyMap";
        Description = "A map made with Moonwell.";
        RecommendedPlayers = "1";
        Components.Add(new Start());
    }
}

public sealed class Champion : Paladin
{
    public Champion()
    {
        Name = "Champion";
        HitPoints = HitPoints + 200;
        HeroAbilities.Remove<HolyLight>();
        HeroAbilities.Add<Smite>();
        Components.Add(new Fury());
    }
}
```

You use the World Editor for terrain and placing things like regions, cameras, units, items, and trees.

```sh
moonwell build # writes declared object data into a staged copy of the map, compiles your C# into Lua, and packs the .w3x archive.
```

## Guides

<div class="cards">
  <LinkCard
    title="Getting Started"
    description="Install the template and CLI, make a map, and run it in Warcraft III."
    href="/moonwell/getting-started/"
  />
  <LinkCard
    title="Project & World Editor"
    description="Project folders, map settings, custom assets, and saving built objects back to World Editor."
    href="/moonwell/project-and-editor/"
  />
  <LinkCard
    title="Objects"
    description="Declare units, heroes, items, abilities, buffs, destructables, doodads, and upgrades as C# classes."
    href="/moonwell/objects/"
  />
  <LinkCard
    title="Actors, Components & Reactions"
    description="Attach state and reaction hooks to units, items, destructables, players, and the game."
    href="/moonwell/components-and-reactions/"
  />
  <LinkCard
    title="Abilities, Buffs & Timers"
    description="React to casts, apply timed and ticking buffs, schedule timers, and manage ownership."
    href="/moonwell/abilities-buffs-and-timers/"
  />
  <LinkCard
    title="Multiplayer"
    description="Run machine-local code with Local.For and catch desyncs as compile errors."
    href="/moonwell/multiplayer/"
  />
</div>

## Reference

<div class="cards">
  <LinkCard
    title="CLI & Build"
    description="Commands, flags, build pipeline steps, development vs. release builds, and error logs."
    href="/moonwell/reference/cli-and-build/"
  />
  <LinkCard
    title="Runtime API"
    description="All public types, properties, methods, and reaction hooks in the Moonwell runtime."
    href="/moonwell/reference/runtime-api/"
  />
  <LinkCard
    title="Objects & Natives API"
    description="Moonwell.Objects base classes, attributes, race namespaces, hand-picked fields, and Moonwell.Natives."
    href="/moonwell/reference/objects-and-natives/"
  />
  <LinkCard
    title="Diagnostics & Errors"
    description="Multiplayer analyzer rules MW0001–MW0006, sync attributes, string literal checks, and build errors."
    href="/moonwell/reference/diagnostics/"
  />
</div>
