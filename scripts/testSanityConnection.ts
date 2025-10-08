#!/usr/bin/env ts-node

import { createClient } from '@sanity/client'

// Create a client for testing
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
})

async function testSanityConnection() {
  try {
    console.log('🔍 Testing Sanity connection...\n');
    
    console.log('📊 Configuration:');
    console.log(`   Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2eop0ymd'}`);
    console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
    console.log(`   API Version: ${process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'}\n`);

    // Test basic connection
    console.log('🔌 Testing basic connection...');
    const datasets = await sanityClient.datasets.list();
    console.log(`✅ Connected! Found ${datasets.length} datasets:`);
    datasets.forEach(dataset => {
      console.log(`   - ${dataset.name} (${dataset.aclMode})`);
    });

    // Test fetching all documents
    console.log('\n📄 Testing document fetch...');
    const allDocs = await sanityClient.fetch('*[]');
    console.log(`✅ Found ${allDocs.length} total documents`);

    // Test fetching characters specifically
    console.log('\n👥 Testing character fetch...');
    const characters = await sanityClient.fetch('*[_type == "character"]');
    console.log(`✅ Found ${characters.length} characters`);

    if (characters.length > 0) {
      console.log('\n📋 Character details:');
      characters.forEach((char: any, index: number) => {
        console.log(`   ${index + 1}. ${char.name?.en || 'Unknown'} (${char.slug?.current || 'no-slug'})`);
        console.log(`      ID: ${char._id}`);
        console.log(`      Image: ${char.image || 'No image'}`);
        console.log(`      Splash: ${char.splash || 'No splash'}`);
      });
    }

    // Test fetching weapons specifically
    console.log('\n⚔️ Testing weapon fetch...');
    const weapons = await sanityClient.fetch('*[_type == "weapon"]');
    console.log(`✅ Found ${weapons.length} weapons`);

    if (weapons.length > 0) {
      console.log('\n📋 Weapon details:');
      weapons.forEach((weapon: any, index: number) => {
        console.log(`   ${index + 1}. ${weapon.name?.en || 'Unknown'} (${weapon.slug?.current || 'no-slug'})`);
        console.log(`      ID: ${weapon._id}`);
        console.log(`      Image: ${weapon.image || 'No image'}`);
      });
    }

    console.log('\n🎉 Sanity connection test completed successfully!');

  } catch (error) {
    console.error('❌ Sanity connection test failed:', error);
    process.exit(1);
  }
}

// Run the test
testSanityConnection();
