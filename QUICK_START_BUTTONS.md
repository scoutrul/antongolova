# 🚀 Быстрый старт: Кнопки

## Импорт

```vue
<script setup>
import { BaseButton } from '@/components/base'
</script>
```

## Основные примеры

### Primary (зеленая)
```vue
<BaseButton variant="primary">Познакомиться</BaseButton>
```
→ Зеленая кнопка `#429512` → hover `#4fa61d` → active `#3b870e`

### Secondary (с обводкой)
```vue
<BaseButton variant="secondary">Подробнее</BaseButton>
```
→ Border `#cdcdcd` → hover white → active `#dedede`

### Размеры
```vue
<BaseButton size="sm">Маленькая</BaseButton>
<BaseButton size="md">Средняя</BaseButton>  <!-- по умолчанию -->
<BaseButton size="lg">Большая</BaseButton>
```

### Состояния
```vue
<!-- Disabled -->
<BaseButton variant="primary" :disabled="true">
  Недоступно
</BaseButton>

<!-- Loading -->
<BaseButton variant="primary" :loading="isLoading">
  Сохранить
</BaseButton>
```

## Реальные примеры

### CTA кнопка из макета
```vue
<BaseButton 
  variant="primary" 
  size="md"
  @click="handleContact"
>
  Познакомиться
</BaseButton>
```

### Форма
```vue
<form @submit.prevent="handleSubmit">
  <BaseButton 
    type="submit" 
    variant="primary" 
    :loading="isSubmitting"
    :disabled="!isFormValid"
  >
    Отправить
  </BaseButton>
  
  <BaseButton 
    type="button" 
    variant="secondary"
    @click="handleCancel"
  >
    Отмена
  </BaseButton>
</form>
```

### Группа кнопок
```vue
<div class="flex gap-4">
  <BaseButton variant="primary">Принять</BaseButton>
  <BaseButton variant="secondary">Отклонить</BaseButton>
  <BaseButton variant="ghost">Закрыть</BaseButton>
</div>
```

## Цвета из Figma

```css
/* Primary */
#429512  /* base */
#4fa61d  /* hover */
#3b870e  /* active */

/* Secondary */
#cdcdcd  /* border */
#ffffff  /* hover bg */
#dedede  /* active bg */
```

---

**Полная документация:** `BUTTONS.md`

