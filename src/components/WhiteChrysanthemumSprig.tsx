import React from 'react';

interface WhiteChrysanthemumSprigProps {
  className?: string;
}

export const WhiteChrysanthemumSprig: React.FC<WhiteChrysanthemumSprigProps> = ({
  className = 'w-full h-auto',
}) => {
  return (
    <svg
      viewBox="0 0 280 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nhành hoa cúc trắng hơi cong nằm phía chân chữ Anh"
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
        <linearGradient id="cucStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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

      {/* 1. Gently Curved Stem (Cành cúc hơi cong nhẹ nhàng chạy ngang chân chữ) */}
      <path
        d="M 12 34 C 75 47, 155 48, 222 36 C 242 32, 256 25, 268 18"
        stroke="url(#cucStemGrad)"
        strokeWidth="2.0"
        strokeLinecap="round"
      />
      {/* Delicate thin highlight along curved stem */}
      <path
        d="M 14 33 C 75 46, 155 47, 220 35"
        stroke="#BEF264"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Small side twig to bud */}
      <path
        d="M 175 42 C 185 45, 194 43, 202 36"
        stroke="url(#cucStemGrad)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* 2. Leaves along curved stem (Lá cúc nhỏ nhắn) */}
      {/* Leaf 1 - Left */}
      <path
        d="M 55 41 C 45 46, 42 54, 52 57 C 58 52, 60 45, 55 41 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.95"
      />
      {/* Leaf 2 - Mid */}
      <path
        d="M 115 47 C 122 55, 132 58, 140 55 C 135 48, 126 45, 115 47 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.9"
      />
      {/* Leaf 3 - Near flower */}
      <path
        d="M 215 38 C 220 46, 228 48, 236 45 C 232 40, 225 36, 215 38 Z"
        fill="url(#cucLeafGrad)"
        opacity="0.95"
      />

      {/* 3. Small Bud at (202, 36) (Nụ cúc e ấp) */}
      <g transform="translate(202, 36) rotate(15) scale(0.35)">
        <path d="M -6 10 C -1 0, 1 0, 6 10 Z" fill="#4D7C0F" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
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

      {/* 4. Delicate Small White Chrysanthemum Flower at (242, 28) */}
      <g transform="translate(242, 28) rotate(-6) scale(0.52)">
        {/* Layer 1: Long outer radiating white petals */}
        {Array.from({ length: 22 }).map((_, i) => {
          const angle = (i * 360) / 22;
          return (
            <path
              key={`flower-p1-${i}`}
              d="M -3 0 C -3.5 -13, -2 -24, 0 -27 C 2 -24, 3.5 -13, 3 0 Z"
              transform={`rotate(${angle}) translate(0, -13)`}
              fill="url(#cucPetalBack)"
              stroke="#E2E8F0"
              strokeWidth="0.4"
            />
          );
        })}

        {/* Layer 2: Mid-tier radiating white petals */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * 360) / 18 + 10;
          return (
            <path
              key={`flower-p2-${i}`}
              d="M -2.8 0 C -3.2 -11, -1.8 -19, 0 -22 C 1.8 -19, 3.2 -11, 2.8 0 Z"
              transform={`rotate(${angle}) translate(0, -9)`}
              fill="url(#cucPetalMain)"
              stroke="#F1F5F9"
              strokeWidth="0.35"
            />
          );
        })}

        {/* Layer 3: Inner pristine white petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16 + 21;
          return (
            <path
              key={`flower-p3-${i}`}
              d="M -2.5 0 C -2.8 -7, -1.5 -13, 0 -15 C 1.5 -13, 2.8 -7, 2.5 0 Z"
              transform={`rotate(${angle}) translate(0, -5)`}
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="0.3"
            />
          );
        })}

        {/* Flower Center: Golden-yellow disk */}
        <circle cx="0" cy="0" r="9.5" fill="url(#cucCoreGrad)" />
        <circle cx="0" cy="0" r="7" fill="none" stroke="#CA8A04" strokeWidth="0.7" strokeDasharray="1.2 1.2" />
        <circle cx="0" cy="0" r="4" fill="none" stroke="#EAB308" strokeWidth="0.6" strokeDasharray="1 1" />
        <circle cx="0" cy="0" r="2" fill="#FEF08A" />
      </g>
    </svg>
  );
};
