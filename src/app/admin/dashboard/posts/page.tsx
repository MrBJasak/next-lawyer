import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import { BlogTable } from '../../../../components/BlogTable/BlogTable';
import { createClient } from '../../../../utils/supabase/client';

export default async function page() {
  const supabase = createClient();
  const { data: user, error: errorAuth } = await supabase.auth.getUser();
  const { data: blog, error } = await supabase.from('blog').select('*');
  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>All Posts</h1>
        <Link href='/admin/dashboard/posts/new' className='button button--primary'>
          <FaPlusCircle />
          New Post
        </Link>
      </div>

      <div className='card'>
        <div className='card__header'>
          <h2 className='card__title'>Blog Posts</h2>
          <div className='card__description'>Manage your blog posts</div>
        </div>
        <div className='card__content'>
          <BlogTable posts={blog as any} />
        </div>
      </div>
    </div>
  );
}
