<template>
  <BaseContainer :as="'section'" bg="white" :id="sectionId || undefined">
    <!-- Заголовок и подзаголовок -->
    <div class="flex flex-col gap-4 mb-16 xl:mb-24">
      <BaseHeading
        :level="gtLg ? 3 : 4"
        :as="gtLg ? 'h2' : 'h3'"
        class="w-full text-black-90"
        :id="headingId || undefined"
      >
        {{ title }}
      </BaseHeading>

      <BaseText :as="'p'" size="p1" class="text-black-50 w-full">
        {{ subtitle }}
      </BaseText>
    </div>

    <!-- Группировка по годам -->
    <div class="flex flex-col gap-12 xl:gap-16">
      <div
        v-for="[year, yearGroup] in groupedCasesByYear"
        :key="year"
        class="flex flex-col gap-6 xl:gap-8"
      >
        <!-- Заголовок года -->
        <BaseHeading
          :level="gtLg ? 4 : 5"
          :as="gtLg ? 'h3' : 'h4'"
          class="text-black-90"
        >
          {{ year }}
        </BaseHeading>

        <!-- Адаптивная сетка карточек для года -->
        <AdaptiveGrid is-cards as="ul" role="list">
          <li
            v-for="(caseItem, index) in yearGroup"
            :key="`${year}-${index}`"
            class="list-none"
          >
            <CaseCard
              class="min-w-[260px] sm:min-w-[auto] box-content sm:box-border min-h-[380px] sm:min-h-[420px] flex-1"
              :title="caseItem.title"
              :description="caseItem.description"
              :image="caseItem.image"
              :slug="caseItem.slug"
            />
          </li>
        </AdaptiveGrid>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed } from "vue";
import {
  BaseContainer,
  BaseHeading,
  BaseText,
  AdaptiveGrid,
} from "@/components/base";
import CaseCard from "@/components/ui/CaseCard.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg } = useBreakpoints();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  cases: {
    type: Array,
    required: true,
    validator: (cases) => {
      return cases.every(
        (caseItem) =>
          typeof caseItem.title === "string" &&
          typeof caseItem.description === "string"
      );
    },
  },
  headingId: {
    type: String,
    default: "",
  },
  sectionId: {
    type: String,
    default: "",
  },
});

// Группировка кейсов по годам
const groupedCasesByYear = computed(() => {
  const grouped = {};

  props.cases.forEach((caseItem) => {
    const year = caseItem.year || 2025; // По умолчанию 2025, если год не указан
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(caseItem);
  });

  // Преобразуем в массив пар [year, cases] и сортируем по убыванию (новые сверху)
  // Разворачиваем кейсы внутри каждого года (последние первыми)
  return Object.entries(grouped)
    .map(([year, cases]) => [year, [...cases].reverse()])
    .sort((a, b) => Number(b[0]) - Number(a[0]));
});
</script>
