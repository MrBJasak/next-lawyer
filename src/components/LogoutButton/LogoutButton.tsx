'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export const LogoutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={handleLogout}>Wyloguj</button>;
};
