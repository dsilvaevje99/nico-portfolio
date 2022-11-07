export interface Film {
  id: number;
  src: string;
  thumbnail: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  date: string;
  location: string;
  client?: string;
  company?: string;
  credits: Credit[];
  frames: Photo[];
  featured: Boolean;
}

export interface Credit {
  role: string;
  name: string;
}

export interface Photo {
  id: number;
  url: string;
}

export interface Inquiry {
  name: string;
  email: string;
  company: string;
  body: string;
  date: string;
}