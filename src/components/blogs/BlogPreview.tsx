import React from 'react';
import { Blog } from '../../types';

interface BlogPreviewProps {
  blog: Blog;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ blog }) => {
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="max-w-3xl mx-auto p-6">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{blog.summary}</p>
      
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        <time>{formatDate()}</time>
        <span>•</span>
        <span className="capitalize">{blog.category}</span>
        {blog.tags && blog.tags.length > 0 && (
          <>
            <span>•</span>
            <div className="flex gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default BlogPreview;