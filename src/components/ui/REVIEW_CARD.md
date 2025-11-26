# ReviewCard - Карточка отзыва

## Описание
Специализированная карточка для отзывов клиентов. Содержит текст отзыва, автора и картинку в сером блоке со сдвигом (как в макете Figma).

## Использование

### С картинкой

```vue
<ReviewCard
  text="У нас теперь просто потрясающая дизайн-система"
  author="Ник Боус, дизайн-директор AG1"
  image="https://example.com/photo.jpg"
/>
```

### Без картинки

```vue
<ReviewCard
  text="Отличная работа!"
  author="Иван Иванов, CEO компании"
/>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `text` | String | required | Текст отзыва |
| `author` | String | required | Автор отзыва |
| `image` | String | '' | URL картинки (опционально) |

## Структура

```
┌─────────────────────────┐
│  Текст отзыва (H5/P1)   │
│  Автор (P2, 52px min)   │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │   Серый блок с      │ │
│ │   картинкой         │ │
│ │   (сдвиг слева,     │ │
│ │   скругление)       │ │
└─┴─────────────────────┴─┘
```

## Стилизация

### Контент
- Отступы: 24px (mobile), 32px (desktop)
- Текст: H5 (28px) на desktop, P1 (20px) на mobile
- Автор: P2 (16px), min-height 52px

### Картинка
- Серый контейнер: `bg-white-80` (#DEDEDE)
- Отступ слева: 24px (mobile), 32px (desktop)
- Скругление: `rounded-tl-2xl` (только левый верхний угол)
- Высота: `flex-1`, min 180px
- Картинка: `object-cover` для заполнения

## Наследование

Наследуется от **BaseCard** - базовой карточки:
- Белый фон
- Закругленные углы
- Overflow hidden
- Flex column layout

## Адаптивность

- **Mobile** (< 768px):
  - Отступы: 24px
  - Заголовок: P1 (20px)
  
- **Desktop** (≥ 768px):
  - Отступы: 32px
  - Заголовок: H5 (28px)

## Пример в секции

```vue
<AdaptiveGrid mobile-mode="scroll">
  <ReviewCard
    v-for="review in reviews"
    :key="review.id"
    class="min-w-[260px] sm:min-w-[auto] min-h-[380px] sm:min-h-[420px]"
    :text="review.text"
    :author="review.author"
    :image="review.image"
  />
</AdaptiveGrid>
```

