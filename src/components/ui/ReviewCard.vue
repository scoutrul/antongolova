<template>
  <BaseContentCard
    :title="text"
    :description="author"
    :footer-min-height="false"
  >
    <!-- Картинка в сером блоке со сдвигом и overflow в footer -->
    <template #footer v-if="image && image !== ''">
      <div class="flex-1 pl-6 md:pl-8 pb-0 pr-0">
        <div
          class="bg-white-80 rounded-tl-2xl h-full w-full overflow-hidden min-h-[170px]"
        >
          <img :src="image" :alt="author" class="w-full h-full object-cover" />
        </div>
      </div>
    </template>
  </BaseContentCard>
</template>

<script setup>
import BaseContentCard from "@/components/base/BaseContentCard.vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
});
</script>
