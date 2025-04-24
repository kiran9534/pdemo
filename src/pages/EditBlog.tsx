import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBlogs } from '../contexts/BlogsContext';
import BlogForm from '../components/blogs/BlogForm';
import { Blog } from '../types';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchBlogById, updateBlog } = useBlogs();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const foundBlog = await fetchBlogById(id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          navigate('/blogs');
        }
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBlog();
  }, [id, fetchBlogById, navigate]);
  
  const handleSubmit = async (updatedBlog: Partial<Blog>) => {
    if (!id || !blog) return;
    
    setIsSaving(true);
    try {
      await updateBlog(id, updatedBlog);
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Blog post not found</h3>
        <p className="mt-2 text-gray-500">The blog post you're trying to edit doesn't exist or has been removed.</p>
        <Link
          to="/blogs"
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center">
          <Link
            to={`/blogs/${id}`}
            className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-800 mr-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to blog
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
        </div>
        <p className="text-gray-600 mt-1">
          Update your blog post content and settings
        </p>
      </div>
      
      <BlogForm
        initialBlog={blog}
        onSubmit={handleSubmit}
        isLoading={isSaving}
      />
    </div>
  );
};

export default EditBlog;