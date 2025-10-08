#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

interface WeaponImport {
  name: { en: string; vi: string };
  slug: string;
  type: string;
  rarity: string;
  description: { en: string; vi: string };
  passive?: { en: string; vi: string };
  stats?: any;
  image?: string;
  recommendedCharacters?: string[];
}

async function fixWeaponImageFields() {
  try {
    console.log('🔧 Fixing image fields in weapon import data...\n');

    // Read the weapon import file
    const jsonPath = path.join(process.cwd(), 'import', 'weapon_import.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('❌ Weapon import file not found:', jsonPath);
      process.exit(1);
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const weapons: WeaponImport[] = JSON.parse(jsonData);

    if (!Array.isArray(weapons)) {
      console.error('❌ Invalid JSON format. Expected an array of weapons.');
      process.exit(1);
    }

    console.log(`📊 Found ${weapons.length} weapons to process\n`);

    // Create backup
    const backupPath = path.join(process.cwd(), 'import', 'weapon_import_backup.json');
    fs.writeFileSync(backupPath, jsonData);
    console.log(`💾 Created backup: ${backupPath}\n`);

    // Fix each weapon by removing problematic image fields
    let fixedCount = 0;
    const fixedWeapons = weapons.map(weapon => {
      const hasImageField = weapon.image !== undefined;
      
      if (hasImageField) {
        console.log(`🔧 Fixing ${weapon.name.en}:`);
        console.log(`   - Removing image field: ${weapon.image}`);
        fixedCount++;
      }

      // Remove image field
      const { image, ...fixedWeapon } = weapon;
      return fixedWeapon;
    });

    // Write the fixed data back to the file
    fs.writeFileSync(jsonPath, JSON.stringify(fixedWeapons, null, 2));
    
    console.log(`\n✅ Successfully fixed ${fixedCount} weapons`);
    console.log(`📁 Updated file: ${jsonPath}`);
    console.log(`💾 Backup created: ${backupPath}`);
    console.log('\n🎉 Image fields have been removed from weapon import data!');
    console.log('   You can now import weapons without the problematic image fields.');

  } catch (error) {
    console.error('❌ Error fixing weapon image fields:', error);
    process.exit(1);
  }
}

// Run the script
fixWeaponImageFields();
