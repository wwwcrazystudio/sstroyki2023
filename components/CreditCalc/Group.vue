<template>
  <div class="credit-calc-group">
    <div class="credit-calc-group__wrap">
      <div class="credit-calc-group__title">
        {{ title }}
      </div>
      <div class="credit-calc-group__value">
        {{ value.toLocaleString() }} {{ postfix }} 

        <span v-if="additionalValue">{{ additionalValue }}</span>
      </div>
      <ClientOnly>
        <div class="credit-calc-group__range-wrap">
          <RangeSlider
            class="credit-calc-group__range-slider"
            v-model="value"
            :height="2"
            :step="1"
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

    <div class="credit-calc-group__labels">
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
      filter: drop-shadow(
          0px 8.68504810333252px 17.307403564453125px rgba(0, 0, 0, 0.11)
        )
        drop-shadow(
          0px 13.971650123596191px 43.19026184082031px rgba(0, 0, 0, 0.15)
        )
        drop-shadow(
          0px 14.70102310180664px 77.33646392822266px rgba(0, 0, 0, 0.17)
        )
        drop-shadow(
          0px 8.837370872497559px 118.00712585449219px rgba(0, 0, 0, 0.19)
        )
        drop-shadow(
          0px -7.841932773590088px 161.13706970214844px rgba(0, 0, 0, 0.22)
        )
        drop-shadow(0px -46px 200px rgba(0, 0, 0, 0.29));
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
