<template>
  <div class="apartment-developer">
    <div class="apartment-developer__wrap">
      <div class="apartment-developer__heading">Информация о застройщике</div>

      <DeveloperInfo :developer="developer" class="apartment-developer__developer-info" />

      <ul class="apartment-developer__meta">
        <li class="apartment-developer__meta-item">
          <div class="apartment-developer__meta-value">{{developer.houses_processing}}</div>
          <div class="apartment-developer__meta-desc">
            дома строится
            <div>в {{ developer.total_processing }} ЖК</div>
          </div>
        </li>

        <li class="apartment-developer__meta-item">
          <div class="apartment-developer__meta-value">{{ developer.houses_complete }}</div>
          <div class="apartment-developer__meta-desc">
            домов сдано в
            <div>{{ developer.total_complete }} ЖК</div>
          </div>
        </li>

        <li class="apartment-developer__meta-item">
          <div class="apartment-developer__meta-value">{{ developer.percent }}%</div>
          <div class="apartment-developer__meta-desc">
            домов сдано
            <div>вовремя</div>
          </div>
        </li>
      </ul>

      <div class="apartment-developer__description" v-html="developer.description">
      </div>

      <NuxtLink to="/" class="apartment-developer__link">
        Подробнее
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <path
              d="M11 3.57874L6.07874 8.5L1.15748 3.57874"
              stroke="#347DE7"
              stroke-width="1.5"
              stroke-linecap="round"
            />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComplexData, DeveloperData } from '~/types/interfaces';

interface Props {
  developer: DeveloperData
  complex: ComplexData
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.apartment-developer {
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

  &__developer-info {
    margin-bottom: rem(32px);

    &:deep(.developer-info__btn) {
      display: none;
    }
  }

  &__meta {
    @include unlist();
    
    display: grid;
    grid-template-columns: 1.4fr 1.4fr 1.4fr 1fr;
    gap: rem(32px);

    @include media-breakpoint-down(lg) {
      grid-template-columns: 1fr 1fr 1fr;
      gap: rem(16px);
    }

    &-item {
      display: flex;
      align-items: center;
      gap: rem(12px);

      @include media-breakpoint-down(md) {
      flex-direction: column;
      text-align: center;
    }

    }

    &-value {
      color: var(--accent);
      font-size: rem(40px);
      font-weight: 600;

      @include media-breakpoint-down(md) {
      font-size: rem(24px);
    }
    }
  }

  &__description {
    margin-top: rem(32px);
  }

  &__link {
    display: flex;
    font-weight: 500;
    color: var(--accent);
    margin-top: rem(24px);
    text-decoration: none;
    gap: 8px;
    align-items: center;
  }


}
</style>