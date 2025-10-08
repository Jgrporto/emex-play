
// studio/schemaTypes/bannerTreinamento.ts

export default {
  name: 'bannerTreinamento',
  title: 'Banner (Página Treinamentos)',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título do Banner',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descricao',
      title: 'Descrição (opcional)',
      type: 'string',
    },
    {
      name: 'imagem',
      title: 'Imagem Principal do Banner',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link (para onde o banner direciona)',
      type: 'url',
      description: 'Opcional. Ex: /watch/nome-do-treinamento ou https://site.com',
    },
    // --- NOVOS CAMPOS ADICIONADOS ABAIXO ---
    {
      name: 'mostrarBotao',
      title: 'Mostrar Botão?',
      type: 'boolean',
      description: 'Marque para exibir um botão clicável no banner.',
      initialValue: false,
    },
    {
      name: 'textoDoBotao',
      title: 'Texto do Botão',
      type: 'string',
      description: 'Ex: "Acessar Treinamento", "Saiba Mais", "Ver Agora"',
      // O campo só aparece se 'mostrarBotao' estiver marcado
      hidden: ({ parent }: { parent: { mostrarBotao?: boolean } }) => !parent?.mostrarBotao,
      initialValue: 'Acessar Treinamento',
    },
    // ------------------------------------
    {
      name: 'ativo',
      title: 'Ativo',
      type: 'boolean',
      description: 'Marque para que o banner apareça no carrossel do site.',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagem',
      ativo: 'ativo',
    },
    prepare(selection: any) {
      const { title, media, ativo } = selection
      return {
        title: title,
        subtitle: ativo ? 'Visível no site' : 'Oculto',
        media: media,
      }
    },
  },
}