// Fetches the interface textures the site uses from github.com/Gethe/wow-ui-textures and writes them to static/ui/,
// cut and arranged so that CSS can draw them. Run with `npm run textures`; the results are committed, so a build never
// fetches anything.

import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = "https://raw.githubusercontent.com/Gethe/wow-ui-textures/live/";
const out = new URL("../static/ui/", import.meta.url);

async function fetchTexture(path) {
  const response = await fetch(source + path);
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

function write(image, name) {
  return image.toFile(fileURLToPath(new URL(name, out)));
}

// The game keeps a frame's edge as one strip of eight squares: left, right, top, bottom, then the corners top-left,
// top-right, bottom-left, bottom-right, with the top and bottom edges stored standing up. This lays them out as a
// 3 by 3 grid with an empty middle, the shape CSS's border-image slices.
async function nineSlice(path, size, name) {
  const strip = await fetchTexture(path);
  const square = (i, rotate = 0) =>
    sharp(strip)
      .extract({ left: i * size, top: 0, width: size, height: size })
      .rotate(rotate)
      .png()
      .toBuffer();
  const pieces = [
    [4, 0, 0, 0],
    [2, 90, 1, 0],
    [5, 0, 2, 0],
    [0, 0, 0, 1],
    [1, 0, 2, 1],
    [6, 0, 0, 2],
    [3, 90, 1, 2],
    [7, 0, 2, 2],
  ];
  const composite = await Promise.all(
    pieces.map(async ([i, rotate, x, y]) => ({
      input: await square(i, rotate),
      left: x * size,
      top: y * size,
    })),
  );
  const grid = sharp({
    create: {
      width: size * 3,
      height: size * 3,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  });
  await write(grid.composite(composite).png(), name);
}

// A texture cut to the part the game shows, given as left, top, right and bottom in pixels.
async function crop(path, [left, top, right, bottom], name) {
  const image = sharp(await fetchTexture(path)).extract({
    left,
    top,
    width: right - left,
    height: bottom - top,
  });
  await write(image.png(), name);
}

async function copy(path, name) {
  await write(sharp(await fetchTexture(path)).png(), name);
}

await mkdir(out, { recursive: true });
await Promise.all([
  nineSlice("DialogFrame/UI-DialogBox-Gold-Border.PNG", 32, "frame-gold.png"),
  nineSlice("DialogFrame/UI-DialogBox-Border.PNG", 32, "frame-silver.png"),
  nineSlice("Tooltips/UI-Tooltip-Border.PNG", 16, "frame-tooltip.png"),
  copy("DialogFrame/UI-DialogBox-Background-Dark.PNG", "frame-background.png"),
  crop("DialogFrame/UI-DialogBox-Gold-Header.PNG", [58, 0, 197, 40], "header-gold.png"),
  crop("DialogFrame/UI-DialogBox-Header.PNG", [118, 3, 394, 80], "header-stone.png"),
  crop("DialogFrame/UI-DialogBox-Divider.PNG", [0, 0, 193, 16], "divider.png"),
  crop("Buttons/UI-Panel-Button-Up.PNG", [0, 0, 80, 22], "button-up.png"),
  crop("Buttons/UI-Panel-Button-Down.PNG", [0, 0, 80, 22], "button-down.png"),
  crop("Buttons/UI-Panel-Button-Highlight.PNG", [0, 0, 80, 22], "button-highlight.png"),
  crop("COMMON/Common-Input-Border.PNG", [0, 0, 128, 20], "input.png"),
  crop("MainMenuBar/MainMenuBar.PNG", [223, 212, 520, 256], "action-bar.png"),
  crop("MainMenuBar/UI-MainMenuBar-EndCap-Dwarf.PNG", [0, 52, 128, 128], "gryphon.png"),
  write(
    sharp(await fetchTexture("FrameGeneral/UI-Background-Rock.PNG")).jpeg({ quality: 82 }),
    "rock.jpg",
  ),
]);
