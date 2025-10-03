'use client';

import { useEffect, useState, Suspense } from 'react';
import { Weapon } from '@/data/weapons';
import { characters } from '@/data/characters';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeaponDetailClientProps {
  weapon: Weapon;
}

function WeaponDetailContent({ weapon }: WeaponDetailClientProps) {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'weapons';

  // Update document title and meta description when language changes
  useEffect(() => {
    const weaponName = t(weapon.name);
    const title = language === 'vi' 
      ? `Hướng dẫn vũ khí ${weaponName} trong Duet Night Abyss`
      : `Weapon Guide: ${weaponName} in Duet Night Abyss`;
    
    const description = language === 'vi'
      ? `Thông tin chi tiết về vũ khí ${weaponName} - ${weapon.type} ${weapon.rarity} trong DNA.`
      : `Detailed information about ${weaponName} - ${weapon.type} ${weapon.rarity} weapon in DNA.`;

    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update language attribute
    document.documentElement.lang = language;
  }, [language, weapon, t]);

  // Badge color functions
  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'SSR':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'SR':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700';
      case 'R':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
      case 'N':
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sword':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700';
      case 'sniper':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700';
      case 'staff':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
      case 'spear':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
      case 'bow':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const sections = [
    { 
      id: 'overview', 
      label: { en: 'Overview', vi: 'Tổng quan' }
    },
    { 
      id: 'stats', 
      label: { en: 'Stats', vi: 'Chỉ số' }
    },
    { 
      id: 'passive', 
      label: { en: 'Passive Ability', vi: 'Khả năng thụ động' }
    },
    { 
      id: 'characters', 
      label: { en: 'Recommended Characters', vi: 'Nhân vật đề xuất' }
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get recommended characters
  const recommendedCharacters = weapon.recommendedCharacters 
    ? characters.filter(char => weapon.recommendedCharacters!.includes(char.id))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link 
              href={`/${from}`}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {from === 'weapons' ? (language === 'vi' ? 'Danh Sách Vũ Khí' : 'Weapon List') : (language === 'vi' ? 'Bảng Xếp Hạng' : 'Tier List')}
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{t(weapon.name)}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href={`/${from}`}
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'vi' 
              ? `← Quay lại ${from === 'weapons' ? 'Danh Sách Vũ Khí' : 'Bảng Xếp Hạng'}`
              : `← Back to ${from === 'weapons' ? 'Weapon List' : 'Tier List'}`
            }
          </Link>
        </div>

        {/* Weapon Header */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Weapon Image */}
              <div className="lg:w-72 flex-shrink-0">
                <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={weapon.image}
                    alt={`${t(weapon.name)} weapon`}
                    width={280}
                    height={280}
                    className="object-contain max-w-full max-h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/weapons/placeholder.svg';
                    }}
                  />
                </div>
              </div>

              {/* Weapon Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-['Poppins',sans-serif]">
                  {t(weapon.name)}
                </h1>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeBadgeColor(weapon.type)}`}>
                    {weapon.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityBadgeColor(weapon.rarity)}`}>
                    {weapon.rarity}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t(weapon.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {t(section.label)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <article className="space-y-8">

              {/* Overview Section */}
              <section id="overview" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Tổng quan' : 'Overview'}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {t(weapon.description)}
                  </p>
                </div>
              </section>

              {/* Stats Section */}
              <section id="stats" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Chỉ số' : 'Stats'}
                  </h2>
                  
                  {weapon.stats ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(weapon.stats).map(([stat, value]) => (
                        <div key={stat} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            {stat.charAt(0).toUpperCase() + stat.slice(1).replace(/([A-Z])/g, ' $1')}
                          </h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {value}
                            {stat.includes('Rate') || stat.includes('Damage') ? '%' : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Thông tin chỉ số sẽ có sớm.' : 'Stats information will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Passive Ability Section */}
              <section id="passive" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Khả năng thụ động' : 'Passive Ability'}
                  </h2>
                  
                  {weapon.passive ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                      <p className="text-blue-800 dark:text-blue-300 leading-relaxed text-lg">
                        {t(weapon.passive)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Không có khả năng thụ động.' : 'No passive ability.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Recommended Characters Section */}
              <section id="characters" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Nhân vật đề xuất' : 'Recommended Characters'}
                  </h2>
                  
                  {recommendedCharacters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommendedCharacters.map((character) => (
                        <Link
                          key={character.id}
                          href={`/characters/${character.id}`}
                          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <Image
                              src={character.image}
                              alt={t(character.name)}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {t(character.name)}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {character.role} • {character.weapon}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Chưa có nhân vật đề xuất nào.' : 'No recommended characters yet.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeaponDetailClient({ weapon }: WeaponDetailClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading weapon details...</p>
        </div>
      </div>
    }>
      <WeaponDetailContent weapon={weapon} />
    </Suspense>
  );
}
