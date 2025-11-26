import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Композбл для отслеживания тем секций и управления темой хедера
 * @param {Object} sectionRefs - Объект с refs всех секций
 * @returns {Object} - { isScrolled, headerTheme }
 */
export function useSectionThemeTracking(sectionRefs) {
  // Состояние скролла для хедера
  const isScrolled = ref(false);

  // Тема хедера (по умолчанию темная, так как первая секция Hero темная)
  const headerTheme = ref("dark");

  // Определение темы секции (темная = 'dark', светлая = 'light')
  // Header должен быть противоположным теме секции
  const sectionThemes = {
    hero: "dark", // bg-black-90 -> Header должен быть dark
    tools: "dark", // bg-black-90 -> Header должен быть dark
    cases: "light", // bg-white-90 -> Header должен быть dark
  };

  // Отслеживание скролла
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
    if (!isScrolled.value) {
      ScrollTrigger.refresh();
    }
  };

  // Инициализация ScrollTrigger для отслеживания секций
  const initSectionThemeTracking = () => {
    const sections = [
      { ref: sectionRefs.heroSectionRef, key: "hero" },
      { ref: sectionRefs.toolsSectionRef, key: "tools" },
      { ref: sectionRefs.casesSectionRef, key: "cases" },
    ];

    sections.forEach(({ ref, key }) => {
      if (!ref) {
        console.warn(`Section ref for ${key} is not provided`);
        return;
      }

      if (!ref.value) {
        console.warn(`Section ref for ${key} is not available`);
        return;
      }

      // Находим корневой элемент секции (BaseContainer)
      // В Vue 3 компонент имеет $el для корневого элемента
      const sectionElement = ref.value.$el;

      if (!sectionElement) {
        console.warn(`Section element for ${key} is not found`);
        return;
      }

      ScrollTrigger.create({
        trigger: sectionElement,
        start: "top top", // Когда верх секции касается верха экрана
        end: "bottom top", // Когда низ секции касается верха экрана
        onEnter: () => {
          // Секция входит в верх экрана
          const sectionTheme = sectionThemes[key];
          // Header должен быть противоположным теме секции
          headerTheme.value = sectionTheme === "dark" ? "dark" : "light";
        },
        onEnterBack: () => {
          // Скроллим назад, секция снова входит в верх экрана
          const sectionTheme = sectionThemes[key];
          headerTheme.value = sectionTheme === "dark" ? "dark" : "light";
        },
        onLeave: () => {
          // Секция покидает верх экрана (скроллим вниз)
          // Не меняем тему, так как следующая секция уже активирована
        },
        onLeaveBack: () => {
          // Секция покидает верх экрана (скроллим вверх)
          // Не меняем тему, так как предыдущая секция уже активирована
        },
      });
    });
  };

  onMounted(async () => {
    window.addEventListener("scroll", handleScroll);

    await nextTick();

    // Инициализируем отслеживание тем секций
    initSectionThemeTracking();

    // Устанавливаем начальную тему на основе первой секции (Hero)
    // Hero темная, поэтому Header должен быть темным
    headerTheme.value = sectionThemes.hero === "dark" ? "dark" : "light";

    // Обновляем ScrollTrigger после инициализации
    ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });

  return {
    isScrolled,
    headerTheme,
  };
}
