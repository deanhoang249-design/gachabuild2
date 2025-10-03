# Duet Night Abyss - Character Guide Hub

A fan-made character guide website for the upcoming game **Duet Night Abyss**. Built with Next.js 15, TypeScript, and TailwindCSS.

## 🎯 Features

- **Responsive Character Index**: Browse all characters with a beautiful grid layout
- **Advanced Filtering**: Filter characters by role (Vanguard, Annihilator, Support) and weapon type
- **Character Details**: Individual character pages with detailed information
- **Modern UI**: Clean, responsive design with smooth hover effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd duet-night-abyss-guide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── characters/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Character detail page
│   │   └── page.tsx              # Character index page
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Home page
├── components/
│   ├── CharacterCard.tsx         # Character card component
│   ├── CharacterFilters.tsx      # Filter components
│   └── Navigation.tsx            # Navigation component
└── data/
    └── characters.ts             # Character data and types
```

## 🎨 Design Features

### Responsive Layout
- **Desktop**: 3-4 columns
- **Tablet**: 2 columns  
- **Mobile**: 1 column

### Character Cards
- Hover effects with scale and shadow
- Rarity and element badges
- Role and weapon information
- Smooth transitions

### Filtering System
- Role-based filtering (Vanguard, Annihilator, Support)
- Weapon-based filtering (Sword, Sniper, Staff, Spear, Bow)
- Real-time results count

## 🔧 Customization

### Adding New Characters

Edit `src/data/characters.ts` to add new characters:

```typescript
{
  id: 'character-name',
  name: 'Character Name',
  role: 'Vanguard', // or 'Annihilator', 'Support'
  weapon: 'Sword', // or 'Sniper', 'Staff', 'Spear', 'Bow'
  image: '/characters/character-name.svg',
  rarity: '5★', // or '4★'
  element: 'Fire', // or 'Ice', 'Lightning', 'Dark', 'Light', 'Wind', 'Water'
}
```

### Styling

The project uses TailwindCSS for styling. Key classes:
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` - Responsive grid
- `hover:scale-105` - Hover scale effect
- `transition-all duration-300` - Smooth transitions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

Build the project:
```bash
npm run build
```

The built files will be in the `.next` directory.

## 📝 Future Enhancements

- [ ] Character builds and guides
- [ ] Tier list functionality
- [ ] Search functionality
- [ ] Character comparison tool
- [ ] Team composition builder
- [ ] Meta analysis and statistics

## 🤝 Contributing

This is a fan-made project. Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is for educational and fan purposes only. Duet Night Abyss is a trademark of its respective owners.

## 🔗 Links
