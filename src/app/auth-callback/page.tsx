"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { TRPCError } from "@trpc/server";

const Page = () => {

    const router = useRouter(); // we use useRputer from next/navigation and not from ext/router becuse it was not being used after nextjs 12.

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    trpc.authCallback.useQuery( undefined, {
        
        onSuccess: ({ success }: { success: boolean }) => {
            if(success){
                //user is synced to db
                router.push(origin ? `/${origin}` : "/dashboard")
            }
        },
        
        onError: (err) => {
            if(err.data?.code === "UNAUTHORIZED"){
                router.push("/sign-in")
            }
        },
        retry: true,
        retryDelay: 500
    } )

    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-800"/>
                <h3 className="font-semibold text-xl">Setting up your account...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )

    
}

export default Page;