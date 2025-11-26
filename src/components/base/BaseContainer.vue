<template>
  <component :is="as" :class="containerClasses" v-bind="$attrs">
    <div
      class="flex flex-col items-start w-full max-w-[1048px] xl:max-w-[1592px] mx-auto"
      :style="{ maxWidth: maxWidth }"
    >
      <slot />
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  bg: {
    type: String,
    default: "",
    validator: (value) => {
      if (value === "") return true;
      return ["white", "black", "super-white"].includes(value);
    },
  },
  as: {
    type: String,
    default: "div",
  },
  maxWidth: {
    type: String,
    default: "full",
  },
  overflow: {
    type: String,
    default: "hidden",
    validator: (value) => ["hidden", "visible", "auto"].includes(value),
  },
});

const containerClasses = computed(() => {
  const baseClasses = "w-full px-4 py-16 md:px-10 lg:px-16 xl:py-40 xl:py-40";

  // Overflow
  const overflowClasses = `overflow-${props.overflow}`;

  // Фон: маппинг простых ключей на классы Tailwind
  let bgClasses = "";
  if (props.bg === "white") {
    bgClasses = "bg-white-90";
  } else if (props.bg === "black") {
    bgClasses = "bg-black-90";
  } else if (props.bg === "super-white") {
    bgClasses = "bg-white-100";
  }

  return [baseClasses, overflowClasses, bgClasses].filter(Boolean).join(" ");
});
</script>
