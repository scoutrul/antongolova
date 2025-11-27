<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <slot>{{ defaultText }}</slot>
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
  defaultText: {
    type: String,
    default: "",
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
      "bg-primary text-white-100 hover:bg-primary-hover active:bg-primary-active hover:text-secondary ",

    // Secondary: кнопка с border
    secondary:
      "border border-black-70 text-black-90 hover:bg-white-100 hover:border-white-80 active:bg-white-90 active:border-white-90 ",

    // Outline: обводка primary
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white-100  ",

    // Ghost: прозрачная
    ghost: "hover:text-secondary hover:bg-transparent active:bg-transparent",

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
  const disabledClasses = props.disabled
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
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>
