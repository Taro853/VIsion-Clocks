
import { ThemeConfig, FontOption } from './types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'luxe-blanc',
    name: 'ホワイト・マーブル', // White Marble
    bgStart: '#f5f5f5', 
    bgEnd: '#e0e0e0',   
    glassColor: 'rgba(255, 255, 255, 0.4)',
    accentColor: '#8a817c', 
    textColor: '#2b2b2b',   
    borderRadius: '4px'
  },
  {
    id: 'obsidian-slate',
    name: 'オブシディアン (黒曜石)', // Black Marble/Slate
    bgStart: '#141414',
    bgEnd: '#0a0a0a',
    glassColor: 'rgba(40, 40, 40, 0.6)',
    accentColor: '#D4AF37',
    textColor: '#f0f0f0',
    borderRadius: '4px'
  },
  {
    id: 'versailles-gold',
    name: 'ベルサイユ・ゴールド', // New Luxury
    bgStart: '#2c241b',
    bgEnd: '#1a120b',
    glassColor: 'rgba(255, 215, 0, 0.05)',
    accentColor: '#FFD700',
    textColor: '#FFD700', // Uses Gold Gradient Class in UI
    borderRadius: '2px'
  },
  {
    id: 'midnight-sapphire',
    name: 'ミッドナイト・サファイア', // New Luxury
    bgStart: '#0f172a',
    bgEnd: '#020617',
    glassColor: 'rgba(148, 163, 184, 0.1)',
    accentColor: '#e2e8f0',
    textColor: '#e2e8f0', // Uses Platinum Gradient Class in UI
    borderRadius: '12px'
  },
  {
    id: 'hermitage-rouge',
    name: 'エルミタージュ・ルージュ', // New Luxury
    bgStart: '#2a0a10',
    bgEnd: '#1a0505',
    glassColor: 'rgba(255, 200, 200, 0.05)',
    accentColor: '#ffb3b3',
    textColor: '#ffdddd',
    borderRadius: '8px'
  },
  {
    id: 'platinum-mist',
    name: 'プラチナ・ミスト',
    bgStart: '#eef2f3',
    bgEnd: '#d9e4f5',
    glassColor: 'rgba(255, 255, 255, 0.5)',
    accentColor: '#2c3e50',
    textColor: '#1a1a1a',
    borderRadius: '3rem'
  },
  {
    id: 'sakura-quartz',
    name: 'サクラ・クォーツ',
    bgStart: '#fff0f5',
    bgEnd: '#fff5f7',
    glassColor: 'rgba(255, 255, 255, 0.4)',
    accentColor: '#dfa7b6',
    textColor: '#8e5e6a',
    borderRadius: '1.5rem'
  }
];

export const FONTS: FontOption[] = [
  'Bodoni Moda', 'Cinzel', 'Playfair Display', 'Montserrat', 'Inter',
  'JetBrains Mono', 'Orbitron', 'Syncopate', 'Russo One', 'Press Start 2P',
  'Fredoka One', 'Bungee', 'Monoton', 'Pacifico', 'Dela Gothic One',
  'Zen Maru Gothic', 'M PLUS Rounded 1c', 'Kaisei Tokumin', 'DotGothic16', 'Quicksand'
];

export const LIQUID_COLORS = [
  { name: 'Champagne Gold', color: 'from-[#e6d5ac] via-[#f3e8cb] to-[#d4af37]' }, 
  { name: 'Royal Blue', color: 'from-blue-200 via-indigo-300 to-blue-500' },
  { name: 'Rich Velvet', color: 'from-fuchsia-900 via-purple-800 to-indigo-900' },
  { name: 'Emerald', color: 'from-emerald-200 via-teal-400 to-emerald-600' },
  { name: 'Crystal Clear', color: 'from-gray-100 via-gray-200 to-white' }
];
