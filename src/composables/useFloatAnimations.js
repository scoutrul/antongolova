import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import {
  createFloatAnimation,
  createFloatAnimations,
} from "@/utils/FloatAnimation.js";

/**
 * Composable для управления анимациями парения
 * @param {Object} options - Опции
 * @param {Ref<Boolean>} options.isFloating - Условие для включения анимации
 * @param {Ref<HTMLElement>} options.containerRef - Ref контейнера
 * @param {Array<Object>} options.selectors - Массив объектов с селекторами и опциями
 * @param {Function} options.watchSource - Источник для watch (опционально)
 * @returns {Object} Объект с функциями управления анимациями
 */
export function useFloatAnimations(options) {
  const { isFloating, containerRef, selectors = [], watchSource } = options;
  const animations = ref([]);

  const initAnimations = () => {
    if (!isFloating.value) return;

    // Очищаем предыдущие анимации
    animations.value.forEach((anim) => anim.kill());
    animations.value = [];

    selectors.forEach(({ selector, elementRef, options: animOptions = {} }) => {
      if (elementRef?.value) {
        // Если передан ref отдельного элемента
        const anim = createFloatAnimation(elementRef.value, animOptions);
        animations.value.push(anim);
      } else if (selector && containerRef?.value) {
        // Если передан селектор для поиска элементов
        const elements = containerRef.value.querySelectorAll(selector);
        if (elements.length > 0) {
          const anims = createFloatAnimations(elements, animOptions);
          animations.value.push(...anims);
        }
      }
    });
  };

  onMounted(() => {
    nextTick(() => {
      initAnimations();
    });
  });

  if (watchSource) {
    watch(
      watchSource,
      () => {
        nextTick(() => {
          initAnimations();
        });
      },
      { deep: true }
    );
  }

  onBeforeUnmount(() => {
    animations.value.forEach((anim) => anim.kill());
    animations.value = [];
  });

  return {
    initAnimations,
  };
}

