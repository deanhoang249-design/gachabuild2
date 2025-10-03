import { Metadata } from 'next';
import WeaponsPageClient from './WeaponsPageClient';
import { getWeapons } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Weapons | Duet Night Abyss Character Guide',
  description: 'Complete list of weapons in Duet Night Abyss. Find the best weapons for your characters with detailed stats and passive abilities.',
  keywords: 'Duet Night Abyss, weapons, weapon list, weapon guide, weapon stats, weapon passive, DNA weapons',
  openGraph: {
    title: 'Weapons | Duet Night Abyss Character Guide',
    description: 'Complete list of weapons in Duet Night Abyss. Find the best weapons for your characters with detailed stats and passive abilities.',
    type: 'website',
  },
};

export default async function WeaponsPage() {
  const weapons = await getWeapons();
  
  return <WeaponsPageClient weapons={weapons} />;
}
