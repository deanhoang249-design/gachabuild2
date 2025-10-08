#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { sanityClient, createDocumentId, logProgress, handleError } from './sanityConfig';

// Types for character data
interface MultilingualText {
  en: string;
  vi: string;
}

interface Skill {
  name: MultilingualText;
  description: MultilingualText;
  type: 'active' | 'passive';
  cooldown?: string;
  cost?: string;
}

interface BuildRecommendation {
  weapons: string[];
  artifacts: string[];
  statPriority: string[];
}

interface TeamSynergy {
  partner: string;
  reason: MultilingualText;
}

interface CharacterImport {
  name: MultilingualText;
  slug: string;
  role: string;
  weapon: string;
  rarity: string;
  element: string;
  overview: MultilingualText;
  image?: string;
  splash?: string;
  skills?: Skill[];
  build?: BuildRecommendation;
  synergy?: TeamSynergy[];
  pros?: MultilingualText[];
  cons?: MultilingualText[];
  recommendedWeapons?: {
    name: string;
    slug: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
}

async function importCharacters() {
  try {
    console.log('🚀 Starting character import to Sanity...\n');

    // Read the JSON file
    const jsonPath = path.join(process.cwd(), 'import', 'character_import.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.error('❌ Character import file not found:', jsonPath);
      console.error('Please run: npm run convert:data first');
      process.exit(1);
    }

    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const characters: CharacterImport[] = JSON.parse(jsonData);

    if (!Array.isArray(characters)) {
      console.error('❌ Invalid JSON format. Expected an array of characters.');
      process.exit(1);
    }

    console.log(`📁 Found ${characters.length} characters to import\n`);

    let successCount = 0;
    let errorCount = 0;

    // Process each character
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      logProgress(i + 1, characters.length, character.name.en);

      try {
        const documentId = createDocumentId('character', character.slug);
        
        // Prepare the document for Sanity
        const sanityDocument = {
          _id: documentId,
          _type: 'character',
          name: character.name,
          slug: {
            _type: 'slug',
            current: character.slug
          },
          role: character.role,
          weapon: character.weapon,
          rarity: character.rarity,
          element: character.element,
          overview: character.overview,
          ...(character.image && { image: character.image }),
          ...(character.splash && { splash: character.splash }),
          ...(character.skills && { skills: character.skills }),
          ...(character.build && { build: character.build }),
          ...(character.synergy && { synergy: character.synergy }),
          ...(character.pros && { pros: character.pros }),
          ...(character.cons && { cons: character.cons }),
          ...(character.recommendedWeapons && { recommendedWeapons: character.recommendedWeapons }),
        };

        // Create or replace the document
        await sanityClient.createOrReplace(sanityDocument);
        
        console.log(`✅ Successfully imported: ${character.name.en} (${character.slug})`);
        successCount++;

      } catch (error) {
        if (handleError(error, character.name.en)) {
          errorCount++;
        }
      }
    }

    // Summary
    console.log('\n📊 Import Summary:');
    console.log(`✅ Successfully imported: ${successCount} characters`);
    console.log(`❌ Failed to import: ${errorCount} characters`);
    console.log(`📁 Total processed: ${characters.length} characters`);

    if (errorCount > 0) {
      console.log('\n⚠️  Some characters failed to import. Check the errors above.');
      process.exit(1);
    } else {
      console.log('\n🎉 All characters imported successfully!');
    }

  } catch (error) {
    console.error('❌ Fatal error during import:', error);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  importCharacters();
}

export { importCharacters };
