<template>
  <div class="flex flex-col gap-2 case-work-done">
    <BaseText 
      :as="'div'" 
      :size="labelSize" 
      :class="theme === 'dark' ? 'text-white-80' : 'text-black-50'"
    >
      {{ workDone.label }}
    </BaseText>
    <BaseText
      :as="'div'"
      :size="valueSize"
      :class="[
        'whitespace-normal',
        theme === 'dark' ? 'text-white-100' : 'text-black-90'
      ]"
    >
      {{ workDone.value }}
    </BaseText>
  </div>
</template>

<script setup>
import { BaseText } from "@/components/base/index.js";

const props = defineProps({
  workDone: {
    type: Object,
    required: true,
    validator: (workDone) => {
      return (
        typeof workDone.value === "string" && typeof workDone.label === "string"
      );
    },
  },
  valueSize: {
    type: String,
    default: "p2",
  },
  labelSize: {
    type: String,
    default: "p2",
  },
  theme: {
    type: String,
    default: "dark",
    validator: (value) => ["light", "dark"].includes(value),
  },
});
</script>

<style scoped>
.case-work-done {
  @apply w-full;
}
</style>

