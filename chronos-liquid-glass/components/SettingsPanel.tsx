
import React from 'react';
import { X, Palette, Type, Droplets, Image as ImageIcon, Settings2 } from 'lucide-react';
import { THEMES, FONTS, LIQUID_COLORS } from '../constants';
import { SettingsState, ThemeConfig } from '../types';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  settings: SettingsState;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  currentTheme: ThemeConfig;
}

const SettingsPanel: React.FC<Props> = ({ isOpen, onToggle, settings, updateSettings, currentTheme }) => {
  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateSettings({ customBgUrl: url });
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[4px] z-40 transition-opacity duration-500"
          onClick={onToggle}
        />
      )}

      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[380px] z-50 transition-transform duration-700 cubic-bezier(0.2, 1, 0.3, 1) transform shadow-[-30px_0_60px_rgba(0,0,0,0.2)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ color: '#1a1a1a' }}
      >
        {/* Glass Background for Panel - Enhanced Blur & Cleanliness */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-3xl saturate-150 border-l border-white/40 shadow-2xl" />
        
        {/* Marble Texture for Panel - Very Subtle */}
        <div className="absolute inset-0 bg-marble-texture opacity-5 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Luxury Header */}
          <div className="px-8 py-8 border-b border-black/5 flex justify-between items-center bg-white/40 shrink-0 backdrop-blur-md">
            <div className="flex flex-col">
              <h2 className="text-3xl font-serif tracking-widest text-black" style={{ fontFamily: '"Bodoni Moda", serif' }}>
                Atelier
              </h2>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mt-1 pl-1">Configuration</p>
            </div>
            <button 
              onClick={onToggle} 
              className="p-3 -mr-3 hover:bg-black/5 rounded-full transition-all duration-300 hover:rotate-90 group"
            >
              <X className="w-6 h-6 text-black/40 group-hover:text-black transition-colors" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-8 space-y-12">
              
              {/* Theme Section */}
              <section className="space-y-6">
                <SectionHeader icon={<Palette className="w-4 h-4" />} title="COLLECTION" />
                <div className="grid grid-cols-2 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => updateSettings({ theme: t.id })}
                      className={`relative p-4 rounded-lg border transition-all duration-300 text-left group overflow-hidden shadow-sm hover:shadow-md ${
                        settings.theme === t.id 
                          ? 'border-black bg-black text-white shadow-xl' 
                          : 'border-black/5 hover:border-black/30 bg-white/50 hover:bg-white'
                      }`}
                    >
                      <div className="relative z-10 flex flex-col gap-2">
                        <span className={`text-[10px] uppercase tracking-wider font-bold ${settings.theme === t.id ? 'text-white' : 'text-gray-900'}`}>
                          {t.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: t.bgStart }}></div>
                          <div className="w-5 h-5 rounded-full border border-white/20 shadow-sm" style={{ background: t.accentColor }}></div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Typography Section */}
              <section className="space-y-6">
                <SectionHeader icon={<Type className="w-4 h-4" />} title="TYPOGRAPHY" />
                <div className="grid grid-cols-2 gap-2">
                  {FONTS.map((f) => (
                    <button
                      key={f}
                      onClick={() => updateSettings({ font: f })}
                      className={`py-3 px-2 border-b transition-all text-center text-sm truncate hover:bg-black/5 ${
                        settings.font === f 
                          ? 'border-black text-black font-bold bg-black/5' 
                          : 'border-black/5 text-gray-500'
                      }`}
                      style={{ fontFamily: f }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </section>

              {/* Ambiance (Liquid Color) - Redesigned Card Selectors */}
              {!settings.customBgUrl && (
                <section className="space-y-6">
                  <SectionHeader icon={<Droplets className="w-4 h-4" />} title="AMBIANCE" />
                  <div className="grid grid-cols-1 gap-3">
                    {LIQUID_COLORS.map((lc) => (
                      <button
                        key={lc.name}
                        onClick={() => updateSettings({ liquidColor: lc.color })}
                        className={`relative w-full h-14 rounded-lg overflow-hidden transition-all duration-300 border group ${
                          settings.liquidColor === lc.color 
                            ? 'border-black/60 shadow-lg ring-1 ring-black/10' 
                            : 'border-black/5 hover:border-black/20'
                        }`}
                      >
                        {/* Gradient Preview */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${lc.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors" />
                        
                        {/* Label */}
                        <div className="absolute inset-0 flex items-center justify-between px-5">
                            <span className={`text-xs font-bold tracking-[0.2em] uppercase mix-blend-hard-light ${
                                settings.liquidColor === lc.color ? 'text-black' : 'text-black/70'
                            }`}>
                                {lc.name}
                            </span>
                            {settings.liquidColor === lc.color && (
                                <div className="w-2.5 h-2.5 rounded-full bg-black shadow-sm ring-2 ring-white/50" />
                            )}
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Background Image */}
              <section className="space-y-6">
                <SectionHeader icon={<ImageIcon className="w-4 h-4" />} title="BACKGROUND IMAGE" />
                <div className="space-y-3">
                  <label className="group flex items-center justify-between p-4 border border-dashed border-black/20 hover:border-black/40 cursor-pointer transition-all bg-white/40 hover:bg-white/80 rounded-sm">
                    <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-black">Select Image</span>
                    <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-black" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleBgUpload} />
                  </label>
                  {settings.customBgUrl && (
                    <button 
                      onClick={() => updateSettings({ customBgUrl: null })}
                      className="w-full text-center py-2 text-[10px] text-red-500 uppercase tracking-widest border border-red-200 hover:border-red-500 hover:bg-red-50 transition-all rounded-sm"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </section>

              {/* Display Controls */}
              <section className="space-y-6 pb-12">
                <SectionHeader icon={<Settings2 className="w-4 h-4" />} title="DISPLAY" />
                <div className="space-y-1 bg-white/40 rounded-lg p-2 border border-black/5 shadow-inner">
                  <ToggleRow 
                    label="Glass Panel" 
                    active={settings.glassEffectEnabled} 
                    onClick={() => updateSettings({ glassEffectEnabled: !settings.glassEffectEnabled })} 
                  />
                  <ToggleRow 
                    label="Glass Text" 
                    active={settings.textGlassEnabled} 
                    onClick={() => updateSettings({ textGlassEnabled: !settings.textGlassEnabled })} 
                  />
                  <ToggleRow 
                    label="Show Seconds" 
                    active={settings.showSeconds} 
                    onClick={() => updateSettings({ showSeconds: !settings.showSeconds })} 
                  />
                  <ToggleRow 
                    label="24-Hour Format" 
                    active={settings.is24Hour} 
                    onClick={() => updateSettings({ is24Hour: !settings.is24Hour })} 
                  />
                </div>
              </section>

            </div>
          </div>

          <div className="p-6 border-t border-black/5 bg-white/30 text-center shrink-0 backdrop-blur-md">
            <p className="text-[10px] text-gray-400 font-serif italic">
              Excellence in every second.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center gap-3 mb-2 px-1">
    <span className="text-black/40">{icon}</span>
    <h3 className="text-[10px] font-bold tracking-[0.3em] text-black/80 font-sans uppercase">{title}</h3>
  </div>
);

const ToggleRow = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <div className="flex items-center justify-between w-full py-3 px-3 hover:bg-black/5 transition-colors group rounded-md cursor-pointer" onClick={onClick}>
    <span className="text-xs tracking-wider text-gray-600 group-hover:text-black font-medium">{label}</span>
    <div className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in">
        <input 
            type="checkbox" 
            checked={active} 
            readOnly 
            className="toggle-checkbox absolute block w-0 h-0 opacity-0"
        />
        <div className={`toggle-label block overflow-hidden h-5 rounded-full shadow-inner transition-colors duration-300 ${active ? 'bg-black' : 'bg-gray-300'}`}></div>
        <div className={`absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full shadow-md transition-transform duration-300 ease-in-out ${active ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

export default SettingsPanel;
