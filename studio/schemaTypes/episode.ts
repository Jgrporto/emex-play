// studio/schemaTypes/episode.ts

export default {
  name: 'episode',
  title: 'Episódio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título do Episódio',
      type: 'string',
    },
    {
      name: 'episodeNumber',
      title: 'Número do Episódio',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
    },
    {
      name: 'thumbnail',
      title: 'Imagem de Capa (Thumbnail)',
      type: 'image',
    },
    {
      name: 'youtubeVideoId',
      title: 'ID do Vídeo no YouTube',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Número do Episódio, Ascendente',
      name: 'episodeNumberAsc',
      by: [{field: 'episodeNumber', direction: 'asc'}]
    }
  ]
}