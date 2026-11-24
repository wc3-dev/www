import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = ({ request }) => redirect(308, "/moonwell/" + new URL(request.url).search);
