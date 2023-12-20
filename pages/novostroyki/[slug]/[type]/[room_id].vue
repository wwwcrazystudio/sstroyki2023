<template>
  <div class="room-page" v-if="data && room">
    <div class="room-page__wrap">
      <div class="container">
        <Breadcrumbs :routes="routes" class="room-page__breadcrumbs" />

        <div class="room-page__content">
          <div class="room-page__col">
            <div>
              <Gallery
                has-fullscreen
                :images="gallery"
                contain-first
                class="room-page__gallery"
              />
              <ClientOnly>
                <Thumbnails
                  class="room-page__thumbnails"
                  :cols="thumbsCount"
                  :gallery="gallery"
                />
            </ClientOnly>
            </div>

            <CreditCalc :room="room" :complex="data.complex" />

            <PriceChart
              :history="room.history"
              class="room-page__price-chart"
            />

            <ApartmentDetails :complex="data.complex" />

            <ApartmentLocation :complex="data.complex" />

            <ApartmentDocuments :documents="data.complex.documents" />

            <ApartmentDeveloper
              :complex="data.complex"
              :developer="data.developer"
            />

            <ApartmentRelatedApartments
              title="Другие ЖК от застройщика"
              :houses="
                Object.values(data.developer.houses).filter(
                  (el) =>
                    el.developer_id && el.house_id !== data?.complex.house_id
                )
              "
            />

            <ApartmentRelatedApartments
              title="ЖК в том же ценовом диапазоне"
              :houses="
                data.complex.recommended.filter(
                  (el) => el.house_id !== data?.complex.house_id
                )
              "
            />
          </div>

          <div class="room-page__col">
            <RoomInfo
              :developer="data?.developer"
              :complex="data?.complex"
              :room="room"
              class="room-page__room-info"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ComplexSingleRoom,
  ComplexData,
  DeveloperData,
  Route,
  ResponsiveImage,
} from '~/types/interfaces';

interface PageData {
  complex: ComplexData;
  developer: DeveloperData;
}

const route = useRoute();

const [{ data: room }, { data }] = await Promise.all([
  useFetch<ComplexSingleRoom>(`/api/room/${route.params.room_id}`),
  useFetch<PageData>(`/api/novostroyki/${route.params.slug}`),
]);

const gallery = computed(() => {
  const roomGallery = [
    {
      desktop: room.value?.plan_room,
      mobile: room.value?.plan_room,
    },
  ] as ResponsiveImage[];

  const complexGallery = data.value?.complex.image_main
    ? useResponsiveImage(data.value?.complex.image_main).value
    : [];

  return roomGallery.concat(complexGallery);
});

const typeTitle = computed(() => {
  if (!data.value?.complex) return '';

  if (route.params.type === 'studii') {
    return `Студии ЖК ${data.value.complex.name}`;
  }

  if (route.params.type.includes('kvartiry')) {
    let type = (route.params.type as string).split('k-')[0];

    if (parseInt(type) >= 4) {
      type = '4+';
    }
    return `${type}-комнатные квартиры ЖК ${data.value.complex.name}`;
  }
});

const routes = computed<Route[]>(() => {
  const list: Route[] = [];

  list.push({
    label: 'Новостройки',
    url: '/novostroyki',
  });

  if (data.value?.complex?.name) {
    list.push({
      label: data.value.complex.name,
      url: `/novostroyki/${route.params.slug}`,
    });
  }

  if (typeTitle.value) {
    let type = (route.params.type as string).split('k-')[0];
    list.push({
      label: typeTitle.value,
      url: `/novostroyki/${route.params.slug}/${parseInt(type) > 4 ? '4-kvartiry' : route.params.type}`,
    });
  }

  if (room.value?.room_id) {
    list.push({
      label: room.value?.uuid,
    });
  }

  return list;
});

const thumbsCount = computed(() => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    return 3
  }

  return 6
})

useSeoMeta({
  title: room.value?.meta_title || '',
  description: room.value?.meta_description || '',
  keywords: room.value?.meta_keywords || '',
});
</script>

<style lang="scss" scoped>
.room-page {
  &__wrap {
    margin: rem(40px 0);
  }

  &__breadcrumbs {
    margin-bottom: rem(48px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__content {
    display: grid;
    grid-template-columns: auto rem(374px);
    gap: rem(24px);

    @include media-breakpoint-down(xxl) {
      gap: rem(32px);
    }

    @include media-breakpoint-down(lg) {
      display: flex;
      flex-direction: column-reverse;
      margin: rem(24px 0);
      gap: rem(24px);
    }

  }

  &__gallery {
    height: rem(450px);

    
    @include media-breakpoint-down(lg) {
      height: rem(240px);
    }
  }

  &__col {
    min-width: 1px;
    display: flex;
    flex-direction: column;
    gap: rem(56px);

    @include media-breakpoint-down(lg) {
      gap: rem(24px);
    }
  }

  &__thumbnails {
    height: rem(140px);

    @include media-breakpoint-down(lg) {
      height: rem(80px);
    }
  }

  &__room-info {
    position: sticky;
    top: rem(24px);
  }
}
</style>
