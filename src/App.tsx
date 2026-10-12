/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { HeroCover } from './components/HeroCover';
import { ChapterPhilosophy } from './components/ChapterPhilosophy';
import { ChapterTimeline } from './components/ChapterTimeline';
import { AudioNarrationBar } from './components/AudioNarrationBar';
import { EditorialFooter } from './components/EditorialFooter';
import { TIMELINE_MILESTONES } from './data/diplomacyData';
import { BookOpen, Type } from 'lucide-react';

export default function App() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showAudioBar, setShowAudioBar] = useState(false);
  const [readingMode, setReadingMode] = useState<'immersive' | 'clean'>('immersive');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setReadingProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    if (!showAudioBar) {
      setShowAudioBar(true);
      setIsAudioPlaying(true);
    } else {
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const handleToggleReadingMode = () => {
    setReadingMode((prev) => (prev === 'immersive' ? 'clean' : 'immersive'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToContent = () => {
    const el = document.getElementById('triet-ly');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 selection:bg-amber-800 selection:text-white">
      {/* 3-Zone Sticky Navigation Bar */}
      <TopNav
        readingProgress={readingProgress}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        readingMode={readingMode}
        onToggleReadingMode={handleToggleReadingMode}
      />

      {readingMode === 'immersive' ? (
        /* IMMERSIVE SCROLLYTELLING EXPERIENCE (SHORTHAND STORY MODE) */
        <main>
          {/* Section 0: Fullscreen Hero Cover */}
          <HeroCover onScrollToContent={handleScrollToContent} />

          {/* Section 1: Bamboo Philosophy Doctrine */}
          <ChapterPhilosophy />

          {/* Section 2: Historical Milestones & Archival Scrollytelling */}
          <ChapterTimeline />
        </main>
      ) : (
        /* CLEAN TYPOGRAPHICAL READING MODE (BROADSHEET ESSAY) */
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-stone-500">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>Bản Đọc Thu Gọn · Định Dạng Sách Báo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                Cỡ chữ:
              </span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  fontSize === 'normal' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                Tiêu chuẩn
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-xs rounded-md ${
                  fontSize === 'large' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                Lớn
              </button>
            </div>
          </div>

          <article
            className={`prose prose-stone max-w-none text-stone-800 leading-relaxed ${
              fontSize === 'large' ? 'text-xl leading-loose' : 'text-base sm:text-lg leading-relaxed'
            }`}
          >
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold block mb-2">
                Hồ Sơ Chuyên Đề Đối Ngoại
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mb-4">
                Ngoại Giao Cây Tre: Bản Lĩnh & Khát Vọng Việt Nam
              </h1>
              <p className="text-stone-500 text-sm font-sans">
                Tháng 9/2026 · Ban Biên tập Chuyên đề Đối ngoại · Độc quyền
              </p>
            </div>

            <p className="text-justify">
              Trường phái Ngoại giao Cây tre Việt Nam là kết tinh giữa hàng nghìn năm truyền thống nhân ái, hòa hiếu, kiên cường của dân tộc và tư tưởng ngoại giao Hồ Chí Minh. Được Cố Tổng Bí thư Nguyễn Phú Trọng đúc kết sâu sắc với ba đặc trưng cốt lõi: gốc vững, thân chắc, cành uyển chuyển.
            </p>

            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-10 mb-4">
              1. Ba Trụ Cột Triết Lý Cốt Lõi
            </h2>
            <p className="text-justify">
              <strong>Gốc vững</strong> là kiên định bảo vệ lợi ích quốc gia - dân tộc; giữ vững đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển. Độc lập tự chủ là bất biến, là nền tảng sống còn cho mọi quyết sách đối ngoại.
            </p>
            <p className="text-justify">
              <strong>Thân chắc</strong> là bản lĩnh, nội lực kinh tế, quốc phòng và sức mạnh khối đại đoàn kết toàn dân tộc. Thực lực vững thì ngoại giao mới mạnh; kết hợp hài hòa sức mạnh dân tộc với sức mạnh thời đại.
            </p>
            <p className="text-justify">
              <strong>Cành uyển chuyển</strong> là phương pháp "dĩ bất biến, ứng vạn biến" của Chủ tịch Hồ Chí Minh. Linh hoạt về sách lược, mềm dẻo về phương thức xử lý các mối quan hệ phức tạp, dũng cảm hóa giải mâu thuẫn để biến nguy thành an.
            </p>

            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-10 mb-4">
              2. Hoạt Động Tìm Kiếm Tại Công Viên Lê Thị Riêng
            </h2>
            <ul className="space-y-3 pl-4 border-l-2 border-stone-200">
              {TIMELINE_MILESTONES.slice(0, 5).map((m) => (
                <li key={m.id} className="text-stone-700">
                  <strong className="font-sans font-bold text-red-700">{m.year}:</strong> {m.title} — {m.summary}
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-10 mb-4">
              3. Mạng Lưới Đối Tác Toàn Cầu
            </h2>
            <p className="text-justify">
              Đến nay, Việt Nam đã thiết lập quan hệ ngoại giao với 193 quốc gia thành viên Liên Hợp Quốc, thiết lập mạng lưới 8 Đối tác Chiến lược Toàn diện với các cường quốc hàng đầu (Trung Quốc, Nga, Ấn Độ, Hàn Quốc, Hoa Kỳ, Nhật Bản, Australia, Pháp) và tham gia 16 Hiệp định Thương mại Tự do (FTAs).
            </p>

            <div className="my-8 p-6 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="font-serif italic text-base text-stone-800 block text-center">
                &ldquo;Dĩ bất biến, ứng vạn biến. Thực lực là cái chiêng mà ngoại giao là cái tiếng; chiêng có to thì tiếng mới vang.&rdquo;
              </span>
              <span className="text-xs text-stone-600 block text-center mt-2 font-medium">
                — Chủ tịch Hồ Chí Minh
              </span>
            </div>

            <p className="text-justify">
              Bước vào kỷ nguyên mới — kỷ nguyên vươn mình của dân tộc, nền ngoại giao Việt Nam mang sứ mệnh lịch sử tiên phong bảo vệ Tổ quốc từ sớm, từ xa, phục vụ đắc lực mục tiêu đưa đất nước trở thành quốc gia phát triển có thu nhập cao vào năm 2045.
            </p>
          </article>
        </main>
      )}

      {/* Floating Audio Narration Player Bar (When Activated) */}
      {showAudioBar && (
        <AudioNarrationBar
          isPlaying={isAudioPlaying}
          onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
          onClose={() => {
            setIsAudioPlaying(false);
            setShowAudioBar(false);
          }}
        />
      )}

      {/* Broadsheet Editorial Footer */}
      <EditorialFooter />
    </div>
  );
}
