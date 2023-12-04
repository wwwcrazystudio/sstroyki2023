<template>
  <div class="apartment-head">
    <div class="apartment-head__wrap">
      <div class="apartment-head__container container">
        <Breadcrumbs class="apartment-head__breadcrumbs" :routes="routes" />
        <div class="apartment-head__info">
          <div class="apartment-head__info-col">
            <Tags class="apartment-head__tags" :tags="tags" />
            <h1 class="apartment-head__heading">ЖК {{ complex?.name }} ({{ developer.title }})</h1>
            <div class="apartment-head__address">{{ complex?.address }}</div>
            <div class="apartment-head__meta">
              <div
                class="apartment-head__meta-item"
                v-for="metro in complex.metro_info"
              >
                <MetroDistance :metro="metro" />
              </div>
            </div>
            <div class="apartment-head__info-foot">
              <button class="apartment-head__btn" @click="toggleFullscreen">Смотреть фото</button>
              <div class="apartment-head__controls">
                <button
                  class="apartment-head__control"
                  @click.prevent="handleGalleryPrev"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.3346 11.75L21 11.75"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.15039 9L3.00037 11.9998L6.15039 15"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div class="apartment-head__controls-slides">
                  {{ mainGalleryIndex + 1 }} / {{ mainGallery?.length }}
                </div>
                <button
                  class="apartment-head__control"
                  @click.prevent="handleGalleryNext"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.6654 12.25L3 12.25"
                      stroke="#FEFEFE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.8496 15L20.9996 12.0002L17.8496 9"
                      stroke="#FEFEFE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="apartment-head__info-col">
            <DeveloperInfo
              class="apartment-head__developer-info"
              :developer="developer"
              show-phone-btn
            />
          </div>
        </div>
      </div>
      <div class="apartment-head__photos" v-if="mainGallery">
        <picture>
            <source
              v-if="mainGallery[mainGalleryIndex]?.mobile"
              :srcset="mainGallery[mainGalleryIndex].mobile"
              media="(max-width: 768px)"
            />
            <img
              :src="mainGallery[mainGalleryIndex]?.desktop"
              alt=""
            />
          </picture>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  ComplexData,
  DeveloperData,
  Route,
  Tag,
} from '~/types/interfaces';

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface Props {
  complex: ComplexData;
  developer: DeveloperData;
}

const props = defineProps<Props>();

const mainGalleryIndex = ref<number>(0);
const fancybox = ref<Fancybox>();

const mainGallery = computed(() => {
  return useResponsiveImage(props.complex.image_main).value
});

const routes = computed<Route[]>(() => {
  const list: Route[] = [];

  list.push({
    label: 'Новостройки',
    url: '/novostroyki',
  });

  if (props.complex?.name) {
    list.push({
      label: props.complex!.name,
    });
  }

  return list;
});

const tags = computed<Tag[]>(() => {
  const list: Tag[] = [];

  if (props.complex?.class) {
    list.push({
      label: `${props.complex.class} класс`,
      type: 'white',
    });
  }

  if (props.complex?.status) {
    list.push({
      label: `${props.complex.status}`,
      type: 'blur',
    });
  }

  return list;
});

const toggleFullscreen = () => {
  fancybox.value = new Fancybox(
    mainGallery.value.map((el) => {
      return {
        src: el.desktop,
        thumb: el.desktop,
      };
    }),
    {
      startIndex: mainGalleryIndex.value,
    }
  );
};

const handleGalleryPrev = () => {
  if (mainGalleryIndex.value === 0) {
    mainGalleryIndex.value = mainGallery.value.length - 1;
    return;
  }

  mainGalleryIndex.value -= 1;
};

const handleGalleryNext = () => {
  if (mainGalleryIndex.value === mainGallery.value.length - 1) {
    mainGalleryIndex.value = 0;
    return;
  }

  mainGalleryIndex.value += 1;
};

onUnmounted(() => {
  fancybox.value?.destroy()
})
</script>

<style lang="scss" scoped>
.apartment-head {
  &__wrap {
    position: relative;
    padding: rem(56px 0);
    padding-top: rem(40px);
    min-height: 95lvh;
    min-height: 95vh;
    color: #fff;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-down(md) {
      padding: rem(24px 0);
      min-height: auto;
    }

    &::after {
      content: '';
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 1.45%,
        rgba(0, 0, 0, 0.5) 98.5%
      );
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      z-index: -1;

      @include media-breakpoint-down(lg) {
        background: rgba(#000, 0.5);
      }
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__breadcrumbs {
    padding: rem(10px 16px);
    backdrop-filter: blur(2px);
    background: rgba(255, 255, 255, 0.46);
    border-radius: rem(45px);
    margin-bottom: auto;
    width: fit-content;

    @include media-breakpoint-down(lg) {
      background: rgba(255, 255, 255, 0.76);
    }

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__info {
    display: grid;
    align-items: flex-end;
    grid-template-columns: auto rem(370px);
    gap: rem(64px);

    @include media-breakpoint-down(lg) {
      grid-template-columns: 1fr;
    }
  }

  &__photos {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -2;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__tags {
    margin-bottom: rem(24px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__heading {
    @extend %h1;

    margin-bottom: rem(24px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__address {
    margin-bottom: rem(16px);
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: rem(16px);
    margin-bottom: rem(32px);

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__info-foot {
    display: flex;
    gap: rem(24px);
    align-items: center;
  }

  &__btn {
    @extend %btn-main;

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: rem(12px);

    @include media-breakpoint-down(md) {
      display: none;
    }
  }

  &__controls-slides {
    border-radius: rem(5px);
    background: rgba(69, 69, 69, 0.45);
    padding: rem(8px 12px);
    color: #fff;
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(42px);
    height: rem(42px);
    border-radius: 50%;
    background: rgba(52, 125, 231, 0.4);
  }

  &__developer-info {
    color: var(--dark);
    width: 100%;
    padding: rem(24px);
    margin-left: auto;
    background-color: #fff;
    border-radius: rem(10px);
    box-shadow: 0px 3px 6px 0px rgba(7, 48, 116, 0.04),
      0px 10px 10px 0px rgba(7, 48, 116, 0.03),
      0px 23px 14px 0px rgba(7, 48, 116, 0.02),
      0px 40px 16px 0px rgba(7, 48, 116, 0.01),
      0px 63px 18px 0px rgba(7, 48, 116, 0);

    @include media-breakpoint-down(md) {
      padding: rem(16px);
    }
  }
}
</style>
