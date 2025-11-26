<template>
  <component
    :is="as"
    :class="['rounded-2xl overflow-hidden flex flex-col h-full', variantClass]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "white",
    validator: (value) => ["white", "transparent"].includes(value),
  },
  as: {
    type: String,
    default: "article",
  },
});

const variantClass = computed(() => {
  return props.variant === "transparent" ? "bg-transparent" : "bg-white-100";
});
</script>
