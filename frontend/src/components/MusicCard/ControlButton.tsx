"use client";

import type { MusicProps } from "@/utils/types";

import { useMemo } from "react";
import { useMusic } from "@/hooks/useMusic";

import { Button } from "@/components/ui/Button";
import Image from "next/image";

import { Pause, Play } from "@phosphor-icons/react";

interface ControlButtonProps {
  music: MusicProps;
  playlist?: MusicProps[];
  buttonFocus?: boolean;
  radius?: "rounded-lg" | "rounded-full";
  orientation?: "horizontal" | "vertical";
}

function ButtonContent({
  musicIsPlaying = false,
  buttonFocus = false,
  orientation = "vertical",
}: {
  musicIsPlaying?: boolean;
  buttonFocus?: boolean;
  orientation?: "horizontal" | "vertical";
}) {
  return musicIsPlaying ? (
    <>
      <Image
        src="/musicPlaying.gif"
        alt="Music is playing"
        className={`${
          buttonFocus ? "hidden" : "flex"
        } group-hover:hidden group-focus/button:hidden group-focus:hidden`}
        height={24}
        width={24}
      />
      <Pause
        size={24}
        weight="fill"
        className={`${buttonFocus ? "flex" : "hidden"} ${
          orientation === "horizontal" &&
          "duration-200 group-hover/button:text-primary"
        } group-hover:flex group-focus/button:flex group-focus:flex`}
      />
    </>
  ) : (
    <Play
      size={24}
      weight="fill"
      className={
        orientation === "horizontal"
          ? `${
              buttonFocus ? "scale-100" : "scale-0"
            } duration-200 group-hover:scale-100 group-hover/button:text-primary group-focus/button:scale-100`
          : ""
      }
    />
  );
}

export function ControlButton({
  music,
  playlist,
  radius = "rounded-lg",
  buttonFocus = false,
  orientation = "vertical",
}: ControlButtonProps) {
  const { currentMusic, musicState, playMusic, pauseMusic } = useMusic();
  const musicIsPlaying = useMemo(
    () => currentMusic?.id === music.id && musicState === "playing",
    [currentMusic?.id, music.id, musicState],
  );

  return orientation === "vertical" ? (
    <Button
      type="button"
      className={`group/button absolute bottom-0 right-0 z-20 mb-2 mr-3 h-12 w-12 ${
        musicIsPlaying ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } focus:translate-y-0 focus:opacity-100 group-hover:translate-y-0 group-hover:opacity-100`}
      radius="full"
      size="icon"
      title={`${musicIsPlaying ? "Pause" : "Play"} ${music.title}`}
      onClick={() =>
        musicIsPlaying ? pauseMusic() : playMusic(music, playlist)
      }
    >
      <ButtonContent
        musicIsPlaying={musicIsPlaying}
        buttonFocus={buttonFocus}
        orientation={orientation}
      />
    </Button>
  ) : (
    <button
      type="button"
      className={`group/button absolute inset-0 z-20 flex size-full items-center justify-center ${radius} border-2 border-transparent bg-black/50 ${
        musicIsPlaying || buttonFocus ? "opacity-100" : "opacity-0"
      } duration-200 focus:opacity-100 focus:outline-none focus-visible:border-primary group-hover:opacity-100`}
      onClick={() =>
        musicIsPlaying ? pauseMusic() : playMusic(music, playlist)
      }
      title={`${musicIsPlaying ? "Pause" : "Play"} ${music.title}`}
    >
      <ButtonContent
        musicIsPlaying={musicIsPlaying}
        buttonFocus={buttonFocus}
        orientation={orientation}
      />
    </button>
  );
}
