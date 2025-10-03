'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCharacters } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

interface SearchWithSuggestionsProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  origin?: string;
}

interface CharacterSuggestion {
  id: string;
  name: string;
  role: string;
  element?: string;
  rarity?: string;
  image: string;
}

export default function SearchWithSuggestions({ 
  placeholder = "Search by name, role, element, weapon...",
  className = "",
  onSearch,
  origin = 'tier-list'
}: SearchWithSuggestionsProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CharacterSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  // Filter characters based on search query
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filterCharacters = async () => {
      try {
        const characters = await getCharacters();
        const filteredCharacters = characters
          .filter(char => {
            const searchTerm = query.toLowerCase();
            return (
              char.name.en.toLowerCase().includes(searchTerm) ||
              char.name.vi.toLowerCase().includes(searchTerm) ||
              char.role.toLowerCase().includes(searchTerm) ||
              char.element?.toLowerCase().includes(searchTerm) ||
              char.weapon.toLowerCase().includes(searchTerm)
            );
          })
          .slice(0, 8) // Limit to 8 suggestions
          .map(char => ({
            id: char.slug.current,
            name: t(char.name),
            role: char.role,
            element: char.element,
            rarity: char.rarity,
            image: char.image || '/characters/placeholder.svg'
          }));

        setSuggestions(filteredCharacters);
        setShowSuggestions(filteredCharacters.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Failed to fetch characters for search:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    filterCharacters();
  }, [query, t]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (character: CharacterSuggestion) => {
    setQuery(character.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    router.push(`/characters/${character.id}?from=${origin}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        // If no suggestions are shown but user presses Enter, trigger search
        onSearch?.(query);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          onSearch?.(query);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle focus
  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow clicks on suggestions
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 150);
  };

  // Highlight matched text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  // Get role badge color
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

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {suggestions.map((character, index) => (
            <div
              key={character.id}
              onClick={() => handleSuggestionClick(character)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50:bg-gray-700 transition-colors ${
                selectedIndex === index ? 'bg-blue-50/20' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Character Image */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/characters/placeholder.svg';
                    }}
                  />
                </div>

                {/* Character Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {highlightText(character.name, query)}
                    </h4>
                    {character.rarity && (
                      <span className="text-xs text-gray-500">
                        {character.rarity}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(character.role)}`}>
                      {character.role}
                    </span>
                    {character.element && (
                      <span className="text-xs text-gray-500">
                        {character.element}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
