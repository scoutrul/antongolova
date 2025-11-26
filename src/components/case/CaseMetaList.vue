<template>
  <div
    class="flex flex-col sm:w-[70%] md:w-full md:flex-row xl:flex-col xl:max-w-[310px] gap-4 md:gap-6"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex flex-col flex-1 align-start"
    >
      <BaseText
        :as="'div'"
        :size="valueSize"
        class="text-black-90"
        :class="[
          !headerNoWrap
            ? 'whitespace-nowrap xl:whitespace-normal'
            : 'whitespace-normal',
        ]"
      >
        {{ item.value }}
      </BaseText>
      <BaseText :as="'div'" :size="labelSize" class="text-black-50">
        {{ item.label }}
      </BaseText>
    </div>
  </div>
</template>

<script setup>
import { BaseText } from "@/components/base/index.js";

defineProps({
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
});
</script>
