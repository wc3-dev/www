(() => {
  const options = {
    "docs-bar": "Docs Bar",
    portal: "Developer Portal",
    atlas: "Atlas",
    reference: "Reference Desk",
    handbook: "Handbook",
  };
  const wrap = new URLSearchParams(location.search).get("wrap");
  if (document.documentElement.dataset.theme !== "quest" || !Object.hasOwn(options, wrap)) return;

  const docs = "https://docs.wc3.dev/";
  const paths = {
    Guides: "#guides",
    Reference: "#reference",
    "Project & World Editor": "guides/project-and-editor/",
    Objects: "guides/objects/",
    "CLI & Build": "reference/cli-and-build/",
    "Runtime API": "reference/runtime-api/",
    "Diagnostics & Errors": "reference/diagnostics/",
  };
  const links = (...titles) => titles.map(title => `<a href="${docs}${paths[title]}">${title}</a>`).join("");
  const brand = `<a class="ws-brand" href="${docs}">Moonwell</a>`;
  const home = '<a href="https://wc3.dev/">wc3.dev</a>';
  const breadcrumb = `<nav class="ws-crumb" aria-label="Breadcrumb"><a href="${docs}">Docs</a><i>/</i>${links("Guides")}<i>/</i><span aria-current="page">Getting Started</span></nav>`;
  const resources = `<details class="ws-menu"><summary>Reference</summary><nav aria-label="Reference pages">${links("CLI & Build", "Runtime API", "Diagnostics & Errors")}</nav></details>`;
  const mast = `<header class="ws-mast"><div class="ws-bar">${brand}<nav class="ws-nav" aria-label="Site">${links("Guides")}${resources}${home}</nav></div></header>`;

  let header = mast;
  let beforeLog = breadcrumb;
  let companion = "";
  if (wrap === "portal") {
    header = `<header class="ws-rail"><div>${brand}<p>Developer portal</p></div>
      <nav aria-label="Developer portal"><strong>Documentation</strong><a aria-current="location" href="#guide">Guide library</a>
      <strong>Reference</strong>${links("CLI & Build", "Runtime API", "Diagnostics & Errors")}</nav>
      <div class="ws-rail-foot">${home}</div></header>`;
    beforeLog = `<div class="ws-pagehead">${breadcrumb}<p>Guide library</p></div>`;
  } else if (wrap === "atlas") {
    header += `<div class="ws-atlas-intro"><div><p class="ws-display">Guide atlas</p>
      <p>Explore the Moonwell guides for building Warcraft III maps.</p>
      <div class="ws-atlas-links">${links("Project & World Editor", "Objects")}</div></div></div>`;
  } else if (wrap === "reference") {
    beforeLog = `<div class="ws-deskhead"><p>Documentation</p>${breadcrumb}</div>`;
    companion = `<aside class="ws-resources"><h2>Reference desk</h2>
      <a href="${docs}${paths["CLI & Build"]}">CLI &amp; Build<small>Commands and build flags</small></a>
      <a href="${docs}${paths["Runtime API"]}">Runtime API<small>Types and reaction hooks</small></a>
      <a href="${docs}${paths["Diagnostics & Errors"]}">Diagnostics &amp; Errors<small>Compiler and build errors</small></a>
      <h2>Downloads</h2><a href="https://dotnet.microsoft.com/download/dotnet/10.0">.NET 10 SDK</a>
      <a href="https://warcraft3.blizzard.com/">Warcraft III: Reforged</a></aside>`;
  } else if (wrap === "handbook") {
    header = `<header class="ws-handbook"><div class="ws-imprint"><a href="https://wc3.dev/">wc3.dev</a><span>Warcraft III modding</span></div>
      <a class="ws-nameplate" href="${docs}">The Moonwell Handbook</a>
      <nav aria-label="Handbook sections">${links("Guides", "Reference", "Project & World Editor")}</nav></header>`;
  }

  document.documentElement.dataset.wrap = wrap;
  document.title = `${options[wrap]} · Getting Started · Moonwell`;
  const log = document.querySelector("main.window");
  const comparison = Object.entries(options).map(([id, name]) =>
    `<a href="?wrap=${id}"${wrap === id ? ' aria-current="page"' : ""}>${name}</a>`).join("");
  log.insertAdjacentHTML("beforebegin", `<nav class="ws-compare" aria-label="Compare website wrappers"><a href="?theme=quest">Original</a>${comparison}</nav>
    <div class="ws-site">${header}<div class="ws-body">${beforeLog}<div class="ws-columns"><div class="ws-log"></div>${companion}</div></div>
    <div class="ws-foot" role="contentinfo"><span>Moonwell Documentation</span><a href="${docs}">Live docs</a></div></div>`);
  document.querySelector(".ws-log").append(log);
})();
