import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, FileText } from 'lucide-react';
import { Blog } from '../../types';

interface BlogCardProps {
  blog: Blog;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  const { id, title, summary, coverImage, category, status, createdAt, seoScore } = blog;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trends':
        return 'bg-blue-100 text-blue-800';
      case 'reviews':
        return 'bg-purple-100 text-purple-800';
      case 'tips':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{summary}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Created: {formatDate(createdAt)}</span>
          <div className="flex items-center">
            <FileText className="h-3.5 w-3.5 mr-1" />
            <span>SEO Score: </span>
            <span className={`ml-1 font-semibold ${getSEOScoreColor(seoScore || 0)}`}>
              {seoScore || 0}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-gray-100">
          <Link
            to={`/blogs/${id}`}
            className="text-teal-600 hover:text-teal-800 flex items-center text-sm"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Link>
          <Link
            to={`/blogs/${id}/edit`}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800 flex items-center text-sm"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;