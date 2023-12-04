<template>
  <div class="gallery">
    <div class="gallery__wrap swiper" ref="galleryEl">
      <div class="gallery__content swiper-wrapper">
        <div
          data-fancybox="gallery"
          :data-src="img?.desktop"
          class="gallery__item swiper-slide"
          v-for="(img, index) in images"
        >
          <picture>
            <source
              v-if="img?.mobile"
              :srcset="img.mobile"
              media="(max-width: 768px)"
            />
            <img
              :class="containFirst && index === 0 && 'contain'"
              :src="img?.desktop"
              alt=""
            />
          </picture>
        </div>
      </div>
      <button
        class="gallery__control gallery__control--fullscreen"
        v-if="hasFullscreen"
        @click.prevent="toggleFullscreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M13 6.49928C12.7348 6.49928 12.4804 6.39378 12.2929 6.20597C12.1054 6.01817 12 5.76345 12 5.49785V3.40486L9.41 5.99857C9.2217 6.18581 8.96683 6.29048 8.70146 6.28954C8.4361 6.2886 8.18198 6.18214 7.995 5.99356C7.80802 5.80499 7.70351 5.54976 7.70444 5.28401C7.70538 5.01827 7.8117 4.76378 8 4.57654L10.57 2.00286H8.52C8.25478 2.00286 8.00043 1.89735 7.81289 1.70955C7.62536 1.52174 7.52 1.26703 7.52 1.00143C7.52 0.735835 7.62536 0.481117 7.81289 0.293312C8.00043 0.105508 8.25478 0 8.52 0H13C13.2652 0 13.5196 0.105508 13.7071 0.293312C13.8946 0.481117 14 0.735835 14 1.00143V5.49785C14 5.76345 13.8946 6.01817 13.7071 6.20597C13.5196 6.39378 13.2652 6.49928 13 6.49928ZM1 7.51073C1.26522 7.51073 1.51957 7.61624 1.70711 7.80404C1.89464 7.99185 2 8.24656 2 8.51216V10.5851L4.57 8.01145C4.7613 7.84738 5.00738 7.76166 5.25905 7.77139C5.51073 7.78113 5.74947 7.88561 5.92756 8.06396C6.10566 8.24231 6.20999 8.48139 6.21971 8.73342C6.22943 8.98546 6.14383 9.23189 5.98 9.42346L3.41 11.9971H5.48C5.74522 11.9971 5.99957 12.1026 6.18711 12.2905C6.37464 12.4783 6.48 12.733 6.48 12.9986C6.48 13.2642 6.37464 13.5189 6.18711 13.7067C5.99957 13.8945 5.74522 14 5.48 14H1C0.734784 14 0.48043 13.8945 0.292893 13.7067C0.105357 13.5189 0 13.2642 0 12.9986V8.51216C0 8.24656 0.105357 7.99185 0.292893 7.80404C0.48043 7.61624 0.734784 7.51073 1 7.51073Z"
            fill="#347DE7"
          />
        </svg>
      </button>
      <button class="gallery__control gallery__control--prev" ref="prevEl"  v-if="swiper && swiper.slides.length > 1">
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
      <button class="gallery__control gallery__control--next" ref="nextEl"  v-if="swiper && swiper.slides.length > 1">
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
      <div class="gallery__counter" v-if="swiper && swiper.slides.length > 1">
        {{ activeSlide }} / {{ swiper?.slides.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface Props {
  containFirst?: boolean;
  images: {
    desktop: string;
    mobile?: string;
  }[];
  hasFullscreen?: boolean;
}

const props = defineProps<Props>();

const galleryEl = ref<HTMLElement>();
const galleryNavEl = ref<HTMLElement>();
const prevEl = ref<HTMLElement>();
const nextEl = ref<HTMLElement>();
const swiper = ref<Swiper>();

const activeSlide = ref<number>(1);
const fancybox = ref<Fancybox>();

const toggleFullscreen = () => {
  fancybox.value = new Fancybox(
    props.images.map((el) => {
      return {
        src: el.desktop,
        thumb: el.desktop,
      };
    }),
    {
      startIndex: activeSlide.value
    }
  );
};

onMounted(() => {
  if (!galleryEl.value) return;

  swiper.value = new Swiper(galleryEl.value, {
    modules: [Navigation],
    navigation: {
      prevEl: prevEl.value,
      nextEl: nextEl.value,
    },
    loop: true,
    on: {
      slideChangeTransitionStart({ realIndex }) {
        activeSlide.value = realIndex + 1;
      },
    },
  });
});

onUnmounted(() => {
  swiper.value?.destroy();
  fancybox.value?.destroy();
});
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

  .contain {
    object-fit: contain;
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
