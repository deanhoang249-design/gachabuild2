import { createClient } from '@sanity/client'

// Create a client for data operations
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
})

interface ProblematicCharacter {
  id: string
  name: string
  slug: string
  issues: string[]
}

async function deleteProblematicCharacters(characterIds: string[], dryRun: boolean = true) {
  try {
    console.log(`🔍 ${dryRun ? 'DRY RUN: Would delete' : 'Deleting'} ${characterIds.length} problematic characters...\n`)
    
    for (const characterId of characterIds) {
      try {
        // First, let's get the character details to show what we're deleting
        const character = await sanityClient.fetch(`
          *[_id == $id][0] {
            _id,
            name,
            slug
          }
        `, { id: characterId })
        
        if (!character) {
          console.log(`⚠️  Character with ID ${characterId} not found, skipping...`)
          continue
        }
        
        console.log(`${dryRun ? '🗑️  Would delete' : '🗑️  Deleting'}: ${character.name?.en || 'Unknown'} (${character.slug?.current || 'no-slug'})`)
        
        if (!dryRun) {
          // Actually delete the character
          await sanityClient.delete(characterId)
          console.log(`   ✅ Deleted successfully`)
        } else {
          console.log(`   🔍 Would be deleted (dry run mode)`)
        }
        
      } catch (error) {
        console.error(`   ❌ Error ${dryRun ? 'checking' : 'deleting'} character ${characterId}:`, error)
      }
    }
    
    if (dryRun) {
      console.log('\n💡 This was a dry run. To actually delete these characters, run:')
      console.log('   npm run delete-problematic-characters -- --execute')
    } else {
      console.log('\n✅ Deletion completed!')
    }
    
  } catch (error) {
    console.error('❌ Error deleting characters:', error)
    throw error
  }
}

async function deleteAllProblematicCharacters(dryRun: boolean = true) {
  try {
    console.log('🔍 Finding all problematic characters...\n')
    
    // Get all characters and identify problematic ones
    const characters = await sanityClient.fetch(`
      *[_type == 'character'] | order(name.en asc) {
        _id,
        name,
        slug,
        role,
        weapon,
        rarity,
        element,
        'hasImage': defined(image),
        'hasSplash': defined(splash),
        'hasOverview': defined(overview),
        'hasSkills': defined(skills) && count(skills) > 0,
        'hasBuild': defined(build),
        'hasRecommendedWeapons': defined(recommendedWeapons) && count(recommendedWeapons) > 0,
        'hasSynergy': defined(synergy) && count(synergy) > 0,
        'hasPros': defined(pros) && count(pros) > 0,
        'hasCons': defined(cons) && count(cons) > 0
      }
    `)

    const problematicCharacters: ProblematicCharacter[] = []
    
    characters.forEach((char: any) => {
      const issues = []
      
      // Check for missing required fields
      if (!char.name?.en) issues.push('Missing English name')
      if (!char.name?.vi) issues.push('Missing Vietnamese name')
      if (!char.slug?.current) issues.push('Missing slug')
      if (!char.role) issues.push('Missing role')
      if (!char.weapon) issues.push('Missing weapon')
      if (!char.rarity) issues.push('Missing rarity')
      if (!char.element) issues.push('Missing element')
      if (!char.hasImage) issues.push('Missing image')
      
      // Check for empty or incomplete data
      if (!char.hasOverview) issues.push('Missing overview')
      if (!char.hasSkills) issues.push('Missing skills')
      if (!char.hasBuild) issues.push('Missing build recommendation')
      if (!char.hasRecommendedWeapons) issues.push('Missing recommended weapons')
      if (!char.hasSynergy) issues.push('Missing team synergy')
      if (!char.hasPros) issues.push('Missing pros')
      if (!char.hasCons) issues.push('Missing cons')
      
      // Check for invalid data
      if (char.name?.en && char.name.en.trim() === '') issues.push('Empty English name')
      if (char.name?.vi && char.name.vi.trim() === '') issues.push('Empty Vietnamese name')
      if (char.slug?.current && char.slug.current.trim() === '') issues.push('Empty slug')
      
      if (issues.length > 0) {
        problematicCharacters.push({
          id: char._id,
          name: char.name?.en || 'Unknown',
          slug: char.slug?.current || 'no-slug',
          issues
        })
      }
    })

    console.log(`Found ${problematicCharacters.length} problematic characters out of ${characters.length} total characters.\n`)
    
    if (problematicCharacters.length === 0) {
      console.log('🎉 No problematic characters found! Nothing to delete.')
      return
    }

    // Show the problematic characters
    console.log('❌ Problematic characters:')
    problematicCharacters.forEach((char, index) => {
      console.log(`${index + 1}. ${char.name} (${char.slug})`)
      console.log(`   Issues: ${char.issues.join(', ')}`)
    })
    console.log('')

    // Delete them
    const characterIds = problematicCharacters.map(char => char.id)
    await deleteProblematicCharacters(characterIds, dryRun)
    
  } catch (error) {
    console.error('❌ Error in deleteAllProblematicCharacters:', error)
    throw error
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2)
  const isDryRun = !args.includes('--execute')
  
  if (isDryRun) {
    console.log('🔍 Running in DRY RUN mode. Use --execute to actually delete characters.\n')
  } else {
    console.log('⚠️  EXECUTION MODE: Characters will be permanently deleted!\n')
  }
  
  try {
    await deleteAllProblematicCharacters(isDryRun)
  } catch (error) {
    console.error('❌ Script failed:', error)
    process.exit(1)
  }
}

// Run the script if executed directly
if (require.main === module) {
  main()
}

export { deleteProblematicCharacters, deleteAllProblematicCharacters }
