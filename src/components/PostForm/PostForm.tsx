'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { BlogEditor } from '../BlogEditor/BlogEditor';
import './styles.scss';

interface PostFormProps {
  defaultValues?: {
    id?: string;
    title?: string;
    content?: string;
    status?: string;
    featuredImage?: string;
  };
}

export function PostForm({ defaultValues = {} }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues.title || '');
  const [content, setContent] = useState(defaultValues.content || '');
  const [status, setStatus] = useState(defaultValues.status || 'draft');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | undefined>(defaultValues.featuredImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, you would upload the image and get a URL
      let imageUrl = featuredImageUrl;
      if (featuredImage) {
        // Simulate image upload
        console.log('Uploading image:', featuredImage.name);
        // In a real app, you would upload the image to a server or cloud storage
        imageUrl = URL.createObjectURL(featuredImage);
      }

      // In a real app, you would call an API to save the post
      console.log('Saving post:', { title, content, status, featuredImage: imageUrl });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleImageUpload = (file: File) => {
  //   setFeaturedImage(file);
  //   // Create a temporary URL for preview
  //   setFeaturedImageUrl(URL.createObjectURL(file));
  // };

  // const handleImageRemove = () => {
  //   setFeaturedImage(null);
  //   setFeaturedImageUrl(undefined);
  // };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter post title'
          required
        />
      </div>

      <div className='form-group'>
        <label>Featured Image</label>
        {/* <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          initialImage={featuredImageUrl}
        /> */}
      </div>

      <div className='form-group'>
        <label htmlFor='content'>Content</label>
        <BlogEditor content={content} onSave={setContent} />
      </div>

      <div className='form-group'>
        <label htmlFor='status'>Status</label>
        <select id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
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
