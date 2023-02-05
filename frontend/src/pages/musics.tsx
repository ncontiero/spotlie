import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import type { MusicProps } from "@/utils/types";

import { Meta } from "@/components/Meta";
import { SimpleMusicCard } from "@/components/MusicCard";

export default function MusicsPage() {
  const skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [query, setQuery] = useState("");

  const { data: musics, isFetching } = useQuery<MusicProps[]>({
    queryKey: ["all-musics"],
    queryFn: async () => {
      const { data } = await api.get("/musics");
      return data;
    },
    staleTime: 1000 * 60,
  });

  const filteredMusics =
    query === ""
      ? musics
      : musics?.filter((music) =>
          music.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <>
      <Meta title="Músicas" path="/musics" />
      <div className="px-4 sm:px-9 mt-6">
        <div className="flex gap-2 flex-wrap justify-between items-center">
          <h1 className="text-2xl font-bold">Músicas</h1>
          <label className="sr-only" htmlFor="searchForMusic">
            Procure por uma música
          </label>
          <input
            type="text"
            placeholder="Procure por uma música..."
            id="searchForMusic"
            className="bg-black/30 pl-4 pr-2 sm:px-5 py-2 rounded-3xl focus:outline-none focus:ring-2 ring-purple-500"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div
          className={`${
            filteredMusics?.length === 0 && query !== "" ? "flex" : "grid"
          } grid-cols-1 sm:grid-cols-2 gap-1 pt-6`}
        >
          {isFetching || !filteredMusics ? (
            skeletonItems.map((i) => (
              <div
                key={i}
                className="flex items-center px-4 py-2 rounded-md gap-3"
              >
                <div className="relative rounded-lg min-w-[50px] min-h-[50px]">
                  <div className="rounded-lg w-[50px] h-[50px] bg-black/40 animate-pulse" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <span className="h-6 w-1/3 bg-black/20 rounded-lg animate-pulse" />
                  <span className="h-5 w-1/3 bg-black/20 rounded-lg animate-pulse" />
                </div>
              </div>
            ))
          ) : filteredMusics.length === 0 && query !== "" ? (
            <div className="col-span-2 w-full flex flex-col justify-center py-4 px-4">
              <span className="text-center mt-4">
                Nenhuma música encontrada
              </span>
            </div>
          ) : (
            filteredMusics.map((music) => (
              <SimpleMusicCard key={music.id} music={music} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
