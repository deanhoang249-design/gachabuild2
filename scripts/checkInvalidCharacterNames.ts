import { getCharacters } from '../src/lib/data'

async function checkInvalidCharacterNames() {
  console.log('🔍 Checking for invalid character names in Sanity...\n')
  
  try {
    // Fetch characters from Sanity
    const characters = await getCharacters()
    console.log(`📊 Found ${characters.length} characters in Sanity\n`)
    
    const issues: Array<{
      index: number
      id: string
      name: any
      issues: string[]
    }> = []
    
    characters.forEach((char, index) => {
      const charIssues = []
      
      // Check if name contains file paths
      if (char.name?.en && (char.name.en.includes('/characters/') || char.name.en.includes('.svg') || char.name.en.includes('.jpg') || char.name.en.includes('.png'))) {
        charIssues.push(`English name contains file path: ${char.name.en}`)
      }
      
      if (char.name?.vi && (char.name.vi.includes('/characters/') || char.name.vi.includes('.svg') || char.name.vi.includes('.jpg') || char.name.vi.includes('.png'))) {
        charIssues.push(`Vietnamese name contains file path: ${char.name.vi}`)
      }
      
      // Check if name is empty or invalid
      if (!char.name?.en || char.name.en.trim() === '') {
        charIssues.push('Empty or missing English name')
      }
      
      if (!char.name?.vi || char.name.vi.trim() === '') {
        charIssues.push('Empty or missing Vietnamese name')
      }
      
      // Check if name is the same as image path
      if (char.image && char.name?.en === char.image) {
        charIssues.push(`Name matches image path: ${char.name.en}`)
      }
      
      if (char.splash && char.name?.en === char.splash) {
        charIssues.push(`Name matches splash path: ${char.name.en}`)
      }
      
      if (charIssues.length > 0) {
        issues.push({
          index: index + 1,
          id: char._id,
          name: char.name,
          issues: charIssues
        })
      }
      
      console.log(`${index + 1}. ${char.name?.en || 'Unknown'} (${char._id})`)
      if (charIssues.length > 0) {
        console.log(`   ❌ Issues: ${charIssues.join(', ')}`)
      } else {
        console.log(`   ✅ OK`)
      }
    })
    
    console.log(`\n📊 Found ${issues.length} problematic characters out of ${characters.length} total.\n`)
    
    // Summary
    console.log('=' .repeat(50))
    console.log(`📈 SUMMARY:`)
    console.log(`   Sanity characters: ${characters.length} (${issues.length} problematic)`)
    
    if (issues.length > 0) {
      console.log('\n❌ PROBLEMATIC CHARACTERS:')
      issues.forEach(char => {
        console.log(`   - ${char.name?.en || 'Unknown'} (${char.id}) - ${char.issues.length} issues`)
        char.issues.forEach((issue: string) => console.log(`     • ${issue}`))
      })
    }
    
    if (issues.length === 0) {
      console.log('\n🎉 All character names look good! No problematic names found.')
    }
    
    return { issues }
    
  } catch (error) {
    console.error('❌ Error fetching characters from Sanity:', error)
    console.log('\n💡 Make sure your Sanity configuration is correct and data has been imported.')
    return { issues: [] }
  }
}

// Run the check if this script is executed directly
if (require.main === module) {
  checkInvalidCharacterNames()
  console.log('\n✅ Character name check completed!')
}

export { checkInvalidCharacterNames }
