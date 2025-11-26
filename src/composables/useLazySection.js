import { ref, onMounted, onUnmounted } from "vue";

/**
 * Композиция для ленивой загрузки секций через IntersectionObserver
 * @param {Object} options - настройки наблюдателя
 * @param {string} options.rootMargin - отступ от viewport (например, "200px")
 * @param {number} options.threshold - порог видимости (0.0 - 1.0)
 * @returns {Object} { isVisible, targetRef }
 */
export function useLazySection(options = {}) {
  const {
    rootMargin = "200vh", 
    threshold = 0.01,
  } = options;

  const isVisible = ref(false);
  const targetRef = ref(null);
  let observer = null;

  onMounted(() => {
    if (!targetRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.value) {
            isVisible.value = true;
            // После первой загрузки отключаем наблюдение
            observer?.disconnect();
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(targetRef.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return {
    isVisible,
    targetRef,
  };
}

