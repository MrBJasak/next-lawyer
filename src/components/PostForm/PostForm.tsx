'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '../../utils/supabase/client';
import { BlogEditor } from '../BlogEditor/BlogEditor';
import { ImageUpload } from '../ImageUpload/ImageUpload';
import './styles.scss';

interface PostFormProps {
  defaultValues?: {
    id?: string;
    title?: string;
    content?: string;
    status?: string;
    excerpt?: string;
    featuredImage?: string;
  };
  isEditing?: boolean;
}

interface FormValues {
  title: string;
  excerpt: string;
  content: string;
  status: PostStatus;
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

const BUCKET_NAME = 'next-lawyer-images';

export function PostForm({ defaultValues = {}, isEditing = false }: PostFormProps) {
  const supabase = createClient();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: defaultValues.title || '',
      excerpt: defaultValues.excerpt || '',
      content: defaultValues.content || '',
      status: (defaultValues.status as PostStatus) || PostStatus.DRAFT,
    },
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | undefined>(defaultValues.featuredImage);

  const onSubmit = async (data: FormValues) => {
    try {
      let uploadedImageName = defaultValues.featuredImage || '';
      const bucket = BUCKET_NAME;

      if (featuredImage) {
        uploadedImageName = `${Date.now()}-${featuredImage.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(uploadedImageName, featuredImage, {
            cacheControl: '3600',
            upsert: false,
          });
        console.log(uploadData, 'uploadData');
        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      const blogPayload = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        status: data.status,
        image_name: uploadedImageName,
        bucket_name: bucket,
      };

      // Handle create or update
      if (!isEditing) {
        const { data: insertedPost, error } = await supabase.from('blog').insert([blogPayload]).select();
        if (error) throw error;
        console.log('Created post:', insertedPost);
      } else {
        if (!defaultValues.id) throw new Error('Post ID is required for updates');

        const { data: updatedPost, error } = await supabase
          .from('blog')
          .update(blogPayload)
          .eq('id', defaultValues.id)
          .select();

        if (error) throw error;
        console.log('Updated post:', updatedPost);
      }

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleImageUpload = (file: File) => {
    setFeaturedImage(file);
    setFeaturedImageUrl(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setFeaturedImage(null);
    setFeaturedImageUrl(undefined);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' placeholder='Enter post title' {...register('title', { required: true })} />
      </div>

      <div className='form-group'>
        <label htmlFor='excerpt'>Excerpt</label>
        <input id='excerpt' type='text' placeholder='Enter post excerpt' {...register('excerpt', { required: true })} />
      </div>

      <div className='form-group'>
        <label>Featured Image</label>
        <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          initialImage={featuredImageUrl}
        />
      </div>

      <div className='form-group'>
        <label htmlFor='content'>Content</label>
        <BlogEditor content={watch('content')} onSave={(val) => setValue('content', val)} />
      </div>

      <div className='form-group'>
        <label htmlFor='status'>Status</label>
        <select id='status' {...register('status')}>
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
        </select>
      </div>

      <div className='form-actions'>
        <button type='submit' className='button button--primary' disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : defaultValues.id ? 'Update Post' : 'Create Post'}
        </button>
        <button type='button' className='button button--secondary' onClick={() => router.push('/admin/dashboard')}>
          Cancel
        </button>
      </div>
    </form>
  );
}
