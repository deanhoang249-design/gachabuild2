import { defineType, defineField } from 'sanity'

export const character = defineType({
  name: 'character',
  title: 'Character',
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
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Vanguard', value: 'Vanguard' },
          { title: 'Support', value: 'Support' },
          { title: 'Annihilator', value: 'Annihilator' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'weapon',
      title: 'Weapon',
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
          { title: '3★', value: '3★' },
          { title: '4★', value: '4★' },
          { title: '5★', value: '5★' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'element',
      title: 'Element',
      type: 'string',
      options: {
        list: [
          { title: 'Fire', value: 'Fire' },
          { title: 'Water', value: 'Water' },
          { title: 'Earth', value: 'Earth' },
          { title: 'Wind', value: 'Wind' },
          { title: 'Light', value: 'Light' },
          { title: 'Dark', value: 'Dark' },
          { title: 'Ice', value: 'Ice' },
          { title: 'Lightning', value: 'Lightning' },
          { title: 'Anemo', value: 'Anemo' },
          { title: 'Psychic', value: 'Psychic' },
          { title: 'Moon', value: 'Moon' },
          { title: 'Sound', value: 'Sound' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'vi', title: 'Vietnamese', type: 'text' }
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
          description: 'Alternative text for the image'
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'splash',
      title: 'Splash Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the splash image'
        }
      ]
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'vi', title: 'Vietnamese', type: 'string' }
              ]
            },
            {
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'vi', title: 'Vietnamese', type: 'text' }
              ]
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Active', value: 'active' },
                  { title: 'Passive', value: 'passive' }
                ]
              }
            },
            { name: 'cooldown', title: 'Cooldown', type: 'string' },
            { name: 'cost', title: 'Cost', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'build',
      title: 'Build Recommendation',
      type: 'object',
      fields: [
        {
          name: 'weapons',
          title: 'Recommended Weapons',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'artifacts',
          title: 'Recommended Artifacts',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'statPriority',
          title: 'Stat Priority',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'recommendedWeapons',
      title: 'Recommended Weapons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'slug', title: 'Slug', type: 'string' },
            {
              name: 'priority',
              title: 'Priority',
              type: 'string',
              options: {
                list: [
                  { title: 'High', value: 'High' },
                  { title: 'Medium', value: 'Medium' },
                  { title: 'Low', value: 'Low' }
                ]
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'synergy',
      title: 'Team Synergy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'partner', title: 'Partner', type: 'string' },
            {
              name: 'reason',
              title: 'Reason',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'vi', title: 'Vietnamese', type: 'text' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'vi', title: 'Vietnamese', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'en', title: 'English', type: 'string' },
            { name: 'vi', title: 'Vietnamese', type: 'string' }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'role',
      media: 'image'
    }
  }
})
