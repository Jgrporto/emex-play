// studio/schemaTypes/training.ts

export default {
  name: 'training',
  title: 'Treinamento (Série)', // Título atualizado para refletir a nova estrutura
  type: 'document',
  fields: [
    {
      name: 'episodes',
      title: 'Episódios',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'episode' } }]
    },
    {
      name: 'title',
      title: 'Título da Série', // Título do campo atualizado
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL Amigável)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Clique em "Generate" para criar a URL a partir do título.',
    },
    {
      name: 'thumbnailUrl',
      title: 'Imagem de Capa (Poster)', // Título atualizado
      type: 'image',
      options: {
        hotspot: true, // Permite ajustar o foco da imagem nos recortes
      },
    },
    // --- NOVOS CAMPOS ADICIONADOS PARA O CARD ESTILO NETFLIX ---
    {
      name: 'tag',
      title: 'Selo/Tag (ex: RGX, Top 10)',
      type: 'string',
      description: 'Texto curto que aparece no canto superior direito da imagem do card.'
    },
    {
      name: 'numeroDeTreinamentos',
      title: 'Informação Secundária (ex: 3 Temporadas, 10 Vídeos)',
      type: 'string',
      description: 'Texto que aparece na linha de informações secundárias do card expandido.'
    },
    // -----------------------------------------------------------
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
    },
    {
      name: 'youtubeVideoId',
      title: 'ID do Vídeo Principal (Trailer)',
      type: 'string',
      description: 'Opcional. Pode ser usado para o trailer da série. Ex: 4QRPT8qozx4',
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
}