"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function SignInPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });

      if (error) {
        throw error;
      }
    } catch {
      alert("Please try again.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <button
      className="mt-4 relative flex items-center justify-between w-auto min-w-min max-w-lg py-0 px-3.5 h-10 text-[14px] font-medium text-[#1f1f1f] bg-white border border-gray-200 rounded-md cursor-pointer transition duration-200 hover:border-gray-700 hover:shadow-md focus:shadow-outline active:bg-gray-800 disabled:bg-white/60 disabled:border-[#1f1f1f1f] disabled:cursor-default disabled:opacity-38"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
    >
      <div className="absolute inset-0 opacity-0 transition duration-200"></div>
      <div className="flex items-center h-full w-full">
        <div className="w-5 h-5 mr-3">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="block"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span className="flex-grow overflow-hidden text-ellipsis m-0 text-[14px] leading-[16px] tracking-[-0.1px] text-inherit font-bold">
          Sign in with Google
        </span>
      </div>
    </button>
  );
}
