<template>
  <BaseContainer :as="'section'" bg="white">
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

    <AdaptiveGrid is-cards as="ul" role="list">
      <li v-for="(card, index) in cards" :key="index" class="list-none">
        <ExpertiseCard
          class="min-w-[212px] sm:min-w-[auto] box-content sm:box-border min-h-[380px] sm:min-h-[420px] flex-1"
          :title="card.title"
          :description="card.description"
          :items="card.items"
        />
      </li>
    </AdaptiveGrid>
  </BaseContainer>
</template>

<script setup>
import {
  BaseContainer,
  BaseHeading,
  BaseText,
  AdaptiveGrid,
} from "@/components/base";
import ExpertiseCard from "@/components/ui/ExpertiseCard.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg } = useBreakpoints();

defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  cards: {
    type: Array,
    required: true,
    validator: (cards) => {
      return cards.every(
        (card) =>
          typeof card.title === "string" && typeof card.description === "string"
      );
    },
  },
  headingId: {
    type: String,
    default: "",
  },
});
</script>
