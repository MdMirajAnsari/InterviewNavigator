export interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: Date;
  author: string;
  readTime: number;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
}
