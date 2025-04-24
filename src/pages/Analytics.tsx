import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';
import { useBlogs } from '../contexts/BlogsContext';

const Analytics: React.FC = () => {
  const { blogs } = useBlogs();
  
  // Calculate statistics
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
  const draftBlogs = blogs.filter(blog => blog.status === 'draft').length;
  
  const trendBlogs = blogs.filter(blog => blog.category === 'trends').length;
  const reviewBlogs = blogs.filter(blog => blog.category === 'reviews').length;
  const tipBlogs = blogs.filter(blog => blog.category === 'tips').length;
  
  // Calculate average SEO score
  const avgSeoScore = blogs.length > 0
    ? Math.round(blogs.reduce((sum, blog) => sum + (blog.seoScore || 0), 0) / totalBlogs)
    : 0;
  
  // Calculate blog counts by month (last 6 months)
  const getMonthlyData = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = date.toLocaleString('default', { month: 'short' });
      months.push({ month: monthName, count: 0 });
    }
    
    blogs.forEach(blog => {
      const blogDate = new Date(blog.createdAt);
      const monthDiff = (today.getMonth() - blogDate.getMonth()) + 
                         (12 * (today.getFullYear() - blogDate.getFullYear()));
      
      if (monthDiff >= 0 && monthDiff < 6) {
        months[5 - monthDiff].count += 1;
      }
    });
    
    return months;
  };
  
  const monthlyData = getMonthlyData();
  const maxMonthlyCount = Math.max(...monthlyData.map(d => d.count));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content Analytics</h1>
        <p className="text-gray-600 mt-1">
          View detailed analytics for your retail blog content
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Posts</p>
              <p className="text-2xl font-semibold text-gray-900">{totalBlogs}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-500">Published: {publishedBlogs}</span>
            <span className="text-gray-500">Drafts: {draftBlogs}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <PieChart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Content Mix</p>
              <p className="text-2xl font-semibold text-gray-900">{trendBlogs}/{reviewBlogs}/{tipBlogs}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-blue-500">Trends: {trendBlogs}</span>
            <span className="text-purple-500">Reviews: {reviewBlogs}</span>
            <span className="text-amber-500">Tips: {tipBlogs}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. SEO Score</p>
              <p className="text-2xl font-semibold text-gray-900">{avgSeoScore}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  avgSeoScore >= 80 ? 'bg-green-500' : avgSeoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${avgSeoScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Production</h2>
          <div className="h-64 flex items-end space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{
                    height: data.count ? `${(data.count / maxMonthlyCount) * 180}px` : '4px',
                    minHeight: '4px'
                  }}
                ></div>
                <div className="text-xs mt-2 text-gray-600">{data.month}</div>
                <div className="text-sm font-medium">{data.count}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* SVG Circle Chart */}
              <svg viewBox="0 0 36 36" className="w-full h-full">
                {/* Background circles */}
                <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="1"></circle>
                
                {/* Trends segment */}
                <path
                  d={`M18 2
                    A 16 16 0 ${trendBlogs / totalBlogs > 0.5 ? 1 : 0} 1 ${
                    18 + 16 * Math.sin(2 * Math.PI * (trendBlogs / totalBlogs))
                  } ${
                    18 - 16 * Math.cos(2 * Math.PI * (trendBlogs / totalBlogs))
                  }
                    L 18 18`}
                  fill="#3B82F6"
                ></path>
                
                {/* Reviews segment */}
                <path
                  d={`M18 18
                    L ${18 + 16 * Math.sin(2 * Math.PI * (trendBlogs / totalBlogs))}
                      ${18 - 16 * Math.cos(2 * Math.PI * (trendBlogs / totalBlogs))}
                    A 16 16 0 ${
                      (trendBlogs + reviewBlogs) / totalBlogs > 0.5 ? 1 : 0
                    } 1 ${
                    18 + 16 * Math.sin(2 * Math.PI * ((trendBlogs + reviewBlogs) / totalBlogs))
                  } ${
                    18 - 16 * Math.cos(2 * Math.PI * ((trendBlogs + reviewBlogs) / totalBlogs))
                  }
                    Z`}
                  fill="#9333EA"
                ></path>
                
                {/* Tips segment */}
                <path
                  d={`M18 18
                    L ${18 + 16 * Math.sin(2 * Math.PI * ((trendBlogs + reviewBlogs) / totalBlogs))}
                      ${18 - 16 * Math.cos(2 * Math.PI * ((trendBlogs + reviewBlogs) / totalBlogs))}
                    A 16 16 0 ${
                      (trendBlogs + reviewBlogs + tipBlogs) / totalBlogs > 0.5 ? 1 : 0
                    } 1 ${
                    18 + 16 * Math.sin(2 * Math.PI * ((trendBlogs + reviewBlogs + tipBlogs) / totalBlogs))
                  } ${
                    18 - 16 * Math.cos(2 * Math.PI * ((trendBlogs + reviewBlogs + tipBlogs) / totalBlogs))
                  }
                    Z`}
                  fill="#F59E0B"
                ></path>
                
                {/* Center circle */}
                <circle cx="18" cy="18" r="14" fill="white"></circle>
                
                <text x="18" y="18" textAnchor="middle" dy=".3em" className="text-xl font-bold fill-gray-700">
                  {totalBlogs}
                </text>
              </svg>
            </div>
            
            <div className="ml-6">
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Trends:</span> {trendBlogs} 
                    ({totalBlogs > 0 ? Math.round((trendBlogs / totalBlogs) * 100) : 0}%)
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Reviews:</span> {reviewBlogs}
                    ({totalBlogs > 0 ? Math.round((reviewBlogs / totalBlogs) * 100) : 0}%)
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <span className="font-medium">Tips:</span> {tipBlogs}
                    ({totalBlogs > 0 ? Math.round((tipBlogs / totalBlogs) * 100) : 0}%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Health Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Content Balance</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    Math.abs(trendBlogs - tipBlogs) <= 2 && Math.abs(reviewBlogs - tipBlogs) <= 2
                      ? 'bg-green-500' : 'bg-yellow-500'
                  } mr-2`}></div>
                  <p className="text-sm text-gray-600">
                    {Math.abs(trendBlogs - tipBlogs) <= 2 && Math.abs(reviewBlogs - tipBlogs) <= 2
                      ? 'Well balanced across categories'
                      : 'Opportunity to balance content categories'}
                  </p>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Aim for an even distribution across categories for the best content mix.
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">SEO Health</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    avgSeoScore >= 80 ? 'bg-green-500' : avgSeoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  } mr-2`}></div>
                  <p className="text-sm text-gray-600">
                    {avgSeoScore >= 80 ? 'Excellent SEO optimization' : 
                     avgSeoScore >= 60 ? 'Moderate SEO performance' : 'Needs SEO improvement'}
                  </p>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {avgSeoScore >= 80 ? 'Keep up the good work!' : 
                   avgSeoScore >= 60 ? 'Focus on keyword optimization and content structure.' : 
                   'Review SEO recommendations for each post.'}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Content Freshness</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    monthlyData[5].count > 0 ? 'bg-green-500' : 'bg-yellow-500'
                  } mr-2`}></div>
                  <p className="text-sm text-gray-600">
                    {monthlyData[5].count > 0 ? 'Recent content published' : 'No content this month'}
                  </p>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Regular content updates improve engagement and SEO ranking.
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recommendations</h3>
            <ul className="space-y-2 text-sm">
              {trendBlogs < reviewBlogs && trendBlogs < tipBlogs && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-blue-100 rounded-full text-blue-600">→</span>
                  <span className="text-gray-600">Create more trend articles to balance your content</span>
                </li>
              )}
              {reviewBlogs < trendBlogs && reviewBlogs < tipBlogs && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-purple-100 rounded-full text-purple-600">→</span>
                  <span className="text-gray-600">Add more product reviews to your content mix</span>
                </li>
              )}
              {tipBlogs < trendBlogs && tipBlogs < reviewBlogs && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-amber-100 rounded-full text-amber-600">→</span>
                  <span className="text-gray-600">Increase shopping tips content for better balance</span>
                </li>
              )}
              {avgSeoScore < 70 && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-teal-100 rounded-full text-teal-600">→</span>
                  <span className="text-gray-600">Improve SEO scores by reviewing keyword usage and content structure</span>
                </li>
              )}
              {draftBlogs > 0 && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-green-100 rounded-full text-green-600">→</span>
                  <span className="text-gray-600">Publish {draftBlogs} draft {draftBlogs === 1 ? 'article' : 'articles'} to increase your content library</span>
                </li>
              )}
              {monthlyData.slice(3).every(m => m.count === 0) && (
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 bg-red-100 rounded-full text-red-600">→</span>
                  <span className="text-gray-600">Publish new content regularly to maintain freshness</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;