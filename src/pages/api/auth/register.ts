import type { APIRoute } from "astro";
import { hash } from "bcrypt-ts";
import { XataClient } from "../../../xata";
const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH,
});

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }
  const hashedPassword = await hash(password as string, 10);

  const record = await xata.db.User.create({
    email,
    hashedPassword,
  });

  if (!record) {
    return new Response("Error", { status: 500 });
  }

  return redirect("/signin");
};
