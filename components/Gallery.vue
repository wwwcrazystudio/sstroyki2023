<template>
  <div class="gallery">
    <div class="gallery__wrap swiper" ref="galleryEl">
      <div class="gallery__content swiper-wrapper">
        <div
          class="gallery__item swiper-slide"
          v-for="img in images"
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
      <button
        class="gallery__control gallery__control--prev"
        ref="prevEl"
      >
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
      <button
        class="gallery__control gallery__control--next"
        ref="nextEl"
      >
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
      <div class="gallery__counter">
        {{ activeSlide }} / {{ swiper?.slides.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

interface Props {
    images: {
        desktop: string
        mobile?: string
    }[]
}

const props = defineProps<Props>()

const galleryEl = ref<HTMLElement>()
const galleryNavEl = ref<HTMLElement>()
const prevEl = ref<HTMLElement>()
const nextEl = ref<HTMLElement>()
const swiper = ref<Swiper>()

const activeSlide = ref<number>(1)

onMounted(() => {
  if (!galleryEl.value) return

  swiper.value = new Swiper(galleryEl.value, {
    modules: [Navigation],
    navigation: {
      prevEl: prevEl.value,
      nextEl: nextEl.value
    },
    loop: true,
    on: {
      slideChangeTransitionStart({realIndex}) {
        activeSlide.value = realIndex + 1
      }
    }
  })
})

onUnmounted(() => {
    swiper.value?.destroy()
})
</script>

<style lang="scss" scoped>
.gallery {
  &__wrap {
    position: relative;
    height: 100%;

    &:hover {
      .gallery__control--prev {
        opacity: 1;
        left: rem(24px);
      }

      .gallery__control--next {
        opacity: 1;
        right: rem(24px);
      }
    }
  }

  &__item {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      left: rem(-100px);
    }

    &--next {
      right: rem(-100px);
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