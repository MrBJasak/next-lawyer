'use client';

import Image from 'next/image';
import Link from 'next/link';
import './styles.scss';

export interface BlogItemProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
}

export const BlogItem = ({ excerpt, id, image, title }: BlogItemProps) => {
  return (
    <div className='blog-item'>
      <div className='blog-item__image'>
        <Image src={image} width={600} height={400} alt='Blog post thumbnail' />
      </div>
      <div className='blog-item__content'>
        <h2 className='blog-item__title'>{title}</h2>
        <p className='blog-item__excerpt'>{excerpt}</p>
        <Link href={`/blog-details/${id}`} className='blog-item__link'>
          Czytaj dalej
        </Link>
      </div>
    </div>
  );
};
