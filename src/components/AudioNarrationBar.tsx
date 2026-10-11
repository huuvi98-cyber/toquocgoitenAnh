import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, X } from 'lucide-react';

interface AudioNarrationBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioNarrationBar: React.FC<AudioNarrationBarProps> = ({
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [progress, setProgress] = useState(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Narration text in Vietnamese
  const narrativeScript = `Chào mừng quý độc giả đến với bài báo đa phương tiện Ngoại Giao Cây Tre: Bản lĩnh và khát vọng Việt Nam trong kỷ nguyên vươn mình của dân tộc. Trường phái ngoại giao cây tre Việt Nam được đúc kết từ hàng nghìn năm lịch sử dựng nước và giữ nước, với ba trụ cột cốt lõi: Gốc vững, Thân chắc và Cành uyển chuyển. Kiên định lợi ích quốc gia dân tộc, độc lập tự chủ, kết hợp với phương châm Dĩ bất biến, ứng vạn biến. Việt Nam ngày nay đã thiết lập quan hệ ngoại giao với 193 quốc gia thành viên Liên Hợp Quốc, trong đó có 8 Đối tác Chiến lược Toàn diện với các cường quốc hàng đầu thế giới.`;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  useEffect(() => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(narrativeScript);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;

      utterance.onboundary = (e) => {
        const charRatio = (e.charIndex / narrativeScript.length) * 100;
        setProgress(charRatio);
      };

      utterance.onend = () => {
        setProgress(100);
      };

      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } else {
      synthRef.current.cancel();
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
      <div className="bg-[#1C1917]/95 backdrop-blur-md text-stone-100 p-3 sm:p-4 rounded-2xl border border-stone-700/60 shadow-2xl flex items-center justify-between gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-md"
          title={isPlaying ? 'Tạm dừng đọc' : 'Phát tiếp bản đọc'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Narrative Info & Animated Waveform */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium text-stone-200 truncate flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Bản Đọc Giọng Báo Chí: Hồ Sơ Ngoại Giao</span>
            </span>
            <span className="text-[11px] font-mono text-stone-400 tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Waveform / Track */}
          <div className="flex items-center gap-1 h-3">
            {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 65, 40].map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-full transition-all duration-200 ${
                  isPlaying ? 'bg-amber-400' : 'bg-stone-600'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, (h * (progress + 20)) % 100)}%` : '20%',
                }}
              />
            ))}
          </div>
        </div>

        {/* Restart / Replay */}
        <button
          onClick={() => {
            setProgress(0);
            if (synthRef.current) {
              synthRef.current.cancel();
              if (utteranceRef.current) {
                synthRef.current.speak(utteranceRef.current);
              }
            }
          }}
          className="text-stone-400 hover:text-white p-1.5 transition-colors cursor-pointer"
          title="Đọc lại từ đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1.5 transition-colors cursor-pointer"
          title="Đóng thanh nghe đọc"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
