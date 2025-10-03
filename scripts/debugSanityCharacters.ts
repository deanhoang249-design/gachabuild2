import { createClient } from '@sanity/client'

// Create a read-only client for checking data
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
})

async function debugSanityCharacters() {
  try {
    console.log('🔍 Debugging Sanity characters...\n')
    
    // First, let's check all documents of any type
    const allDocs = await sanityClient.fetch(`
      *[] | order(_type asc, _createdAt desc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        name,
        slug,
        'hasName': defined(name),
        'hasSlug': defined(slug)
      }
    `)
    
    console.log(`📊 Found ${allDocs.length} total documents:\n`)
    
    allDocs.forEach((doc: any, index: number) => {
      console.log(`${index + 1}. Type: ${doc._type}`)
      console.log(`   ID: ${doc._id}`)
      console.log(`   Created: ${doc._createdAt}`)
      console.log(`   Updated: ${doc._updatedAt}`)
      
      if (doc.name) {
        console.log(`   Name: ${JSON.stringify(doc.name)}`)
      }
      
      if (doc.slug) {
        console.log(`   Slug: ${JSON.stringify(doc.slug)}`)
      }
      
      console.log('')
    })
    
    // Now specifically check for characters
    const characters = await sanityClient.fetch(`
      *[_type == 'character'] {
        _id,
        name,
        slug,
        role,
        weapon,
        rarity,
        element,
        _createdAt,
        _updatedAt
      }
    `)
    
    console.log(`\n📊 Found ${characters.length} characters specifically:\n`)
    
    characters.forEach((char: any, index: number) => {
      console.log(`${index + 1}. Character: ${JSON.stringify(char.name)}`)
      console.log(`   ID: ${char._id}`)
      console.log(`   Slug: ${JSON.stringify(char.slug)}`)
      console.log(`   Role: ${char.role}`)
      console.log(`   Weapon: ${char.weapon}`)
      console.log(`   Rarity: ${char.rarity}`)
      console.log(`   Element: ${char.element}`)
      console.log('')
    })
    
    // Check for any documents with problematic names
    const problematicDocs = allDocs.filter((doc: any) => {
      if (doc.name) {
        const nameStr = typeof doc.name === 'string' ? doc.name : doc.name.en || doc.name.vi || ''
        return nameStr.includes('/characters/') || nameStr.includes('.svg') || nameStr.includes('.jpg') || nameStr.includes('.png')
      }
      return false
    })
    
    if (problematicDocs.length > 0) {
      console.log(`\n❌ Found ${problematicDocs.length} documents with problematic names:\n`)
      
      problematicDocs.forEach((doc: any, index: number) => {
        console.log(`${index + 1}. Type: ${doc._type}`)
        console.log(`   ID: ${doc._id}`)
        console.log(`   Name: ${JSON.stringify(doc.name)}`)
        console.log('')
      })
    } else {
      console.log('\n✅ No documents with problematic names found.')
    }
    
  } catch (error) {
    console.error('❌ Error debugging Sanity characters:', error)
    throw error
  }
}

// Run the debug if this script is executed directly
if (require.main === module) {
  debugSanityCharacters()
    .then(() => {
      console.log('\n✅ Debug completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Script failed:', error)
      process.exit(1)
    })
}

export { debugSanityCharacters }
