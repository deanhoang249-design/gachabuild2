# 🧠 Sanity Import Scripts

This directory contains scripts to import character and weapon data from JSON files into Sanity CMS.

## 📁 Files

- `sanityConfig.ts` - Shared Sanity client configuration
- `importCharacters.ts` - Import character data to Sanity
- `importWeapons.ts` - Import weapon data to Sanity
- `convertExistingData.ts` - Convert existing project data to import format

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity Project

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Note your Project ID and Dataset name
3. Create a new API token with write permissions

### 3. Configure Environment

Create a `.env.local` file in the project root:

```bash
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here

# Optional: Custom API version
SANITY_API_VERSION=2024-01-01
```

### 4. Prepare Data

#### Option A: Use Sample Data
The `import/` directory contains sample JSON files:
- `character_import.json` - Sample character data
- `weapon_import.json` - Sample weapon data

#### Option B: Convert Existing Data
Convert your existing TypeScript data to JSON format:

```bash
npx ts-node scripts/convertExistingData.ts
```

This will create:
- `import/character_import_full.json` - All characters from your project
- `import/weapon_import_full.json` - All weapons from your project

### 5. Run Import Scripts

```bash
# Import characters
npm run import:characters

# Import weapons
npm run import:weapons
```

## 📊 Data Format

### Character Import Format

```json
[
  {
    "name": { "en": "Character Name", "vi": "Tên Nhân Vật" },
    "slug": "character-slug",
    "role": "Vanguard",
    "weapon": "Sword",
    "rarity": "5★",
    "element": "Fire",
    "overview": {
      "en": "English description",
      "vi": "Mô tả tiếng Việt"
    },
    "image": "/characters/character.webp",
    "splash": "/characters/character.svg",
    "skills": [
      {
        "name": { "en": "Skill Name", "vi": "Tên Kỹ Năng" },
        "description": { "en": "Description", "vi": "Mô tả" },
        "type": "active",
        "cooldown": "3 turns",
        "cost": "2 MP"
      }
    ],
    "build": {
      "weapons": ["Weapon 1", "Weapon 2"],
      "artifacts": ["Artifact 1", "Artifact 2"],
      "statPriority": ["Attack%", "Crit Rate"]
    },
    "pros": [
      { "en": "Pro 1", "vi": "Ưu điểm 1" }
    ],
    "cons": [
      { "en": "Con 1", "vi": "Nhược điểm 1" }
    ]
  }
]
```

### Weapon Import Format

```json
[
  {
    "name": { "en": "Weapon Name", "vi": "Tên Vũ Khí" },
    "slug": "weapon-slug",
    "type": "Sword",
    "rarity": "SSR",
    "description": {
      "en": "English description",
      "vi": "Mô tả tiếng Việt"
    },
    "passive": {
      "en": "Passive effect",
      "vi": "Hiệu ứng thụ động"
    },
    "stats": {
      "attack": 1200,
      "critRate": 15,
      "critDamage": 50
    },
    "image": "/weapons/weapon.png",
    "recommendedCharacters": ["character1", "character2"]
  }
]
```

## 🔧 Sanity Schema Requirements

Make sure your Sanity schema includes these document types:

### Character Schema
```javascript
// schemas/character.js
export default {
  name: 'character',
  title: 'Character',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'vi', title: 'Vietnamese', type: 'string' }
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en' }
    },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'weapon', title: 'Weapon', type: 'string' },
    { name: 'rarity', title: 'Rarity', type: 'string' },
    { name: 'element', title: 'Element', type: 'string' },
    // ... other fields
  ]
}
```

### Weapon Schema
```javascript
// schemas/weapon.js
export default {
  name: 'weapon',
  title: 'Weapon',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'vi', title: 'Vietnamese', type: 'string' }
      ]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en' }
    },
    { name: 'type', title: 'Type', type: 'string' },
    { name: 'rarity', title: 'Rarity', type: 'string' },
    // ... other fields
  ]
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   ```
   ❌ Missing required environment variables: SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN
   ```
   - Ensure your `.env.local` file is properly configured

2. **Invalid JSON Format**
   ```
   ❌ Invalid JSON format. Expected an array of characters.
   ```
   - Check that your JSON file contains an array `[]` at the root level

3. **Sanity API Errors**
   ```
   ❌ Error processing Character Name: Unauthorized
   ```
   - Verify your API token has write permissions
   - Check that your project ID and dataset are correct

4. **File Not Found**
   ```
   ❌ Character import file not found: ./import/character_import.json
   ```
   - Ensure the import files exist in the `import/` directory
   - Run the conversion script first if using existing data

### Debug Mode

Add `DEBUG=true` to your environment variables for more detailed logging:

```bash
DEBUG=true npm run import:characters
```

## 📝 Notes

- The scripts use `createOrReplace()` to handle both new imports and updates
- Document IDs are generated as `character.slug` and `weapon.slug`
- All imports are logged with progress indicators
- Failed imports are reported but don't stop the entire process
- The scripts validate required environment variables before starting
