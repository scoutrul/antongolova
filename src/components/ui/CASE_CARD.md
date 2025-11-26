# CaseCard Component

## Описание
Компонент карточки кейса/проекта с заголовком, описанием и изображением. Создан на основе макета Figma секции "Кейсы".

## Структура
```
┌─────────────────────────┐
│  Заголовок (Title)      │
│  Описание (Description) │
├─────────────────────────┤
│                         │
│   Image Container       │
│                         │
└─────────────────────────┘
```

## Свойства (Props)

| Свойство | Тип | Обязательный | По умолчанию | Описание |
|----------|-----|--------------|--------------|----------|
| title | String | Да | - | Заголовок проекта/кейса |
| description | String | Да | - | Краткое описание проекта |
| image | String | Нет | '' | URL изображения проекта |

## Адаптивность

### Mobile (< 1024px)
- Заголовок: text-p1 (20px) regular
- Описание: text-p2 (16px)
- Padding: 24px (p-6)
- Gap между элементами: 8px (gap-2)
- Минимальная высота: 380px

### Desktop (≥ 1024px)
- Заголовок: text-h5 (28px) medium
- Описание: text-p2 (16px)
- Padding: 32px (p-8)
- Gap между элементами: 16px (gap-4)
- Минимальная высота: 420px

## Дизайн

### Цвета
- Фон карточки: `bg-white-100` (#ffffff)
- Заголовок: `text-black-90` (#161616)
- Описание: `text-black-50` (#5c5c5c)
- Фон изображения: `bg-white-80` (#dedede)

### Закругления
- Общая карточка: `rounded-2xl` (16px)
- Изображение: только `rounded-tl-2xl` (16px верхний левый угол)

### Особенности
- Высота текстового контейнера фиксирована: 166px
- Контейнер изображения растягивается: `flex-1`
- Overflow скрыт для корректного отображения закруглений
- Padding слева для изображения создает эффект отступа

## Использование

### Базовый пример
```vue
<CaseCard
  title="AG1"
  description="Раскрою секрет успеха в Sports Nutrition по подписке"
  image="/images/ag1.jpg"
/>
```

### В составе сетки (AdaptiveGrid)
```vue
<AdaptiveGrid>
  <CaseCard
    v-for="(caseItem, index) in cases"
    :key="index"
    class="min-w-[260px] sm:min-w-[auto] box-content sm:box-border min-h-[380px] sm:min-h-[420px]"
    :title="caseItem.title"
    :description="caseItem.description"
    :image="caseItem.image"
  />
</AdaptiveGrid>
```

### Без изображения
```vue
<CaseCard
  title="Legaline"
  description="eCommerce площадка в сфере Legal Law"
/>
```

## Зависимости
- `BaseHeading` - для заголовков на desktop
- `BaseText` - для текста и заголовков на mobile
- `useBreakpoints` - для адаптивности

## Макет Figma
Компонент создан на основе: 
https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo?node-id=4115-11601

## Интеграция с дизайн-системой

### Типографика
- Использует стандартные типографические классы из дизайн-системы
- H5 (28px/1.2/medium) на desktop
- P1 (20px/1.4/regular) на mobile для заголовков
- P2 (16px/1.6/regular) для описания

### Цвета
- Следует палитре проекта (white-100, black-90, black-50, white-80)

### Spacing
- Использует стандартные Tailwind spacing классы
- Адаптивные отступы через breakpoints

## Рекомендации
1. Используйте качественные изображения оптимального размера
2. Заголовки должны быть краткими (1-2 слова)
3. Описание ограничено min-h-[52px] - 2-3 строки текста
4. В сетке всегда добавляйте min-h для корректного отображения
5. Image URL должен быть доступен или оставьте пустым для placeholder

## Примеры кастомизации

### С дополнительными классами
```vue
<CaseCard
  title="Проект"
  description="Описание проекта"
  image="/path/to/image.jpg"
  class="hover:shadow-lg transition-shadow duration-300"
/>
```

### В горизонтальном скролле (mobile)
```vue
<div class="flex gap-4 overflow-x-auto pb-4">
  <CaseCard
    v-for="item in cases"
    :key="item.id"
    class="min-w-[260px] flex-shrink-0"
    v-bind="item"
  />
</div>
```

