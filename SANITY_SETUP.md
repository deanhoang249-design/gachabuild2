# 🧠 Sanity CMS Integration Setup Guide

This guide will help you integrate Sanity CMS with your GachaBuild project to manage character and weapon data.

## 🎯 Overview

The project now includes scripts to import your existing character and weapon data into Sanity CMS, allowing you to:
- Manage content through Sanity Studio
- Update data without code changes
- Collaborate with team members
- Maintain version control of content

## 📋 Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))
- Your existing project data (already in the codebase)

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install the required Sanity packages:
- `@sanity/client` - Sanity JavaScript client
- `ts-node` - TypeScript execution
- `dotenv` - Environment variable management

### 2. Create Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign in
2. Click "Create new project"
3. Choose a project name (e.g., "GachaBuild CMS")
4. Select a dataset name (e.g., "production")
5. Note down your **Project ID** and **Dataset name**

### 3. Generate API Token

1. In your Sanity project dashboard, go to "API" tab
2. Click "Add API token"
3. Name it "Import Script Token"
4. Select "Editor" permissions (or "Admin" for full access)
5. Copy the generated token

### 4. Configure Environment

Create a `.env.local` file in your project root:

```bash
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_token_here

# Optional: Custom API version
SANITY_API_VERSION=2024-01-01
```

**Replace the placeholder values with your actual Sanity credentials.**

### 5. Set Up Sanity Schema

You'll need to create Sanity schemas for your data. Here are the basic schemas:

#### Character Schema (`schemas/character.js`)
```javascript
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
    {
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'vi', title: 'Vietnamese', type: 'text' }
      ]
    },
    { name: 'image', title: 'Image', type: 'string' },
    { name: 'splash', title: 'Splash Image', type: 'string' },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
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
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'vi', title: 'Vietnamese', type: 'text' }
              ]
            },
            { name: 'type', title: 'Type', type: 'string' },
            { name: 'cooldown', title: 'Cooldown', type: 'string' },
            { name: 'cost', title: 'Cost', type: 'string' }
          ]
        }
      ]
    }
    // Add more fields as needed...
  ]
}
```

#### Weapon Schema (`schemas/weapon.js`)
```javascript
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
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'vi', title: 'Vietnamese', type: 'text' }
      ]
    },
    { name: 'image', title: 'Image', type: 'string' },
    {
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        { name: 'attack', title: 'Attack', type: 'number' },
        { name: 'health', title: 'Health', type: 'number' },
        { name: 'defense', title: 'Defense', type: 'number' },
        { name: 'critRate', title: 'Crit Rate', type: 'number' },
        { name: 'critDamage', title: 'Crit Damage', type: 'number' }
      ]
    }
    // Add more fields as needed...
  ]
}
```

### 6. Convert Existing Data

Convert your existing TypeScript data to JSON format:

```bash
npm run convert:data
```

This will create:
- `import/character_import_full.json` - All characters from your project
- `import/weapon_import_full.json` - All weapons from your project

### 7. Import Data to Sanity

Import the converted data to your Sanity project:

```bash
# Import characters
npm run import:characters

# Import weapons
npm run import:weapons
```

### 8. Verify Import

1. Go to your Sanity Studio (usually at `https://your-project.sanity.studio`)
2. Check that your characters and weapons appear in the content
3. Verify that all fields are properly populated

## 🔄 Data Flow

```
Existing TypeScript Data → JSON Conversion → Sanity Import → Sanity Studio
```

1. **Existing Data**: Your current character/weapon data in TypeScript files
2. **JSON Conversion**: Script converts TS data to JSON format
3. **Sanity Import**: Script uploads JSON data to Sanity
4. **Sanity Studio**: Content management interface

## 📁 File Structure

```
/gachabuild.com-main/
├── import/
│   ├── character_import.json          # Sample character data
│   ├── character_import_full.json     # Full character data (generated)
│   ├── weapon_import.json            # Sample weapon data
│   └── weapon_import_full.json       # Full weapon data (generated)
├── scripts/
│   ├── sanityConfig.ts               # Shared Sanity configuration
│   ├── importCharacters.ts           # Character import script
│   ├── importWeapons.ts              # Weapon import script
│   ├── convertExistingData.ts        # Data conversion script
│   └── README.md                     # Detailed script documentation
├── .env.local                        # Environment variables
└── SANITY_SETUP.md                   # This setup guide
```

## 🛠️ Available Scripts

```bash
# Convert existing data to JSON
npm run convert:data

# Import characters to Sanity
npm run import:characters

# Import weapons to Sanity
npm run import:weapons
```

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Found**
   - Ensure `.env.local` exists and contains correct values
   - Check that variable names match exactly

2. **Sanity API Errors**
   - Verify your API token has write permissions
   - Check that Project ID and Dataset are correct
   - Ensure your Sanity project is active

3. **Schema Mismatch**
   - Make sure your Sanity schemas match the data structure
   - Check field types and required fields

4. **Import Failures**
   - Check the console output for specific error messages
   - Verify JSON format is valid
   - Ensure all required fields are present

### Getting Help

- Check the detailed script documentation in `scripts/README.md`
- Review Sanity documentation at [sanity.io/docs](https://sanity.io/docs)
- Check the console output for specific error messages

## 🎉 Next Steps

After successful import:

1. **Set up Sanity Studio** for content management
2. **Configure your frontend** to fetch data from Sanity
3. **Set up webhooks** for automatic deployments
4. **Train your team** on using Sanity Studio

## 📚 Additional Resources

- [Sanity Documentation](https://sanity.io/docs)
- [Sanity Client Documentation](https://www.sanity.io/docs/js-client)
- [Next.js with Sanity](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Sanity Studio Setup](https://www.sanity.io/docs/getting-started-with-sanity-studio)
