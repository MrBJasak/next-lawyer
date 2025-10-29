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

  useEffect(() => {
    const supabase = createClient();
    const fetchBlogPosts = async () => {
      const { data: blog, error } = await supabase.from('blog').select('*').eq('status', 'published');

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      if (blog) {
        const postsWithImages = blog.map((post) => {
          const typedPost = post as BlogPost;
          const imageUrl = typedPost.image_name
            ? supabase.storage.from(typedPost.bucket_name || BUCKET_NAME).getPublicUrl(typedPost.image_name).data
                .publicUrl
            : '';

          return {
            ...typedPost,
            image: imageUrl,
          };
        });

        const sorted = postsWithImages.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setBlogPosts(sorted);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className='blog-page'>
      <AnimatedTitle>BLOG</AnimatedTitle>
      <div className='blog-page__list'>
        {blogPosts.map((blogItem: BlogPost) => (
          <BlogItem
            key={blogItem.id}
            excerpt={blogItem.excerpt}
            id={blogItem.id.toString()}
            image={blogItem.image}
            title={blogItem.title}
            createdAt={blogItem.created_at}
          />
        ))}
      </div>
    </div>
  );
}
