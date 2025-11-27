<template>
  <BaseButton
    variant="ghost"
    size="md"
    class="min-w-[120px] justify-center font-medium"
    :class="buttonThemeClasses"
    @click="toggleLanguage"
  >
    {{ currentLanguageLabel }}
  </BaseButton>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";

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
const router = useRouter();

const isDark = computed(() => props.theme === "dark");

const languagesList = computed(() => props.languages || []);

const currentLanguage = computed(() => {
  const found = languagesList.value.find(
    (lang) => lang.code === props.modelValue
  );
  return found || languagesList.value[0] || { label: "", code: "" };
});

const currentLanguageLabel = computed(() => currentLanguage.value.label);

const buttonThemeClasses = computed(() => {
  return isDark.value
    ? "text-white-100 hover:bg-white-100/10 active:bg-white-100/15"
    : "text-black-90 hover:bg-black-90/5 active:bg-black-90/10";
});

const navigateToLanguage = (code) => {
  const targetPath = code === "en" ? "/en" : "/ru";
  router.push(targetPath);
};

const toggleLanguage = () => {
  if (!languagesList.value.length) {
    return;
  }

  const currentIndex = languagesList.value.findIndex(
    (lang) => lang.code === currentLanguage.value.code
  );

  const nextIndex =
    currentIndex === -1 ? 0 : (currentIndex + 1) % languagesList.value.length;

  const nextCode = languagesList.value[nextIndex].code;

  emit("update:modelValue", nextCode);
  navigateToLanguage(nextCode);
};
</script>
