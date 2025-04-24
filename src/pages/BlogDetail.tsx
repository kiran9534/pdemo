import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { useBlogs } from '../contexts/BlogsContext';
import { Blog } from '../types';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchBlogById, deleteBlog, updateBlog } = useBlogs();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
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
  
  const handleDelete = async () => {
    if (!blog) return;
    
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(blog.id);
        navigate('/blogs');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };
  
  const handlePublish = async () => {
    if (!blog) return;
    
    try {
      await updateBlog(blog.id, { status: 'published' });
      setBlog({ ...blog, status: 'published' });
    } catch (error) {
      console.error('Error publishing blog:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Blog post not found</h3>
        <p className="mt-2 text-gray-500">The blog post you're looking for doesn't exist or has been removed.</p>
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/blogs"
          className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to all blogs
        </Link>
        
        <div className="flex space-x-3">
          {blog.status === 'draft' && (
            <button
              onClick={handlePublish}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Publish
            </button>
          )}
          <Link
            to={`/blogs/${blog.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            Delete
          </button>
        </div>
      </div>
      
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-80">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
            <p className="text-lg text-gray-600">{blog.summary}</p>
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 space-x-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{blog.author?.name || 'Anonymous'}</span>
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center mt-2 sm:mt-0">
                <Tag className="mr-1 h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="prose prose-teal max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;