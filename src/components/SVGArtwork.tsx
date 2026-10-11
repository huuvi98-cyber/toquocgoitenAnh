import React from 'react';

/**
 * Poetic Vietnamese Bamboo Grove Artwork
 * Vector illustration of resilient bamboo in morning mist and warm golden sunlight
 */
export const BambooGroveArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-[#1c2c20] via-[#122016] to-[#0a120c] ${className}`}>
      <svg
        viewBox="0 0 1200 650"
        className="w-full h-full object-cover opacity-85 select-none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#d97706" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#052e16" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stalkGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="40%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#047857" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id="stalkGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="50%" stopColor="#86efac" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
          <linearGradient id="mistFog" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0a120c" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#14532d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Morning Light Orb */}
        <circle cx="950" cy="180" r="280" fill="url(#sunGlow)" />
        <circle cx="950" cy="180" r="100" fill="#fef08a" opacity="0.15" />

        {/* Distant Bamboo Layer (Atmospheric Depth) */}
        <g opacity="0.25">
          <rect x="180" y="0" width="16" height="650" fill="#34d399" />
          <rect x="230" y="0" width="14" height="650" fill="#34d399" />
          <rect x="360" y="0" width="18" height="650" fill="#34d399" />
          <rect x="520" y="0" width="12" height="650" fill="#34d399" />
          <rect x="670" y="0" width="14" height="650" fill="#34d399" />
          <rect x="820" y="0" width="16" height="650" fill="#34d399" />
          <rect x="1010" y="0" width="18" height="650" fill="#34d399" />
          <rect x="1080" y="0" width="12" height="650" fill="#34d399" />
        </g>

        {/* Mid-ground Bamboo Stalks */}
        <g opacity="0.6">
          <rect x="120" y="0" width="24" height="650" fill="url(#stalkGrad1)" />
          <rect x="290" y="0" width="22" height="650" fill="url(#stalkGrad1)" />
          <rect x="470" y="0" width="26" height="650" fill="url(#stalkGrad1)" />
          <rect x="740" y="0" width="24" height="650" fill="url(#stalkGrad1)" />
          <rect x="910" y="0" width="28" height="650" fill="url(#stalkGrad1)" />
        </g>

        {/* Foreground Hero Stalks with Joint Details */}
        <g>
          {/* Main Bamboo 1 */}
          <rect x="220" y="0" width="34" height="650" fill="url(#stalkGrad2)" />
          <line x1="216" y1="140" x2="258" y2="140" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="216" y1="310" x2="258" y2="310" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="216" y1="480" x2="258" y2="480" stroke="#fef08a" strokeWidth="4" opacity="0.6" />

          {/* Main Bamboo 2 */}
          <rect x="410" y="0" width="38" height="650" fill="url(#stalkGrad2)" />
          <line x1="406" y1="90" x2="452" y2="90" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="406" y1="260" x2="452" y2="260" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="406" y1="440" x2="452" y2="440" stroke="#fef08a" strokeWidth="4" opacity="0.6" />

          {/* Main Bamboo 3 (Slightly curved feel) */}
          <rect x="630" y="0" width="32" height="650" fill="url(#stalkGrad2)" />
          <line x1="626" y1="180" x2="666" y2="180" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="626" y1="360" x2="666" y2="360" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="626" y1="530" x2="666" y2="530" stroke="#fef08a" strokeWidth="4" opacity="0.6" />

          {/* Main Bamboo 4 */}
          <rect x="850" y="0" width="36" height="650" fill="url(#stalkGrad2)" />
          <line x1="846" y1="120" x2="890" y2="120" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="846" y1="300" x2="890" y2="300" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
          <line x1="846" y1="470" x2="890" y2="470" stroke="#fef08a" strokeWidth="4" opacity="0.6" />
        </g>

        {/* Bamboo Leaves Clusters (Calligraphic Stroke Feel) */}
        <g fill="#10b981" opacity="0.8">
          {/* Leaves cluster top-left */}
          <path d="M254,140 Q310,120 380,145 Q310,130 254,140 Z" />
          <path d="M254,140 Q330,155 400,180 Q320,160 254,140 Z" />
          <path d="M220,140 Q160,110 100,130 Q160,120 220,140 Z" />
          
          {/* Leaves cluster mid */}
          <path d="M448,260 Q520,240 600,270 Q510,250 448,260 Z" />
          <path d="M448,260 Q540,285 620,310 Q530,285 448,260 Z" />
          <path d="M410,260 Q340,230 270,255 Q350,245 410,260 Z" />

          {/* Leaves cluster right */}
          <path d="M886,300 Q960,270 1040,310 Q950,285 886,300 Z" />
          <path d="M886,300 Q970,330 1050,350 Q960,325 886,300 Z" />
          <path d="M850,300 Q780,265 710,290 Q790,280 850,300 Z" />
        </g>

        {/* Lower Ground & Mist Fog */}
        <rect x="0" y="350" width="1200" height="300" fill="url(#mistFog)" />
        <ellipse cx="600" cy="640" rx="700" ry="120" fill="#052e16" opacity="0.9" />

        {/* Golden floating particles / pollen */}
        <g fill="#fef08a" opacity="0.4">
          <circle cx="340" cy="180" r="2.5" />
          <circle cx="490" cy="220" r="3" />
          <circle cx="720" cy="160" r="2" />
          <circle cx="890" cy="240" r="3.5" />
          <circle cx="580" cy="340" r="2" />
          <circle cx="210" cy="380" r="2.5" />
          <circle cx="980" cy="290" r="3" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Diplomatic Treaty & Summit Hall Artwork
 */
export const DiplomaticHallArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1e1b18] via-[#15120f] to-[#0a0908] ${className}`}>
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full object-cover opacity-90 select-none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#b45309" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="chandelierGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1e1b18" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Neoclassical Pillars */}
        <g fill="#292524" opacity="0.6">
          <rect x="80" y="40" width="48" height="520" />
          <rect x="220" y="40" width="48" height="520" />
          <rect x="730" y="40" width="48" height="520" />
          <rect x="870" y="40" width="48" height="520" />
        </g>

        {/* Chandelier ambient glow in the center */}
        <circle cx="500" cy="140" r="220" fill="url(#chandelierGlow)" />

        {/* Grand Diplomatic Round Table */}
        <g transform="translate(500, 420)">
          {/* Shadow */}
          <ellipse cx="0" cy="30" rx="380" ry="110" fill="#000" opacity="0.6" />
          
          {/* Polished Mahogany Table Surface */}
          <ellipse cx="0" cy="0" rx="360" ry="100" fill="#451a03" stroke="#92400e" strokeWidth="3" />
          <ellipse cx="0" cy="-5" rx="320" ry="85" fill="#78350f" opacity="0.8" />
          <ellipse cx="0" cy="-10" rx="260" ry="65" fill="#9a3412" opacity="0.5" />
          <ellipse cx="0" cy="-15" rx="160" ry="40" fill="#fef08a" opacity="0.15" />

          {/* National Delegate Placement Markers */}
          <circle cx="-280" cy="0" r="10" fill="#f59e0b" opacity="0.9" />
          <circle cx="-200" cy="-45" r="10" fill="#f59e0b" opacity="0.9" />
          <circle cx="-100" cy="-70" r="10" fill="#f59e0b" opacity="0.9" />
          <circle cx="0" cy="-80" r="12" fill="#ef4444" stroke="#fef08a" strokeWidth="2" /> {/* Host Vietnam */}
          <circle cx="100" cy="-70" r="10" fill="#f59e0b" opacity="0.9" />
          <circle cx="200" cy="-45" r="10" fill="#f59e0b" opacity="0.9" />
          <circle cx="280" cy="0" r="10" fill="#f59e0b" opacity="0.9" />
        </g>

        {/* Chandelier Crystal Drops */}
        <g stroke="#fef08a" strokeWidth="1" opacity="0.7">
          <line x1="500" y1="20" x2="500" y2="120" strokeWidth="3" />
          <line x1="450" y1="120" x2="550" y2="120" />
          <line x1="470" y1="140" x2="530" y2="140" />
          <circle cx="500" cy="120" r="4" fill="#fef08a" />
          <circle cx="460" cy="130" r="3" fill="#fef08a" />
          <circle cx="540" cy="130" r="3" fill="#fef08a" />
          <circle cx="480" cy="150" r="3" fill="#fef08a" />
          <circle cx="520" cy="150" r="3" fill="#fef08a" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Constellation Network & Globe Radar
 */
export const GlobalDiplomacyRadarArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0b1329] via-[#090d1a] to-[#04060b] ${className}`}>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-contain opacity-90 select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pulseCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0b1329" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric diplomatic orbit rings */}
        <circle cx="400" cy="300" r="260" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="400" cy="300" r="200" fill="none" stroke="#334155" strokeWidth="1" />
        <circle cx="400" cy="300" r="140" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <circle cx="400" cy="300" r="80" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
        
        {/* Glow center */}
        <circle cx="400" cy="300" r="120" fill="url(#pulseCenter)" />

        {/* Vietnam Center Hub */}
        <circle cx="400" cy="300" r="14" fill="#dc2626" stroke="#facc15" strokeWidth="3" />
        <circle cx="400" cy="300" r="5" fill="#facc15" />
        <text x="400" y="335" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600" letterSpacing="2">
          VIỆT NAM
        </text>

        {/* Global Connection lines & Major Partner Nodes */}
        {/* Beijing */}
        <line x1="400" y1="300" x2="520" y2="160" stroke="#facc15" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="520" cy="160" r="8" fill="#ef4444" />
        <text x="535" y="165" fill="#e2e8f0" fontSize="11" fontWeight="500">Trung Quốc</text>

        {/* Moscow */}
        <line x1="400" y1="300" x2="310" y2="120" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="310" cy="120" r="7" fill="#3b82f6" />
        <text x="245" y="115" fill="#e2e8f0" fontSize="11">LB Nga</text>

        {/* Washington */}
        <line x1="400" y1="300" x2="620" y2="280" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="620" cy="280" r="8" fill="#f59e0b" />
        <text x="635" y="285" fill="#e2e8f0" fontSize="11" fontWeight="500">Hoa Kỳ</text>

        {/* Tokyo */}
        <line x1="400" y1="300" x2="580" y2="200" stroke="#ec4899" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="580" cy="200" r="7" fill="#ec4899" />
        <text x="595" y="205" fill="#e2e8f0" fontSize="11">Nhật Bản</text>

        {/* Seoul */}
        <line x1="400" y1="300" x2="490" y2="190" stroke="#10b981" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="490" cy="190" r="7" fill="#10b981" />
        <text x="495" y="215" fill="#e2e8f0" fontSize="11">Hàn Quốc</text>

        {/* New Delhi */}
        <line x1="400" y1="300" x2="250" y2="330" stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="250" cy="330" r="7" fill="#f97316" />
        <text x="190" y="335" fill="#e2e8f0" fontSize="11">Ấn Độ</text>

        {/* Canberra */}
        <line x1="400" y1="300" x2="540" y2="440" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="540" cy="440" r="7" fill="#06b6d4" />
        <text x="555" y="445" fill="#e2e8f0" fontSize="11">Australia</text>

        {/* Paris */}
        <line x1="400" y1="300" x2="220" y2="220" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="220" cy="220" r="7" fill="#8b5cf6" />
        <text x="165" y="215" fill="#e2e8f0" fontSize="11">Pháp</text>

        {/* ASEAN Ring dots */}
        <g fill="#10b981" opacity="0.7">
          <circle cx="370" cy="370" r="5" />
          <circle cx="430" cy="380" r="5" />
          <circle cx="400" cy="400" r="5" />
        </g>
        <text x="400" y="420" textAnchor="middle" fill="#6ee7b7" fontSize="10" letterSpacing="1">
          TRỤ CỘT ASEAN
        </text>
      </svg>
    </div>
  );
};

/**
 * Photorealistic Waving National Flag of Vietnam
 * Recreated from archival silk photography with deep diagonal cloth ripples,
 * woven fabric grain, central golden five-pointed star and cinematic vignette.
 */
export const VietnamFlagArt: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#7f0d14] ${className}`}>
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full object-cover select-none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Base Silk Red Gradient */}
          <linearGradient id="baseRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#960d16" />
            <stop offset="35%" stopColor="#c1121f" />
            <stop offset="65%" stopColor="#b30e16" />
            <stop offset="100%" stopColor="#6e080f" />
          </linearGradient>

          {/* Fabric Weave Texture Filter */}
          <filter id="clothTexture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
            <feColorMatrix
              type="matrix"
              values="0.33 0 0 0 0
                      0 0.33 0 0 0
                      0 0 0.33 0 0
                      0 0 0 0.16 0"
            />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>

          {/* Golden Star Gradient */}
          <linearGradient id="goldStarGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#fff385" />
            <stop offset="25%" stopColor="#ffd214" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          {/* Star Subtle Inner Shadow / Ambient Depth */}
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#eab308" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>

          {/* Dramatic Vignette */}
          <radialGradient id="cinematicVignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="45%" stopColor="#000000" stopOpacity="0.15" />
            <stop offset="80%" stopColor="#000000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.82" />
          </radialGradient>

          {/* Diagonal Ripple Wave Highlights & Shadow Gradients */}
          <linearGradient id="waveLight1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#ff8080" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="waveShadow1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2b0205" stopOpacity="0" />
            <stop offset="50%" stopColor="#220003" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#300307" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="waveShadow2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#250003" stopOpacity="0" />
            <stop offset="50%" stopColor="#180002" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#250003" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base Crimson Red Flag Field */}
        <rect width="1920" height="1080" fill="url(#baseRedGrad)" />

        {/* 3D Diagonal Undulating Cloth Folds / Silk Waves (Under Star) */}
        <g opacity="0.95">
          {/* Deep Shadow Fold 1 (Top Left to Center Low) */}
          <path
            d="M-100,-100 Q450,280 820,720 Q1050,960 1350,1180 L1180,1180 Q920,950 680,680 Q320,260 -250,-100 Z"
            fill="url(#waveShadow1)"
          />

          {/* Bright Silk Highlight Crest 1 */}
          <path
            d="M-50,-120 Q520,260 920,680 Q1150,900 1480,1180 L1380,1180 Q1080,880 840,640 Q440,230 -150,-120 Z"
            fill="url(#waveLight1)"
          />

          {/* Deep Shadow Fold 2 (Across Upper Right to Center) */}
          <path
            d="M500,-100 Q950,220 1340,620 Q1600,880 2050,1150 L1950,1150 Q1500,850 1220,580 Q850,200 400,-100 Z"
            fill="url(#waveShadow2)"
          />

          {/* Bright Silk Highlight Crest 2 */}
          <path
            d="M620,-100 Q1060,200 1440,580 Q1700,840 2150,1120 L2050,1120 Q1620,820 1340,550 Q960,180 520,-100 Z"
            fill="url(#waveLight1)"
          />

          {/* Secondary Soft Ambient Wave Folds */}
          <path
            d="M1000,-100 Q1420,180 1780,540 Q1960,720 2200,900 L2100,900 Q1880,700 1680,510 Q1320,160 900,-100 Z"
            fill="url(#waveShadow1)"
            opacity="0.8"
          />
          <path
            d="M-200,300 Q180,620 540,940 Q750,1100 950,1180 L850,1180 Q660,1080 440,910 Q90,590 -280,300 Z"
            fill="url(#waveShadow2)"
            opacity="0.75"
          />
          <path
            d="M-150,280 Q240,590 600,910 Q810,1070 1020,1180 L940,1180 Q740,1060 520,880 Q160,560 -220,280 Z"
            fill="url(#waveLight1)"
            opacity="0.65"
          />
        </g>

        {/* Central Golden Star Area */}
        <g transform="translate(960, 540)">
          {/* Subtle Golden Ambient Halo Behind Star */}
          <circle cx="0" cy="0" r="320" fill="url(#starGlow)" />

          {/* Star Cast Shadow on Fabric Folds */}
          <polygon
            points="0,-236 53.9,-72.5 224,-72.5 85.5,27.8 138.2,190.2 0,89.8 -138.2,190.2 -85.5,27.8 -224,-72.5 -53.9,-72.5"
            fill="#280205"
            opacity="0.5"
            transform="translate(14, 18)"
          />

          {/* Golden Five-Pointed Star (Official Ratio: Outer Radius 240, Inner Radius 91.7) */}
          <polygon
            points="0,-240 53.9,-74.2 228.3,-74.2 87.2,28.3 141.1,194.2 0,91.7 -141.1,194.2 -87.2,28.3 -228.3,-74.2 -53.9,-74.2"
            fill="url(#goldStarGrad)"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Star Facet Shading & Specular Sheen (3D Relief Effect) */}
          {/* Top ray right shadow */}
          <polygon points="0,-240 0,0 53.9,-74.2" fill="#d97706" opacity="0.32" />
          {/* Upper-right ray bottom shadow */}
          <polygon points="228.3,-74.2 0,0 87.2,28.3" fill="#b45309" opacity="0.35" />
          {/* Bottom-right ray left shadow */}
          <polygon points="141.1,194.2 0,0 0,91.7" fill="#b45309" opacity="0.38" />
          {/* Bottom-left ray right shadow */}
          <polygon points="-141.1,194.2 0,0 -87.2,28.3" fill="#92400e" opacity="0.32" />
          {/* Upper-left ray bottom shadow */}
          <polygon points="-228.3,-74.2 0,0 -53.9,-74.2" fill="#d97706" opacity="0.3" />

          {/* Star Highlights on Opposite Facets */}
          <polygon points="0,-240 0,0 -53.9,-74.2" fill="#fff" opacity="0.22" />
          <polygon points="228.3,-74.2 0,0 53.9,-74.2" fill="#fff" opacity="0.25" />
          <polygon points="141.1,194.2 0,0 87.2,28.3" fill="#fff" opacity="0.18" />
        </g>

        {/* Ripple Wave Shadows Passing OVER the Star (Unified Fabric Wave Realism) */}
        <g opacity="0.75" style={{ mixBlendMode: 'multiply' }}>
          <path
            d="M300,-100 Q800,280 1200,680 Q1450,920 1850,1180 L1680,1180 Q1320,920 1050,680 Q650,280 150,-100 Z"
            fill="url(#waveShadow1)"
          />
        </g>
        <g opacity="0.45" style={{ mixBlendMode: 'soft-light' }}>
          <path
            d="M380,-100 Q880,260 1280,640 Q1520,880 1950,1180 L1850,1180 Q1440,880 1180,620 Q780,250 280,-100 Z"
            fill="url(#waveLight1)"
          />
        </g>

        {/* Tactile Woven Fabric / Canvas Grain Texture */}
        <rect
          width="1920"
          height="1080"
          fill="#fff"
          filter="url(#clothTexture)"
          opacity="0.14"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Cinematic Vignette Overlay (Darkening toward corners matching freepik image) */}
        <rect width="1920" height="1080" fill="url(#cinematicVignette)" />
      </svg>
    </div>
  );
};

