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
}

export function BlogTable({ posts }: BlogDataProps) {
  const client = createClient();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting post ${postToDelete}`);
    client.from('blog').delete().eq('id', postToDelete);
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Excerpt</th>
              <th>Status</th>
              <th>Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className='font-medium'>{post.title}</td>
                <td className='text-secondary'>{post.excerpt}</td>
                <td>
                  <span className={`badge badge--${post.status === 'published' ? 'primary' : 'secondary'}`}>
                    {post.status}
                  </span>
                </td>
                <td>{formatDate(post.created_at)}</td>
                <td>{post.image_name || 'No image'}</td>
                <td>
                  <div className='action-buttons'>
                    <Link href={`/admin/dashboard/posts/${post.id}`} className='action-button edit-button' title='Edit'>
                      <FaEdit />
                    </Link>
                    <button
                      className='action-button delete-button'
                      onClick={() => handleDelete(post.id)}
                      title='Delete'
                    >
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
              <h3 className='modal__content-title'>Are you sure?</h3>
              <p className='modal__content-description'>
                This action cannot be undone. This will permanently delete the post.
              </p>
            </div>
            <div className='modal__content-footer'>
              <button className='button button--secondary' onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </button>
              <button className='button button--primary' onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
