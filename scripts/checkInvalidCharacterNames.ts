import { characters as staticCharacters } from '../src/data/characters'
import { fallbackCharacters } from '../src/lib/fallbackData'

function checkInvalidCharacterNames() {
  console.log('🔍 Checking for invalid character names...\n')
  
  // Check static characters
  console.log('📊 Checking static characters:')
  const staticIssues: Array<{
    index: number
    id: string
    name: any
    issues: string[]
  }> = []
  
  staticCharacters.forEach((char, index) => {
    const issues = []
    
    // Check if name contains file paths
    if (char.name?.en && (char.name.en.includes('/characters/') || char.name.en.includes('.svg') || char.name.en.includes('.jpg') || char.name.en.includes('.png'))) {
      issues.push(`English name contains file path: ${char.name.en}`)
    }
    
    if (char.name?.vi && (char.name.vi.includes('/characters/') || char.name.vi.includes('.svg') || char.name.vi.includes('.jpg') || char.name.vi.includes('.png'))) {
      issues.push(`Vietnamese name contains file path: ${char.name.vi}`)
    }
    
    // Check if name is empty or invalid
    if (!char.name?.en || char.name.en.trim() === '') {
      issues.push('Empty or missing English name')
    }
    
    if (!char.name?.vi || char.name.vi.trim() === '') {
      issues.push('Empty or missing Vietnamese name')
    }
    
    // Check if name is the same as image path
    if (char.image && char.name?.en === char.image) {
      issues.push(`Name matches image path: ${char.name.en}`)
    }
    
    if (char.splash && char.name?.en === char.splash) {
      issues.push(`Name matches splash path: ${char.name.en}`)
    }
    
    if (issues.length > 0) {
      staticIssues.push({
        index: index + 1,
        id: char.id,
        name: char.name,
        issues
      })
    }
    
    console.log(`${index + 1}. ${char.name?.en || 'Unknown'} (${char.id})`)
    if (issues.length > 0) {
      console.log(`   ❌ Issues: ${issues.join(', ')}`)
    } else {
      console.log(`   ✅ OK`)
    }
  })
  
  console.log(`\n📊 Found ${staticIssues.length} problematic static characters out of ${staticCharacters.length} total.\n`)
  
  // Check fallback characters
  console.log('📊 Checking fallback characters:')
  const fallbackIssues: Array<{
    index: number
    id: string
    name: any
    issues: string[]
  }> = []
  
  fallbackCharacters.forEach((char, index) => {
    const issues = []
    
    // Check if name contains file paths
    if (char.name?.en && (char.name.en.includes('/characters/') || char.name.en.includes('.svg') || char.name.en.includes('.jpg') || char.name.en.includes('.png'))) {
      issues.push(`English name contains file path: ${char.name.en}`)
    }
    
    if (char.name?.vi && (char.name.vi.includes('/characters/') || char.name.vi.includes('.svg') || char.name.vi.includes('.jpg') || char.name.vi.includes('.png'))) {
      issues.push(`Vietnamese name contains file path: ${char.name.vi}`)
    }
    
    // Check if name is empty or invalid
    if (!char.name?.en || char.name.en.trim() === '') {
      issues.push('Empty or missing English name')
    }
    
    if (!char.name?.vi || char.name.vi.trim() === '') {
      issues.push('Empty or missing Vietnamese name')
    }
    
    // Check if name is the same as image path
    if (char.image && char.name?.en === char.image) {
      issues.push(`Name matches image path: ${char.name.en}`)
    }
    
    if (char.splash && char.name?.en === char.splash) {
      issues.push(`Name matches splash path: ${char.name.en}`)
    }
    
    if (issues.length > 0) {
      fallbackIssues.push({
        index: index + 1,
        id: char._id,
        name: char.name,
        issues
      })
    }
    
    console.log(`${index + 1}. ${char.name?.en || 'Unknown'} (${char._id})`)
    if (issues.length > 0) {
      console.log(`   ❌ Issues: ${issues.join(', ')}`)
    } else {
      console.log(`   ✅ OK`)
    }
  })
  
  console.log(`\n📊 Found ${fallbackIssues.length} problematic fallback characters out of ${fallbackCharacters.length} total.\n`)
  
  // Summary
  console.log('=' .repeat(50))
  console.log(`📈 SUMMARY:`)
  console.log(`   Static characters: ${staticCharacters.length} (${staticIssues.length} problematic)`)
  console.log(`   Fallback characters: ${fallbackCharacters.length} (${fallbackIssues.length} problematic)`)
  
  if (staticIssues.length > 0) {
    console.log('\n❌ PROBLEMATIC STATIC CHARACTERS:')
    staticIssues.forEach(char => {
      console.log(`   - ${char.name?.en || 'Unknown'} (${char.id}) - ${char.issues.length} issues`)
      char.issues.forEach((issue: string) => console.log(`     • ${issue}`))
    })
  }
  
  if (fallbackIssues.length > 0) {
    console.log('\n❌ PROBLEMATIC FALLBACK CHARACTERS:')
    fallbackIssues.forEach(char => {
      console.log(`   - ${char.name?.en || 'Unknown'} (${char.id}) - ${char.issues.length} issues`)
      char.issues.forEach((issue: string) => console.log(`     • ${issue}`))
    })
  }
  
  if (staticIssues.length === 0 && fallbackIssues.length === 0) {
    console.log('\n🎉 All character names look good! No problematic names found.')
  }
  
  return { staticIssues, fallbackIssues }
}

// Run the check if this script is executed directly
if (require.main === module) {
  checkInvalidCharacterNames()
  console.log('\n✅ Character name check completed!')
}

export { checkInvalidCharacterNames }
