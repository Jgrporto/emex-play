
export type Training = {
  _id: string;
  title: string;
  description?: string;
  youtubeVideoId?: string;
  slug: string; // O slug DEVE ser uma string opcional           
  thumbnailUrl: string;
  fullTitle?: string;
};

export type NextTraining = {
  _id: string;
  title: string;
  slug: string;             
  thumbnailUrl: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  trainings: Training[];
};

export type PageData = {
    heroTrainings: Training[];
    categories: Category[];
};