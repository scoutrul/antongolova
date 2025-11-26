<template>
  <div class="relative" ref="dropdownRef">
    <!-- Кнопка триггера -->
    <BaseButton
      variant="tertiary"
      size="md"
      class="transition-colors min-w-[136px]"
      :class="buttonThemeClasses"
      @click="toggleDropdown"
    >
      <img
        :src="translateIcon"
        alt="Translate"
        class="w-5 h-5"
        :class="iconColorClass"
      />
      <span :class="textColorClass">{{ currentLanguage }}</span>
    </BaseButton>

    <!-- Дропдаун панель -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute top-full right-0 mt-2 min-w-[160px] backdrop-blur-[20px] rounded-lg p-2 shadow-lg z-50"
        :class="dropdownClasses"
      >
        <button
          v-for="(lang, index) in languages"
          :key="index"
          class="w-full flex items-center justify-between gap-3 px-6 py-4 rounded-lg text-p2 transition-colors"
          :class="getLanguageItemClasses(lang)"
          @click="selectLanguage(lang)"
        >
          <span :class="textColorClass">{{ lang.label }}</span>
          <img
            v-if="currentLanguage === lang.label"
            :src="checkIcon"
            alt="Selected"
            class="w-5 h-5 shrink-0"
            :class="checkIconColorClass"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";
const translateIcon = "/assets/icons/translate.svg";
const checkIcon = "/assets/icons/check.svg";

const props = defineProps({
  theme: {
    type: String,
    default: "dark",
    validator: (value) => ["light", "dark"].includes(value),
  },
  languages: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "ru",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const isDark = computed(() => props.theme === "dark");

// Текущий выбранный язык
const currentLanguage = computed(() => {
  const lang = props.languages.find((l) => l.code === props.modelValue);
  return lang ? lang.label : props.languages[0].label;
});

// Классы для кнопки (состояния по дизайн-системе)
const buttonThemeClasses = computed(() => {
  return isDark.value
    ? "text-white-100 disabled:!text-white-80"
    : "text-black-90 hover:!bg-black-90/5 active:!bg-black-90/10 focus-visible:!outline-black-70 disabled:!text-black-70";
});

// Классы для иконки translate
const iconColorClass = computed(() => {
  return isDark.value ? "brightness-0 invert" : "";
});

// Классы для дропдауна
const dropdownClasses = computed(() => {
  return isDark.value ? "bg-black-90-alpha" : "bg-white-100/80";
});

// Классы для текста
const textColorClass = computed(() => {
  return isDark.value ? "text-white-90" : "text-black-90";
});

// Классы для иконки галочки
const checkIconColorClass = computed(() => {
  return isDark.value ? "brightness-0 invert" : "";
});

// Классы для элемента языка
const getLanguageItemClasses = (lang) => {
  const baseClasses = isDark.value
    ? "hover:bg-white-100/10"
    : "hover:bg-black-90/5";

  return baseClasses;
};

// Переключение дропдауна
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Выбор языка
const selectLanguage = (lang) => {
  emit("update:modelValue", lang.code);
  isOpen.value = false;
};

// Закрытие при клике вне компонента
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
