<template>
  <div class="apartment-facing">
    <div class="apartment-facing__wrap">
      <div class="apartment-facing__heading">Отделка квартир</div>

      <Gallery :images="gallery" has-fullscreen class="apartment-facing__gallery" />

      <div class="apartment-facing__desc-title">
        {{ complex.finish_title }}
      </div>

      <div
        class="apartmetn-facing__desc-text"
        v-html="complex.finish_description"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComplexData } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
}

const props = defineProps<Props>();

const gallery = computed(() => {
  return useResponsiveImage(props.complex.finish_images).value;
});
</script>

<style lang="scss" scoped>
.apartment-facing {
  &__wrap {
    padding: rem(32px);
    border-radius: rem(16px);
    background-color: #fff;

    @include media-breakpoint-down(md) {
      padding: rem(16px);
    }
  }

  &__heading {
    @extend %h2;

    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__gallery {
    margin-bottom: rem(24px);
    border-radius: rem(16px);
    overflow: hidden;
    height: rem(420px);
    object-fit: cover;

    @include media-breakpoint-down(md) {
      height: rem(240px);
    }
  }

  &__desc-title {
    font-size: rem(24px);
    font-weight: 600;
    margin-bottom: rem(16px);
  }
}
</style>
