import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/diplomacyData';
import { TimelineMilestone } from '../types/diplomacy';
import { ChevronRight, Quote, Camera } from 'lucide-react';
import { CyberGlobeBackground } from './CyberGlobeBackground';

// Helper để bảo đảm các con số không có số 0 ở trước (ví dụ 08 -> 8, 06 -> 6)
const cleanLeadingZeros = (val: string): string => {
  if (!val) return '';
  return val.replace(/\b0+(\d+)/g, '$1');
};

export const ChapterTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(TIMELINE_MILESTONES[0]);

  const filteredMilestones = TIMELINE_MILESTONES;

  return (
    <section id="moc-son" className="relative py-24 sm:py-32 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Hoạt động tìm kiếm
            <span className="block mt-1 sm:mt-2 text-red-900">tại Công viên Lê Thị Riêng</span>
          </h2>
        </div>

        {/* Two-Column Layout: Left Timeline Rail / Right Detailed Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Rail (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="max-h-[680px] overflow-y-auto pr-2 space-y-3 scrollbar-thin">
              {filteredMilestones.map((milestone) => {
                const isSelected = selectedMilestone.id === milestone.id;
                return (
                  <button
                    key={milestone.id}
                    onClick={() => setSelectedMilestone(milestone)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer border group ${
                      isSelected
                        ? 'bg-white border-l-4 border-l-red-700 border-stone-200 shadow-md ring-1 ring-red-700/20 translate-x-1'
                        : 'bg-white/85 hover:bg-white border-stone-200/90 hover:border-red-200 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {/* Thumbnail hình ảnh từ Báo Sài Gòn Giải Phóng */}
                      {milestone.imageUrl && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white relative">
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        {/* Số mốc thời gian nổi bật */}
                        <div className="mb-1.5 flex items-center">
                          <span
                            className={`inline-flex items-center font-sans text-xs sm:text-sm font-extrabold tabular-nums tracking-tight px-2.5 py-0.5 rounded-md transition-colors ${
                              isSelected
                                ? 'bg-red-700 text-white shadow-xs'
                                : 'bg-red-50 text-red-700 border border-red-100 group-hover:bg-red-100/80'
                            }`}
                          >
                            {cleanLeadingZeros(milestone.year)}
                          </span>
                        </div>

                        {/* Tiêu đề hiển thị đầy đủ trọn vẹn (không bị cắt bớt bằng line-clamp) */}
                        <h4
                          className={`font-serif text-sm sm:text-[15px] leading-snug transition-colors ${
                            isSelected
                              ? 'font-bold text-red-950'
                              : 'font-semibold text-stone-900 group-hover:text-red-800'
                          }`}
                        >
                          {milestone.title}
                        </h4>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 self-center shrink-0 transition-transform ${
                          isSelected ? 'text-red-700 translate-x-0.5' : 'text-stone-300 group-hover:text-stone-400'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Milestone Dossier (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            {/* Visual Photo Header: Nền hiển thị bên phải màu trắng */}
            <div className="relative w-full bg-white overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[360px] md:min-h-[420px] p-4 sm:p-6 border-b border-stone-200/80">
              {selectedMilestone.imageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedMilestone.imageUrl}
                    alt={selectedMilestone.title}
                    className="relative z-10 max-h-[460px] w-auto max-w-full object-contain mx-auto rounded-lg shadow-sm border border-stone-200/80 transition-transform duration-500"
                  />
                </div>
              ) : (
                <>
                  <CyberGlobeBackground className="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
                </>
              )}

              {/* Dignified Date Badge: Nổi bật điểm nhấn mốc thời gian */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                <div className="bg-white/95 backdrop-blur-md border border-red-200/90 text-red-700 px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0 ring-4 ring-red-100" />
                  <span className="font-sans text-base sm:text-lg font-black text-red-700 tabular-nums tracking-tight">
                    {cleanLeadingZeros(selectedMilestone.year)}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Caption & Source Attribution Bar - Chú thích ảnh font không chân (font-sans) */}
            {(selectedMilestone.imageCaption || selectedMilestone.imageSource) && (
              <div className="px-5 sm:px-6 py-2.5 border-b border-stone-100 bg-stone-50/50 text-xs sm:text-sm text-stone-700 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                {selectedMilestone.imageCaption && (
                  <div className="flex items-start gap-2 italic leading-relaxed text-stone-700 font-sans">
                    <Camera className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5 not-italic" />
                    <span>{selectedMilestone.imageCaption}</span>
                  </div>
                )}
                {selectedMilestone.imageSource && (
                  <span className="font-sans font-medium text-stone-500 text-xs shrink-0 self-start sm:self-auto not-italic tracking-wide">
                    {selectedMilestone.imageSource}
                  </span>
                )}
              </div>
            )}

            {/* Dossier Content Body */}
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-stone-950 mb-2 leading-snug tracking-tight">
                {selectedMilestone.title}
              </h3>

              {selectedMilestone.subtitle && (
                <p className="text-sm sm:text-base font-serif italic text-red-900/90 mb-5 pb-4 border-b border-stone-200/80 leading-relaxed">
                  {selectedMilestone.subtitle}
                </p>
              )}

              {/* Chi tiết nội dung - Bỏ, không dùng dropcap */}
              <div className="text-sm sm:text-base leading-relaxed sm:leading-loose text-stone-800 space-y-4 text-justify font-sans">
                <p>
                  {selectedMilestone.details}
                </p>
              </div>

              {/* Quote if available */}
              {selectedMilestone.quote && (
                <div className="my-6 p-5 rounded-xl bg-amber-50/80 border-l-4 border-red-700 text-stone-800 shadow-xs">
                  <div className="flex gap-3">
                    <Quote className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif italic text-sm sm:text-base text-stone-900 leading-relaxed">
                        &ldquo;{selectedMilestone.quote.text}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-red-900 mt-2.5 uppercase tracking-wide font-sans">
                        — {selectedMilestone.quote.author}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
