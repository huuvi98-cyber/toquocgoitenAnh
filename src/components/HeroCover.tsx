import React from 'react';
import { AnimatedVietnamFlag } from './AnimatedVietnamFlag';
import { WhiteChrysanthemumSprig } from './WhiteChrysanthemumSprig';

interface HeroCoverProps {
  onScrollToContent?: () => void;
}

export const HeroCover: React.FC<HeroCoverProps> = () => {
  return (
    <section id="top" className="relative min-h-[110vh] sm:min-h-[115vh] flex flex-col justify-between overflow-hidden select-none py-6 sm:py-10">
      {/* Dynamic Animated Waving Vietnam Flag Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedVietnamFlag className="w-full h-full" />
        {/* Scrim: gentle atmospheric framing, keeps center star brilliant */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/35 pointer-events-none" />
      </div>

      {/* 1. TOP BLOCK: Chữ "Chiến dịch tìm kiếm..." ngắt 2 dòng lên trên cùng */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none pt-2 sm:pt-4">
        <div className="inline-block">
          <p className="text-xs sm:text-sm md:text-base font-sans font-medium uppercase tracking-widest text-white/95 leading-relaxed">
            Chiến dịch tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ
          </p>
          <p className="text-xs sm:text-sm md:text-base font-sans font-medium uppercase tracking-widest text-white/90 leading-relaxed mt-0.5">
            trên địa bàn TPHCM
          </p>
        </div>
      </div>

      {/* KHOẢNG TRỐNG TÔN VINH NGÔI SAO VÀNG NẰM DƯỚI ĐƯỜNG GẠCH NGANG & TRÊN CHỮ TỔ QUỐC */}
      <div className="flex-1 min-h-[22vh] sm:min-h-[28vh] pointer-events-none" />

      {/* 2. TITLE BLOCK: "Tổ quốc", "gọi tên", "Anh" - Khoảng cách dòng gần lại */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none pt-2 sm:pt-4 pb-2">
        <h1 className="font-serif italic text-white tracking-tight select-none flex flex-col items-center">
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92]">
            Tổ quốc
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 leading-[0.92] mt-2 sm:mt-3.5 -translate-x-12 sm:-translate-x-20 md:-translate-x-28">
            gọi tên
          </span>
          <div className="relative inline-flex items-center -mt-3.5 sm:-mt-6 md:-mt-8 translate-x-4 sm:translate-x-8 md:translate-x-12">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white not-italic sm:italic leading-[0.88]">
              Anh
            </span>
            {/* Nhành hoa cúc trắng tri ân nhỏ lại, vắt qua chữ Anh */}
            <div className="absolute -left-3 sm:-left-5 md:-left-8 -right-6 sm:-right-10 md:-right-14 -bottom-1 sm:-bottom-2 md:-bottom-3 pointer-events-none">
              <WhiteChrysanthemumSprig className="w-full h-auto" />
            </div>
          </div>
        </h1>
      </div>

      {/* 3. POEM BLOCK: Bài thơ chữ nhỏ hơn 1 size */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center pointer-events-none pt-6 sm:pt-8 pb-6 sm:pb-10">
        {/* Poetic Verse Stanza: Màu trắng, nhỏ hơn 1 size (text-sm sm:text-base), Tổ quốc không Cap, không bóng đổ */}
        <div className="text-white font-serif italic text-sm sm:text-base leading-relaxed space-y-1.5">
          <p className="tracking-wide">
            Thắp lên ngọn đuốc Hòa bình, bao người đã ngã
          </p>
          <p className="text-white/70 tracking-widest text-xs font-sans not-italic py-0.5">
            ······
          </p>
          <p className="tracking-wide">
            Ngọn đuốc Hòa bình trên tay rực lửa
          </p>
          <div className="pt-1 space-y-0.5 text-white">
            <p>Tôi lắng nghe</p>
            <p className="font-medium">Tổ quốc</p>
            <p>gọi tên mình</p>
          </div>
          <div className="pt-3">
            <span className="inline-block text-[11px] sm:text-xs font-sans not-italic text-white/90 tracking-wide border-t border-white/25 pt-2 px-3">
              — Trích <span className="italic font-serif">&ldquo;Tổ quốc gọi tên&rdquo;</span> · Nguyễn Phan Quế Mai —
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
