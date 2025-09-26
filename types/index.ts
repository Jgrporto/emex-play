// types/index.ts

export type Training = {
  _id: string;
  title: string;
  thumbnailUrl: string;
  description?: string;
  slug: { current: string };
  fullTitle?: string;
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