
export type FontOption = 
  | 'Inter' | 'JetBrains Mono' | 'Orbitron' | 'Playfair Display' 
  | 'Syncopate' | 'Fredoka One' | 'Quicksand' | 'Bungee' 
  | 'Monoton' | 'Russo One' | 'Press Start 2P' | 'DotGothic16' 
  | 'Zen Maru Gothic' | 'Kaisei Tokumin' | 'Dela Gothic One' 
  | 'Montserrat' | 'Oswald' | 'Poppins' | 'Pacifico' | 'M PLUS Rounded 1c'
  | 'Bodoni Moda' | 'Cinzel';

export interface ThemeConfig {
  id: string;
  name: string;
  bgStart: string;
  bgEnd: string;
  glassColor: string;
  accentColor: string;
  textColor: string;
  borderRadius?: string;
}

export interface SettingsState {
  theme: string;
  font: FontOption;
  liquidColor: string;
  showSeconds: boolean;
  is24Hour: boolean;
  glassEffectEnabled: boolean;
  textGlassEnabled: boolean;
  customBgUrl: string | null;
  ambience: 'vibrant' | 'minimal' | 'soft';
}