<template>
  <div class="flex flex-col gap-6">
    <!-- Chip/Badge -->
    <div class="border border-solid border-black-90/5 rounded-full px-6 py-3 w-fit">
      <BaseText :as="'span'" size="p1" class="text-black-90">
        {{ category }}
      </BaseText>
    </div>

    <!-- Description -->
    <BaseText :as="'p'" size="p2" class="text-black-50 lg:whitespace-pre-wrap">
      {{ description }}
    </BaseText>
  </div>
</template>

<script setup>
import { BaseText } from "@/components/base";

defineProps({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
