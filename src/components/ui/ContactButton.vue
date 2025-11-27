<template>
  <BaseButton
    variant="ghost"
    :disabled="disabled"
    :loading="loading"
    @click="handleClick"
    class="w-full sm:w-fit"
  >
    <!-- Слот для иконки -->
    <slot name="icon">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3333 1.66667L9.16667 10.8333M18.3333 1.66667L12.5 18.3333L9.16667 10.8333M18.3333 1.66667L1.66667 7.5L9.16667 10.8333"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </slot>
    <slot>{{ defaultText }}</slot>
  </BaseButton>
</template>

<script setup>
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  size: {
    type: String,
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  defaultText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  emit("click", event);
};
</script>
