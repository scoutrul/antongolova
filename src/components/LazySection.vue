<template>
  <div ref="targetRef" v-bind="containerAttrs" :style="{ minHeight: minHeight }">
    <component
      :is="asyncComponent"
      v-if="isVisible"
      v-bind="forwardedAttrs"
    />
  </div>
</template>

<script setup>
import { markRaw, computed, useAttrs, defineOptions } from "vue";
import { useLazySection } from "@/composables/useLazySection.js";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  component: {
    type: [Object, Function],
    required: true,
  },
  minHeight: {
    type: String,
    default: "auto",
  },
  rootMargin: {
    type: String,
    default: "200px",
  },
});

const { isVisible, targetRef } = useLazySection({
  rootMargin: props.rootMargin,
});

const attrs = useAttrs();

const containerAttrs = computed(() => {
  const allowedKeys = ["id", "class", "style", "role"];
  return Object.keys(attrs).reduce((acc, key) => {
    if (
      allowedKeys.includes(key) ||
      key.startsWith("aria-") ||
      key.startsWith("data-")
    ) {
      acc[key] = attrs[key];
    }
    return acc;
  }, {});
});

const forwardedAttrs = computed(() => {
  const containers = containerAttrs.value;
  return Object.keys(attrs).reduce((acc, key) => {
    if (!(key in containers)) {
      acc[key] = attrs[key];
    }
    return acc;
  }, {});
});

const asyncComponent = markRaw(props.component);
</script>

