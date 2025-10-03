// Shared filter constants for consistent filtering across the application

export const ROLE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Vanguard', label: 'Vanguard' },
  { value: 'Support', label: 'Support' },
  { value: 'Annihilator', label: 'Annihilator' },
] as const;

export const ELEMENT_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Fire', label: 'Fire' },
  { value: 'Water', label: 'Water' },
  { value: 'Ice', label: 'Ice' },
  { value: 'Wind', label: 'Wind' },
  { value: 'Earth', label: 'Earth' },
  { value: 'Light', label: 'Light' },
  { value: 'Dark', label: 'Dark' },
  { value: 'Psychic', label: 'Psychic' },
  { value: 'Moon', label: 'Moon' },
  { value: 'Sound', label: 'Sound' },
  { value: 'Anemo', label: 'Anemo' },
  { value: 'Electro', label: 'Electro' },
] as const;

export const WEAPON_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Sword', label: 'Sword' },
  { value: 'Sniper', label: 'Sniper' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Spear', label: 'Spear' },
  { value: 'Bow', label: 'Bow' },
] as const;

export const TIER_OPTIONS = [
  { value: '', label: 'All Tiers' },
  { value: 'EX', label: 'EX Tier' },
  { value: 'S', label: 'S Tier' },
  { value: 'A', label: 'A Tier' },
  { value: 'B', label: 'B Tier' },
  { value: 'C', label: 'C Tier' },
  { value: 'D', label: 'D Tier' },
  { value: 'E', label: 'E Tier' },
] as const;

export const WEAPON_RARITY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'SSR', label: 'SSR' },
  { value: 'SR', label: 'SR' },
  { value: 'R', label: 'R' },
  { value: 'N', label: 'N' },
] as const;

// Color mapping functions for consistent styling
export const getRoleColor = (role: string) => {
  switch (role.toLowerCase()) {
    case 'vanguard':
      return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200:bg-red-800';
    case 'support':
      return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200:bg-blue-800';
    case 'annihilator':
      return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200:bg-purple-800';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200:bg-gray-700';
  }
};

export const getElementColor = (element: string) => {
  switch (element.toLowerCase()) {
    case 'fire':
      return 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200:bg-orange-800';
    case 'water':
      return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200:bg-blue-800';
    case 'ice':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200:bg-cyan-800';
    case 'wind':
      return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200:bg-green-800';
    case 'earth':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200:bg-yellow-800';
    case 'light':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200:bg-yellow-800';
    case 'dark':
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200:bg-gray-700';
    case 'psychic':
      return 'bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200:bg-pink-800';
    case 'moon':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200:bg-indigo-800';
    case 'sound':
      return 'bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200:bg-violet-800';
    case 'anemo':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200:bg-emerald-800';
    case 'electro':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200:bg-yellow-800';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200:bg-gray-700';
  }
};

export const getWeaponColor = (weapon: string) => {
  switch (weapon.toLowerCase()) {
    case 'sword':
      return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200:bg-slate-700';
    case 'sniper':
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200:bg-gray-700';
    case 'staff':
      return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200:bg-purple-800';
    case 'spear':
      return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200:bg-green-800';
    case 'bow':
      return 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200:bg-orange-800';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200:bg-gray-700';
  }
};

export const getTierColor = (tier: string) => {
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
