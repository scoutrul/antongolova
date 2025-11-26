import { ref } from "vue";

export function useAccordion() {
  // Массив открытых элементов (по индексу)
  const openItems = ref(new Set());

  /**
   * Проверяет, открыт ли элемент
   */
  const isOpen = (index) => {
    return openItems.value.has(index);
  };

  /**
   * Переключает состояние элемента
   */
  const toggle = (index) => {
    if (openItems.value.has(index)) {
      openItems.value.delete(index);
    } else {
      openItems.value.add(index);
    }
    // Триггерим реактивность
    openItems.value = new Set(openItems.value);
  };

  /**
   * Открывает элемент
   */
  const open = (index) => {
    openItems.value.add(index);
    openItems.value = new Set(openItems.value);
  };

  /**
   * Закрывает элемент
   */
  const close = (index) => {
    openItems.value.delete(index);
    openItems.value = new Set(openItems.value);
  };

  return {
    openItems,
    isOpen,
    toggle,
    open,
    close,
  };
}
