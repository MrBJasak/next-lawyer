'use client';

import Image from 'next/image';
import Link from 'next/link';
import './styles.scss';

export interface BlogItemProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  createdAt: string;
}

export const BlogItem = ({ excerpt, id, image, title, createdAt }: BlogItemProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('pl-PL');
  return (
    <div className='blog-item'>
      <div className='blog-item__image'>
        <Image src={image} width={320} height={200} alt='Miniatura wpisu' />
      </div>
      <div className='blog-item__content'>
        <div className='blog-item__meta'>{formattedDate}</div>
        <h2 className='blog-item__title'>
          <Link href={`/blog-details/${id}`}>{title}</Link>
        </h2>
        <p className='blog-item__excerpt'>{excerpt}</p>
        <Link href={`/blog-details/${id}`} className='blog-item__link'>
          Czytaj dalej
        </Link>
      </div>
    </div>
  );
};
