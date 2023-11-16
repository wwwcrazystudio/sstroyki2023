<template>
  <div class="related-apartments">
    <div class="related-apartments__wrap">
      <div class="related-apartments__head">
        <div class="related-apartments__heading">
          {{ title }}
        </div>

        <div class="related-apartments__controls">
          <button class="related-apartments__control" ref="prevBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.3346 12.25L21 12.25"
                stroke="#347DE7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.15039 15L3.00037 12.0002L6.15039 9"
                stroke="#347DE7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="related-apartments__control" ref="nextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.6654 12.25L3 12.25"
                stroke="#347DE7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8496 15L20.9996 12.0002L17.8496 9"
                stroke="#347DE7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="related-apartments__carousel swiper" ref="carousel">
        <ul class="related-apartments__carousel-wrap swiper-wrapper">
          <ApartmentItem
            class="related-apartments__apartment-item swiper-slide"
            :complex="complex"
            v-for="complex in houses"
          />
        </ul>
      </div>

      <NuxtLink to="/" class="related-apartments__btn">Посмотреть все проекты</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

import 'swiper/scss'
import type { ComplexData } from '~/types/interfaces';

interface Props {
  title: string;
  houses: ComplexData[];
}

defineProps<Props>();

const swiper = ref<Swiper>()
const carousel = ref<HTMLElement>()
const prevBtn = ref<HTMLElement>()
const nextBtn = ref<HTMLElement>()

onMounted(() => {
    if (!carousel.value) return

    swiper.value = new Swiper(carousel.value, {
        slidesPerView: 1.15,
        spaceBetween: 24,
        modules: [Navigation],
        loop: true,
        navigation: {
            prevEl: prevBtn.value,
            nextEl: nextBtn.value
        },
    breakpoints: {
        1200: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
        }
    }
    })
})

onUnmounted(() => {
    swiper.value?.destroy()
})
</script>

<style lang="scss" scoped>
.related-apartments {
  &__wrap {
    padding: rem(32px);
    border-radius: rem(16px);
    background-color: #fff;

    @include media-breakpoint-down(md) {
      padding: rem(16px);
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(36px);

    @include media-breakpoint-down(md) {
        margin-bottom: rem(16px);
    }
  }

  &__heading {
    @extend %h2;
    
    margin-bottom: 0;
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: rem(24px);

    @include media-breakpoint-down(md) {
      display: none;
    }
  }

  &__control {
    width: rem(42px);
    height: rem(42px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: rem(70px);
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);
  }

  &__carousel-wrap {
    @include unlist();

  }

  &__btn {
    @extend %btn-accent;

    width: 100%;
    margin-top: rem(32px);
  }
}
</style>
