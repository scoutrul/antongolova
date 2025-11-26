<template>
  <PageLayout @header-nav-case-scroll="handleNavCaseScroll" bg="white">
    <!-- Hero Section -->
    <CaseHero
      :title="caseData.hero.title"
      :stats="caseData.hero.stats"
      :meta-items="caseData.meta.items"
    />

    <div class="relative z-10">
      <!-- Overview Section -->
      <CaseOverview
        :title="caseData.overview.title"
        :sections="caseData.overview.sections"
      />

      <!-- Body Section -->
      <CaseBody
        :sections="caseData.body.sections"
        :meta-items="caseData.meta.items"
        :next-case="caseData.nextCase"
      />

      <!-- Cases Section -->
      <CasesSection
        id="cases-section"
        :title="casesContent.title"
        :subtitle="casesContent.subtitle"
        :cases="allCases"
      />
    </div>
  </PageLayout>
</template>

<script setup>
import { computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import PageLayout from "@/layouts/PageLayout.vue";
import CaseHero from "@/components/case/CaseHero.vue";
import CaseOverview from "@/components/case/CaseOverview.vue";
import CaseBody from "@/components/case/CaseBody.vue";
import CasesSection from "@/components/sections/CasesSection.vue";
import { useCasesStore, useContentStore } from "@/stores";
import { useSmoothScroll } from "@/composables/useSmoothScroll.js";

const route = useRoute();
const casesStore = useCasesStore();
const contentStore = useContentStore();
const { scrollToElement } = useSmoothScroll();

const slug = computed(() => route.params.slug);

// Получаем данные кейса из store
const caseData = computed(() => casesStore.getCaseBySlug(slug.value));

// Данные секции кейсов из контент стора
const casesContent = computed(() => contentStore.currentData?.cases || {});

// Получаем список всех кейсов из контента
const allCases = computed(() => casesContent.value.items || []);

// Функция для обновления title документа
const updateDocumentTitle = () => {
  if (caseData.value?.hero?.title) {
    document.title = caseData.value.hero.title;
  }
};

// Устанавливаем title при монтировании
onMounted(() => {
  updateDocumentTitle();
});

// Обновляем title при смене кейса
watch(
  () => slug.value,
  () => {
    updateDocumentTitle();
  }
);

// Обработка скролла к секции кейсов
const handleNavCaseScroll = () => {
  const element = document.getElementById("cases-section");
  scrollToElement(element, {
    offset: 0,
    overshoot: 30,
    duration: 1,
  });
};
</script>

<style scoped></style>
