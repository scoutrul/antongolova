<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 !w-full !h-full pointer-events-none"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Renderer, Camera, Transform, Program, Mesh, Plane } from "ogl";

const props = defineProps({
  hue: { type: Number, required: false, default: 200 },
  saturation: { type: Number, required: false, default: 0.8 },
  chroma: { type: Number, required: false, default: 0.6 },
});

const canvasRef = ref(null);
const animationRef = ref(null);
const rendererRef = ref(null);
const sceneRef = ref(null);
const meshRef = ref(null);
const cameraRef = ref(null);
let resizeObserver = null;

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

      // Convert to RGB
      color = hsl2rgb(hsl);
      color = color * noise;

      gl_FragColor = vec4(color, noise);
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
        u_hue: { value: props.hue },
        u_saturation: { value: props.saturation },
        u_chroma: { value: props.chroma },
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

function render() {
  const renderer = rendererRef.value;
  const scene = sceneRef.value;
  const camera = cameraRef.value;
  const mesh = meshRef.value;

  if (!renderer || !scene || !camera || !mesh) return;

  const currentTime = performance.now();
  const animatedHue = (props.hue + currentTime * HUE_CYCLE_SPEED) % 360;

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
      mesh.program.uniforms.u_saturation.value = newSaturation;
    }
  }
);

watch(
  () => props.chroma,
  (newChroma) => {
    const mesh = meshRef.value;
    if (mesh && mesh.program && mesh.program.uniforms.u_chroma) {
      mesh.program.uniforms.u_chroma.value = newChroma;
    }
  }
);

onMounted(() => {
  if (initOGL()) {
    render();

    setupResizeObserver();
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
  // Clean up OGL resources
  if (rendererRef.value) {
    rendererRef.value = null;
  }
});
</script>
