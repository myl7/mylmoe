export const prerender = false;

export async function GET() {
  return new Response(
    JSON.stringify({
      "m.server": "chat.myl.moe:443",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization",
      },
    },
  );
}
