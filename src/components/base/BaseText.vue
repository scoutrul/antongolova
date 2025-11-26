<template>
  <component :is="tag" :class="textClasses" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  as: {
    type: String,
    default: "p",
  },
  size: {
    type: String,
    default: "p2",
    validator: (value) => ["h5", "p1", "p2", "p3"].includes(value),
  },
});

const tag = computed(() => props.as);

const textClasses = computed(() => {
  const sizeClasses = {
    h5: "text-h5",
    p1: "text-p1",
    p2: "text-p2",
    p3: "text-p3",
  };

  return sizeClasses[props.size];
});
</script>
