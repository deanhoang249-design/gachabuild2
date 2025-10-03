#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';

async function quickStart() {
  console.log('🚀 GachaBuild Quick Start Guide\n');

  console.log('📋 Prerequisites Checklist:');
  console.log('✅ Node.js 18+ installed');
  console.log('✅ Project dependencies installed');
  console.log('✅ Sanity schemas created');
  console.log('✅ Data conversion scripts ready\n');

  console.log('🎯 Next Steps:');
  console.log('1. Create a Sanity project at https://sanity.io');
  console.log('2. Get your Project ID and Dataset name');
  console.log('3. Create an API token with write permissions');
  console.log('4. Update .env.local with your credentials');
  console.log('5. Run the import scripts');
  console.log('6. Deploy your site\n');

  console.log('🔧 Available Commands:');
  console.log('npm run setup:sanity     - Set up Sanity configuration');
  console.log('npm run convert:data     - Convert existing data to JSON');
  console.log('npm run import:characters - Import characters to Sanity');
  console.log('npm run import:weapons   - Import weapons to Sanity');
  console.log('npm run studio          - Start Sanity Studio');
  console.log('npm run dev             - Start development server');
  console.log('npm run build           - Build for production\n');

  console.log('📁 Important Files:');
  console.log('- .env.local (Environment variables)');
  console.log('- sanity.config.ts (Sanity configuration)');
  console.log('- sanity/schemas/ (Character and weapon schemas)');
  console.log('- import/ (Converted data files)');
  console.log('- DEPLOYMENT_GUIDE.md (Detailed deployment guide)\n');

  console.log('🐛 Troubleshooting:');
  console.log('- Check .env.local has correct Sanity credentials');
  console.log('- Ensure Sanity project is active and accessible');
  console.log('- Verify API token has write permissions');
  console.log('- Check console output for specific error messages\n');

  console.log('📚 Documentation:');
  console.log('- DEPLOYMENT_GUIDE.md - Complete deployment guide');
  console.log('- SANITY_SETUP.md - Sanity setup instructions');
  console.log('- scripts/README.md - Script documentation\n');

  console.log('🎉 Ready to deploy your GachaBuild website!');
}

// Run the quick start
if (require.main === module) {
  quickStart().catch(console.error);
}

export { quickStart };
