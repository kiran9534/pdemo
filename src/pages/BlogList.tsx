import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Filter } from 'lucide-react';
import { useBlogs } from '../contexts/BlogsContext';
import BlogCard from '../components/blogs/BlogCard';

const BlogList: React.FC = () => {
  const { blogs, isLoading, deleteBlog } = useBlogs();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Handle blog deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };
  
  // Filter blogs based on search and filters
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">
            Manage your retail blog content
          </p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="trends">Trends</option>
              <option value="reviews">Reviews</option>
              <option value="tips">Tips</option>
            </select>
          </div>
          
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="pt-4 flex justify-between">
                  <div className="h-5 bg-gray-300 rounded w-16"></div>
                  <div className="h-5 bg-gray-300 rounded w-16"></div>
                  <div className="h-5 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="inline-flex items-center justify-center p-2 bg-gray-100 rounded-full mb-4">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No blogs found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first blog post to get started'}
          </p>
          {!searchQuery && categoryFilter === 'all' && statusFilter === 'all' && (
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Blog
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;