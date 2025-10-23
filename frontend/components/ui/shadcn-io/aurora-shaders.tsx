'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface AuroraShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Aurora wave speed
   * @default 1.0
   */
  speed?: number;
  /**
   * Light intensity and brightness
   * @default 1.0
   */
  intensity?: number;
  /**
   * Color vibrancy and saturation
   * @default 1.0
   */
  vibrancy?: number;
  /**
   * Wave frequency and complexity
   * @default 1.0
   */
  frequency?: number;
  /**
   * Vertical stretch of aurora bands
   * @default 1.0
   */
  stretch?: number;
}

// Vertex Shader
const vertexShaderSource = `
attribute vec2 position;
varying vec2 vUv;

void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment Shader
const fragmentShaderSource = `
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_speed;
uniform float u_intensity;
uniform float u_vibrancy;
uniform float u_frequency;
uniform float u_stretch;

varying vec2 vUv;

// Noise function for organic movement
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Smooth noise for flowing effects
float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal noise for complex aurora patterns
float fractalNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = vUv;
    
    // Time with speed control
    float t = u_time * u_speed;
    
    // Create vertical gradient for aurora positioning
    float verticalGradient = 1.0 - abs(uv.y - 0.5) * 2.0;
    verticalGradient = pow(verticalGradient, u_stretch);
    
    // Create flowing horizontal movement
    vec2 flowUV = vec2(uv.x + t * 0.1, uv.y);
    
    // Generate multiple aurora layers with different characteristics
    float aurora1 = fractalNoise(flowUV * u_frequency * 3.0 + vec2(t * 0.2, 0.0));
    float aurora2 = fractalNoise(flowUV * u_frequency * 2.0 + vec2(t * 0.15, 1000.0));
    float aurora3 = fractalNoise(flowUV * u_frequency * 4.0 + vec2(t * 0.25, 2000.0));
    
    // Add wave distortion for organic movement
    float wave1 = sin(uv.x * 8.0 + t * 2.0) * 0.1;
    float wave2 = sin(uv.x * 12.0 + t * 1.5) * 0.05;
    float distortedY = uv.y + wave1 + wave2;
    
    // Apply vertical positioning to aurora layers
    aurora1 *= smoothstep(0.3, 0.7, distortedY) * smoothstep(0.8, 0.6, distortedY);
    aurora2 *= smoothstep(0.4, 0.6, distortedY) * smoothstep(0.7, 0.5, distortedY);
    aurora3 *= smoothstep(0.35, 0.65, distortedY) * smoothstep(0.75, 0.55, distortedY);
    
    // Combine aurora layers
    float combinedAurora = (aurora1 * 0.6 + aurora2 * 0.8 + aurora3 * 0.4) * verticalGradient;
    
    // Apply intensity scaling
    combinedAurora *= u_intensity;
    
    // Valuto green theme colors (matching the brand)
    vec3 color1 = vec3(0.05, 0.4, 0.15);   // Deep green
    vec3 color2 = vec3(0.08, 0.64, 0.29);  // Valuto green
    vec3 color3 = vec3(0.13, 0.8, 0.4);    // Light green
    vec3 color4 = vec3(0.47, 0.87, 0.5);   // Pale green
    
    // Create color zones based on vertical position
    float colorMix1 = smoothstep(0.2, 0.4, uv.y);
    float colorMix2 = smoothstep(0.4, 0.6, uv.y);
    float colorMix3 = smoothstep(0.6, 0.8, uv.y);
    
    // Mix colors for natural aurora appearance
    vec3 finalColor = mix(color1, color2, colorMix1);
    finalColor = mix(finalColor, color3, colorMix2);
    finalColor = mix(finalColor, color4, colorMix3);
    
    // Apply vibrancy control
    vec3 desaturated = vec3(dot(finalColor, vec3(0.299, 0.587, 0.114)));
    finalColor = mix(desaturated, finalColor, u_vibrancy);
    
    // Apply aurora intensity
    finalColor *= combinedAurora;
    
    // Use pure white as the background
    vec3 baseColor = vec3(1.0, 1.0, 1.0); // Pure white background
    finalColor = mix(baseColor, finalColor, combinedAurora);
    
    // Add atmospheric glow at horizon
    float horizonGlow = exp(-abs(uv.y - 0.5) * 8.0) * 0.1;
    finalColor += finalColor * horizonGlow;
    
    // Ensure colors stay in valid range
    finalColor = clamp(finalColor, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const AuroraShaders = forwardRef<HTMLDivElement, AuroraShadersProps>(
  (
    {
      className,
      speed = 1.0,
      intensity = 1.0,
      vibrancy = 1.0,
      frequency = 1.0,
      stretch = 1.0,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();
    const programRef = useRef<WebGLProgram | null>(null);
    const glRef = useRef<WebGLRenderingContext | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Initialize WebGL context
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }
      glRef.current = gl;

      // Compile shader
      const compileShader = (source: string, type: number): WebGLShader | null => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        
        return shader;
      };

      // Create program
      const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
      const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
      
      if (!vertexShader || !fragmentShader) {
        console.error('Failed to compile shaders');
        return;
      }

      const program = gl.createProgram();
      if (!program) {
        console.error('Failed to create program');
        return;
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return;
      }

      programRef.current = program;
      gl.useProgram(program);

      // Create vertex buffer (full-screen quad)
      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      // Get uniform locations
      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
      const speedLocation = gl.getUniformLocation(program, 'u_speed');
      const intensityLocation = gl.getUniformLocation(program, 'u_intensity');
      const vibrancyLocation = gl.getUniformLocation(program, 'u_vibrancy');
      const frequencyLocation = gl.getUniformLocation(program, 'u_frequency');
      const stretchLocation = gl.getUniformLocation(program, 'u_stretch');

      // Set viewport
      const resize = () => {
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
      };
      resize();

      // Animation loop
      const startTime = Date.now();
      const render = () => {
        if (!gl || !programRef.current) return;

        resize();

        const currentTime = (Date.now() - startTime) / 1000;

        gl.uniform1f(timeLocation, currentTime);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(speedLocation, speed);
        gl.uniform1f(intensityLocation, intensity);
        gl.uniform1f(vibrancyLocation, vibrancy);
        gl.uniform1f(frequencyLocation, frequency);
        gl.uniform1f(stretchLocation, stretch);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        animationFrameRef.current = requestAnimationFrame(render);
      };

      render();

      // Handle window resize
      window.addEventListener('resize', resize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', resize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (gl && programRef.current) {
          gl.deleteProgram(programRef.current);
        }
      };
    }, [speed, intensity, vibrancy, frequency, stretch]);

    return (
      <div
        ref={ref}
        className={cn('w-full h-full', className)}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>
    );
  }
);

AuroraShaders.displayName = 'AuroraShaders';

export default AuroraShaders;

