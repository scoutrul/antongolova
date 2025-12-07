<template>
  <div class="relative min-h-screen z-20">
    <StickyHeader
      v-bind="headerProps"
      @cta-click="handleCtaClick"
      @nav-case-scroll="handleNavCaseScroll"
      @language-change="handleLanguageChange"
      @slogan-click="handleSloganClick"
      v-if="showHeader"
    />

    <slot />

    <BenefitsSection v-bind="computedFooterProps" @cta-click="handleCtaClick" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import StickyHeader from "@/components/sections/StickyHeader.vue";
import BenefitsSection from "@/components/sections/BenefitsSection.vue";
import { useLanguageStore, useContentStore } from "@/stores";
import { useSmoothScroll } from "@/composables/useSmoothScroll.js";
import { SECTION_ANCHORS } from "@/constants/sectionAnchors.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const { scrollToElement } = useSmoothScroll();
const sectionAnchors = SECTION_ANCHORS;
const languageStore = useLanguageStore();
const contentStore = useContentStore();
const router = useRouter();
const props = defineProps({
  // Header props
  headerTheme: {
    type: String,
    default: "dark",
    validator: (value) => ["light", "dark"].includes(value),
  },
  bg: {
    type: String,
    default: "black",
    validator: (value) => ["black", "white"].includes(value),
  },
  // Footer props (для дополнительных атрибутов типа id, aria-labelledby)
  footerProps: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["header-nav-case-scroll"]);

// Собираем props для хедера из store
const headerProps = computed(() => ({
  slogans:
    contentStore.header.slogans ||
    (contentStore.header.slogan ? [contentStore.header.slogan] : []),
  navigationItems: contentStore.header.navigationItems,
  languages: contentStore.header.languages,
  currentLanguage: languageStore.currentLanguage,
  theme: props.headerTheme,
  buttonText: "",
}));

// Собираем props для футера из store
const computedFooterProps = computed(() => ({
  title: contentStore.benefits.title,
  benefits: contentStore.benefits.items,
  ctaButtonText: contentStore.benefits.ctaButtonText,
  ...props.footerProps, // Дополнительные атрибуты (id, aria-labelledby и т.д.)
}));

// Обработчик CTA-клика (единый для всего приложения)
const handleCtaClick = () => {
  window.open("http://t.me/antonGolova", "_blank");
};

// Обработчик смены языка
function handleLanguageChange(code) {
  languageStore.setLanguage(code);
}

const handleNavCaseScroll = () => {
  const element = document.getElementById(sectionAnchors.cases.section);
  scrollToElement(element, {
    offset: 0,
    overshoot: 30,
    duration: 1,
  });
};

const showHeader = computed(() => {
  return route.name === "CaseDetail" || props.headerTheme === "dark";
});

const handleSloganClick = () => {
  router.push("/");
};
</script>

<style scoped></style>
