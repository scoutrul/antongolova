# 🎨 Дизайн-система кнопок (из Figma)

## 📊 Обзор

Кнопки реализованы согласно дизайн-системе Figma с полной поддержкой всех состояний и вариантов.

---

## 🎯 Варианты кнопок

### 1. Primary (Основная зеленая)

**Использование:** Главные действия, CTA, призыв к действию

**Состояния:**
```vue
<!-- Base -->
<BaseButton variant="primary">Познакомиться</BaseButton>

<!-- Hover (автоматически) -->
hover:bg-primary-hover (#4fa61d)

<!-- Active (автоматически) -->
active:bg-primary-active (#3b870e)

<!-- Disabled -->
<BaseButton variant="primary" :disabled="true">Недоступно</BaseButton>

<!-- Loading -->
<BaseButton variant="primary" :loading="true">Загрузка...</BaseButton>
```

**Стили:**
- Base: `bg-primary (#429512)` + `text-white-100`
- Hover: `bg-primary-hover (#4fa61d)`
- Active: `bg-primary-active (#3b870e)`
- Disabled: `opacity-50`

---

### 2. Secondary (С обводкой)

**Использование:** Вторичные действия, отмена, дополнительные опции

**Состояния:**
```vue
<!-- Base -->
<BaseButton variant="secondary">Подробнее</BaseButton>

<!-- Hover (автоматически) -->
hover:bg-white-100

<!-- Active (автоматически) -->
active:bg-white-80 (#dedede)

<!-- Disabled -->
<BaseButton variant="secondary" :disabled="true">Недоступно</BaseButton>
```

**Стили:**
- Base: `border border-black-70 (#cdcdcd)` + `text-black-90`
- Hover: `bg-white-100`
- Active: `bg-white-80 (#dedede)`
- Disabled: `opacity-50`

---

### 3. Outline (Обводка primary)

**Использование:** Альтернативные действия с акцентом

```vue
<BaseButton variant="outline">Узнать больше</BaseButton>
```

**Стили:**
- Base: `border-2 border-primary` + `text-primary`
- Hover: `bg-primary` + `text-white-100`

---

### 4. Ghost (Прозрачная)

**Использование:** Третичные действия, ссылки-кнопки

```vue
<BaseButton variant="ghost">Отмена</BaseButton>
```

**Стили:**
- Base: `text-primary`
- Hover: `bg-primary/10` (10% прозрачность)

---

## 📏 Размеры

### Small (sm)
```vue
<BaseButton size="sm" variant="primary">Маленькая</BaseButton>
```
- Height: `40px` (h-10)
- Padding: `px-4 py-2`
- Text: `text-sm`

### Medium (md) - По умолчанию
```vue
<BaseButton size="md" variant="primary">Средняя</BaseButton>
<!-- или просто -->
<BaseButton variant="primary">Средняя</BaseButton>
```
- Height: `48px` (h-12)
- Padding: `px-6 py-2` (24px 8px)
- Text: `text-p2` (16px)

### Large (lg)
```vue
<BaseButton size="lg" variant="primary">Большая</BaseButton>
```
- Height: `56px` (h-14)
- Padding: `px-8 py-3`
- Text: `text-p1` (20px)

---

## 🎨 Цветовая палитра кнопок

```javascript
// Primary
primary:        #429512  // Base
primary-hover:  #4fa61d  // Hover
primary-active: #3b870e  // Active

// Secondary
black-70:  #cdcdcd  // Border
black-90:  #161616  // Text
white-100: #ffffff  // Hover background
white-80:  #dedede  // Active background
```

---

## 💡 Примеры использования

### Форма с разными кнопками
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Primary для главного действия -->
    <BaseButton 
      type="submit" 
      variant="primary" 
      :loading="isSubmitting"
    >
      Отправить
    </BaseButton>
    
    <!-- Secondary для отмены -->
    <BaseButton 
      type="button" 
      variant="secondary"
      @click="handleCancel"
    >
      Отмена
    </BaseButton>
  </form>
</template>
```

### Группа кнопок
```vue
<template>
  <div class="flex gap-4">
    <BaseButton variant="primary" size="md">
      Принять
    </BaseButton>
    <BaseButton variant="secondary" size="md">
      Отклонить
    </BaseButton>
    <BaseButton variant="ghost" size="md">
      Подробнее
    </BaseButton>
  </div>
</template>
```

### Кнопка с loading
```vue
<template>
  <BaseButton 
    variant="primary" 
    :loading="isLoading"
    :disabled="!isFormValid"
    @click="handleAction"
  >
    {{ isLoading ? 'Загрузка...' : 'Сохранить' }}
  </BaseButton>
</template>

<script setup>
import { ref } from 'vue'
import { BaseButton } from '@/components/base'

const isLoading = ref(false)
const isFormValid = ref(true)

const handleAction = async () => {
  isLoading.value = true
  try {
    await api.save()
  } finally {
    isLoading.value = false
  }
}
</script>
```

### Disabled состояния
```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- Disabled Primary -->
    <BaseButton variant="primary" :disabled="true">
      Недоступно
    </BaseButton>
    
    <!-- Disabled Secondary -->
    <BaseButton variant="secondary" :disabled="true">
      Недоступно
    </BaseButton>
    
    <!-- Conditional disabled -->
    <BaseButton 
      variant="primary" 
      :disabled="!agreementChecked"
    >
      Продолжить
    </BaseButton>
  </div>
</template>
```

---

## 🔧 Кастомизация

### Добавление иконок (будущее)
```vue
<template>
  <BaseButton variant="primary">
    <Icon name="plus" class="w-5 h-5" />
    <span>Добавить</span>
  </BaseButton>
</template>
```

### Переопределение стилей через классы
```vue
<BaseButton 
  variant="primary" 
  class="!w-full"
>
  Во всю ширину
</BaseButton>
```

---

## ✅ Правила использования

### DO (Правильно)
✅ Используйте **Primary** для главного действия на странице  
✅ Используйте **Secondary** для вторичных действий  
✅ Ограничьте количество Primary кнопок (1-2 на экран)  
✅ Используйте понятный текст действия ("Сохранить", "Отправить")  
✅ Показывайте loading состояние для асинхронных операций  
✅ Disable кнопку если действие недоступно  

### DON'T (Неправильно)
❌ Не используйте несколько Primary кнопок в одной форме  
❌ Не используйте неясные тексты ("ОК", "Нажми меня")  
❌ Не делайте кнопку слишком маленькой (минимум `sm`)  
❌ Не используйте кнопки для навигации (используйте ссылки)  

---

## 📱 Адаптивность

```vue
<!-- Размер кнопки в зависимости от экрана -->
<BaseButton 
  :size="isMobile ? 'sm' : 'md'" 
  variant="primary"
>
  Действие
</BaseButton>

<!-- Полная ширина на мобильных -->
<BaseButton 
  variant="primary"
  class="w-full sm:w-auto"
>
  Кнопка
</BaseButton>
```

---

## 🎯 Состояния (State Machine)

```
┌─────────┐
│  Base   │ ──hover──> │ Hover  │
└─────────┘            └────────┘
     │                      │
     │                      │
  click                  click
     │                      │
     v                      v
┌─────────┐            ┌────────┐
│ Active  │            │Active  │
└─────────┘            └────────┘
     │                      │
     └──────────────────────┘
              │
           release
              │
              v
         ┌─────────┐
         │  Base   │
         └─────────┘

Disabled: блокирует все переходы
Loading: показывает spinner + disabled
```

---

## 🚀 Производительность

- Transitions: `duration-200` (200ms)
- Focus ring: автоматически для accessibility
- Cursor: меняется в зависимости от состояния
- Gap между элементами: `gap-2` (8px)

---

✅ **Дизайн-система кнопок полностью реализована согласно Figma!**

