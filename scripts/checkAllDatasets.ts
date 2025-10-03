import { createClient } from '@sanity/client'

// Check multiple datasets
const datasets = ['production', 'development', 'staging']
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd'

async function checkAllDatasets() {
  console.log('🔍 Checking all datasets for problematic characters...\n')
  
  for (const dataset of datasets) {
    console.log(`📊 Checking dataset: ${dataset}`)
    
    try {
      const client = createClient({
        projectId,
        dataset,
        useCdn: false,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      })
      
      // Check for characters
      const characters = await client.fetch(`
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
      
      console.log(`   Found ${characters.length} characters`)
      
      // Check for problematic characters
      const problematicCharacters = characters.filter((char: any) => {
        const nameStr = typeof char.name === 'string' ? char.name : char.name?.en || char.name?.vi || ''
        return nameStr.includes('/characters/') || nameStr.includes('.svg') || nameStr.includes('.jpg') || nameStr.includes('.png')
      })
      
      if (problematicCharacters.length > 0) {
        console.log(`   ❌ Found ${problematicCharacters.length} problematic characters:`)
        problematicCharacters.forEach((char: any, index: number) => {
          console.log(`     ${index + 1}. ${JSON.stringify(char.name)} (${char._id})`)
        })
      } else {
        console.log(`   ✅ No problematic characters found`)
      }
      
      // Check for any document with the exact problematic name
      const exactMatch = await client.fetch(`
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
        console.log(`   ❌ FOUND EXACT MATCH for "/characters/zephyr.svg":`)
        exactMatch.forEach((doc: any, index: number) => {
          console.log(`     ${index + 1}. Type: ${doc._type}, ID: ${doc._id}`)
        })
      }
      
    } catch (error) {
      console.log(`   ⚠️  Error checking dataset ${dataset}: ${error instanceof Error ? error.message : String(error)}`)
    }
    
    console.log('')
  }
  
  console.log('✅ Dataset check completed!')
}

// Run the check if this script is executed directly
if (require.main === module) {
  checkAllDatasets()
    .then(() => {
      console.log('\n✅ All datasets checked!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Script failed:', error)
      process.exit(1)
    })
}

export { checkAllDatasets }
