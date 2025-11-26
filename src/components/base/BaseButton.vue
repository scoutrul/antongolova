<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "outline", "ghost", "tertiary"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "wide"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 overflow-hidden whitespace-nowrap min-h-fit";

  // Варианты (из дизайн-системы Figma)
  const variantClasses = {
    // Primary: зеленая кнопка
    primary:
      "bg-primary text-white-100 hover:bg-primary-hover active:bg-primary-active  ",

    // Secondary: кнопка с border
    secondary:
      "border border-black-70 text-black-90 hover:bg-white-100 hover:border-white-80 active:bg-white-90 active:border-white-90 ",

    // Outline: обводка primary
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white-100  ",

    // Ghost: прозрачная
    ghost: "text-primary hover:bg-primary/10  ",

    // Tertiary: текстовая кнопка из шапки
    tertiary:
      "bg-transparent text-white-100 hover:bg-white-100/10 active:bg-white-100/15 disabled:text-white-80 disabled:bg-transparent disabled:hover:bg-transparent",
  };

  // Размеры
  const sizeClasses = {
    sm: "h-10 px-4 py-2 text-sm rounded-button",
    md: "h-12 px-6 py-2 text-p2 rounded-button",
    lg: "h-14 px-8 py-3 text-p1 rounded-button",
    wide: "h-12 w-full px-6 py-2 text-p2 rounded-button",
  };

  // Состояние disabled
  const disabledClasses =
    props.disabled || props.loading
      ? props.variant === "tertiary"
        ? "cursor-not-allowed opacity-60"
        : "opacity-50 cursor-not-allowed"
      : "cursor-pointer";

  return [
    "w-fit",
    "border-solid",
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    disabledClasses,
  ].join(" ");
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>
