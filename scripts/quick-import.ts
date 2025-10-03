#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function quickImport() {
  console.log('🚀 GachaBuild Quick Import');
  console.log('==========================\n');

  // Check if token is set
  if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN.trim() === '') {
    console.log('❌ SANITY_API_TOKEN is not set or empty');
    console.log('\n📋 To get your API token:');
    console.log('1. Go to https://www.sanity.io/manage');
    console.log('2. Select your project (ID: 2eop0ymd)');
    console.log('3. Go to "API" section');
    console.log('4. Click "Add API token"');
    console.log('5. Name: "GachaBuild Import"');
    console.log('6. Role: "Editor"');
    console.log('7. Copy the token');
    console.log('\nThen run:');
    console.log('echo "SANITY_API_TOKEN=your_token_here" >> .env.local');
    console.log('npm run import:characters');
    console.log('npm run import:weapons');
    return;
  }

  console.log('✅ SANITY_API_TOKEN is set');
  
  // Create Sanity client
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  });

  try {
    // Test connection
    console.log('🔍 Testing Sanity connection...');
    const testQuery = '*[_type == "character"][0]';
    const testResult = await client.fetch(testQuery);
    
    if (testResult) {
      console.log('✅ Sanity connection successful');
      console.log(`📊 Found ${testResult ? 'some' : 'no'} characters in Sanity`);
    } else {
      console.log('⚠️  No characters found in Sanity');
    }

    // Check if import files exist
    const characterFile = path.join(__dirname, '../import/character_import.json');
    const weaponFile = path.join(__dirname, '../import/weapon_import.json');
    
    if (fs.existsSync(characterFile)) {
      console.log('✅ Character import file found');
    } else {
      console.log('❌ Character import file not found');
    }
    
    if (fs.existsSync(weaponFile)) {
      console.log('✅ Weapon import file found');
    } else {
      console.log('❌ Weapon import file not found');
    }

    console.log('\n🎯 Ready to import! Run:');
    console.log('npm run import:characters');
    console.log('npm run import:weapons');

  } catch (error) {
    console.error('❌ Error testing Sanity connection:', error instanceof Error ? error.message : String(error));
    console.log('\n🔧 Troubleshooting:');
    console.log('- Check your SANITY_API_TOKEN is correct');
    console.log('- Verify your internet connection');
    console.log('- Ensure your Sanity project is active');
  }
}

// Run the quick import check
if (require.main === module) {
  quickImport().catch(console.error);
}

export { quickImport };
