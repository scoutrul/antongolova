import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLanguageStore } from "./language";

// Импорт полных данных кейсов (русский)
import caseGeovoRu from "@/data/ru/cases/geovo.json";
import caseBubblemeRu from "@/data/ru/cases/bubbleme.json";
import caseAstrobitRu from "@/data/ru/cases/astrobit.json";
import caseFutureboxRu from "@/data/ru/cases/futurebox.json";
import caseZemipravRu from "@/data/ru/cases/zemiprav.json";
import caseNeweraRu from "@/data/ru/cases/newera.json";
import caseFrontstartRu from "@/data/ru/cases/frontstart.json";

// Импорт полных данных кейсов (английский)
import caseGeovoEn from "@/data/en/cases/geovo.json";
import caseBubblemeEn from "@/data/en/cases/bubbleme.json";
import caseAstrobitEn from "@/data/en/cases/astrobit.json";
import caseFutureboxEn from "@/data/en/cases/futurebox.json";
import caseZemipravEn from "@/data/en/cases/zemiprav.json";
import caseNeweraEn from "@/data/en/cases/newera.json";
import caseFrontstartEn from "@/data/en/cases/frontstart.json";

export const useCasesStore = defineStore("cases", () => {
  const languageStore = useLanguageStore();

  // State - загружаем кейсы из отдельных JSON файлов
  const casesRu = ref([
    caseGeovoRu,
    caseBubblemeRu,
    caseAstrobitRu,
    caseFutureboxRu,
    caseZemipravRu,
    caseNeweraRu,
    caseFrontstartRu,
  ]);
  const casesEn = ref([
    caseGeovoEn,
    caseBubblemeEn,
    caseAstrobitEn,
    caseFutureboxEn,
    caseZemipravEn,
    caseNeweraEn,
    caseFrontstartEn,
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
