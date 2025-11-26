<template>
  <div
    class="case-meta-bar min-w-full sticky sm:relative md:sticky lg:relative bottom-0 gap-6 w-[calc(100vw_-_16px)] -mx-[16px] md:-ml-[40px] lg:-mx-[0] lg:w-auto bg-white-100"
    :class="[
      gtSm ? 'flex justify-between px-4 py-6' : 'flex flex-col gap-4 px-4 py-4',
    ]"
  >
    <!-- Мета-информация -->
    <CaseMetaList
      v-if="metaItems.length"
      :items="metaItems"
      :gap="gtSm ? 'gap-6' : 'gap-4'"
      :class="[gtSm ? 'flex-row' : 'flex-col']"
    />

    <!-- Кнопка "Следующий кейс" -->
    <BaseButton
      v-if="nextCase"
      variant="secondary"
      :size="gtSm ? 'md' : 'wide'"
      @click="navigateToNextCase"
    >
      {{ buttonText }}
    </BaseButton>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { BaseButton } from "@/components/base/index.js";
import CaseMetaList from "@/components/case/CaseMetaList.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { useContentStore } from "@/stores";

const router = useRouter();
const contentStore = useContentStore();
const { gtSm, gtLg } = useBreakpoints();

const buttonText = computed(() => contentStore.meta.nextCaseButton || "");

const props = defineProps({
  metaItems: {
    type: Array,
    required: true,
  },
  nextCase: {
    type: Object,
    default: null,
    validator: (nextCase) => {
      if (!nextCase) return true;
      return (
        typeof nextCase.slug === "string" && typeof nextCase.title === "string"
      );
    },
  },
});

const navigateToNextCase = () => {
  if (props.nextCase?.slug) {
    router.push(`/cases/${props.nextCase.slug}`);
  }
};
</script>
