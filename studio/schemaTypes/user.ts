// studio/schemaTypes/user.ts

export default {
  name: 'user',
  title: 'Usuário',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Imagem (Avatar)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'password',
      title: 'Senha (Hash)',
      type: 'string',
      description: 'NUNCA armazene a senha real aqui. Armazene apenas o hash gerado.'
    },
  ],
}