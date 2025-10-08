import groq from 'groq'

// Character queries
export const CHARACTERS_QUERY = groq`
  *[_type == 'character'] | order(name.en asc) {
    _id,
    name,
    slug,
    role,
    weapon,
    rarity,
    element,
    overview,
    image,
    splash,
    skills[] {
      name,
      description,
      type,
      cooldown,
      cost
    },
    build {
      weapons,
      artifacts,
      statPriority
    },
    synergy[] {
      partner,
      reason
    },
    pros[],
    cons[],
    recommendedWeapons[] {
      name,
      slug,
      priority
    }
  }
`

export const CHARACTER_BY_SLUG_QUERY = groq`
  *[_type == 'character' && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    weapon,
    rarity,
    element,
    overview,
    image,
    splash,
    skills[] {
      name,
      description,
      type,
      cooldown,
      cost
    },
    build {
      weapons,
      artifacts,
      statPriority
    },
    synergy[] {
      partner,
      reason
    },
    pros[],
    cons[],
    recommendedWeapons[] {
      name,
      slug,
      priority
    }
  }
`

// Weapon queries
export const WEAPONS_QUERY = groq`
  *[_type == 'weapon'] | order(name.en asc) {
    _id,
    name,
    slug,
    type,
    rarity,
    description,
    passive,
    stats {
      attack,
      health,
      defense,
      critRate,
      critDamage
    },
    image,
    recommendedCharacters
  }
`

export const WEAPON_BY_SLUG_QUERY = groq`
  *[_type == 'weapon' && slug.current == $slug][0] {
    _id,
    name,
    slug,
    type,
    rarity,
    description,
    passive,
    stats {
      attack,
      health,
      defense,
      critRate,
      critDamage
    },
    image,
    recommendedCharacters
  }
`

// Character slugs for static generation
export const CHARACTER_SLUGS_QUERY = groq`
  *[_type == 'character'].slug.current
`

// Weapon slugs for static generation
export const WEAPON_SLUGS_QUERY = groq`
  *[_type == 'weapon'].slug.current
`

// Search queries for unified search functionality
export const SEARCH_CHARACTERS_QUERY = groq`
  *[_type == 'character' && (
    name.en match $searchTerm + "*" ||
    name.vi match $searchTerm + "*" ||
    role match $searchTerm + "*" ||
    element match $searchTerm + "*" ||
    weapon match $searchTerm + "*" ||
    overview.en match $searchTerm + "*" ||
    overview.vi match $searchTerm + "*"
  )] | order(name.en asc) {
    _id,
    name,
    slug,
    role,
    weapon,
    rarity,
    element,
    image,
    splash
  }
`

export const SEARCH_WEAPONS_QUERY = groq`
  *[_type == 'weapon' && (
    name.en match $searchTerm + "*" ||
    name.vi match $searchTerm + "*" ||
    type match $searchTerm + "*" ||
    description.en match $searchTerm + "*" ||
    description.vi match $searchTerm + "*" ||
    passive.en match $searchTerm + "*" ||
    passive.vi match $searchTerm + "*"
  )] | order(name.en asc) {
    _id,
    name,
    slug,
    type,
    rarity,
    image,
    description
  }
`

// Combined search query for both characters and weapons
export const UNIFIED_SEARCH_QUERY = groq`
  {
    "characters": *[_type == 'character' && (
      name.en match $searchTerm + "*" ||
      name.vi match $searchTerm + "*" ||
      role match $searchTerm + "*" ||
      element match $searchTerm + "*" ||
      weapon match $searchTerm + "*" ||
      overview.en match $searchTerm + "*" ||
      overview.vi match $searchTerm + "*"
    )] | order(name.en asc) [0...8] {
      _id,
      name,
      slug,
      role,
      weapon,
      rarity,
      element,
      image,
      splash,
      "_type": "character"
    },
    "weapons": *[_type == 'weapon' && (
      name.en match $searchTerm + "*" ||
      name.vi match $searchTerm + "*" ||
      type match $searchTerm + "*" ||
      description.en match $searchTerm + "*" ||
      description.vi match $searchTerm + "*" ||
      passive.en match $searchTerm + "*" ||
      passive.vi match $searchTerm + "*"
    )] | order(name.en asc) [0...8] {
      _id,
      name,
      slug,
      type,
      rarity,
      image,
      description,
      "_type": "weapon"
    }
  }
`
