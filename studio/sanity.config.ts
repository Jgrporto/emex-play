// studio/sanity.config.ts

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'EMEX Play Studio', // Você pode mudar o título do seu painel aqui

  projectId: 'w3oxdhv9', // Mantenha o que já estiver aqui
  dataset: 'production',    // Mantenha o que já estiver aqui

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo Principal')
          .items([
            // Item de configuração "Singleton" para a Página Principal
            S.listItem()
              .title('Configurações da Página Principal')
              .icon(() => '🏠') // Ícone de casinha
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage') // ID fixo, garantindo que só exista um
              ),

            // Adiciona um separador visual
            S.divider(),

            // Lista o resto dos nossos tipos de documento (Categoria, Treinamento)
            ...S.documentTypeListItems().filter(
              (listItem) => !['homepage'].includes(listItem.getId()!)
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})