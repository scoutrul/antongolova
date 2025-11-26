# CasesSection Component

## Описание
Секция для отображения портфолио проектов/кейсов с адаптивной сеткой карточек. Создана на основе макета Figma.

## Структура
```
┌──────────────────────────────────────┐
│  Заголовок (H3/H4)                   │
│  Подзаголовок (P1)                   │
│                                      │
│  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │ Case │  │ Case │  │ Case │ ...   │
│  │ Card │  │ Card │  │ Card │       │
│  └──────┘  └──────┘  └──────┘       │
└──────────────────────────────────────┘
```

## Свойства (Props)

| Свойство | Тип | Обязательный | По умолчанию | Описание |
|----------|-----|--------------|--------------|----------|
| title | String | Нет | 'Кейсы' | Заголовок секции |
| subtitle | String | Нет | 'Некоторые из моих историй...' | Подзаголовок секции |
| cases | Array | Да | - | Массив объектов кейсов |

### Структура объекта case
```javascript
{
  title: String,        // Название проекта (обязательно)
  description: String,  // Описание проекта (обязательно)
  image: String         // URL изображения (опционально)
}
```

## Адаптивность

### Mobile (< 640px)
- Заголовок: H4 (46px)
- Horizontal scroll
- Карточки: 260px ширина
- Gap: 16px
- Padding: 64px vertical, 16px horizontal
- Margin bottom: 64px

### Tablet (640px - 1024px)
- Заголовок: H4 (46px)
- 2 карточки в ряд
- Карточки: ~456px ширина
- Gap: 32px
- Padding: 128px vertical, 40px horizontal
- Margin bottom: 64px

### Desktop (≥ 1024px)
- Заголовок: H3 (64px)
- 4 карточки в ряд (flex-1)
- Gap: 32px
- Padding: 160px vertical, 64px horizontal
- Margin bottom: 96px

## Дизайн

### Цвета
- Фон секции: `bg-white-90` (#f6f6f5)
- Заголовок: `text-black-90` (#161616)
- Подзаголовок: `text-black-50` (#5c5c5c)
- Карточки: белый фон через CaseCard

### Spacing
- Gap между заголовком и подзаголовком: 16px
- Gap между header и карточками: 64px (xl: 96px)
- Gap между карточками: 16px (sm: 32px)

## Использование

### Базовый пример
```vue
<CasesSection
  title="Кейсы"
  subtitle="Некоторые из моих историй, которые точно не оставят равнодушным"
  :cases="casesData"
/>
```

### С кастомными данными
```vue
<script setup>
const myCases = [
  {
    title: 'AG1',
    description: 'Раскрою секрет успеха в Sports Nutrition по подписке',
    image: '/images/ag1.jpg'
  },
  {
    title: 'AdGuard Wallet',
    description: 'Как защитить свои криптоактивы c помощью передовых подходов в Fintech',
    image: '/images/adguard.jpg'
  },
  {
    title: '4Real',
    description: 'iGaming, который действительно вовлекает',
    image: '/images/4real.jpg'
  },
  {
    title: 'Legaline',
    description: 'eCommerce площадка в сфере Legal Law',
    image: '/images/legaline.jpg'
  }
]
</script>

<template>
  <CasesSection :cases="myCases" />
</template>
```

### Минимальный пример (только обязательные props)
```vue
<CasesSection
  :cases="[
    { title: 'Project 1', description: 'Description 1' },
    { title: 'Project 2', description: 'Description 2' }
  ]"
/>
```

## Валидация

Компонент включает валидацию массива `cases`:
- Каждый элемент должен содержать `title` (String)
- Каждый элемент должен содержать `description` (String)
- Поле `image` опционально

При невалидных данных Vue выдаст предупреждение в консоли.

## Компоненты

### Используемые базовые компоненты
- `BaseContainer` - контейнер секции с настройками padding и background
- `BaseHeading` - адаптивные заголовки (H3/H4)
- `BaseText` - текст подзаголовка (P1)
- `AdaptiveGrid` - адаптивная сетка для карточек

### Используемые UI компоненты
- `CaseCard` - карточка отдельного кейса

## Макет Figma
Компонент создан на основе: 
https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo?node-id=4115-11601

## Интеграция с дизайн-системой

### Типографика
- H3: 64px/1/medium (desktop)
- H4: 46px/1/medium (mobile)
- P1: 20px/1.4/regular (подзаголовок)

### BaseContainer
```vue
<BaseContainer 
  :as="'section'"
  :bg="'bg-white-90'"
>
```

### AdaptiveGrid
Автоматически управляет:
- Количеством колонок на разных breakpoints
- Gap между элементами
- Horizontal scroll на мобильных

## Рекомендации

### Количество кейсов
- **Минимум**: 2 кейса
- **Оптимально**: 4 кейса (для desktop grid 4 колонки)
- **Максимум**: без ограничений, но рекомендуется 4-8

### Контент
- Заголовки кейсов: короткие (1-3 слова)
- Описания: 50-80 символов (2-3 строки)
- Изображения: 400x300px минимум, соотношение ~4:3

### SEO
- Используйте семантический HTML (section, h2/h3)
- Добавляйте alt-текст к изображениям в CaseCard
- Структурируйте контент иерархически

## Производительность

### Оптимизация изображений
```javascript
// Рекомендуемый формат данных с lazy loading
const cases = [
  {
    title: 'Project',
    description: 'Description',
    image: '/images/project-thumb.webp', // WebP формат
    imageLarge: '/images/project-full.jpg' // Full resolution
  }
]
```

### Lazy loading
Рассмотрите добавление lazy loading для изображений при большом количестве кейсов.

## Примеры кастомизации

### С дополнительными классами на секции
```vue
<CasesSection
  :cases="cases"
  class="my-custom-section"
/>
```

### Переопределение стилей через CSS
```css
.my-custom-section {
  /* Кастомные стили */
}
```

## Связанные компоненты
- `ReviewsSection` - похожая структура с отзывами
- `ExpertiseSection` - секция с экспертизой
- `BenefitsSection` - секция с преимуществами
- `CaseCard` - карточка кейса

## История изменений
- v1.0.0 (2024) - Первоначальная реализация на основе Figma макета

