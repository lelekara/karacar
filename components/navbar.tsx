import { CarFront, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user?.role === "admin";

  return (
    <nav className="border-b px-4 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <CarFront className="h-7 w-7" />

          <span className="text-xl font-extrabold text-black-500 group-hover:text-red-500 transition-colors">
            Karacar
          </span>
        </Link>
        <div className="flex gap-3">
          {session ? (
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/sign-in");
              }}
              className="flex gap-3"
            >
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center rounded-xl bg-black px-5 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 transition-transform
                "
                >
                  Dashboard
                </Link>
              )}
              <Button
                type="submit"
                className="inline-flex items-center rounded-xl bg-black px-5 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 transition-transform
                "
              >
                <LogOut className="h-5 w-5" />
                Déconnexion
              </Button>
            </form>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center rounded-xl bg-black px-5 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 transition-transform"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
