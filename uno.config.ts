import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "@unocss/vite";

// Used by the landing page's build and the docs'.
export default defineConfig({
  presets: [presetWind4()],
  // In cascade layers, the site's own CSS always wins over the reset and the utilities.
  outputToCssLayers: true,
  rules: [
    [
      "sr-only",
      {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        "clip-path": "inset(50%)",
        "white-space": "nowrap",
        "border-width": "0",
      },
    ],
  ],
});
