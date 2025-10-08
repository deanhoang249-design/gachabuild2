#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

// Main conversion function
async function convertExistingData() {
  try {
    console.log('🚀 This script is no longer needed as the app now uses Sanity-only data.\n');
    console.log('📝 The application is already configured to fetch data from Sanity in real-time.');
    console.log('💡 If you need to import data, use the import scripts in the /import directory.');
    console.log('\nNext steps:');
    console.log('1. Set up your Sanity project and get API credentials');
    console.log('2. Update .env.local with your Sanity credentials');
    console.log('3. Use the data in /import/ directory to import to Sanity');
    console.log('4. Run: npm run import:characters');
    console.log('5. Run: npm run import:weapons');

  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the conversion
if (require.main === module) {
  convertExistingData();
}

export { convertExistingData };
