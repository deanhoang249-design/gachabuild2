import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create a read-only client for checking data
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '2eop0ymd',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  // No token needed for read operations
})

async function checkSanityCharacters() {
  try {
    console.log('🔍 Checking characters in Sanity database...\n')
    
    // Fetch all characters from Sanity
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

    console.log(`📊 Found ${characters.length} characters in Sanity:\n`)

    // Check for problematic characters
    const problematicCharacters: Array<{
      index: number
      id: string
      name: string
      slug: string
      issues: string[]
      isProblematic: boolean
    }> = []
    
    characters.forEach((char: any, index: number) => {
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
      
      const characterInfo = {
        index: index + 1,
        id: char._id,
        name: char.name?.en || 'Unknown',
        slug: char.slug?.current || 'no-slug',
        issues,
        isProblematic: issues.length > 0
      }
      
      if (characterInfo.isProblematic) {
        problematicCharacters.push(characterInfo)
      }
      
      // Display character info
      const status = characterInfo.isProblematic ? '❌ PROBLEMATIC' : '✅ OK'
      console.log(`${index + 1}. ${status} - ${char.name?.en || 'Unknown'} (${char.slug?.current || 'no-slug'})`)
      
      if (issues.length > 0) {
        console.log(`   Issues: ${issues.join(', ')}`)
      }
      console.log('')
    })

    // Summary
    console.log('=' .repeat(50))
    console.log(`📈 SUMMARY:`)
    console.log(`   Total characters: ${characters.length}`)
    console.log(`   Problematic characters: ${problematicCharacters.length}`)
    console.log(`   Good characters: ${characters.length - problematicCharacters.length}`)
    
    if (problematicCharacters.length > 0) {
      console.log('\n❌ PROBLEMATIC CHARACTERS:')
      problematicCharacters.forEach(char => {
        console.log(`   - ${char.name} (${char.slug}) - ${char.issues.length} issues`)
      })
      
      console.log('\n💡 You can delete problematic characters using the delete script.')
    } else {
      console.log('\n🎉 All characters look good! No problematic characters found.')
    }

    return { characters, problematicCharacters }
    
  } catch (error) {
    console.error('❌ Error checking Sanity characters:', error)
    throw error
  }
}

// Run the check if this script is executed directly
if (require.main === module) {
  checkSanityCharacters()
    .then(() => {
      console.log('\n✅ Character check completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Script failed:', error)
      process.exit(1)
    })
}

export { checkSanityCharacters }
