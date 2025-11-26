# OpportunityCard Component

## Описание
Компонент карточки возможности/компетенции с категорией (chip/badge) и описанием. Создан для секции Opportunities на основе макета Figma.

## Структура
```
┌─────────────────┐
│ [Category Chip] │
│                 │
│ Description     │
│ text...         │
└─────────────────┘
```

## Свойства (Props)

| Свойство | Тип | Обязательный | По умолчанию | Описание |
|----------|-----|--------------|--------------|----------|
| category | String | Да | - | Название категории (отображается в chip) |
| description | String | Да | - | Описание возможности (поддерживает \n) |

## Дизайн

### Chip (Badge)
- Border: `border-black-90/5` (очень светлая обводка)
- Border radius: `rounded-full` (полностью закругленный)
- Padding: `px-6 py-3` (24px horizontal, 12px vertical)
- Текст: P1 (20px) в цвете `text-black-90`
- Ширина: `w-fit` (по контенту)

### Description
- Текст: P2 (16px/1.6) в цвете `text-black-50`
- Поддержка переносов: `whitespace-pre-wrap`
- Можно использовать `\n` для многострочного текста

### Spacing
- Gap между chip и описанием: `gap-6` (24px)

## Использование

### Базовый пример
```vue
<OpportunityCard
  category="Задачи"
  description="Приоритизация и планирование в JIRA"
/>
```

### С многострочным описанием
```vue
<OpportunityCard
  category="Разработка"
  description="Контроль pixel-perfect реализации\nТестирование сценариев, поиск ошибок\nПроверка верстки на pixel perfect"
/>
```

### В горизонтальном скролле (mobile)
```vue
<div class="flex gap-4 overflow-x-auto">
  <OpportunityCard
    v-for="item in opportunities"
    :key="item.category"
    class="min-w-[260px] flex-shrink-0"
    v-bind="item"
  />
</div>
```

### С абсолютным позиционированием (desktop)
```vue
<OpportunityCard
  category="Аналитика"
  description="Анализ рынка и конкурентной среды"
  class="absolute left-[878px] top-0 w-[320px]"
/>
```

## Зависимости
- `BaseText` - для текста категории и описания

## Макет Figma
Компонент создан на основе: 
https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo?node-id=4265-2404

## Интеграция с дизайн-системой

### Типографика
- Chip: P1 (20px/1.4/regular)
- Description: P2 (16px/1.6/regular)

### Цвета
- Chip border: `black-90` с прозрачностью 5%
- Chip text: `black-90` (#161616)
- Description: `black-50` (#5c5c5c)

### Spacing
- Используется стандартный gap-6 (24px)

## Адаптивность

### Ширина карточки
- **Mobile**: `min-w-[260px]` в горизонтальном скролле
- **Desktop**: `w-[320px]` с абсолютным позиционированием

Карточка адаптируется автоматически к контенту по высоте.

## Рекомендации

### Контент
- **Категория**: 1-2 слова, краткое название
- **Описание**: 2-4 строки текста, разделенные `\n`
- Используйте конкретные формулировки

### Примеры категорий
- Задачи, Разработка, Аналитика
- Дизайн, Продакт, Другое
- Прило, Nitrix

### Длина описания
Рекомендуется 100-200 символов для оптимального отображения.

## Примеры данных

```javascript
const opportunities = [
  {
    category: 'Задачи',
    description: 'Приоритизация и планирование в JIRA\nСпринты, сроки, оценка и контроль скорости\nДейли, ретро, демо, 1×1 — всё по канону продуктовых циклов'
  },
  {
    category: 'Разработка',
    description: 'Контроль pixel-perfect реализации\nТестирование сценариев, поиск ошибок\nПроверка верстки на pixel perfect'
  },
  {
    category: 'Другое',
    description: 'И ряд смежных дисциплин\nОт графики к анимации\nКачественно без лишнего'
  }
]
```

## Стилизация

### Кастомные классы
```vue
<OpportunityCard
  category="Дизайн"
  description="Создание интерфейсов"
  class="hover:shadow-md transition-shadow"
/>
```

### Анимации
Карточка не имеет встроенных анимаций, но можно добавить через классы:
```vue
<OpportunityCard
  class="transition-all duration-300 hover:-translate-y-1"
  v-bind="opportunity"
/>
```

## Связанные компоненты
- `OpportunitiesSection` - секция, использующая эти карточки
- `BaseText` - базовый текстовый компонент

