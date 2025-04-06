import BlogList from '../../../components/Admin/BlogList/BlogList';
import { LogoutButton } from '../../../components/Admin/SignIn/SignIn';
import { createClient as createClientServer } from '../../../utils/supabase/server';

export default async function page() {
  const supabase = await createClientServer();
  const { data: user, error: errorAuth } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Witaj, {user.user ? user.user.email : 'Guest'}!</p>
      {user.user && (
        <>
          <LogoutButton />
          <BlogList />
        </>
      )}
    </div>
  );
}
// 8tsjMbj237
