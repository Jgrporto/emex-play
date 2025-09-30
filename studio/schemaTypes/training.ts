// studio/schemas/training.ts

export default {
  name: 'training',
  title: 'Treinamento',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Treinamento',
      type: 'string',
    },
    // --- CAMPO ADICIONADO E CORRIGIDO ---
    {
      name: 'slug',
      title: 'Slug (URL Amigável)',
      type: 'slug', // O tipo correto para habilitar o botão "Generate"
      options: {
        source: 'title', // Gera o slug a partir do campo 'title'
        maxLength: 96,
      },
      description: 'Clique em "Generate" para criar a URL a partir do título.',
    },
    // --- FIM DA CORREÇÃO ---
    {
      name: 'description',
      title: 'Descrição',
      type: 'text', // 'text' é para textos mais longos
    },
    {
      name: 'thumbnailUrl',
      title: 'Imagem de Capa (Thumbnail)',
      type: 'image',
      options: {
        hotspot: true, // Permite ajustar o foco da imagem nos recortes
      },
    },
    {
      name: 'youtubeVideoId',
      title: 'ID do Vídeo do YouTube',
      type: 'string',
      description: 'Apenas o ID, não a URL completa. Ex: 4QRPT8qozx4',
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'reference', // Este é um campo de referência
      to: [{type: 'category'}], // Ele se conecta ao nosso schema de 'Categoria'
    },
  ],
}