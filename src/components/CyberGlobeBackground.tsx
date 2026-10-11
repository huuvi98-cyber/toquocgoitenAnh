import React from 'react';

interface CyberGlobeBackgroundProps {
  className?: string;
}

export const CyberGlobeBackground: React.FC<CyberGlobeBackgroundProps> = ({
  className = 'w-full h-full',
}) => {
  return (
    <div className={`relative overflow-hidden select-none bg-[#020b3b] ${className}`}>
      {/* Dynamic SVG recreating the Cyber Globe & Horizon Light Stage */}
      <svg
        viewBox="0 0 1000 562"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Space Atmosphere Gradient */}
          <linearGradient id="cyberSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#020826" />
            <stop offset="35%" stopColor="#021452" />
            <stop offset="65%" stopColor="#01389e" />
            <stop offset="72%" stopColor="#0072d6" />
            <stop offset="85%" stopColor="#011b66" />
            <stop offset="100%" stopColor="#010a26" />
          </linearGradient>

          {/* Central Horizon Radial Ambient Glow */}
          <radialGradient id="horizonAura" cx="50%" cy="72%" r="50%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#0088ff" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#022e9e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Horizon Flare Light Beam */}
          <linearGradient id="horizonFlare" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
            <stop offset="35%" stopColor="#00e5ff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#00e5ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>

          {/* Cyan Neon Glow Filters */}
          <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for the overhead globe sphere */}
          <clipPath id="overheadGlobeClip">
            <path d="M -50,-50 L 1050,-50 L 1050,40 Q 500,165 -50,40 Z" />
          </clipPath>

          {/* Line Gradients */}
          <linearGradient id="lineGradCenter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="1" />
            <stop offset="70%" stopColor="#0080ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0038b8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Base Sky and Space Atmosphere */}
        <rect width="1000" height="562" fill="url(#cyberSky)" />

        {/* 2. Central Horizon Ambient Glow */}
        <ellipse cx="500" cy="406" rx="420" ry="180" fill="url(#horizonAura)" />

        {/* 3. Overhead Curved Digital Globe Arch */}
        {/* Inside Sphere: Dotted Digital World Map Matrix */}
        <g clipPath="url(#overheadGlobeClip)">
          {/* Sphere Dark Interior */}
          <rect x="0" y="0" width="1000" height="200" fill="#03164d" opacity="0.6" />

          {/* Dotted Continental Matrix (Europe, Asia, Africa, Pacific) */}
          <g fill="#38bdf8" opacity="0.75">
            {/* Asia & East Asia Dot Cluster */}
            <circle cx="510" cy="40" r="2.2" /><circle cx="522" cy="38" r="2.4" /><circle cx="534" cy="42" r="2.2" />
            <circle cx="546" cy="35" r="2.6" /><circle cx="558" cy="37" r="2.4" /><circle cx="570" cy="40" r="2.2" />
            <circle cx="582" cy="44" r="2.4" /><circle cx="594" cy="40" r="2.6" /><circle cx="606" cy="48" r="2.2" />
            <circle cx="515" cy="52" r="2.4" /><circle cx="527" cy="50" r="2.6" /><circle cx="539" cy="54" r="2.2" />
            <circle cx="551" cy="49" r="2.8" /><circle cx="563" cy="51" r="2.5" /><circle cx="575" cy="55" r="2.3" />
            <circle cx="587" cy="58" r="2.6" /><circle cx="599" cy="53" r="2.4" /><circle cx="611" cy="62" r="2.2" />
            <circle cx="520" cy="65" r="2.5" /><circle cx="532" cy="63" r="2.7" /><circle cx="544" cy="68" r="2.4" />
            <circle cx="556" cy="64" r="2.6" /><circle cx="568" cy="66" r="2.3" /><circle cx="580" cy="70" r="2.5" />
            <circle cx="592" cy="67" r="2.2" /><circle cx="604" cy="72" r="2.4" /><circle cx="616" cy="76" r="2.2" />
            <circle cx="525" cy="78" r="2.3" /><circle cx="537" cy="76" r="2.5" /><circle cx="549" cy="80" r="2.2" />
            <circle cx="561" cy="77" r="2.4" /><circle cx="573" cy="81" r="2.2" /><circle cx="585" cy="83" r="2.4" />
            <circle cx="597" cy="80" r="2.2" /><circle cx="609" cy="85" r="2.3" />
            <circle cx="530" cy="91" r="2.2" /><circle cx="542" cy="89" r="2.4" /><circle cx="554" cy="93" r="2.2" />
            <circle cx="566" cy="90" r="2.5" /><circle cx="578" cy="94" r="2.2" /><circle cx="590" cy="96" r="2.3" />
            <circle cx="535" cy="104" r="2.1" /><circle cx="547" cy="102" r="2.3" /><circle cx="559" cy="106" r="2.2" />
            <circle cx="571" cy="103" r="2.4" /><circle cx="583" cy="107" r="2.2" />
            <circle cx="552" cy="115" r="2.2" /><circle cx="564" cy="113" r="2.3" /><circle cx="576" cy="117" r="2.1" />

            {/* Central Eurasia / Middle East */}
            <circle cx="430" cy="50" r="2.3" /><circle cx="442" cy="48" r="2.5" /><circle cx="454" cy="52" r="2.2" />
            <circle cx="466" cy="49" r="2.6" /><circle cx="478" cy="51" r="2.4" /><circle cx="490" cy="55" r="2.2" />
            <circle cx="435" cy="62" r="2.4" /><circle cx="447" cy="60" r="2.6" /><circle cx="459" cy="64" r="2.3" />
            <circle cx="471" cy="61" r="2.7" /><circle cx="483" cy="63" r="2.4" /><circle cx="495" cy="67" r="2.2" />
            <circle cx="440" cy="75" r="2.2" /><circle cx="452" cy="73" r="2.5" /><circle cx="464" cy="77" r="2.3" />
            <circle cx="476" cy="74" r="2.4" /><circle cx="488" cy="76" r="2.2" />
            <circle cx="445" cy="88" r="2.4" /><circle cx="457" cy="86" r="2.2" /><circle cx="469" cy="90" r="2.3" />
            <circle cx="481" cy="87" r="2.2" />
            <circle cx="450" cy="100" r="2.2" /><circle cx="462" cy="98" r="2.3" /><circle cx="474" cy="102" r="2.1" />

            {/* Europe & North Eurasia Dot Cluster */}
            <circle cx="210" cy="30" r="2.2" /><circle cx="222" cy="28" r="2.4" /><circle cx="234" cy="32" r="2.2" />
            <circle cx="246" cy="27" r="2.5" /><circle cx="258" cy="29" r="2.3" /><circle cx="270" cy="33" r="2.2" />
            <circle cx="282" cy="35" r="2.4" /><circle cx="294" cy="31" r="2.6" /><circle cx="306" cy="37" r="2.2" />
            <circle cx="318" cy="34" r="2.4" /><circle cx="330" cy="38" r="2.2" /><circle cx="342" cy="35" r="2.5" />
            <circle cx="215" cy="42" r="2.3" /><circle cx="227" cy="40" r="2.6" /><circle cx="239" cy="44" r="2.2" />
            <circle cx="251" cy="39" r="2.7" /><circle cx="263" cy="41" r="2.4" /><circle cx="275" cy="45" r="2.2" />
            <circle cx="287" cy="47" r="2.4" /><circle cx="299" cy="43" r="2.6" /><circle cx="311" cy="49" r="2.3" />
            <circle cx="323" cy="46" r="2.5" /><circle cx="335" cy="50" r="2.2" /><circle cx="347" cy="47" r="2.4" />
            <circle cx="220" cy="55" r="2.2" /><circle cx="232" cy="53" r="2.4" /><circle cx="244" cy="57" r="2.2" />
            <circle cx="256" cy="52" r="2.5" /><circle cx="268" cy="54" r="2.3" /><circle cx="280" cy="58" r="2.2" />
            <circle cx="292" cy="60" r="2.4" /><circle cx="304" cy="56" r="2.5" /><circle cx="316" cy="62" r="2.2" />
            <circle cx="225" cy="68" r="2.4" /><circle cx="237" cy="66" r="2.2" /><circle cx="249" cy="70" r="2.3" />
            <circle cx="261" cy="65" r="2.5" /><circle cx="273" cy="67" r="2.2" /><circle cx="285" cy="71" r="2.3" />

            {/* Africa Dot Cluster */}
            <circle cx="240" cy="80" r="2.3" /><circle cx="252" cy="78" r="2.5" /><circle cx="264" cy="82" r="2.2" />
            <circle cx="276" cy="79" r="2.4" /><circle cx="288" cy="81" r="2.2" /><circle cx="300" cy="85" r="2.3" />
            <circle cx="245" cy="92" r="2.2" /><circle cx="257" cy="90" r="2.4" /><circle cx="269" cy="94" r="2.2" />
            <circle cx="281" cy="91" r="2.5" /><circle cx="293" cy="93" r="2.3" />
            <circle cx="250" cy="105" r="2.1" /><circle cx="262" cy="103" r="2.3" /><circle cx="274" cy="107" r="2.2" />
            <circle cx="286" cy="104" r="2.4" />

            {/* Americas / Pacific Islands Far East Cluster */}
            <circle cx="700" cy="20" r="2.3" /><circle cx="712" cy="18" r="2.5" /><circle cx="724" cy="22" r="2.2" />
            <circle cx="736" cy="19" r="2.6" /><circle cx="748" cy="21" r="2.4" /><circle cx="760" cy="25" r="2.2" />
            <circle cx="772" cy="27" r="2.4" /><circle cx="784" cy="23" r="2.6" /><circle cx="796" cy="29" r="2.2" />
            <circle cx="705" cy="32" r="2.4" /><circle cx="717" cy="30" r="2.6" /><circle cx="729" cy="34" r="2.3" />
            <circle cx="741" cy="31" r="2.7" /><circle cx="753" cy="33" r="2.4" /><circle cx="765" cy="37" r="2.2" />
            <circle cx="777" cy="39" r="2.4" /><circle cx="789" cy="35" r="2.5" /><circle cx="801" cy="41" r="2.2" />
            <circle cx="813" cy="38" r="2.4" /><circle cx="825" cy="42" r="2.2" /><circle cx="837" cy="39" r="2.5" />
            <circle cx="710" cy="45" r="2.2" /><circle cx="722" cy="43" r="2.5" /><circle cx="734" cy="47" r="2.2" />
            <circle cx="746" cy="44" r="2.4" /><circle cx="758" cy="46" r="2.3" /><circle cx="770" cy="50" r="2.2" />
            <circle cx="782" cy="52" r="2.4" /><circle cx="794" cy="48" r="2.5" /><circle cx="806" cy="54" r="2.2" />
            <circle cx="850" cy="15" r="2.3" /><circle cx="862" cy="13" r="2.5" /><circle cx="874" cy="17" r="2.2" />
            <circle cx="886" cy="14" r="2.6" /><circle cx="898" cy="16" r="2.4" /><circle cx="910" cy="20" r="2.2" />
            <circle cx="922" cy="22" r="2.4" /><circle cx="934" cy="18" r="2.6" />
          </g>
        </g>

        {/* 4. Glowing Cyan Globe Horizon Rim Arc */}
        {/* Outer Soft Cyan Glow Arc */}
        <path
          d="M -50,40 Q 500,165 1050,40"
          fill="none"
          stroke="#00b4d8"
          strokeWidth="14"
          opacity="0.35"
          filter="url(#cyanGlow)"
        />
        {/* Core Electric Cyan Arc Line */}
        <path
          d="M -50,40 Q 500,165 1050,40"
          fill="none"
          stroke="#00e5ff"
          strokeWidth="4"
          filter="url(#cyanGlow)"
        />
        {/* Ultra-Bright White Arc Highlight */}
        <path
          d="M 120,64 Q 500,163 880,64"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* 5. Horizon Light Bar Burst */}
        <ellipse cx="500" cy="406" rx="460" ry="12" fill="url(#horizonFlare)" />
        <ellipse cx="500" cy="406" rx="200" ry="4.5" fill="#ffffff" opacity="0.95" />

        {/* 6. Cyberspace Floor Perspective Laser Lines & Network Nodes */}
        <g>
          {/* Magenta/Violet Side Lines (Left Outer Edge) */}
          <line x1="20" y1="562" x2="330" y2="406" stroke="url(#lineGradLeft)" strokeWidth="1.8" />
          <line x1="70" y1="562" x2="350" y2="406" stroke="url(#lineGradLeft)" strokeWidth="1.8" />
          <line x1="120" y1="562" x2="370" y2="406" stroke="url(#lineGradLeft)" strokeWidth="1.8" />

          {/* Electric Blue / Cyan Left Quadrant */}
          <line x1="180" y1="562" x2="390" y2="406" stroke="url(#lineGradCenter)" strokeWidth="1.9" />
          <line x1="230" y1="562" x2="408" y2="406" stroke="url(#lineGradCenter)" strokeWidth="1.9" />
          <line x1="280" y1="562" x2="424" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.0" />
          <line x1="330" y1="562" x2="438" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.0" />
          <line x1="380" y1="562" x2="452" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.1" />
          <line x1="430" y1="562" x2="466" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.2" />

          {/* Core Converging Bright Cyan / White Perspective Lines */}
          <line x1="470" y1="562" x2="480" y2="406" stroke="#00f5ff" strokeWidth="2.4" />
          <line x1="500" y1="562" x2="500" y2="406" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="530" y1="562" x2="520" y2="406" stroke="#00f5ff" strokeWidth="2.4" />

          {/* Electric Blue / Cyan Right Quadrant */}
          <line x1="570" y1="562" x2="534" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.2" />
          <line x1="620" y1="562" x2="548" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.1" />
          <line x1="670" y1="562" x2="562" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.0" />
          <line x1="720" y1="562" x2="576" y2="406" stroke="url(#lineGradCenter)" strokeWidth="2.0" />
          <line x1="770" y1="562" x2="592" y2="406" stroke="url(#lineGradCenter)" strokeWidth="1.9" />
          <line x1="820" y1="562" x2="610" y2="406" stroke="url(#lineGradCenter)" strokeWidth="1.9" />

          {/* Magenta/Violet Side Lines (Right Outer Edge) */}
          <line x1="880" y1="562" x2="630" y2="406" stroke="url(#lineGradRight)" strokeWidth="1.8" />
          <line x1="930" y1="562" x2="650" y2="406" stroke="url(#lineGradRight)" strokeWidth="1.8" />
          <line x1="980" y1="562" x2="670" y2="406" stroke="url(#lineGradRight)" strokeWidth="1.8" />

          {/* Horizontal Transverse Grid Lines for 3D Perspective Depth */}
          <path d="M 120,530 L 880,530" stroke="#00d0ff" strokeWidth="1" opacity="0.25" />
          <path d="M 230,480 L 770,480" stroke="#00d0ff" strokeWidth="1" opacity="0.3" />
          <path d="M 320,445 L 680,445" stroke="#00d0ff" strokeWidth="1" opacity="0.35" />
          <path d="M 370,425 L 630,425" stroke="#00d0ff" strokeWidth="1" opacity="0.4" />

          {/* Glowing Connection Nodes along the Horizon */}
          <g filter="url(#nodeGlow)">
            <circle cx="330" cy="406" r="3" fill="#a855f7" />
            <circle cx="350" cy="406" r="3.2" fill="#818cf8" />
            <circle cx="370" cy="406" r="3.5" fill="#38bdf8" />
            <circle cx="390" cy="406" r="3.8" fill="#00e5ff" />
            <circle cx="408" cy="406" r="4.0" fill="#00f5ff" />
            <circle cx="424" cy="406" r="4.2" fill="#ffffff" />
            <circle cx="438" cy="406" r="4.4" fill="#ffffff" />
            <circle cx="452" cy="406" r="4.6" fill="#ffffff" />
            <circle cx="466" cy="406" r="4.8" fill="#ffffff" />
            <circle cx="480" cy="406" r="5.2" fill="#ffffff" />
            <circle cx="500" cy="406" r="5.5" fill="#ffffff" />
            <circle cx="520" cy="406" r="5.2" fill="#ffffff" />
            <circle cx="534" cy="406" r="4.8" fill="#ffffff" />
            <circle cx="548" cy="406" r="4.6" fill="#ffffff" />
            <circle cx="562" cy="406" r="4.4" fill="#ffffff" />
            <circle cx="576" cy="406" r="4.2" fill="#ffffff" />
            <circle cx="592" cy="406" r="4.0" fill="#00f5ff" />
            <circle cx="610" cy="406" r="3.8" fill="#00e5ff" />
            <circle cx="630" cy="406" r="3.5" fill="#38bdf8" />
            <circle cx="650" cy="406" r="3.2" fill="#c084fc" />
            <circle cx="670" cy="406" r="3" fill="#d946ef" />
          </g>

          {/* Floating Data Particles in Cyber Horizon */}
          <circle cx="460" cy="380" r="1.8" fill="#ffffff" opacity="0.8" />
          <circle cx="540" cy="384" r="2.0" fill="#ffffff" opacity="0.85" />
          <circle cx="410" cy="390" r="1.6" fill="#00e5ff" opacity="0.75" />
          <circle cx="590" cy="392" r="1.6" fill="#00e5ff" opacity="0.75" />
          <circle cx="485" cy="365" r="1.5" fill="#38bdf8" opacity="0.6" />
          <circle cx="515" cy="368" r="1.5" fill="#38bdf8" opacity="0.6" />
          <circle cx="370" cy="398" r="1.4" fill="#a855f7" opacity="0.7" />
          <circle cx="630" cy="398" r="1.4" fill="#c084fc" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};
