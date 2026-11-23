import { error, redirect } from "@sveltejs/kit";
import { moonwellSections } from "../../lib/nav";
import type { EntryGenerator, RequestHandler } from "./$types";

const redirects = new Map<string, string>();
for (const { pages, title } of moonwellSections) {
  for (const { href } of pages) {
    const path = href.slice("/moonwell/".length, -1);
    redirects.set(path, href);
    if (title === "Guides") redirects.set(`guides/${path}`, href);
  }
}

export const prerender = true;
export const trailingSlash = "always";
export const entries: EntryGenerator = () => [...redirects.keys()].map((legacy) => ({ legacy }));

export const GET: RequestHandler = ({ params, request }) => {
  const target = redirects.get(params.legacy.replace(/\/$/, ""));
  if (!target) error(404, "Page not found");
  redirect(308, target + new URL(request.url).search);
};
