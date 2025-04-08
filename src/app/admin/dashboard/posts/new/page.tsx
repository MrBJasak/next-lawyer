import { PostForm } from '../../../../../components/PostForm/PostForm';
import './page.scss';

export default function NewPostPage() {
  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>Create New Post</h1>
      </div>

      <div className='card'>
        <div className='card__header'>
          <h2 className='card__title'>Post Details</h2>
          <div className='card__description'>Fill in the information below to create a new blog post</div>
        </div>
        <div className='card__content'>
          <PostForm />
        </div>
      </div>
    </div>
  );
}
