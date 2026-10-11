import React from 'react';

export const ChapterPhilosophy: React.FC = () => {
  return (
    <section id="triet-ly" className="relative py-12 sm:py-20 bg-[#FBF9F5] border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big Editorial Quote Banner - Nền vàng nhạt, chữ đỏ, chân dung Tổng Bí thư, Chủ tịch nước Tô Lâm */}
        <div className="my-8 sm:my-12 p-6 sm:p-10 lg:p-12 rounded-2xl bg-amber-50 text-red-900 border border-amber-200/90 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Chân dung Tổng Bí thư, Chủ tịch nước Tô Lâm */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 lg:w-full lg:h-72 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-amber-100">
                <img
                  src="/to-lam-portrait.jpg"
                  alt="Chân dung Tổng Bí thư, Chủ tịch nước Tô Lâm"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to official SGGP CDN URL
                    e.currentTarget.src = 'https://image.sggp.org.vn/Uploaded/2026/mzzan/2026_04_06/info-dc-tbt-to-lam-bia-3018-9822.jpg';
                  }}
                />
              </div>
              <span className="mt-3 text-xs text-stone-500 font-sans italic text-center">
                Ảnh: Báo Sài Gòn Giải Phóng
              </span>
            </div>

            {/* Khối trích dẫn & Thông tin tác giả */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <blockquote className="font-serif text-base sm:text-lg md:text-xl italic font-semibold leading-relaxed mb-6 text-red-900 text-justify">
                &ldquo;Đối với Đảng, Nhà nước và Nhân dân Việt Nam, tìm kiếm, quy tập, xác định danh tính các liệt sĩ là trách nhiệm thiêng liêng trước Tổ quốc, trước Nhân dân; là lương tri, nguyện vọng của mỗi người Việt Nam. Nhân dân ta, Đảng ta không bao giờ quên những người đã hy sinh vì đất nước, vì dân tộc, đó là đạo lý và truyền thống văn hóa Việt Nam.
                <br className="my-2 block" />
                Trước anh linh các anh hùng liệt sĩ, chúng tôi nguyện làm hết sức mình để hoàn thành sứ mệnh cao cả này bằng tất cả trách nhiệm, trí tuệ và tình cảm sâu nặng nhất&rdquo;.
              </blockquote>

              <div className="flex flex-wrap items-center justify-between border-t border-amber-200 pt-4 text-xs sm:text-sm text-red-800 font-bold uppercase tracking-wider gap-2">
                <span>Tổng Bí thư, Chủ tịch nước Tô Lâm</span>
                <span className="text-stone-500 font-medium normal-case text-xs">
                  Trách nhiệm thiêng liêng trước Tổ quốc và Nhân dân
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
