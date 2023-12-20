<template>
  <li class="apartment-item">
    <div class="apartment-item__wrap">
      <Gallery
        v-if="gallery"
        :images="gallery"
        class="apartment-item__gallery"
      />

      <NuxtLink
        target="_blank"
        :to="`/novostroyki/${complex.house_url}`"
        class="apartment-item__title">
        ЖК {{ complex.name }}
      </NuxtLink>

      <div class="apartment-item__rooms">
        {{ totalRooms }}
        {{ plural(totalRooms, 'квартира', 'квартиры', 'квартир') }} от
        {{ minPrice.toLocaleString() }} руб.
      </div>

      <div class="apartment-item__description">
        {{ complex.address }}
      </div>

      <ul class="apartment-item__metro" v-if="complex.metro_info.length">
        <li class="apartment-item__metro-item">
          <MetroDistance color="inherit" :metro="complex.metro_info[0]" />
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ComplexData } from '~/types/interfaces';
import plural from 'plural-ru';

import 'swiper/scss';

interface Props {
  complex: ComplexData;
}

const props = defineProps<Props>();

const gallery = computed(() => {
  if (!props.complex.image_main) return;
  return useResponsiveImage(props.complex.image_other).value;
});

const totalRooms = computed(() => {
  let rooms = props.complex.rooms

  if (!rooms) return 0

  if (!Array.isArray(rooms)) {
    rooms = Object.values(rooms)
  }

  return rooms?.reduce(
    (acc, room) => acc + parseInt(room.quantity),
    0
  );
});

const minPrice = computed(() => {
  let rooms = props.complex.rooms

  if (!rooms) return []

  if (!Array.isArray(rooms)) {
    rooms = Object.values(rooms)
  }

  const priceArray = rooms
    ?.filter((el) => Boolean(el.price_min))
    .map((roomType) => parseInt(roomType.price_min));
  return priceArray ? Math.min(...priceArray) : 0;
});

</script>

<style lang="scss" scoped>
.apartment-item {
  &__gallery {
    position: relative;
    height: rem(270px);
    margin-bottom: rem(24px);
    border-radius: rem(8px);
    overflow: hidden;
  }

  &__title {
    font-size: rem(20px);
    font-weight: 600;
    margin-bottom: rem(12px);
    text-decoration: none;
    display: block;
  }

  &__rooms {
    font-size: rem(16px);
    font-weight: 600;
    margin-bottom: rem(16px);
  }

  &__description {
    color: var(--gray);
    margin-bottom: rem(14px);
  }

  &__gallery-count {
    border-radius: rem(5px);
    background: rgba(69, 69, 69, 0.6);
    padding: rem(8px 12px);
    color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    font-size: rem(16px);
    bottom: rem(16px);
    width: fit-content;
    z-index: 10;
    margin: auto;

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
    }
  }

  &__metro {
    @include unlist();
  }
}
</style>
