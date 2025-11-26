<template>
  <div class="flex items-center justify-start">
    <div
      v-for="(avatar, index) in avatars"
      :key="index"
      class="relative h-12 w-12 overflow-hidden rounded-full border-4 border-black-90 bg-gradient-to-br from-white-100/10 via-white-100/5 to-transparent -mr-6 last:mr-0"
      :style="{ zIndex: avatars.length - index }"
    >
      <img
        v-if="avatar?.src"
        :src="avatar.src"
        :alt="avatar?.alt || 'avatar'"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  avatars: {
    type: Array,
    default: () => [],
  },
});
</script>
