"use client";

import type { ArtistPropsWithMusics } from "@/utils/types";

import { useMemo, useState } from "react";
import { useMusic } from "@/hooks/useMusic";

import Image from "next/image";
import Link from "next/link";
import { SimpleButtonControl } from "../MusicCard/SimpleControlButton";

interface SimpleArtistCardProps {
  artist: ArtistPropsWithMusics;
}

export function SimpleArtistCard({ artist }: SimpleArtistCardProps) {
  const { currentMusic, musicState } = useMusic();
  const [buttonFocus, setButtonFocus] = useState(false);
  const musicIsPlaying = useMemo(() => {
    return artist.musics.find((m) => m.id === currentMusic?.id)
      ? musicState === "playing"
      : false;
  }, [artist.musics, currentMusic?.id, musicState]);

  return (
    <div className="group relative flex h-16 snap-center items-center gap-3 rounded-lg bg-secondary/50 px-2 py-1">
      <Link
        href={`/artist/${artist.id}`}
        className="absolute inset-0 z-10 rounded-lg ring-ring duration-200 focus:outline-none focus:ring-2"
        aria-label={artist.username}
        title={artist.username}
        onFocus={() => setButtonFocus(true)}
        onBlur={() => setButtonFocus(false)}
      />
      <div className="absolute inset-0 z-[-1] size-full scale-95 rounded-lg bg-secondary opacity-0 duration-300 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100" />
      <div className="relative size-[50px] min-h-[50px] min-w-[50px] rounded-full bg-background bg-gradient-to-tr from-background/60 to-primary/20 shadow-lg shadow-background/60">
        {artist.image && (
          <Image
            alt={artist.username}
            src={artist.image}
            className="aspect-square rounded-full object-cover"
            fill
          />
        )}
        {artist.musics.length > 0 && (
          <SimpleButtonControl
            music={artist.musics[0]!}
            playlist={artist.musics}
            buttonFocus={buttonFocus}
            musicIsPlaying={musicIsPlaying}
            radius="rounded-full"
          />
        )}
      </div>
      <div className="flex w-full flex-col items-start truncate">
        <h3 className="w-full truncate rounded-lg text-lg font-bold group-hover:underline">
          {artist.username}
        </h3>
        <p className="w-full max-w-fit truncate text-sm text-foreground/60">
          Artist
        </p>
      </div>
    </div>
  );
}
