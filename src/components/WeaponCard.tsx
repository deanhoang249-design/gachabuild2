'use client';

import { Weapon } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeaponCardProps {
  weapon: Weapon;
}

export default function WeaponCard({ weapon }: WeaponCardProps) {
  const { t } = useLanguage();
  
  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'SSR':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'SR':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'R':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'N':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sword':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'sniper':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'staff':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'spear':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'bow':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <article className="weapon-card group">
      <Link href={`/weapon/${weapon.slug.current}?from=weapons`} className="block w-full h-full">
        {/* Weapon Image */}
        <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
          <Image
            src={weapon.image || '/weapons/placeholder.svg'}
            alt={`${t(weapon.name)} weapon`}
            width={200}
            height={200}
            className="object-contain transition-transform duration-300 group-hover:scale-105 max-w-full max-h-full"
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 220px, 240px"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/weapons/placeholder.svg';
            }}
          />
          
          {/* Rarity Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold border ${getRarityBadgeColor(weapon.rarity)}`} aria-label={`${weapon.rarity} rarity`}>
            {weapon.rarity}
          </div>
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${getTypeBadgeColor(weapon.type)}`} aria-label={`${weapon.type} type`}>
            {weapon.type}
          </div>
        </div>
        
        {/* Weapon Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-heading-3 text-gray-900 mb-3 group-hover:text-blue-600:text-blue-400 transition-colors line-clamp-1">
            {t(weapon.name)}
          </h3>
          
          <dl className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <dt className="text-caption text-gray-500">Type:</dt>
              <dd className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeBadgeColor(weapon.type)}`}>
                {weapon.type}
              </dd>
            </div>
            
            <div className="flex items-center justify-between">
              <dt className="text-caption text-gray-500">Rarity:</dt>
              <dd className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityBadgeColor(weapon.rarity)}`}>
                {weapon.rarity}
              </dd>
            </div>
          </dl>

          {/* Description Preview */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {t(weapon.description)}
          </p>
          
          {/* View Details Button */}
          <div className="btn-primary w-full text-center" role="button" aria-label={`View details for ${t(weapon.name)}`}>
            View Details
          </div>
        </div>
      </Link>
    </article>
  );
}
