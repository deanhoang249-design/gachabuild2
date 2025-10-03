'use client';

import { Character } from '@/data/characters';
import { tierlist, getCharactersByTier, getAllTiers } from '@/data/tierlist';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CharacterFilters from './CharacterFilters';

interface TierCardProps {
  character: Character;
}

function TierCard({ character }: TierCardProps) {
  const { t } = useLanguage();

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'vanguard':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'support':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'annihilator':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getElementBadgeColor = (element: string) => {
    switch (element.toLowerCase()) {
      case 'fire':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'water':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ice':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'wind':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'earth':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'light':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'dark':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'psychic':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'moon':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'sound':
        return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'anemo':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'electro':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case '5★':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case '4★':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case '3★':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="group relative">
      <Link 
        href={`/characters/${character.id}?from=tier-list`}
        className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
      >
        {/* Character Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center p-4 overflow-hidden">
          <Image
            src={character.image}
            alt={`${t(character.name)} character portrait`}
            width={200}
            height={200}
            className="object-contain transition-transform duration-300 group-hover:scale-110 max-w-full max-h-full"
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 220px, 240px"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/characters/placeholder.svg';
            }}
          />
          
          {/* Rarity Badge */}
          {character.rarity && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold border ${getRarityBadgeColor(character.rarity)}`}>
              {character.rarity}
            </div>
          )}
        </div>
        
        {/* Character Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {t(character.name)}
          </h3>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* Role Badge */}
            <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getRoleBadgeColor(character.role)}`}>
              {character.role}
            </span>
            
            {/* Element Badge */}
            {character.element && (
              <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getElementBadgeColor(character.element)}`}>
                {character.element}
              </span>
            )}
            
            {/* Rarity Badge */}
            {character.rarity && (
              <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${getRarityBadgeColor(character.rarity)}`}>
                {character.rarity}
              </span>
            )}
          </div>
          
          {/* Weapon Info */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="font-medium">Weapon:</span> {character.weapon}
          </div>
        </div>
      </Link>
    </div>
  );
}

interface TierRowProps {
  tier: keyof typeof tierlist;
  characters: Character[];
}

function TierRow({ tier, characters }: TierRowProps) {
  const getTierHeaderColor = (tier: string) => {
    switch (tier) {
      case 'EX':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900';
      case 'S':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      case 'A':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'B':
        return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
      case 'C':
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
      case 'D':
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
      case 'E':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getTierDescription = (tier: string) => {
    switch (tier) {
      case 'EX':
        return 'Exceptional - The absolute best characters';
      case 'S':
        return 'Superior - Top-tier characters';
      case 'A':
        return 'Advanced - Excellent characters';
      case 'B':
        return 'Balanced - Good characters';
      case 'C':
        return 'Competent - Decent characters';
      case 'D':
        return 'Decent - Average characters';
      case 'E':
        return 'Entry Level - Basic characters';
      default:
        return 'Unknown tier';
    }
  };

  if (characters.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby={`tier-${tier}-heading`}>
      {/* Tier Header */}
      <div className={`${getTierHeaderColor(tier)} rounded-t-xl px-6 py-4 mb-0`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 id={`tier-${tier}-heading`} className="text-3xl font-bold">
              {tier} Tier
            </h2>
            <div className="text-lg opacity-90">
              {characters.length} character{characters.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="text-sm opacity-80">
            {getTierDescription(tier)}
          </div>
        </div>
      </div>

      {/* Character Cards Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-b-xl border-x border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" role="list" aria-label={`${tier} tier characters`}>
          {characters.map((character) => (
            <TierCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TierList() {
  const tiers = getAllTiers();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [elementFilter, setElementFilter] = useState('');

  // Filter characters based on search and filters
  const getFilteredCharacters = (tier: keyof typeof tierlist) => {
    let characters = getCharactersByTier(tier);
    
    if (searchTerm) {
      characters = characters.filter(char => 
        char.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.name.vi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.element?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.weapon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (roleFilter) {
      characters = characters.filter(char => 
        char.role.toLowerCase() === roleFilter.toLowerCase()
      );
    }

    if (elementFilter) {
      characters = characters.filter(char => 
        char.element?.toLowerCase() === elementFilter.toLowerCase()
      );
    }
    
    return characters;
  };

  const filteredTiers = tiers;

  return (
    <main id="tierlist" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-['Poppins',sans-serif]">
            Duet Night Abyss Character Tier List
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Discover the most powerful characters in Duet Night Abyss, ranked by their effectiveness in combat. 
            Find the best DNA characters for your team with our comprehensive tier list guide.
          </p>
          
          {/* Last Updated Note */}
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: December 2024
          </div>
        </header>

        {/* Enhanced Filters */}
        <section className="mb-8" aria-labelledby="filters-heading">
          <CharacterFilters
            onRoleFilter={setRoleFilter}
            onElementFilter={setElementFilter}
            onSearch={setSearchTerm}
            selectedRole={roleFilter}
            selectedElement={elementFilter}
            searchQuery={searchTerm}
          />
        </section>

        {/* Tier Rows */}
        <section className="space-y-8" aria-labelledby="tier-list-heading">
          <h2 id="tier-list-heading" className="sr-only">Character Tier Rankings</h2>
          {filteredTiers.map((tier) => {
            const characters = getFilteredCharacters(tier);
            return (
              <TierRow key={tier} tier={tier} characters={characters} />
            );
          })}
        </section>

        {/* Assumptions Section */}
        <section className="mt-16" aria-labelledby="assumptions-heading">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 id="assumptions-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">Tier List Assumptions</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">5★ Assumptions</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                  All 5-star characters are evaluated at their base rarity with level 1 constellation, 
                  level 10/10/10 skills, and standard equipment. Team composition considers optimal 
                  synergy and role effectiveness in various combat scenarios.
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">4★ Assumptions</h3>
                <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                  All 4-star characters are evaluated at constellation 1, level 10/10/10 skills, 
                  and standard equipment. Performance is assessed based on their utility and 
                  effectiveness in their respective roles.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">3★ and Below Assumptions</h3>
                <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                  Lower rarity characters are evaluated at maximum constellation, level 10/10/10 skills, 
                  and standard equipment. Their value is assessed based on accessibility and 
                  effectiveness relative to higher rarity alternatives.
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                *Characters in the same tier are listed in descending rarity, and aside from this are in no particular order.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
