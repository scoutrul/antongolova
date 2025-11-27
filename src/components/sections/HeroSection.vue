<template>
  <BaseContainer :as="'section'" bg="black">
    <div
      class="grid gap-10 md:gap-20 xl:gap-0 xl:gap-x-20 xl:grid-cols-2 xl:items-start"
    >
      <!-- Текст и аватары -->
      <div class="flex w-full flex-col gap-8 relative">
        <BaseHeading
          :level="gtXl ? 3 : 5"
          :as="'h1'"
          class="text-white-100 absolute"
          :id="headingId || undefined"
        >
          <span
            ref="titleRef"
            class="block"
            :key="`title-${languageStore.currentLanguage}-${currentBreakpoint}`"
          ></span>
          <span
            ref="subtitleRef"
            class="block"
            :key="`subtitle-${languageStore.currentLanguage}-${currentBreakpoint}`"
          ></span>
        </BaseHeading>

        <BaseHeading
          :level="gtXl ? 3 : 5"
          :as="'h1'"
          class="text-white-100 opacity-0"
          :id="headingId || undefined"
        >
          <span class="block">{{ title }}</span>
          <span class="block">{{ subtitle }}</span>
        </BaseHeading>

        <div class="flex flex-row gap-4 sm:flex-row">
          <AvatarStack :avatars="highlightAvatars" />

          <BaseText :as="'p'" size="p2" class="text-black-70 flex items-center">
            {{ highlightText }}
          </BaseText>
        </div>

        <ContactButton @click="handleCtaClick">
          {{ buttonText }}
        </ContactButton>
        <HeroStats :stats="stats" v-if="gtXl" class="mt-20" />
      </div>

      <!-- Галерея -->
      <GalleryPlaceholder :items="galleryItems" />

      <!-- Статистика -->
      <HeroStats :stats="stats" v-if="!gtXl" />
    </div>
  </BaseContainer>
</template>

<script setup>
import HeroStats from "@/components/ui/HeroStats.vue";
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { BaseContainer, BaseHeading, BaseText } from "@/components/base";
import GalleryPlaceholder from "@/components/ui/GalleryPlaceholder.vue";
import AvatarStack from "@/components/ui/AvatarStack.vue";
import ContactButton from "@/components/ui/ContactButton.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { useLanguageStore } from "@/stores/language.js";
import { createScrambleTextSequence } from "@/utils/ScrambleText.js";

const { gtXl, currentBreakpoint } = useBreakpoints();
const languageStore = useLanguageStore();

// Refs для анимации
const titleRef = ref(null);
const subtitleRef = ref(null);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  highlightText: {
    type: String,
    default: "",
  },
  highlightAvatars: {
    type: Array,
    default: () => [{}, {}, {}],
  },
  buttonText: {
    type: String,
    default: "",
  },
  stats: {
    type: Array,
    default: () => [],
  },
  gallery: {
    type: Array,
    default: () => [{}, {}, {}],
  },
  headingId: {
    type: String,
    default: "",
  },
});

// Передаем все элементы галереи - карусель сама управляет отображением
const galleryItems = computed(() => props.gallery);

// Функция для запуска ScrambleText анимации
const runScrambleAnimation = () => {
  if (titleRef.value && subtitleRef.value) {
    createScrambleTextSequence(
      [
        { element: titleRef.value, text: props.title },
        { element: subtitleRef.value, text: props.subtitle },
      ],
      {
        duration: 2,
        speed: 0.03,
        staggerDelay: 3,
      }
    );
  }
};

// Запуск анимации при монтировании
onMounted(() => {
  runScrambleAnimation();
});

// При смене языка или брейкпоинта span элементы пересоздаются через :key
// Используем nextTick чтобы дождаться обновления refs
watch([() => languageStore.currentLanguage, currentBreakpoint], async () => {
  await nextTick();
  runScrambleAnimation();
});

// Обработка клика по CTA
const handleCtaClick = () => {
  window.open("http://t.me/meisdigital", "_blank");
};
</script>
