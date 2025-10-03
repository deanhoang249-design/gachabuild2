#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { convertExistingData } from './convertExistingData';

async function setupSanity() {
  console.log('🚀 Setting up Sanity CMS for GachaBuild...\n');

  // Step 1: Convert existing data
  console.log('📊 Step 1: Converting existing data...');
  await convertExistingData();
  console.log('✅ Data conversion completed!\n');

  // Step 2: Check for environment variables
  console.log('🔧 Step 2: Checking environment configuration...');
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env.local file not found. Creating template...');
    
    const envTemplate = `# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here

# Optional: Custom API version
SANITY_API_VERSION=2024-01-01`;

    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ Created .env.local template');
  } else {
    console.log('✅ .env.local file found');
  }

  // Step 3: Instructions
  console.log('\n📋 Next Steps:');
  console.log('1. Go to https://sanity.io and create a new project');
  console.log('2. Note your Project ID and Dataset name');
  console.log('3. Create an API token with write permissions');
  console.log('4. Update .env.local with your actual credentials');
  console.log('5. Run: npm run import:characters');
  console.log('6. Run: npm run import:weapons');
  console.log('7. Run: npm run studio (to access Sanity Studio)');
  
  console.log('\n🎉 Sanity setup preparation completed!');
  console.log('\n📁 Files created:');
  console.log('- sanity.config.ts (Sanity configuration)');
  console.log('- sanity/schemas/ (Character and weapon schemas)');
  console.log('- import/character_import_full.json (Converted character data)');
  console.log('- import/weapon_import_full.json (Converted weapon data)');
  console.log('- .env.local (Environment variables template)');
}

// Run the setup
if (require.main === module) {
  setupSanity().catch(console.error);
}

export { setupSanity };
