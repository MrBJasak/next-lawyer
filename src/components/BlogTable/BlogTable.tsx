'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { createClient } from '../../utils/supabase/client';
import './styles.scss';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  image_name: string;
  bucket_name: string;
}

interface BlogDataProps {
  posts: BlogPost[];
  refetchBlogPosts: () => void;
}

export function BlogTable({ posts, refetchBlogPosts }: BlogDataProps) {
  const client = createClient();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const handleDelete = (post: BlogPost) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    const { error: postError } = await client.from('blog').delete().eq('id', postToDelete.id);

    if (postError) {
      console.error('Error deleting post:', postError);
      return;
    }

    await client.storage.from(postToDelete.bucket_name).remove([`${postToDelete.image_name}`]);

    setDeleteDialogOpen(false);
    setPostToDelete(null);
    refetchBlogPosts();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateFilename = (filename: string, maxLength = 25) => {
    if (!filename) return 'No image';
    if (filename.length <= maxLength) return filename;

    // Get file extension
    const lastDotIndex = filename.lastIndexOf('.');
    const ext = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : '';

    // Truncate name and add extension
    return filename.slice(0, maxLength - ext.length - 3) + '...' + ext;
  };

  return (
    <>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Tytuł</th>
              <th>Streszczenie</th>
              <th>Status</th>
              <th>Data</th>
              <th>Obrazek</th>
              <th>Operacje</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className='font-medium' data-label='Tytuł'>
                  {post.title}
                </td>
                <td className='text-secondary' data-label='Streszczenie'>
                  {post.excerpt}
                </td>
                <td data-label='Status'>
                  <span className={`badge badge--${post.status === 'published' ? 'primary' : 'secondary'}`}>
                    {post.status}
                  </span>
                </td>
                <td data-label='Data'>{formatDate(post.created_at)}</td>
                <td className='image-cell' data-label='Obrazek'>
                  <span title={post.image_name || 'No image'}>{truncateFilename(post.image_name)}</span>
                </td>
                <td data-label='Operacje'>
                  <div className='action-buttons'>
                    <Link href={`/admin/dashboard/posts/${post.id}`} className='action-button edit-button' title='Edit'>
                      <FaEdit />
                    </Link>
                    <button className='action-button delete-button' onClick={() => handleDelete(post)} title='Delete'>
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteDialogOpen && (
        <div className='modal'>
          <div className='modal__content'>
            <div className='modal__content-header'>
              <h3 className='modal__content-title'>Czy na pewno chcesz usunąć post?</h3>
              <p className='modal__content-description'>
                Nie można cofnąć tej akcji. Czy na pewno chcesz usunąć ten post?
              </p>
            </div>
            <div className='modal__content-footer'>
              <button className='button button--secondary' onClick={() => setDeleteDialogOpen(false)}>
                Anuluj
              </button>
              <button className='button button--primary' onClick={confirmDelete}>
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
