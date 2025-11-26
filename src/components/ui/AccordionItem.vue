<template>
  <div class="border-white-80 py-4 w-full" :class="[isLast ? '' : 'border-b']">
    <button
      type="button"
      class="w-full text-left px-0 py-4 rounded-2xl cursor-pointer"
      @click="handleToggle"
    >
      <BaseText
        :as="'h3'"
        :size="isDesktop ? 'h5' : 'p1'"
        class="text-black-90 font-medium"
      >
        {{ question }}
      </BaseText>
    </button>

    <div ref="answerRef" class="overflow-hidden" style="height: 0; opacity: 0">
      <div ref="contentRef" class="px-0 pt-2 pb-4">
        <BaseText
          :as="'div'"
          size="p2"
          class="text-black-10"
          v-html="formattedAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, computed } from "vue";
import { gsap } from "gsap";
import { useResizeObserver } from "@vueuse/core";
import { BaseText } from "@/components/base";
import { useBreakpoints } from "@/composables/useBreakpoints";

const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle"]);

// Преобразуем \n в <br> для корректного отображения переносов строк
const formattedAnswer = computed(() => {
  return props.answer.replace(/\n/g, "<br>");
});

const { isDesktop, width } = useBreakpoints();

const answerRef = ref(null);
const contentRef = ref(null);

const handleToggle = () => {
  emit("toggle");
};

// Функция для получения актуальной высоты контента
const getContentHeight = () => {
  return contentRef.value ? contentRef.value.scrollHeight : 0;
};

// Функция для обновления высоты открытого элемента
const updateOpenHeight = () => {
  if (props.isOpen && answerRef.value && contentRef.value) {
    const newHeight = getContentHeight();
    gsap.to(answerRef.value, {
      height: newHeight,
      duration: 0.2,
      ease: "power2.out",
    });
  }
};

// GSAP анимация при изменении isOpen
watch(
  () => props.isOpen,
  async (newValue) => {
    await nextTick();

    if (!answerRef.value || !contentRef.value) return;

    const contentHeight = getContentHeight();

    if (newValue) {
      gsap.to(answerRef.value, {
        height: contentHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(answerRef.value, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }
);

// Отслеживание изменения размера окна для пересчета высоты
watch(width, () => {
  updateOpenHeight();
});

// Отслеживание изменения размера контента (если контент динамический)
useResizeObserver(contentRef, () => {
  updateOpenHeight();
});

// Инициализация - если открыт по умолчанию (на десктопе)
onMounted(async () => {
  if (props.isOpen) {
    await nextTick();
    if (answerRef.value && contentRef.value) {
      const contentHeight = getContentHeight();
      gsap.set(answerRef.value, {
        height: contentHeight,
        opacity: 1,
      });
    }
  }
});
</script>

<style scoped></style>
