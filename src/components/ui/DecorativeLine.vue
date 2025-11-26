<template>
  <div class="relative w-full h-[72px] flex items-center justify-center">
    <!-- Линия с градиентом через псевдоэлемент -->
    <div v-if="!hideLine" class="decorative-line-gradient"></div>

    <!-- Пины (точки) -->
    <div
      v-if="pinCount > 0"
      class="absolute w-full flex justify-between items-center top-1/2 -translate-y-1/2"
    >
      <svg
        v-for="index in pinCount"
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :key="index"
        :style="{
          opacity: index === pinCount ? 0 : 1,
          marginLeft: index === pinCount ? '-52px' : 0,
        }"
      >
        <circle cx="4.5" cy="4.5" r="4" fill="#161616" stroke="#5C5C5C" />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Цвет линии и пинов
  color: {
    type: String,
    default: "rgba(255, 255, 255, 0.1)",
  },
  // Количество пинов
  pinCount: {
    type: Number,
    default: 0,
  },
  hideLine: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.decorative-line-gradient {
  position: relative;
  width: 100%;
  height: 100%;
}

.decorative-line-gradient::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%
  );
}
</style>
