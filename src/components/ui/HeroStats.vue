<template>
  <div class="relative md:overflow-hidden">
    <dl class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="flex flex-col gap-4"
        role="presentation"
      >
        <BaseText :as="'dt'" size="h5" class="text-white-100">
          {{ stat.value }}
        </BaseText>
        <BaseText :as="'dd'" size="p2" class="text-black-70">
          {{ stat.description }}
        </BaseText>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { BaseText } from "@/components/base";

defineProps({
  stats: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
