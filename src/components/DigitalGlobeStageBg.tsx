import React, { useEffect, useRef } from 'react';

/**
 * Animated High-Tech Global Summit & Diplomacy Stage Background
 * Matches the uploaded bg.jpg with:
 * - Upper curved digital globe with animated rotating dot-matrix world continents
 * - Glowing neon cyan curved hemisphere rim
 * - Radiant central atmospheric illumination
 * - 3D perspective floor with animated streaming fiber-optic rays & glowing data nodes
 * - Floating cyber sparks & ambient depth
 */
export const DigitalGlobeStageBg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let rotation = 0;

    // Handle high DPI displays
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Pre-generate continent dot clusters on a virtual sphere (longitude: -180..180, latitude: -60..80)
    // Approximate landmass regions for recognizable globe silhouette
    const landmasses = [
      // Eurasia / Asia
      { latMin: 10, latMax: 70, lonMin: 40, lonMax: 145, density: 0.6 },
      // Southeast Asia / Vietnam area
      { latMin: 8, latMax: 24, lonMin: 100, lonMax: 110, density: 0.9 },
      // Europe
      { latMin: 35, latMax: 65, lonMin: -10, lonMax: 40, density: 0.6 },
      // Africa
      { latMin: -35, latMax: 35, lonMin: -15, lonMax: 50, density: 0.55 },
      // North America
      { latMin: 20, latMax: 70, lonMin: -160, lonMax: -55, density: 0.55 },
      // South America
      { latMin: -55, latMax: 12, lonMin: -80, lonMax: -35, density: 0.55 },
      // Australia
      { latMin: -40, latMax: -12, lonMin: 115, lonMax: 155, density: 0.5 },
    ];

    interface GlobeDot {
      lat: number;
      lon: number;
      size: number;
      alpha: number;
      isAccent?: boolean;
    }

    const globeDots: GlobeDot[] = [];
    const step = 2.8; // degrees step

    for (let lat = -65; lat <= 75; lat += step) {
      for (let lon = -180; lon < 180; lon += step) {
        // Check if inside any landmass
        let inLand = false;
        let density = 0.5;
        let isAccent = false;

        for (const lm of landmasses) {
          if (lat >= lm.latMin && lat <= lm.latMax && lon >= lm.lonMin && lon <= lm.lonMax) {
            inLand = true;
            density = lm.density;
            if (lm.lonMin === 100 && lm.latMin === 8) isAccent = true; // Vietnam / SE Asia highlight
            break;
          }
        }

        if (inLand && Math.random() < density) {
          globeDots.push({
            lat: (lat * Math.PI) / 180,
            lon: (lon * Math.PI) / 180,
            size: isAccent ? 1.6 : 1.1 + Math.random() * 0.6,
            alpha: isAccent ? 0.95 : 0.45 + Math.random() * 0.45,
            isAccent,
          });
        }
      }
    }

    // Floor Perspective Rays & Streamers
    const NUM_RAYS = 56;
    interface Ray {
      angle: number; // -1 to 1 normalized fan
      color: string;
      colorOuter: string;
    }

    const rays: Ray[] = [];
    for (let i = 0; i < NUM_RAYS; i++) {
      const t = (i / (NUM_RAYS - 1)) * 2 - 1; // -1 to 1
      // Non-linear spread for dramatic perspective
      const angle = Math.sign(t) * Math.pow(Math.abs(t), 1.25);
      const isCenter = Math.abs(t) < 0.35;
      const isOuter = Math.abs(t) > 0.7;

      rays.push({
        angle,
        color: isCenter ? '#00f7ff' : isOuter ? '#818cf8' : '#38bdf8',
        colorOuter: isOuter ? '#a855f7' : '#0284c7',
      });
    }

    // Moving Pulses on the Floor Rays
    interface Pulse {
      rayIndex: number;
      progress: number; // 0 to 1
      speed: number;
      size: number;
      brightness: number;
    }

    const pulses: Pulse[] = [];
    for (let i = 0; i < 70; i++) {
      pulses.push({
        rayIndex: Math.floor(Math.random() * NUM_RAYS),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.007,
        size: 1.2 + Math.random() * 2.2,
        brightness: 0.6 + Math.random() * 0.4,
      });
    }

    // Floating Atmospheric Sparks
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
      phase: number;
    }

    const sparks: Spark[] = [];
    for (let i = 0; i < 40; i++) {
      sparks.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.4,
        size: 0.8 + Math.random() * 1.5,
        alpha: 0.3 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      rotation += 0.0018; // Slow majestic rotation of the globe

      ctx.clearRect(0, 0, width, height);

      // 1. BASE BACKGROUND GRADIENTS (Deep royal blue to cyan horizon)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020726'); // Deep dark midnight blue top
      bgGrad.addColorStop(0.35, '#041348');
      bgGrad.addColorStop(0.68, '#062d85'); // Saturated cobalt blue near horizon
      bgGrad.addColorStop(0.72, '#073699');
      bgGrad.addColorStop(1, '#020b33'); // Darker bottom perspective floor
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Central Atmospheric Bloom Glow
      const horizonY = height * 0.69;
      const bloomGrad = ctx.createRadialGradient(
        width / 2,
        horizonY - height * 0.18,
        10,
        width / 2,
        horizonY - height * 0.18,
        width * 0.55
      );
      bloomGrad.addColorStop(0, 'rgba(0, 195, 255, 0.42)');
      bloomGrad.addColorStop(0.3, 'rgba(0, 132, 255, 0.22)');
      bloomGrad.addColorStop(0.7, 'rgba(3, 16, 75, 0.08)');
      bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. UPPER CURVED DIGITAL WORLD GLOBE
      const globeCenterX = width / 2;
      const globeRadius = Math.max(width * 0.58, height * 0.85);
      const globeCenterY = -globeRadius * 0.45; // Globe center above canvas

      // Save context to mask globe dots inside the dome circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(globeCenterX, globeCenterY, globeRadius, 0, Math.PI * 2);
      ctx.clip();

      // Atmospheric dark blue tint inside the globe sphere
      const globeInnerGrad = ctx.createRadialGradient(
        globeCenterX,
        globeCenterY + globeRadius * 0.7,
        globeRadius * 0.1,
        globeCenterX,
        globeCenterY + globeRadius * 0.7,
        globeRadius * 0.9
      );
      globeInnerGrad.addColorStop(0, 'rgba(0, 140, 255, 0.18)');
      globeInnerGrad.addColorStop(0.8, 'rgba(2, 10, 45, 0.05)');
      globeInnerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = globeInnerGrad;
      ctx.fill();

      // Render Dotted Continent Matrix on the rotating sphere
      for (let i = 0; i < globeDots.length; i++) {
        const dot = globeDots[i];
        // Calculate 3D sphere coordinate with Y-axis rotation
        const currentLon = dot.lon + rotation;
        const cosLat = Math.cos(dot.lat);
        const sinLat = Math.sin(dot.lat);

        // 3D coordinates on unit sphere
        const x3d = cosLat * Math.sin(currentLon);
        const y3d = -sinLat;
        const z3d = cosLat * Math.cos(currentLon); // positive = facing viewer

        if (z3d > 0.05) {
          // Front hemisphere visible
          // Sphere surface coordinates
          const screenX = globeCenterX + x3d * globeRadius;
          const screenY = globeCenterY + y3d * globeRadius;

          // Only draw if within visible lower dome (before bottom rim arc)
          const distFromCenter = Math.hypot(screenX - globeCenterX, screenY - globeCenterY);
          if (distFromCenter <= globeRadius - 2 && screenY < horizonY - 10) {
            // Depth modulation & edge fade
            const edgeFade = Math.sin(Math.acos(Math.min(1, distFromCenter / globeRadius)));
            const alpha = dot.alpha * z3d * Math.min(1, edgeFade * 1.5);

            if (alpha > 0.04) {
              ctx.beginPath();
              ctx.arc(screenX, screenY, dot.size, 0, Math.PI * 2);

              if (dot.isAccent) {
                // Brighter cyan/white highlight for Southeast Asia / VN
                ctx.fillStyle = `rgba(180, 250, 255, ${alpha})`;
              } else {
                ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.85})`;
              }
              ctx.fill();
            }
          }
        }
      }
      ctx.restore();

      // 3. GLOWING NEON CYAN GLOBE RIM ARC
      // Glowing outer rim
      ctx.save();
      ctx.beginPath();
      ctx.arc(globeCenterX, globeCenterY, globeRadius, 0, Math.PI * 2);

      // Outer glow layer
      ctx.lineWidth = 14;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.18)';
      ctx.stroke();

      // Mid glow layer
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.45)';
      ctx.stroke();

      // Core sharp luminous beam
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(215, 255, 255, 0.95)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();

      // 4. HORIZON GLOW & LIGHT EMISSION
      const horizonGlow = ctx.createRadialGradient(
        width / 2,
        horizonY,
        5,
        width / 2,
        horizonY,
        width * 0.45
      );
      horizonGlow.addColorStop(0, 'rgba(0, 255, 255, 0.85)');
      horizonGlow.addColorStop(0.15, 'rgba(0, 200, 255, 0.55)');
      horizonGlow.addColorStop(0.4, 'rgba(2, 132, 199, 0.2)');
      horizonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, horizonY - 40, width, 80);

      // 5. 3D PERSPECTIVE FLOOR RAYS & FIBER-OPTIC STREAMS
      const vanishX = width / 2;
      const vanishY = horizonY;

      // Draw perspective guide rays
      for (let i = 0; i < rays.length; i++) {
        const ray = rays[i];
        // Target x at bottom of canvas: wide fan
        const bottomSpread = width * 1.5;
        const targetX = vanishX + ray.angle * bottomSpread;
        const targetY = height + 40;

        // Draw ray line
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(targetX, targetY);

        const rayGrad = ctx.createLinearGradient(vanishX, vanishY, targetX, targetY);
        rayGrad.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
        rayGrad.addColorStop(0.25, ray.color + 'aa');
        rayGrad.addColorStop(0.7, ray.colorOuter + '55');
        rayGrad.addColorStop(1, 'rgba(10, 15, 60, 0.05)');

        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = Math.abs(ray.angle) < 0.2 ? 1.4 : 1.0;
        ctx.stroke();
      }

      // Draw streaming pulses & photon nodes travelling down the rays
      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.rayIndex = Math.floor(Math.random() * rays.length);
        }

        const ray = rays[pulse.rayIndex];
        const bottomSpread = width * 1.5;
        const targetX = vanishX + ray.angle * bottomSpread;
        const targetY = height + 40;

        // Interpolate position along ray
        const px = vanishX + (targetX - vanishX) * pulse.progress;
        const py = vanishY + (targetY - vanishY) * pulse.progress;

        // Trail start position
        const trailLength = 0.08 * pulse.progress; // tail grows as it nears camera
        const tx = vanishX + (targetX - vanishX) * Math.max(0, pulse.progress - trailLength);
        const ty = vanishY + (targetY - vanishY) * Math.max(0, pulse.progress - trailLength);

        // Alpha peaks around progress 0.1 to 0.7, fades near edges
        const fade = Math.sin(pulse.progress * Math.PI);
        const alpha = pulse.brightness * fade;

        // Tail streak
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        const tailGrad = ctx.createLinearGradient(tx, ty, px, py);
        tailGrad.addColorStop(0, 'rgba(0, 160, 255, 0)');
        tailGrad.addColorStop(1, `rgba(180, 255, 255, ${alpha})`);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = pulse.size * (0.8 + pulse.progress * 1.2);
        ctx.stroke();

        // Glowing particle head
        ctx.beginPath();
        ctx.arc(px, py, pulse.size * (0.9 + pulse.progress * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = '#00f7ff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Row of pulsing horizon nodes (matching bg.jpg row of bright dots along horizon)
      const numHorizonNodes = 28;
      for (let i = 0; i < numHorizonNodes; i++) {
        const norm = (i / (numHorizonNodes - 1)) * 2 - 1; // -1 to 1
        const nodeX = vanishX + norm * (width * 0.42);
        const nodeY = horizonY - Math.sin(Math.abs(norm) * Math.PI * 0.5) * 6; // slightly curved arch
        const pulseAnim = Math.sin(time * 3 + i * 0.4) * 0.35 + 0.65;

        // Outer glow
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 4.5 * pulseAnim, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${0.45 * pulseAnim})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // 6. FLOATING CYBER PARTICLES / SPARKS
      for (let s = 0; s < sparks.length; s++) {
        const spark = sparks[s];
        spark.x += spark.vx;
        spark.y += spark.vy;

        // Wrap around
        if (spark.y < 0) spark.y = height;
        if (spark.x < 0) spark.x = width;
        if (spark.x > width) spark.x = 0;

        const pulse = Math.sin(time * spark.pulseSpeed * 60 + spark.phase) * 0.3 + 0.7;
        const currentAlpha = spark.alpha * pulse;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 235, 255, ${currentAlpha})`;
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden bg-[#020726] ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none pointer-events-none"
      />
    </div>
  );
};
