import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { BlogTable } from '../../../../components/BlogTable/BlogTable';
import { createClient } from '../../../../utils/supabase/client';

export default async function page() {
  const supabase = createClient();
  const { data: blog, error } = await supabase.from('blog').select('*');
  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>Wszystkie posty</h1>
        <Link href='/admin/dashboard/posts/new' className='button button--primary'>
          <FaPlusCircle />
          Dodaj nowy post
        </Link>
      </div>

      <BlogTable posts={blog as any} />
    </div>
  );
}
