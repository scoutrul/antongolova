<template>
  <div v-if="isArray" class="flex flex-col gap-6">
    <!-- Массив медиа-файлов -->
    <div
      v-for="(item, index) in mediaItems"
      :key="index"
      class="media-container bg-white-90 rounded-[16px] overflow-hidden"
      :class="{ 'mobile-video-container': isMobileVideo(item.src) }"
    >
      <!-- Видео -->
      <video
        v-if="isVideoFile(item.src)"
        ref="videoElements"
        :src="item.src"
        :poster="item.poster"
        class="w-full h-full object-cover bg-white-100"
        :class="{ 'mobile-video': isMobileVideo(item.src) }"
        muted
        loop
        playsinline
        preload="metadata"
      />

      <!-- Изображение -->
      <img
        v-else
        :src="item.src"
        :alt="item.alt || alt"
        class="w-full h-full object-cover bg-white-100"
        loading="lazy"
      />
    </div>
  </div>

  <!-- Одиночный медиа-файл -->
  <div
    v-else
    class="media-container bg-white-90 rounded-[16px] overflow-hidden"
    :class="{ 'mobile-video-container': isMobileVideo(currentSrc) }"
  >
    <!-- Видео -->
    <video
      v-if="isVideo"
      ref="singleVideoRef"
      :src="currentSrc"
      :poster="poster"
      class="w-full h-full object-cover bg-white-100"
      :class="{ 'mobile-video': isMobileVideo(currentSrc) }"
      muted
      loop
      playsinline
      preload="metadata"
    />

    <!-- Изображение -->
    <img
      v-else
      :src="currentSrc"
      :alt="alt"
      class="w-full h-full object-cover bg-white-100"
      loading="lazy"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";

const { gtMd } = useBreakpoints();
const videoElements = ref([]);
const singleVideoRef = ref(null);
let observer = null;

const props = defineProps({
  src: {
    type: [String, Array],
    required: true,
  },
  srcMobile: {
    type: [String, Array],
    default: null,
  },
  alt: {
    type: String,
    default: "Case study media",
  },
  poster: {
    type: String,
    default: null,
  },
});

// Проверка, является ли src массивом
const isArray = computed(() => Array.isArray(props.src));

// Функция для определения типа файла
const isVideoFile = (url) => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov"];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// Проверка, является ли видео мобильным (вертикальным)
const isMobileVideo = (url) => {
  if (!url) return false;
  return url.toLowerCase().includes("mobile");
};

// Для массива: формируем список элементов с учетом mobile версий
const mediaItems = computed(() => {
  if (!isArray.value) return [];

  return props.src.map((url, index) => {
    let src = url;

    // Проверяем, есть ли mobile версия для этого элемента
    if (
      props.srcMobile &&
      Array.isArray(props.srcMobile) &&
      props.srcMobile[index] &&
      !gtMd.value
    ) {
      src = props.srcMobile[index];
    }

    return {
      src,
      poster: null, // Можно расширить для поддержки массива poster'ов
      alt: props.alt,
    };
  });
});

// Для одиночного файла
const isVideo = computed(() => {
  if (isArray.value) return false;
  return isVideoFile(props.src);
});

// Выбираем источник в зависимости от размера экрана (для одиночного)
const currentSrc = computed(() => {
  if (isArray.value) return "";
  if (props.srcMobile && !gtMd.value) {
    return props.srcMobile;
  }
  return props.src;
});

const observeVideo = (video) => {
  if (!video) return;
  observer?.observe(video);
};

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
};

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0.25,
  });

  nextTick(() => {
    videoElements.value.forEach((video) => observeVideo(video));
    if (singleVideoRef.value) observeVideo(singleVideoRef.value);
  });
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});

watch(
  videoElements,
  () => {
    if (!observer) return;
    videoElements.value.forEach((video) => observeVideo(video));
  },
  { deep: true }
);

watch(singleVideoRef, (video) => {
  if (!observer || !video) return;
  observeVideo(video);
});
</script>

<style scoped>
.media-container {
  width: 100%;
}

.mobile-video-container {
  @apply flex justify-center;
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
}

.mobile-video {
  width: auto;
  max-width: 375px;
  height: auto;
  object-fit: contain;
}
</style>
