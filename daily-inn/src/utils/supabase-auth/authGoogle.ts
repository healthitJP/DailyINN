/**
 * @see https://supabase.com/docs/guides/auth/social-login/auth-google
 * @see https://zenn.dev/buenotheebiten/articles/8d37297130bf93
 */
"use server";

import { createClient as createServerClient } from "@/utils/supabase-auth/server";
import { redirect } from "next/navigation";

// ---------------------------------------------
// Googleログイン
// ---------------------------------------------
export async function signInWithGoogle() {
    // クライアントを作成
    const supabase = await createServerClient();
    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_SUPABASE_AUTH_URL}/api/auth/callback`,
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
        },
    });
    if (error) console.error('Googleログインエラー:', error.message)
    if (!error && url) redirect(url);
}

/**
 * @see https://developers.google.com/identity/gsi/web/reference/js-reference?hl=ja#CredentialResponse
 */
type CredentialResponse = {
    credential: string;
    selected_by: string;
    state: string;
};

// ---------------------------------------------
// Googleログアウト
// ---------------------------------------------
export async function signOut() {
    // クライアントを作成
    const supabase = await createServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Googleログアウトエラー:', error.message)
    if (!error) return true;
    return false;
}