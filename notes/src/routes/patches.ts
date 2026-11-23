const newestFirst = new Intl.Collator("en", { numeric: true });

export const patches = Object.keys(import.meta.glob("./[0-9]*/+page.md"))
  .map((path) => path.split("/")[1])
  .sort((a, b) => newestFirst.compare(b, a))
  .map((version) => ({ title: `Patch ${version}`, href: `/${version}/` }));
