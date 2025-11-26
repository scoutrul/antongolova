<template>
  <BaseCard class="testimonial-card">
    <div class="flex flex-col gap-4">
      <BaseHeading
        :level="gtLg ? 5 : null"
        :as="'h3'"
        :size="gtLg ? null : 'h5'"
        class="text-black-90"
      >
        {{ quote }}
      </BaseHeading>

      <BaseText :as="'p'" size="p2" class="text-black-50">
        {{ author }}
      </BaseText>
    </div>
  </BaseCard>
</template>

<script setup>
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { BaseCard, BaseHeading, BaseText } from "@/components/base";

const { gtLg } = useBreakpoints();

defineProps({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.testimonial-card {
  @apply p-6 sm:p-8;
}
</style>
