# Data Import Guide

## Current Status
✅ App is configured to use Sanity-only data  
✅ All static data has been removed  
✅ Sanity connection is working  
❌ No data in Sanity yet (needs API token to import)

## Quick Setup

### Step 1: Get Sanity API Token
1. Go to https://www.sanity.io/manage
2. Select your project (ID: `2eop0ymd`)
3. Go to "API" section
4. Click "Add API token"
5. Name: `GachaBuild Import`
6. Role: `Editor`
7. Copy the token

### Step 2: Set the Token
```bash
echo 'SANITY_API_TOKEN=your_token_here' >> .env.local
```

### Step 3: Import Data
```bash
npm run import:characters
npm run import:weapons
```

### Step 4: Verify
Visit http://localhost:3001/characters to see your data!

## Alternative: Manual Data Entry
If you prefer to add data manually:
1. Go to https://2eop0ymd.api.sanity.io/v2024-01-01/data/query/production
2. Use the Sanity Studio interface
3. Add characters and weapons one by one

## Troubleshooting
- **"No characters found in Sanity"**: Data hasn't been imported yet
- **"Missing required environment variables"**: SANITY_API_TOKEN not set
- **"Failed to fetch characters from Sanity"**: Check your internet connection and Sanity project status

## Data Files Available
- `import/character_import.json` - Character data ready for import
- `import/weapon_import.json` - Weapon data ready for import
- `import/character_import_full.json` - Full character data with all details
- `import/weapon_import_full.json` - Full weapon data with all details
