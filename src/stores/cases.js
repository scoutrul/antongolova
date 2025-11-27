import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLanguageStore } from "./language";

// Импорт полных данных кейсов (русский)
import caseAg1Ru from "@/data/ru/cases/ag1.json";

// Импорт полных данных кейсов (английский)
import caseAg1En from "@/data/en/cases/ag1.json";
import caseAdguardWalletEn from "@/data/en/cases/adguard-wallet.json";
import case4realEn from "@/data/en/cases/4real.json";
import caseLegalineEn from "@/data/en/cases/legaline.json";
import caseServeroidEn from "@/data/en/cases/serveroid.json";
import caseAdguardMailEn from "@/data/en/cases/adguard-mail.json";

export const useCasesStore = defineStore("cases", () => {
  const languageStore = useLanguageStore();

  // State - загружаем кейсы из отдельных JSON файлов
  const casesRu = ref([caseAg1Ru]);
  const casesEn = ref([
    caseAg1En,
    caseAdguardWalletEn,
    case4realEn,
    caseLegalineEn,
    caseServeroidEn,
    caseAdguardMailEn,
  ]);

  // Текущие кейсы в зависимости от языка
  const cases = computed(() => {
    return languageStore.currentLanguage === "en"
      ? casesEn.value
      : casesRu.value;
  });

  // Getters
  const getCaseBySlug = computed(() => {
    return (slug) => cases.value.find((c) => c.slug === slug);
  });

  const getNextCase = computed(() => {
    return (currentSlug) => {
      const currentIndex = cases.value.findIndex((c) => c.slug === currentSlug);
      if (currentIndex === -1) return null;
      const nextIndex = (currentIndex + 1) % cases.value.length;
      return cases.value[nextIndex];
    };
  });

  const allCaseSlugs = computed(() => cases.value.map((c) => c.slug));

  // Actions
  function addCase(caseData) {
    const exists = cases.value.some((c) => c.slug === caseData.slug);
    if (!exists) {
      cases.value.push(caseData);
    }
  }

  return {
    // State
    cases,
    // Getters
    getCaseBySlug,
    getNextCase,
    allCaseSlugs,
    // Actions
    addCase,
  };
});
