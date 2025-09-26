
export default {
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Categoria',
      type: 'string',
      description: 'Ex: Ferramentas e Plataformas',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title', // Gera o slug a partir do título
        maxLength: 96,
      },
    },
  ],
}