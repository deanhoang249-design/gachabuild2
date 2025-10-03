'use client';

import { useState, useMemo } from 'react';
import { weapons } from '@/data/weapons';
import WeaponCard from '@/components/WeaponCard';
import WeaponFilters from '@/components/WeaponFilters';

export default function WeaponsPageClient() {
  const [filters, setFilters] = useState({
    type: 'All',
    rarity: 'All',
    search: ''
  });

  const filteredWeapons = useMemo(() => {
    return weapons.filter(weapon => {
      const matchesType = filters.type === 'All' || weapon.type === filters.type;
      const matchesRarity = filters.rarity === 'All' || weapon.rarity === filters.rarity;
      const matchesSearch = filters.search === '' || 
        weapon.name.en.toLowerCase().includes(filters.search.toLowerCase()) ||
        weapon.name.vi.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesRarity && matchesSearch;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-['Poppins',sans-serif]">
              Weapons
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover the most powerful weapons in Duet Night Abyss. Each weapon offers unique abilities and stats to enhance your characters&apos; combat effectiveness.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <WeaponFilters onFiltersChange={setFilters} />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredWeapons.length} of {weapons.length} weapons
          </p>
        </div>

        {/* Weapons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWeapons.map((weapon) => (
            <WeaponCard key={weapon.id} weapon={weapon} />
          ))}
        </div>

        {/* Empty State */}
        {filteredWeapons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No weapons found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more weapons.</p>
          </div>
        )}
      </div>
    </div>
  );
}
