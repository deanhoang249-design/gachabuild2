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
