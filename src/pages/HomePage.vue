<template>
  <main class="min-h-screen" role="main">
    <!-- Основной контент страницы -->
    <PageLayout
      bg="white"
      :header-theme="headerTheme"
      :footer-props="{
        id: sectionAnchors.benefits.section,
        'aria-labelledby': sectionAnchors.benefits.heading,
        headingId: sectionAnchors.benefits.heading,
      }"
      @header-nav-case-scroll="handleNavCaseScroll"
    >
      <!-- Tools (Dark) -->
      <ToolsSection
        ref="toolsSectionRef"
        class="mt-12"
        :id="sectionAnchors.tools.section"
        :aria-labelledby="sectionAnchors.tools.heading"
        :heading-id="sectionAnchors.tools.heading"
        :title="content.tools.title"
        :content="content.tools.content"
        :items="content.tools.items"
      />

      <!-- Cases Секция -->
      <CasesSection
        ref="casesSectionRef"
        :id="sectionAnchors.cases.section"
        :aria-labelledby="sectionAnchors.cases.heading"
        :heading-id="sectionAnchors.cases.heading"
        :title="content.cases.title"
        :subtitle="content.cases.subtitle"
        :cases="content.cases.items"
      />

      <!-- FAQ Секция (Lazy) -->
      <FaqSection
        ref="faqSectionRef"
        :id="sectionAnchors.faq.section"
        :aria-labelledby="sectionAnchors.faq.heading"
        :heading-id="sectionAnchors.faq.heading"
        :title="content.faq.title"
        :faq-items="content.faq.items"
      />
    </PageLayout>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import PageLayout from "@/layouts/PageLayout.vue";
import ToolsSection from "@/components/sections/ToolsSection.vue";
import CasesSection from "@/components/sections/CasesSection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";

import { useSectionThemeTracking } from "@/composables/useSectionThemeTracking.js";
import { useContentStore } from "@/stores";
import { useSmoothScroll } from "@/composables/useSmoothScroll.js";
import { SECTION_ANCHORS } from "@/constants/sectionAnchors.js";
import { onBeforeMount } from "vue";

const { scrollToElement } = useSmoothScroll();
const contentStore = useContentStore();

// Получаем данные из store
const content = computed(() => contentStore.currentData);

// Используем константы якорей секций
const sectionAnchors = SECTION_ANCHORS;

// Refs для секций
const toolsSectionRef = ref(null);
const casesSectionRef = ref(null);
const faqSectionRef = ref(null);

// Используем композбл для отслеживания тем секций
const { headerTheme } = useSectionThemeTracking({
  toolsSectionRef,
  casesSectionRef,
  faqSectionRef,
});

// Обработка скролла к секции кейсов
const handleNavCaseScroll = () => {
  const element = document.getElementById(sectionAnchors.cases.section);
  scrollToElement(element);
};

onBeforeMount(() => {
  const element = document.getElementById(sectionAnchors.cases.section);
  scrollToElement(element, { duration: 0, offset: -100 });
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
