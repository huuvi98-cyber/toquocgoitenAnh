import React, { useState } from 'react';
import { MULTILATERAL_PILLARS } from '../data/diplomacyData';
import { HeartHandshake, Leaf, ShieldAlert, Cpu, ArrowUpRight } from 'lucide-react';

export const ChapterMultilateral: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = MULTILATERAL_PILLARS[activeTab];

  const icons = [
    <ShieldAlert key="0" className="w-5 h-5 text-blue-700" />,
    <Leaf key="1" className="w-5 h-5 text-emerald-700" />,
    <HeartHandshake key="2" className="w-5 h-5 text-amber-700" />,
    <Cpu key="3" className="w-5 h-5 text-indigo-700" />,
  ];

  return (
    <section id="da-phuong" className="relative py-24 sm:py-32 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            Trách Nhiệm Vì Hòa Bình & Nhân Loại
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Không chỉ bảo vệ lợi ích quốc gia, ngoại giao Việt Nam ngày nay chủ động đóng góp tích cực vào các vấn đề chung của khu vực và thế giới: gìn giữ hòa bình, biến đổi khí hậu và ngoại giao công nghệ.
          </p>
        </div>

        {/* 4 Feature Tabs Segmented Control */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {MULTILATERAL_PILLARS.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-white border-amber-800 shadow-md ring-1 ring-amber-800/20'
                    : 'bg-stone-100 hover:bg-stone-200/80 border-stone-200 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                    {icons[idx]}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-amber-800">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-stone-900 line-clamp-1">
                  {item.title}
                </h4>
                <span className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                  {item.stat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Tab Feature Showcase */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="lg:w-7/12">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-mono font-semibold">
                Trụ Cột Đa Phương Nổi Bật
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1 mb-2">
                {current.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-amber-900 mb-6">
                {current.subtitle}
              </p>

              <div className="text-stone-700 text-sm sm:text-base leading-relaxed text-justify space-y-4">
                <p>{current.content}</p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-700" />
                  <span>{current.badge}</span>
                </div>
              </div>
            </div>

            <div className="lg:w-5/12 w-full bg-stone-50 rounded-xl p-6 border border-stone-100 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 font-mono block mb-1">
                  Chỉ Số Dấu Ấn
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
                  {current.stat}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Được các tổ chức quốc tế và đối tác song phương ghi nhận, khẳng định tinh thần <em>"Việt Nam là thành viên tích cực, có trách nhiệm của cộng đồng quốc tế"</em>.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200/80 text-xs text-stone-500 italic">
                Nguồn: Báo cáo Thường niên Bộ Ngoại Giao & Phái đoàn Thường trực VN tại LHQ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
