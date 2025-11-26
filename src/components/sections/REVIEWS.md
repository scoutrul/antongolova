# ReviewsSection - Секция "Самые теплые слова"

## Описание
Секция с отзывами клиентов. Карточки содержат текст отзыва, автора и опционально картинку внизу. Создана на основе дизайна из Figma.

## Использование

### Базовый пример

```vue
<ReviewsSection
  :title="'Самые теплые слова'"
  :subtitle="'Я дорожу репутацией...'"
  :reviews="reviewsData"
/>
```

### Формат данных

```javascript
const reviewsData = [
  {
    text: 'У нас теперь просто потрясающая дизайн-система',
    author: 'Ник Боус, дизайн-директор AG1',
    image: 'https://example.com/photo.jpg' // опционально
  },
  // ... другие отзывы
]
```

## Props

### ReviewsSection

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `title` | String | 'Самые теплые слова' | Заголовок секции |
| `subtitle` | String | 'Я дорожу репутацией...' | Подзаголовок секции |
| `reviews` | Array | required | Массив отзывов |

## Компоненты

Использует переиспользуемые компоненты:
- `AdaptiveGrid` - для адаптивной сетки (1/2/4 колонки)
- `ExpertiseCard` - с поддержкой картинки

## Адаптивность

- **Mobile** (< 640px): горизонтальный скролл, карточки 260px
- **Tablet** (640px - 1023px): сетка 2 колонки
- **Desktop** (≥ 1024px): сетка 4 колонки

## Высота карточек

- Mobile: min-height 380px
- Tablet+: min-height 420px

## Стилизация

### Карточки
- Белый фон, закругленные углы
- Отступы внутри: 24px (mobile), 32px (desktop)
- Картинка внизу занимает оставшуюся высоту

### Типографика
- **Текст отзыва**: H5 (28px, medium) на desktop, P1 (20px) на mobile
- **Автор**: P2 (16px, regular), цвет black-50, min-height 52px

## Доработка ExpertiseCard

ExpertiseCard теперь поддерживает 2 варианта:

### Вариант 1: С чекмарками (без картинки)

```vue
<ExpertiseCard
  title="Дизайнер"
  description="Создаю удобный продукт"
  :items="['Maкеты в Figma', 'Документация']"
/>
```

### Вариант 2: С картинкой

```vue
<ExpertiseCard
  title="Отзыв клиента"
  description="Автор отзыва"
  image="https://example.com/photo.jpg"
/>
```

## Переиспользование сетки

`AdaptiveGrid` можно использовать в других секциях:

```vue
<AdaptiveGrid
  mobile-mode="scroll"
  :columns="{ mobile: 1, tablet: 3, desktop: 6 }"
>
  <YourCard v-for="item in items" :key="item.id" />
</AdaptiveGrid>
```

