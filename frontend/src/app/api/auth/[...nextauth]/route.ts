
export const dynamic = "force-static";
export const revalidate = false;

import { handlers } from "@/auth"; // Referring to the auth.ts we just created

export function generateStaticParams() {
  return [
    { nextauth: ["signin"] },
    { nextauth: ["signout"] },
    { nextauth: ["callback"] },
    { nextauth: ["session"] },
    { nextauth: ["csrf"] },
    { nextauth: ["providers"] },
  ];
}

export const { GET, POST } = handlers;
