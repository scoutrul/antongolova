<template>
  <div
    ref="containerRef"
    class="flex flex-col sm:w-[70%] md:w-full md:flex-row xl:flex-col xl:max-w-[310px] gap-4 md:gap-6"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col flex-1 align-start meta-item transition-transform"
    >
      <BaseText
        :as="'div'"
        :size="valueSize"
        class="text-black-90 transform-none"
        :class="[
          !headerNoWrap
            ? 'whitespace-nowrap xl:whitespace-normal'
            : 'whitespace-normal',
        ]"
      >
        {{ item.value }}
      </BaseText>
      <BaseText :as="'div'" :size="labelSize" class="text-black-50 transform-none">
        {{ item.label }}
      </BaseText>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { BaseText } from "@/components/base/index.js";
import { useFloatAnimations } from "@/composables/useFloatAnimations.js";

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (items) => {
      return items.every(
        (item) =>
          typeof item.value === "string" && typeof item.label === "string"
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
  headerNoWrap: {
    type: Boolean,
    default: false,
  },
  isFloating: {
    type: Boolean,
    default: false,
  },
});

const containerRef = ref(null);
const isFloatingRef = computed(() => props.isFloating);

useFloatAnimations({
  isFloating: isFloatingRef,
  containerRef: containerRef,
  selectors: [
    {
      selector: ".meta-item",
    },
  ],
  watchSource: () => props.items,
});
</script>
