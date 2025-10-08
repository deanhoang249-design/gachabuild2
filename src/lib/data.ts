import { sanityClient } from './sanity'
import { 
  CHARACTERS_QUERY, 
  CHARACTER_BY_SLUG_QUERY, 
  WEAPONS_QUERY, 
  WEAPON_BY_SLUG_QUERY,
  CHARACTER_SLUGS_QUERY,
  WEAPON_SLUGS_QUERY,
  SEARCH_CHARACTERS_QUERY,
  SEARCH_WEAPONS_QUERY,
  UNIFIED_SEARCH_QUERY
} from './queries'

// Types (matching your existing structure)
export type Language = 'en' | 'vi'

export interface MultilingualText {
  en: string
  vi: string
}

export interface Character {
  _id: string
  name: MultilingualText
  slug: {
    _type: 'slug'
    current: string
  }
  role: string
  weapon: string
  image?: string
  splash?: string
  rarity?: string
  element?: string
  overview?: MultilingualText
  skills?: Skill[]
  build?: BuildRecommendation
  synergy?: TeamSynergy[]
  pros?: MultilingualText[]
  cons?: MultilingualText[]
  recommendedWeapons?: {
    name: string
    slug: string
    priority: 'High' | 'Medium' | 'Low'
  }[]
}

export interface Skill {
  name: MultilingualText
  description: MultilingualText
  type: 'active' | 'passive'
  cooldown?: string
  cost?: string
}

export interface BuildRecommendation {
  weapons: string[]
  artifacts: string[]
  statPriority: string[]
}

export interface TeamSynergy {
  partner: string
  reason: MultilingualText
}

export interface Weapon {
  _id: string
  name: MultilingualText
  slug: {
    _type: 'slug'
    current: string
  }
  type: string
  rarity: string
  image?: string
  description: MultilingualText
  passive?: MultilingualText
  stats?: {
    attack?: number
    health?: number
    defense?: number
    critRate?: number
    critDamage?: number
  }
  recommendedCharacters?: string[]
}

// Search result types
export interface SearchResult {
  _id: string
  name: MultilingualText
  slug: {
    _type: 'slug'
    current: string
  }
  _type: 'character' | 'weapon'
  image?: string
  // Character specific fields
  role?: string
  weapon?: string
  rarity?: string
  element?: string
  splash?: string
  // Weapon specific fields
  type?: string
  description?: MultilingualText
}

export interface UnifiedSearchResults {
  characters: SearchResult[]
  weapons: SearchResult[]
}

// Data fetching functions - Sanity only
export async function getCharacters(): Promise<Character[]> {
  try {
    const characters = await sanityClient.fetch(CHARACTERS_QUERY)
    if (!characters || characters.length === 0) {
      throw new Error('No characters found in Sanity. Please import data first.')
    }
    return characters
  } catch (error) {
    console.error('Failed to fetch characters from Sanity:', error)
    throw new Error('Unable to fetch characters. Please check your Sanity configuration and import data.')
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  try {
    const character = await sanityClient.fetch(CHARACTER_BY_SLUG_QUERY, { slug })
    if (!character) {
      throw new Error(`Character with slug "${slug}" not found`)
    }
    return character
  } catch (error) {
    console.error(`Failed to fetch character "${slug}" from Sanity:`, error)
    throw new Error(`Unable to fetch character "${slug}". Please check your Sanity configuration.`)
  }
}

export async function getWeapons(): Promise<Weapon[]> {
  try {
    const weapons = await sanityClient.fetch(WEAPONS_QUERY)
    if (!weapons || weapons.length === 0) {
      throw new Error('No weapons found in Sanity')
    }
    return weapons
  } catch (error) {
    console.error('Failed to fetch weapons from Sanity:', error)
    throw new Error('Unable to fetch weapons. Please check your Sanity configuration.')
  }
}

export async function getWeaponBySlug(slug: string): Promise<Weapon | null> {
  try {
    const weapon = await sanityClient.fetch(WEAPON_BY_SLUG_QUERY, { slug })
    if (!weapon) {
      throw new Error(`Weapon with slug "${slug}" not found`)
    }
    return weapon
  } catch (error) {
    console.error(`Failed to fetch weapon "${slug}" from Sanity:`, error)
    throw new Error(`Unable to fetch weapon "${slug}". Please check your Sanity configuration.`)
  }
}

export async function getCharacterSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch(CHARACTER_SLUGS_QUERY)
    if (!slugs || slugs.length === 0) {
      throw new Error('No character slugs found in Sanity')
    }
    return slugs
  } catch (error) {
    console.error('Failed to fetch character slugs from Sanity:', error)
    throw new Error('Unable to fetch character slugs. Please check your Sanity configuration.')
  }
}

export async function getWeaponSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch(WEAPON_SLUGS_QUERY)
    if (!slugs || slugs.length === 0) {
      throw new Error('No weapon slugs found in Sanity')
    }
    return slugs
  } catch (error) {
    console.error('Failed to fetch weapon slugs from Sanity:', error)
    throw new Error('Unable to fetch weapon slugs. Please check your Sanity configuration.')
  }
}

// Search functions
export async function searchCharacters(searchTerm: string): Promise<SearchResult[]> {
  try {
    if (!searchTerm.trim()) return []
    
    const results = await sanityClient.fetch(SEARCH_CHARACTERS_QUERY, { 
      searchTerm: searchTerm.toLowerCase() 
    })
    
    return results.map((char: Record<string, unknown>) => ({
      _id: char._id,
      name: char.name,
      slug: char.slug,
      _type: 'character' as const,
      image: char.image,
      role: char.role,
      weapon: char.weapon,
      rarity: char.rarity,
      element: char.element,
      splash: char.splash
    }))
  } catch (error) {
    console.error('Failed to search characters:', error)
    return []
  }
}

export async function searchWeapons(searchTerm: string): Promise<SearchResult[]> {
  try {
    if (!searchTerm.trim()) return []
    
    const results = await sanityClient.fetch(SEARCH_WEAPONS_QUERY, { 
      searchTerm: searchTerm.toLowerCase() 
    })
    
    return results.map((weapon: Record<string, unknown>) => ({
      _id: weapon._id,
      name: weapon.name,
      slug: weapon.slug,
      _type: 'weapon' as const,
      image: weapon.image,
      type: weapon.type,
      rarity: weapon.rarity,
      description: weapon.description
    }))
  } catch (error) {
    console.error('Failed to search weapons:', error)
    return []
  }
}

export async function unifiedSearch(searchTerm: string): Promise<UnifiedSearchResults> {
  try {
    if (!searchTerm.trim()) {
      return { characters: [], weapons: [] }
    }
    
    const results = await sanityClient.fetch(UNIFIED_SEARCH_QUERY, { 
      searchTerm: searchTerm.toLowerCase() 
    })
    
    return {
      characters: results.characters || [],
      weapons: results.weapons || []
    }
  } catch (error) {
    console.error('Failed to perform unified search:', error)
    return { characters: [], weapons: [] }
  }
}