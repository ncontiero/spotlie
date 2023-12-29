import type { Metadata } from "next";

import { currentUser, UserProfile } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import NextLink from "next/link";
import { Link } from "@/components/ui/Link";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function UserSettingsPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in?redirect_url=/settings");
  }
  const publicMetadata = user.publicMetadata;
  const isArtist = (publicMetadata.is_artist as boolean) || false;
  const externalId = (publicMetadata.external_id as string) || null;

  return (
    <div className="mx-auto my-10 flex justify-center sm:container">
      <div className="flex flex-col items-start space-y-6">
        {externalId && (
          <h1 className="px-2">
            <Link asChild className="text-3xl">
              <NextLink href={`/${isArtist ? "artist" : "user"}/${externalId}`}>
                @{user.username}
              </NextLink>
            </Link>
          </h1>
        )}
        <UserProfile
          path="/settings"
          routing="path"
          appearance={{
            elements: {
              navbar: "hidden",
              navbarMobileMenuRow: "hidden",
              card: "mx-0 shadow-none",
              pageScrollBox: "px-4 sm:px-8 py-9",
              rootBox: "w-full flex justify-center",
            },
          }}
        />
      </div>
    </div>
  );
}
