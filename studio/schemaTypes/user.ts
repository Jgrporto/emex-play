// schemas/user.js (ou similar)
import { Rule } from 'sanity' // Importe o Rule

export default {
  name: 'user',
  title: 'Usuário',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'username',
      title: 'Nome de Usuário (para login)',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().unique(), // Deve ser único
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
      // Email agora é opcional, mas se for fornecido, deve ser único
      validation: (Rule: Rule) => Rule.unique().error('Este e-mail já está em uso'),
    },
    {
      name: 'password',
      title: 'Senha (Hash)',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
      // Opcional: esconde o campo para que não seja lido facilmente
      // readOnly: true, 
    },
    {
      name: 'image',
      title: 'Imagem de Perfil',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}