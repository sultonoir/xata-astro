import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";

import { compare } from "bcrypt-ts";
import { XataClient } from "@/xata";
const xata = new XataClient({
  apiKey: import.meta.env.XATA_API_KEY,
  branch: import.meta.env.XATA_BRANCH,
});

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const user = await xata.db.User.filter({
    email,
  }).getFirst();

  if (!user) {
    return new Response("user not found", { status: 400 });
  }

  const isCorrectPassword = await compare(
    password,
    user.hashedPassword as string
  );

  if (!isCorrectPassword) {
    return new Response("Wrong password", { status: 400 });
  }

  const secret = import.meta.env.JWT_SECRET;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  cookies.set("session", token, {
    sameSite: "strict",
    httpOnly: true,
    path: "/",
    secure: true,
    maxAge: MAX_AGE,
  });

  return redirect("/");
};

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: "This was a GET!",
    })
  );
};
