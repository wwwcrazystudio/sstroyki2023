<template>
  <div class="credit-calc-group">
    <div class="credit-calc-group__wrap">
      <div class="credit-calc-group__title">
        {{ title }}
      </div>
      <div class="credit-calc-group__value" :class="disabled && 'credit-calc-group__value--static'">
        {{ value.toLocaleString() }} {{ postfix }} 

        <span v-if="additionalValue">{{ additionalValue }}</span>
      </div>
      <ClientOnly v-if="!disabled">
        <div class="credit-calc-group__range-wrap">
          <RangeSlider
            class="credit-calc-group__range-slider"
            v-model="value"
            :height="2"
            :step="step || 1"
            :min="min"
            :max="max"
            trackColor="#DDD"
            color="#347DE7"
            :alwaysShowHandle="true"
            :handleScale="1"
          />
        </div>
      </ClientOnly>
    </div>

    <div class="credit-calc-group__labels" v-if="!disabled">
      <div class="credit-calc-group__label">
        {{ formatNumber(min) }} {{ postfix }} <span>{{ minLabelPostfix }}</span>
      </div>
      <div class="credit-calc-group__label">
        {{ formatNumber(max) }} {{ postfix }} <span>{{ maxLabelPostfix }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RangeSlider from 'vue3-slider';

interface Props {
  title: string;
  min: number;
  max: number;
  value: number;
  postfix?: string;
  minLabelPostfix?: string;
  maxLabelPostfix?: string;
  additionalValue?: string;
  disabled?: boolean
  step?: number;
}

interface Emits {
  (e: 'update:value', value: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const value = ref<number>(props.value);

const formatNumber = (number: number) => {
  if (number >= 1000 && number <= 1000000) {
    return `${(number / 1000).toFixed(0)} тыс.`;
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)} млн.`;
  }

  return number;
};

watch(
  () => value.value,
  () => {
    emits('update:value', value.value);
  }
);

watch(
  () => props.value,
  () => {
    value.value = props.value;
  }
);
</script>

<style lang="scss" scoped>
.credit-calc-group {
  &__wrap {
    border-radius: rem(10px 10px 0px 0px);
    border: 1px solid #f8f8f8;
    background: #fff;
    padding: rem(24px 16px);
    padding-bottom: rem(28px);
    position: relative;
  }

  &__title {
    font-size: rem(16px);
    margin-bottom: rem(16px);
  }

  &__value {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--static {
      color: var(--accent);
    }
  }

  &__range-slider {
    position: absolute;
    bottom: 0;
    left: 0;

    &:deep(.handle) {
      width: rem(18px);
      height: rem(18px);
      border-radius: 50%;
      top: rem(-8px);
      background-color: #fff;
      border: 2px solid var(--accent);
      transform: translateX(-10px) !important;
    }

    &:deep(.track, .track-filled) {
      border-radius: rem(40px);
    }
  }

  &__labels {
    display: flex;
    justify-content: space-between;
    margin-top: rem(18px);
  }

  &__label {
    display: flex;
    align-items: center;
    gap: rem(8px);
    font-weight: 500;
    font-size: rem(14px);

    span {
      color: var(--gray);
    }
  }
}
</style>
