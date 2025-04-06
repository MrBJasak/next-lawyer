'use client';

import { useEffect, useState } from 'react';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/cms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Error fetching blogs');
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!blogs.length) return <p>No blog posts found.</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
