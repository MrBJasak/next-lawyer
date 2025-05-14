'use client';

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { BUCKET_NAME } from '../../utils/supabase/types';
import './styles.scss';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string | Record<string, unknown>;
  status: string;
  image_name: string;
  bucket_name: string;
  created_at: string;
  image?: string;
}

interface BlogDetailsProps {
  id: string;
}

export const BlogDetails: FC<BlogDetailsProps> = ({ id }) => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('blog').select('*').eq('id', id).single();

      if (error) {
        console.error('Error fetching blog post:', error);
        setLoading(false);
        return;
      }

      if (data) {
        // Generate the image URL
        const imageUrl = data.image_name
          ? supabase.storage.from(data.bucket_name || BUCKET_NAME).getPublicUrl(data.image_name).data.publicUrl
          : '';

        setBlogPost({
          ...data,
          image: imageUrl,
        });
      }

      setLoading(false);
    };

    fetchBlogDetails();
  }, [id, supabase]);

  if (loading) return <p className='blog-details__loading'>Loading...</p>;
  if (!blogPost) return <p className='blog-details__not-found'>Nie znaleziono postu o numerze {id}</p>;

  return (
    <div className='blog-details'>
      <h1 className='blog-details__title'>{blogPost.title}</h1>
      <div className='blog-details__image'>
        <Image src={blogPost.image || ''} width={600} height={400} alt='Blog post image' priority />
      </div>
      <div className='blog-details__content' dangerouslySetInnerHTML={{ __html: blogPost.content }} />

      <p className='blog-details__footer'>Publikowane treści nie stanowią porady prawnej.</p>
    </div>
  );
};
