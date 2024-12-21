import { PropsWithChildren, useState } from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {trpc} from '@/app/_trpc/client'
import { httpBatchLink } from "@trpc/client";

const Providers = ({children}:  PropsWithChildren) => {  // propswithchildren is same as {children: ReactNode}

    const[queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() => trpc.createClient({
          links: [
            httpBatchLink({
                url: 'http://localhost:3000/api/trpc',
            })
          ]
    }) )

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
           <QueryClientProvider client={queryClient}> 
            {/* this queryclient provider is used so that we can use react query independently of tRPC as tRPC is a thin wrapper around it */}
           {children}
           </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers;