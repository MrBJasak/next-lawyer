'use client';

import Image from 'next/image';
import { FC } from 'react';
import { blogData } from '../../app/blog/blog.data';
import './styles.scss';

interface BlogDetailsProps {
  id: number;
}

export const BlogDetails: FC<BlogDetailsProps> = ({ id }) => {
  const currentBlogData = blogData.find((item) => item.id === id);
  if (!currentBlogData) return <p className='blog-details__not-found'>Nie znaleziono postu o numerze {id}</p>;

  return (
    <div className='blog-details'>
      <h1 className='blog-details__title'>{currentBlogData.title}</h1>
      <div className='blog-details__image'>
        <Image src={currentBlogData.image} width={600} height={400} alt='Blog post image' priority />
      </div>
      <p className='blog-details__content'>{currentBlogData.content}</p>

      <p className='blog-details__footer'>Publikowane treści nie stanowią porady prawnej.</p>
    </div>
  );
};
