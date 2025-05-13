import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';
import './page.scss';
export default async function page() {
  return (
    <div className='dashboard__header-actions'>
      <h1 className='dashboard__title'>Blog Dashboard</h1>
      <Link href='/admin/dashboard/posts/new' className='button button--primary'>
        <FaPlusCircle />
        New Post
      </Link>
    </div>
  );
}
