<template>
  <div class="apartment-card">
    <div class="apartment-card__wrap">
      <div class="apartment-card__col">
        <Gallery class="apartment-card__gallery" :images="gallery" />

        <Thumbnails class="apartment-card__thumbnails" :gallery="gallery" />
      </div>
      <div class="apartment-card__col">
        <Tags :tags="tags" class="apartment-card__tags" />

        <NuxtLink to="/" target="_blank" class="apartment-card__title">
          ЖК {{ complex.name }}
        </NuxtLink>

        <div class="apartment-card__rooms">{{ roomsCount }} {{ plural(roomsCount, 'квартира', 'квартиры', 'квартир') }} от застройщика</div>

        <div class="apartment-card__deadline">Новостройка, 3 кв. 2024 г.</div>

        <div class="apartment-card__address">
          {{ complex.address }}
        </div>

        <div class="apartment-card__metro">
          <div class="apartment-card__metro-item" v-for="metro in complex.metro_info">
            <MetroDistance color="dark" :metro="metro" />
          </div>
        </div>

        <!-- <DeveloperInfo
          :developer="developer"
          :complex="complex"
          show-phone-btn
          class="apartment-card__developer-info"
        /> -->
      </div>

      <div class="apartment-card__col">

        <div class="apartment-card__price">от {{ minPrice.toLocaleString() }} ₽</div>

        <ul class="apartment-card__rooms-list rooms-list" v-if="complex.rooms">
          <li class="rooms-list__item" v-for="([key, roomType]) in Object.entries(complex.rooms).filter(([key, value]) =>
            parseInt(value.quantity)
          )">
            <NuxtLink :to="getGroupRoute(parseInt(key))" class="rooms-list__item-link">
              {{ getRoomType(parseInt(key)) }}
              <span>от {{ formatNumber(parseInt(roomType.price_min)) }} ₽</span>
            </NuxtLink>
          </li>
        </ul>

        <NuxtLink :to="`/novostroyki/${complex.house_url}`" target="_blank" class="apartment-card__btn">
          Посмотреть ЖК
        </NuxtLink>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ComplexData,
  ResponsiveImage,
  Tag,
} from '~/types/interfaces';
import plural from 'plural-ru'

interface Props {
  complex: ComplexData;
}

const props = defineProps<Props>();
const route = useRoute();

const gallery = computed(() => {

  const complexGallery = props.complex.image_other
    ? useResponsiveImage(props.complex.image_other).value
    : [];

  return complexGallery;
});


const roomsCount = computed(() => {
  if (!props.complex.rooms) return 0
  return Object.values(props.complex.rooms).reduce((acc, roomType) => acc + parseInt(roomType.quantity), 0)
})

const minPrice = computed(() => {
  if (!props.complex.rooms) return 0
  const roomsPrices = Object.values(props.complex.rooms).map(el => parseInt(el.price_min))

  return Math.min(...roomsPrices)
})

const getRoomType = (index: number) => {
  switch (index) {
    case 0:
      return 'Студия';
    default:
      return `${index}-комн.`;
  }
};

const getGroupRoute = (index: number) => {
  const houseSlug = route.params.slug;
  switch (index) {
    case 0:
      return `/novostroyki/${houseSlug}/studii/`;
    default:
      return `/novostroyki/${houseSlug}/${index > 4 ? 4 : index}k-kvartiry/`;
  }
}

const formatNumber = (number: number) => {
  if (number >= 1000 && number <= 1000000) {
    return `${(number / 1000).toFixed(0)} тыс.`;
  }

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)} млн.`;
  }

  return number;
};

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
.apartment-card {
  &__wrap {
    padding: rem(24px);
    border-radius: rem(20px);
    border: 1px solid #f8f8f8;
    background: #fff;
    display: grid;
    gap: rem(24px);
    grid-template-columns: rem(380px) auto rem(240px);
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
  }

  &__thumbnails {
    height: rem(80px);
  }

  &__tags {
    margin-bottom: rem(16px);
  }

  &__title {
    @extend %h2;

    margin-bottom: rem(12px);
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
      height: rem(220px);
    }
  }

  &__rooms {
    margin-bottom: rem(24px);
    color: var(--gray);
    font-weight: 500;
  }

  &__deadline {
    margin-bottom: rem(16px);
  }

  &__metro {
    display: flex;
    flex-wrap: wrap;
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

  &__rooms-list {
    @include unlist();

    text-align: right;
    display: grid;
    gap: rem(12px);
    width: 100%;
  }


  &__address {
    margin-bottom: rem(16px);
  }

  &__price {
    font-size: rem(32px);
    margin-bottom: rem(32px);
    font-weight: 600;

    @include media-breakpoint-down(md) {
      font-size: rem(24px);
      margin-bottom: rem(24px);
    }
  }

  &__btn {
    @extend %btn-light;

    margin-top: rem(24px);

    @include media-breakpoint-down(md) {
      width: 100%;
    }
  }
}

.rooms-list {
  &__item-link {
    text-decoration: none;
    color: var(--accent);
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    gap: rem(24px);
    text-align: left;

    span {
      text-align: right;
      color: var(--dark);
      font-weight: 600;
    }
  }
}
</style>
