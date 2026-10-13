import React from 'react';

export const ChapterPhilosophy: React.FC = () => {
  return (
    <section id="triet-ly" className="relative py-12 sm:py-20 lg:py-24 bg-[#FAF6EE] border-b border-stone-200 overflow-hidden min-h-[580px] sm:min-h-[700px] lg:min-h-[560px] flex items-center">
      
      {/* 
        HÌNH NỀN:
        - Tablet (sm đến lg): Điều chỉnh tiêu điểm cúp ảnh object-[82%_85%]
        - Mobile: Góc dưới bên phải
        - Desktop: Chiếm 48% bên phải
      */}
      <div className="absolute right-0 bottom-0 top-auto lg:top-0 h-[56%] sm:h-[58%] lg:h-full w-full lg:w-[48%] pointer-events-none select-none z-0 overflow-hidden flex items-end lg:items-center justify-end">
        <img
          src="/To Lam-bg.jpg"
          alt="Tổng Bí thư Tô Lâm dâng hương tưởng niệm các anh hùng liệt sĩ"
          className="w-full h-full object-cover object-[85%_100%] sm:object-[82%_85%] lg:object-right filter contrast-[1.05] brightness-[1.02]"
          onError={(e) => {
            e.currentTarget.src = '/to-lam-bg-uploaded.jpg';
          }}
        />
        
        {/* Lớp phủ Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FAF6EE]/20 to-[#FAF6EE] lg:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/50 via-20% to-transparent hidden lg:block opacity-85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start sm:items-center lg:items-start">
        {/* 
          KHỐI VĂN BẢN:
          - Tablet (sm đến lg): Canh giữa màn hình
          - Mobile / Desktop: Canh trái
        */}
        <div className="max-w-md sm:max-w-xl lg:max-w-[440px] text-left sm:text-center lg:text-left mb-64 sm:mb-88 lg:mb-0 mx-0 sm:mx-auto lg:mx-0">

          {/* Blockquote trích dẫn phát biểu */}
          <blockquote className="font-serif text-xs sm:text-sm lg:text-base italic font-normal leading-relaxed text-stone-900 mb-4 text-justify sm:text-center lg:text-justify drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
            &ldquo;Đối với Đảng, Nhà nước và Nhân dân Việt Nam, tìm kiếm, quy tập, xác định danh tính các liệt sĩ là trách nhiệm thiêng liêng trước Tổ quốc, trước Nhân dân; là lương tri, nguyện vọng của mỗi người Việt Nam. Nhân dân ta, Đảng ta không bao giờ quên những người đã hy sinh vì đất nước, vì dân tộc, đó là đạo lý và truyền thống văn hóa Việt Nam.
            <br className="my-2 block" />
            Trước anh linh các anh hùng liệt sĩ, chúng tôi nguyện làm hết sức mình để hoàn thành sứ mệnh cao cả này bằng tất cả trách nhiệm, trí tuệ và tình cảm sâu nặng nhất&rdquo;.
          </blockquote>

          {/* 
            Khối danh xưng tác giả & ngữ cảnh phát biểu:
            - Định dạng ngày tháng liên liền: "ngày 17-7-2026"
          */}
          <div className="pt-2.5 border-t border-stone-300/60 max-w-full text-right sm:text-center lg:text-right font-sans leading-relaxed text-[10px] sm:text-xs text-stone-600 font-normal">
            <div className="uppercase tracking-wider font-semibold text-stone-800 mb-0.5 text-right sm:text-center lg:text-right">
              Tổng Bí thư, Chủ tịch nước Tô Lâm
            </div>
            
            {/* Hiển thị ngắt dòng dành cho Mobile & Tablet */}
            <div className="normal-case tracking-normal text-stone-600 lg:hidden text-right sm:text-center">
              phát biểu tại Lễ dâng hoa, dâng hương<br />
              tưởng niệm các Anh hùng liệt sĩ tại<br />
              Công viên Lê Thị Riêng, ngày 17-7-2026
            </div>

            {/* Hiển thị ngắt dòng dành cho Desktop */}
            <div className="normal-case tracking-normal text-stone-600 hidden lg:block text-right">
              phát biểu tại Lễ dâng hoa, dâng hương tưởng niệm các Anh hùng liệt sĩ<br />
              tại Công viên Lê Thị Riêng, ngày 17-7-2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
