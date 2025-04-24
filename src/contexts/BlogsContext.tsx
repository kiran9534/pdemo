import React, { createContext, useContext, useState, useEffect } from 'react';
import { Blog, BlogsContextType, AIGenerationPrompt } from '../types';
import { mockBlogs } from '../data/mockData';
import { generateAIContent } from '../utils/aiUtils';

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

export const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (context === undefined) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
};

export const BlogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setBlogs(mockBlogs);
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const blog = mockBlogs.find(blog => blog.id === id);
      return blog;
    } catch (err) {
      setError('Failed to fetch blog');
      console.error(err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  const createBlog = async (blog: Partial<Blog>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newBlog: Blog = {
        id: `blog-${Date.now()}`,
        title: blog.title || 'Untitled Blog',
        content: blog.content || '',
        summary: blog.summary || '',
        coverImage: blog.coverImage || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
        category: blog.category || 'trends',
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: blog.authorId || 'unknown',
        tags: blog.tags || [],
        seoScore: Math.floor(Math.random() * 100)
      };

      setBlogs(prev => [...prev, newBlog]);
      return newBlog;
    } catch (err) {
      setError('Failed to create blog');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBlog = async (id: string, blogUpdate: Partial<Blog>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === id) {
          return {
            ...blog,
            ...blogUpdate,
            updatedAt: new Date().toISOString()
          };
        }
        return blog;
      });

      setBlogs(updatedBlogs);
      return updatedBlogs.find(blog => blog.id === id) as Blog;
    } catch (err) {
      setError('Failed to update blog');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    } catch (err) {
      setError('Failed to delete blog');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async (prompt: AIGenerationPrompt): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateAIContent(prompt);
      return content;
    } catch (err) {
      setError('Failed to generate content');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const value: BlogsContextType = {
    blogs,
    isLoading,
    error,
    fetchBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    generateContent
  };

  return <BlogsContext.Provider value={value}>{children}</BlogsContext.Provider>;
};