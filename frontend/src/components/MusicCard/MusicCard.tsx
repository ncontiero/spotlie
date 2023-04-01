import { useMusic } from "@/hooks/useMusic";
import type { MusicProps } from "@/utils/types";

import Image from "next/image";
import Link from "next/link";

import { Pause, Play } from "@phosphor-icons/react";

interface MusicCardProps {
  music: MusicProps;
  playlist?: MusicProps[];
}

export function MusicCard({ music, playlist }: MusicCardProps) {
  const { playMusic, musicState, currentMusic, pauseMusic } = useMusic();

  return (
    <div className="py-1 max-w-[178px] snap-center">
      <button
        type="button"
        title={`${
          musicState === "playing" && currentMusic?.id === music.id
            ? "Pausar"
            : "Reproduzir"
        } ${music.title}`}
        onClick={() =>
          musicState === "playing" && music.id === currentMusic?.id
            ? pauseMusic()
            : playMusic(music, playlist)
        }
        className="relative rounded-lg overflow-hidden block min-h-[178px] min-w-[178px] group outline-none focus-visible:ring ring-purple-600 duration-200"
      >
        <Image
          className="aspect-square object-cover shadow-xl shadow-black/60 bg-black/20"
          src={music.cover}
          alt={music.title}
          width={178}
          height={178}
          priority
        />
        <div
          className={`absolute justify-center items-center inset-0 ${
            music.id === currentMusic?.id
              ? "flex bg-black/50"
              : "hidden group-hover:flex group-hover:bg-black/50 group-focus-visible:flex group-focus-visible:bg-black/50"
          }`}
        >
          <div className="p-3 bg-purple-600/40 backdrop-blur-sm rounded-full hover:scale-110 duration-200">
            {musicState === "playing" && currentMusic?.id === music.id ? (
              <>
                <Image
                  src="/musicPlaying.gif"
                  alt="Música tocando"
                  className="flex group-hover:hidden group-focus:hidden"
                  height={32}
                  width={32}
                />
                <Pause
                  size={32}
                  weight="fill"
                  className="hidden group-hover:flex group-focus:flex"
                />
              </>
            ) : (
              <Play size={32} weight="fill" />
            )}
          </div>
        </div>
      </button>
      <div className="flex flex-col mt-2 gap-0.5 text-base font-normal truncate">
        <Link
          href={`/music/${music.id}`}
          title={music.title}
          className="truncate pr-2.5 focus:text-purple-400 hover:text-purple-400 active:opacity-70 duration-200 focus:outline-none"
        >
          {music.title}
        </Link>
        <div className="truncate pr-2.5">
          <Link
            key={music.artist.id}
            title={music.artist.name}
            href={`/artist/${music.artist.id}`}
            className="focus:text-purple-400 hover:text-purple-400 active:opacity-70 duration-200 focus:outline-none"
          >
            {music.artist.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
