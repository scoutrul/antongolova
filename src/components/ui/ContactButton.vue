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
      <img src="/assets/icons/send.svg" alt="Send message" class="w-5 h-5" />
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
