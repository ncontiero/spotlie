import type { AnchorHTMLAttributes } from "react";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Headphones, House, SpotifyLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { UserButton } from "./UserButton";

function HeaderLink({
  href = "/",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      className="flex size-full items-center justify-center gap-2 rounded-full p-2 uppercase ring-ring duration-200 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 active:opacity-70 sm:w-auto sm:rounded-3xl sm:px-4 sm:py-2"
      {...props}
    />
  );
}

export async function Header() {
  const user = await currentUser();
  const userPublicMetadata = user?.publicMetadata;
  const externalId = (userPublicMetadata?.external_id as string) || null;
  const isArtist = (userPublicMetadata?.is_artist as boolean) || false;

  const navLinks = [
    {
      href: "/",
      label: "Home",
      title: "Go to Home",
      if: true,
      icon: House,
    },
    {
      href: "/library",
      label: "Library",
      title: "Go to your library",
      if: user,
      icon: Headphones,
    },
  ];

  return (
    <header className="sticky inset-x-0 top-0 z-[9999] h-[72px] w-full border-b bg-secondary/60 backdrop-blur-md">
      <ul className="m-auto flex size-full max-w-[1600px] items-center justify-between gap-2 px-6">
        <div className="flex">
          <li className="mr-3">
            <Link
              href="/"
              className="group focus:outline-none"
              title="Go to Home"
            >
              <SpotifyLogo
                weight="fill"
                size={50}
                className="rounded-full text-primary ring-ring duration-200 group-focus:ring-2"
              />
            </Link>
          </li>
          {navLinks.map(
            (navLink) =>
              !!navLink.if && (
                <li
                  key={navLink.label}
                  className="mr-2 flex size-12 items-center sm:w-auto"
                >
                  <HeaderLink href={navLink.href} title={navLink.title}>
                    <navLink.icon size={24} weight="fill" />{" "}
                    <span className="hidden font-bold sm:block">
                      {navLink.label}
                    </span>
                  </HeaderLink>
                </li>
              ),
          )}
        </div>
        <div className="flex items-end">
          <SignedOut>
            <HeaderLink
              href="/sign-in"
              className="flex size-full items-center justify-center gap-2 rounded-full p-2 uppercase ring-ring duration-200 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 active:opacity-70 sm:w-auto sm:rounded-3xl sm:px-4 sm:py-2"
            >
              Login
            </HeaderLink>
          </SignedOut>
          <SignedIn>
            <UserButton externalId={externalId} isArtist={isArtist} />
          </SignedIn>
        </div>
      </ul>
    </header>
  );
}
