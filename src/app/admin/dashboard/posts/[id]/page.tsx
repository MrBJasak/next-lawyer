'use client';
import { SupabaseClient } from '@supabase/supabase-js';
import { use, useEffect, useState } from 'react';
import { PostForm } from '../../../../../components/PostForm/PostForm';
import { createClient } from '../../../../../utils/supabase/client';

interface PostWithImage {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  created_at: string;
  image_name?: string;
  bucket_name?: string;
  featuredImage?: string;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [postWithImage, setPostWithImage] = useState<PostWithImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { id } = use(params);
  useEffect(() => {
    async function fetchPost() {
      try {
        const supabase: SupabaseClient = createClient();

        const { data: post, error } = await supabase.from('blog').select('*').eq('id', id).single();

        if (error) throw error;

        // Generate the image URL if the post has an image
        let updatedPost = post;
        if (post && post.image_name) {
          const imageUrl = supabase.storage.from(post.bucket_name).getPublicUrl(post.image_name).data.publicUrl;

          updatedPost = {
            ...post,
            featuredImage: imageUrl,
          };
        }

        setPostWithImage(updatedPost as PostWithImage);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch post'));
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Post not found</p>;
  if (!postWithImage) return <p>No post data available</p>;

  return <PostForm defaultValues={postWithImage} isEditing={true} />;
}
