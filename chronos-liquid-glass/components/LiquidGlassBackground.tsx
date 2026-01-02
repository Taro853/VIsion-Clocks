
import React from 'react';

interface Props {
  gradientClass: string;
}

const LiquidGlassBackground: React.FC<Props> = ({ gradientClass }) => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Primary Blob - アニメーション速度を落として滑らかに */}
      <div 
        className={`absolute top-[-15%] left-[-15%] w-[70%] h-[70%] bg-gradient-to-br ${gradientClass} opacity-30 blur-[120px] liquid-blob`}
        style={{ animationDuration: '20s' }}
      />
      {/* Secondary Blob */}
      <div 
        className={`absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-gradient-to-tr ${gradientClass} opacity-20 blur-[100px] liquid-blob`}
        style={{ animationDirection: 'reverse', animationDuration: '25s' }}
      />
      {/* Tertiary Blob */}
      <div 
        className={`absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-gradient-to-tl ${gradientClass} opacity-25 blur-[80px] liquid-blob`}
        style={{ animationDuration: '30s' }}
      />
      
      {/* Grainy Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default LiquidGlassBackground;
