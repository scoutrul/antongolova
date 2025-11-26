# 💡 Примеры использования компонентов

## BaseButton - Примеры всех вариаций

### Primary кнопка (основная)
```vue
<template>
  <BaseButton 
    variant="primary" 
    size="md"
    @click="handleSubmit"
  >
    Познакомиться
  </BaseButton>
</template>

<script setup>
import { BaseButton } from '@/components/base'

const handleSubmit = () => {
  console.log('Форма отправлена')
}
</script>
```

### Secondary кнопка
```vue
<BaseButton variant="secondary" size="lg">
  Узнать больше
</BaseButton>
```

### Outline кнопка
```vue
<BaseButton variant="outline" size="sm">
  Отмена
</BaseButton>
```

### Ghost кнопка
```vue
<BaseButton variant="ghost">
  Закрыть
</BaseButton>
```

### Кнопка с loading состоянием
```vue
<template>
  <BaseButton 
    variant="primary" 
    :loading="isLoading"
    @click="submitForm"
  >
    {{ isLoading ? 'Отправка...' : 'Отправить' }}
  </BaseButton>
</template>

<script setup>
import { ref } from 'vue'
import { BaseButton } from '@/components/base'

const isLoading = ref(false)

const submitForm = async () => {
  isLoading.value = true
  try {
    await api.submit()
  } finally {
    isLoading.value = false
  }
}
</script>
```

### Disabled кнопка
```vue
<BaseButton 
  variant="primary" 
  :disabled="!formValid"
>
  Отправить
</BaseButton>
```

---

## BaseContainer - Примеры layouts

### Full width контейнер
```vue
<BaseContainer max-width="full" :padding="true">
  <h1>Полная ширина с отступами</h1>
</BaseContainer>
```

### Ограниченная ширина (centered)
```vue
<BaseContainer max-width="lg" :padding="true">
  <article>
    <h1>Статья с максимальной шириной 1024px</h1>
    <p>Контент центрирован</p>
  </article>
</BaseContainer>
```

### Без padding (для вложенных сеток)
```vue
<BaseContainer max-width="xl" :padding="false">
  <div class="grid grid-cols-3 gap-4">
    <div>Колонка 1</div>
    <div>Колонка 2</div>
    <div>Колонка 3</div>
  </div>
</BaseContainer>
```

---

## BaseHeading - Семантические заголовки

### H1 для главного заголовка страницы
```vue
<BaseHeading :level="1" as="h1" color="text-light">
  Главный заголовок страницы
</BaseHeading>
```

### H4 со стилем h2 (semantic override)
```vue
<!-- Визуально выглядит как H4, но семантически H2 -->
<BaseHeading :level="4" as="h2" color="text-light">
  Что нас ждет впереди
</BaseHeading>
```

### Заголовок в div для flexbox
```vue
<BaseHeading :level="3" as="div" color="primary">
  Не использует h-тег, но имеет стиль заголовка
</BaseHeading>
```

---

## BaseText - Типографика

### Основной текст параграфа
```vue
<BaseText as="p" size="p2" color="text-white">
  Это основной текст с размером 16px и line-height 1.6
</BaseText>
```

### Крупный текст
```vue
<BaseText as="p" size="p1" color="text-light">
  Крупный текст (18px) для важных описаний
</BaseText>
```

### Вторичный текст (меньше и приглушенный)
```vue
<BaseText as="span" size="p3" color="text-gray" weight="medium">
  Готовы перейти на новый уровень?
</BaseText>
```

### Жирный текст
```vue
<BaseText size="body" weight="bold" color="primary">
  Важное сообщение
</BaseText>
```

---

## BenefitCard - Карточка преимущества

### Простое использование
```vue
<template>
  <BenefitCard 
    text="Запустим продукт за 1–3 месяца без остановки текущей работы" 
  />
</template>

<script setup>
import BenefitCard from '@/components/ui/BenefitCard.vue'
</script>
```

### В grid layout
```vue
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
    <BenefitCard 
      v-for="(benefit, index) in benefits" 
      :key="index"
      :text="benefit.text"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import BenefitCard from '@/components/ui/BenefitCard.vue'

const benefits = reactive([
  { text: 'Преимущество 1' },
  { text: 'Преимущество 2' },
  { text: 'Преимущество 3' },
  { text: 'Преимущество 4' },
])
</script>
```

---

## BenefitsSection - Полная секция

### Базовое использование
```vue
<template>
  <BenefitsSection
    :title="'Что нас ждет впереди'"
    :benefits="benefitsData"
    :cta-text="'Готовы перейти на новый уровень?'"
    :cta-button-text="'Познакомиться'"
    @cta-click="handleCtaClick"
  />
</template>

<script setup>
import { reactive } from 'vue'
import BenefitsSection from '@/components/sections/BenefitsSection.vue'

const benefitsData = reactive([
  { text: 'Запустим продукт за 1–3 месяца без остановки текущей работы' },
  { text: 'Создадим с нуля или переработаем интерфейсы с улучшением метрик' },
  { text: 'Создадим гибкую дизайн-систему по всем современным стандартам' },
  { text: 'Создадим гайды и спеки для лучшего масштабирования' },
])

const handleCtaClick = () => {
  // Открыть модальное окно, перейти на страницу контактов, etc.
  console.log('User wants to connect!')
}
</script>
```

### С динамическими данными из API
```vue
<template>
  <BenefitsSection
    v-if="!loading"
    :title="data.title"
    :benefits="data.benefits"
    :cta-text="data.ctaText"
    :cta-button-text="data.ctaButtonText"
    @cta-click="openContactModal"
  />
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BenefitsSection from '@/components/sections/BenefitsSection.vue'

const loading = ref(true)
const data = ref({})

onMounted(async () => {
  try {
    const response = await fetch('/api/benefits')
    data.value = await response.json()
  } finally {
    loading.value = false
  }
})

const openContactModal = () => {
  // Логика открытия модального окна
}
</script>
```

---

## Composables - useBreakpoints

### Адаптивное отображение
```vue
<template>
  <div>
    <h1 v-if="isDesktop">Десктоп версия заголовка</h1>
    <h2 v-else-if="isTablet">Планшет версия</h2>
    <h3 v-else>Мобильная версия</h3>
    
    <p>Ширина окна: {{ windowWidth }}px</p>
  </div>
</template>

<script setup>
import { useBreakpoints } from '@/composables/useBreakpoints'

const { windowWidth, isMobile, isTablet, isDesktop } = useBreakpoints()
</script>
```

### Условный рендеринг компонентов
```vue
<template>
  <MobileMenu v-if="isMobile" />
  <DesktopMenu v-else />
</template>

<script setup>
import { useBreakpoints } from '@/composables/useBreakpoints'
import MobileMenu from './MobileMenu.vue'
import DesktopMenu from './DesktopMenu.vue'

const { isMobile } = useBreakpoints()
</script>
```

### Динамическое изменение размера компонентов
```vue
<template>
  <BaseButton :size="buttonSize">
    Кнопка
  </BaseButton>
</template>

<script setup>
import { computed } from 'vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { BaseButton } from '@/components/base'

const { isMobile, isTablet } = useBreakpoints()

const buttonSize = computed(() => {
  if (isMobile.value) return 'sm'
  if (isTablet.value) return 'md'
  return 'lg'
})
</script>
```

---

## Комплексные примеры

### Страница с несколькими секциями
```vue
<template>
  <div class="min-h-screen bg-bg-dark">
    <!-- Hero секция -->
    <section class="py-20">
      <BaseContainer max-width="xl">
        <BaseHeading :level="1" as="h1" color="text-light" class="mb-6">
          Добро пожаловать в Goevo
        </BaseHeading>
        <BaseText size="p1" color="text-light" class="mb-8">
          Современная разработка интерфейсов
        </BaseText>
        <BaseButton variant="primary" size="lg" @click="scrollToBenefits">
          Узнать больше
        </BaseButton>
      </BaseContainer>
    </section>
    
    <!-- Benefits секция -->
    <BenefitsSection
      ref="benefitsRef"
      :benefits="benefits"
      @cta-click="openModal"
    />
    
    <!-- Footer -->
    <footer class="bg-neutral-space py-12">
      <BaseContainer max-width="xl">
        <BaseText size="body-sm" color="neutral-gray">
          © 2025 Goevo. Все права защищены.
        </BaseText>
      </BaseContainer>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '@/components/base'
import BenefitsSection from '@/components/sections/BenefitsSection.vue'

const benefitsRef = ref(null)

const benefits = [
  { text: 'Преимущество 1' },
  { text: 'Преимущество 2' },
  { text: 'Преимущество 3' },
  { text: 'Преимущество 4' },
]

const scrollToBenefits = () => {
  benefitsRef.value.$el.scrollIntoView({ behavior: 'smooth' })
}

const openModal = () => {
  console.log('Open contact modal')
}
</script>
```

### Форма с валидацией
```vue
<template>
  <BaseContainer max-width="md">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <BaseHeading :level="3" color="text-light">
        Свяжитесь с нами
      </BaseHeading>
      
      <!-- Поля формы (когда добавите BaseInput) -->
      
      <div class="flex gap-4">
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
          variant="outline"
          @click="resetForm"
        >
          Очистить
        </BaseButton>
      </div>
      
      <BaseText 
        v-if="submitMessage" 
        size="body-sm" 
        :color="submitSuccess ? 'primary' : 'text-gray'"
      >
        {{ submitMessage }}
      </BaseText>
    </form>
  </BaseContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BaseContainer, BaseHeading, BaseText, BaseButton } from '@/components/base'

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitSuccess = ref(false)
const formData = ref({ name: '', email: '' })

const isFormValid = computed(() => {
  return formData.value.name && formData.value.email
})

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await api.submitForm(formData.value)
    submitSuccess.value = true
    submitMessage.value = 'Форма успешно отправлена!'
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = 'Ошибка отправки формы'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = { name: '', email: '' }
  submitMessage.value = ''
}
</script>
```

---

## 🎨 Кастомизация через Tailwind

### Override стилей через className
```vue
<BaseButton 
  variant="primary" 
  class="!bg-blue-500 hover:!bg-blue-600"
>
  Кастомная синяя кнопка
</BaseButton>
```

### Добавление дополнительных стилей
```vue
<BaseText 
  size="p2" 
  color="white-100"
  class="uppercase tracking-wider"
>
  ТЕКСТ В UPPERCASE
</BaseText>
```

### Responsive модификаторы
```vue
<BaseContainer 
  max-width="full"
  class="px-4 sm:px-8 lg:px-16"
>
  Кастомные отступы для разных экранов
</BaseContainer>
```

---

## 🚀 Best Practices

1. **Всегда используйте базовые компоненты** вместо нативных HTML элементов
2. **Выносите данные в константы/composables** вместо hardcode в template
3. **Используйте computed** для динамических значений вместо методов
4. **Эмитайте события** вместо прямого вызова родительских методов
5. **Добавляйте key** при использовании v-for
6. **Используйте v-if/v-show** правильно (v-if - conditional render, v-show - toggle visibility)

