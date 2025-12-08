<template>
  <BaseCard class="case-card" @click="handleClick">
    <!-- Текстовый контейнер -->
    <header class="case-card__header">
      <BaseHeading
        :level="gtLg ? 5 : null"
        :as="'h3'"
        :size="gtLg ? null : 'p1'"
        class="text-black-90"
      >
        {{ title }}
      </BaseHeading>

      <BaseText
        :as="'p'"
        size="p2"
        class="text-black-50 min-h-[52px] text-description transition-all duration-300 ease-out"
      >
        {{ description }}
      </BaseText>
    </header>

    <!-- Контейнер медиа -->
    <div
      class="case-card__media"
      :class="{ 'case-card__media-surface': !image }"
    >
      <CaseMedia
        v-if="image"
        :src="image"
        :alt="title"
        class="case-card__image rounded-none"
      />
    </div>
  </BaseCard>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { BaseCard, BaseHeading, BaseText } from "@/components/base";
import CaseMedia from "@/components/case/CaseMedia.vue";

const router = useRouter();
const { gtLg } = useBreakpoints();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String, Array],
    default: "",
  },
  slug: {
    type: String,
    default: "",
  },
});

const handleClick = () => {
  if (props.slug) {
    router.push(`/cases/${props.slug}`);
  }
};
</script>

<style scoped>
.case-card {
  @apply gap-4 transition-all duration-300 ease-out cursor-pointer;
}

.case-card__header {
  @apply flex flex-col gap-2 sm:gap-4 p-6 sm:p-8 h-[166px];
}

.case-card__media {
  @apply w-full h-full flex items-center justify-center overflow-hidden;
}

.case-card__media-surface {
  @apply bg-black-70;
}

.case-card__image {
  @apply w-full h-full object-cover;
  @apply transition-transform duration-300 ease-out;
}

.case-card:hover .text-description {
  @apply text-black-90;
}

.case-card:hover .case-card__image {
  transform: scale(1.05);
}

.case-card:active {
  @apply bg-white-80;
}
</style>
