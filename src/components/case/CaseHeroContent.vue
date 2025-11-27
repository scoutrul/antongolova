<template>
  <div
    class="flex gap-16"
    :class="[
      containerClasses,
      gtXl ? 'items-start justify-between' : 'flex-col',
    ]"
  >
    <div
      class="flex flex-col"
      :class="[gtXl ? 'min-h-[505px] justify-between' : 'gap-16']"
    >
      <!-- Заголовок -->

      <BaseHeading :level="gtXl ? 3 : 4" :as="'h1'" class="text-black-90">
        {{ title }}
      </BaseHeading>
    
      <!-- Статистики -->
      <div  class="grid gap-8 grid-cols-2">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="flex flex-col gap-2"
        >
          <BaseHeading :level="gtLg ? 4 : 5" :as="'div'" class="text-black-90">
            {{ stat.value }}
          </BaseHeading>
          <BaseText :as="'p'" :size="gtLg ? 'p1' : 'p2'" class="text-black-50">
            {{ stat.description }}
          </BaseText>
        </div>
      </div>
    </div>
    <CaseMetaList
      :items="metaItems"
      :header-no-wrap="headerNoWrap"
      :is-floating="isFloating"
    />
  </div>
</template>

<script setup>
import { BaseHeading, BaseText } from "@/components/base/index.js";
import CaseMetaList from "@/components/case/CaseMetaList.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl } = useBreakpoints();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
  },
  metaItems: {
    type: Array,
    default: () => [],
  },
  containerClasses: {
    type: String,
    default: "",
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

</script>
