import type { APIContext } from "astro";

export const prerender = false;

export async function GET({ redirect }: APIContext) {
  return redirect("https://social.myl.moe/.well-known/webfinger", 301);
}
