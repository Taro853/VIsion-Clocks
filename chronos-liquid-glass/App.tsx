
import React, { useState, useMemo, useEffect } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { SettingsState } from './types';
import { THEMES, LIQUID_COLORS } from './constants';
import ClockDisplay from './components/ClockDisplay';
import SettingsPanel from './components/SettingsPanel';
import LiquidGlassBackground from './components/LiquidGlassBackground';

const STORAGE_KEY = 'vision_clock_settings_v5';

const DEFAULT_SETTINGS: SettingsState = {
  theme: 'luxe-blanc',
  font: 'Bodoni Moda',
  liquidColor: LIQUID_COLORS[0].color,
  showSeconds: true,
  is24Hour: true,
  glassEffectEnabled: true,
  textGlassEnabled: false,
  customBgUrl: null,
  ambience: 'vibrant'
};

const App: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 初期設定を localStorage から取得
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        // 保存されたデータとデフォルトをマージして欠落を防ぐ
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  // 設定変更時に localStorage へ保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const currentTheme = useMemo(() => {
    return THEMES.find(t => t.id === settings.theme) || THEMES[0];
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const isDarkTheme = currentTheme.id === 'obsidian-slate' || currentTheme.id === 'royal-gold' || currentTheme.id === 'noir-modern' || currentTheme.id === 'versailles-gold';

  return (
    <div 
      className={`min-h-screen w-full relative flex items-center justify-center transition-all duration-1000 overflow-hidden bg-cover bg-center ${isDarkTheme ? 'dark' : ''}`}
      style={{ 
        backgroundImage: settings.customBgUrl ? `url(${settings.customBgUrl})` : undefined,
        backgroundColor: currentTheme.bgStart
      }}
    >
      {/* Background Gradient Layer */}
      {!settings.customBgUrl && (
         <div 
           className="absolute inset-0 transition-colors duration-1000"
           style={{ background: `linear-gradient(135deg, ${currentTheme.bgStart} 0%, ${currentTheme.bgEnd} 100%)` }}
         />
      )}

      {/* Marble Texture Overlay */}
      {!settings.customBgUrl && (
        <div className="absolute inset-0 bg-marble-texture opacity-60 mix-blend-overlay pointer-events-none" />
      )}

      {/* Dynamic Liquid Blobs */}
      {!settings.customBgUrl && <LiquidGlassBackground gradientClass={settings.liquidColor} />}
      
      {/* Overlay for Custom Images */}
      {settings.customBgUrl && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] pointer-events-none" />
      )}

      {/* Main Clock */}
      <ClockDisplay settings={settings} theme={currentTheme} />

      {/* Settings Trigger - Always white for contrast */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed bottom-8 right-8 z-30 group"
      >
        <div 
          className="absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{ backgroundColor: currentTheme.accentColor }}
        />
        <div 
          className="relative p-4 rounded-full crystal-card shadow-2xl transition-transform duration-500 hover:scale-110 hover:rotate-90 text-white"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
        >
          <SettingsIcon className="w-6 h-6 stroke-[1.5px]" />
        </div>
      </button>

      {/* Settings Side Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
        currentTheme={currentTheme}
      />
    </div>
  );
};

export default App;
