<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <NuxtLink class="breadcrumbs__link" to=""> Главная </NuxtLink>
      </li>
      <li class="breadcrumbs__item" v-for="item in routes">
        <NuxtLink class="breadcrumbs__link" :to="item.url" v-if="item.url">
          {{ item.label }}
        </NuxtLink>
        <template v-else>
          {{ item.label }}
        </template>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { Route } from '~/types/interfaces';

interface Props {
  routes: Route[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.breadcrumbs {
  &__list {
    @include unlist();

    display: flex;
    align-items: center;
    width: fit-content;
  }

  &__item {
    font-size: rem(14px);
    color: var(--dark);
  }

  &__link {
    display: flex;
    align-items: center;
    color: var(--gray);
    text-decoration: none;

    &::after {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M4.00062 1L8.92188 5.92126L4.00062 10.8425' stroke='%23777777'/%3E%3C/svg%3E");
      width: rem(12px);
      height: rem(12px);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin: rem(0 12px);
    }
  }
}
</style>
