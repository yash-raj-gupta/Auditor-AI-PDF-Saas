import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

const Page = () => {

    const router = useRouter(); // we use useRputer from next/navigation and not from ext/router becuse it was not being used after nextjs 12.

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    const {data, isLoading} = trpc.authCallback.useQuery(undefined, {
        onSuccess: ({success}) => {
            if(success){
                router.push(origin ? `/${origin}` : "/dashboard")
            }
        }
    } )

    
}

export default Page;