import gsap from "gsap";

/**
 * Создает анимацию парения для элемента по всем осям
 * @param {HTMLElement} element - DOM элемент для анимации
 * @param {Object} options - Опции анимации
 * @param {number} options.duration - Длительность анимации (по умолчанию 2-3.5 сек, рандом)
 * @param {number} options.xOffset - Смещение по оси X (по умолчанию 3-8px, рандом)
 * @param {number} options.yOffset - Смещение по оси Y (по умолчанию 5-15px, рандом)
 * @param {number} options.zOffset - Смещение по оси Z (по умолчанию 0-5px, рандом)
 * @param {number} options.delay - Задержка перед началом (по умолчанию 0-0.5 сек, рандом)
 * @param {string} options.ease - Тип easing (по умолчанию "sine.inOut")
 * @returns {gsap.core.Tween} GSAP анимация
 */
export function createFloatAnimation(element, options = {}) {
  const {
    duration = 2 + Math.random() * 1.5, // 2-3.5 сек
    xOffset = 3 + Math.random() * 5, // 3-8px
    yOffset = 5 + Math.random() * 10, // 5-15px
    zOffset = Math.random() * 5, // 0-5px
    delay = Math.random() * 0.5, // 0-0.5 сек
    ease = "sine.inOut",
  } = options;

  return gsap.to(element, {
    x: xOffset * (Math.random() > 0.5 ? 1 : -1), // Случайное направление
    y: -yOffset,
    z: zOffset * (Math.random() > 0.5 ? 1 : -1), // Случайное направление
    duration: duration,
    ease: ease,
    repeat: -1,
    yoyo: true,
    delay: delay,
  });
}

/**
 * Создает анимации парения для нескольких элементов
 * @param {NodeList|Array} elements - Коллекция или массив DOM элементов
 * @param {Object} options - Опции анимации (см. createFloatAnimation)
 * @returns {Array<gsap.core.Tween>} Массив GSAP анимаций
 */
export function createFloatAnimations(elements, options = {}) {
  const animations = [];

  Array.from(elements).forEach((el) => {
    if (el) {
      const animation = createFloatAnimation(el, options);
      animations.push(animation);
    }
  });

  return animations;
}

