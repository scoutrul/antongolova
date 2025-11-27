import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLanguageStore = defineStore("language", () => {
  // State
  const storedLanguage = localStorage.getItem("language");
  if (!storedLanguage) {
    localStorage.setItem("language", "ru");
  }
  const currentLanguage = ref(storedLanguage || "ru");

  // Getters
  const isRussian = computed(() => currentLanguage.value === "ru");
  const isEnglish = computed(() => currentLanguage.value === "en");

  // Actions
  function setLanguage(code) {
    if (["ru", "en"].includes(code)) {
      currentLanguage.value = code;
      localStorage.setItem("language", code);
    }
  }

  function toggleLanguage() {
    const newLang = currentLanguage.value === "ru" ? "en" : "ru";
    setLanguage(newLang);
  }

  return {
    // State
    currentLanguage,
    // Getters
    isRussian,
    isEnglish,
    // Actions
    setLanguage,
    toggleLanguage,
  };
});
