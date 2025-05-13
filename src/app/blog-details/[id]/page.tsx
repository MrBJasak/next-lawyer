'use client';

import { useParams } from 'next/dist/client/components/navigation';
import { BlogDetails } from '../../../components/BlogDetails/BlogDetails';

const Page = () => {
  const params = useParams();
  const id = String(params.id);

  if (!id) {
    return <p className='blog-details__loading'>Loading...</p>;
  }

  return <BlogDetails id={id} />;
};

export default Page;
