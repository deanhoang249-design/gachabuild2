import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getCharacters } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Duet Night Abyss Guide Hub',
  description: 'Complete Duet Night Abyss character tier list, builds, and strategies. Find the best DNA characters ranked by effectiveness. Expert guides for Vanguard, Support, and Annihilator roles.',
  keywords: 'Duet Night Abyss, DNA, character tier list, character guide, builds, strategies, vanguard, support, annihilator, gacha game, tier list, character database, game guide',
  openGraph: {
    title: 'Duet Night Abyss Guide Hub',
    description: 'Complete Duet Night Abyss character tier list, builds, and strategies. Find the best DNA characters ranked by effectiveness.',
    type: 'website',
    url: 'https://duetnightabyss.gachabuild.com',
    images: [
      {
        url: 'https://duetnightabyss.gachabuild.com/duetnightabyss.png',
        width: 1200,
        height: 630,
        alt: 'Duet Night Abyss Guide Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Night Abyss Guide Hub',
    description: 'Complete Duet Night Abyss character tier list, builds, and strategies.',
    images: ['https://duetnightabyss.gachabuild.com/duetnightabyss.png'],
  },
  alternates: {
    canonical: 'https://duetnightabyss.gachabuild.com',
  },
};

export default async function Home() {
  try {
    // Try to fetch characters to check if data exists
    const characters = await getCharacters();
    if (characters && characters.length > 0) {
      redirect('/tier-list');
    } else {
      redirect('/setup');
    }
  } catch (error) {
    // If there's an error fetching data, redirect to setup
    redirect('/setup');
  }
}
