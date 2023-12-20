<template>
  <div class="developer-info">
    <div class="developer-info__head">
      <picture class="developer-info__icon" v-if="developer.developer_images">
        <template
          v-for="[type, src] in Object.entries(developer.developer_images)"
        >
          <source
            v-if="type !== 'image/jpeg' && type !== 'image/png'"
            :srcset="src"
          />
          <img v-else :src="src" :alt="developer.title" />
        </template>
      </picture>

      <div class="developer-info__name">
        {{ developer.title }}
        <span v-if="developer.slogan">{{ developer.slogan }}</span>
      </div>
    </div>

    <PhoneBtn v-if="showPhoneBtn" :phone="complex ? complex.developer_phone : developer.phone" class="developer-info__phone-btn" />
  </div>
</template>

<script lang="ts" setup>
import type { ComplexData, DeveloperData } from '~/types/interfaces';

interface Props {
  developer: DeveloperData;
  complex?: ComplexData
  showPhoneBtn?: boolean;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.developer-info {
  &__head {
    display: flex;
    align-items: center;
    gap: rem(16px);

    @include media-breakpoint-down(lg) {
      justify-content: center;
    }
  }

  &__icon {
    border-radius: rem(5px);
    border: 1px solid #f8f8f8;
    width: rem(120px);
    display: flex;
    align-items: center;
    justify-content: center;

    @include media-breakpoint-down(md) {
      width: rem(90px);
    }

    img {
      display: block;
      width: 90%;
      height: auto;
    }
  }

  &__name {
    font-size: rem(24px);
    font-weight: 600;

    @include media-breakpoint-down(md) {
      font-size: rem(18px);
    }

    span {
      margin-top: rem(8px);
      display: block;
      font-size: rem(16px);
      font-weight: 400;

      @include media-breakpoint-down(md) {
        font-size: rem(14px);
      }
    }
  }

  &__phone-btn {
    width: 100%;
    margin-top: rem(24px);

    @include media-breakpoint-down(md) {
      margin-top: rem(16px);
    }
  }
}
</style>
