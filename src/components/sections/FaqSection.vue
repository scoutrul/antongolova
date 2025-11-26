<template>
  <BaseContainer :as="'section'" :maxWidth="'1052px'" bg="white">
    <BaseHeading
      :level="3"
      :as="'h2'"
      class="w-full text-black-90 mb-16"
      :id="headingId || undefined"
    >
      {{ title }}
    </BaseHeading>

    <ul class="flex flex-col items-start w-full" role="list">
      <li
        v-for="(item, index) in faqItems"
        :key="index"
        class="w-full list-none"
      >
        <AccordionItem
          :question="item.question"
          :answer="item.answer"
          :is-open="isOpen(index)"
          :is-last="index === faqItems.length - 1"
          @toggle="toggle(index)"
        />
      </li>
    </ul>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading } from "@/components/base";
import AccordionItem from "@/components/ui/AccordionItem.vue";
import { useAccordion } from "@/composables/useAccordion";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  faqItems: {
    type: Array,
    required: true,
  },
  headingId: {
    type: String,
    default: "",
  },
});

const { isOpen, toggle } = useAccordion(props.faqItems.length);
</script>
