import React from 'react';
import { Cpu, Globe, Compass, ArrowRight } from 'lucide-react';

export const ChapterFutureVision: React.FC = () => {
  return (
    <section id="tuong-lai" className="relative py-24 sm:py-32 bg-[#F7F4EE] border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            Ngoại Giao Trong Kỷ Nguyên Vươn Mình
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Bước vào kỷ nguyên mới, ngoại giao tiếp tục đi đầu trong việc kiến tạo không gian phát triển mới, thu hút các nguồn lực công nghệ chiến lược và khẳng định bản lĩnh một Việt Nam hùng cường, hòa bình.
          </p>
        </div>

        {/* 3 Strategic Pillars of the New Era */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-800 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                Đột phá 01
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-3">
                Ngoại Giao Tiên Phong
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed text-justify">
                Chủ động nắm bắt xu thế thời đại, đi trước mở đường, củng cố vững chắc môi trường hòa bình, ổn định, ngăn ngừa từ sớm, từ xa mọi nguy cơ xung đột.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-semibold text-amber-900 flex items-center gap-1">
              <span>Bảo vệ Tổ quốc từ sớm, từ xa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-800 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                Đột phá 02
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-3">
                Kinh Tế Công Nghệ Cao
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed text-justify">
                Lấy doanh nghiệp và người dân làm trung tâm phục vụ. Thu hút dòng vốn FDI công nghệ cốt lõi: vi mạch bán dẫn, trí tuệ nhân tạo (AI), điện hạt nhân thế hệ mới và năng lượng hydro.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-semibold text-emerald-900 flex items-center gap-1">
              <span>Trọng tâm phụng sự phát triển</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100/80 flex items-center justify-center text-sky-800 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-sky-800 font-semibold">
                Đột phá 03
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-3">
                Đa Phương Định Hình
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed text-justify">
                Chuyển từ "tham dự" sang "chủ động đóng góp, xây dựng và định hình" các luật chơi quốc tế. Kiên quyết thượng tôn luật pháp quốc tế và UNCLOS 1982 trên Biển Đông.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100 text-xs font-semibold text-sky-900 flex items-center gap-1">
              <span>Thượng tôn Luật pháp Quốc tế</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
