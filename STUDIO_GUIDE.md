# 🎮 GachaBuild CMS Studio Guide

## Overview
Your Sanity Studio is now set up with a beautiful UI for managing your game content. The studio provides an intuitive interface for creating and editing characters and weapons.

## 🚀 Quick Start

### Option 1: Using the Script
```bash
./start-studio.sh
```

### Option 2: Manual Start
```bash
npm run dev
```

### Option 3: Studio Only
```bash
npm run studio
```

## 🌐 Accessing the Studio

Once the development server is running, you can access the studio at:
- **Studio UI**: http://localhost:3000/studio
- **Main Website**: http://localhost:3000

## 📋 Features

### Content Management
- **Characters**: Create and edit character profiles with detailed information
- **Weapons**: Manage weapon data and statistics
- **Images**: Upload and manage character/weapon images with hotspot support
- **Multilingual**: Support for English and Vietnamese content

### Studio Features
- **Structured Navigation**: Organized content sections
- **Custom Logo**: Branded with GachaBuild CMS logo
- **Vision Tool**: Query your content with GROQ
- **Image Management**: Hotspot support for better image cropping
- **Validation**: Required field validation and data integrity

## 📝 Content Types

### Characters
- Basic Info: Name, role, weapon type, rarity, element
- Visual: Main image and splash image
- Skills: Active and passive abilities
- Build Recommendations: Weapons, artifacts, stat priorities
- Team Synergy: Character combinations
- Pros/Cons: Character strengths and weaknesses

### Weapons
- Basic Info: Name, type, rarity
- Description: Multilingual descriptions
- Stats: Attack, health, defense, crit rate, crit damage
- Passive Effects: Weapon special abilities
- Recommended Characters: Character compatibility

## 🛠️ Studio Configuration

The studio is configured in `sanity.config.ts` with:
- Custom structure for organized navigation
- Vision tool for content querying
- Custom logo and branding
- Optimized schema definitions

## 📁 File Structure

```
sanity/
├── schemas/
│   ├── character.ts    # Character schema definition
│   ├── weapon.ts       # Weapon schema definition
│   └── index.ts        # Schema exports
└── studio.tsx          # Studio configuration

src/app/studio/
└── [[...index]]/
    ├── page.tsx        # Studio page route
    └── Studio.tsx      # Studio component
```

## 🔧 Customization

### Adding New Content Types
1. Create a new schema in `sanity/schemas/`
2. Add it to `sanity/schemas/index.ts`
3. Update the structure in `sanity.config.ts`

### Modifying Fields
Edit the schema files to add, remove, or modify fields:
- `sanity/schemas/character.ts` - Character fields
- `sanity/schemas/weapon.ts` - Weapon fields

### Studio Appearance
Customize the studio appearance in `sanity.config.ts`:
- Logo and branding
- Navigation structure
- Theme colors (if needed)

## 🚨 Troubleshooting

### Common Issues
1. **Studio not loading**: Check if the development server is running
2. **Authentication errors**: Verify your Sanity project ID and dataset
3. **Image upload issues**: Check Sanity project permissions

### Getting Help
- Check the Sanity documentation: https://www.sanity.io/docs
- Review the project's Sanity setup: `SANITY_SETUP.md`

## 🎯 Next Steps

1. **Access the Studio**: Visit http://localhost:3000/studio
2. **Create Content**: Start adding characters and weapons
3. **Upload Images**: Add character and weapon images
4. **Test Integration**: Verify content appears on your main site

Happy content managing! 🎮✨
