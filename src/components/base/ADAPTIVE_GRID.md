# AdaptiveGrid - Переиспользуемая адаптивная сетка

## Описание
Универсальный компонент сетки со слотами для создания адаптивных раскладок с поддержкой горизонтального скролла на мобильных.

## Использование

### Базовый пример

```vue
<AdaptiveGrid>
  <Card v-for="item in items" :key="item.id" />
</AdaptiveGrid>
```

### С настройками

```vue
<AdaptiveGrid
  mobile-mode="scroll"
  :columns="{ mobile: 1, tablet: 2, desktop: 4 }"
  gap="gap-6 sm:gap-8"
>
  <Card v-for="item in items" :key="item.id" />
</AdaptiveGrid>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mobileMode` | String | 'scroll' | Режим на мобильных: 'scroll' (flex с overflow) или 'grid' |
| `columns` | Object | `{ mobile: 1, tablet: 2, desktop: 4 }` | Количество колонок на breakpoints |
| `gap` | String | 'gap-6 sm:gap-8' | Tailwind классы для отступов |

## Режимы

### Scroll Mode (по умолчанию)
На мобильных отображает горизонтальный скролл:
- `flex flex-row overflow-auto`
- Полная ширина экрана с отрицательными отступами
- На tablet+ переходит в grid

### Grid Mode
Всегда grid на всех разрешениях:
- `grid grid-cols-{mobile}`
- Адаптивные колонки на всех breakpoints

## Breakpoints

- **mobile** (< 640px): flex/grid в зависимости от mobileMode
- **tablet** (640px - 1023px): grid
- **desktop** (≥ 1024px): grid

## Примеры использования

### ExpertiseSection (scroll на мобильных, 2/4 колонки)

```vue
<AdaptiveGrid
  mobile-mode="scroll"
  :columns="{ mobile: 1, tablet: 2, desktop: 4 }"
>
  <ExpertiseCard v-for="card in cards" :key="card.id" />
</AdaptiveGrid>
```

### Простая сетка (grid на всех устройствах)

```vue
<AdaptiveGrid
  mobile-mode="grid"
  :columns="{ mobile: 2, tablet: 3, desktop: 6 }"
  gap="gap-4"
>
  <ImageCard v-for="img in images" :key="img.id" />
</AdaptiveGrid>
```

## Styling дочерних элементов

Для scroll mode на мобильных нужно задать минимальную ширину:

```vue
<AdaptiveGrid mobile-mode="scroll">
  <Card class="min-w-[212px] sm:min-w-[auto]" />
</AdaptiveGrid>
```

## Переиспользование

Компонент используется в:
- `ExpertiseSection` - секция с карточками экспертизы
- `ReviewsSection` - секция с отзывами
- Может использоваться в любых других секциях

