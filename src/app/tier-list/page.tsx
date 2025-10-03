import { Metadata } from 'next';
import TierList from '@/components/TierList';
import StructuredData from '@/components/StructuredData';
import { getCharacters } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Duet Night Abyss Character Tier List',
  description: 'Complete Duet Night Abyss character tier list with rankings, builds, and strategies. Find the best DNA characters for your team.',
  keywords: 'Duet Night Abyss, DNA, character tier list, tier rankings, character guide, builds, strategies',
  openGraph: {
    title: 'Duet Night Abyss Character Tier List',
    description: 'Complete Duet Night Abyss character tier list with rankings, builds, and strategies.',
    type: 'website',
    url: 'https://duetnightabyss.gachabuild.com/tier-list',
    images: [
      {
        url: 'https://duetnightabyss.gachabuild.com/duetnightabyss.png',
        width: 1200,
        height: 630,
        alt: 'Duet Night Abyss Character Tier List',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Night Abyss Character Tier List',
    description: 'Complete Duet Night Abyss character tier list with rankings, builds, and strategies.',
    images: ['https://duetnightabyss.gachabuild.com/duetnightabyss.png'],
  },
  alternates: {
    canonical: 'https://duetnightabyss.gachabuild.com/tier-list',
  },
};

export default async function TierListPage() {
  const characters = await getCharacters();
  
  return (
    <>
      <StructuredData type="tierlist" />
      <TierList characters={characters} />
    </>
  );
}
