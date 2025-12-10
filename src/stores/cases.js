import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLanguageStore } from "./language";

// Импорт полных данных кейсов (русский)
import caseGeovoRu from "@/data/ru/cases/geovo.json";
import caseBubblemeRu from "@/data/ru/cases/bubbleme.json";
import caseAstrobitRu from "@/data/ru/cases/astrobit.json";
import caseFutureboxRu from "@/data/ru/cases/futurebox.json";

// Импорт полных данных кейсов (английский)
// leter

export const useCasesStore = defineStore("cases", () => {
  const languageStore = useLanguageStore();

  // State - загружаем кейсы из отдельных JSON файлов
  const casesRu = ref([caseGeovoRu, caseBubblemeRu, caseAstrobitRu, caseFutureboxRu]);
  const casesEn = ref([
    // leter
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
