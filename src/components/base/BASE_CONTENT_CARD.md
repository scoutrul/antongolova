# BaseContentCard - Базовая карточка с контентом

## Описание
Базовый компонент карточки с заголовком, описанием и слотами для дополнительного контента. Используется как основа для ExpertiseCard и ReviewCard.

## Структура

```
┌─────────────────────────────┐
│  Заголовок (H5/P1)          │
│  Описание (P2)              │
│  [header-content slot]      │  ← Слот для контента в header
├─────────────────────────────┤
│  [footer slot]              │  ← Слот для нижней части
└─────────────────────────────┘
```

## Использование

### Базовый пример

```vue
<BaseContentCard
  title="Заголовок"
  description="Описание"
>
  <template #header-content>
    <!-- Контент в header -->
  </template>
  
  <template #footer>
    <!-- Контент в footer -->
  </template>
</BaseContentCard>
```

### Только header (без footer)

```vue
<BaseContentCard
  title="Дизайнер"
  description="Создаю удобный продукт"
>
  <template #header-content>
    <ul>
      <li>Пункт 1</li>
      <li>Пункт 2</li>
    </ul>
  </template>
</BaseContentCard>
```

### С footer (картинка)

```vue
<BaseContentCard
  title="Отзыв"
  description="Автор"
  :footer-min-height="true"
>
  <template #footer>
    <div class="flex-1 p-6">
      <img src="photo.jpg" />
    </div>
  </template>
</BaseContentCard>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `title` | String | required | Заголовок карточки |
| `description` | String | required | Описание карточки |
| `footerMinHeight` | Boolean | false | Добавляет min-height для описания (52px) |

## Слоты

### header-content
Контент внутри header секции, после описания. Используется для:
- Списков с чекмарками (ExpertiseCard)
- Дополнительной информации

### footer
Нижняя часть карточки. Используется для:
- Картинок (ReviewCard)
- Дополнительного контента

## Наследники

### ExpertiseCard

```vue
<BaseContentCard :title="title" :description="description">
  <template #header-content>
    <div v-if="items && items.length">
      <div v-for="item in items">
        <img :src="checkmarkIcon" />
        <span>{{ item }}</span>
      </div>
    </div>
  </template>
</BaseContentCard>
```

**Особенности:**
- Использует только слот `header-content`
- Список с чекмарками
- Flex layout с `justify-between`

### ReviewCard

```vue
<BaseContentCard 
  :title="text" 
  :description="author"
  :footer-min-height="true"
>
  <template #footer>
    <div class="flex-1 pl-6 md:pl-8">
      <div class="bg-white-80 rounded-tl-2xl">
        <img :src="image" />
      </div>
    </div>
  </template>
</BaseContentCard>
```

**Особенности:**
- Использует слот `footer`
- Картинка в сером блоке
- Min-height для описания (52px)

## Адаптивность

### Типографика
- **Desktop** (≥ 768px):
  - Заголовок: H5 (28px, medium)
  - Padding: 32px
  
- **Mobile** (< 768px):
  - Заголовок: P1 (20px, regular)
  - Padding: 24px

### Layout
- Без footer: `flex-1 justify-between` для распределения контента
- С footer: обычный flex без распределения

## Преимущества

1. **DRY принцип** - общая логика заголовка/описания в одном месте
2. **Гибкость** - разные слоты для разных типов контента
3. **Переиспользование** - легко создать новые типы карточек
4. **Типографика** - единая адаптивная типографика

## Создание новых карточек

```vue
<template>
  <BaseContentCard
    :title="myTitle"
    :description="myDescription"
  >
    <template #header-content>
      <!-- Ваш контент в header -->
    </template>
    
    <template #footer>
      <!-- Ваш контент в footer -->
    </template>
  </BaseContentCard>
</template>

<script setup>
import BaseContentCard from '../base/BaseContentCard.vue'

defineProps({
  myTitle: String,
  myDescription: String
})
</script>
```

## Иерархия компонентов

```
BaseCard (обертка со стилями)
  └── BaseContentCard (заголовок + описание + слоты)
      ├── ExpertiseCard (слот header-content с чекмарками)
      └── ReviewCard (слот footer с картинкой)
```

