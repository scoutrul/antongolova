<template>
  <BaseContainer :as="'section'" bg="black" class="relative overflow-hidden">
    <NeuralBg />
    <div class="relative w-full flex flex-col gap-10 xl:gap-16">
      <BaseHeading
        :level="gtLg ? 3 : 4"
        :as="gtLg ? 'h3' : 'h4'"
        class="w-full text-white-90 backdrop-blur-[20px] p-3 md:p-6 rounded-lg -mx-3 md:-mx-6 max-w-fit"
        :id="headingId || undefined"
      >
        {{ title }}
      </BaseHeading>

      <template v-if="content?.question || content?.columns?.length">
        <div class="h-px w-full bg-black-10/60" />

        <div class="flex flex-col gap-6 lg:gap-8 mb-24 xl:mb-32">
          <BaseText
            v-if="content.question"
            :as="'p'"
            size="p1"
            class="text-black-70"
            v-show="ltLg"
          >
            {{ content.question }}
          </BaseText>
          <div
            class="grid grid-cols-1 gap-6 lg:gap-8 items-start lg:grid lg:grid-cols-3"
          >
            <BaseText
              v-if="content.question"
              :as="'p'"
              size="p1"
              class="text-black-70"
              v-show="gtLg"
            >
              {{ content.question }}
            </BaseText>

            <BaseText
              v-for="(text, idx) in content.columns"
              :key="idx"
              :as="'p'"
              :size="gtMd ? 'h5' : 'p1'"
              class="text-white-90"
            >
              {{ text }}
            </BaseText>
          </div>
        </div>
      </template>

      <ul :class="gridClasses" role="list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-col gap-6 items-start"
        >
          <div class="w-8 h-8 shrink-0">
            <img :src="item.icon" alt="" class="w-full h-full object-contain" />
          </div>

          <BaseText
            :as="'p'"
            size="p2"
            class="text-black-70 whitespace-pre-wrap"
          >
            {{ item.text }}
          </BaseText>
        </li>
      </ul>
    </div>
  </BaseContainer>
</template>

<script setup>
import { computed } from "vue";
import { BaseContainer, BaseHeading, BaseText } from "@/components/base";
import NeuralBg from "@/components/ui/bg-neural/NeuralBg.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtMd, ltLg } = useBreakpoints();

defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: Object,
    default: () => ({
      question: "",
      columns: [],
    }),
  },
  items: {
    type: Array,
    required: true,
    validator: (items) => items.every((i) => typeof i.text === "string"),
  },
  headingId: {
    type: String,
    default: "",
  },
});

const gridClasses = computed(() => {
  // по умолчанию 1 колонка, sm — 2, lg — 3, 2xl — 6
  return [
    "grid w-full gap-x-8 gap-y-10",
    "grid-cols-2",
    "md:grid-cols-3",
    "xl:grid-cols-6",
  ].join(" ");
});
</script>

<style scoped></style>
