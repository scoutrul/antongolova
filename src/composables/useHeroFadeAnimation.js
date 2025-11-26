import { onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBreakpoints } from "@/composables/useBreakpoints.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Создает анимацию fade-out для hero секции при скролле
 * @param {Ref} targetRef - Ref элемента для анимации
 * @param {Object} options - Опции анимации
 * @param {number} options.multiplier - Множитель для скорости fade (по умолчанию 1 для мобильных, 1.6 для десктопа)
 */
export function useHeroFadeAnimation(targetRef, options = {}) {
  const { isMobile } = useBreakpoints();
  const { multiplier = 1.6 } = options;
  let scrollTriggerInstance = null;

  onMounted(() => {
    if (targetRef.value && !isMobile.value) {
      const element = targetRef.value.$el || targetRef.value;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const blurValue = self.progress * 5;
          gsap.set(element, {
            opacity: 1 - self.progress * multiplier,
            filter: `blur(${blurValue}px)`,
          });
        },
      });
    }
  });

  onBeforeUnmount(() => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }
  });
}
