<template>
  <BaseContainer
    :as="'section'"
    bg="super-white"
  >
    <div
      class="w-full max-w-[1592px] mx-auto"
      :class="[
        gtXl
          ? 'grid grid-cols-[1fr_2fr_2fr] gap-8'
          : gtLg
            ? 'flex flex-col gap-16'
            : 'flex flex-col gap-8',
      ]"
    >
      <!-- Заголовок секции -->
      <BaseText
        :as="'h2'"
        size="p1"
        class="text-black-50"
        :class="gtXl ? '' : 'mb-8'"
      >
        {{ title }}
      </BaseText>

      <!-- Текстовые блоки -->
      <BaseHeading
        v-for="(section, index) in sections"
        :key="index"
        :level="5"
        :as="'div'"
        class="text-black-90"
      >
        {{ section.text }}
      </BaseHeading>
    </div>
  </BaseContainer>
</template>

<script setup>
import {
  BaseContainer,
  BaseHeading,
  BaseText,
} from "@/components/base/index.js";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  title: {
    type: String,
    required: true,
  },
  sections: {
    type: Array,
    required: true,
    validator: (sections) => {
      return sections.every((section) => typeof section.text === "string");
    },
  },
});
</script>
