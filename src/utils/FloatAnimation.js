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
    duration = Math.round(2 + Math.random() * 2.5), // 2-4 сек
    xOffset = Math.round(3 + Math.random() * 5), // 3-8px
    yOffset = Math.round(5 + Math.random() * 10), // 5-15px
    zOffset = Math.round(Math.random() * 5), // 0-5px
    delay = Math.round(Math.random()* 2), // 0-1 сек (целое число)
    ease = "power1.inOut",
  } = options;

  const directionX = Math.random() > 0.5 ? 1 : -1;
  const directionZ = Math.random() > 0.5 ? 1 : -1;

  // Округляем все значения до целых чисел
  const roundedXOffset = Math.round(xOffset);
  const roundedYOffset = Math.round(yOffset);
  const roundedZOffset = Math.round(zOffset);
  const roundedDuration = Math.round(duration);
  const roundedDelay = Math.round(delay);

  return gsap.to(element, {
    x: roundedXOffset * directionX,
    y: -roundedYOffset,
    z: roundedZOffset * directionZ,
    duration: roundedDuration,
    ease: ease,
    repeat: -1,
    yoyo: true,
    delay: roundedDelay,
    snap: {
      x: 0.1,
      y: 0.1,
      z: 0.1,
    },
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

