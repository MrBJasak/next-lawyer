'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '../../utils/supabase/client';

import { toast } from 'react-toastify';
import { BlogEditor } from '../BlogEditor';
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
      if (!isEditing && !featuredImage && !defaultValues.featuredImage) {
        toast.info('Wyróżniony obraz jest wymagany', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      let uploadedImageName = '';
      const bucket = BUCKET_NAME;

      if (featuredImage) {
        uploadedImageName = `${Date.now()}-${featuredImage.name}`;

        const { error: uploadError } = await supabase.storage.from(bucket).upload(uploadedImageName, featuredImage, {
          cacheControl: '3600',
          upsert: false,
        });
        if (uploadError) throw new Error(`Przesyłanie obrazu nie powiodło się: ${uploadError.message}`);
      } else if (defaultValues.featuredImage) {
        if (defaultValues.featuredImage.includes('https://')) {
          const urlParts = defaultValues.featuredImage.split('/');
          uploadedImageName = urlParts[urlParts.length - 1];
        } else {
          uploadedImageName = defaultValues.featuredImage;
        }
      }

      if (!uploadedImageName) {
        toast.info('Wyróżniony obraz jest wymagany', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      const blogPayload = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        status: data.status,
        image_name: uploadedImageName,
        bucket_name: bucket,
      };

      if (!isEditing) {
        const { error } = await supabase.from('blog').insert([blogPayload]).select();
        if (error) throw error;
      } else {
        if (!defaultValues.id) throw new Error('ID wpisu jest wymagane do aktualizacji');

        const { error } = await supabase.from('blog').update(blogPayload).eq('id', defaultValues.id).select();

        if (error) throw error;
      }

      router.push('/admin/dashboard/posts');
    } catch (error) {
      console.error('Błąd podczas zapisywania wpisu:', error);
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
        <label htmlFor='title'>Tytuł</label>
        <input id='title' type='text' placeholder='Wprowadź tytuł wpisu' {...register('title', { required: true })} />
      </div>

      <div className='form-group'>
        <label htmlFor='excerpt'>Streszczenie</label>
        <input
          id='excerpt'
          type='text'
          placeholder='Wprowadź streszczenie wpisu'
          {...register('excerpt', { required: true })}
        />
      </div>

      <div className='form-group'>
        <label>
          Wyróżniony obraz <span className='required'>*</span>
        </label>
        <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          initialImage={featuredImageUrl}
        />
        {!featuredImageUrl && !featuredImage && <p className='error-message'>Wyróżniony obraz jest wymagany</p>}
      </div>

      <div className='form-group'>
        <label htmlFor='content'>Treść</label>
        <BlogEditor content={watch('content')} onSave={(val: string) => setValue('content', val)} />
      </div>

      <div className='form-group'>
        <label htmlFor='status'>Status</label>
        <select id='status' {...register('status')}>
          <option value='draft'>Szkic</option>
          <option value='published'>Opublikowany</option>
        </select>
      </div>

      <div className='form-actions'>
        <button type='submit' className='button button--primary' disabled={isSubmitting}>
          {isSubmitting ? 'Zapisywanie...' : defaultValues.id ? 'Aktualizuj wpis' : 'Utwórz wpis'}
        </button>
        <button type='button' className='button button--secondary' onClick={() => router.push('/admin/dashboard')}>
          Anuluj
        </button>
      </div>
    </form>
  );
}
