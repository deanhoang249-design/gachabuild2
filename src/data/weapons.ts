export type Language = 'en' | 'vi';

export interface MultilingualText {
  en: string;
  vi: string;
}

export interface Weapon {
  id: string;
  name: MultilingualText;
  type: string;
  rarity: string;
  image: string;
  description: MultilingualText;
  passive?: MultilingualText;
  stats?: {
    attack?: number;
    health?: number;
    defense?: number;
    critRate?: number;
    critDamage?: number;
  };
  recommendedCharacters?: string[];
}

export const weapons: Weapon[] = [
  {
    id: 'judgement-edge',
    name: {
      en: 'Judgement Edge',
      vi: 'Lưỡi Kiếm Phán Xét'
    },
    type: 'Sword',
    rarity: 'SSR',
    image: '/weapons/judgement-edge.png',
    description: {
      en: 'A legendary sword forged from the essence of divine justice. Its blade gleams with an otherworldly light that pierces through darkness.',
      vi: 'Một thanh kiếm huyền thoại được rèn từ tinh chất của công lý thần thánh. Lưỡi kiếm tỏa sáng với ánh sáng siêu nhiên xuyên thủng bóng tối.'
    },
    passive: {
      en: 'Increases critical hit damage by 25% and has a 15% chance to deal true damage that ignores defense.',
      vi: 'Tăng sát thương chí mạng 25% và có 15% cơ hội gây sát thương thật bỏ qua phòng thủ.'
    },
    stats: {
      attack: 1200,
      critRate: 15,
      critDamage: 50
    },
    recommendedCharacters: ['berenica', 'hilda', 'outsider']
  },
  {
    id: 'abyssal-rifle',
    name: {
      en: 'Abyssal Rifle',
      vi: 'Súng Trường Vực Thẳm'
    },
    type: 'Sniper',
    rarity: 'SSR',
    image: '/weapons/abyssal-rifle.png',
    description: {
      en: 'A powerful sniper rifle that channels the power of the abyss. Each shot carries the weight of infinite darkness.',
      vi: 'Một khẩu súng bắn tỉa mạnh mẽ kênh hóa sức mạnh của vực thẳm. Mỗi phát bắn mang theo sức nặng của bóng tối vô tận.'
    },
    passive: {
      en: 'Increases damage by 30% against enemies with less than 50% health. Critical hits have a 20% chance to pierce through multiple enemies.',
      vi: 'Tăng sát thương 30% với kẻ thù có máu dưới 50%. Chí mạng có 20% cơ hội xuyên qua nhiều kẻ thù.'
    },
    stats: {
      attack: 1400,
      critRate: 20,
      critDamage: 60
    },
    recommendedCharacters: ['phoxhunter', 'nova']
  },
  {
    id: 'windcaller-bow',
    name: {
      en: 'Windcaller Bow',
      vi: 'Cung Gọi Gió'
    },
    type: 'Bow',
    rarity: 'SSR',
    image: '/weapons/windcaller-bow.png',
    description: {
      en: 'An ancient bow that commands the very winds themselves. Arrows fired from this bow never miss their mark.',
      vi: 'Một cây cung cổ xưa điều khiển chính những cơn gió. Những mũi tên bắn từ cây cung này không bao giờ trượt mục tiêu.'
    },
    passive: {
      en: 'Increases movement speed by 20% and grants immunity to crowd control effects. Arrows have a 25% chance to create wind vortexes.',
      vi: 'Tăng tốc độ di chuyển 20% và miễn nhiễm hiệu ứng kiểm soát đám đông. Mũi tên có 25% cơ hội tạo ra xoáy gió.'
    },
    stats: {
      attack: 1100,
      critRate: 18,
      critDamage: 45
    },
    recommendedCharacters: ['fina', 'iris', 'yuna']
  },
  {
    id: 'maids-blade',
    name: {
      en: 'Maid\'s Blade',
      vi: 'Lưỡi Kiếm Nữ Hầu'
    },
    type: 'Sword',
    rarity: 'SR',
    image: '/weapons/maids-blade.png',
    description: {
      en: 'A elegant sword wielded by the most skilled maids. Its design reflects both beauty and deadly precision.',
      vi: 'Một thanh kiếm thanh lịch được sử dụng bởi những nữ hầu tài năng nhất. Thiết kế của nó phản ánh cả vẻ đẹp và độ chính xác chết người.'
    },
    passive: {
      en: 'Increases attack power by 20% when health is above 80%. Each successful hit has a 10% chance to restore 5% health.',
      vi: 'Tăng sức tấn công 20% khi máu trên 80%. Mỗi đòn đánh thành công có 10% cơ hội hồi 5% máu.'
    },
    stats: {
      attack: 900,
      critRate: 12,
      critDamage: 35
    },
    recommendedCharacters: ['hilda']
  },
  {
    id: 'phoenix-rifle',
    name: {
      en: 'Phoenix Rifle',
      vi: 'Súng Phượng Hoàng'
    },
    type: 'Sniper',
    rarity: 'SSR',
    image: '/weapons/phoenix-rifle.png',
    description: {
      en: 'A rifle imbued with the power of the phoenix. Its shots leave trails of fire that burn enemies over time.',
      vi: 'Một khẩu súng được truyền sức mạnh của phượng hoàng. Những phát bắn để lại vệt lửa đốt cháy kẻ thù theo thời gian.'
    },
    passive: {
      en: 'Deals fire damage over time. When health drops below 30%, gain 50% attack speed and fire immunity for 5 seconds.',
      vi: 'Gây sát thương lửa theo thời gian. Khi máu xuống dưới 30%, tăng 50% tốc độ tấn công và miễn nhiễm lửa trong 5 giây.'
    },
    stats: {
      attack: 1300,
      critRate: 16,
      critDamage: 55
    },
    recommendedCharacters: ['phoxhunter']
  },
  {
    id: 'lightning-spear',
    name: {
      en: 'Lightning Spear',
      vi: 'Giáo Sét'
    },
    type: 'Spear',
    rarity: 'SSR',
    image: '/weapons/lightning-spear.png',
    description: {
      en: 'A spear crackling with electric energy. Each thrust sends bolts of lightning through multiple enemies.',
      vi: 'Một cây giáo rực sáng với năng lượng điện. Mỗi cú đâm gửi những tia sét qua nhiều kẻ thù.'
    },
    passive: {
      en: 'Attacks have a 30% chance to chain lightning to nearby enemies. Increases attack speed by 25% for 3 seconds after each critical hit.',
      vi: 'Tấn công có 30% cơ hội tạo sét chuỗi đến kẻ thù gần. Tăng tốc độ tấn công 25% trong 3 giây sau mỗi chí mạng.'
    },
    stats: {
      attack: 1150,
      critRate: 14,
      critDamage: 40
    },
    recommendedCharacters: ['fushu', 'zephyr']
  },
  {
    id: 'culinary-staff',
    name: {
      en: 'Culinary Staff',
      vi: 'Gậy Ẩm Thực'
    },
    type: 'Staff',
    rarity: 'SR',
    image: '/weapons/culinary-staff.png',
    description: {
      en: 'A magical staff that enhances the power of food and healing. Its warmth brings comfort to allies.',
      vi: 'Một cây gậy ma thuật tăng cường sức mạnh của thức ăn và hồi máu. Hơi ấm của nó mang lại sự thoải mái cho đồng minh.'
    },
    passive: {
      en: 'Increases healing effectiveness by 30%. Allies within 3 tiles gain 15% damage reduction and status effect immunity.',
      vi: 'Tăng hiệu quả hồi máu 30%. Đồng minh trong vòng 3 ô nhận giảm sát thương 15% và miễn nhiễm hiệu ứng trạng thái.'
    },
    stats: {
      attack: 800,
      health: 200,
      defense: 100
    },
    recommendedCharacters: ['truffle-and-filbert', 'luna', 'sophia']
  },
  {
    id: 'ice-staff',
    name: {
      en: 'Ice Staff',
      vi: 'Gậy Băng'
    },
    type: 'Staff',
    rarity: 'SR',
    image: '/weapons/ice-staff.png',
    description: {
      en: 'A staff carved from eternal ice. It freezes enemies solid and creates protective barriers.',
      vi: 'Một cây gậy được chạm khắc từ băng vĩnh cửu. Nó đóng băng kẻ thù thành cục và tạo ra các rào chắn bảo vệ.'
    },
    passive: {
      en: 'Attacks have a 25% chance to freeze enemies for 2 turns. Creates an ice barrier that absorbs 500 damage every 3 turns.',
      vi: 'Tấn công có 25% cơ hội đóng băng kẻ thù trong 2 lượt. Tạo ra rào chắn băng hấp thụ 500 sát thương mỗi 3 lượt.'
    },
    stats: {
      attack: 850,
      health: 150,
      defense: 120
    },
    recommendedCharacters: ['snow', 'psyche']
  },
  {
    id: 'tricksters-blade',
    name: {
      en: 'Trickster\'s Blade',
      vi: 'Lưỡi Kiếm Lừa Đảo'
    },
    type: 'Sword',
    rarity: 'SR',
    image: '/weapons/tricksters-blade.png',
    description: {
      en: 'A deceptive sword that changes its appearance mid-battle. Perfect for those who love to play mind games.',
      vi: 'Một thanh kiếm lừa dối thay đổi ngoại hình giữa trận chiến. Hoàn hảo cho những ai thích chơi trò tâm lý.'
    },
    passive: {
      en: 'Each attack has a 20% chance to confuse the enemy, making them attack randomly for 1 turn. Steals 10 MP from enemies on critical hits.',
      vi: 'Mỗi tấn công có 20% cơ hội làm kẻ thù bối rối, khiến chúng tấn công ngẫu nhiên trong 1 lượt. Đánh cắp 10 MP từ kẻ thù khi chí mạng.'
    },
    stats: {
      attack: 950,
      critRate: 13,
      critDamage: 38
    },
    recommendedCharacters: ['tabethe']
  },
  {
    id: 'golden-river',
    name: {
      en: 'Golden River',
      vi: 'Dòng Sông Vàng'
    },
    type: 'Bow',
    rarity: 'SSR',
    image: '/weapons/golden-river.png',
    description: {
      en: 'A bow that channels the power of the mystical golden river. Its arrows flow like liquid gold.',
      vi: 'Một cây cung kênh hóa sức mạnh của dòng sông vàng thần bí. Những mũi tên của nó chảy như vàng lỏng.'
    },
    passive: {
      en: 'Arrows create golden trails that heal allies for 20% of damage dealt. Critical hits have a 30% chance to create a golden explosion.',
      vi: 'Mũi tên tạo ra vệt vàng hồi máu đồng minh 20% sát thương gây ra. Chí mạng có 30% cơ hội tạo ra vụ nổ vàng.'
    },
    stats: {
      attack: 1250,
      critRate: 17,
      critDamage: 48
    },
    recommendedCharacters: ['fina']
  }
];







