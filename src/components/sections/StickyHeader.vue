<template>
  <BaseContainer
    as="header"
    :max-width="'full'"
    class="fixed top-0 z-50 w-full transition-all duration-200 !py-3 md:!py-6 overflow-visible"
  >
    <div
      class="w-full backdrop-blur-[20px] rounded-lg md:rounded-xl transition-all duration-200 flex items-center justify-between md:justify-start gap-6 p-3 md:px-6 md:gap-10"
      :class="containerClasses"
    >
      <div class="flex items-center gap-6 xl:min-w-[322px]">
        <div
          class="flex items-center shrink-0 cursor-pointer"
          :class="logoSizeClasses"
          @click="goToHome"
        >
          <img
            :src="logoMark"
            alt="Logo"
            class="w-full h-full object-contain"
            :class="logoColorClass"
          />
        </div>

        <div class="hidden xl:flex items-center gap-6">
          <p
            class="text-p2 whitespace-nowrap text-primary"
            :class="sloganColorClass"
          >
            {{ slogan }} {{ theme }}
          </p>
        </div>
      </div>

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
            <a
              :href="getNavHref(item)"
              class="text-p2 text-primary transition-colors whitespace-nowrap"
              :class="navLinkColorClass"
              :target="item.type === 'download' ? '_blank' : undefined"
              :rel="
                item.type === 'download' ? 'noopener noreferrer' : undefined
              "
              @click="handleNavClick($event, item)"
            >
              {{ item.text }}
            </a>
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
        <!-- CTA -->
        <ContactButton @click="$emit('cta-click')" :default-text="buttonText" />
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import BaseContainer from "@/components/base/BaseContainer.vue";
import ContactButton from "@/components/ui/ContactButton.vue";
import LanguageToggle from "@/components/ui/LanguageToggle.vue";
const logoMark = "/assets/icons/logo-mark.svg";

const router = useRouter();

const props = defineProps({
  slogan: {
    type: String,
    default: "",
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

const emit = defineEmits(["cta-click", "nav-case-scroll", "language-change"]);

// Внутреннее состояние для отслеживания скролла
const isScrolled = ref(false);

// Обработчик скролла
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Добавляем слушатель при монтировании
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Проверяем начальное положение
  handleScroll();
});

// Удаляем слушатель при размонтировании
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const isDark = computed(() => props.theme === "dark");

// Классы для контейнера
const containerClasses = computed(() => {
  return isDark.value ? "bg-black-90-alpha" : "bg-white-90-alpha";
});

// Классы для размера лого
const logoSizeClasses = computed(() => {
  return "h-[34px] w-[35px] md:h-[34px] md:w-[35px] lg:h-10 lg:w-[41px]";
});

// Классы для цвета лого (через фильтр)
const logoColorClass = computed(() => {
  return isDark.value
    ? "brightness-0 invert" // Белый лого для темной темы
    : "opacity-90 invert"; // Черный лого для светлой темы
});

// Классы для цвета слогана
const sloganColorClass = computed(() => {
  return isDark.value
    ? "text-black-70" // #cdcdcd для темной темы
    : "text-black-50"; // #5c5c5c для светлой темы
});

// Классы для ссылок навигации
const navLinkColorClass = computed(() => {
  return isDark.value
    ? "text-white-90" // #f6f6f5 для темной темы
    : "text-black-90"; // #161616 для светлой темы
});

// Обработчик для дропдауна языка
const handleLanguageChange = (code) => {
  emit("language-change", code);
};

// Переход на главную страницу
const goToHome = () => {
  router.push({ name: "Home" });
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
