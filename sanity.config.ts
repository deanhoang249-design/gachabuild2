import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'gachabuild',
  title: 'GachaBuild CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Characters')
              .child(
                S.documentTypeList('character')
                  .title('Characters')
                  .filter('_type == "character"')
              ),
            S.listItem()
              .title('Weapons')
              .child(
                S.documentTypeList('weapon')
                  .title('Weapons')
                  .filter('_type == "weapon"')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['character', 'weapon'].includes(listItem.getId()!)
            ),
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
