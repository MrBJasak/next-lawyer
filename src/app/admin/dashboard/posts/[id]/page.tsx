import { PostForm } from '../../../../../components/PostForm/PostForm';
import { createClient } from '../../../../../utils/supabase/client';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  console.log('Post ID:');
  const supabase = createClient();

  const { data: post, error } = await supabase.from('blog').select('*').eq('id', params.id).single();

  if (error) return <p>Post not found</p>;

  // Generate the image URL if the post has an image
  let postWithImage = post;
  if (post && post.image_name) {
    const imageUrl = supabase.storage.from(post.bucket_name).getPublicUrl(post.image_name).data.publicUrl;

    postWithImage = {
      ...post,
      featuredImage: imageUrl,
    };
  }

  if (error) return <p>Not founded data</p>;

  return <PostForm defaultValues={postWithImage} isEditing={true} />;
}
