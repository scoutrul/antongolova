<template>
  <BaseCard>
    <!-- Верхняя часть с заголовком и описанием -->
    <div
      class="p-6 md:p-8 flex flex-col gap-2 md:gap-4"
      :class="hasFooter ? '' : 'flex-1 justify-between'"
    >
      <div class="flex flex-col gap-2 md:gap-4">
        <BaseText
          :as="gtMd ? 'h3' : 'h4'"
          :size="gtMd ? 'h5' : 'p1'"
          class="text-black-90"
        >
          {{ title }}
        </BaseText>

        <BaseText
          :as="'p'"
          size="p2"
          class="text-black-50"
          :class="footerMinHeight ? 'min-h-[52px]' : ''"
        >
          {{ description }}
        </BaseText>
      </div>

      <!-- Слот для дополнительного контента в header (например, список) -->
      <slot name="header-content" />
    </div>

    <!-- Слот для нижней части (например, картинка) -->
    <slot name="footer" />
  </BaseCard>
</template>

<script setup>
import { computed, useSlots } from "vue";
import { BaseCard, BaseText } from "@/components/base";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtMd } = useBreakpoints();
const slots = useSlots();

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  footerMinHeight: {
    type: Boolean,
    default: false,
  },
});

const hasFooter = computed(() => !!slots.footer);
</script>
