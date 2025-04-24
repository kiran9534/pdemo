export type UserRole = 'admin' | 'core';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  coverImage: string;
  category: 'trends' | 'reviews' | 'tips';
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: User;
  tags: string[];
  seoScore?: number;
}

export interface AIGenerationPrompt {
  topic: string;
  category: 'trends' | 'reviews' | 'tips';
  keywords: string[];
  tone: 'casual' | 'professional' | 'enthusiastic';
  targetLength: 'short' | 'medium' | 'long';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface BlogsContextType {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  fetchBlogs: () => Promise<void>;
  fetchBlogById: (id: string) => Promise<Blog | undefined>;
  createBlog: (blog: Partial<Blog>) => Promise<Blog>;
  updateBlog: (id: string, blog: Partial<Blog>) => Promise<Blog>;
  deleteBlog: (id: string) => Promise<void>;
  generateContent: (prompt: AIGenerationPrompt) => Promise<string>;
}