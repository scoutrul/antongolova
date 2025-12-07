<template>
  <div
    class="bg-white-100/80 xl:bg-transparent flex h-full flex-col md:flex-row xl:flex-col xl:max-w-[310px] gap-4 md:sticky justify-between"
    :class="[
      gtXl
        ? 'flex flex-col gap-16 bg-transparent'
        : gtLg
          ? 'px-10 py-6'
          : 'px-4 py-4',
    ]"
  >
    <!-- Что я сделал -->
    <CaseWorkDone v-if="workDone" :work-done="workDone" theme="light" />

    <!-- Мета-информация -->
    <CaseMetaList :items="metaItems" theme="light" />

    <!-- Кнопка "Следующий кейс" -->
    <BaseButton
      v-if="nextCase"
      variant="secondary"
      size="md"
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
import CaseWorkDone from "@/components/case/CaseWorkDone.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { useContentStore } from "@/stores";

const router = useRouter();
const contentStore = useContentStore();
const { gtLg, gtXl } = useBreakpoints();

const buttonText = computed(
  () => contentStore.meta.nextCaseButton || "Next case"
);

const props = defineProps({
  metaItems: {
    type: Array,
    required: true,
  },
  workDone: {
    type: Object,
    default: null,
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
