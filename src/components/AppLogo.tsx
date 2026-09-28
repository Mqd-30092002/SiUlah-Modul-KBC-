import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AppLogo: React.FC<AppLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-1.5 shadow-md border-2 border-amber-400 flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Islamic 8-point geometric star subtle background in gold */}
        <polygon
          points="50,4 63,17 82,17 82,36 96,50 82,64 82,83 63,83 50,96 37,83 18,83 18,64 4,50 18,36 18,17 37,17"
          fill="#064e3b"
          stroke="#f59e0b"
          strokeWidth="3"
        />

        {/* Inner circle in deep emerald */}
        <circle cx="50" cy="50" r="38" fill="#047857" stroke="#fbbf24" strokeWidth="2.5" />

        {/* Open Book in Crisp White */}
        <path
          d="M26 62C34 58 43 59 50 63C57 59 66 58 74 62V35C66 31 57 32 50 36C43 32 34 31 26 35V62Z"
          fill="#FFFFFF"
          stroke="#fbbf24"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Book spine line */}
        <line x1="50" y1="36" x2="50" y2="63" stroke="#d97706" strokeWidth="2" />

        {/* Heart of Love (Cinta) in radiant Gold/Yellow in center */}
        <path
          d="M50 49C48 44 41 42 38 46C34 50 37 56 50 64C63 56 66 50 62 46C59 42 52 44 50 49Z"
          fill="#FBBF24"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />

        {/* Radiant Star atop */}
        <circle cx="50" cy="22" r="4.5" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1" />
      </svg>
    </div>
  );
};
