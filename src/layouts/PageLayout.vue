<template>
  <div class="relative min-h-screen z-20">
    <StickyHeader
      v-if="props.headerTheme === 'dark' && router.path !== '/'"
      v-bind="headerProps"
      @cta-click="handleCtaClick"
      @nav-case-scroll="$emit('header-nav-case-scroll')"
      @language-change="handleLanguageChange"
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
import { useRouter } from "vue-router";

const router = useRouter();

const languageStore = useLanguageStore();
const contentStore = useContentStore();

const props = defineProps({
  // Header props
  headerTheme: {
    type: String,
    default: "light",
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
  slogan: contentStore.header.slogan,
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
  ctaText: contentStore.benefits.ctaText,
  ctaButtonText: contentStore.benefits.ctaButtonText,
  ...props.footerProps, // Дополнительные атрибуты (id, aria-labelledby и т.д.)
}));

// Обработчик CTA-клика (единый для всего приложения)
const handleCtaClick = () => {
  window.open("http://t.me/meisdigital", "_blank");
};

// Обработчик смены языка
function handleLanguageChange(code) {
  languageStore.setLanguage(code);
}
</script>

<style scoped></style>
