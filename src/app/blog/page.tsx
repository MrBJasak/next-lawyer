'use client';

import { useEffect, useState } from 'react';
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import { BlogItem } from '../../components/BlogItem/BlogItem';
import { createClient } from '../../utils/supabase/client';
import { BUCKET_NAME } from '../../utils/supabase/types';
import './styles.scss';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string | Record<string, unknown>;
  status: string;
  image_name: string;
  bucket_name: string;
  created_at: string;
  image: string; // For the URL we'll generate
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data: blog, error } = await supabase.from('blog').select('*');

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      if (blog) {
        const postsWithImages = blog.map((post: any) => {
          const imageUrl = post.image_name
            ? supabase.storage.from(post.bucket_name || BUCKET_NAME).getPublicUrl(post.image_name).data.publicUrl
            : '';

          return {
            ...post,
            image: imageUrl,
          };
        });

        setBlogPosts(postsWithImages);
      }
    };

    fetchBlogPosts();
  }, [supabase]);

  console.log('Blog posts:', blogPosts);
  return (
    <div className='blog-page'>
      <AnimatedTitle>BLOG</AnimatedTitle>
      <div className='blog-page__grid'>
        {blogPosts.map((blogItem: BlogPost) => (
          <BlogItem
            key={blogItem.id}
            excerpt={blogItem.excerpt}
            id={blogItem.id}
            image={blogItem.image}
            title={blogItem.title}
          />
        ))}
      </div>
    </div>
  );
}
