<template>
  <div class="apartment-mini-info">
    <div class="apartment-mini-info__wrap">
      <div class="apartment-mini-info__title">ЖК {{ complex.name }}</div>
      <div class="apartment-mini-info__address">
        {{ complex.address }}
      </div>

      <MetroDistance
        class="apartment-mini-info__metro-distance"
        color="dark"
        :metro="complex.metro_info[0]"
      />

      <DeveloperInfo :developer="developer" show-phone-btn />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComplexData, DeveloperData } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
  developer: DeveloperData;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.apartment-mini-info {
  &__title {
    margin-bottom: rem(18px);
    font-size: rem(24px);
    font-weight: 600;
  }

  &__address {
    margin-bottom: rem(16px);
  }

  &__metro-distance {
    margin-bottom: rem(24px);
  }
}
</style>
