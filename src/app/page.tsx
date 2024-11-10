import MaxWidthWrapper from "@/components/MaxWidthWrapper.";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <MaxWidthWrapper className="mt-40 md:mt-28 mb-12 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 flex justify-center items-center max-w-fit space-x-2 rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur  transition-all hoover:border-gray-300 hover:bg-white/50  overflow-hidden">
      <p className="text-sm font-semibold text-gray-700">
        Auditor is now live!
      </p>
      </div>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl ">
        Chat with your <span className="text-blue-600">documents</span> in seconds.
      </h1>
      <p className="mt-5 maxx-w-prose text-zinc-700 sm:text-lg">
        Auditor allows you to have conversationwith any PDF document. Simply upload your file and start asking questions right away.
      </p>
      <Link className={buttonVariants({
        size: "lg",
        className: "mt-5",
      })} href="/dashboard" target="_blank">
      Get  started <ArrowRightIcon className="ml-2 w-5 h-5"/>
      </Link>
    </MaxWidthWrapper>
    <div className="">
      <div className="relative isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
          style={
            clip
          } 
          className="relative left-[calc(50% - 11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-1 sm:left-[calc(50% - 30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
    </>
  );
}
