
// --- NOVO TIPO PARA EPISÓDIOS ---
export type Episode = {
  _id: string;
  title: string;
  episodeNumber: number;
  description: string;
  thumbnail: {
    asset: {
      url: string;
    };
  };
  youtubeVideoId: string;
};

// --- TIPO TRAINING ATUALIZADO ---
export type Training = {
  _id: string;
  title: string;
  slug?: string;
  thumbnailUrl: string;
  description?: string;
  fullTitle?: string;
  tag?: string;
  numeroDeTreinamentos?: string;
  episodes?: Episode[];
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

export type SanityImageObject = {
  asset: {
    url: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Banner = {
  _id: string;
  titulo: string;
  descricao?: string;
  link?: string;
  imagem: SanityImageObject; // Alterado aqui
  imagemUrlOtimizada: string;
  mostrarBotao?: boolean; // <-- ADICIONADO
  textoDoBotao?: string;  // <-- ADICIONADO
};