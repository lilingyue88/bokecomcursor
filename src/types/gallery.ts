export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: string;
  tags: string[];
  width?: number;
  height?: number;
  createdAt: string;
}

export interface Album {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover: string;
  category: string;
  tags: string[];
  createdAt: string;
  imageCount: number;
  images: GalleryImage[];
}

export interface GalleryData {
  albums: Album[];
}
