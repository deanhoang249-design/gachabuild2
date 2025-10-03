'use client';

import { useState } from 'react';
import { WEAPON_OPTIONS, WEAPON_RARITY_OPTIONS } from '@/data/filterConstants';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeaponFiltersProps {
  onFiltersChange?: (filters: { type: string; rarity: string; search: string }) => void;
}

export default function WeaponFilters({ onFiltersChange }: WeaponFiltersProps) {
  const { language } = useLanguage();
  const [filters, setFilters] = useState({
    type: 'All',
    rarity: 'All',
    search: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const clearFilters = () => {
    const clearedFilters = { type: 'All', rarity: 'All', search: '' };
    setFilters(clearedFilters);
    if (onFiltersChange) {
      onFiltersChange(clearedFilters);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label htmlFor="weapon-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'vi' ? 'Tìm kiếm vũ khí' : 'Search Weapons'}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="weapon-search"
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={language === 'vi' ? 'Tìm kiếm theo tên vũ khí...' : 'Search by weapon name...'}
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="lg:w-48">
          <label htmlFor="weapon-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'vi' ? 'Loại vũ khí' : 'Weapon Type'}
          </label>
          <select
            id="weapon-type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {WEAPON_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rarity Filter */}
        <div className="lg:w-48">
          <label htmlFor="weapon-rarity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'vi' ? 'Độ hiếm' : 'Rarity'}
          </label>
          <select
            id="weapon-rarity"
            value={filters.rarity}
            onChange={(e) => handleFilterChange('rarity', e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {WEAPON_RARITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="lg:w-auto flex items-end">
          <button
            onClick={clearFilters}
            className="w-full lg:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {language === 'vi' ? 'Xóa bộ lọc' : 'Clear Filters'}
          </button>
        </div>
      </div>
    </div>
  );
}
