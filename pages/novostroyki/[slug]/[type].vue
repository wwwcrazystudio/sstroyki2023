<template>
  <div class="rooms-list" v-if="data">
    <div class="rooms-list__wrap">
      <div class="container">
        <Breadcrumbs class="rooms-list__breadcrumbs" :routes="routes" />

        <ApartmentCard :title="typeTitle" class="rooms-list__apartment-card" :complex="data?.complex" :developer="data?.developer" />

        <div class="rooms-list__list-wrap">
            <div class="rooms-list__list-count">{{ roomsArray.length }}  {{ plural(roomsArray.length, 'объявление', 'объявлений', 'объявлений') }}</div>

            <ul class="rooms-list__list">
                <RoomsCard v-for="room in roomsArray" :complex="data.complex" :developer="data.developer" :room="room" />
            </ul>
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

const routes = computed<Route[]>(() => {
  const list: Route[] = [];

  list.push({
    label: 'Новостройки',
    url: '/novostroyki',
  });

  if (data.value?.complex?.name) {
    list.push({
      label: data.value?.complex.name,
    });
  }

  return list;
});

const typeTitle = computed(() => {
    if (!data.value?.complex) return ''

    if (route.params.type === 'studii') {
        return `Студии ЖК ${data.value.complex.name}`
    }

    if (route.params.type.includes('kvartiry')) {
        const type = (route.params.type as string).split('-')[0]
        return `${type}-квартиры ЖК ${data.value.complex.name}`
    }
})

const roomsArray = computed(() => {
    if (!data.value?.complex) return []

    if (route.params.type === 'studii') {
        return data.value.complex.rooms[0].array
    }

    if (route.params.type.includes('kvartiry')) {
        const type = (route.params.type as string).split('k-')[0]
        return (data.value.complex.rooms[type as keyof typeof data.value.complex.rooms] as ComplexRoomsData).array
    }

    return []
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
}
</style>
