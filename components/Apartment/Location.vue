<template>
    <div class="apartment-location">
        <div class="apartment-location__wrap">
            <h2 class="apartment-location__heading">
                Расположение и инфраструктура
            </h2>
            
            <ApartmentAddress :complex="complex" class="apartment-location__apartment-address" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ComplexData } from '~/types/interfaces';

interface Props {
    complex: ComplexData
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.apartment-location {
    &__wrap {
    margin-left: rem(16px);

    @include media-breakpoint-down(md) {
      margin-left: 0;
    }
  }

  &__heading {
    @extend %h2;
    
    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

}
</style>