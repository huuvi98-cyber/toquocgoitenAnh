import React from 'react';

interface WhiteChrysanthemumSprigProps {
  className?: string;
}

export const WhiteChrysanthemumSprig: React.FC<WhiteChrysanthemumSprigProps> = ({
  className = 'w-full h-auto',
}) => {
  return (
    <svg
      viewBox="0 0 380 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nhành hoa cúc trắng tri ân nhỏ nhắn vắt qua chữ Anh"
    >
      <defs>
        {/* Soft petal gradients */}
        <linearGradient id="cucPetalMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>

        <linearGradient id="cucPetalBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Golden flower core gradient */}
        <radialGradient id="cucCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#EAB308" />
          <stop offset="85%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </radialGradient>

        {/* Stem gradient */}
        <linearGradient id="cucStemGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#365314" />
          <stop offset="40%" stopColor="#4D7C0F" />
          <stop offset="80%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#4D7C0F" />
        </linearGradient>

        {/* Leaf gradient */}
        <linearGradient id="cucLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="60%" stopColor="#4D7C0F" />
          <stop offset="100%" stopColor="#1E3A11" />
        </linearGradient>
      </defs>

      {/* 1. Slender Stem (Cành cúc mảnh mai uốn lượn) */}
      <path
        d="M 10 118 C 55 112, 115 95, 175 78 C 235 62, 285 46, 325 32"
        stroke="url(#cucStemGrad)"
        strokeWidth="2.0"
        strokeLinecap="round"
      />
      {/* Subtle thin highlight on stem */}
      <path
        d="M 12 117 C 55 111, 115 94, 175 77 C 235 61, 285 45, 323 32"
        stroke="#A3E635"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Branchlet to mid bloom */}
      <path
        d="M 165 80 C 180 76, 192 70, 204 60"
        stroke="url(#cucStemGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Branchlet to early bud */}
      <path
        d="M 90 98 C 102 94, 112 88, 118 78"
        stroke="url(#cucStemGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 2. Delicate Leaves along the stem (Lá cúc nhỏ nhắn mảnh mai) */}
      {/* Leaf 1 */}
      <path
        d="M 40 115 C 31 108, 30 98, 39 92 C 44 100, 46 109, 40 115 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.95"
      />
      {/* Leaf 2 */}
      <path
        d="M 72 103 C 77 112, 87 117, 97 115 C 90 108, 82 104, 72 103 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.9"
      />
      {/* Leaf 3 */}
      <path
        d="M 132 90 C 130 79, 137 72, 146 69 C 146 79, 141 87, 132 90 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.95"
      />
      {/* Leaf 4 */}
      <path
        d="M 245 58 C 247 47, 255 42, 265 40 C 263 50, 255 56, 245 58 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.95"
      />

      {/* 3. Small Bud at (118, 78) - Thu nhỏ lại */}
      <g transform="translate(118, 78) rotate(-10) scale(0.36)">
        <path d="M -6 10 C -1 0, 1 0, 6 10 Z" fill="#4D7C0F" />
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg, i) => (
          <ellipse
            key={`bud-pt-${i}`}
            cx={Math.cos((deg * Math.PI) / 180) * 8}
            cy={Math.sin((deg * Math.PI) / 180) * 8}
            rx="4"
            ry="9"
            transform={`rotate(${deg + 90} ${Math.cos((deg * Math.PI) / 180) * 8} ${Math.sin((deg * Math.PI) / 180) * 8})`}
            fill="url(#cucPetalBack)"
            stroke="#CBD5E1"
            strokeWidth="0.4"
          />
        ))}
        <circle cx="0" cy="0" r="6" fill="url(#cucCoreGrad)" />
      </g>

      {/* 4. Mid-Bloom at (204, 60) - Thu nhỏ lại thanh thoát */}
      <g transform="translate(204, 60) rotate(8) scale(0.44)">
        {/* Layer 1: Outer petals */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * 360) / 18;
          return (
            <path
              key={`mid-p1-${i}`}
              d="M -3 0 C -3.5 -12, -1.8 -22, 0 -25 C 1.8 -22, 3.5 -12, 3 0 Z"
              transform={`rotate(${angle}) translate(0, -12)`}
              fill="url(#cucPetalBack)"
              stroke="#E2E8F0"
              strokeWidth="0.4"
            />
          );
        })}
        {/* Layer 2: Inner petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16 + 11;
          return (
            <path
              key={`mid-p2-${i}`}
              d="M -2.8 0 C -3.2 -9, -1.5 -16, 0 -19 C 1.5 -16, 3.2 -9, 2.8 0 Z"
              transform={`rotate(${angle}) translate(0, -7)`}
              fill="url(#cucPetalMain)"
              stroke="#F1F5F9"
              strokeWidth="0.4"
            />
          );
        })}
        {/* Golden core */}
        <circle cx="0" cy="0" r="8.5" fill="url(#cucCoreGrad)" />
        <circle cx="0" cy="0" r="4.5" fill="#FEF08A" opacity="0.8" />
      </g>

      {/* 5. Main Full Bloom at (325, 32) - Thu nhỏ lại vừa vặn, tinh tế */}
      <g transform="translate(325, 32) rotate(-8) scale(0.58)">
        {/* Layer 1: Long outer radiating white petals */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <path
              key={`main-p1-${i}`}
              d="M -3.6 0 C -4 -15, -2.6 -28, 0 -32 C 2.6 -28, 4 -15, 3.6 0 Z"
              transform={`rotate(${angle}) translate(0, -16)`}
              fill="url(#cucPetalBack)"
              stroke="#E2E8F0"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Layer 2: Mid-tier radiating white petals */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i * 360) / 20 + 9;
          return (
            <path
              key={`main-p2-${i}`}
              d="M -3.6 0 C -4 -13, -2 -22, 0 -26 C 2 -22, 4 -13, 3.6 0 Z"
              transform={`rotate(${angle}) translate(0, -10)`}
              fill="url(#cucPetalMain)"
              stroke="#F1F5F9"
              strokeWidth="0.4"
            />
          );
        })}

        {/* Layer 3: Inner pristine white petals */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * 360) / 18 + 19;
          return (
            <path
              key={`main-p3-${i}`}
              d="M -3.2 0 C -3.6 -9, -1.8 -16, 0 -19 C 1.8 -16, 3.6 -9, 3.2 0 Z"
              transform={`rotate(${angle}) translate(0, -5)`}
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="0.4"
            />
          );
        })}

        {/* Flower Center: Golden-yellow disk */}
        <circle cx="0" cy="0" r="10.5" fill="url(#cucCoreGrad)" />
        <circle cx="0" cy="0" r="7.8" fill="none" stroke="#CA8A04" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <circle cx="0" cy="0" r="4.8" fill="none" stroke="#EAB308" strokeWidth="0.8" strokeDasharray="1.2 1.2" />
        <circle cx="0" cy="0" r="2.2" fill="#FEF08A" />
      </g>
    </svg>
  );
};
