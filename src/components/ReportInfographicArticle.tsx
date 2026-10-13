import React, { useState, useEffect, useRef } from 'react';
import { RedSilkBackground } from './RedSilkBackground';

/**
 * ReportInfographicArticle
 * Tích hợp toàn bộ nội dung Infographic tương tác báo chí đặc biệt theo thiết kế SGGP:
 * 1. 4 Nguồn Dữ Liệu (Tư liệu trong nước, Hồ sơ quân sự Hoa Kỳ giải mật, Kết quả thực địa, Lời kể nhân chứng)
 * 2. Sơ đồ công viên Lê Thị Riêng (3D Tilt & Tọa độ 4 khu vực) & Các số liệu Infographic tương tác (Count-up & Expandable)
 * 3. Loạt bài phóng sự đặc biệt: 500 ngày đêm thực hiện sứ mệnh lịch sử (5 thẻ bài viết liên kết Báo SGGP)
 */
export const ReportInfographicArticle: React.FC = () => {
  // State quản lý việc mở rộng các thẻ chi tiết phụ
  const [remainsExpanded, setRemainsExpanded] = useState(true);
  const [massGravesExpanded, setMassGravesExpanded] = useState(true);

  // Bộ đếm số tự động (Count-up animation)
  const [counts, setCounts] = useState({
    adnGroups: 12,
    surveyLocations: 12,
    reviewedHeroes: 134700,
    totalRemains: 731,
    singleRemains: 698,
    massRemains: 33,
    artifactRemains: 307,
    massGravesTotal: 8,
    areaAGraves: 2,
    areaBGraves: 6,
    samplesTotal: 9854,
    samplesQualified: 7104,
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  // Hiệu ứng nghiêng 3D (3D Tilt) cho bản đồ
  const tiltCardRef = useRef<HTMLDivElement | null>(null);
  const tiltGlareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            animateNumbers();
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    const targets = {
      adnGroups: 12,
      surveyLocations: 12,
      reviewedHeroes: 134700,
      totalRemains: 731,
      singleRemains: 698,
      massRemains: 33,
      artifactRemains: 307,
      massGravesTotal: 8,
      areaAGraves: 2,
      areaBGraves: 6,
      samplesTotal: 9854,
      samplesQualified: 7104,
    };

    const duration = 1800;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        adnGroups: Math.floor(ease * targets.adnGroups),
        surveyLocations: Math.floor(ease * targets.surveyLocations),
        reviewedHeroes: Math.floor(ease * targets.reviewedHeroes),
        totalRemains: Math.floor(ease * targets.totalRemains),
        singleRemains: Math.floor(ease * targets.singleRemains),
        massRemains: Math.floor(ease * targets.massRemains),
        artifactRemains: Math.floor(ease * targets.artifactRemains),
        massGravesTotal: Math.floor(ease * targets.massGravesTotal),
        areaAGraves: Math.floor(ease * targets.areaAGraves),
        areaBGraves: Math.floor(ease * targets.areaBGraves),
        samplesTotal: Math.floor(ease * targets.samplesTotal),
        samplesQualified: Math.floor(ease * targets.samplesQualified),
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCounts(targets);
      }
    };

    requestAnimationFrame(frame);
  };

  // 3D Tilt handlers
  useEffect(() => {
    const el = tiltCardRef.current;
    const glare = tiltGlareRef.current;
    if (!el) return;

    const maxTilt = 12;
    let isHovered = false;
    let animId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateCoords = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const posX = (clientX - rect.left) / rect.width;
      const posY = (clientY - rect.top) / rect.height;
      targetX = Math.max(-1, Math.min(1, (posX - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, (posY - 0.5) * 2));

      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle at ${Math.round(posX * 100)}% ${Math.round(
          posY * 100
        )}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`;
      }
    };

    const animateTilt = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      const rotX = -currentY * maxTilt;
      const rotY = currentX * maxTilt;
      const scale = isHovered ? 1.025 : 1;

      el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2
      )}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (isHovered || Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
        animId = requestAnimationFrame(animateTilt);
      } else {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (glare) glare.style.opacity = '0';
      }
    };

    const handlePointerStart = (clientX: number, clientY: number) => {
      isHovered = true;
      updateCoords(clientX, clientY);
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(animateTilt);
    };

    const handlePointerEnd = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    };

    const onMouseEnter = (e: MouseEvent) => handlePointerStart(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => updateCoords(e.clientX, e.clientY);
    const onMouseLeave = () => handlePointerEnd();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) handlePointerStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateCoords(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handlePointerEnd();

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={sectionRef} className="editorial-infographic-wrapper font-sans text-[#2d2926] bg-[#f8f5ee]">
      <style>{`
        /* Neumorphic Styles */
        .neu-card {
          background: #ffffff;
          box-shadow: 0 4px 18px rgba(50, 40, 30, 0.06), 0 1px 3px rgba(50, 40, 30, 0.04);
          border: 1px solid #e7e1d5;
          border-radius: 20px;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .neu-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(50, 40, 30, 0.10), 0 2px 6px rgba(50, 40, 30, 0.05);
        }
        .neu-card:active {
          transform: scale(0.985);
          box-shadow: inset 2px 2px 6px rgba(50, 40, 30, 0.06), inset -2px -2px 6px rgba(255, 255, 255, 0.9) !important;
        }
        .neu-card-static {
          background: #ffffff;
          box-shadow: 0 4px 18px rgba(50, 40, 30, 0.06), 0 1px 3px rgba(50, 40, 30, 0.04);
          border: 1px solid #e7e1d5;
          border-radius: 20px;
        }
        .neu-inset {
          background: #f1ebe1;
          box-shadow: inset 2px 2px 6px rgba(50, 40, 30, 0.06), inset -2px -2px 6px rgba(255, 255, 255, 0.9);
          border: 1px solid #eee8dc;
          border-radius: 14px;
        }
        .source-icon-svg {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.35s ease;
        }
        .neu-card:hover .source-icon-svg {
          transform: translateY(-3px) scale(1.04);
          filter: drop-shadow(0 10px 18px rgba(80, 60, 40, 0.22));
        }
        .title-serif {
          font-family: 'Playfair Display', 'Merriweather', 'Lora', Georgia, serif;
          font-weight: 800;
          letter-spacing: -0.015em;
        }
        .stat-number {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          color: #c5221f;
        }
        .stat-number-gold {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          color: #a2681a;
        }
        .stat-number-dark {
          font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          color: #181513;
        }
        .article-series-card {
          text-decoration: none !important;
          color: inherit !important;
          display: flex;
          flex-direction: column;
          border-radius: 18px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }
        .article-series-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.38), 0 6px 14px rgba(0, 0, 0, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
        }
        .article-series-card:hover .article-card-thumb svg {
          transform: scale(1.05);
        }
        .article-series-card:hover .article-card-title {
          color: #c5221f !important;
        }
        .article-series-card:hover .article-read-btn {
          background: #c5221f !important;
          color: #ffffff !important;
          border-color: #c5221f !important;
        }
      `}</style>

      {/* ==========================================================================
           PHẦN 1: 4 NGUỒN DỮ LIỆU
           ========================================================================== */}
      <section
        id="section-data-sources"
        className="py-12 sm:py-16 bg-[#fcf9f4] border-b border-[#e7e1d5]"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="title-serif text-3xl sm:text-4xl font-extrabold text-[#181513] tracking-tight leading-tight">
              4 Nguồn Dữ Liệu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Nguồn 1: Tư liệu trong nước */}
            <div className="neu-card p-6 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  width="56"
                  height="56"
                  className="source-icon-svg drop-shadow-md"
                >
                  <circle cx="50" cy="50" r="42" fill="#DA251D" stroke="#A01B18" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="39" fill="none" stroke="#FFD700" strokeOpacity="0.4" strokeWidth="1" />
                  <polygon points="50.00,28.00 55.00,43.12 70.92,43.20 58.08,52.63 62.93,67.80 50.00,58.50 37.07,67.80 41.92,52.63 29.08,43.20 45.00,43.12" fill="#FFD700" />
                </svg>
              </div>
              <h3 className="title-serif text-lg font-bold text-[#181513] leading-snug">
                Tư liệu trong nước
              </h3>
            </div>

            {/* Nguồn 2: Hồ sơ và ảnh quân sự do phía Hoa Kỳ giải mật */}
            <div className="neu-card p-6 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  width="56"
                  height="56"
                  className="source-icon-svg drop-shadow-md"
                >
                  <circle cx="50" cy="50" r="42" fill="#DA251D" stroke="#A01B18" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="39" fill="none" stroke="#FFD700" strokeOpacity="0.4" strokeWidth="1" />
                  <polygon points="50.00,28.00 55.00,43.12 70.92,43.20 58.08,52.63 62.93,67.80 50.00,58.50 37.07,67.80 41.92,52.63 29.08,43.20 45.00,43.12" fill="#FFD700" />
                </svg>
              </div>
              <h3 className="title-serif text-lg font-bold text-[#181513] leading-snug">
                Hồ sơ và ảnh quân sự do phía Hoa Kỳ giải mật
              </h3>
            </div>

            {/* Nguồn 3: Kết quả khảo sát thực địa */}
            <div className="neu-card p-6 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  width="56"
                  height="56"
                  className="source-icon-svg drop-shadow-md"
                >
                  <circle cx="50" cy="50" r="42" fill="#DA251D" stroke="#A01B18" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="39" fill="none" stroke="#FFD700" strokeOpacity="0.4" strokeWidth="1" />
                  <polygon points="50.00,28.00 55.00,43.12 70.92,43.20 58.08,52.63 62.93,67.80 50.00,58.50 37.07,67.80 41.92,52.63 29.08,43.20 45.00,43.12" fill="#FFD700" />
                </svg>
              </div>
              <h3 className="title-serif text-lg font-bold text-[#181513] leading-snug">
                Kết quả khảo sát thực địa
              </h3>
            </div>

            {/* Nguồn 4: Lời kể của nhân chứng */}
            <div className="neu-card p-6 flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  width="56"
                  height="56"
                  className="source-icon-svg drop-shadow-md"
                >
                  <circle cx="50" cy="50" r="42" fill="#DA251D" stroke="#A01B18" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="39" fill="none" stroke="#FFD700" strokeOpacity="0.4" strokeWidth="1" />
                  <polygon points="50.00,28.00 55.00,43.12 70.92,43.20 58.08,52.63 62.93,67.80 50.00,58.50 37.07,67.80 41.92,52.63 29.08,43.20 45.00,43.12" fill="#FFD700" />
                </svg>
              </div>
              <h3 className="title-serif text-lg font-bold text-[#181513] leading-snug">
                Lời kể của nhân chứng
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           PHẦN 2: BẢN ĐỒ DSC_5860 BÊN TRÁI & CÁC SỐ LIỆU BÊN PHẢI
           ========================================================================== */}
      <section id="section-map-stats" className="py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CỘT TRÁI: BẢN ĐỒ THỰC ĐỊA & HIỆU ỨNG NGHIÊNG 3D (7 cols) */}
            <div className="lg:col-span-7 neu-card-static p-6">
              <div className="border-b border-[#e7e1d5] pb-4 mb-5">
                <h2 className="title-serif text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold text-[#181513] leading-tight tracking-tight">
                  Sơ đồ tìm kiếm, quy tập hài cốt liệt sĩ
                  <span className="block mt-1 sm:mt-1.5 text-lg sm:text-xl lg:text-2xl font-bold text-[#b5121b]">
                    tại Công viên Lê Thị Riêng
                  </span>
                </h2>
              </div>

              {/* Khung 3D Tilt */}
              <div
                ref={tiltCardRef}
                className="relative rounded-xl overflow-hidden cursor-grab shadow-lg bg-white border border-[#e7e1d5]"
                style={{ transformStyle: 'preserve-3d', transition: 'box-shadow 0.25s ease' }}
              >
                <img
                  src="/CV.jpg"
                  alt="Sơ đồ tìm kiếm, quy tập hài cốt liệt sĩ tại Công viên Lê Thị Riêng"
                  className="w-full h-auto block rounded-xl pointer-events-none select-none"
                  onError={(e) => {
                    e.currentTarget.src = './CV.jpg';
                  }}
                />
                <div
                  ref={tiltGlareRef}
                  className="absolute inset-0 pointer-events-none rounded-xl opacity-0 transition-opacity duration-300"
                />
              </div>

              {/* Chú thích 4 ô khu vực (2x2) */}
              <div className="mt-5 pt-4 border-t border-[#e7e1d5]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Ô 1: Khu vực 1 (A) */}
                  <div className="neu-card p-4">
                    <span className="text-sm font-extrabold text-[#c5221f] block mb-1">
                      KHU VỰC 1 (A)
                    </span>
                    <div className="text-xs text-[#6e665e] mb-1">
                      Tọa độ: <span className="font-mono font-semibold text-[#2d2926]">10.78462 - 106.66466</span>
                    </div>
                    <div className="text-xs font-bold text-[#181513]">
                      Diện tích: <span className="font-extrabold">khoảng 800m²</span>
                    </div>
                  </div>

                  {/* Ô 2: Khu vực 2 (B) */}
                  <div className="neu-card p-4">
                    <span className="text-sm font-extrabold text-[#c5221f] block mb-1">
                      KHU VỰC 2 (B)
                    </span>
                    <div className="text-xs text-[#6e665e] mb-1">
                      Tọa độ: <span className="font-mono font-semibold text-[#2d2926]">10.78393 - 106.66458</span>
                    </div>
                    <div className="text-xs font-bold text-[#181513]">
                      Diện tích: <span className="font-extrabold">khoảng 1.200m²</span>
                    </div>
                  </div>

                  {/* Ô 3: Khu vực 3 (C) */}
                  <div className="neu-card p-4">
                    <span className="text-sm font-extrabold text-[#a2681a] block mb-1">
                      KHU VỰC 3 (C)
                    </span>
                    <div className="text-xs text-[#6e665e] mb-1">
                      Tọa độ: <span className="font-mono font-semibold text-[#2d2926]">10.78433 - 106.66443</span>
                    </div>
                    <div className="text-xs font-bold text-[#181513]">
                      Diện tích: <span className="font-extrabold">khoảng 500m²</span>
                    </div>
                  </div>

                  {/* Ô 4: Khu vực tìm kiếm mở rộng */}
                  <div className="neu-card p-4">
                    <span className="text-sm font-extrabold text-[#1c406d] block mb-1">
                      KHU VỰC TÌM KIẾM MỞ RỘNG
                    </span>
                    <div className="text-xs font-bold text-[#181513] mt-2">
                      Diện tích: <span className="font-extrabold">khoảng 5.800m²</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: CÁC SỐ LIỆU INFOGRAPHIC TƯƠNG TÁC (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Tiêu đề cột số liệu thống kê */}
              <div className="border-b border-[#e7e1d5] pb-3.5 mb-1">
                <h3 className="title-serif text-[13px] sm:text-base md:text-lg font-extrabold text-[#181513] uppercase tracking-wider leading-snug flex items-start gap-2">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#c5221f] inline-block shrink-0 mt-1 sm:mt-1.5"></span>
                  <span>
                    Toàn cảnh tìm kiếm, quy tập, xác định<br />
                    danh tính liệt sĩ tại TPHCM
                  </span>
                </h3>
              </div>
              {/* Thẻ: Lực lượng lấy mẫu & Khảo sát địa điểm */}
              <div className="neu-card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="neu-inset p-4 flex items-center gap-3">
                    <div className="stat-number-gold text-3xl sm:text-4xl leading-none shrink-0">
                      {counts.adnGroups}
                    </div>
                    <div className="text-sm font-bold text-[#181513] leading-snug">
                      Tổ lấy mẫu sinh phẩm ADN
                    </div>
                  </div>

                  <div className="neu-inset p-4 flex items-center gap-3">
                    <div className="stat-number text-3xl sm:text-4xl leading-none shrink-0">
                      {counts.surveyLocations}
                    </div>
                    <div className="text-sm font-bold text-[#181513] leading-snug">
                      Địa điểm nghi vấn tiếp tục khảo sát, tìm kiếm
                    </div>
                  </div>
                </div>
              </div>

              {/* Thẻ riêng: Rà soát chuẩn hoá dữ liệu liệt sĩ */}
              <div className="neu-card p-6">
                <div className="neu-inset p-4 border-t-3 border-[#a2681a] bg-[#fdf8ee] flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm sm:text-base font-bold text-[#181513]">
                    Rà soát, chuẩn hoá hơn
                  </div>
                  <div className="stat-number-gold text-2xl sm:text-3xl leading-none">
                    {counts.reviewedHeroes.toLocaleString('vi-VN')}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#a2681a]">
                    Dữ liệu liệt sĩ
                  </div>
                </div>
              </div>

              {/* Thẻ 2: 731 Hài cốt liệt sĩ đã tìm thấy */}
              <div className="neu-card p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="stat-number text-5xl leading-none">
                    {counts.totalRemains}
                  </div>
                  <div className="neu-inset px-3 py-1 text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] rounded-full">
                    Tính đến ngày 8-10
                  </div>
                </div>

                <p className="text-base font-bold text-[#181513] leading-snug mb-4">
                  Tổng số hài cốt liệt sĩ đã tìm thấy
                </p>

                {/* Các chỉ số thành phần (Luôn hiển thị trực quan) */}
                <div className="flex flex-col gap-3 pt-3 border-t border-dashed border-[#dcd4c7]">
                  {/* Hàng 1: Hài cốt riêng lẻ & Hài cốt tại mộ tập thể */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="neu-inset p-3 text-center">
                      <div className="stat-number-dark text-xl sm:text-2xl">
                        {counts.singleRemains}
                      </div>
                      <div className="text-xs font-semibold text-[#6e665e] mt-1">
                        Hài cốt riêng lẻ
                      </div>
                    </div>

                    <div className="neu-inset p-3 text-center border border-[#c5221f]/35 bg-[#fdf3f2]">
                      <div className="stat-number text-xl sm:text-2xl">
                        {counts.massRemains}
                      </div>
                      <div className="text-xs font-bold text-[#c5221f] mt-1">
                        Hài cốt tại mộ tập thể
                      </div>
                    </div>
                  </div>

                  {/* Ô riêng biệt: Hài cốt có di vật kèm theo */}
                  <div className="neu-inset p-3.5 border border-[#a2681a]/40 bg-[#fdf8ee] flex items-center justify-between px-4">
                    <div className="stat-number-gold text-2xl sm:text-3xl leading-none">
                      {counts.artifactRemains}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#a2681a] text-right">
                      Hài cốt có di vật kèm theo
                    </div>
                  </div>
                </div>
              </div>
              {/* Thẻ 3: 8 Vị trí mộ tập thể được phát hiện */}
              <div
                className="neu-card p-6 cursor-pointer"
                onClick={() => setMassGravesExpanded(!massGravesExpanded)}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="stat-number text-4xl leading-none">
                    {counts.massGravesTotal}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#181513]">
                    vị trí mộ tập thể được phát hiện
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#dcd4c7] text-xs font-bold text-[#c5221f]">
                  <span>
                    {massGravesExpanded
                      ? 'Chạm để thu gọn 2 chỉ số thành phần'
                      : 'Chạm để xem 2 chỉ số thành phần'}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f1ebe1] transition-transform duration-300 ${
                      massGravesExpanded ? 'rotate-180 bg-[#c5221f] text-white' : ''
                    }`}
                  >
                    ▾
                  </span>
                </div>

                {massGravesExpanded && (
                  <div className="mt-3.5 grid grid-cols-2 gap-3">
                    <div className="neu-inset p-3.5 border-l-4 border-[#c5221f]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-sm text-[#181513]">Khu A</span>
                        <span className="stat-number text-xl">{counts.areaAGraves}</span>
                      </div>
                      <div className="text-xs text-[#6e665e] mt-1 font-semibold">2 vị trí</div>
                    </div>

                    <div className="neu-inset p-3.5 border-l-4 border-[#c5221f]">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-sm text-[#181513]">Khu B</span>
                        <span className="stat-number text-xl">{counts.areaBGraves}</span>
                      </div>
                      <div className="text-xs text-[#6e665e] mt-1 font-semibold">6 vị trí</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thẻ 4: 18/18 Nghĩa trang liệt sĩ tại TPHCM hoàn thành lấy mẫu */}
              <div className="neu-card p-6">
                <div className="mb-2">
                  <span className="stat-number text-4xl leading-none">18/18</span>
                </div>
                <p className="text-base font-bold text-[#181513] leading-snug">
                  Nghĩa trang liệt sĩ tại TPHCM hoàn thành lấy mẫu
                </p>
              </div>

              {/* Thẻ 5: 9.854 & 7.104 Mẫu sinh phẩm */}
              <div className="neu-card p-6 flex flex-col gap-3">
                <div className="neu-inset p-4 flex items-center justify-between">
                  <div className="text-sm sm:text-base font-bold text-[#181513]">
                    Mẫu sinh phẩm thu nhận
                  </div>
                  <div className="stat-number-dark text-2xl sm:text-3xl leading-none">
                    {counts.samplesTotal.toLocaleString('vi-VN')}
                  </div>
                </div>

                <div className="neu-inset p-4 flex items-center justify-between border border-[#c5221f]/35 bg-[#fdf3f2]">
                  <div className="text-sm sm:text-base font-bold text-[#c5221f]">
                    Mẫu đủ điều kiện giám định ADN
                  </div>
                  <div className="stat-number text-2xl sm:text-3xl leading-none">
                    {counts.samplesQualified.toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           PHẦN 3: LOẠT BÀI PHÓNG SỰ ĐẶC BIỆT: 500 NGÀY ĐÊM THỰC HIỆN SỨ MỆNH LỊCH SỬ
           5 THẺ LIÊN KẾT BÁO SÀI GÒN GIẢI PHÓNG (HTTPS://WWW.SGGP.ORG.VN/)
           ========================================================================== */}
      <section
        id="section-sggp-series"
        className="relative py-12 sm:py-16 bg-[#821317] border-t border-red-950 overflow-hidden"
      >
        {/* Nền gấm lụa đỏ satin truyền thống cao cấp */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
          <RedSilkBackground />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Lưới 5 bài báo SGGP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* THẺ 1: BÀI 1 — CHẠY ĐUA VỚI THỜI GIAN */}
            <a
              href="https://www.sggp.org.vn/contents/preview?content_id=1392879724497983183"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 1 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#1a1614] article-card-thumb">
                <img
                  src="/Bai-2.jpg"
                  alt="Bìa bài báo phóng sự SGGP 1"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 1
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Những ngày ở Công viên Lê Thị Riêng...
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Sau gần 60 năm trầm tích dưới lòng đất Nghĩa địa Đô Thành - Chí Hòa xưa (nay là Công viên Lê Thị Riêng), hàng trăm bộ hài cốt cán bộ, chiến sĩ hy sinh trong cuộc Tổng tiến công và nổi dậy Xuân Mậu Thân 1968 đang từng bước được quy tập, xác định danh tính.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#eee8dc] mt-auto">
                  <span className="text-[11px] font-semibold text-[#9b9389]">Báo SGGP</span>
                  <span className="article-read-btn px-2.5 py-1 rounded text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] inline-flex items-center gap-1 transition-all">
                    Đọc bài
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* THẺ 2: BÀI 2 — THEO DẤU TÍCH GIỮA CHIẾN TRƯỜNG XƯA */}
            <a
              href="https://www.sggp.org.vn/nua-the-ky-cho-doi-3-gio-va-chuyen-bay-mang-so-hieu-hy-vong-post868220.html"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 2 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#1a1614] article-card-thumb">
                <img
                  src="/Bai-1.jpg"
                  alt="Bìa bài báo phóng sự SGGP 2"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 2
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Nửa thế kỷ chờ đợi, 3 giờ và chuyến bay mang "số hiệu" HY VỌNG
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Một hành trình đặc biệt đưa 7.104 mẫu sinh phẩm hài cốt liệt sĩ từ TPHCM ra Hà Nội thực hiện giám định ADN để xác định danh tính liệt sĩ. Chuyến bay chỉ vỏn vẹn trong 3 giờ, chở theo niềm hy vọng của hơn nửa thế kỷ chờ đợi.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#eee8dc] mt-auto">
                  <span className="text-[11px] font-semibold text-[#9b9389]">Báo SGGP</span>
                  <span className="article-read-btn px-2.5 py-1 rounded text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] inline-flex items-center gap-1 transition-all">
                    Đọc bài
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* THẺ 3: BÀI 3 — ĐỂ CÓ NHỮNG CUỘC TRỞ VỀ */}
            <a
              href="https://www.sggp.org.vn/contents/preview?content_id=1213582913103976012"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 3 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#1a1614] article-card-thumb">
                <img
                  src="/Bai-3.jpg"
                  alt="Bìa bài báo phóng sự SGGP 3"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 3
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Hơn cả tình yêu
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Người ra trận chưa kịp trở về, người ở lại mang theo lời hẹn ước đi qua tuổi thanh xuân, qua bao mùa mưa nắng đằng đẵng đợi chờ. Lời hứa “Đánh thắng trận này rồi anh sẽ về cưới em” đã khắc sâu, trở thành một phần đời của bà Nguyễn Thị Lệ. Để rồi hôm nay, khi kỷ vật cùng hài cốt của người chiến sĩ nằm lại dưới lòng đất Công viên Lê Thị Riêng được tìm thấy...
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#eee8dc] mt-auto">
                  <span className="text-[11px] font-semibold text-[#9b9389]">Báo SGGP</span>
                  <span className="article-read-btn px-2.5 py-1 rounded text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] inline-flex items-center gap-1 transition-all">
                    Đọc bài
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* THẺ 4: BÀI 4 — ĐỒNG LÒNG TRƯỚC LỜI HỨA THIÊNG LIÊNG */}
            <a
              href="https://www.sggp.org.vn/contents/preview?content_id=1248766735478936783"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 4 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#1a1614] article-card-thumb">
                <img
                  src="/Bai-4.jpg"
                  alt="Bìa bài báo phóng sự SGGP 4"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 4
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Mong có ngày được đón mẹ trở về
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Gần 60 năm sau ngày mẹ hy sinh, ông Lê Chí Công, con trai Anh hùng Lực lượng vũ trang nhân dân, Liệt sĩ Lê Thị Riêng, vẫn chưa biết chính xác nơi bà yên nghỉ. Công viên mang tên mẹ đã trở thành nơi ông tìm về để tưởng nhớ và hy vọng một ngày được tìm thấy mẹ.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#eee8dc] mt-auto">
                  <span className="text-[11px] font-semibold text-[#9b9389]">Báo SGGP</span>
                  <span className="article-read-btn px-2.5 py-1 rounded text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] inline-flex items-center gap-1 transition-all">
                    Đọc bài
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </a>

            {/* THẺ 5: BÀI 5 — DƯỚI CỜ TỔ QUỐC ANH VỀ */}
            <a
              href="https://www.sggp.org.vn/contents/preview?content_id=1176710240935859663"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 5 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#1a1614] article-card-thumb">
                <img
                  src="/Bai-5.jpg"
                  alt="Bìa bài báo phóng sự SGGP 5"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 5
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Thiếu tướng Nguyễn Thành Trung, Chính ủy Bộ Tư lệnh TPHCM: Còn thông tin là còn liệt sĩ chưa trở về...
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Thiếu tướng Nguyễn Thành Trung, Chính ủy Bộ Tư lệnh TPHCM, Phó Trưởng ban Thường trực Ban Chỉ đạo tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ TPHCM, khẳng định: nhiệm vụ vẫn tiếp tục, đi tìm khi còn thông tin, còn hy vọng và còn có liệt sĩ chưa trở về.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#eee8dc] mt-auto">
                  <span className="text-[11px] font-semibold text-[#9b9389]">Báo SGGP</span>
                  <span className="article-read-btn px-2.5 py-1 rounded text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] inline-flex items-center gap-1 transition-all">
                    Đọc bài
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
