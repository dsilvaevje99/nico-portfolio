export enum NotificationType {
  error = "error",
  success = "success",
}
export interface Notification {
  type: NotificationType;
  id: symbol;
  statusCode: string;
  message: string;
}

export interface Film {
  _id: string;
  placement: number;
  src: string;
  thumbnail: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  date: string;
  location: string;
  client: string;
  company: string;
  credits: Credit[];
  framesUrl: string;
  frames?: Photo[];
  featured: Boolean;
}

export interface Credit {
  role: string;
  name: string[];
}

export interface Photo {
  id: number;
  url: string;
  alt: string;
}

export interface AdminURLs {
  _id: string;
  photoPageAlbum: string;
  profilePic: string;
  processOne: string;
  processTwo: string;
  processThree: string;
  carouselAlbum: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  company: string;
  body: string;
  date: Date;
  opened: boolean;
}
