import { computed, ref, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

/**
 * Composable для работы с брейкпоинтами и адаптивностью
 * Использует VueUse для эффективного отслеживания размера окна
 *
 * @returns {Object} Реактивные данные о размере экрана и брейкпоинтах
 *
 * @example
 * const { width, height, isMobile, isDesktop } = useBreakpoints()
 */
export function useBreakpoints() {
  // VueUse автоматически отслеживает resize с оптимизацией
  const { width, height } = useWindowSize();

  // Брейкпоинты из Tailwind CSS
  const breakpoints = {
    sm: 640, // Tablet portrait
    md: 768, // Tablet landscape
    lg: 1024, // Desktop
    xl: 1280, // Large desktop
    "2xl": 1536, // Extra large desktop
  };

  // Основные флаги для быстрого использования
  const isMobile = computed(() => width.value < breakpoints.sm);
  const isTablet = computed(
    () => width.value >= breakpoints.sm && width.value < breakpoints.lg
  );
  const isDesktop = computed(() => width.value >= breakpoints.lg);

  // Детальные флаги для всех брейкпоинтов
  const isXs = computed(() => width.value < breakpoints.sm);
  const isSm = computed(
    () => width.value >= breakpoints.sm && width.value < breakpoints.md
  );
  const isMd = computed(
    () => width.value >= breakpoints.md && width.value < breakpoints.lg
  );
  const isLg = computed(
    () => width.value >= breakpoints.lg && width.value < breakpoints.xl
  );
  const isXl = computed(
    () => width.value >= breakpoints.xl && width.value < breakpoints["2xl"]
  );
  const is2xl = computed(() => width.value >= breakpoints["2xl"]);

  // Greater than брейкпоинты (>= значение)
  const gtSm = computed(() => width.value >= breakpoints.sm);
  const gtMd = computed(() => width.value >= breakpoints.md);
  const gtLg = computed(() => width.value >= breakpoints.lg);
  const gtXl = computed(() => width.value >= breakpoints.xl);
  const gt2xl = computed(() => width.value >= breakpoints["2xl"]);

  // Less than брейкпоинты (< значение)
  const ltSm = computed(() => width.value < breakpoints.sm);
  const ltMd = computed(() => width.value < breakpoints.md);
  const ltLg = computed(() => width.value < breakpoints.lg);
  const ltXl = computed(() => width.value < breakpoints.xl);
  const lt2xl = computed(() => width.value < breakpoints["2xl"]);

  // Ориентация экрана
  const isPortrait = computed(() => height.value > width.value);
  const isLandscape = computed(() => width.value > height.value);

  // Тип устройства по размеру (приблизительно)
  const deviceType = computed(() => {
    if (isMobile.value) return "mobile";
    if (isTablet.value) return "tablet";
    return "desktop";
  });

  // Breakpoint name (текущий активный брейкпоинт)
  const currentBreakpoint = computed(() => {
    if (is2xl.value) return "2xl";
    if (isXl.value) return "xl";
    if (isLg.value) return "lg";
    if (isMd.value) return "md";
    if (isSm.value) return "sm";
    return "xs";
  });

  return {
    // Размеры окна
    width,
    height,
    windowWidth: width, // Алиас для обратной совместимости
    windowHeight: height,

    // Основные флаги (используются чаще всего)
    isMobile,
    isTablet,
    isDesktop,

    // Детальные флаги
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,

    // Greater than
    gtSm,
    gtMd,
    gtLg,
    gtXl,
    gt2xl,

    // Less than
    ltSm,
    ltMd,
    ltLg,
    ltXl,
    lt2xl,

    // Ориентация
    isPortrait,
    isLandscape,

    // Мета-данные
    deviceType,
    currentBreakpoint,
    breakpoints,
  };
}
