import { createClient } from '@sanity/client'

// Create a read-only client for checking data
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
})

async function findProblematicCharacter() {
  try {
    console.log('🔍 Searching for the problematic character with name "/characters/zephyr.svg"...\n')
    
    // Search for any document that might have this problematic name
    const problematicDocs = await sanityClient.fetch(`
      *[name match "*characters*zephyr*svg*" || name.en match "*characters*zephyr*svg*" || name.vi match "*characters*zephyr*svg*" || 
        _id match "*zephyr*" || slug.current match "*zephyr*"] {
        _id,
        _type,
        name,
        slug,
        image,
        splash,
        _createdAt,
        _updatedAt
      }
    `)
    
    console.log(`📊 Found ${problematicDocs.length} documents matching zephyr pattern:\n`)
    
    problematicDocs.forEach((doc: any, index: number) => {
      console.log(`${index + 1}. Type: ${doc._type}`)
      console.log(`   ID: ${doc._id}`)
      console.log(`   Name: ${JSON.stringify(doc.name)}`)
      console.log(`   Slug: ${JSON.stringify(doc.slug)}`)
      console.log(`   Image: ${doc.image}`)
      console.log(`   Splash: ${doc.splash}`)
      console.log(`   Created: ${doc._createdAt}`)
      console.log(`   Updated: ${doc._updatedAt}`)
      console.log('')
    })
    
    // Also search for any document with file paths in the name
    const filePathDocs = await sanityClient.fetch(`
      *[name match "*characters*" || name.en match "*characters*" || name.vi match "*characters*" ||
        name match "*.svg" || name.en match "*.svg" || name.vi match "*.svg" ||
        name match "*.jpg" || name.en match "*.jpg" || name.vi match "*.jpg" ||
        name match "*.png" || name.en match "*.png" || name.vi match "*.png"] {
        _id,
        _type,
        name,
        slug,
        image,
        splash,
        _createdAt,
        _updatedAt
      }
    `)
    
    console.log(`📊 Found ${filePathDocs.length} documents with file paths in names:\n`)
    
    filePathDocs.forEach((doc: any, index: number) => {
      console.log(`${index + 1}. Type: ${doc._type}`)
      console.log(`   ID: ${doc._id}`)
      console.log(`   Name: ${JSON.stringify(doc.name)}`)
      console.log(`   Slug: ${JSON.stringify(doc.slug)}`)
      console.log(`   Image: ${doc.image}`)
      console.log(`   Splash: ${doc.splash}`)
      console.log(`   Created: ${doc._createdAt}`)
      console.log(`   Updated: ${doc._updatedAt}`)
      console.log('')
    })
    
    // Search for any character that might have been created with wrong data
    const allCharacters = await sanityClient.fetch(`
      *[_type == 'character'] {
        _id,
        name,
        slug,
        image,
        splash,
        _createdAt,
        _updatedAt
      }
    `)
    
    console.log(`📊 Found ${allCharacters.length} characters in Sanity:\n`)
    
    allCharacters.forEach((char: any, index: number) => {
      console.log(`${index + 1}. Character: ${JSON.stringify(char.name)}`)
      console.log(`   ID: ${char._id}`)
      console.log(`   Slug: ${JSON.stringify(char.slug)}`)
      console.log(`   Image: ${char.image}`)
      console.log(`   Splash: ${char.splash}`)
      console.log(`   Created: ${char._createdAt}`)
      console.log(`   Updated: ${char._updatedAt}`)
      console.log('')
    })
    
    // Check if there are any characters with the exact problematic name
    const exactMatch = await sanityClient.fetch(`
      *[name == "/characters/zephyr.svg" || name.en == "/characters/zephyr.svg" || name.vi == "/characters/zephyr.svg"] {
        _id,
        _type,
        name,
        slug,
        image,
        splash,
        _createdAt,
        _updatedAt
      }
    `)
    
    if (exactMatch.length > 0) {
      console.log(`\n❌ FOUND EXACT MATCH for "/characters/zephyr.svg":\n`)
      exactMatch.forEach((doc: any, index: number) => {
        console.log(`${index + 1}. Type: ${doc._type}`)
        console.log(`   ID: ${doc._id}`)
        console.log(`   Name: ${JSON.stringify(doc.name)}`)
        console.log(`   Slug: ${JSON.stringify(doc.slug)}`)
        console.log(`   Image: ${doc.image}`)
        console.log(`   Splash: ${doc.splash}`)
        console.log(`   Created: ${doc._createdAt}`)
        console.log(`   Updated: ${doc._updatedAt}`)
        console.log('')
      })
    } else {
      console.log('\n✅ No exact match found for "/characters/zephyr.svg"')
    }
    
  } catch (error) {
    console.error('❌ Error searching for problematic character:', error)
    throw error
  }
}

// Run the search if this script is executed directly
if (require.main === module) {
  findProblematicCharacter()
    .then(() => {
      console.log('\n✅ Search completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Script failed:', error)
      process.exit(1)
    })
}

export { findProblematicCharacter }

