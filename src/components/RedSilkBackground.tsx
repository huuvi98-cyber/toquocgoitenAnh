import React, { useEffect, useRef } from 'react';

interface RedSilkBackgroundProps {
  className?: string;
}

/**
 * RedSilkBackground - Phục dựng chính xác bề mặt lụa gấm đỏ cao cấp (theo ảnh 1069.jpg)
 * với các nếp lượn sóng satin mềm mại, ánh sáng tơ lụa óng ả và chiều sâu trang trọng.
 */
export const RedSilkBackground: React.FC<RedSilkBackgroundProps> = ({ className = 'w-full h-full' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (width === 0 || height === 0) return;
      time += 0.003; // Hiệu ứng thở nhẹ nhàng, cực kỳ tinh tế

      // 1. Nền đỏ gấm cơ bản: Chuyển màu từ đỏ thắm nhung sang đỏ tươi rực sáng
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#780308');   // Đỏ nhung sẫm góc trên
      bgGrad.addColorStop(0.25, '#9e090f');
      bgGrad.addColorStop(0.55, '#c5151c'); // Đỏ cờ tươi thắm
      bgGrad.addColorStop(0.85, '#dc2520'); // Đỏ son ấm áp
      bgGrad.addColorStop(1, '#e8382c');   // Vệt sáng đỏ rực góc dưới
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Vệt sáng tỏa góc dưới phải (theo ảnh 1069.jpg)
      const glowGrad = ctx.createRadialGradient(
        width * 0.85, height * 0.9, 0,
        width * 0.85, height * 0.9, width * 0.7
      );
      glowGrad.addColorStop(0, 'rgba(255, 75, 45, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(230, 30, 25, 0.18)');
      glowGrad.addColorStop(1, 'rgba(150, 5, 10, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Các nếp lụa satin uốn lượn ở phần trên (Satin Drapery Folds)
      ctx.save();

      // Nếp lụa 1: Sóng lớn từ góc trên trái tràn xuống giữa (Deep Left Wave)
      const wave1Grad = ctx.createLinearGradient(0, 0, width * 0.6, height * 0.45);
      wave1Grad.addColorStop(0, 'rgba(255, 95, 70, 0.6)');
      wave1Grad.addColorStop(0.3, 'rgba(220, 25, 25, 0.35)');
      wave1Grad.addColorStop(0.7, 'rgba(80, 0, 5, 0.55)');
      wave1Grad.addColorStop(1, 'rgba(120, 5, 10, 0)');

      ctx.beginPath();
      ctx.moveTo(-50, -20);
      const shift1 = Math.sin(time) * 10;
      ctx.bezierCurveTo(
        width * 0.15, height * 0.22 + shift1,
        width * 0.35, height * 0.38 - shift1,
        width * 0.7, height * 0.25
      );
      ctx.bezierCurveTo(
        width * 0.5, height * 0.05,
        width * 0.2, -50,
        -50, -20
      );
      ctx.fillStyle = wave1Grad;
      ctx.filter = 'blur(16px)';
      ctx.fill();

      // Nếp lụa 2: Dải bóng tối tạo chiều sâu khối (Velvet Crease Shadow)
      const shadowGrad = ctx.createLinearGradient(width * 0.1, 0, width * 0.5, height * 0.4);
      shadowGrad.addColorStop(0, 'rgba(60, 0, 5, 0.7)');
      shadowGrad.addColorStop(0.4, 'rgba(85, 2, 8, 0.6)');
      shadowGrad.addColorStop(0.8, 'rgba(120, 5, 12, 0.2)');
      shadowGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(width * 0.05, -30);
      ctx.bezierCurveTo(
        width * 0.2, height * 0.25,
        width * 0.45, height * 0.32,
        width * 0.85, height * 0.28
      );
      ctx.bezierCurveTo(
        width * 0.6, height * 0.38,
        width * 0.25, height * 0.35,
        width * 0.02, height * 0.15
      );
      ctx.closePath();
      ctx.fillStyle = shadowGrad;
      ctx.filter = 'blur(20px)';
      ctx.fill();

      // Nếp lụa 3: Sống lụa óng ả (Satin Ridge Highlight)
      const highlightGrad = ctx.createLinearGradient(0, height * 0.15, width * 0.8, height * 0.1);
      highlightGrad.addColorStop(0, 'rgba(255, 160, 140, 0)');
      highlightGrad.addColorStop(0.2, 'rgba(255, 140, 110, 0.5)');
      highlightGrad.addColorStop(0.5, 'rgba(255, 110, 80, 0.65)');
      highlightGrad.addColorStop(0.8, 'rgba(255, 80, 60, 0.3)');
      highlightGrad.addColorStop(1, 'rgba(255, 80, 60, 0)');

      ctx.beginPath();
      ctx.moveTo(0, height * 0.05);
      const shift2 = Math.cos(time * 0.8) * 8;
      ctx.bezierCurveTo(
        width * 0.25, height * 0.12 + shift2,
        width * 0.55, height * 0.28 - shift2,
        width * 0.95, height * 0.22
      );
      ctx.lineWidth = 28;
      ctx.strokeStyle = highlightGrad;
      ctx.filter = 'blur(12px)';
      ctx.stroke();

      // Nếp lụa 4: Vệt lượn sóng phụ phía trên bên phải (Top Right Drapery)
      const wave4Grad = ctx.createLinearGradient(width * 0.5, 0, width, height * 0.35);
      wave4Grad.addColorStop(0, 'rgba(255, 120, 90, 0.45)');
      wave4Grad.addColorStop(0.4, 'rgba(210, 20, 20, 0.3)');
      wave4Grad.addColorStop(0.8, 'rgba(90, 2, 8, 0.55)');
      wave4Grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(width * 0.45, -20);
      ctx.bezierCurveTo(
        width * 0.65, height * 0.18,
        width * 0.82, height * 0.22,
        width + 50, height * 0.28
      );
      ctx.lineTo(width + 50, -20);
      ctx.closePath();
      ctx.fillStyle = wave4Grad;
      ctx.filter = 'blur(18px)';
      ctx.fill();

      // 4. Ánh satin phản quang tinh xảo (Subtle Silk Sheen)
      const sheenGrad = ctx.createLinearGradient(0, height * 0.3, width, height * 0.4);
      sheenGrad.addColorStop(0, 'transparent');
      sheenGrad.addColorStop(0.3, 'rgba(255, 200, 180, 0.08)');
      sheenGrad.addColorStop(0.7, 'rgba(255, 180, 150, 0.12)');
      sheenGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sheenGrad;
      ctx.filter = 'none';
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden pointer-events-none ${className}`}>
      {/* Background Canvas: Kết xuất nếp sóng lụa đỏ satin mượt mà */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

      {/* Lớp phủ dệt sợi tơ lụa tinh tế (Fine Silk Texture Scrim) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25 mix-blend-multiply" />
    </div>
  );
};
