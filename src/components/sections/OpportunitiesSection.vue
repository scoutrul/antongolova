<template>
  <BaseContainer :as="'section'" bg="white">
    <!-- Заголовок и подзаголовок -->
    <div class="flex flex-col gap-4 mb-16 xl:mb-24">
      <BaseHeading
        :level="gtLg ? 3 : 4"
        :as="gtLg ? 'h2' : 'h3'"
        class="w-full text-black-90"
        :id="headingId || undefined"
      >
        {{ title }}
      </BaseHeading>

      <BaseText :as="'p'" size="p1" class="text-black-50 w-full">
        {{ subtitle }}
      </BaseText>
    </div>

    <!-- Центральная часть: Flowchart -->
    <div :class="['relative mb-16 xl:mb-24', flowHeightClass, 'w-full']">
      <!-- Logo в центре (только на desktop) -->
      <div
        v-if="gtLg"
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px]"
      >
        <!-- Blur эффекты -->
        <div
          class="absolute left-[69px] top-[70px] w-[149px] h-[149px] bg-primary rounded-full blur-[60px]"
        />
        <div
          class="absolute left-[-75px] top-[-51px] w-[149px] h-[149px] bg-secondary rounded-full blur-[60px]"
        />

        <!-- Логотип -->
        <div
          class="absolute inset-0 bg-primary rounded-[32px] flex items-center justify-center"
        >
          <img :src="logoMark" alt="Logo" width="102" height="101" />
        </div>
      </div>

      <!-- Logo для mobile/tablet -->
      <div v-else class="relative w-[160px] h-[160px] mb-16">
        <!-- Blur эффекты -->
        <div
          class="absolute left-[69px] top-[70px] w-[149px] h-[149px] bg-primary rounded-full blur-[60px]"
        />
        <div
          class="absolute left-[-75px] top-[-51px] w-[149px] h-[149px] bg-secondary rounded-full blur-[60px]"
        />

        <!-- Логотип -->
        <div
          class="absolute inset-0 bg-primary rounded-[32px] flex items-center justify-center"
        >
          <img :src="logoMark" alt="Logo" width="102" height="101" />
        </div>
      </div>

      <!-- Карточки -->
      <div>
        <!-- Desktop: абсолютное позиционирование -->
        <template v-if="gtLg">
          <OpportunityCard
            v-for="(opportunity, index) in opportunities"
            :key="index"
            class="absolute w-[320px] top-1/2 left-1/2"
            :style="getCenteredTransform(index)"
            :category="opportunity.category"
            :description="opportunity.description"
          />
        </template>

        <!-- Mobile/Tablet: horizontal scroll -->
        <template v-else>
          <div
            class="flex gap-4 overflow-x-auto pb-4 md:px-10 -mx-4 md:-mx-10 lg:-mx-16 px-4"
          >
            <OpportunityCard
              v-for="(opportunity, index) in opportunities"
              :key="index"
              class="w-[260px] flex-shrink-0"
              :category="opportunity.category"
              :description="opportunity.description"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="flex flex-col gap-8 pt-16 xl:pt-32 border-t border-black-90/5 max-w-[944px] lg:max-w-[780px] m-auto"
    >
      <!-- Двухколоночный контент -->
      <!-- Figma icon -->
      <img :src="figmaIcon" alt="Figma" width="54" height="80" />
      <div :class="['flex gap-8']">
        <!-- Колонка 1: Figma icon + текст -->
        <div class="flex-1 flex flex-col gap-8">
          <BaseText :as="'p'" size="p1" class="text-black-90">
            {{ footerText1 }}
          </BaseText>
        </div>

        <!-- Колонка 2: текст -->
        <div class="flex-1">
          <BaseText :as="'p'" size="p1" class="text-black-90">
            {{ footerText2 }}
          </BaseText>
        </div>
      </div>

      <!-- Кнопка -->
      <div>
        <BaseButton
          variant="secondary"
          :size="gtSm ? 'md' : 'wide'"
          @click="handleFigmaClick"
        >
          {{ buttonText }}
        </BaseButton>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import {
  BaseContainer,
  BaseHeading,
  BaseText,
  BaseButton,
} from "@/components/base";
import OpportunityCard from "@/components/ui/OpportunityCard.vue";
import { useBreakpoints } from "@/composables/useBreakpoints.js";
import { computed } from "vue";
const logoMark = "/assets/icons/logo-mark.svg";
const figmaIcon = "/assets/icons/figma.svg";

const { gtLg, gtXl, gtSm } = useBreakpoints();

defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  opportunities: {
    type: Array,
    required: true,
    validator: (opportunities) => {
      return opportunities.every(
        (opp) =>
          typeof opp.category === "string" &&
          typeof opp.description === "string"
      );
    },
  },
  footerText1: {
    type: String,
    default: "",
  },
  footerText2: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  headingId: {
    type: String,
    default: "",
  },
});

// Обработчик клика по кнопке Figma
const handleFigmaClick = () => {
  window.open(
    "https://www.figma.com/design/IYufH6FFbWEplvqjKOB6Gf/geovo",
    "_blank"
  );
};

// Высота центрального блока по брейкпоинтам
const flowHeightClass = computed(() => {
  if (gtLg.value) {
    return gtXl.value ? "h-[782px]" : "h-[758px]";
  }
  return "py-16";
});

// Смещения от центра (dx, dy) в пикселях, соответствующие макету

const xlOffsets = [
  { dx: -507, dy: -321 },
  { dx: -645, dy: -42 },
  { dx: 82, dy: -391 },
  { dx: 287, dy: -145 },
  { dx: 82, dy: 141 },
  { dx: -188, dy: 237 },
];

const lgOffsets = [
  { dx: -472, dy: -309 },
  { dx: -472, dy: -81 },
  { dx: -25, dy: -379 },
  { dx: 152, dy: -133 },
  { dx: 76, dy: 104 },
  { dx: -324, dy: 225 },
];

// Стиль transform с calc от центра
const getCenteredTransform = (index) => {
  const { dx, dy } = (gtXl.value ? xlOffsets : lgOffsets)[index] || {
    dx: 0,
    dy: 0,
  };
  return {
    transform: `translateX(calc(-50% + ${dx + 200}px)) translateY(calc(-50% + ${dy + 100}px))`,
  };
};
</script>
