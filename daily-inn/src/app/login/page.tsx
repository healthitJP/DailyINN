'use client';
import { supabase } from '@/utils/supabaseClient';

export default function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleTwitterLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'twitter' });
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Google でログイン</button>
      <button onClick={handleTwitterLogin}>Twitter でログイン</button>
    </div>
  );
}