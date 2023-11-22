<template>
  <div class="thumbnails">
    <div class="thumbnails__wrap" :style="{gridTemplateColumns: `repeat(${cols || 3}, 1fr)`}">
      <div
        class="thumbnails__item"
        v-for="img in gallery.slice(0, cols || 3)"
        :data-left="gallery.length - (cols || 3)"
      >
        <picture>
          <source
            v-if="img?.mobile"
            :srcset="img.mobile"
            media="(max-width: 768px)"
          />
          <img :src="img?.desktop" alt="" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResponsiveImage } from '~/types/interfaces';

interface Props {
  gallery: ResponsiveImage[]
  cols?: number
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.thumbnails {
  &__wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: rem(12px);
    height: 100%;
    margin-top: rem(12px);
  }

  &__item {
    height: 100%;
    border: 1px solid transparent;
    border-radius: rem(10px);
    overflow: hidden;
    position: relative;

    &:first-of-type {
      border: 1px solid var(--accent);
      padding: rem(8px);
    }

    &:last-of-type {
      &::before {
        content: '+' attr(data-left);
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: rgba(#000, 0.3);
        font-size: rem(20px);
        color: #fff;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

}
</style>
