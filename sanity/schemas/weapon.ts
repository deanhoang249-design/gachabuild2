import { defineType, defineField } from 'sanity'

export const weapon = defineType({
  name: 'weapon',
  title: 'Weapon',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string', validation: Rule => Rule.required() },
        { name: 'vi', title: 'Vietnamese', type: 'string', validation: Rule => Rule.required() }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Sword', value: 'Sword' },
          { title: 'Bow', value: 'Bow' },
          { title: 'Staff', value: 'Staff' },
          { title: 'Sniper', value: 'Sniper' },
          { title: 'Spear', value: 'Spear' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rarity',
      title: 'Rarity',
      type: 'string',
      options: {
        list: [
          { title: 'R', value: 'R' },
          { title: 'SR', value: 'SR' },
          { title: 'SSR', value: 'SSR' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'vi', title: 'Vietnamese', type: 'text' }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'passive',
      title: 'Passive Effect',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'vi', title: 'Vietnamese', type: 'text' }
      ]
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        { name: 'attack', title: 'Attack', type: 'number' },
        { name: 'health', title: 'Health', type: 'number' },
        { name: 'defense', title: 'Defense', type: 'number' },
        { name: 'critRate', title: 'Crit Rate', type: 'number' },
        { name: 'critDamage', title: 'Crit Damage', type: 'number' }
      ]
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the weapon image'
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'recommendedCharacters',
      title: 'Recommended Characters',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'type',
      media: 'image'
    }
  }
})
