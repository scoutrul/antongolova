<template>
  <BaseContentCard :title="title" :description="description">
    <!-- Список с чекмарками в header-content -->
    <template #header-content>
      <div v-if="items && items.length" class="flex flex-col">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex gap-4 items-center py-1 md:py-2"
        >
          <!-- Иконка чекмарка -->
          <div class="w-4 h-4 shrink-0">
            <img
              :src="checkmarkIcon"
              alt=""
              class="w-full h-full object-contain"
            />
          </div>

          <BaseText :as="'p'" size="p2" class="text-black-50 flex-1">
            {{ item }}
          </BaseText>
        </div>
      </div>
    </template>
  </BaseContentCard>
</template>

<script setup>
import BaseContentCard from "@/components/base/BaseContentCard.vue";
import { BaseText } from "@/components/base";
const checkmark = "/assets/icons/checkmark.svg";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  checkmarkIcon: {
    type: String,
    default: checkmark,
  },
});
</script>
