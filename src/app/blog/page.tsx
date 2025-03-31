'use client';

import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import { BlogItem } from '../../components/BlogItem/BlogItem';
import { blogData } from './blog.data';
import './styles.scss';

export default function BlogPage() {
  return (
    <div className='blog-page'>
      <AnimatedTitle>BLOG</AnimatedTitle>
      <div className='blog-page__grid'>
        {blogData.map((blogItem) => {
          return (
            <BlogItem
              key={blogItem.id}
              excerpt={blogItem.excerpt}
              id={blogItem.id}
              image={blogItem.image}
              title={blogItem.title}
            />
          );
        })}
      </div>
    </div>
  );
}
