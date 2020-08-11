export interface UserMinimal {
  id: number;
  name: string;
}

export interface Film {
  id: number;
  date: number;
  description: string;
  director: string;
  genre: string;
  name: string;
  backgroundColor: string;
  backgroundImage: string;
  posterImage: string;
  previewImage: string;
  previewVideo: string;
  videoMain: string;
  rating: number;
  scoresCount: number;
  starring: string[];
  runtime: number;
  isFavorite: boolean;
}

export interface Comment {
  id: number;
  user: UserMinimal;
  rating: number;
  comment: string;
  date: string;
}

export interface UserMaximum {
  id: number;
  name: string;
  email: string;
  avatar: string;
}
