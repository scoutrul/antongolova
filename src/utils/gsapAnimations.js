import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

/**
 * Создает ScrambleText анимацию с ScrollTrigger
 * @param {HTMLElement} element - DOM элемент для анимации
 * @param {string} text - Текст для отображения
 * @param {Object} options - Опции анимации
 * @param {number} options.duration - Длительность анимации (по умолчанию 1.5)
 * @param {number} options.delay - Задержка перед началом (по умолчанию 0)
 * @param {number} options.speed - Скорость смены символов (по умолчанию 0.3)
 * @param {string} options.triggerStart - Позиция срабатывания ScrollTrigger (по умолчанию "top 80%")
 * @returns {gsap.core.Tween} GSAP анимация
 */
export function createScrambleTextAnimation(element, text, options = {}) {
  const {
    duration = 1.5,
    delay = 0,
    speed = 0.3,
    triggerStart = "top 80%",
  } = options;

  return gsap.to(element, {
    duration,
    delay,
    scrambleText: {
      text,
      chars: " ",
      speed,
    },
    scrollTrigger: {
      trigger: element,
      start: triggerStart,
      toggleActions: "play none none none",
    },
  });
}

/**
 * Создает ScrambleText анимацию для нескольких элементов с последовательной задержкой
 * @param {Array} elements - Массив объектов {element, text}
 * @param {Object} options - Опции анимации (см. createScrambleTextAnimation)
 * @param {number} options.staggerDelay - Задержка между элементами (по умолчанию 0.3)
 * @returns {Array<gsap.core.Tween>} Массив GSAP анимаций
 */
export function createScrambleTextSequence(elements, options = {}) {
  const { staggerDelay = 0.3, ...animationOptions } = options;

  return elements.map((item, index) => {
    return createScrambleTextAnimation(item.element, item.text, {
      ...animationOptions,
      delay: (animationOptions.delay || 0) + index * staggerDelay,
    });
  });
}
