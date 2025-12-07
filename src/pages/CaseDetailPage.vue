<template>
  <PageLayout bg="white" header-theme="dark">
    <!-- Hero Section -->
    <CaseHero
      :title="caseData.hero.title"
      :stats="caseData.hero.stats"
      :meta-items="caseData.meta.items"
      :work-done="caseData.meta.workDone"
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
        :work-done="caseData.meta.workDone"
        :next-case="caseData.nextCase"
      />

      <!-- Cases Section -->
      <CasesSection
        :id="sectionAnchors.cases.section"
        :title="casesContent.title"
        :subtitle="casesContent.subtitle"
        :cases="allCases"
      />
    </div>
  </PageLayout>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import PageLayout from "@/layouts/PageLayout.vue";
import CaseHero from "@/components/case/CaseHero.vue";
import CaseOverview from "@/components/case/CaseOverview.vue";
import CaseBody from "@/components/case/CaseBody.vue";
import CasesSection from "@/components/sections/CasesSection.vue";
import { useCasesStore, useContentStore } from "@/stores";
import { SECTION_ANCHORS } from "@/constants/sectionAnchors.js";

const sectionAnchors = SECTION_ANCHORS;
const route = useRoute();
const casesStore = useCasesStore();
const contentStore = useContentStore();

const slug = computed(() => route.params.slug);

// Получаем данные кейса из store
const caseData = computed(() => casesStore.getCaseBySlug(slug.value));

// Данные секции кейсов из контент стора
const casesContent = computed(() => contentStore.currentData?.cases || {});

// Получаем список всех кейсов из контента
const allCases = computed(() => casesContent.value.items || []);
</script>

<style scoped></style>
