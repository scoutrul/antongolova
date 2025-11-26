# BaseCard - Базовая карточка

## Описание
Базовый компонент карточки с минимальной стилизацией. Используется как основа для всех карточек в проекте через слоты.

## Использование

### Базовый пример

```vue
<BaseCard>
  <div class="p-8">
    <h3>Заголовок</h3>
    <p>Контент карточки</p>
  </div>
</BaseCard>
```

### С произвольной структурой

```vue
<BaseCard>
  <div class="p-6">
    <!-- Верхняя часть -->
  </div>
  <div class="p-6 bg-gray-100">
    <!-- Нижняя часть -->
  </div>
</BaseCard>
```

## Стилизация

Карточка имеет:
- `bg-white-100` - белый фон
- `rounded-2xl` - закругленные углы (16px)
- `overflow-hidden` - скрытие overflow
- `flex flex-col` - вертикальный flex
- `h-full` - полная высота

## Наследование

От BaseCard наследуются:

### ExpertiseCard
Карточка с заголовком, описанием и списком чекмарков:

```vue
<BaseCard>
  <div class="p-6 md:p-8">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <ul><!-- список с чекмарками --></ul>
  </div>
</BaseCard>
```

### ReviewCard
Карточка с отзывом и картинкой внизу:

```vue
<BaseCard>
  <div class="p-6 md:p-8">
    <h3>{{ text }}</h3>
    <p>{{ author }}</p>
  </div>
  <div class="flex-1 pl-6 md:pl-8">
    <!-- Картинка в сером блоке -->
  </div>
</BaseCard>
```

## Преимущества

1. **Единая основа** - все карточки имеют одинаковый базовый стиль
2. **Гибкость** - через слоты можно создать любую структуру
3. **Переиспользование** - не нужно дублировать стили
4. **Легкое обновление** - изменения в BaseCard применяются ко всем карточкам

## Пример создания новой карточки

```vue
<template>
  <BaseCard>
    <div class="p-8 flex flex-col gap-4">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </BaseCard>
</template>

<script setup>
import { BaseCard } from '../base'

defineProps({
  title: String,
  content: String
})
</script>
```

