'use client';

import { useParams } from 'next/dist/client/components/navigation';
import { BlogDetails } from '../../../components/BlogDetails/BlogDetails';

const Page = () => {
  const params = useParams();
  const id = Number(params.id);

  return <BlogDetails id={id} />;
};

export default Page;
