import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const email = body.email;
  if (email === "") {
    return new Response(null, { status: 400 });
  }
  if (request.headers.get("Content-Type") === "application/json") {
    return new Response(
      JSON.stringify({
        message: "Your email was: " + email,
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
};
