// layout.tsx

import React from "react";
import "./globals.css";
import { headers } from "next/headers";
import { cachedValidateAuthWithRedirect } from "@/utils/supabase-auth/auth";


export default async function RootLayout({children,}: {children: React.ReactNode;}) {

    // ---------------------------------------------
    // リクエストURLを取得
    // ---------------------------------------------
    const headersList = await headers();
    const pathname = headersList.get("x-current-path");
    const isLoginPage = pathname?.startsWith("/login");

    // ---------------------------------------------
    // 認証確認: ログインページ以外
    // ---------------------------------------------
    if (!isLoginPage) {
        await cachedValidateAuthWithRedirect();
    }

    return (
        <html lang="ja" className="h-full">
            <body>
                {isLoginPage
                    ? <>{children}</>
                    : <main className="relative min-h-screen">
                            {children}
                    </main>
                }
            </body>
        </html>
    );
}