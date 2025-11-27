<template>
  <BaseContainer
    as="section"
    bg="white"
    overflow="visible"
    class="case-body !overflow-visible"
  >
    <div
      class="w-full"
      :class="[gtXl ? 'flex items-start gap-[83px]' : 'flex flex-col']"
    >
      <!-- Контент -->
      <div
        class="case-body__content"
        :class="[gtXl ? 'flex-1 min-w-0' : 'w-full']"
      >
        <div class="flex flex-col gap-24">
          <!-- Итерация по секциям -->
          <div
            v-for="(section, sectionIndex) in sections"
            :key="sectionIndex"
            class="flex flex-col gap-14"
          >
            <!-- Заголовок секции -->
            <BaseHeading :level="4" :as="'h2'" class="text-black-90">
              {{ section.title }}
            </BaseHeading>

            <!-- Блоки контента -->
            <div class="flex flex-col gap-14">
              <!-- Блок с текстом и/или изображением -->
              <template
                v-for="(block, blockIndex) in section.blocks"
                :key="blockIndex"
              >
                <!-- Обычный блок контента -->
                <CaseContentBlock
                  v-if="block.type !== 'testimonial'"
                  :block="block"
                />

                <!-- Блок с отзывом -->
                <CaseTestimonial
                  v-else
                  :quote="block.quote"
                  :author="block.author"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary (только на desktop) -->
      <div
        v-if="gtXl"
        class="flex-shrink-0 xl:sticky xl:top-[160px] h-[calc(100vh-280px)]"
      >
        <CaseSummary :meta-items="metaItems" :next-case="nextCase" />
      </div>
    </div>

    <!-- Meta Bar для mobile/tablet -->
    <CaseMetaBar
      class="mt-20"
      v-show="!gtXl"
      :meta-items="visibleMetaItems"
      :next-case="nextCase"
    />
  </BaseContainer>
</template>

<script setup>
import { computed } from "vue";
import { BaseContainer, BaseHeading } from "@/components/base/index.js";
import CaseContentBlock from "@/components/case/CaseContentBlock.vue";
import CaseTestimonial from "@/components/case/CaseTestimonial.vue";
import CaseSummary from "@/components/case/CaseSummary.vue";
import CaseMetaBar from "@/components/case/CaseMetaBar.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtSm, gtXl } = useBreakpoints();

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
  metaItems: {
    type: Array,
    required: true,
  },
  nextCase: {
    type: Object,
    default: null,
  },
});

// Вычисляемое количество отображаемых элементов метаданных
const visibleMetaItems = computed(() => {
  if (gtSm.value) {
    // sm и md показываем первые 3
    return props.metaItems.slice(0, 3);
  } else {
    // По умолчанию (мобильные) показываем первый элемент
    return props.metaItems.slice(0, 0);
  }
});
</script>
