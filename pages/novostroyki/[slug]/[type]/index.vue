<template>
  <div class="rooms-list" v-if="data">
    <div class="rooms-list__wrap">
      <div class="container">
        <Breadcrumbs class="rooms-list__breadcrumbs" :routes="routes" />

        <ApartmentCard :title="typeTitle" class="rooms-list__apartment-card" :complex="data?.complex"
          :developer="data?.developer" />

        <div class="rooms-list__list-wrap">
          <div class="rooms-list__list-count">{{ roomsArray.length }}
            {{ plural(roomsArray.length, 'объявление', 'объявления', 'объявлений') }}</div>

          <ul class="rooms-list__list">
            <RoomsCard v-for="room in roomsToShow" :complex="data.complex" :developer="data.developer" :room="room" />
          </ul>

          <Pagination v-if="roomsArray.length > 8" :per-page="8" v-model:active-page="page" :total-items="roomsArray.length"  class="rooms-list__pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComplexData, ComplexRoomsData, DeveloperData, Route } from '~/types/interfaces';
import plural from 'plural-ru'

interface PageData {
  complex: ComplexData;
  developer: DeveloperData;
}

const route = useRoute();

const { data } = await useFetch<PageData>(
  `/api/novostroyki/${route.params.slug}`
);

const page = ref<number>(1)

const typeTitle = computed(() => {
  if (!data.value?.complex) return ''

  if (route.params.type === 'studii') {
    return `Студии ЖК ${data.value.complex.name} (${data.value.developer.title})`
  }

  if (route.params.type.includes('kvartiry')) {
    let type = ''
    switch (route.params.type) {
      case '1k-kvartiry':
        type = '1-комнатные'
        break;
      case '2k-kvartiry':
        type = '2-комнатные'
        break;
      case '3k-kvartiry':
        type = '3-комнатные'
        break;
      default:
        type = '4+-комнатные'
        break;
    }
    return `${type} квартиры ЖК ${data.value.complex.name} (${data.value.developer.title})`
  }
})

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

  if (typeTitle.value)
    list.push({
      label: typeTitle.value,
    });

  return list;
});

const roomsArray = computed(() => {
  if (!data.value?.complex) return []

  if (route.params.type === 'studii') {
    return data.value.complex.rooms[0].array
  }

  if (route.params.type.includes('kvartiry')) {
    let type = (route.params.type as string).split('k-')[0] as string | number

    if (parseInt(type as string) > 4) {
      type = 4
    }
    return (data.value.complex.rooms[type as keyof typeof data.value.complex.rooms] as ComplexRoomsData).array
  }

  return []
})

const roomsToShow = computed(() => {
  return roomsArray.value.slice(8 * (page.value - 1), (8 * page.value))
})

watch(() => page.value, () => {
  window.scrollTo({
    top: 0
  })
})

</script>

<style lang="scss" scoped>
.rooms-list {
  &__wrap {
    padding: rem(40px 0);
  }

  &__breadcrumbs {
    margin-bottom: rem(48px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(24px);
    }
  }

  &__list-wrap {
    margin: rem(56px 0);

    @include media-breakpoint-down(md) {
      margin: rem(36px 0);
    }
  }

  &__list-count {
    font-weight: 600;
    font-size: rem(24px);
    margin-bottom: rem(24px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(16px);
    }
  }

  &__list {
    @include unlist();

    display: grid;
    gap: rem(32px);
  }

  &__pagination {
    margin-top: rem(56px);
  }
}
</style>
