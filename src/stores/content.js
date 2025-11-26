import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useLanguageStore } from "./language";

// Импорт русских данных
import metaRu from "@/data/ru/meta.json";
import headerRu from "@/data/ru/header.json";
import heroRu from "@/data/ru/hero.json";
import toolsRu from "@/data/ru/tools.json";
import casesRu from "@/data/ru/cases.json";
import howWeWorkRu from "@/data/ru/howWeWork.json";
import expertiseRu from "@/data/ru/expertise.json";
import comparisonRu from "@/data/ru/comparison.json";
import opportunitiesRu from "@/data/ru/opportunities.json";
import reviewsRu from "@/data/ru/reviews.json";
import faqRu from "@/data/ru/faq.json";
import benefitsRu from "@/data/ru/benefits.json";

// Импорт английских данных
import metaEn from "@/data/en/meta.json";
import headerEn from "@/data/en/header.json";
import heroEn from "@/data/en/hero.json";
import toolsEn from "@/data/en/tools.json";
import casesEn from "@/data/en/cases.json";
import howWeWorkEn from "@/data/en/howWeWork.json";
import expertiseEn from "@/data/en/expertise.json";
import comparisonEn from "@/data/en/comparison.json";
import opportunitiesEn from "@/data/en/opportunities.json";
import reviewsEn from "@/data/en/reviews.json";
import faqEn from "@/data/en/faq.json";
import benefitsEn from "@/data/en/benefits.json";

export const useContentStore = defineStore("content", () => {
  const languageStore = useLanguageStore();

  // Собираем русские данные из отдельных файлов
  const dataRu = ref({
    meta: metaRu,
    header: headerRu,
    hero: heroRu,
    tools: toolsRu,
    cases: casesRu,
    howWeWork: howWeWorkRu,
    expertise: expertiseRu,
    comparison: comparisonRu,
    opportunities: opportunitiesRu,
    reviews: reviewsRu,
    faq: faqRu,
    benefits: benefitsRu,
  });

  // Собираем английские данные из отдельных файлов
  const dataEn = ref({
    meta: metaEn,
    header: headerEn,
    hero: heroEn,
    tools: toolsEn,
    cases: casesEn,
    howWeWork: howWeWorkEn,
    expertise: expertiseEn,
    comparison: comparisonEn,
    opportunities: opportunitiesEn,
    reviews: reviewsEn,
    faq: faqEn,
    benefits: benefitsEn,
  });

  // Getters
  const currentData = computed(() => {
    return languageStore.currentLanguage === "en"
      ? dataEn.value
      : dataRu.value;
  });

  // Секции для удобного доступа
  const meta = computed(() => currentData.value.meta || {});
  const header = computed(() => currentData.value.header || {});
  const hero = computed(() => currentData.value.hero || {});
  const tools = computed(() => currentData.value.tools || {});
  const cases = computed(() => currentData.value.cases || {});
  const howWeWork = computed(() => currentData.value.howWeWork || {});
  const expertise = computed(() => currentData.value.expertise || {});
  const comparison = computed(() => currentData.value.comparison || {});
  const opportunities = computed(() => currentData.value.opportunities || {});
  const reviews = computed(() => currentData.value.reviews || {});
  const faq = computed(() => currentData.value.faq || {});
  const benefits = computed(() => currentData.value.benefits || {});

  return {
    // State
    dataRu,
    dataEn,
    // Getters
    currentData,
    meta,
    header,
    hero,
    tools,
    cases,
    howWeWork,
    expertise,
    comparison,
    opportunities,
    reviews,
    faq,
    benefits,
  };
});
