<template>
  <BaseContainer
    v-if="isVisible"
    as="header"
    :max-width="'full'"
    class="!fixed top-0 z-50 w-full transition-all duration-200 !py-3 md:!py-6 !overflow-visible"
  >
    <div
      class="w-full flex items-center justify-between md:justify-start gap-6 md:gap-10"
      :class="containerClasses"
    >
      <div class="flex items-center gap-6 mr-auto">
        <div class="flex items-center gap-6">
          <span
            class="text-p2 whitespace-nowrap cursor-pointer"
            :class="sloganColorClass"
            ref="sloganRef"
            @click="$emit('slogan-click')"
          >
            {{ currentSlogan }}
          </span>
        </div>
      </div>

      <div
        class="flex items-center gap-6 backdrop-blur-[20px] rounded-lg md:rounded-xl pr-3 md:pr-6 -mr-3 md:-mr-6"
        :class="navContainerClasses"
      >
        <nav
          class="hidden md:flex xl:flex-1 justify-center mr-auto"
          aria-label="Основная навигация"
        >
          <ul class="flex gap-6">
            <li
              v-for="(item, index) in navigationItems"
              :key="index"
              class="list-none"
            >
              <BaseButton
                variant="ghost"
                :class="theme === 'dark' ? 'text-white-90' : 'text-black-90'"
                :href="getNavHref(item)"
                :default-text="item.text"
                @click="handleNavClick($event, item)"
              />
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-6">
          <div class="hidden lg:block">
            <LanguageToggle
              :theme="theme"
              :languages="languages"
              :model-value="currentLanguage"
              @update:model-value="handleLanguageChange"
            />
          </div>
          <!-- GitHub link -->
          <a
            href="https://github.com/scoutrul"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-10 h-10 transition-all"
            aria-label="GitHub"
          >
            <img
              src="/assets/icons/github.svg"
              alt="GitHub"
              :class="theme === 'dark' ? 'invert' : ''"
              class="w-5 h-5 transition-all"
            />
          </a>
          <!-- CTA -->
          <ContactButton
            :class="theme === 'dark' ? 'text-white-100' : 'text-secondary'"
            @click="$emit('cta-click')"
            :default-text="buttonText"
          />
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import BaseContainer from "@/components/base/BaseContainer.vue";
import ContactButton from "@/components/ui/ContactButton.vue";
import LanguageToggle from "@/components/ui/LanguageToggle.vue";
import { createScrambleTextAnimation } from "@/utils/ScrambleText.js";
import { BaseButton } from "../base";

const emit = defineEmits([
  "cta-click",
  "nav-case-scroll",
  "language-change",
  "slogan-click",
]);
const router = useRouter();

const props = defineProps({
  slogans: {
    type: Array,
    default: () => [],
  },
  navigationItems: {
    type: Array,
    default: () => [],
  },
  theme: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
  languages: {
    type: Array,
    default: () => [],
  },
  currentLanguage: {
    type: String,
    default: "ru",
  },
  buttonText: {
    type: String,
    default: "",
  },
});

// Внутреннее состояние для отслеживания скролла
const isScrolled = ref(false);
const isVisible = ref(true);
const sloganRef = ref(null);
const sloganIndex = ref(0);

const ROTATION_DELAY = 4500;
let rotationTimer = null;
let isMountedClient = false;

const availableSlogans = computed(() => {
  if (!Array.isArray(props.slogans)) return [];
  return props.slogans.filter((item) => Boolean(item?.length));
});

const currentSlogan = computed(() => {
  return availableSlogans.value[sloganIndex.value] || "";
});

// Обработчик скролла
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;

  // Проверяем, находится ли меню под hero секцией
  if (props.theme === "dark") {
    // Ищем hero секцию с темным фоном
    const heroSection = document.querySelector(".case-hero");
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      const heroBottom = heroRect.bottom;
      // Показываем меню, когда hero секция еще видна (нижняя граница hero > 0)
      // Скрываем меню, когда hero секция полностью прокручена вверх
      isVisible.value = heroBottom > 0;
    } else {
      isVisible.value = true;
    }
  } else {
    isVisible.value = true;
  }
};

const stopSloganRotation = () => {
  if (!rotationTimer) return;
  clearInterval(rotationTimer);
  rotationTimer = null;
};

const startSloganRotation = () => {
  stopSloganRotation();
  if (availableSlogans.value.length <= 1) return;

  rotationTimer = window.setInterval(() => {
    sloganIndex.value = (sloganIndex.value + 1) % availableSlogans.value.length;
  }, ROTATION_DELAY);
};

const animateSlogan = async (text) => {
  if (!isMountedClient || !sloganRef.value || !text) return;
  await nextTick();
  createScrambleTextAnimation(sloganRef.value, text, {
    triggerStart: "top 90%",
    duration: 2,
    speed: 0.4,
  });
};

// Добавляем слушатель при монтировании
onMounted(async () => {
  isMountedClient = true;
  window.addEventListener("scroll", handleScroll);
  // Проверяем начальное положение
  handleScroll();

  await nextTick();
  animateSlogan(currentSlogan.value);
  startSloganRotation();
});

watch(currentSlogan, (newValue, oldValue) => {
  if (!isMountedClient) return;
  if (!newValue || newValue === oldValue) return;
  animateSlogan(newValue);
});

// Удаляем слушатель при размонтировании
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  stopSloganRotation();
  isMountedClient = false;
});

const isDark = computed(() => props.theme === "dark");

// Классы для контейнера
const containerClasses = computed(() => {
  return isDark.value ? "#ffffff1a" : "#1616161a";
});

// Классы для навигационного блока (чип с меню и кнопками)
const navContainerClasses = computed(() => {
  // Светлая тема: светлый полупрозрачный фон
  // Тёмная тема: тёмный полупрозрачный фон
  return isDark.value ? "bg-black-90/10" : "bg-white-100/10";
});

// Классы для цвета слогана
const sloganColorClass = computed(() => {
  return isDark.value
    ? "text-black-70" // #cdcdcd для темной темы
    : "text-black-50"; // #5c5c5c для светлой темы
});

// Обработчик для дропдауна языка
const handleLanguageChange = (code) => {
  emit("language-change", code);
};

// Получить href для навигационной ссылки
const getNavHref = (item) => {
  if (typeof item === "string") return "#";
  if (item.type === "download") return item.target;
  if (item.type === "scroll") return `#${item.target}`;
  return "#";
};

// Обработка клика по навигации
const handleNavClick = (event, item) => {
  // Если это download, не предотвращаем дефолтное поведение
  if (item.type === "download") {
    return;
  }

  // Если это scroll - просто эмитим событие, страницы сами разберутся
  if (item.type === "scroll") {
    event.preventDefault();
    emit("nav-case-scroll");
  }
};
</script>
