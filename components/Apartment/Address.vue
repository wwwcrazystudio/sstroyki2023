<template>
  <div class="apartment-address">
    <div class="apartment-address__wrap">
      <div class="apartment-address__icon">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="20" fill="#347DE7" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.0004 31.9149C22.6404 31.9149 28.2138 21.5225 28.2138 16.6197C28.2138 12.1067 24.8605 8.44824 20.0004 8.44824C15.1403 8.44824 11.7871 12.1067 11.7871 16.6197C11.7871 21.5225 17.3604 31.9149 20.0004 31.9149ZM20.0004 20.1816C21.9445 20.1816 23.5204 18.6057 23.5204 16.6616C23.5204 14.7175 21.9445 13.1416 20.0004 13.1416C18.0564 13.1416 16.4804 14.7175 16.4804 16.6616C16.4804 18.6057 18.0564 20.1816 20.0004 20.1816Z"
            fill="white"
          />
        </svg>

        Адрес
      </div>

      <div class="apartment-address__text">
        {{ complex.address }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ComplexData } from '~/types/interfaces';

interface Props {
  complex: ComplexData;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.apartment-address {
  &__wrap {
    padding: rem(16px 24px);
    font-weight: 500;
    display: grid;
    grid-template-columns: rem(110px) auto;
    align-items: center;
    border-radius: 10px;
    background: #fff;
    gap: rem(42px);

    @include media-breakpoint-down(md) {
      gap: rem(24px);
      padding: rem(16px);
      text-align: right;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    gap: rem(8px);
    color: var(--gray);
    font-size: rem(18px);
  }

  &__text {
    font-size: rem(16px);
    font-weight: 500;
  }
}
</style>
