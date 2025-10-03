import { notFound } from 'next/navigation';
import { characters } from '@/data/characters';
import { generateMetadata } from './metadata';
import CharacterDetailClient from '@/components/CharacterDetailClient';

// Export metadata generation
export { generateMetadata };

// Generate static params for all characters
export async function generateStaticParams() {
  return characters.map((character) => ({
    slug: character.id,
  }));
}

interface CharacterDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { slug } = await params;
  const character = characters.find((char) => char.id === slug);

  if (!character) {
    notFound();
  }

  return <CharacterDetailClient character={character} />;
}