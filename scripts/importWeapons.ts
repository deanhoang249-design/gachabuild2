#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { sanityClient, createDocumentId, logProgress, handleError } from './sanityConfig';

// Types for weapon data
interface MultilingualText {
  en: string;
  vi: string;
}

interface WeaponStats {
  attack?: number;
  health?: number;
  defense?: number;
  critRate?: number;
  critDamage?: number;
}

interface WeaponImport {
  name: MultilingualText;
  slug: string;
  type: string;
  rarity: string;
  description: MultilingualText;
  passive?: MultilingualText;
  stats?: WeaponStats;
  image?: string;
  recommendedCharacters?: string[];
}

async function importWeapons() {
  try {
    console.log('🚀 Starting weapon import to Sanity...\n');

    // Read the JSON file
    const jsonPath = path.join(process.cwd(), 'import', 'weapon_import_full.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('❌ Weapon import file not found:', jsonPath);
      console.error('Please run: npm run convert:data first');
      process.exit(1);
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const weapons: WeaponImport[] = JSON.parse(jsonData);

    if (!Array.isArray(weapons)) {
      console.error('❌ Invalid JSON format. Expected an array of weapons.');
      process.exit(1);
    }

    console.log(`📁 Found ${weapons.length} weapons to import\n`);

    let successCount = 0;
    let errorCount = 0;

    // Process each weapon
    for (let i = 0; i < weapons.length; i++) {
      const weapon = weapons[i];
      logProgress(i + 1, weapons.length, weapon.name.en);

      try {
        const documentId = createDocumentId('weapon', weapon.slug);
        
        // Prepare the document for Sanity
        const sanityDocument = {
          _id: documentId,
          _type: 'weapon',
          name: weapon.name,
          slug: {
            _type: 'slug',
            current: weapon.slug
          },
          type: weapon.type,
          rarity: weapon.rarity,
          description: weapon.description,
          ...(weapon.passive && { passive: weapon.passive }),
          ...(weapon.stats && { stats: weapon.stats }),
          // Note: Image field is commented out as it needs to be uploaded as an asset in Sanity
          // ...(weapon.image && { image: weapon.image }),
          ...(weapon.recommendedCharacters && { recommendedCharacters: weapon.recommendedCharacters }),
        };

        // Create or replace the document
        await sanityClient.createOrReplace(sanityDocument);
        
        console.log(`✅ Successfully imported: ${weapon.name.en} (${weapon.slug})`);
        successCount++;

      } catch (error) {
        if (handleError(error, weapon.name.en)) {
          errorCount++;
        }
      }
    }

    // Summary
    console.log('\n📊 Import Summary:');
    console.log(`✅ Successfully imported: ${successCount} weapons`);
    console.log(`❌ Failed to import: ${errorCount} weapons`);
    console.log(`📁 Total processed: ${weapons.length} weapons`);

    if (errorCount > 0) {
      console.log('\n⚠️  Some weapons failed to import. Check the errors above.');
      process.exit(1);
    } else {
      console.log('\n🎉 All weapons imported successfully!');
    }

  } catch (error) {
    console.error('❌ Fatal error during import:', error);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  importWeapons();
}

export { importWeapons };
