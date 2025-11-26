<template>
  <BaseContainer
    as="section"
    bg="white"
    class="case-hero pt-[128px] md:pt-[160px] xl:pt-[200px] !pb-16 md:!pb-24 xl:!pb-16"
  >
    <!-- Fixed блок -->
    <CaseHeroContent
      ref="fixedHero"
      :title="title"
      :stats="stats"
      :meta-items="metaItems"
      header-no-wrap
      container-classes="case-hero-fixed invisible lg:visible fixed top-[128px] md:top-[160px] xl:top-[200px] left-[16px] right-[16px] md:left-[32px] md:right-[32px] lg:left-[64px] lg:right-[64px] z-0 max-w-[100vw] xl:max-w-[1592px]"
    />

    <!-- Дубликат для fixed эффекта -->
    <CaseHeroContent
      :title="title"
      :stats="stats"
      :meta-items="metaItems"
      header-no-wrap
      container-classes="relative z-9 lg:opacity-0 pointer-events-none"
    />
  </BaseContainer>
</template>

<script setup>
import { ref } from "vue";
import { BaseContainer } from "@/components/base/index.js";
import CaseHeroContent from "@/components/case/CaseHeroContent.vue";
import { useHeroFadeAnimation } from "@/composables/useHeroFadeAnimation.js";

const fixedHero = ref(null);

// Применяем fade анимацию к hero секции
useHeroFadeAnimation(fixedHero);

defineProps({
  title: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
    validator: (stats) => {
      return stats.every(
        (stat) =>
          typeof stat.value === "string" && typeof stat.description === "string"
      );
    },
  },
  metaItems: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
@media (min-width: 1280px) {
  .case-hero-fixed {
    width: calc(100vw - 148px);
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
