
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

export interface CategoryPageItem {
  _id: string;
  title: string;
  slug: string;
  posterUrl?: string; // URL da imagem de fundo para o card
}

// --- TIPO TRAINING ATUALIZADO ---
export type Training = {
  _id: string;
  title: string;
  slug: { current: string }; // Já deve existir
  thumbnailUrl?: string;     // Já deve existir
  duration?: string;         // <-- ADICIONE ESTA LINHA
  level?: string;            // <-- ADICIONE ESTA LINHA
  description?: string;
  fullTitle?: string;
  category?: Category;
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
  name: string;
  trainings: Training[];
  description?: string;
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