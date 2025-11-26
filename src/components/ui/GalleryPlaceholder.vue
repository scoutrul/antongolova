<template>
  <div
    class="flex flex-col gap-8 xl:row-span-2 overflow-hidden relative xl:max-h-[fit-content] md:max-h-[600px] rounded-[20px] -mx-8 md:-mx-20 lg:-mx-24 xl:-mx-0 xl:mt-[-10rem] px-4 xl:px-0 over-fade"
  >
    <div ref="carouselWrapperRef" class="px-4" :key="currentBreakpoint">
      <div ref="carouselContainerRef" class="flex flex-row xl:flex-col">
        <!-- Дублируем элементы для бесконечной карусели -->
        <div
          v-for="(item, index) in duplicatedItems"
          :key="`carousel-item-${index}`"
          class="carousel-item rounded-[20px] overflow-hidden inset-0"
        >
          <div :class="aspectClass" />

          <!-- Лоадер плейсхолдер -->
          <div
            v-if="!isVideoLoaded(index)"
            class="absolute inset-0 bg-black-80 flex items-center justify-center"
          >
            <div
              class="w-12 h-12 border-4 border-white-50 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>

          <video
            v-if="item?.src"
            :src="item.src"
            :alt="item?.alt || `gallery-video-${index}`"
            class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            :class="{
              'opacity-0': !isVideoLoaded(index),
              'opacity-100': isVideoLoaded(index),
            }"
            autoplay
            loop
            muted
            playsinline
            @loadeddata="handleVideoLoaded(index)"
            @loadstart="handleVideoLoadStart(index)"
          />

          <div
            :class="['pointer-events-none absolute inset-0', gradientClass]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { gsap } from "gsap";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { useVideoPreloader } from "@/composables/useVideoPreloader.js";

const { gtXl, currentBreakpoint, deviceType } = useBreakpoints();
const { registerVideo, markVideoLoaded, isLoading } = useVideoPreloader();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const carouselWrapperRef = ref(null);
const carouselContainerRef = ref(null);
let animation = null;

// Отслеживание состояния загрузки видео
const videoLoadedStates = ref(new Map());

// Проверка, загружено ли видео
const isVideoLoaded = (index) => {
  return videoLoadedStates.value.get(index) === true;
};

// Обработчик начала загрузки
const handleVideoLoadStart = (index) => {
  videoLoadedStates.value.set(index, false);
};

// Обработчик завершения загрузки
const handleVideoLoaded = (index) => {
  videoLoadedStates.value.set(index, true);

  // Уведомляем глобальный прелоадер о загрузке видео
  const videoSrc = duplicatedItems.value[index]?.src;
  if (videoSrc) {
    markVideoLoaded(videoSrc);
  }
};

// Дублируем элементы для бесконечной карусели (3 копии)
const duplicatedItems = computed(() => {
  return [...props.items, ...props.items, ...props.items];
});

const aspectClass = computed(() => {
  switch (deviceType.value) {
    case "mobile":
      return "aspect-[3/4]";
    case "tablet":
      return "aspect-[16/9]";
    default:
      return "aspect-[16/9]";
  }
});

const gradientClass = computed(() => {
  if (gtXl.value) {
    // Вертикальная карусель - градиент снизу
    return "bg-gradient-to-b from-transparent via-black-90/60 to-black-90";
  } else {
    // Горизонтальная карусель - градиент справа
    switch (deviceType.value) {
      case "mobile":
        return "bg-gradient-to-r from-transparent via-black-90/20 to-black-90";
      case "tablet":
        return "bg-gradient-to-r from-transparent via-black-90/50 to-black-90";
      default:
        return "bg-gradient-to-r from-transparent via-black-90/60 to-black-90";
    }
  }
});

// Инициализация анимации карусели
const initCarousel = async () => {
  if (
    !carouselContainerRef.value ||
    !carouselWrapperRef.value ||
    props.items.length === 0
  ) {
    return;
  }

  // Убиваем предыдущие анимации, если есть
  if (animation) {
    animation.kill();
    animation = null;
  }

  await nextTick();

  const container = carouselContainerRef.value;
  const wrapper = carouselWrapperRef.value;
  const itemCount = props.items.length;
  const gap = gtXl.value ? 32 : 24; // gap-8 = 32px на десктопе, gap-6 = 24px на мобильном

  if (gtXl.value) {
    // Вертикальная карусель на десктопе - показываем 4 элемента
    const firstItem = container.children[0];
    if (!firstItem) return;

    // Вычисляем высоту одного элемента
    const itemWidth = wrapper.offsetWidth;
    const aspectRatio = 16 / 9;
    const itemHeight = itemWidth / aspectRatio;
    const itemSize = itemHeight + gap;
    const totalSize = itemSize * itemCount;

    // Высота видимой области = 4 элемента
    const visibleHeight = itemSize * 3 - gap; // 4 элемента минус один gap
    gsap.set(wrapper, { height: visibleHeight });

    // Устанавливаем начальную позицию (начинаем с первого элемента второй копии)
    // Смещаем так, чтобы показывались элементы с индекса itemCount (начало второй копии)
    gsap.set(container, { y: -totalSize });

    // Непрерывная анимация - двигаемся от начала второй копии до конца второй копии
    animation = gsap.to(container, {
      y: -totalSize * 2,
      duration: itemCount * 10, // 3 секунды на элемент для плавного движения
      ease: "none", // Линейная анимация для постоянной скорости
      repeat: -1, // Бесконечное повторение
      onRepeat: () => {
        // При каждом повторении сбрасываем позицию на начало второй копии (бесшовный переход)
        gsap.set(container, { y: -totalSize });
      },
    });
  } else {
    // Горизонтальная карусель на мобильном/планшете - показываем 1 элемент
    const itemWidth = wrapper.offsetWidth;
    const itemSize = itemWidth + gap;
    const totalSize = itemSize * itemCount;

    // Устанавливаем ширину всех элементов равной ширине wrapper
    const items = container.children;
    for (let i = 0; i < items.length; i++) {
      gsap.set(items[i], { width: itemWidth });
    }

    // Устанавливаем начальную позицию (начинаем с первого элемента второй копии)
    gsap.set(container, { x: -totalSize });

    // Непрерывная анимация - двигаемся от начала второй копии до конца второй копии
    animation = gsap.to(container, {
      x: -totalSize * 2,
      duration: itemCount * 10,
      ease: "none",
      repeat: -1,
      onRepeat: () => {
        gsap.set(container, { x: -totalSize });
      },
    });
  }
};

// Регистрируем все уникальные видео в прелоадере
const uniqueVideos = new Set(
  props.items.map((item) => item.src).filter(Boolean)
);
uniqueVideos.forEach((videoSrc) => {
  registerVideo(videoSrc);
});

onMounted(() => {
  initCarousel();
});

// Переинициализируем карусель при изменении breakpoint
watch([currentBreakpoint, isLoading], () => {
  initCarousel();
});

onBeforeUnmount(() => {
  if (animation) {
    animation.kill();
    animation = null;
  }
});
</script>
<style scoped>
.carousel-item {
  @apply relative;
  @apply xl:mb-8 xl:last:mb-0 xl:w-full;

  @apply mr-6 last:mr-0 flex-shrink-0;
}

.over-fade::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  @apply bg-gradient-to-b from-transparent to-black-90;
}
</style>
