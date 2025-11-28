<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 !w-full !h-full pointer-events-none bg-black-90"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { Renderer, Camera, Transform, Program, Mesh, Plane } from "ogl";

const props = defineProps({
  color: { type: String, required: false, default: null },
  hue: { type: Number, required: false, default: 200 },
  saturation: { type: Number, required: false, default: 0.8 },
  chroma: { type: Number, required: false, default: 0.6 },
  theme: {
    type: String,
    default: "dark",
    validator: (value) => ["dark", "light"].includes(value),
  },
});

const baseHue = ref(props.hue);
const baseSaturation = ref(props.saturation);
const baseChroma = ref(props.chroma);
const directColor = ref(null);
const shouldAnimateHue = computed(() => !props.color);

const canvasRef = ref(null);
const animationRef = ref(null);
const rendererRef = ref(null);
const sceneRef = ref(null);
const meshRef = ref(null);
const cameraRef = ref(null);
let resizeObserver = null;
let intersectionObserver = null;
const isVisible = ref(true);

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function hexToRgb(value) {
  const hex = value.replace("#", "");
  if (![3, 6].includes(hex.length)) return null;
  const normalized =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;

  const bigint = parseInt(normalized, 16);
  if (Number.isNaN(bigint)) return null;

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbStringToRgb(value) {
  const match = value
    .replace(/\s+/g, "")
    .match(/^rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,\d*(?:\.\d+)?)?\)$/i);
  if (!match) return null;

  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
  };
}

function hslStringToHsl(value) {
  const match = value
    .replace(/\s+/g, "")
    .match(
      /^hsla?\(([-\d.]+)(?:deg)?,([\d.]+)%,([\d.]+)%(?:,\d*(?:\.\d+)?)?\)$/i
    );
  if (!match) return null;

  return {
    hue: ((Number(match[1]) % 360) + 360) % 360,
    saturation: clamp01(Number(match[2]) / 100),
    chroma: clamp01(Number(match[3]) / 100),
  };
}

function rgbToHsl({ r, g, b }) {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;

  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === nr) {
      hue = ((ng - nb) / delta) % 6;
    } else if (max === ng) {
      hue = (nb - nr) / delta + 2;
    } else {
      hue = (nr - ng) / delta + 4;
    }
    hue *= 60;
  }
  if (hue < 0) hue += 360;

  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return {
    hue,
    saturation: clamp01(saturation),
    chroma: clamp01(lightness),
  };
}

function hslToRgb({ hue, saturation, chroma }) {
  const h = (((hue % 360) + 360) % 360) / 360;
  const s = clamp01(saturation);
  const l = clamp01(chroma);

  if (s === 0) {
    const gray = clamp01(l);
    return { r: gray, g: gray, b: gray };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  function hue2rgb(t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  return {
    r: clamp01(hue2rgb(h + 1 / 3)),
    g: clamp01(hue2rgb(h)),
    b: clamp01(hue2rgb(h - 1 / 3)),
  };
}

function normalizeRgb({ r, g, b }) {
  return {
    r: clamp01(r / 255),
    g: clamp01(g / 255),
    b: clamp01(b / 255),
  };
}

function parseColorInput(value) {
  if (!value || typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();

  if (normalized.startsWith("#")) {
    const rgb = hexToRgb(normalized);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb);
    return { ...hsl, rgb: normalizeRgb(rgb) };
  }

  if (normalized.startsWith("rgb")) {
    const rgb = rgbStringToRgb(normalized);
    if (!rgb) return null;
    const hsl = rgbToHsl(rgb);
    return { ...hsl, rgb: normalizeRgb(rgb) };
  }

  if (normalized.startsWith("hsl")) {
    const hsl = hslStringToHsl(normalized);
    if (!hsl) return null;
    const rgb = hslToRgb(hsl);
    return { ...hsl, rgb };
  }

  return null;
}

function updateColorUniforms() {
  const mesh = meshRef.value;
  const uniforms = mesh?.program?.uniforms;
  if (!uniforms) return;

  if (uniforms.u_saturation) {
    uniforms.u_saturation.value = baseSaturation.value;
  }
  if (uniforms.u_chroma) {
    uniforms.u_chroma.value = baseChroma.value;
  }
  if (uniforms.u_direct_color) {
    const color = directColor.value;
    const target = uniforms.u_direct_color.value;
    const r = color ? color.r : 0;
    const g = color ? color.g : 0;
    const b = color ? color.b : 0;
    if (Array.isArray(target)) {
      target[0] = r;
      target[1] = g;
      target[2] = b;
    } else {
      uniforms.u_direct_color.value = [r, g, b];
    }
  }
  if (uniforms.u_has_direct_color) {
    uniforms.u_has_direct_color.value = directColor.value ? 1 : 0;
  }
}

function applyColorValue(colorValue) {
  const parsed = parseColorInput(colorValue);
  if (!parsed) {
    if (colorValue) {
      console.warn(`[NeuralBg] Не удалось распарсить цвет "${colorValue}".`);
    }
    directColor.value = null;
    return false;
  }

  baseHue.value = parsed.hue;
  baseSaturation.value = parsed.saturation;
  baseChroma.value = parsed.chroma;
  directColor.value = parsed.rgb;
  updateColorUniforms();
  return true;
}

if (props.color) {
  const isApplied = applyColorValue(props.color);
  if (!isApplied) {
    baseHue.value = props.hue;
    baseSaturation.value = props.saturation;
    baseChroma.value = props.chroma;
    directColor.value = null;
  }
}

const vertexShader = `
  precision mediump float;

  attribute vec2 position;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform float u_scroll_progress;
  uniform float u_hue;
  uniform float u_saturation;
  uniform float u_chroma;
  uniform float u_theme_factor;
  uniform vec3 u_direct_color;
  uniform float u_has_direct_color;

  vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
      vec2 sine_acc = vec2(0.);
      vec2 res = vec2(0.);
      float scale = 8.;

      for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
      }
      return res.x + res.y;
  }

  // HSL to RGB conversion
  vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
      vec2 uv = .5 * vUv;
      uv.x *= u_ratio;

      float distanceFromCenter = length(vUv - 0.5);
      float p = .5 * pow(1. - distanceFromCenter, 2.);
      p += 0.1 * sin(u_scroll_progress * 2.0);

      float t = .001 * u_time;
      vec3 color = vec3(0.);

      float noise = neuro_shape(uv, t, p);

      noise = 1.2 * pow(noise, 3.);
      noise += pow(noise, 10.);
      noise = max(.0, noise - .5);
      noise *= (1. - length(vUv - .5));

      // Convert hue from degrees to 0-1 range
      float normalizedHue = u_hue / 360.0;
      
      // Create HSL color with animation
      vec3 hsl = vec3(
          normalizedHue + 0.1 * sin(3.0 * u_scroll_progress + 1.5),
          u_saturation,
          u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll_progress)
      );

      vec3 accentFromHsl = hsl2rgb(hsl);
      vec3 accentColor = mix(accentFromHsl, u_direct_color, u_has_direct_color);
      vec3 lightBg = vec3(246.0/255.0, 246.0/255.0, 245.0/255.0);

      vec3 darkColor = accentColor * noise;
      vec3 lightColor = mix(lightBg, accentColor, clamp(noise * 0.6, 0.0, 1.0));

      vec3 finalColor = mix(darkColor, lightColor, u_theme_factor);
      float alpha = mix(noise, 0.95, u_theme_factor);

      gl_FragColor = vec4(finalColor, alpha);
  }
`;

function initOGL() {
  const canvas = canvasRef.value;
  if (!canvas) return false;

  try {
    const renderer = new Renderer({
      canvas,

      dpr: Math.min(window.devicePixelRatio, 2),
    });
    renderer.gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(renderer.gl);
    const scene = new Transform();

    const geometry = new Plane(renderer.gl, {
      width: 2,
      height: 2,
    });

    const program = new Program(renderer.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_ratio: { value: window.innerWidth / window.innerHeight },
        u_scroll_progress: { value: 0 },
        u_hue: { value: baseHue.value },
        u_saturation: { value: baseSaturation.value },
        u_chroma: { value: baseChroma.value },
        u_theme_factor: { value: props.theme === "light" ? 1 : 0 },
        u_direct_color: {
          value: directColor.value
            ? [directColor.value.r, directColor.value.g, directColor.value.b]
            : [0, 0, 0],
        },
        u_has_direct_color: { value: directColor.value ? 1 : 0 },
      },
    });

    const mesh = new Mesh(renderer.gl, {
      geometry,
      program,
    });

    mesh.setParent(scene);

    rendererRef.value = renderer;
    cameraRef.value = camera;
    sceneRef.value = scene;
    meshRef.value = mesh;

    updateColorUniforms();

    return true;
  } catch (error) {
    console.error("Error initializing OGL:", error);
    return false;
  }
}

function resizeCanvas() {
  const renderer = rendererRef.value;
  const mesh = meshRef.value;
  const canvas = canvasRef.value;

  if (!canvas) return;

  if (!renderer || !mesh) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  renderer.setSize(width, height);
  canvas.width = width;
  canvas.height = height;

  // Update ratio uniform
  if (mesh.program && mesh.program.uniforms.u_ratio) {
    mesh.program.uniforms.u_ratio.value = width / height;
  }
}

const HUE_CYCLE_SPEED = 0.02;

function setupResizeObserver() {
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  const canvas = canvasRef.value;
  if (!canvas) return;

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
  });

  resizeObserver.observe(canvas);
}

function setupIntersectionObserver() {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }

  const canvas = canvasRef.value;
  if (!canvas) return;

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    { threshold: 0.01 }
  );

  intersectionObserver.observe(canvas);
}

function render() {
  const renderer = rendererRef.value;
  const scene = sceneRef.value;
  const camera = cameraRef.value;
  const mesh = meshRef.value;

  if (!renderer || !scene || !camera || !mesh) return;
  if (!isVisible.value) {
    animationRef.value = requestAnimationFrame(render);
    return;
  }

  const currentTime = performance.now();
  const baseHueValue = baseHue.value;
  const animatedHue = shouldAnimateHue.value
    ? (baseHueValue + currentTime * HUE_CYCLE_SPEED) % 360
    : baseHueValue;

  // Update uniforms
  if (mesh.program && mesh.program.uniforms) {
    const uniforms = mesh.program.uniforms;

    if (uniforms.u_time) uniforms.u_time.value = currentTime;
    if (uniforms.u_scroll_progress) {
      uniforms.u_scroll_progress.value =
        window.pageYOffset / (2 * window.innerHeight);
    }
    if (uniforms.u_hue) {
      uniforms.u_hue.value = animatedHue;
    }
  }

  renderer.render({ scene, camera });
  animationRef.value = requestAnimationFrame(render);
}

// Watch for prop changes and update uniforms
watch(
  () => props.saturation,
  (newSaturation) => {
    const mesh = meshRef.value;
    if (mesh && mesh.program && mesh.program.uniforms.u_saturation) {
      if (props.color) return;
      baseSaturation.value = newSaturation;
      updateColorUniforms();
    }
  }
);

watch(
  () => props.chroma,
  (newChroma) => {
    const mesh = meshRef.value;
    if (mesh && mesh.program && mesh.program.uniforms.u_chroma) {
      if (props.color) return;
      baseChroma.value = newChroma;
      updateColorUniforms();
    }
  }
);

watch(
  () => props.hue,
  (newHue) => {
    if (props.color) return;
    baseHue.value = newHue;
  }
);

watch(
  () => props.color,
  (newColor) => {
    if (newColor && applyColorValue(newColor)) {
      return;
    }

    baseHue.value = props.hue;
    baseSaturation.value = props.saturation;
    baseChroma.value = props.chroma;
    directColor.value = null;
    updateColorUniforms();
  }
);

watch(
  () => props.theme,
  (newTheme) => {
    const mesh = meshRef.value;
    if (mesh && mesh.program && mesh.program.uniforms.u_theme_factor) {
      mesh.program.uniforms.u_theme_factor.value = newTheme === "light" ? 1 : 0;
    }
  }
);

onMounted(() => {
  if (initOGL()) {
    render();

    setupResizeObserver();
    setupIntersectionObserver();
  }
});

onUnmounted(() => {
  if (animationRef.value) {
    cancelAnimationFrame(animationRef.value);
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
  // Clean up OGL resources
  if (rendererRef.value) {
    rendererRef.value = null;
  }
});
</script>
