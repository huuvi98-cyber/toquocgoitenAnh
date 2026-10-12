import React, { useEffect, useRef } from 'react';

interface AnimatedVietnamFlagProps {
  className?: string;
  enableInteraction?: boolean;
}

export const AnimatedVietnamFlag: React.FC<AnimatedVietnamFlagProps> = ({
  className = 'w-full h-full',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let positionBuffer: WebGLBuffer | null = null;

    // Step 1: Render the authentic Vietnam Flag onto an offscreen canvas texture
    const texCanvas = document.createElement('canvas');
    const texW = 2048;
    const texH = 1365; // 3:2 standard flag ratio
    texCanvas.width = texW;
    texCanvas.height = texH;
    const ctx = texCanvas.getContext('2d');

    if (ctx) {
      // 1. Authentic Vietnam Red Flag Background - Richer, vibrant patriotic red
      ctx.fillStyle = '#e51a21';
      ctx.fillRect(0, 0, texW, texH);

      // Subtle fine textile grain
      const imgData = ctx.getImageData(0, 0, texW, texH);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() - 0.5) * 4;
        data[i] = Math.min(255, Math.max(0, data[i] + n));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n * 0.1));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n * 0.1));
      }
      ctx.putImageData(imgData, 0, 0);

      // 2. Central Golden Five-Pointed Star - Nhỏ lại xíu, thanh thoát và trang nhã
      const cx = texW / 2;
      const cy = texH * 0.33; // Placed cleanly below the top horizontal line
      const outerR = texH * 0.16; // Nhỏ lại xíu theo yêu cầu, tạo khoảng đệm thanh thoát
      const innerR = outerR * 0.381966; // Golden ratio star inner radius

      ctx.save();
      ctx.translate(cx, cy);

      // Star Path
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        // Outer point (i = 0 points straight UP at -PI/2)
        const outerAngle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        const ox = Math.cos(outerAngle) * outerR;
        const oy = Math.sin(outerAngle) * outerR;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);

        // Inner point
        const innerAngle = outerAngle + Math.PI / 5;
        const ix = Math.cos(innerAngle) * innerR;
        const iy = Math.sin(innerAngle) * innerR;
        ctx.lineTo(ix, iy);
      }
      // Pure authentic national golden yellow star - balanced and natural
      ctx.fillStyle = '#ffea00';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();
    }

    // Try initializing WebGL
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      gl = null;
    }

    if (!gl) {
      // Fallback: 2D Canvas Ripple Animation
      const ctx2d = canvas.getContext('2d');
      if (!ctx2d) return;

      let startTime = performance.now();
      const render2d = (now: number) => {
        const time = (now - startTime) * 0.0005;
        const w = (canvas.width = canvas.clientWidth);
        const h = (canvas.height = canvas.clientHeight);

        ctx2d.clearRect(0, 0, w, h);
        ctx2d.drawImage(texCanvas, 0, 0, w, h);

        // Animated lighting gradient overlay
        const grad = ctx2d.createLinearGradient(0, 0, w, h);
        const sinWave = Math.sin(time * 1.0);
        grad.addColorStop(0, 'rgba(0,0,0,0.3)');
        grad.addColorStop(0.3 + sinWave * 0.1, 'rgba(255,100,100,0.15)');
        grad.addColorStop(0.7 - sinWave * 0.1, 'rgba(0,0,0,0.4)');
        grad.addColorStop(1, 'rgba(0,0,0,0.6)');
        ctx2d.fillStyle = grad;
        ctx2d.fillRect(0, 0, w, h);

        animationFrameId = requestAnimationFrame(render2d);
      };
      animationFrameId = requestAnimationFrame(render2d);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }

    // WebGL Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // WebGL Fragment Shader with Silk Physics, 3D Normals & Dynamic Specular Sheen
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_flagTexture;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Realistic wave function mimicking wind blowing diagonally across red silk
      float getWave(vec2 p, float t) {
        // Wind direction: diagonally from upper-left to bottom-right
        vec2 windDir = normalize(vec2(1.0, 0.42));
        float d = dot(p, windDir);

        // Slow down time factor for a graceful, stately, slow breeze
        float st = t * 0.35;

        // Primary deep rolling wave - gentle, slow undulating folds
        float w1 = sin(d * 4.8 - st * 2.0 + p.y * 1.3) * 0.085;
        
        // Secondary flowing wave
        float w2 = sin(d * 8.6 - st * 3.0 - p.y * 1.7) * 0.032;

        // Silk ripple flutter - relaxed frequency
        float w3 = sin(d * 16.5 - st * 4.2 + p.x * 2.2) * 0.01;

        // Fine silk vibration
        float w4 = sin(d * 32.0 - st * 5.5) * 0.003;

        // Combined height displacement
        return w1 + w2 + w3 + w4;
      }

      void main() {
        // Aspect ratio handling: preserve the center & cover the viewport smoothly
        vec2 uv = v_uv;
        float screenAspect = u_resolution.x / u_resolution.y;
        float flagAspect = 2048.0 / 1365.0; // 1.5 ratio

        vec2 texCoord = uv;
        if (screenAspect > flagAspect) {
          float scale = flagAspect / screenAspect;
          texCoord.y = (uv.y - 0.5) * scale + 0.5;
        } else {
          float scale = screenAspect / flagAspect;
          texCoord.x = (uv.x - 0.5) * scale + 0.5;
        }

        float t = u_time;

        // Sample finite difference to compute precise surface normal in 3D
        float eps = 0.005;
        float h0 = getWave(uv, t);
        float hX = getWave(uv + vec2(eps, 0.0), t);
        float hY = getWave(uv + vec2(0.0, eps), t);

        // Displace texture coordinate along 3D wave folds
        vec2 waveOffset = vec2(-(hX - h0) / eps, -(hY - h0) / eps) * 0.024;
        vec2 sampleUV = clamp(texCoord + waveOffset, 0.002, 0.998);

        // Fetch official flag base color
        vec4 baseColor = texture2D(u_flagTexture, sampleUV);

        // Surface normal
        vec3 normal = normalize(vec3(-(hX - h0) / eps * 2.8, -(hY - h0) / eps * 2.8, 1.0));

        // Key light source: warm directional light from top-left (cinematic sunlight)
        vec3 lightDir = normalize(vec3(-0.35, 0.65, 0.68));
        float diff = max(dot(normal, lightDir), 0.0);

        // View vector (camera looking straight at screen)
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);

        // Specular highlight: silk fabric sheen along the crests
        float spec = pow(max(dot(normal, halfDir), 0.0), 22.0) * 0.38;

        // Rim light / silk Fresnel sheen
        float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.8) * 0.28;

        // Shadow & Ambient illumination
        // Rich warm ambient illumination to keep patriotic red luminous in folds
        float ambient = 0.48;
        float shade = ambient + diff * 0.52;

        // Crease shadow enhancement (softened so reds don't muddy into black)
        float troughShadow = smoothstep(-0.06, 0.06, h0) * 0.22 + 0.78;
        shade *= troughShadow;

        // Combine lighting
        vec3 litColor = baseColor.rgb * shade;

        // Enhance vivid crimson-red saturation selectively on flag fabric
        if (baseColor.r > baseColor.g * 1.35) {
          litColor.r = min(1.0, litColor.r * 1.12);
          litColor.g *= 0.88;
          litColor.b *= 0.88;
        }

        // Authentic golden star lighting - balanced, rich, and natural
        if (baseColor.r > 0.65 && baseColor.g > 0.65 && baseColor.b < 0.45) {
          litColor = mix(litColor, vec3(1.0, 0.92, 0.1) * 1.08, 0.22);
          litColor += vec3(0.06, 0.05, 0.0);
        }

        // Add warm golden silk sheen on crests
        litColor += vec3(1.0, 0.88, 0.65) * spec;

        // Add vibrant ruby silk rim reflection
        litColor += vec3(1.0, 0.15, 0.15) * rim * 1.35;

        // Fine textile thread micro-grain
        float grain = (fract(sin(dot(uv * 750.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
        litColor += grain;

        // Cinematic vignette (brighter edges so red isn't muted)
        vec2 vigUV = uv * (1.0 - uv.yx);
        float vig = vigUV.x * vigUV.y * 15.0;
        vig = clamp(pow(vig, 0.32), 0.0, 1.0);
        litColor *= (0.55 + 0.45 * vig);

        gl_FragColor = vec4(litColor, 1.0);
      }
    `;

    // Compile shader helper
    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad buffer
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // Upload offscreen canvas as WebGL texture
    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texCanvas);

    // Uniform locations
    const uFlagTextureLoc = gl.getUniformLocation(program, 'u_flagTexture');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    gl.uniform1i(uFlagTextureLoc, 0);

    const startTime = performance.now();

    const resize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    window.addEventListener('resize', resize);
    resize();

    // Animation Loop
    const render = (now: number) => {
      if (!gl || !program) return;

      const elapsed = (now - startTime) * 0.001;

      resize();

      gl.useProgram(program);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (gl) {
        if (texture) gl.deleteTexture(texture);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Animated WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};
