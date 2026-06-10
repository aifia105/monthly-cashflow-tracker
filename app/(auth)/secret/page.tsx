"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { verifySecretAction } from "./actions";

const page = () => {
  const router = useRouter();
  const [phrase, setPhrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hashString = async (str: string) => {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phrase) return;

    setLoading(true);
    setError("");

    try {
      const hashedPhrase = await hashString(phrase);
      const isValid = await verifySecretAction(hashedPhrase);

      if (isValid) {
        router.push("/dashboard");
      } else {
        setError("That's not the correct secret phrase. nice try though! 😉");
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center py-32 px-16 sm:items-start">
      <div className="p-4 max-w-7xl space-y-2 md:space-y-6 relative z-10 w-full text-center mx-auto">
        <h3 className="mt-4 font-normal text-base md:text-2xl text-zinc-400  ">
          You need the secret phrase to get access
        </h3>
        <p className="mt-4 font-normal text-sm md:text-base text-zinc-500 leading-relaxed ">
          Enter the secret phrase here <br /> (If you know it 😉).
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <input
            type="password"
            placeholder="secret phrase"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            className="mt-2 px-8 py-3 border border-zinc-500 text-zinc-200 bg-transparent text-[16px] font-medium rounded-md focus:outline-none focus:border-zinc-300"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col items-center gap-3">
            <Button
              type="submit"
              variant={"secondary"}
              disabled={loading}
              className="mt-2 px-6 py-4 border border-white text-[16px] font-medium bg-white/60 text-zinc-900 hover:bg-white  transition-colors"
            >
              {loading ? "Verifying..." : "try it out"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default page;
