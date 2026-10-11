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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Hoạt động tìm kiếm
            <span className="block mt-1 sm:mt-2">tại Công viên Lê Thị Riêng</span>
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
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-white border-red-700 shadow-md ring-1 ring-red-700/20 translate-x-1'
                        : 'bg-white/80 hover:bg-white border-stone-200/80 hover:border-red-200 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {/* Thumbnail hình ảnh từ Báo Sài Gòn Giải Phóng */}
                      {milestone.imageUrl && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white relative group">
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        {/* Số mốc thời gian to hơn, màu đỏ, font chữ chân phương (font-sans) không số 0 ở trước */}
                        <div className="mb-1">
                          <span className="font-sans text-base sm:text-lg font-bold text-red-700 tabular-nums tracking-tight">
                            {cleanLeadingZeros(milestone.year)}
                          </span>
                        </div>

                        <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1 leading-snug">
                          {milestone.title}
                        </h4>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                          {milestone.summary}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 mt-2 shrink-0 transition-transform ${
                          isSelected ? 'text-red-700 translate-x-0.5' : 'text-stone-300'
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
            {/* Visual Photo Header: Nền hiển thị bên phải màu trắng theo yêu cầu */}
            <div className="relative w-full bg-white overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[360px] md:min-h-[420px] p-4 sm:p-6 border-b border-stone-200/80">
              {selectedMilestone.imageUrl ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Giữ nguyên toàn bộ khung hình ảnh tư liệu trên nền trắng */}
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

              {/* Dignified Date Badge: Nền trắng viền đỏ, số mốc thời gian màu đỏ to hơn, font chân phương */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                <div className="bg-white/95 backdrop-blur-md border border-red-200 text-red-700 px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shrink-0" />
                  <span className="font-sans text-base sm:text-lg font-bold text-red-700 tabular-nums tracking-tight">
                    {cleanLeadingZeros(selectedMilestone.year)}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo Caption & Source Attribution Bar: Chuẩn báo chí (font mảnh, không bo nền) */}
            {(selectedMilestone.imageCaption || selectedMilestone.imageSource) && (
              <div className="px-5 sm:px-6 py-2.5 border-b border-stone-100 bg-white text-xs sm:text-sm text-stone-700 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                {selectedMilestone.imageCaption && (
                  <div className="flex items-start gap-2 italic leading-relaxed text-stone-700">
                    <Camera className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{selectedMilestone.imageCaption}</span>
                  </div>
                )}
                {selectedMilestone.imageSource && (
                  <span className="font-light text-stone-500 text-xs shrink-0 self-start sm:self-auto not-italic">
                    {selectedMilestone.imageSource}
                  </span>
                )}
              </div>
            )}

            {/* Dossier Content Body */}
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1 leading-snug">
                {selectedMilestone.title}
              </h3>
              <p className="text-sm font-medium text-amber-800 mb-6">
                {selectedMilestone.subtitle}
              </p>

              <div className="text-sm sm:text-base leading-relaxed text-stone-700 space-y-4 text-justify">
                <p>{selectedMilestone.details}</p>
              </div>

              {/* Quote if available */}
              {selectedMilestone.quote && (
                <div className="my-6 p-4 rounded-xl bg-amber-50/70 border-l-4 border-amber-800 text-stone-800">
                  <div className="flex gap-2">
                    <Quote className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif italic text-sm text-stone-800 leading-snug">
                        &ldquo;{selectedMilestone.quote.text}&rdquo;
                      </p>
                      <p className="text-xs font-semibold text-amber-900 mt-2">
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
