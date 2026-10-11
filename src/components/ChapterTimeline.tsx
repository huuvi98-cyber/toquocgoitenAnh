import React, { useState } from 'react';
import { TIMELINE_MILESTONES } from '../data/diplomacyData';
import { TimelineMilestone } from '../types/diplomacy';
import { ChevronRight, Quote, Camera } from 'lucide-react';
import { CyberGlobeBackground } from './CyberGlobeBackground';

export const ChapterTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone>(TIMELINE_MILESTONES[0]);

  const filteredMilestones = TIMELINE_MILESTONES;

  return (
    <section id="moc-son" className="relative py-24 sm:py-32 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            Hoạt động tìm kiếm tại CV Lê Thị Riêng
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
                        ? 'bg-white border-amber-800 shadow-md ring-1 ring-amber-800/20 translate-x-1'
                        : 'bg-white/75 hover:bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex gap-3 items-start">
                      {/* Thumbnail hình ảnh từ Báo Sài Gòn Giải Phóng */}
                      {milestone.imageUrl && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100 relative group">
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center py-0.5 font-sans">
                            SGGP
                          </div>
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-serif text-sm sm:text-base font-bold text-amber-900 tabular-nums">
                            {milestone.year}
                          </span>
                          <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 uppercase tracking-wider shrink-0">
                            {milestone.categoryLabel}
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
                          isSelected ? 'text-amber-800 translate-x-0.5' : 'text-stone-300'
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
            {/* Visual Photo Header: Ảnh từ Báo Sài Gòn Giải Phóng */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-900 group">
              {selectedMilestone.imageUrl ? (
                <>
                  <img
                    src={selectedMilestone.imageUrl}
                    alt={selectedMilestone.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />
                </>
              ) : (
                <>
                  <CyberGlobeBackground className="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020826]/85 via-[#021452]/20 to-transparent pointer-events-none" />
                </>
              )}

              {/* Overlay Date & Category Badge */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-mono font-medium block drop-shadow-sm">
                    Mốc Thời Gian Sự Kiện
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white tabular-nums drop-shadow-md">
                    {selectedMilestone.year}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/20 text-xs font-medium text-amber-200 shrink-0">
                  {selectedMilestone.categoryLabel}
                </div>
              </div>
            </div>

            {/* Photo Caption & Source Attribution Bar */}
            {selectedMilestone.imageCaption && (
              <div className="bg-amber-50/60 px-6 py-2.5 border-b border-stone-200 text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-medium italic">
                  <Camera className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  {selectedMilestone.imageCaption}
                </span>
                <span className="font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded text-[11px] shrink-0">
                  Nguồn: {selectedMilestone.imageSource || 'Báo Sài Gòn Giải Phóng'}
                </span>
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

              {/* Metrics if available */}
              {selectedMilestone.metrics && selectedMilestone.metrics.length > 0 && (
                <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-2 gap-4">
                  {selectedMilestone.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <span className="text-xs text-stone-500 block">{metric.label}</span>
                      <span className="font-semibold text-stone-900 text-sm mt-0.5 block">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
