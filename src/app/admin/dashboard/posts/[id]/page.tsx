import { PostForm } from '../../../../../components/PostForm/PostForm';
import { createClient } from '../../../../../utils/supabase/client';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  console.log('Post ID:');
  const supabase = createClient();
  const { data: post, error } = await supabase.from('blog').select('*').eq('id', params.id);

  if (error) return <p>Not founded data</p>;

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
          <PostForm defaultValues={post?.[0] ?? {}} isEditing={true} />
        </div>
      </div>
    </div>
  );
}
