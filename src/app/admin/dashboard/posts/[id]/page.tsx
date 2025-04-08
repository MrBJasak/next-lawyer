import { PostForm } from '../../../../../components/PostForm/PostForm';

// In a real app, you would fetch the post data based on the ID
const getPostData = (id: string) => {
  // Mock data with rich HTML content
  return {
    id,
    title: 'Getting Started with Next.js',
    content:
      '<h2>Introduction to Next.js</h2><p>Next.js is a React framework that enables functionality such as server-side rendering and generating static websites.</p><h3>Key Features</h3><ul><li>Server-side rendering</li><li>Static site generation</li><li>API routes</li><li>File-based routing</li></ul><blockquote><p>Next.js gives you the best developer experience with all the features you need for production.</p></blockquote>',
    status: 'published',
    date: '2023-04-23',
    featuredImage: '/placeholder.svg?height=300&width=500',
  };
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  const post = getPostData(params.id);

  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>Edit Post</h1>
      </div>

      <div className='card'>
        <div className='card__header'>
          <h2 className='card__title'>Post Details</h2>
          <div className='card__description'>Edit your blog post information</div>
        </div>
        <div className='card__content'>
          <PostForm defaultValues={post} />
        </div>
      </div>
    </div>
  );
}
