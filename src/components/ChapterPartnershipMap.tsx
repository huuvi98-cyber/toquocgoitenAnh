import React from 'react';
import { GlobalDiplomacyRadarArt } from './SVGArtwork';
import { Globe2, TrendingUp, Shield } from 'lucide-react';

export const ChapterPartnershipMap: React.FC = () => {
  return (
    <section id="mang-luoi" className="relative py-24 sm:py-32 bg-[#0c1219] text-stone-100 border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Mạng Lưới Đối Tác Chiến Lược Đỉnh Cao
          </h2>
        </div>

        {/* Global Network Radar Visual + Core Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-stone-800 bg-stone-900/60 p-2 shadow-2xl">
            <div className="h-80 sm:h-96 w-full">
              <GlobalDiplomacyRadarArt className="w-full h-full" />
            </div>
            <div className="p-4 text-center border-t border-stone-800/80 text-xs text-stone-400 font-mono">
              Sơ đồ định vị 8 Đối tác Chiến lược Toàn diện (CSP) & Mạng lưới đa phương quanh tâm điểm Việt Nam
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-stone-900/70 border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-950/70 text-red-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">5 Nước Thường Trực HĐBA</h4>
                  <p className="text-xs text-stone-400">Thiết lập quan hệ đặc biệt & đối tác cấp cao với cả 5 nước P5</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-900/70 border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-950/70 text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">16 Hiệp Định FTA Thế Hệ Mới</h4>
                  <p className="text-xs text-stone-400">Bao gồm CPTPP, EVFTA, RCEP với mức độ cam kết sâu rộng nhất</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-900/70 border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-sky-950/70 text-sky-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">Trọng Tâm Hiệp Hội ASEAN</h4>
                  <p className="text-xs text-stone-400">Phát huy vai trò trung tâm của ASEAN trong cấu trúc an ninh khu vực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
