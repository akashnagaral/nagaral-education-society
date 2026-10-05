import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PortalClient } from "@/components/PortalClient";
import { getSessionUser } from "@/lib/portal-session";

export const metadata: Metadata = {
  title: "Portal",
};

export default async function PortalPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  // CEO should use login → new tab; if they hit /portal, send home
  if (user.role === "ceo") redirect("/");
  return <PortalClient />;
}
