import React from 'react';

export const ChapterPhilosophy: React.FC = () => {
  return (
    <section id="triet-ly" className="relative py-14 sm:py-24 bg-[#FAF6EE] border-b border-stone-200 overflow-hidden min-h-[560px] sm:min-h-[580px] flex items-center">
      
      {/* 
        HÌNH NỀN:
        - Mobile: Đặt ở góc dưới bên phải
        - Desktop: Chiếm 60% chiều rộng bên phải
      */}
      <div className="absolute right-0 bottom-0 top-auto sm:top-0 h-[50%] sm:h-full w-full sm:w-[70%] md:w-[60%] pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/To Lam-bg.jpg"
          alt="Tổng Bí thư Tô Lâm dâng hương tưởng niệm các anh hùng liệt sĩ"
          className="w-full h-full object-cover object-[85%_100%] sm:object-right-bottom filter contrast-[1.05] brightness-[1.01]"
          onError={(e) => {
            e.currentTarget.src = '/to-lam-bg-uploaded.jpg';
          }}
        />
        
        {/* Lớp phủ Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FAF6EE]/40 to-[#FAF6EE] sm:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/50 via-30% to-transparent hidden sm:block opacity-90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-md sm:max-w-[500px] text-left mb-60 sm:mb-0">

          {/* Blockquote trích dẫn phát biểu - Căn đều */}
          <blockquote className="font-serif text-sm sm:text-base md:text-lg italic font-normal leading-relaxed text-stone-900 mb-4 text-justify drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
            &ldquo;Đối với Đảng, Nhà nước và Nhân dân Việt Nam, tìm kiếm, quy tập, xác định danh tính các liệt sĩ là trách nhiệm thiêng liêng trước Tổ quốc, trước Nhân dân; là lương tri, nguyện vọng của mỗi người Việt Nam. Nhân dân ta, Đảng ta không bao giờ quên những người đã hy sinh vì đất nước, vì dân tộc, đó là đạo lý và truyền thống văn hóa Việt Nam.
            <br className="my-2 block" />
            Trước anh linh các anh hùng liệt sĩ, chúng tôi nguyện làm hết sức mình để hoàn thành sứ mệnh cao cả này bằng tất cả trách nhiệm, trí tuệ và tình cảm sâu nặng nhất&rdquo;.
          </blockquote>

          {/* 
            Khối danh xưng tác giả & ngữ cảnh phát biểu:
            - Mobile: Ngắt dòng chuẩn xác theo đúng yêu cầu:
                phát biểu tại Lễ dâng hoa, dâng hương
                tưởng niệm các Anh hùng liệt sĩ tại
                Công viên Lê Thị Riêng, ngày 17-7
            - Desktop: Ngắt dòng tự nhiên vừa vặn
          */}
          <div className="pt-2.5 border-t border-stone-300/60 max-w-full text-right font-sans leading-relaxed text-[11px] sm:text-xs text-stone-600 font-normal">
            <div className="uppercase tracking-wider font-semibold text-stone-800 mb-0.5">
              Tổng Bí thư, Chủ tịch nước Tô Lâm
            </div>
            
            {/* Hiển thị ngắt dòng dành riêng cho Mobile */}
            <div className="normal-case tracking-normal text-stone-600 sm:hidden">
              phát biểu tại Lễ dâng hoa, dâng hương<br />
              tưởng niệm các Anh hùng liệt sĩ tại<br />
              Công viên Lê Thị Riêng, ngày 17-7
            </div>

            {/* Hiển thị ngắt dòng dành cho Desktop (Màn hình lớn hơn) */}
            <div className="normal-case tracking-normal text-stone-600 hidden sm:block">
              phát biểu tại Lễ dâng hoa, dâng hương tưởng niệm các Anh hùng liệt sĩ<br />
              tại Công viên Lê Thị Riêng, ngày 17-7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
