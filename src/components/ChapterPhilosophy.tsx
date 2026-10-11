import React from 'react';
import toLamPortrait from '../assets/images/regenerated_image_1791719168794.png';

export const ChapterPhilosophy: React.FC = () => {
  return (
    <section id="triet-ly" className="relative py-12 sm:py-20 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trích dẫn phát biểu của Tổng Bí thư, Chủ tịch nước Tô Lâm - Bỏ box nền */}
        <div className="my-6 sm:my-10 relative">
          {/* Bố cục: Ảnh TBT Tô Lâm ở trên, chữ canh giữa */}
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            {/* Hình tròn TBT Tô Lâm to hơn, nền đỏ, viền trắng mảnh */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden bg-red-700 border-2 sm:border-[3px] border-white shadow-lg">
                <img
                  src={toLamPortrait}
                  alt="Tổng Bí thư, Chủ tịch nước Tô Lâm"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 bg-red-700"
                  onError={(e) => {
                    e.currentTarget.src = 'https://image.sggp.org.vn/Uploaded/2026/mzzan/2026_04_06/info-dc-tbt-to-lam-bia-3018-9822.jpg';
                  }}
                />
              </div>
            </div>

            {/* Khối trích dẫn & Thông tin tác giả: Canh giữa */}
            <div className="w-full flex flex-col items-center text-center">
              <blockquote className="font-serif text-base sm:text-lg md:text-xl italic font-normal sm:font-medium leading-relaxed mb-6 text-red-950/90 text-center max-w-2xl mx-auto animate-fade-in transition-opacity duration-1000 ease-out">
                &ldquo;Đối với Đảng, Nhà nước và Nhân dân Việt Nam, tìm kiếm, quy tập, xác định danh tính các liệt sĩ là trách nhiệm thiêng liêng trước Tổ quốc, trước Nhân dân; là lương tri, nguyện vọng của mỗi người Việt Nam. Nhân dân ta, Đảng ta không bao giờ quên những người đã hy sinh vì đất nước, vì dân tộc, đó là đạo lý và truyền thống văn hóa Việt Nam.
                <br className="my-2.5 block" />
                Trước anh linh các anh hùng liệt sĩ, chúng tôi nguyện làm hết sức mình để hoàn thành sứ mệnh cao cả này bằng tất cả trách nhiệm, trí tuệ và tình cảm sâu nặng nhất&rdquo;.
              </blockquote>

              <div className="text-xs sm:text-sm text-red-900 font-bold uppercase tracking-wider text-center">
                Tổng Bí thư, Chủ tịch nước Tô Lâm
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
