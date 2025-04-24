import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, TrendingUp, FileText, ShoppingBag, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBlogs } from '../contexts/BlogsContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { blogs, isLoading } = useBlogs();
  const navigate = useNavigate();
  
  // Calculate statistics
  const publishedCount = blogs.filter(blog => blog.status === 'published').length;
  const draftCount = blogs.filter(blog => blog.status === 'draft').length;
  const trendsCount = blogs.filter(blog => blog.category === 'trends').length;
  const reviewsCount = blogs.filter(blog => blog.category === 'reviews').length;
  const tipsCount = blogs.filter(blog => blog.category === 'tips').length;
  
  // Get average SEO score
  const avgSeoScore = blogs.length > 0
    ? Math.round(blogs.reduce((sum, blog) => sum + (blog.seoScore || 0), 0) / blogs.length)
    : 0;
  
  // Get recent blogs
  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}! Here's an overview of your retail blog content.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-teal-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-teal-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Blogs</p>
              <p className="text-2xl font-semibold text-gray-900">{blogs.length}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">Published: {publishedCount}</span>
            <span className="text-gray-500">Drafts: {draftCount}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Trends</p>
              <p className="text-2xl font-semibold text-gray-900">{trendsCount}</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${blogs.length > 0 ? (trendsCount / blogs.length) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="text-gray-500 text-xs mt-1 inline-block">
              {blogs.length > 0 ? Math.round((trendsCount / blogs.length) * 100) : 0}% of content
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Reviews</p>
              <p className="text-2xl font-semibold text-gray-900">{reviewsCount}</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${blogs.length > 0 ? (reviewsCount / blogs.length) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="text-gray-500 text-xs mt-1 inline-block">
              {blogs.length > 0 ? Math.round((reviewsCount / blogs.length) * 100) : 0}% of content
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tips</p>
              <p className="text-2xl font-semibold text-gray-900">{tipsCount}</p>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: `${blogs.length > 0 ? (tipsCount / blogs.length) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="text-gray-500 text-xs mt-1 inline-block">
              {blogs.length > 0 ? Math.round((tipsCount / blogs.length) * 100) : 0}% of content
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <PlusCircle className="mr-1.5 h-4 w-4" />
              Create New
            </button>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : recentBlogs.length > 0 ? (
            <div className="space-y-3">
              {recentBlogs.map(blog => (
                <div
                  key={blog.id}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{blog.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {blog.status}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        Updated {new Date(blog.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No blog posts yet</p>
              <button
                onClick={() => navigate('/create')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create your first blog post
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm text-gray-600">Average SEO Score</span>
              <span className="text-2xl font-bold">{avgSeoScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  avgSeoScore >= 80 ? 'bg-green-500' : avgSeoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${avgSeoScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">Content Distribution</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{trendsCount}</p>
                <p className="text-xs text-gray-500">Trends</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{reviewsCount}</p>
                <p className="text-xs text-gray-500">Reviews</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{tipsCount}</p>
                <p className="text-xs text-gray-500">Tips</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Content Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-teal-100 rounded-full text-teal-600">✓</span>
                <span className="text-gray-600">Maintain a balanced content mix across categories</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-teal-100 rounded-full text-teal-600">✓</span>
                <span className="text-gray-600">Include relevant keywords for better SEO performance</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-teal-100 rounded-full text-teal-600">✓</span>
                <span className="text-gray-600">Use AI assistance to generate content ideas and drafts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;