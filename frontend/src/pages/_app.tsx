import "@/styles/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { MusicContextProvider } from "@/context/MusicContext";
import { useRouter } from "next/router";
import { queryClient } from "@/lib/queryClient";

import type { AppProps } from "next/app";

import { Header } from "@/components/Header";
import { Player } from "@/components/Player";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <MusicContextProvider>
        <div className="bg-violet-900 bg-gradient-to-b from-black/60 to-black fixed inset-0 -z-[1]" />
        <div
          className={`${
            router.pathname !== "/player" &&
            "max-w-[1600px] min-w-[320px] m-auto"
          }`}
        >
          {router.pathname !== "/player" && <Header />}
          <div
            className={`${
              router.pathname !== "/player" && "pt-[72px] pb-[90px]"
            }`}
          >
            <Component {...pageProps} />
          </div>
          {router.pathname !== "/player" && <Player />}
        </div>
      </MusicContextProvider>
    </QueryClientProvider>
  );
}
