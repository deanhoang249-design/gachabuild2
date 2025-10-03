import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Duet Night Abyss Game Guides',
  description: 'Comprehensive guides for Duet Night Abyss including character builds, team compositions, and game strategies.',
  keywords: 'Duet Night Abyss, DNA, game guides, character builds, team composition, strategies, tips',
  openGraph: {
    title: 'Duet Night Abyss Game Guides',
    description: 'Comprehensive guides for Duet Night Abyss including character builds, team compositions, and game strategies.',
    type: 'website',
    url: 'https://duetnightabyss.gachabuild.com/guides',
    images: [
      {
        url: 'https://duetnightabyss.gachabuild.com/duetnightabyss.png',
        width: 1200,
        height: 630,
        alt: 'Duet Night Abyss Game Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Night Abyss Game Guides',
    description: 'Comprehensive guides for Duet Night Abyss including character builds, team compositions, and game strategies.',
    images: ['https://duetnightabyss.gachabuild.com/duetnightabyss.png'],
  },
  alternates: {
    canonical: 'https://duetnightabyss.gachabuild.com/guides',
  },
};

export default function GuidesPage() {
  return (
    <main className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Game Guides
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive guides for Duet Night Abyss including character builds, team compositions, and game strategies.
        </p>
      </header>

      <section className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <article className="professional-card p-6">
            <h2 className="text-heading-2 mb-4">Character Builds</h2>
            <p className="text-body text-gray-700 mb-4">
              Detailed build guides for each character including optimal weapons, artifacts, and skill priorities.
            </p>
            <Link href="/characters" className="btn-primary">
              View Character Database
            </Link>
          </article>

          <article className="professional-card p-6">
            <h2 className="text-heading-2 mb-4">Team Compositions</h2>
            <p className="text-body text-gray-700 mb-4">
              Learn about effective team synergies and composition strategies for different game modes.
            </p>
            <Link href="/tier-list" className="btn-primary">
              View Tier List
            </Link>
          </article>

          <article className="professional-card p-6">
            <h2 className="text-heading-2 mb-4">Game Mechanics</h2>
            <p className="text-body text-gray-700 mb-4">
              Understanding the core game mechanics, combat system, and progression systems.
            </p>
            <div className="btn-secondary">
              Coming Soon
            </div>
          </article>

          <article className="professional-card p-6">
            <h2 className="text-heading-2 mb-4">Beginner&apos;s Guide</h2>
            <p className="text-body text-gray-700 mb-4">
              New to Duet Night Abyss? Start here with our comprehensive beginner&apos;s guide.
            </p>
            <div className="btn-secondary">
              Coming Soon
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}