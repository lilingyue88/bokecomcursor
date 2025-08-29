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
  readingTime: number;
}

export interface Resource {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
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
  target?: '_self' | '_blank';
}

export interface ModuleData {
  name: string;
  description: string;
  icon: string;
  color: string;
  posts?: string[];
  notes?: string[];
  resources?: string[];
  albums?: string[];
}

export interface ModulesData {
  [key: string]: ModuleData;
}
