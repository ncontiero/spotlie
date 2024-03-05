import { cache } from "react";
import { auth } from "@clerk/nextjs";
import { env } from "@/env.mjs";

import { type FetcherOpts, fetcher } from "./fetcher";

export const serverFetcher = cache(
  async <T>(path: string, opts?: FetcherOpts & { needAuth?: boolean }) => {
    if (!opts?.needAuth) return fetcher<T>(path, opts);
    const jwtTemplate = env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE_NAME;
    const token = await auth().getToken({ template: jwtTemplate });
    return fetcher<T>(path, { ...opts, token });
  },
);
