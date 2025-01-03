// login/page.tsx

"use client";

import React from "react";
import { signInWithGoogle, signOut } from "@/utils/supabase-auth/authGoogle";
import { useRouter } from "next/navigation";


export default function SigninPage() {

    // Googleログイン
    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    }

    // Googleログアウト
    const router = useRouter();
    const handleGoogleLogout = async () => {
        const result = await signOut();
        if (result) router.refresh();
    }

    return (
        <div>
            <button onClick={handleGoogleLogin}>ログイン</button>
            <button onClick={handleGoogleLogout}>ログアウト</button>
        </div>
    )
}