import { Metadata } from 'next';
import CharactersPageClient from './CharactersPageClient';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Duet Night Abyss Character Database',
  description: 'Complete Duet Night Abyss character database with detailed stats, builds, and strategies. Filter by role, element, and weapon type to find your perfect team composition.',
  keywords: 'Duet Night Abyss, DNA, character database, character guide, builds, strategies, vanguard, support, annihilator, gacha game, character stats, team composition',
  openGraph: {
    title: 'Duet Night Abyss Character Database',
    description: 'Complete Duet Night Abyss character database with detailed stats, builds, and strategies. Filter by role, element, and weapon type.',
    type: 'website',
    url: 'https://duetnightabyss.gachabuild.com/characters',
    images: [
      {
        url: 'https://duetnightabyss.gachabuild.com/duetnightabyss.png',
        width: 1200,
        height: 630,
        alt: 'Duet Night Abyss Character Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Night Abyss Character Database',
    description: 'Complete Duet Night Abyss character database with detailed stats, builds, and strategies.',
    images: ['https://duetnightabyss.gachabuild.com/duetnightabyss.png'],
  },
  alternates: {
    canonical: 'https://duetnightabyss.gachabuild.com/characters',
  },
};

export default function CharactersPage() {
  return (
    <>
      <StructuredData type="character" />
      <CharactersPageClient />
    </>
  );
}
