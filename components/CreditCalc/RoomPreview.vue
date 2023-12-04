<template>
  <div class="room-preview">
    <div ref="wrap" class="room-preview__gallery swiper">
      <div class="room-preview__gallery-wrap swiper-wrapper">
        <div class="room-preview__gallery-item swiper-slide">
          <img :src="room.plan_room" alt="" />
        </div>
      </div>
    </div>

    <div class="room-preview__meta">
      <div class="room-preview__meta-item">
        Площадь
        <span>{{ room?.square }} м²</span>
      </div>

      <div class="room-preview__meta-item">
        Потолок
        <span>{{ room.height }} м²</span>
      </div>

      <div class="room-preview__meta-item">
        Этаж
        <span>{{ room?.floor }} / {{ room?.floors }}</span>
      </div>

      <div class="room-preview__meta-item">
        Корпус
        <span :title="room?.housing">{{ room?.housing }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swiper from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { ComplexSingleRoom } from '~/types/interfaces';

interface Props {
  room: ComplexSingleRoom;
}

defineProps<Props>();

const wrap = ref<HTMLElement>();

onMounted(() => {
  if (!wrap.value) return;

  new Swiper(wrap.value, {
    slidesPerView: 1,
  });
});
</script>

<style lang="scss" scoped>
.room-preview {
  min-width: 1px;

  &__gallery {
    margin-bottom: rem(16px);
    border-radius: 12px;
    background: #fff;
  }

  &__gallery-item {
    width: 100%;
    height: rem(335px);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 90%;
      height: 90%;
      object-fit: contain;
    }
  }

  &__meta {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: rem(16px);
    align-items: center;
    margin-bottom: rem(16px);
  }

  &__meta-item {
    padding: rem(16px);
    border-radius: rem(5px);
    font-size: rem(14px);
    color: var(--gray);
    display: grid;
    gap: rem(8px);
    background-color: #fff;

    @include media-breakpoint-down(md) {
      font-size: rem(12px);
    }

    span {
      font-weight: 600;
      color: var(--dark);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include media-breakpoint-down(md) {
        font-size: rem(14px);
      }
    }
  }
}
</style>
