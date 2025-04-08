'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaEllipsisH, FaTrashAlt } from 'react-icons/fa';
import './styles.scss';

// Mock data - in a real app, this would come from an API or database
const posts = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: '<p>This is a sample blog post about Next.js...</p>',
    status: 'published',
    date: '2023-04-23',
    featuredImage: '/placeholder.svg?height=300&width=500',
  },
  {
    id: '2',
    title: 'Understanding React Server Components',
    content: '<p>Server Components are a new feature in React...</p>',
    status: 'published',
    date: '2023-05-15',
    featuredImage: '/placeholder.svg?height=300&width=500',
  },
  {
    id: '3',
    title: 'The Future of Web Development',
    content: '<p>Web development is constantly evolving...</p>',
    status: 'draft',
    date: '2023-06-02',
    featuredImage: null,
  },
  {
    id: '4',
    title: 'Building a Blog with Next.js',
    content: "<h2>Introduction</h2><p>In this tutorial, we'll build a blog...</p>",
    status: 'published',
    date: '2023-06-12',
    featuredImage: '/placeholder.svg?height=300&width=500',
  },
  {
    id: '5',
    title: 'Advanced Tailwind CSS Techniques',
    content: '<p>Tailwind CSS offers many advanced features...</p>',
    status: 'draft',
    date: '2023-06-20',
    featuredImage: null,
  },
];

export function BlogTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPostToDelete(id);
    setDeleteDialogOpen(true);
    setDropdownOpen(null);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the post
    console.log(`Deleting post ${postToDelete}`);
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Function to strip HTML tags and truncate text
  const stripHtmlAndTruncate = (html: string, maxLength = 50) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className='font-medium'>{post.title}</td>
                <td className='text-secondary'>{stripHtmlAndTruncate(post.content)}</td>
                <td>
                  <span className={`badge badge--${post.status === 'published' ? 'primary' : 'secondary'}`}>
                    {post.status}
                  </span>
                </td>
                <td>{post.date}</td>
                <td>
                  <div className='dropdown'>
                    <button
                      className='button button--secondary button--icon button--icon-only'
                      onClick={() => toggleDropdown(post.id)}
                    >
                      <FaEllipsisH />
                      <span className='sr-only'>Open menu</span>
                    </button>
                    {dropdownOpen === post.id && (
                      <div className='dropdown__menu'>
                        <Link href={`/admin/dashboard/posts/${post.id}`} className='dropdown__menu-item'>
                          <FaEdit />
                          Edit
                        </Link>
                        <button className='dropdown__menu-item' onClick={() => handleDelete(post.id)}>
                          <FaTrashAlt />
                          Delete
                        </button>
                      </div>
                    )}
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
