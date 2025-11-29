"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleAuthAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const isSignin = formData.get("isSignin") === "true"; 

  const endpoint = isSignin ? "signin" : "signup";

  try {
    const response = await fetch(`http://localhost:3001/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        name: isSignin ? undefined : name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || "Authentication failed" };
    }
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, 
        path: "/",
    });

  } catch (error) {
    return { message: "Network error or server is down" };
  }

  redirect("/room");
}