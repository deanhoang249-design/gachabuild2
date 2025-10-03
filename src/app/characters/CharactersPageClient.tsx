'use client';

import { useState, useMemo } from 'react';
import { characters } from '@/data/characters';
import CharacterCard from '@/components/CharacterCard';
import CharacterFilters from '@/components/CharacterFilters';

export default function CharactersPageClient() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const roleMatch = !selectedRole || character.role === selectedRole;
      const weaponMatch = !selectedWeapon || character.weapon === selectedWeapon;
      const elementMatch = !selectedElement || character.element === selectedElement;
      const searchMatch = !searchQuery || 
        character.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.name.vi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.element?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.weapon.toLowerCase().includes(searchQuery.toLowerCase());
      
      return roleMatch && weaponMatch && elementMatch && searchMatch;
    });
  }, [selectedRole, selectedWeapon, selectedElement, searchQuery]);

  return (
    <main className="py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Character Database
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Discover all the characters in Duet Night Abyss. Filter by role, element, and weapon type to find your perfect team composition.
        </p>
      </header>

      {/* Filters */}
      <CharacterFilters
        selectedRole={selectedRole}
        selectedWeapon={selectedWeapon}
        selectedElement={selectedElement}
        searchQuery={searchQuery}
        onRoleFilter={setSelectedRole}
        onWeaponFilter={setSelectedWeapon}
        onElementFilter={setSelectedElement}
        onSearch={setSearchQuery}
      />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Showing {filteredCharacters.length} of {characters.length} characters
        </p>
      </div>

      {/* Character Grid */}
      <section aria-labelledby="characters-heading">
        <h2 id="characters-heading" className="sr-only">Character List</h2>
        {filteredCharacters.length > 0 ? (
          <div className="character-grid" role="list" aria-label="Character database">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" role="status" aria-live="polite">
            <div className="text-slate-500 mb-4" aria-hidden="true">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No characters found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters to see more characters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
