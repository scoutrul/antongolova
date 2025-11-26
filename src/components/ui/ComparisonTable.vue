<template>
  <div
    class="comparison-grid w-full grid gap-x-6 xl:gap-x-8 items-start"
    :style="gridStyle"
  >
    <!-- Лейблы слева -->
    <div class="flex flex-col items-start justify-center">
      <div class="h-16 opacity-0" />
      <BaseText
        v-for="attribute in attributes"
        :key="attribute"
        size="p1"
        class="h-16 flex items-center text-black-90 md:text-h5"
      >
        {{ attribute }}
      </BaseText>
    </div>

    <div
      v-for="column in columns"
      :key="column.title"
      :style="{ maxWidth: '260px' }"
    >
      <div
        v-if="column.highlight"
        class="bg-white-100 rounded-[16px] shadow-[0_8px_24px_0_rgba(0,0,0,0.02)]"
      >
        <div class="h-16 px-6 flex items-center rounded-[16px]">
          <BaseText size="p1" class="text-black-90 md:text-h5">
            {{ column.title }}
          </BaseText>
        </div>
        <div
          v-for="(text, idx) in column.items"
          :key="`${column.title}-${idx}`"
          class="h-16 px-6 flex items-center gap-2"
        >
          <span class="text-[#1CB166] text-[16px] leading-[16px]">✓</span>
          <BaseText size="p2" class="text-black-90">
            {{ text }}
          </BaseText>
        </div>
      </div>
      <div v-else>
        <div class="h-16 px-6 flex items-center">
          <BaseText size="p1" class="text-black-90 md:text-h5">
            {{ column.title }}
          </BaseText>
        </div>
        <div
          v-for="(text, idx) in column.items"
          :key="`${column.title}-${idx}`"
          class="h-16 px-6 flex items-center gap-2"
        >
          <span class="w-4 h-4 text-[16px] leading-[16px] text-black-50"
            >×</span
          >
          <BaseText size="p2" class="text-black-50">
            {{ text }}
          </BaseText>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { BaseText } from "@/components/base";

const props = defineProps({
  attributes: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
});

const gridStyle = computed(() => {
  const columnsLength = props.columns.length;

  if (!columnsLength) {
    return {};
  }

  return {
    "--comparison-desktop-template": `215px repeat(${columnsLength}, minmax(220px, 1fr))`,
    "--comparison-mobile-template": `172px repeat(${columnsLength}, 240px)`,
    maxWidth: "max-content",
    margin: "auto",
  };
});
</script>

<style scoped>
.comparison-grid {
  grid-template-columns: var(--comparison-desktop-template);
}

@media (max-width: 767px) {
  .comparison-grid {
    grid-template-columns: var(--comparison-mobile-template);
    padding-bottom: 8px;
  }
}
</style>
