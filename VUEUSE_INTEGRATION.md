# 🎯 VueUse Integration

## 📊 Обзор

Проект использует **@vueuse/core** — коллекцию утилит и composables для Vue 3, которая предоставляет готовые решения для частых задач.

**Версия:** 14.0.0

---

## 📦 Установка

```bash
pnpm add @vueuse/core
```

---

## 🔧 Где используется

### 1. useBreakpoints (обновлен)

**Файл:** `src/composables/useBreakpoints.js`

**Использует:**
- `useWindowSize` - реактивное отслеживание размера окна

**Возможности:**
```javascript
const {
  // Размеры окна (реактивные)
  width,              // Текущая ширина окна
  height,             // Текущая высота окна
  windowWidth,        // Алиас width
  windowHeight,       // Алиас height
  
  // Основные флаги (часто используются)
  isMobile,           // < 640px
  isTablet,           // 640px - 1024px
  isDesktop,          // >= 1024px
  
  // Детальные флаги (все Tailwind breakpoints)
  isXs,               // < 640px
  isSm,               // 640px - 768px
  isMd,               // 768px - 1024px
  isLg,               // 1024px - 1280px
  isXl,               // 1280px - 1536px
  is2xl,              // >= 1536px
  
  // Greater than (>=)
  gtSm,               // >= 640px
  gtMd,               // >= 768px
  gtLg,               // >= 1024px
  gtXl,               // >= 1280px
  gt2xl,              // >= 1536px
  
  // Less than (<)
  ltSm,               // < 640px
  ltMd,               // < 768px
  ltLg,               // < 1024px
  ltXl,               // < 1280px
  lt2xl,              // < 1536px
  
  // Ориентация
  isPortrait,         // height > width
  isLandscape,        // width > height
  
  // Мета-данные
  deviceType,         // 'mobile' | 'tablet' | 'desktop'
  currentBreakpoint,  // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  breakpoints         // Объект с числовыми значениями
} = useBreakpoints()
```

**Примеры использования:**

```vue
<script setup>
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile, isDesktop, width, currentBreakpoint } = useBreakpoints()
</script>

<template>
  <div>
    <!-- Условный рендеринг -->
    <MobileMenu v-if="isMobile" />
    <DesktopMenu v-else />
    
    <!-- Показать текущую ширину -->
    <p>Ширина окна: {{ width }}px</p>
    
    <!-- Показать текущий breakpoint -->
    <p>Breakpoint: {{ currentBreakpoint }}</p>
  </div>
</template>
```

**Адаптивные классы:**
```vue
<script setup>
const { isDesktop, isTablet, isMobile } = useBreakpoints()
</script>

<template>
  <div :class="{
    'text-h3': isDesktop,
    'text-h4': isTablet,
    'text-h5': isMobile
  }">
    Адаптивный заголовок
  </div>
</template>
```

**Watch на изменение размера:**
```javascript
import { watch } from 'vue'

const { width } = useBreakpoints()

watch(width, (newWidth) => {
  console.log('Ширина изменилась:', newWidth)
})
```

---

### 2. AccordionItem (обновлен)

**Файл:** `src/components/ui/AccordionItem.vue`

**Использует:**
- `useResizeObserver` - отслеживание изменения размера элемента

**Функциональность:**
```javascript
import { useResizeObserver } from '@vueuse/core'

// Автоматически пересчитывает высоту при изменении размера контента
useResizeObserver(contentRef, () => {
  updateOpenHeight()
})
```

**Что отслеживается:**
1. **Изменение ширины окна** (`watch(width)`)
   - Пересчет высоты при ресайзе
   - Плавная GSAP анимация до новой высоты
   
2. **Изменение размера контента** (`useResizeObserver`)
   - Если контент динамически меняется (загрузка данных, изображения)
   - Автоматически подстраивает высоту

**Преимущества:**
- ✅ Адаптивность при ресайзе окна
- ✅ Поддержка динамического контента
- ✅ Плавная анимация через GSAP
- ✅ Оптимизированное отслеживание (VueUse использует debounce)

---

## 🚀 Другие полезные утилиты VueUse

### Рекомендации для дальнейшего использования

#### 1. useScroll
Отслеживание скролла страницы:
```javascript
import { useScroll } from '@vueuse/core'

const { x, y, isScrolling, arrivedState } = useScroll(window)

// arrivedState: { top, bottom, left, right }
```

**Применение:** анимация появления элементов при скролле, sticky headers

#### 2. useIntersectionObserver
Отслеживание видимости элемента:
```javascript
import { useIntersectionObserver } from '@vueuse/core'

const targetRef = ref(null)

useIntersectionObserver(
  targetRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // Элемент стал видимым
      console.log('Element is visible!')
    }
  }
)
```

**Применение:** lazy loading изображений, анимация при появлении

#### 3. useLocalStorage / useSessionStorage
Реактивная работа с localStorage:
```javascript
import { useLocalStorage } from '@vueuse/core'

const theme = useLocalStorage('theme', 'light')

// Автоматически синхронизируется с localStorage
theme.value = 'dark'
```

**Применение:** сохранение темы, настроек пользователя, состояния формы

#### 4. useDebounce / useThrottle
Оптимизация частых вызовов:
```javascript
import { useDebounce } from '@vueuse/core'

const input = ref('')
const debouncedInput = useDebounce(input, 500)

watch(debouncedInput, (value) => {
  // Вызовется только через 500ms после последнего изменения
  searchAPI(value)
})
```

**Применение:** поиск, автосохранение, обработка ввода

#### 5. useMouse
Позиция курсора:
```javascript
import { useMouse } from '@vueuse/core'

const { x, y, sourceType } = useMouse()
```

**Применение:** кастомные курсоры, tooltips, drag & drop

#### 6. useMediaQuery
Media queries в JS:
```javascript
import { useMediaQuery } from '@vueuse/core'

const isDark = useMediaQuery('(prefers-color-scheme: dark)')
const isLandscape = useMediaQuery('(orientation: landscape)')
```

**Применение:** адаптация под системную тему, определение ориентации

#### 7. useFetch
Упрощенная работа с API:
```javascript
import { useFetch } from '@vueuse/core'

const { data, error, isFetching } = useFetch('/api/users').json()
```

**Применение:** загрузка данных, API интеграция

#### 8. useClipboard
Работа с буфером обмена:
```javascript
import { useClipboard } from '@vueuse/core'

const { copy, copied, text } = useClipboard()

const copyCode = () => {
  copy('const example = "code"')
}
```

**Применение:** копирование кода, ссылок, текста

#### 9. useTitle
Управление title страницы:
```javascript
import { useTitle } from '@vueuse/core'

const title = useTitle()
title.value = 'New Page Title'
```

**Применение:** динамические заголовки, SEO

#### 10. useDark / useColorMode
Темная тема:
```javascript
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

**Применение:** переключение темы, сохранение предпочтений

---

## 📚 Best Practices

### 1. Используйте composables для переиспользуемой логики
```javascript
// ✅ Правильно - логика инкапсулирована
import { useBreakpoints } from '@/composables/useBreakpoints'
const { isMobile } = useBreakpoints()

// ❌ Неправильно - дублирование кода
const windowWidth = ref(window.innerWidth)
window.addEventListener('resize', ...)
```

### 2. Деструктурируйте только нужные значения
```javascript
// ✅ Правильно - берем только то, что нужно
const { isMobile, isDesktop } = useBreakpoints()

// ⚠️ Избыточно - загружаем все
const breakpoints = useBreakpoints()
```

### 3. Используйте computed для производных значений
```javascript
const { width } = useBreakpoints()

// ✅ Правильно - реактивное вычисление
const columns = computed(() => {
  if (width.value < 640) return 1
  if (width.value < 1024) return 2
  return 3
})
```

### 4. Очистка не требуется
VueUse автоматически очищает event listeners при размонтировании компонента:
```javascript
// ✅ VueUse сам управляет cleanup
const { width, height } = useWindowSize()

// ❌ Не нужно вручную
onUnmounted(() => {
  // VueUse уже все убрал
})
```

---

## 🔗 Документация

- [VueUse Official Docs](https://vueuse.org/)
- [All Functions](https://vueuse.org/functions.html)
- [Best Practices](https://vueuse.org/guide/best-practice.html)

---

## 📊 Текущая статистика использования

| Composable | Где используется | Функциональность |
|-----------|------------------|------------------|
| `useWindowSize` | `useBreakpoints.js` | Реактивное отслеживание размера окна |
| `useResizeObserver` | `AccordionItem.vue` | Отслеживание изменения размера элемента |

---

## 🎯 Планы по расширению

- [ ] `useScroll` для анимаций при скролле
- [ ] `useIntersectionObserver` для lazy loading
- [ ] `useLocalStorage` для сохранения настроек
- [ ] `useDark` для темной темы
- [ ] `useClipboard` для копирования кода
- [ ] `useFetch` для работы с API

---

✅ **VueUse готов к использованию в проекте!**

