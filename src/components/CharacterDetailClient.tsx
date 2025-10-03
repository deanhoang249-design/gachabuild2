'use client';

import { useEffect, useState, Suspense } from 'react';
import { Character } from '@/data/characters';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface CharacterDetailClientProps {
  character: Character;
}

function CharacterDetailContent({ character }: CharacterDetailClientProps) {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'tier-list';

  // Update document title and meta description when language changes
  useEffect(() => {
    const characterName = t(character.name);
    const title = language === 'vi' 
      ? `Hướng dẫn build ${characterName} trong Duet Night Abyss`
      : `How to build ${characterName} in Duet Night Abyss`;
    
    const description = language === 'vi'
      ? `Cách build, kỹ năng và đội hình mạnh nhất cho ${characterName} trong DNA.`
      : `Best build, skills, and team guide for ${characterName} in DNA.`;

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
  }, [language, character, t]);

  // Badge color functions (matching Tier List)
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'vanguard':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700';
      case 'support':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
      case 'annihilator':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getElementBadgeColor = (element: string) => {
    switch (element.toLowerCase()) {
      case 'fire':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700';
      case 'water':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700';
      case 'ice':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900 dark:text-cyan-300 dark:border-cyan-700';
      case 'wind':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
      case 'earth':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
      case 'light':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
      case 'dark':
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
      case 'psychic':
        return 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900 dark:text-pink-300 dark:border-pink-700';
      case 'moon':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700';
      case 'sound':
        return 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900 dark:text-violet-300 dark:border-violet-700';
      case 'anemo':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700';
      case 'electro':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case '5★':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case '4★':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700';
      case '3★':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const sections = [
    { 
      id: 'overview', 
      label: { en: 'Overview', vi: 'Tổng quan' }
    },
    { 
      id: 'skills', 
      label: { en: 'Skills', vi: 'Kỹ năng' }
    },
    { 
      id: 'build', 
      label: { en: 'Build Guide', vi: 'Hướng dẫn Build' }
    },
    { 
      id: 'weapons', 
      label: { en: 'Recommended Weapons', vi: 'Vũ Khí Đề Xuất' }
    },
    { 
      id: 'synergy', 
      label: { en: 'Team Synergy', vi: 'Hiệu Ứng Đội' }
    },
    { 
      id: 'pros-cons', 
      label: { en: 'Pros & Cons', vi: 'Ưu & Nhược Điểm' }
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              {from === 'characters' ? (language === 'vi' ? 'Danh Sách Nhân Vật' : 'Character List') : (language === 'vi' ? 'Bảng Xếp Hạng' : 'Tier List')}
            </Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{t(character.name)}</span>
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
              ? `← Quay lại ${from === 'characters' ? 'Danh Sách Nhân Vật' : 'Bảng Xếp Hạng'}`
              : `← Back to ${from === 'characters' ? 'Character List' : 'Tier List'}`
            }
          </Link>
        </div>

        {/* Character Header */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Character Image */}
              <div className="lg:w-72 flex-shrink-0">
                <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image
                    src={character.image}
                    alt={`${t(character.name)} character portrait`}
                    width={280}
                    height={280}
                    className="object-contain max-w-full max-h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/characters/placeholder.svg';
                    }}
                  />
                </div>
              </div>

              {/* Character Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-['Poppins',sans-serif]">
                  {t(character.name)}
                </h1>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(character.role)}`}>
                    {character.role}
                  </span>
                  {character.element && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getElementBadgeColor(character.element)}`}>
                      {character.element}
                    </span>
                  )}
                  {character.rarity && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRarityBadgeColor(character.rarity)}`}>
                      {character.rarity}
                    </span>
                  )}
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Weapon
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">{character.weapon}</p>
                  </div>
                  {character.element && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        Element
                      </h3>
                      <p className="text-lg text-gray-900 dark:text-white">{character.element}</p>
                    </div>
                  )}
                </div>

                {/* Overview */}
                {character.overview && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t(character.overview)}
                    </p>
                  </div>
                )}
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
                  {character.overview ? (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {t(character.overview)}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      {language === 'vi' ? 'Mô tả nhân vật sẽ có sớm.' : 'Character description will be available soon.'}
                    </p>
                  )}
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Kỹ năng' : 'Skills'}
                  </h2>
                  
                  {character.skills && character.skills.length > 0 ? (
                    <div className="space-y-6">
                      {character.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {t(skill.name)}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              skill.type === 'active' 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            }`}>
                              {skill.type}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {t(skill.description)}
                          </p>
                          {(skill.cooldown || skill.cost) && (
                            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                              {skill.cooldown && (
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Cooldown: {skill.cooldown}
                                </div>
                              )}
                              {skill.cost && (
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Cost: {skill.cost}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Thông tin kỹ năng sẽ có sớm.' : 'Skills information will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Build Section */}
              <section id="build" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Hướng dẫn Build' : 'Build Guide'}
                  </h2>
                  
                  {character.build ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
                          {language === 'vi' ? 'Vũ Khí Đề Xuất' : 'Recommended Weapons'}
                        </h3>
                        <ul className="space-y-3">
                          {character.build.weapons.map((weapon, index) => (
                            <li key={index} className="flex items-center text-blue-700 dark:text-blue-300">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                              {weapon}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">
                          {language === 'vi' ? 'Hiện Vật Đề Xuất' : 'Recommended Artifacts'}
                        </h3>
                        <ul className="space-y-3">
                          {character.build.artifacts.map((artifact, index) => (
                            <li key={index} className="flex items-center text-purple-700 dark:text-purple-300">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                              {artifact}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                        <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-3">
                          {language === 'vi' ? 'Ưu Tiên Chỉ Số' : 'Stat Priority'}
                        </h3>
                        <ul className="space-y-3">
                          {character.build.statPriority.map((stat, index) => (
                            <li key={index} className="flex items-center text-orange-700 dark:text-orange-300">
                              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                                {index + 1}
                              </span>
                              {stat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Gợi ý build sẽ có sớm.' : 'Build recommendations will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Recommended Weapons Section */}
              <section id="weapons" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Vũ Khí Đề Xuất' : 'Recommended Weapons'}
                  </h2>
                  
                  {character.recommendedWeapons && character.recommendedWeapons.length > 0 ? (
                    <div className="grid gap-4">
                      {character.recommendedWeapons.map((weapon, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {weapon.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                weapon.priority === 'High' 
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                  : weapon.priority === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                              }`}>
                                {weapon.priority === 'High' ? '⭐ Best' : weapon.priority === 'Medium' ? '👍 Good' : '👍 Decent'}
                              </span>
                              <Link
                                href={`/weapon/${weapon.slug}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm transition-colors"
                              >
                                {language === 'vi' ? 'Xem Vũ Khí →' : 'View Weapon →'}
                              </Link>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {language === 'vi' 
                              ? `Độ ưu tiên: ${weapon.priority === 'High' ? 'Cao' : weapon.priority === 'Medium' ? 'Trung bình' : 'Thấp'}`
                              : `Priority: ${weapon.priority}`
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Chưa có vũ khí đề xuất nào.' : 'No recommended weapons yet.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Team Synergy Section */}
              <section id="synergy" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Hiệu Ứng Đội' : 'Team Synergy'}
                  </h2>
                  
                  {character.synergy && character.synergy.length > 0 ? (
                    <div className="grid gap-4">
                      {character.synergy.map((synergy, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {synergy.partner}
                            </h3>
                            <Link
                              href={`/characters/${synergy.partner.toLowerCase()}`}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm transition-colors"
                            >
                              {language === 'vi' ? 'Xem Nhân Vật →' : 'View Character →'}
                            </Link>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {t(synergy.reason)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {language === 'vi' ? 'Thông tin hiệu ứng đội sẽ có sớm.' : 'Team synergy information will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Pros & Cons Section */}
              <section id="pros-cons" className="scroll-mt-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-['Poppins',sans-serif]">
                    {language === 'vi' ? 'Ưu & Nhược Điểm' : 'Pros & Cons'}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {language === 'vi' ? 'Điểm Mạnh' : 'Strengths'}
                      </h3>
                      {character.pros && character.pros.length > 0 ? (
                        <ul className="space-y-3">
                          {character.pros.map((pro, index) => (
                            <li key={index} className="flex items-start text-green-700 dark:text-green-300">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {t(pro)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-green-600 dark:text-green-400">
                          {language === 'vi' ? 'Chưa có điểm mạnh nào được liệt kê.' : 'No strengths listed yet.'}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {language === 'vi' ? 'Điểm Yếu' : 'Weaknesses'}
                      </h3>
                      {character.cons && character.cons.length > 0 ? (
                        <ul className="space-y-3">
                          {character.cons.map((con, index) => (
                            <li key={index} className="flex items-start text-red-700 dark:text-red-300">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {t(con)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-red-600 dark:text-red-400">
                          {language === 'vi' ? 'Chưa có điểm yếu nào được liệt kê.' : 'No weaknesses listed yet.'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CharacterDetailClient({ character }: CharacterDetailClientProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading character details...</p>
        </div>
      </div>
    }>
      <CharacterDetailContent character={character} />
    </Suspense>
  );
}
