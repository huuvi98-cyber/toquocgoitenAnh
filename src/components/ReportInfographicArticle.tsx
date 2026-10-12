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
    adnGroups: 0,
    surveyLocations: 0,
    reviewedHeroes: 0,
    totalRemains: 0,
    singleRemains: 0,
    massRemains: 0,
    artifactRemains: 0,
    massGravesTotal: 0,
    areaAGraves: 0,
    areaBGraves: 0,
    samplesTotal: 0,
    samplesQualified: 0,
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
      { threshold: 0.15 }
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
                  width="84"
                  height="84"
                  className="source-icon-svg drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="tile-bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCFAF6" />
                      <stop offset="100%" stopColor="#EBE3D5" />
                    </linearGradient>
                    <linearGradient id="book-cover-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#883324" />
                      <stop offset="100%" stopColor="#551F16" />
                    </linearGradient>
                    <linearGradient id="parchment-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDF9" />
                      <stop offset="100%" stopColor="#EFE6D6" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="94" height="94" rx="22" fill="url(#tile-bg-1)" stroke="#E0D6C4" strokeWidth="1.5" />
                  <rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1" />
                  {/* Sách đáy */}
                  <g>
                    <rect x="18" y="24" width="58" height="56" rx="6" fill="#3E1C15" transform="rotate(-5 47 52)" />
                    <path d="M20 73 C30 75 62 73 72 68" stroke="#D5C9B7" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M23 71 L23 84 L27 81 L31 84 L31 71 Z" fill="#4B6535" />
                  </g>
                  {/* Quyển giữa */}
                  <g>
                    <rect x="22" y="19" width="56" height="58" rx="6" fill="url(#book-cover-1)" transform="rotate(3 50 48)" />
                    <path d="M73 37 L83 38 L82 44 L72 43 Z" fill="#4B6535" />
                  </g>
                  {/* Tài liệu lưu trữ phía trên */}
                  <g>
                    <rect x="24" y="16" width="48" height="54" rx="4" fill="url(#parchment-1)" stroke="#DFD3BE" strokeWidth="1" />
                    <rect x="27" y="19" width="42" height="48" rx="2" fill="none" stroke="#C5221F" strokeWidth="1.5" />
                    <rect x="29" y="21" width="38" height="44" rx="1" fill="none" stroke="#C5221F" strokeWidth="0.75" strokeDasharray="3,1" />
                    <path d="M29 25 L33 25 M29 21 L29 25" stroke="#C5221F" strokeWidth="1.5" fill="none" />
                    <path d="M67 25 L63 25 M67 21 L67 25" stroke="#C5221F" strokeWidth="1.5" fill="none" />
                    <path d="M29 61 L33 61 M29 65 L29 61" stroke="#C5221F" strokeWidth="1.5" fill="none" />
                    <path d="M67 61 L63 61 M67 65 L67 61" stroke="#C5221F" strokeWidth="1.5" fill="none" />
                    <line x1="36" y1="37" x2="60" y2="37" stroke="#7A221E" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="34" y1="43" x2="62" y2="43" stroke="#8C6E53" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="38" y1="49" x2="58" y2="49" stroke="#8C6E53" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M68 62 Q72 66 73 70 L65 70 Q66 65 68 62 Z" fill="#D3C3AA" stroke="#B8A488" strokeWidth="0.75" />
                  </g>
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
                  width="84"
                  height="84"
                  className="source-icon-svg drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="tile-bg-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCFAF6" />
                      <stop offset="100%" stopColor="#EBE3D5" />
                    </linearGradient>
                    <linearGradient id="folder-kraft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4BA99" />
                      <stop offset="100%" stopColor="#AC8D65" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="94" height="94" rx="22" fill="url(#tile-bg-2)" stroke="#E0D6C4" strokeWidth="1.5" />
                  <rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1" />
                  <g>
                    <rect x="19" y="20" width="58" height="60" rx="6" fill="#6B2820" transform="rotate(-5 48 50)" />
                  </g>
                  <g>
                    <rect x="22" y="17" width="56" height="64" rx="5" fill="url(#folder-kraft)" stroke="#8F724E" strokeWidth="1" />
                    <path d="M30 14 L30 29 L35 25 L40 29 L40 14 Z" fill="#4B6038" />
                    <path d="M22 28 C17 32 17 48 22 52" stroke="#485834" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <circle cx="21" cy="40" r="2.5" fill="#3E4C2C" />
                    <path d="M20 41 C16 45 15 50 16 54" stroke="#485834" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M22 41 C21 47 23 52 25 56" stroke="#485834" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="37" cy="65" r="10" fill="#9F845F" stroke="#485834" strokeWidth="2" />
                    <circle cx="37" cy="65" r="8.2" fill="none" stroke="#485834" strokeWidth="1" />
                    <polygon points="37,59 39,63.5 44,63.5 40,66.5 41.5,71 37,68 32.5,71 34,66.5 30,63.5 35,63.5" fill="#485834" />
                  </g>
                  <g transform="rotate(7 63 47)">
                    <rect x="44" y="24" width="34" height="40" rx="2" fill="#FAF6EE" stroke="#D3C9B8" strokeWidth="1" />
                    <rect x="47" y="27" width="28" height="28" fill="#38322B" />
                    <path d="M47 48 C52 42 56 46 62 40 C68 44 72 38 75 42 L75 55 L47 55 Z" fill="#696155" />
                    <path d="M52 43 C56 36 60 41 63 37 C67 40 70 34 75 39 L75 50 L52 50 Z" fill="#887F70" />
                    <circle cx="65" cy="33" r="3" fill="#D3CBBE" opacity="0.8" />
                    <line x1="49" y1="59" x2="63" y2="59" stroke="#B8AFA0" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
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
                  width="84"
                  height="84"
                  className="source-icon-svg drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="tile-bg-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCFAF6" />
                      <stop offset="100%" stopColor="#EBE3D5" />
                    </linearGradient>
                    <linearGradient id="terrain-clay" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DFC4A3" />
                      <stop offset="100%" stopColor="#BA9E7E" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="94" height="94" rx="22" fill="url(#tile-bg-3)" stroke="#E0D6C4" strokeWidth="1.5" />
                  <rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1" />
                  <g>
                    <rect x="18" y="18" width="64" height="64" rx="8" fill="url(#terrain-clay)" stroke="#A48769" strokeWidth="1.2" />
                    <path d="M22 34 C30 28 42 32 48 38 C54 44 46 56 36 58 C26 60 20 48 22 34 Z" fill="none" stroke="#9E8062" strokeWidth="1.7" />
                    <path d="M26 38 C32 34 40 36 43 41 C46 46 41 52 35 53 C29 54 25 47 26 38 Z" fill="none" stroke="#8F7154" strokeWidth="1.5" />
                    <path d="M30 42 C34 39 38 41 39 44 C40 47 37 50 33 50 C30 50 28 46 30 42 Z" fill="#9E8062" opacity="0.3" />
                    <path d="M38 66 C46 58 56 60 62 68 C68 76 56 82 46 80 C38 78 34 72 38 66 Z" fill="none" stroke="#9E8062" strokeWidth="1.5" />
                    <path d="M42 69 C48 64 54 65 57 70 C60 75 52 78 46 77 C42 76 39 72 42 69 Z" fill="none" stroke="#8F7154" strokeWidth="1.2" />
                    <polygon points="26,24 31,22 34,26 29,29" fill="#9B4B38" />
                    <polygon points="68,58 72,56 74,60 70,62" fill="#9B4B38" />
                    <polygon points="23,65 27,64 28,68 24,70" fill="#9B4B38" />
                    <polygon points="62,25 65,23 67,26 63,28" fill="#9B4B38" />
                    <path d="M38,28 Q40,22 41,20 M40,24 Q43,21 45,21" stroke="#486236" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M54,48 Q56,43 58,42 M56,46 Q59,44 61,45" stroke="#486236" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <path d="M68,70 Q70,66 72,65 M70,68 Q73,67 75,68" stroke="#486236" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                  </g>
                  {/* Kính lúp */}
                  <g>
                    <circle cx="68" cy="30" r="12" fill="#E8F4F8" fillOpacity="0.88" stroke="#632E22" strokeWidth="2.5" />
                    <circle cx="68" cy="30" r="10" fill="none" stroke="#C49B71" strokeWidth="1.5" />
                    <path d="M62 24 C64 22 68 22 72 24" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    <line x1="77" y1="39" x2="88" y2="50" stroke="#7E3122" strokeWidth="4.5" strokeLinecap="round" />
                    <circle cx="88" cy="50" r="2.5" fill="#582117" />
                  </g>
                  {/* Xẻng khai quật */}
                  <g transform="rotate(-15 65 65)">
                    <path d="M54 62 L64 62 C64 72 59 78 54 80 C49 78 44 72 44 62 Z" fill="#69737D" stroke="#434B52" strokeWidth="1.5" />
                    <path d="M49 63 L49 76" stroke="#909CA6" strokeWidth="1.5" />
                    <line x1="54" y1="62" x2="54" y2="44" stroke="#873526" strokeWidth="3" strokeLinecap="round" />
                    <path d="M50 44 L58 44 L58 38 L50 38 Z" fill="#5A2319" stroke="#3D1710" strokeWidth="1" />
                    <rect x="52" y="40" width="4" height="2" fill="#FAF5ED" />
                  </g>
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
                  width="84"
                  height="84"
                  className="source-icon-svg drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="tile-bg-4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCFAF6" />
                      <stop offset="100%" stopColor="#EBE3D5" />
                    </linearGradient>
                    <linearGradient id="jacket-green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#556E42" />
                      <stop offset="100%" stopColor="#3C4F2E" />
                    </linearGradient>
                    <linearGradient id="speech-bubble-red" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B24733" />
                      <stop offset="100%" stopColor="#843021" />
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="94" height="94" rx="22" fill="url(#tile-bg-4)" stroke="#E0D6C4" strokeWidth="1.5" />
                  <rect x="5" y="5" width="90" height="90" rx="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="1" />
                  <path d="M55 76 C65 64 74 68 85 78 L85 88 L55 88 Z" fill="#D6B898" opacity="0.6" />
                  <path d="M68 72 C74 65 80 67 85 73 L85 80 L68 80 Z" fill="#B89472" opacity="0.8" />
                  {/* Bong bóng âm thanh */}
                  <g>
                    <rect x="54" y="20" width="34" height="24" rx="10" fill="url(#speech-bubble-red)" stroke="#682519" strokeWidth="1" />
                    <polygon points="56,38 49,43 58,42" fill="#843021" />
                    <line x1="60" y1="32" x2="60" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="64" y1="28" x2="64" y2="36" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="68" y1="26" x2="68" y2="38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="72" y1="24" x2="72" y2="40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="76" y1="27" x2="76" y2="37" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="80" y1="30" x2="80" y2="34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  </g>
                  {/* Chân dung cựu chiến binh */}
                  <g>
                    <path d="M18 88 C18 76 22 66 32 64 L42 69 L52 64 C60 67 66 76 66 88 Z" fill="url(#jacket-green)" stroke="#2B3920" strokeWidth="1.2" />
                    <path d="M32 64 L36 76 L42 70 L48 76 L52 64 Z" fill="#6A8753" />
                    <path d="M42 70 L42 88" stroke="#2B3920" strokeWidth="1.5" />
                    <rect x="23" y="74" width="11" height="9" rx="1.5" fill="#4B603A" stroke="#2B3920" strokeWidth="0.8" />
                    <line x1="23" y1="76" x2="34" y2="76" stroke="#2B3920" strokeWidth="1" />
                    <circle cx="28.5" cy="76" r="1" fill="#D3CBBE" />
                    <rect x="50" y="74" width="11" height="9" rx="1.5" fill="#4B603A" stroke="#2B3920" strokeWidth="0.8" />
                    <line x1="50" y1="76" x2="61" y2="76" stroke="#2B3920" strokeWidth="1" />
                    <circle cx="55.5" cy="76" r="1" fill="#D3CBBE" />
                    <polygon points="38,62 46,62 42,70" fill="#782E22" />
                    <rect x="38" y="55" width="8" height="9" rx="2" fill="#C48E66" />
                    <ellipse cx="42" cy="46" rx="11" ry="13" fill="#D6A078" />
                    <path d="M31 43 C31 33 36 29 42 29 C48 29 53 33 53 43 C50 36 45 35 42 35 C38 35 34 37 31 43 Z" fill="#EAE6DF" stroke="#BCB5A8" strokeWidth="0.8" />
                    <path d="M35 41 Q38 40 40 42" stroke="#684732" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M44 42 Q46 40 49 41" stroke="#684732" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M36 44 Q38 43 40 45" stroke="#4A3022" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M44 45 Q46 43 48 44" stroke="#4A3022" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M38 38 Q42 37 46 38" stroke="#B2825E" strokeWidth="0.8" fill="none" />
                    <path d="M38 35 Q42 34 46 35" stroke="#B2825E" strokeWidth="0.8" fill="none" />
                    <path d="M42 43 L41 49 L44 49" stroke="#8A5C3C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M38 53 Q42 54 46 53" stroke="#7A4C30" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M34 50 Q42 59 50 50" stroke="#B2825E" strokeWidth="0.8" fill="none" />
                  </g>
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
                <h2 className="title-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#181513] leading-tight tracking-tight">
                  Sơ đồ tìm kiếm, quy tập hài cốt liệt sĩ
                  <span className="block mt-1 sm:mt-1.5 text-xl sm:text-2xl lg:text-3xl font-bold text-[#b5121b]">
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
                      Diện tích: <span className="font-extrabold">khoảng 800m2</span>
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
                      Diện tích: <span className="font-extrabold">khoảng 1.200m2</span>
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
                      Diện tích: <span className="font-extrabold">khoảng 500m2</span>
                    </div>
                  </div>

                  {/* Ô 4: Khu vực tìm kiếm mở rộng */}
                  <div className="neu-card p-4">
                    <span className="text-sm font-extrabold text-[#1c406d] block mb-1">
                      KHU VỰC TÌM KIẾM MỞ RỘNG
                    </span>
                    <div className="text-xs font-bold text-[#181513] mt-2">
                      Diện tích: <span className="font-extrabold">khoảng 5.800m2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: CÁC SỐ LIỆU INFOGRAPHIC TƯƠNG TÁC (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Thẻ 1: Lực lượng lấy mẫu & Rà soát */}
              <div className="neu-card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
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

                <div className="neu-inset p-4 border-t-3 border-[#a2681a] bg-[#fdf8ee] flex items-center justify-between flex-wrap gap-2">
                  <div className="text-sm sm:text-base font-bold text-[#181513]">
                    Rà soát, chuẩn hoá hơn
                  </div>
                  <div className="stat-number-gold text-2xl sm:text-3xl leading-none">
                    {counts.reviewedHeroes.toLocaleString('vi-VN')}+
                  </div>
                  <div className="text-xs font-semibold text-[#a2681a]">
                    liệt sĩ
                  </div>
                </div>
              </div>

              {/* Thẻ 2: 731 Hài cốt liệt sĩ đã tìm thấy */}
              <div
                className="neu-card p-6 cursor-pointer"
                onClick={() => setRemainsExpanded(!remainsExpanded)}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div className="stat-number text-5xl leading-none">
                    {counts.totalRemains}
                  </div>
                  <div className="neu-inset px-3 py-1 text-xs font-bold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] rounded-full">
                    Tính đến ngày 5-10
                  </div>
                </div>

                <p className="text-base font-bold text-[#181513] leading-snug mb-2">
                  Tổng số hài cốt liệt sĩ đã tìm thấy
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#dcd4c7] text-xs font-bold text-[#c5221f]">
                  <span>
                    {remainsExpanded
                      ? 'Chạm để thu gọn 3 chỉ số thành phần'
                      : 'Chạm để xem 3 chỉ số thành phần'}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f1ebe1] transition-transform duration-300 ${
                      remainsExpanded ? 'rotate-180 bg-[#c5221f] text-white' : ''
                    }`}
                  >
                    ▾
                  </span>
                </div>

                {/* 3 chỉ số thành phần */}
                {remainsExpanded && (
                  <div className="mt-3.5 grid grid-cols-3 gap-2.5">
                    <div className="neu-inset p-3 text-center">
                      <div className="stat-number-dark text-xl sm:text-2xl">
                        {counts.singleRemains}
                      </div>
                      <div className="text-[11px] sm:text-xs font-semibold text-[#6e665e] mt-1">
                        Hài cốt riêng lẻ
                      </div>
                    </div>

                    <div className="neu-inset p-3 text-center border border-[#c5221f]/35 bg-[#fdf3f2]">
                      <div className="stat-number text-xl sm:text-2xl">
                        {counts.massRemains}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-[#c5221f] mt-1">
                        Hài cốt tại mộ tập thể
                      </div>
                    </div>

                    <div className="neu-inset p-3 text-center border border-[#a2681a]/35 bg-[#fdf8ee]">
                      <div className="stat-number-gold text-xl sm:text-2xl">
                        {counts.artifactRemains}
                      </div>
                      <div className="text-[11px] sm:text-xs font-semibold text-[#a2681a] mt-1">
                        Hài cốt có di vật kèm theo
                      </div>
                    </div>
                  </div>
                )}
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
              href="https://www.sggp.org.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 1 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1a1614] article-card-thumb">
                <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block transition-transform duration-500 group-hover:scale-105">
                  <defs>
                    <linearGradient id="g-art-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1f1812" />
                      <stop offset="45%" stopColor="#34251a" />
                      <stop offset="100%" stopColor="#17110c" />
                    </linearGradient>
                    <linearGradient id="gold-beam" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffd572" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#b87920" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="240" fill="url(#g-art-1)" />
                  <path d="M-20,190 Q120,120 220,160 T420,130" fill="none" stroke="#a2681a" strokeWidth="1.2" strokeOpacity="0.35" />
                  <path d="M-20,160 Q100,90 200,130 T420,100" fill="none" stroke="#a2681a" strokeWidth="1.2" strokeOpacity="0.25" />
                  <path d="M-20,220 Q140,150 240,190 T420,160" fill="none" stroke="#a2681a" strokeWidth="1.2" strokeOpacity="0.3" />
                  <polygon points="200,240 140,0 260,0" fill="url(#gold-beam)" />
                  <circle cx="200" cy="100" r="52" fill="#241a12" stroke="#b87920" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="200" cy="100" r="44" fill="#18110b" stroke="#e0a030" strokeWidth="1.5" />
                  <line x1="200" y1="100" x2="200" y2="70" stroke="#ffdd88" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="200" y1="100" x2="224" y2="108" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="200" cy="100" r="4" fill="#ffd572" />
                  <rect x="194" y="42" width="12" height="6" rx="2" fill="#e0a030" />
                  <path d="M330,40 L345,65 L330,60 L315,65 Z" fill="#c5221f" opacity="0.8" />
                  <text x="330" y="32" fill="#e0a030" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">N</text>
                </svg>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 1
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Chạy đua với thời gian
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Chiến dịch 500 ngày đêm tìm kiếm, quy tập và xác định danh tính hài cốt liệt sĩ như một cuộc chạy đua với thời gian để khép lại nỗi đau chiến tranh.
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
              href="https://www.sggp.org.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 2 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1a1614] article-card-thumb">
                <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block transition-transform duration-500 group-hover:scale-105">
                  <defs>
                    <linearGradient id="g-art-2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#142019" />
                      <stop offset="50%" stopColor="#1f3326" />
                      <stop offset="100%" stopColor="#101913" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="240" fill="url(#g-art-2)" />
                  <polygon points="-20,240 80,110 180,180 270,70 360,160 420,100 420,240" fill="#0d1510" opacity="0.6" />
                  <polygon points="40,240 140,80 220,150 310,50 390,130 420,240" fill="#18271e" opacity="0.8" />
                  <polygon points="-10,240 90,140 180,210 280,110 370,190 420,240" fill="#243b2e" opacity="0.9" />
                  <path d="M0,170 Q100,150 200,165 T400,155 L400,185 Q300,175 200,185 T0,175 Z" fill="#ffffff" opacity="0.12" />
                  <circle cx="310" cy="50" r="5" fill="#e0a030" />
                  <circle cx="310" cy="50" r="11" fill="none" stroke="#e0a030" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="325" y="46" fill="#ffd572" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ĐIỂM CAO 685</text>
                  <path d="M120,185 L125,170 L128,170 L130,185 L126,185 Z" fill="#e0a030" />
                  <circle cx="126" cy="166" r="3" fill="#e0a030" />
                  <rect x="122" y="172" width="4" height="6" fill="#b87920" />
                </svg>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 2
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Theo dấu tích giữa chiến trường xưa
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Hành trình của các cán bộ, chiến sĩ vượt vách đá tai mèo hiểm trở, băng rừng lội suối tại điểm cao 400 và 685 Vị Xuyên để đưa đồng đội trở về.
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
              href="https://www.sggp.org.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 3 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1a1614] article-card-thumb">
                <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block transition-transform duration-500 group-hover:scale-105">
                  <defs>
                    <linearGradient id="g-art-3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0e1a2b" />
                      <stop offset="50%" stopColor="#142842" />
                      <stop offset="100%" stopColor="#0a121e" />
                    </linearGradient>
                    <linearGradient id="dna-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="240" fill="url(#g-art-3)" />
                  <g transform="translate(100, 30)">
                    <path d="M0,80 Q50,20 100,80 T200,80" fill="none" stroke="url(#dna-glow)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M0,80 Q50,140 100,80 T200,80" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
                    <line x1="25" y1="48" x2="25" y2="112" stroke="#93c5fd" strokeWidth="1.8" strokeDasharray="2 3" />
                    <line x1="50" y1="23" x2="50" y2="137" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="75" y1="48" x2="75" y2="112" stroke="#93c5fd" strokeWidth="1.8" strokeDasharray="2 3" />
                    <line x1="100" y1="80" x2="100" y2="80" stroke="#4ade80" strokeWidth="4" />
                    <line x1="125" y1="112" x2="125" y2="48" stroke="#93c5fd" strokeWidth="1.8" strokeDasharray="2 3" />
                    <line x1="150" y1="137" x2="150" y2="23" stroke="#4ade80" strokeWidth="2" />
                    <line x1="175" y1="112" x2="175" y2="48" stroke="#93c5fd" strokeWidth="1.8" strokeDasharray="2 3" />
                  </g>
                  <path d="M40,190 L75,190 L70,165 L60,165 L60,135 L50,135 L50,165 L45,165 Z" fill="#60a5fa" opacity="0.4" />
                  <circle cx="330" cy="120" r="30" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                  <circle cx="330" cy="120" r="6" fill="#4ade80" />
                  <text x="330" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">GEN: 9.854 MẪU</text>
                </svg>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 3
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Để có những cuộc trở về
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Đột phá công nghệ giám định ADN và xây dựng cơ sở dữ liệu gen – chìa khóa mở ra hy vọng trả lại tên cho hàng trăm ngàn liệt sĩ vô danh.
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
              href="https://www.sggp.org.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 4 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1a1614] article-card-thumb">
                <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block transition-transform duration-500 group-hover:scale-105">
                  <defs>
                    <linearGradient id="g-art-4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2a1114" />
                      <stop offset="50%" stopColor="#42181c" />
                      <stop offset="100%" stopColor="#1e0a0d" />
                    </linearGradient>
                    <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#e0a030" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#a2681a" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="240" fill="url(#g-art-4)" />
                  <circle cx="200" cy="115" r="90" fill="url(#star-glow)" />
                  <polygon points="200,60 212,98 252,98 220,122 232,160 200,136 168,160 180,122 148,98 188,98" fill="#ffd700" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M130,175 Q160,195 200,195 T270,175" fill="none" stroke="#ffd700" strokeWidth="2" strokeOpacity="0.7" />
                  <path d="M125,170 Q115,140 130,110" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeOpacity="0.4" />
                  <path d="M275,170 Q285,140 270,110" fill="none" stroke="#ffd700" strokeWidth="1.5" strokeOpacity="0.4" />
                  <rect x="188" y="195" width="24" height="20" fill="#a2681a" rx="2" />
                  <rect x="175" y="215" width="50" height="10" fill="#6b4412" rx="2" />
                </svg>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 4
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Đồng lòng trước lời hứa thiêng liêng
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Mệnh lệnh từ trái tim: Cả hệ thống chính trị, toàn dân và sự hợp tác quốc tế cùng chung sức thực hiện lời hứa tri ân trước các anh hùng liệt sĩ.
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
              href="https://www.sggp.org.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="article-series-card group"
              title="Đọc Bài 5 trên Báo Sài Gòn Giải Phóng"
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1a1614] article-card-thumb">
                <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="w-full h-full block transition-transform duration-500 group-hover:scale-105">
                  <defs>
                    <linearGradient id="g-art-5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#241416" />
                      <stop offset="50%" stopColor="#3d1b22" />
                      <stop offset="100%" stopColor="#180b0e" />
                    </linearGradient>
                    <linearGradient id="flag-red" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c5221f" />
                      <stop offset="100%" stopColor="#8a1311" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="240" fill="url(#g-art-5)" />
                  <path d="M70,80 Q200,60 330,80 L320,165 Q200,185 80,165 Z" fill="url(#flag-red)" stroke="#ffd700" strokeWidth="1.5" strokeOpacity="0.5" />
                  <polygon points="200,95 208,118 232,118 213,132 220,155 200,140 180,155 187,132 168,118 192,118" fill="#ffd700" />
                  <circle cx="95" cy="175" r="9" fill="#ffffff" opacity="0.9" />
                  <circle cx="95" cy="175" r="4" fill="#ffd572" />
                  <circle cx="115" cy="180" r="8" fill="#ffffff" opacity="0.85" />
                  <circle cx="115" cy="180" r="3.5" fill="#ffd572" />
                  <circle cx="78" cy="182" r="7.5" fill="#ffffff" opacity="0.8" />
                  <circle cx="78" cy="182" r="3" fill="#ffd572" />
                  <path d="M280,195 Q270,150 290,120 T280,70" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
                  <path d="M295,195 Q305,155 290,130 T305,80" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
                </svg>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-1.5">
                  <span className="text-[11px] font-extrabold text-[#c5221f] bg-[#fdf3f2] border border-[#f8c8c6] px-2 py-0.5 rounded tracking-wider">
                    BÀI 5
                  </span>
                </div>
                <h3 className="article-card-title title-serif text-base font-bold leading-snug my-1.5 text-[#181513] transition-colors">
                  Dưới cờ Tổ quốc anh về
                </h3>
                <p className="text-xs text-[#6e665e] leading-relaxed mb-4 flex-1">
                  Khúc tràng ca tri ân sâu sắc, nghẹn ngào đón các anh hùng liệt sĩ trở về trong cờ đỏ sao vàng thiêng liêng và đạo lý &ldquo;Uống nước nhớ nguồn&rdquo;.
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
