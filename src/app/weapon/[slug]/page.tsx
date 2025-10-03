import { notFound } from 'next/navigation';
import { weapons } from '@/data/weapons';
import { generateMetadata } from './metadata';
import WeaponDetailClient from '@/components/WeaponDetailClient';

// Export metadata generation
export { generateMetadata };

// Generate static params for all weapons
export async function generateStaticParams() {
  return weapons.map((weapon) => ({
    slug: weapon.id,
  }));
}

interface WeaponDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WeaponDetailPage({ params }: WeaponDetailPageProps) {
  const { slug } = await params;
  const weapon = weapons.find((w) => w.id === slug);

  if (!weapon) {
    notFound();
  }

  return <WeaponDetailClient weapon={weapon} />;
}






