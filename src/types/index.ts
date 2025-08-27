export interface Post {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  summary: string;
  cover?: string;
  tags: string[];
  readingTime: number;
  content: string;
  resources?: string[];
  series?: string;
}

export interface Note {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface Resource {
  title: string;
  url: string;
  category: string;
  tags: string[];
  description: string;
}

export interface GalleryItem {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  url: string;
  github: string;
  email: string;
  social: {
    github?: string;
    twitter?: string;
    weibo?: string;
    zhihu?: string;
    bilibili?: string;
    linkedin?: string;
  };
}

export interface NavigationItem {
  name: string;
  href: string;
}
