<template>
  <BaseContainer :as="'section'" bg="white">
    <BaseHeading
      :level="gtLg ? 3 : 4"
      :as="gtLg ? 'h3' : 'h4'"
      class="w-full text-black-90 mb-16 xl:mb-24"
      :class="gtXl ? 'text-center' : 'text-left'"
      :id="headingId || undefined"
    >
      {{ title }}
    </BaseHeading>

    <AdaptiveGrid class="!grid-cols-1">
      <ComparisonTable :attributes="attributes" :columns="columns" />
    </AdaptiveGrid>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading, AdaptiveGrid } from "@/components/base";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import ComparisonTable from "@/components/ui/ComparisonTable.vue";

const { gtLg, gtXl } = useBreakpoints();

defineProps({
  title: {
    type: String,
    default: "",
  },
  attributes: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  headingId: {
    type: String,
    default: "",
  },
});
</script>
