
import React, { useState, useEffect } from 'react';
import { SettingsState, ThemeConfig } from '../types';

interface Props {
  settings: SettingsState;
  theme: ThemeConfig;
}

const ClockDisplay: React.FC<Props> = ({ settings, theme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPart = (val: number) => val.toString().padStart(2, '0');

  const hours = settings.is24Hour 
    ? time.getHours() 
    : (time.getHours() % 12 || 12);
  
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const isNewYear = time.getMonth() === 0 && time.getDate() === 1;

  const dateString = time.toLocaleDateString('ja-JP', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Only digits use these luxury text effects
  let digitTextClass = '';
  if (theme.id === 'versailles-gold' || theme.id === 'royal-gold') {
    digitTextClass = 'text-luxury-gold';
  } else if (theme.id === 'midnight-sapphire' || theme.id === 'obsidian-slate') {
    digitTextClass = 'text-luxury-platinum';
  } else if (settings.textGlassEnabled) {
    digitTextClass = 'text-luxury-platinum';
  }

  // フォント幅の調整: Dela Gothic One は 1.0em、その他は 0.7em
  const digitWidth = settings.font === 'Dela Gothic One' ? '1.0em' : '0.7em';

  const DigitBox = ({ value }: { value: string }) => (
    <div className={`flex justify-center items-center shrink-0 ${digitTextClass}`} style={{ width: digitWidth }}>
      {value}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen select-none relative overflow-hidden">
      
      {/* Brand - Department Store Style */}
      <div 
        className="absolute top-[8%] z-10 flex flex-col items-center"
        style={{ color: theme.textColor, fontFamily: '"Bodoni Moda", serif' }}
      >
        <div className={`relative px-8 py-3 border-y-2 border-double border-current opacity-90`}>
           <h1 className="text-xl md:text-2xl tracking-[0.3em] font-medium uppercase whitespace-nowrap">
             Vision Clock
           </h1>
        </div>
        <div className="flex items-center gap-3 mt-2 opacity-60">
           <div className="h-[1px] w-4 bg-current"></div>
           <span className="text-[9px] tracking-[0.4em] uppercase font-sans">Maison de L'Heure</span>
           <div className="h-[1px] w-4 bg-current"></div>
        </div>
      </div>

      {/* Date Header */}
      <div 
        className="absolute top-[20%] flex flex-col items-center gap-2 z-10"
        style={{ color: theme.textColor, fontFamily: settings.font }}
      >
        <div className={`text-xs md:text-base tracking-[0.2em] uppercase opacity-80 font-medium text-center`}>
          {dateString}
        </div>
        {isNewYear && (
          <div className="text-lg font-bold tracking-[0.2em] text-red-500 mt-2">
            HAPPY NEW YEAR
          </div>
        )}
      </div>

      {/* Main Clock UI */}
      <div 
        className="flex items-center justify-center gap-[1.5vw] sm:gap-[2vw] relative z-20 w-full px-4 mt-8"
        style={{ 
          color: theme.textColor,
          fontFamily: settings.font
        }}
      >
        {/* Hours Card */}
        <div 
          className={`px-[1vw] py-[2.5vw] w-[34vw] sm:w-[32vw] flex items-center justify-center transition-all duration-700 ease-out relative overflow-hidden group ${settings.glassEffectEnabled ? 'crystal-card' : ''}`}
          style={{ 
            borderRadius: theme.borderRadius || '4px',
          }}
        >
          {settings.glassEffectEnabled && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          )}
          
          <div className="flex t-nums text-[13vw] sm:text-[14vw] leading-none font-bold z-10 justify-center">
            <DigitBox value={formatPart(hours)[0]} />
            <DigitBox value={formatPart(hours)[1]} />
          </div>
        </div>
        
        {/* Separator - Plain color for visibility */}
        <div className={`flex flex-col justify-center gap-[2vw] text-[8vw] leading-none font-light pb-[2vw] w-[2vw] items-center opacity-80`}>
          <span className="animate-pulse">:</span>
        </div>

        {/* Minutes Card */}
        <div 
          className={`px-[1vw] py-[2.5vw] w-[34vw] sm:w-[32vw] flex items-center justify-center transition-all duration-700 ease-out relative overflow-hidden group ${settings.glassEffectEnabled ? 'crystal-card' : ''}`}
          style={{ 
            borderRadius: theme.borderRadius || '4px',
          }}
        >
           {settings.glassEffectEnabled && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          )}

          <div className="flex t-nums text-[13vw] sm:text-[14vw] leading-none font-bold z-10 justify-center">
            <DigitBox value={formatPart(minutes)[0]} />
            <DigitBox value={formatPart(minutes)[1]} />
          </div>
        </div>

        {/* Seconds & AM/PM - Wrapped in its own Card for consistency */}
        {(settings.showSeconds || !settings.is24Hour) && (
          <div 
            className={`ml-[0.5vw] px-[1vw] py-[2vw] w-[14vw] sm:w-[13vw] flex flex-col items-center justify-center transition-all duration-700 ease-out relative overflow-hidden group ${settings.glassEffectEnabled ? 'crystal-card' : ''}`}
            style={{
                borderRadius: theme.borderRadius || '4px',
                alignSelf: 'stretch'
            }}
          >
             {settings.glassEffectEnabled && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
             )}
             
             <div className="flex flex-col items-center z-10 justify-center h-full gap-2">
                {!settings.is24Hour && (
                    <div className={`text-[2.2vw] font-medium tracking-[0.15em] opacity-80 leading-none`} style={{ fontFamily: '"Cinzel", serif' }}>
                        {ampm}
                    </div>
                )}
                {settings.showSeconds && (
                    <div className="t-nums text-[4.5vw] leading-none font-bold opacity-90" style={{ fontFamily: settings.font }}>
                        <div className="flex w-full justify-center">
                            <DigitBox value={formatPart(seconds)[0]} />
                            <DigitBox value={formatPart(seconds)[1]} />
                        </div>
                    </div>
                )}
             </div>
          </div>
        )}
      </div>

      {/* Luxury Reflection */}
      <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-white/5 to-transparent pointer-events-none opacity-30 blur-2xl" />
    </div>
  );
};

export default ClockDisplay;
