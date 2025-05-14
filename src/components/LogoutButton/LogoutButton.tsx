'use client';

import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';
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

  return (
    <button onClick={handleLogout} className='logout-button'>
      <FaSignOutAlt />
      Wyloguj
    </button>
  );
};
