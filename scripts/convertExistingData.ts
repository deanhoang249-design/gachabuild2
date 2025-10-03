#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

// Import existing data
import { characters } from '../src/data/characters';
import { weapons } from '../src/data/weapons';

// Convert characters to import format
function convertCharactersToImport() {
  console.log('🔄 Converting existing character data to import format...\n');

  const convertedCharacters = characters.map(char => ({
    name: char.name,
    slug: char.id,
    role: char.role,
    weapon: char.weapon,
    rarity: char.rarity || '5★',
    element: char.element || 'Unknown',
    overview: char.overview || { en: 'No description available', vi: 'Không có mô tả' },
    image: char.image,
    splash: char.splash,
    skills: char.skills || [],
    build: char.build || {
      weapons: [],
      artifacts: [],
      statPriority: []
    },
    synergy: char.synergy || [],
    pros: char.pros || [],
    cons: char.cons || [],
    recommendedWeapons: char.recommendedWeapons || []
  }));

  const outputPath = path.join(process.cwd(), 'import', 'character_import_full.json');
  fs.writeFileSync(outputPath, JSON.stringify(convertedCharacters, null, 2));
  
  console.log(`✅ Converted ${convertedCharacters.length} characters to ${outputPath}`);
  return convertedCharacters.length;
}

// Convert weapons to import format
function convertWeaponsToImport() {
  console.log('🔄 Converting existing weapon data to import format...\n');

  const convertedWeapons = weapons.map(weapon => ({
    name: weapon.name,
    slug: weapon.id,
    type: weapon.type,
    rarity: weapon.rarity,
    description: weapon.description,
    passive: weapon.passive,
    stats: weapon.stats || {},
    image: weapon.image,
    recommendedCharacters: weapon.recommendedCharacters || []
  }));

  const outputPath = path.join(process.cwd(), 'import', 'weapon_import_full.json');
  fs.writeFileSync(outputPath, JSON.stringify(convertedWeapons, null, 2));
  
  console.log(`✅ Converted ${convertedWeapons.length} weapons to ${outputPath}`);
  return convertedWeapons.length;
}

// Main conversion function
async function convertExistingData() {
  try {
    console.log('🚀 Converting existing project data to Sanity import format...\n');

    // Ensure import directory exists
    const importDir = path.join(process.cwd(), 'import');
    if (!fs.existsSync(importDir)) {
      fs.mkdirSync(importDir, { recursive: true });
    }

    const characterCount = convertCharactersToImport();
    const weaponCount = convertWeaponsToImport();

    console.log('\n📊 Conversion Summary:');
    console.log(`✅ Characters converted: ${characterCount}`);
    console.log(`✅ Weapons converted: ${weaponCount}`);
    console.log('\n🎉 Data conversion completed!');
    console.log('\nNext steps:');
    console.log('1. Set up your Sanity project and get API credentials');
    console.log('2. Update .env.local with your Sanity credentials');
    console.log('3. Run: npm run import:characters');
    console.log('4. Run: npm run import:weapons');

  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the conversion
if (require.main === module) {
  convertExistingData();
}

export { convertExistingData, convertCharactersToImport, convertWeaponsToImport };
