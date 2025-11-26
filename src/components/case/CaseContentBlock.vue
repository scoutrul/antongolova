<template>
  <div class="content-block flex flex-col gap-6">
    <!-- Заголовок секции (H4) -->
    <BaseHeading v-if="block.title" :level="4" :as="'h3'" class="text-black-90">
      {{ block.title }}
    </BaseHeading>

    <!-- Подзаголовок (H5) для subsection -->
    <BaseHeading
      v-if="block.subtitle"
      :level="5"
      :as="'h4'"
      class="text-black-90"
    >
      {{ block.subtitle }}
    </BaseHeading>

    <!-- Текстовый контент -->
    <!-- eslint-disable vue/no-v-text-v-html-on-component -->
    <BaseText
      v-if="block.text"
      :as="'div'"
      size="p1"
      class="text-black-90 whitespace-pre-line"
      v-html="formatText(block.text)"
    />
    <!-- eslint-enable vue/no-v-text-v-html-on-component -->

    <!-- Медиа (изображение или видео) -->
    <CaseMedia
      v-if="block.image"
      :src="block.image"
      :src-mobile="block.imageMobile"
      :alt="block.subtitle || block.title || 'Case study media'"
      :poster="block.poster"
    />
  </div>
</template>

<script setup>
import { BaseHeading, BaseText } from "@/components/base";
import CaseMedia from "@/components/case/CaseMedia.vue";

defineProps({
  block: {
    type: Object,
    required: true,
    validator: (block) => {
      // Должен быть хотя бы один из: title, subtitle, text, image
      return block.title || block.subtitle || block.text || block.image;
    },
  },
});

// Форматирование текста для поддержки параграфов
const formatText = (text) => {
  if (!text) return "";
  // Заменяем двойные переносы строки на параграфы
  return text
    .split("\n\n")
    .map((para) => `<p class="mb-0">${para.replace(/\n/g, "<br>")}</p>`)
    .join("");
};
</script>

<style scoped>
.content-block {
  @apply w-full;
}
</style>
