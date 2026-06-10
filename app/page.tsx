"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center py-32 px-16 sm:items-start">
      <div className="p-4 max-w-7xl space-y-2 md:space-y-6 relative z-10 w-full text-center mx-auto">
        <h1 className="text-6xl md:text-7xl font-medium text-zinc-200 tracking-[-2px] leading-[1.1] font-">
          Montra
        </h1>
        <h3 className="mt-4 font-normal text-base md:text-2xl text-zinc-400  ">
          I built this so you stop being broke
        </h3>
        <p className="mt-4 font-normal text-sm md:text-base text-zinc-500 leading-relaxed ">
          Track your money, and see where your cash actually goes <br />{" "}
          (it&apos;s worse than you think).
        </p>
        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={() => router.push("/dashboard")}
            className="mt-2 px-6 py-4 border border-white text-zinc-200 text-[16px] font-medium hover:bg-white/60 hover:text-zinc-900 transition-colors"
          >
            Find out here
          </Button>
        </div>
      </div>
    </main>
  );
}
