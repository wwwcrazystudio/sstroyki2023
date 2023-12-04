<template>
  <div class="rooms-card">
    <div class="rooms-card__wrap">
      <div class="rooms-card__col">
        <Gallery has-fullscreen contain-first class="rooms-card__gallery" :images="gallery" />

        <Thumbnails class="rooms-card__thumbnails" :gallery="gallery" />
      </div>
      <div class="rooms-card__col">
        <Tags :tags="tags" class="rooms-card__tags" />

        <NuxtLink :to="groupRoute" class="rooms-card__title">
          {{ roomType }} {{ room.square }} м² {{ room.floor }}
          /
          {{ room.floors }}
          эт.
        </NuxtLink>

        <div class="rooms-card__complex">
          <div class="rooms-card__complex-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              <path
                d="M10.3164 4.49976H11.0532V5.24976H10.3164V4.49976Z"
                fill="white"
              />
              <path
                d="M10.3164 6.00024H11.0532V6.75024H10.3164V6.00024Z"
                fill="white"
              />
              <path d="M10.3164 7.5H11.0532V8.25H10.3164V7.5Z" fill="white" />
              <path
                d="M10.3164 8.99976H11.0532V9.74976H10.3164V8.99976Z"
                fill="white"
              />
              <path
                d="M10.3164 11.9998H11.0532V12.7498H10.3164V11.9998Z"
                fill="white"
              />
              <path
                d="M10.3164 10.5002H11.0532V11.2502H10.3164V10.5002Z"
                fill="white"
              />
              <path
                d="M4.42188 4.49976H5.15872V5.24976H4.42188V4.49976Z"
                fill="white"
              />
              <path
                d="M4.42188 6.00024H5.15872V6.75024H4.42188V6.00024Z"
                fill="white"
              />
              <path d="M4.42188 7.5H5.15872V8.25H4.42188V7.5Z" fill="white" />
              <path
                d="M4.42188 8.99976H5.15872V9.74976H4.42188V8.99976Z"
                fill="white"
              />
              <path
                d="M4.42188 11.9998H5.15872V12.7498H4.42188V11.9998Z"
                fill="white"
              />
              <path
                d="M4.42188 10.5002H5.15872V11.2502H4.42188V10.5002Z"
                fill="white"
              />
              <path
                d="M2.94727 4.49976H3.68411V5.24976H2.94727V4.49976Z"
                fill="white"
              />
              <path
                d="M2.94727 6.00024H3.68411V6.75024H2.94727V6.00024Z"
                fill="white"
              />
              <path d="M2.94727 7.5H3.68411V8.25H2.94727V7.5Z" fill="white" />
              <path
                d="M2.94727 8.99976H3.68411V9.74976H2.94727V8.99976Z"
                fill="white"
              />
              <path
                d="M2.94727 11.9998H3.68411V12.7498H2.94727V11.9998Z"
                fill="white"
              />
              <path
                d="M2.94727 10.5002H3.68411V11.2502H2.94727V10.5002Z"
                fill="white"
              />
              <path
                d="M5.89453 4.49976H6.63137V5.24976H5.89453V4.49976Z"
                fill="white"
              />
              <path
                d="M5.89453 6.00024H6.63137V6.75024H5.89453V6.00024Z"
                fill="white"
              />
              <path d="M5.89453 7.5H6.63137V8.25H5.89453V7.5Z" fill="white" />
              <path
                d="M5.89453 8.99976H6.63137V9.74976H5.89453V8.99976Z"
                fill="white"
              />
              <path
                d="M5.89453 11.9998H6.63137V12.7498H5.89453V11.9998Z"
                fill="white"
              />
              <path
                d="M5.89453 10.5002H6.63137V11.2502H5.89453V10.5002Z"
                fill="white"
              />
              <path
                d="M13.6316 14.25H13.2632V4.125C13.2632 3.525 12.8211 3 12.3053 2.775L8.8421 1.575V0.375C8.8421 0.225 8.76842 0.15 8.69474 0.075C8.62105 0 8.47368 0 8.4 0L1.76842 2.025C1.17895 2.25 0.736842 2.775 0.736842 3.375V14.25H0.368421C0.147368 14.25 0 14.4 0 14.625C0 14.85 0.147368 15 0.368421 15H13.6316C13.8526 15 14 14.85 14 14.625C14 14.4 13.8526 14.25 13.6316 14.25ZM12.0842 3.525C12.3053 3.6 12.5263 3.9 12.5263 4.125V14.25H8.8421V2.4L12.0842 3.525ZM1.47368 3.375C1.47368 3.15 1.69474 2.85 1.91579 2.775L8.10526 0.9V14.25H1.47368V3.375Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="rooms-card__complex-name">{{ complex.name }}</div>
          <div class="rooms-card__complex-info">
            Новостройка, {{ complex.status }}
          </div>
        </div>

        <div class="rooms-card__address">{{ complex.address }}</div>

        <div class="rooms-card__metro">
          <div
            class="rooms-card__metro-item"
            v-for="metro in complex.metro_info"
          >
            <MetroDistance :metro="metro" />
          </div>
        </div>

        <DeveloperInfo
          :developer="developer"
          show-phone-btn
          class="rooms-card__developer-info"
        />
      </div>

      <div class="rooms-card__col rooms-card__col--right">
        <div class="rooms-card__price">
          {{ parseInt(room.price).toLocaleString() }} ₽
        </div>

        <div class="rooms-card__per-square">
          {{
            Math.round(
              parseInt(room.price) / parseFloat(room.square)
            ).toLocaleString()
          }}
          ₽ за м²
        </div>
      </div>

      <button class="rooms-card__favorite-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.99966 4C7.99966 4 7.49566 3.137 6.57166 2.544C6.04307 2.1943 5.42444 2.00534 4.79066 2C2.69666 2 0.499665 3.5 0.999665 7C1.49966 10.5 6.83266 14 7.99966 14C9.16667 14 14.4997 10.5 14.9997 7C15.4997 3.5 13.3027 2 11.2077 2C10.5077 2 9.90967 2.235 9.42766 2.544C8.50266 3.137 7.99966 4 7.99966 4ZM6.27266 5.011L6.28066 5.023L7.13366 6.098C7.22721 6.21607 7.34621 6.31147 7.48179 6.3771C7.61738 6.44273 7.76603 6.47688 7.91666 6.477H8.08067C8.2313 6.47688 8.37995 6.44273 8.51553 6.3771C8.65112 6.31147 8.77012 6.21607 8.86367 6.098L9.71666 5.023L9.72466 5.011L9.80966 4.891C9.89567 4.777 10.0237 4.624 10.1867 4.476C10.5297 4.163 10.8707 4 11.2067 4C11.8037 4 12.3017 4.215 12.6047 4.543C12.8677 4.828 13.2017 5.437 13.0187 6.717C12.8777 7.702 11.9197 9.04 10.4527 10.289C9.85254 10.8031 9.20726 11.2619 8.52466 11.66L7.99966 11.932C7.82016 11.85 7.64463 11.7596 7.47366 11.661C6.79107 11.2629 6.14578 10.8041 5.54566 10.29C4.07866 9.04 3.11966 7.703 2.97966 6.717C2.79666 5.436 3.13066 4.828 3.39366 4.543C3.69566 4.215 4.19466 4 4.79066 4C5.12666 4 5.46866 4.163 5.81066 4.476C5.94861 4.60266 6.07479 4.74156 6.18766 4.891L6.27266 5.011Z"
            fill="#777777"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ComplexData,
  ComplexSingleRoom,
  DeveloperData,
  ResponsiveImage,
  Tag,
} from '~/types/interfaces';

interface Props {
  developer: DeveloperData;
  complex: ComplexData;
  room: ComplexSingleRoom;
}

const props = defineProps<Props>();
const route = useRoute()

const gallery = computed(() => {
  const roomGallery = [
    {
      desktop: props.room.plan_room,
      mobile: props.room.plan_room,
    },
  ] as ResponsiveImage[];

  const complexGallery = props.complex.image_other
    ? useResponsiveImage(props.complex.image_other).value
    : [];

  return roomGallery.concat(complexGallery);
});

const roomType = computed(() => {
  switch (props.room.rooms) {
    case '0':
      return 'Студия';
    case '1':
      return '1-комн. квартира';
    case '2':
      return '2-комн. квартира';
    case '3':
      return '3-комн. квартира';
    case '4':
      return '4-комн. квартира';
    default:
      return '---';
  }
});

const groupRoute = computed(() => {
  const houseSlug = route.params.slug
  switch (props.room.rooms) {
    case '0':
    return `/novostroyki/${houseSlug}/studii/${props.room.room_id}`
    case '1':
    return `/novostroyki/${houseSlug}/1k-kvartiry/${props.room.room_id}`
    case '2':
    return `/novostroyki/${houseSlug}/2k-kvartiry/${props.room.room_id}`
    case '3':
    return `/novostroyki/${houseSlug}/3k-kvartiry/${props.room.room_id}`
    case '4':
    return `/novostroyki/${houseSlug}/4k-kvartiry/${props.room.room_id}`
  }
})

const tags = computed<Tag[]>(() => {
  const list: Tag[] = [];

  if (props.complex?.class) {
    list.push({
      label: `${props.complex.class} класс`,
    });
  }

  return list;
});
</script>

<style lang="scss" scoped>
.rooms-card {
  &__wrap {
    padding: rem(24px);
    padding-right: rem(96px);
    border-radius: rem(20px);
    border: 1px solid #f8f8f8;
    background: #fff;
    display: grid;
    gap: rem(24px);
    grid-template-columns: rem(380px) auto auto;
    position: relative;

    @include media-breakpoint-down(lg) {
      grid-template-columns: 1fr;
      padding-right: rem(24px);
    }

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
      padding: rem(16px);
      gap: rem(16px);
    }
  }

  &__col {
    min-width: 1px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &--right {
      align-items: flex-end;
    }
  }

  &__thumbnails {
    height: rem(80px);
  }

  &__tags {
    margin-bottom: rem(16px);
  }

  &__title {
    @extend %h3;

    margin-bottom: rem(28px);
    display: flex;
    gap: rem(24px);
    align-items: center;
    text-decoration: none;

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__gallery {
    height: rem(320px);
    overflow: hidden;
    border-radius: rem(10px);

    @include media-breakpoint-down(md) {
      height: rem(240px);
    }
  }

  &__metro {
    display: flex;
    align-items: center;
    gap: rem(8px);
  }

  &__developer-info {
    max-width: rem(292px);
    margin-top: auto;

    @include media-breakpoint-down(md) {
      max-width: 100%;
      margin-top: rem(36px);
    }
  }

  &__complex {
    display: flex;
    align-items: center;
    gap: rem(8px);
    margin-bottom: rem(20px);

    &-icon {
      width: rem(24px);
      height: rem(24px);
      background: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-name {
      font-weight: 500;
      color: var(--accent);
    }

    &-info {
      color: var(--dark);
      margin-left: rem(8px);
    }
  }

  &__address {
    margin-bottom: rem(16px);
  }

  &__price {
    font-size: rem(32px);
    margin-bottom: rem(8px);
    font-weight: 600;

    @include media-breakpoint-down(md) {
      font-size: rem(24px);
      margin-bottom: rem(4px);
    }
  }

  &__favorite-btn {
    position: absolute;
    right: rem(24px);
    top: rem(24px);
    width: rem(42px);
    height: rem(42px);
    border-radius: 5px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    background-color: #fff;
  }
}
</style>
