"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DevTools />

      {children}
    </QueryClientProvider>
  );
};

// app/getQueryClient.jsx
// import { QueryClient } from "@tanstack/react-query";
// import { cache } from "react";

// const getQueryClient = cache(() => new QueryClient());
// export default getQueryClient;
