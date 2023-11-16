<template>
  <div class="tags">
    <ul class="tags__list">

      <li
        class="tags__item"
        :class="getModifier(tag.type)"
        :key="tag.label"
        v-for="tag in tags"
      >
        {{ tag.label }}
      </li>
      
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '../types/interfaces';

interface Props {
  tags: Tag[];
}

defineProps<Props>();

const getModifier = (type?: string) => {
  switch (type) {
    case 'blur':
      return 'tags__item--blur';
    case 'white':
      return 'tags__item--white';
    default:
      return '';
  }
};
</script>

<style lang="scss" scoped>
.tags {
  &__list {
    @include unlist();
    display: flex;
    align-items: center;
    gap: rem(12px)
  }

  &__item {
    padding: rem(8px 12px);
    border-radius: rem(5px);
    border: 1px solid var(--accent);
    color: var(--accent);
    font-size: rem(14px);
    font-weight: 500;

    &--blur {
      border-radius: rem(5px);
      background: rgba(69, 69, 69, 0.60);
      border-color: transparent;
      color: #fff;
    }

    &--white {
      background-color: #fff;
      border-color: #fff;
      color: var(--dark);
    }
  }
}
</style>