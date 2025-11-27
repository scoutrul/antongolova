<template>
  <BaseContainer
    :as="'section'"
    :max-width="'1052px'"
    bg="black"
    class="relative"
  >
    <DecorativeLine
      :pin-count="0"
      class="hidden lg:block !absolute top-0 left-1/2 transform -translate-x-1/2"
      :style="{ top: gtXl ? '314px' : ltLg ? '405px' : '282px' }"
    />

    <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start w-full">
      <div class="flex flex-col items-start flex-0">
        <!-- Заголовок секции -->
        <BaseHeading
          :level="4"
          :as="'h2'"
          class="w-full text-white-90 text-[46px] leading-[1.2] sm:text-[64px] sm:leading-none mb-[90px]"
          :style="{ maxWidth: ltXl ? '430px' : 'inherit' }"
          :id="headingId || undefined"
        >
          {{ title }}
        </BaseHeading>

        <DecorativeLine
          :pin-count="benefits.length + 1"
          :hide-line="gtLg"
          class="hidden sm:block"
        />

        <ul class="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full" role="list">
          <li
            v-for="(benefit, index) in benefits"
            :key="index"
            class="list-none"
          >
            <BenefitCard :text="benefit.text" />
          </li>
        </ul>
      </div>

      <div
        class="flex flex-col gap-6 items-start w-full xl:w-[max-content] sm:self-stretch min-w-[240px] sm:min-w-auto shrink-1"
      >
        <ContactButton @click="handleCtaClick">
          {{ ctaButtonText }}
        </ContactButton>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { BaseContainer, BaseHeading } from "@/components/base";
import BenefitCard from "@/components/ui/BenefitCard.vue";
import DecorativeLine from "@/components/ui/DecorativeLine.vue";
import ContactButton from "@/components/ui/ContactButton.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

const { gtLg, gtXl, ltXl, ltLg } = useBreakpoints();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  benefits: {
    type: Array,
    required: true,
  },
  ctaButtonText: {
    type: String,
    default: "",
  },
  headingId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["cta-click"]);

const handleCtaClick = () => {
  emit("cta-click");
  console.log("CTA кнопка нажата");
};
</script>
