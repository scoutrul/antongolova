<template>
  <div class="max-w-[calc(100vw-32px)]">
    <component
    :is="as"
    :class="wrapperClasses"
    v-bind="$attrs"
    :role="computedRole || undefined"
    >
    <slot />
  </component>
</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isCards: {
    type: Boolean,
    default: false,
  },
  as: {
    type: String,
    default: "div",
  },
  role: {
    type: String,
    default: null,
  },
});

const baseWrapperClasses = "min-w-[100vw] md:min-w-[auto]";

const gridClasses = computed(() => {
  const classes = [
    "w-full",
    "overflow-hidden overflow-x-auto",
    "px-4 -mx-4 sm:px-0 sm:mx-0",
    "gap-6 sm:gap-8",
  ];

  if (props.isCards) {
    classes.push("flex flex-row sm:grid sm:grid-cols-2 xl:grid-cols-4");
  } else {
    classes.push("flex flex-row");
  }

  return classes.join(" ");
});

const wrapperClasses = computed(() => {
  return [baseWrapperClasses, gridClasses.value].filter(Boolean).join(" ");
});

const computedRole = computed(() => {
  if (props.role) {
    return props.role;
  }

  if (props.as === "ul") {
    return "list";
  }

  return null;
});
</script>
