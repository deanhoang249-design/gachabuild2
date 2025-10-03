import { MetadataRoute } from 'next'
import { characters } from '@/data/characters'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://duetnightabyss.gachabuild.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tier-list`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/characters`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/weapons`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/patch`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Character pages
  const characterPages = characters.map((character) => ({
    url: `${baseUrl}/characters/${character.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Weapon pages (if you have weapon data)
  const weaponPages = [
    'abyssal-rifle',
    'culinary-staff',
    'golden-river',
    'ice-staff',
    'judgement-edge',
    'lightning-spear',
    'maids-blade',
    'phoenix-rifle',
    'tricksters-blade',
    'windcaller-bow',
  ].map((weapon) => ({
    url: `${baseUrl}/weapon/${weapon}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...characterPages, ...weaponPages]
}
