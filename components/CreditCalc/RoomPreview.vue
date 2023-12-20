<template>
  <div class="room-preview">
    <div class="room-preview__previews">
      <div class="room-preview__previews-item">
        <img :src="room.plan_room" alt="" />
      </div>

      <transform v-if="!hideNav">
        <button class="room-preview__control room-preview__control--prev" @click.prevent="$emit('prev')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3.3346 12.25L21 12.25" stroke="#347DE7" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.15039 15L3.00037 12.0002L6.15039 9" stroke="#347DE7" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <button class="room-preview__control room-preview__control--next" @click.prevent="$emit('next')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.6654 12.25L3 12.25" stroke="#347DE7" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.8496 15L20.9996 12.0002L17.8496 9" stroke="#347DE7" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <div class="room-preview__counter" v-if="current !== undefined">
          {{ current + 1 }} / {{ total }}
        </div>
      </transform>
    </div>

    <div class="room-preview__meta">
      <div class="room-preview__meta-item">
        Площадь
        <span>{{ room?.square }} м²</span>
      </div>

      <div class="room-preview__meta-item">
        Потолок
        <span>{{ room.height }} м</span>
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
import type { ComplexSingleRoom } from '~/types/interfaces';

interface Props {
  room: ComplexSingleRoom;
  current?: number
  total?: number;
  hideNav?: boolean;
}

interface Emits {
  (e:'prev'): void
  (e:'next'): void
}

defineEmits<Emits>()
defineProps<Props>();
</script>

<style lang="scss" scoped>
.room-preview {
  min-width: 1px;

  &__previews {
    position: relative;
    border-radius: rem(12px);
    background-color: #fff;
    margin-bottom: rem(16px);

    &:hover {
      .room-preview__control--prev {
        opacity: 1;
        left: rem(24px);
      }

      .room-preview__control--next {
        opacity: 1;
        right: rem(24px);
      }
    }
  }

  &__previews-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: rem(355px);

    img {
      height: 90%;
      width: 90%;
      margin: auto;
      object-fit: contain;
    }
  }

  &__meta {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: rem(12px);
    align-items: center;
    margin-bottom: rem(16px);
  }

  &__meta-item {
    padding: rem(16px);
    border-radius: rem(5px);
    font-size: rem(13px);
    color: var(--gray);
    display: grid;
    gap: rem(4px);
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
        font-size: rem(13px);
      }
    }
  }

  &__control {
    width: rem(42px);
    height: rem(42px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    z-index: 10;
    opacity: 0;
    transition: 500ms;

    &--prev {
      left: rem(-20px);
    }

    &--next {
      right: rem(-20px);
    }

    &--fullscreen {
      bottom: unset;
      right: rem(24px);
      top: rem(24px);
      opacity: 1;
    }
  }

  &__counter {
    border-radius: rem(5px);
    background: rgba(69, 69, 69, 0.6);
    padding: rem(8px 12px);
    color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    font-size: rem(16px);
    bottom: rem(32px);
    width: fit-content;
    z-index: 10;
    margin: auto;

    @include media-breakpoint-down(md) {
      font-size: rem(14px);
    }
  }

}
</style>
