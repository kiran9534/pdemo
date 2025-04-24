import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBlogs } from '../contexts/BlogsContext';
import BlogForm from '../components/blogs/BlogForm';
import { Blog } from '../types';

const CreateBlog: React.FC = () => {
  const { user } = useAuth();
  const { createBlog } = useBlogs();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (blog: Partial<Blog>) => {
    setIsLoading(true);
    try {
      const newBlog = await createBlog({
        ...blog,
        authorId: user?.id,
        status: 'draft'
      });
      navigate(`/blogs/${newBlog.id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Blog</h1>
        <p className="text-gray-600 mt-1">
          Create a new retail blog post with AI assistance
        </p>
      </div>
      
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateBlog;