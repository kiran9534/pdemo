import React, { useState } from 'react';
import { Blog } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { generateAIContent } from '../../utils/aiUtils';
import BlogPreview from './BlogPreview';

interface BlogFormProps {
  initialBlog?: Partial<Blog>;
  onSubmit: (blog: Partial<Blog>) => void;
  isLoading: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialBlog, onSubmit, isLoading }) => {
  const { user } = useAuth();
  
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: '',
    summary: '',
    content: '',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    category: 'trends',
    tags: [],
    authorId: user?.id,
    ...initialBlog
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBlog(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!blog.tags?.includes(currentTag.trim())) {
        setBlog(prev => ({
          ...prev,
          tags: [...(prev.tags || []), currentTag.trim()]
        }));
      }
      setCurrentTag('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setBlog(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const generateContent = async () => {
    if (!blog.title) return;
    
    setIsGenerating(true);
    try {
      const content = await generateAIContent({
        topic: blog.title,
        category: blog.category || 'trends',
        keywords: blog.tags || [],
        tone: 'professional',
        targetLength: 'medium'
      });
      
      setBlog(prev => ({ ...prev, content }));
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(blog);
  };

  if (showPreview) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Preview</h2>
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Back to Edit
          </button>
        </div>
        <BlogPreview blog={blog as Blog} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea
          name="summary"
          value={blog.summary}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows={2}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            onClick={generateContent}
            disabled={isGenerating || !blog.title}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleInputChange}
          className="w-full p-2 border rounded font-mono"
          rows={12}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={blog.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="trends">Trends</option>
          <option value="reviews">Reviews</option>
          <option value="tips">Tips</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Tags (press Enter to add)</label>
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
          className="w-full p-2 border rounded"
          placeholder="Add tags"
        />
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Preview
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : initialBlog?.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;