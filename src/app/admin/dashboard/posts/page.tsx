'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import type { BlogPost } from '../../../../components/BlogTable/BlogTable';
import { BlogTable } from '../../../../components/BlogTable/BlogTable';
import { Button } from '../../../../components/Button/Buttons';
import { createClient } from '../../../../utils/supabase/client';
import './page.scss';

export default function Page() {
  const navigate = useRouter();
  const [blog, setBlog] = useState<BlogPost[]>([]);

  const fetchBlogPosts = async () => {
    try {
      const supabase = createClient();
      const { data } = await supabase.from('blog').select('*');

      setBlog(data as BlogPost[]);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>Wszystkie posty</h1>
        <Button
          className='button'
          onClick={() => {
            navigate.push('/admin/dashboard/posts/new');
          }}
        >
          <FaPlusCircle />
          Dodaj nowy post
        </Button>
      </div>

      <BlogTable posts={blog} refetchBlogPosts={fetchBlogPosts} />
    </div>
  );
}
