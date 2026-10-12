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

      {/* 1. TOP BLOCK: Chữ "Chiến dịch tìm kiếm..." hiển thị 3 dòng trên di động */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none pt-2 sm:pt-4">
        <div className="inline-block">
          {/* Hiển thị trên di động: đúng 3 dòng theo yêu cầu, khoảng cách chữ bình thường (tracking-normal) */}
          <div className="block sm:hidden text-xs font-sans font-medium uppercase tracking-normal text-white/95 leading-relaxed">
            <p>Chiến dịch tìm kiếm, quy tập</p>
            <p className="mt-0.5">và xác định danh tính hài cốt liệt sĩ</p>
            <p className="mt-0.5 text-white/90">trên địa bàn TPHCM</p>
          </div>
          {/* Hiển thị trên màn hình lớn: khoảng cách chữ bình thường (tracking-normal) */}
          <div className="hidden sm:block text-sm md:text-base font-sans font-medium uppercase tracking-normal text-white/95 leading-relaxed">
            <p>Chiến dịch tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ</p>
            <p className="mt-0.5 text-white/90">trên địa bàn TPHCM</p>
          </div>
        </div>
      </div>

      {/* KHOẢNG TRỐNG TÔN VINH NGÔI SAO VÀNG NẰM DƯỚI ĐƯỜNG GẠCH NGANG & TRÊN CHỮ TỔ QUỐC */}
      <div className="flex-1 min-h-[12vh] sm:min-h-[22vh] pointer-events-none" />

      {/* 2. TITLE BLOCK: "Tổ quốc", "gọi tên", "Anh" - Mobile giữ nguyên đẹp mắt, PC nhỏ lại xíu theo yêu cầu */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none pt-2 sm:pt-4 pb-2">
        <h1 className="font-serif italic text-white tracking-tight select-none flex flex-col items-center">
          <span className="block text-6xl md:text-7xl lg:text-[5.25rem] font-black sm:font-bold leading-[0.88] drop-shadow-md">
            Tổ quốc
          </span>
          <span className="block text-3xl md:text-4xl lg:text-[2.6rem] font-medium text-white/95 leading-[0.9] mt-2.5 sm:mt-3 md:mt-3.5 -translate-x-10 sm:-translate-x-16 md:-translate-x-20">
            gọi tên
          </span>
          <div className="relative inline-flex items-center -mt-4 sm:-mt-6 md:-mt-7 translate-x-10 sm:translate-x-11 md:translate-x-12">
            <span className="block text-7xl md:text-8xl lg:text-[7.25rem] font-black text-white italic leading-[0.82] tracking-tighter drop-shadow-lg">
              Anh
            </span>
            {/* Nhành hoa cúc trắng hơi cong, nằm phía chân chữ Anh */}
            <div className="absolute -left-3 sm:-left-4 md:-left-5 -right-6 sm:-right-8 -bottom-2 sm:-bottom-3 md:-bottom-3.5 pointer-events-none">
              <WhiteChrysanthemumSprig className="w-full h-auto" />
            </div>
          </div>
        </h1>
      </div>

      {/* 3. POEM BLOCK: Bài thơ chữ nhỏ hơn 1 size */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 text-center pointer-events-none pt-6 sm:pt-8 pb-6 sm:pb-10">
        {/* Poetic Verse Stanza: Màu trắng, 1 co chữ, Tổ quốc không Cap, không bóng đổ */}
        <div className="text-white font-serif italic text-sm sm:text-base leading-relaxed space-y-1">
          <p className="tracking-wide">
            Thắp lên ngọn đuốc Hòa bình, bao người đã ngã
          </p>
          <p className="text-white/80 tracking-widest text-sm font-sans not-italic py-0.5">
            ...
          </p>
          <div className="space-y-0.5 text-white">
            <p>Tôi lắng nghe</p>
            <p>Tổ quốc</p>
            <p>gọi tên mình</p>
          </div>
          <div className="pt-3">
            <span className="inline-block text-[11px] sm:text-xs font-sans not-italic text-white/90 tracking-wide pt-1 px-3">
              — Trích <span className="italic font-serif">&ldquo;Tổ quốc gọi tên&rdquo;</span> · Nguyễn Phan Quế Mai —
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
