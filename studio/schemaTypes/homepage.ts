// studio/schemaTypes/homepage.ts

export default {
  name: 'homepage',
  title: 'Página Principal',
  type: 'document',
  fields: [
    {
      name: 'featuredTraining',
      title: 'Treinamento em Destaque (Boas-vindas)',
      type: 'reference',
      to: [{type: 'training'}],
      description: 'Selecione o treinamento que aparecerá no banner da Página de Início.',
    },
  ],
  // ADICIONE ESTE BLOCO DE CÓDIGO ABAIXO
  preview: {
    prepare() {
      // Isso define um título fixo para este documento no painel
      return {
        title: 'Configurações da Página Principal',
      }
    },
  },
}