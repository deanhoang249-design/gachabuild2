#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface CharacterImport {
  name: { en: string; vi: string };
  slug: string;
  role: string;
  weapon: string;
  rarity: string;
  element: string;
  overview: { en: string; vi: string };
  image?: string;
  splash?: string;
  skills?: any[];
  build?: any;
  synergy?: any[];
  pros?: any[];
  cons?: any[];
  recommendedWeapons?: any[];
}

async function fixImageFields() {
  try {
    console.log('🔧 Fixing image fields in character import data...\n');

    // Read the character import file
    const jsonPath = path.join(process.cwd(), 'import', 'character_import.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('❌ Character import file not found:', jsonPath);
      process.exit(1);
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const characters: CharacterImport[] = JSON.parse(jsonData);

    if (!Array.isArray(characters)) {
      console.error('❌ Invalid JSON format. Expected an array of characters.');
      process.exit(1);
    }

    console.log(`📊 Found ${characters.length} characters to process\n`);

    // Create backup
    const backupPath = path.join(process.cwd(), 'import', 'character_import_backup.json');
    fs.writeFileSync(backupPath, jsonData);
    console.log(`💾 Created backup: ${backupPath}\n`);

    // Fix each character by removing problematic image fields
    let fixedCount = 0;
    const fixedCharacters = characters.map(character => {
      const hasImageField = character.image !== undefined;
      const hasSplashField = character.splash !== undefined;
      
      if (hasImageField || hasSplashField) {
        console.log(`🔧 Fixing ${character.name.en}:`);
        if (hasImageField) {
          console.log(`   - Removing image field: ${character.image}`);
        }
        if (hasSplashField) {
          console.log(`   - Removing splash field: ${character.splash}`);
        }
        fixedCount++;
      }

      // Remove image and splash fields
      const { image, splash, ...fixedCharacter } = character;
      return fixedCharacter;
    });

    // Write the fixed data back to the file
    fs.writeFileSync(jsonPath, JSON.stringify(fixedCharacters, null, 2));
    
    console.log(`\n✅ Successfully fixed ${fixedCount} characters`);
    console.log(`📁 Updated file: ${jsonPath}`);
    console.log(`💾 Backup created: ${backupPath}`);
    console.log('\n🎉 Image fields have been removed from import data!');
    console.log('   You can now import characters without the problematic image fields.');

  } catch (error) {
    console.error('❌ Error fixing image fields:', error);
    process.exit(1);
  }
}

// Run the script
fixImageFields();
