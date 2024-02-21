<template>
  <div class="houses-list" v-if="data">
    <div class="houses-list__wrap">
      <div class="container">
        <Breadcrumbs class="houses-list__breadcrumbs" :routes="routes" />

        <h1 class="houses-list__heading">Новостройки Москвы и Подмосковья</h1>

        <div class="houses-list__count">Найдено {{ totalRooms.toLocaleString() }} {{ plural(totalRooms, 'квартира', 'квартиры', 'квартир') }} в {{ data.houses.length }} ЖК</div>

        <ul class="houses-list__list">
          <ApartmentCard v-for="item in housesToShow" :complex="item" />
        </ul>

        <Pagination
            v-if="data.houses.length > 8"
            :per-page="8"
            v-model:active-page="page"
            :total-items="data.houses.length"
            class="houses-list__pagination"
          />


        <!-- <div class="rooms-list__list-wrap">
          <div class="rooms-list__list-count">
            {{ roomsArray.length }}
            {{
              plural(
                roomsArray.length,
                'объявление',
                'объявления',
                'объявлений'
              )
            }}
          </div>

          <ul class="rooms-list__list">
            <RoomsCard
              v-for="room in roomsToShow"
              :complex="data.complex"
              :developer="data.developer"
              :room="room"
            />
          </ul>

          <Pagination
            v-if="roomsArray.length > 8"
            :per-page="8"
            v-model:active-page="page"
            :total-items="roomsArray.length"
            class="rooms-list__pagination"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ComplexData,
  ComplexRoomsData,
  DeveloperData,
  Route,
} from '~/types/interfaces';
import plural from 'plural-ru';

interface PageData {
  houses: ComplexData[]
}

const { data } = await useFetch<PageData>('/api/novostroyki');

const page = ref<number>(1)

const housesToShow = computed(() => {
  return data.value?.houses.slice(8 * (page.value - 1), (8 * page.value))
})

const totalRooms = computed(() => {
  let total = 0
 
  data.value?.houses.forEach((house) => {
    if (house.rooms) {
      total += Object.values(house.rooms).reduce((acc, roomType) => acc + parseInt(roomType.quantity), 0)
    }
  })

  return total
})

const routes = computed<Route[]>(() => {
  const list: Route[] = [];


  list.push({
    label: 'Новостройки',
  });

  return list;
});


watch(
  () => page.value,
  () => {
    window.scrollTo({
      top: 0,
    });
  }
);
</script>

<style lang="scss" scoped>
.houses-list {
  &__wrap {
    padding: rem(40px 0);
  }

  &__breadcrumbs {
    margin-bottom: rem(48px);

    @include media-breakpoint-down(md) {
      margin-bottom: rem(24px);
    }
  }
  
  &__heading {
    @extend %h1;

    font-size: rem(40px);
    margin-bottom: rem(32px);
  }

  &__count {
    font-size: rem(24px);
    margin-bottom: rem(24px);
    font-weight: 600;
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